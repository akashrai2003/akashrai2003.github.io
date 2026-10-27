---
title: "Inside High-Throughput LLM Inference: PagedAttention, KV-Cache Quantization, and Continuous Batching"
description: "An architectural breakdown of the memory dynamics, scheduling mechanisms, and quantization trade-offs in modern LLM serving systems."
pubDate: 2025-11-14
category: "Inference & GPU"
tags: ["vLLM","PagedAttention","FP8 KV Cache","Continuous Batching","Inference Systems"]
featured: true
---

In modern generative AI infrastructure, deploying large language models efficiently is rarely about peak theoretical FLOPs. In production serving environments, the primary constraint is almost always **GPU memory bandwidth and dynamic VRAM allocation**.

While running single-prompt inference using naive frameworks is trivial, building a high-concurrency serving system that sustains hundreds of requests per second under unpredictable prompt lengths requires moving deep into the runtime architecture [1].

In this deep dive, we examine the core mechanics that govern high-throughput LLM engines like **vLLM**:
1. [Prefill vs. Decode Execution Dynamics](#1-the-dual-execution-phases-prefill-vs-decode)
2. [Memory Fragmentation & PagedAttention](#2-memory-fragmentation--pagedattention)
3. [The Memory Math: Why KV Cache Quantization (FP8) Matters](#3-the-memory-math-why-kv-cache-quantization-fp8-matters)
4. [Chunked Prefill: Solving TTFT Starvation](#4-chunked-prefill-solving-ttft-starvation)
5. [Production Takeaways & References](#5-architectural-summary--production-takeaways)

---

> [!NOTE] Systems architecture note
> Analysis is framed around production serving engines (vLLM [1], TensorRT-LLM [4]) running under concurrent batch workloads where sequence lengths vary dynamically across users.

---

## 1. The Dual Execution Phases: Prefill vs. Decode

Every autoregressive transformer request proceeds through two distinct computational phases:

```
+-------------------------------------------------------------------------------+
| Phase 1: Prefill (Context / Ingestion Phase)                                  |
| - Ingests the entire prompt sequence simultaneously.                          |
| - Compute-bound: Highly parallel matrix multiplications (GEMM).               |
| - Generates initial Key & Value vectors across all prompt tokens.             |
+-------------------------------------------------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
| Phase 2: Decode (Token Generation Phase)                                      |
| - Generates output tokens sequentially, one token per forward pass.           |
| - Memory-bandwidth-bound: GEMV operations loading all weights + cached KV.   |
| - Low arithmetic intensity (FLOPs / byte).                                    |
+-------------------------------------------------------------------------------+
```

Because decoding is memory-bandwidth-bound, traditional static batching (where all sequences wait for the slowest sequence to finish) severely under-utilizes GPU compute cores.

Modern serving engines solve this via **Continuous (Iteration-Level) Batching**: after every single token generation step, completed requests are evicted, and new requests are immediately scheduled into the active batch.

---

## 2. Memory Fragmentation & PagedAttention

In traditional serving implementations, KV cache memory must be pre-allocated contiguously based on the model's theoretical maximum context length (e.g., 32,768 tokens). This causes severe issues:

- **Internal Fragmentation**: If a user submits a 500-token prompt, the remaining 32,000 pre-allocated slots sit completely idle in VRAM.
- **External Fragmentation**: Memory allocators struggle to find contiguous virtual memory blocks over time as sequences dynamically join and terminate.

```
Naive Contiguous Allocation:
[Tokens 0...500] [                 Unused Reserved Memory                 ] ❌ Wasted VRAM!

PagedAttention Virtual Block Allocation:
Logical Cache:  [Block 0 (16 tok)] -> [Block 1 (16 tok)] -> [Block 2 (16 tok)]
Physical VRAM:  [Block 1 @ VRAM 0x4F] [Block 0 @ VRAM 0x1A] [Block 2 @ VRAM 0x8C] ✅ 0% Waste!
```

Inspired by virtual memory paging in operating systems, **PagedAttention** [1] partitions each sequence's KV cache into fixed-size physical memory blocks (typically 16 or 32 tokens). Blocks do not need to be contiguous in physical memory; a block lookup table maps logical token positions to physical GPU memory addresses.

This eliminates internal fragmentation, bringing memory waste down to less than 4% (only the tail of the final block).

---

## 3. The Memory Math: Why KV Cache Quantization (FP8) Matters

Let us inspect the exact memory scaling of the KV cache across transformer attention layers.

> [!TIP] KV cache memory formula
>
> $$
> \text{bytes per token} = 2 \times L \times H_{kv} \times D_{head} \times B
> $$
>
> Where:
> - **L**: Number of transformer layers
> - **H_kv**: Number of Key/Value attention heads (Grouped-Query Attention)
> - **D_head**: Dimension of each attention head
> - **B**: Precision bytes per element (2 for FP16/BF16, 1 for FP8)

Let's evaluate this on an 8-billion parameter model (`L = 36`, `H_kv = 8`, `D_head = 128`):

### Standard FP16 (`B = 2` bytes per element):

```
Bytes per token = 2 × 36 × 8 × 128 × 2
                = 147,456 bytes
                ≈ 144 KB per token
```

For a single **32,000-token context**:
```
32,000 tokens × 144 KB/token ≈ 4.61 GB of KV Cache
```

If you serve **4 concurrent long-context requests**:
```
4 requests × 4.61 GB = 18.44 GB of KV Cache alone!
```

Combined with model weights (~16 GB in FP16), the total requirement is **>34 GB of VRAM**. A single 24 GB or 16 GB workstation GPU crashes instantly with CUDA Out-Of-Memory!

### Calibrated FP8 KV Cache (`B = 1` byte per element):

```
Bytes per token = 2 × 36 × 8 × 128 × 1
                = 73,728 bytes
                ≈ 72 KB per token (Exact 50% Reduction)
```

By quantizing the KV cache to 8-bit precision (e.g., using FP8 `e4m3fn` with scale factors):
- Memory per token is cut exactly in half.
- 32,000 tokens require only **2.30 GB**.
- You can pack **twice as many concurrent active sequences** into the exact same physical VRAM footprint without degrading attention retrieval accuracy.

---

## 4. Chunked Prefill: Solving TTFT Starvation

When high concurrency traffic hits a serving engine, a fundamental conflict arises:
- **Decode requests** want low latency (quick continuous token generation).
- **Prefill requests** arrive with massive prompts (e.g., a 20,000-token uploaded legal brief).

If an engine executes the full 20,000-token prefill in a single step, the forward pass consumes several hundred milliseconds of pure GEMM compute. During this window, all ongoing decode sequences are completely starved, causing severe jitter and Time-To-First-Token (TTFT) degradation.

```
Without Chunked Prefill:
Step 1: [================== 20,000 Token Prefill ==================] (Decode requests wait 400ms!)
Step 2: [Decode Token]

With Chunked Prefill:
Step 1: [Chunk 1: 4,096 tokens] + [Active Decode Tokens]
Step 2: [Chunk 2: 4,096 tokens] + [Active Decode Tokens]
Step 3: [Chunk 3: 4,096 tokens] + [Active Decode Tokens]
```

By configuring **Chunked Prefill**, long prompts are partitioned into bounded chunks (e.g., 4,096 or 8,192 tokens). In each engine step, a chunk of prefill compute is co-scheduled alongside active decode tokens, ensuring consistent streaming latency for existing users while steadily ingesting large document prompts.

---

## 5. Architectural Summary & Production Takeaways

1. **Memory Capacity Dictates Concurrency**: In high-throughput serving, model weights are static; KV cache scaling determines your throughput ceiling.
2. **Quantize the Cache, Not Just Weights**: While weight quantization reduces loading size, KV cache quantization (FP8 KV) directly unlocks higher concurrency.
3. **Co-Schedule Prefill and Decode**: Use chunked prefill to maintain deterministic latency SLAs across mixed long-document and conversational traffic.

---

### References

- **[1]** Kwon et al., *"Efficient Memory Management for Large Language Model Serving with PagedAttention"*, SOSP 2023. [Paper](https://arxiv.org/abs/2309.06180)
- **[2]** Dao, *"FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning"*, 2023. [Paper](https://arxiv.org/abs/2307.08691)
- **[3]** DeepSeek-AI, *"DeepSeek-V3 Technical Report: Multi-Head Latent Attention & Multi-Token Prediction"*, 2024. [Paper](https://arxiv.org/abs/2412.19437)
- **[4]** NVIDIA Corporation, *"TensorRT-LLM: High-Performance GPU Inference Architecture"*, 2024. [Documentation](https://github.com/NVIDIA/TensorRT-LLM)
