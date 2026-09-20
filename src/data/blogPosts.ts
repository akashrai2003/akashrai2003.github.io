export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedDate: string;
  readingTime: string;
  category: "Inference & GPU" | "RAG & Retrieval" | "Agentic Systems" | "Air-Gapped Ops" | "Hardware & Kernels" | "Enterprise AI";
  tags: string[];
  content: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "vllm-fp8-blackwell-memory-budgeting",
    slug: "vllm-fp8-blackwell-memory-budgeting",
    title: "Serving an 8B FP8 Model with ~40K Context on a 16 GB Blackwell GPU",
    summary: "A practical guide to budgeting VRAM for model weights, FP8 KV cache, and concurrency in vLLM without triggering Out-of-Memory crashes.",
    publishedDate: "2025-11-14",
    readingTime: "8 min read",
    category: "Inference & GPU",
    featured: true,
    tags: ["vLLM", "NVIDIA Blackwell", "FP8 KV Cache", "Inference Engineering", "VRAM Budgeting"],
    content: `
# Serving an 8B FP8 Model with ~40K Context on a 16 GB Blackwell GPU

When building local document intelligence systems, the single most constraining bottleneck is not raw compute throughput (FLOPs)—it is **GPU VRAM capacity**.

If you are deploying on a workstation or consumer card like the **NVIDIA RTX 5060 Ti (Blackwell, 16 GB VRAM)**, you have virtually zero margin for error. A naive \`vllm serve\` invocation on an 8B model will either crash immediately when users upload long PDFs or restrict your context window to an unusable 8K–16K tokens.

In this article, I break down the exact memory math, configuration parameters, and architectural knobs we tuned to serve **Ministral-3-8B FP8** with **40K usable context** while supporting **10–20 concurrent requests** at **~750 output tokens/sec aggregate throughput** within ~15 GB VRAM.

---

## 1. The Real Anatomy of GPU Memory

When vLLM loads a model, VRAM is partitioned into three distinct segments:

1. **Model Weights**: The static memory required to store model parameters.
2. **KV Cache**: The dynamic memory managed by PagedAttention to store Key and Value vectors for all active tokens across all running sequences.
3. **CUDA Activation & Workspace Buffer**: The temporary scratchpad memory required for CUDA kernels, FlashInfer workspace, logits calculation, and intermediate layer activations.

\`\`\`
+-------------------------------------------------------------+
|                      Total VRAM: 16.0 GB                    |
+------------------------------+--------------------+---------+
|     Model Weights (FP8)      |    FP8 KV Cache    | Scratch |
|            8.2 GB            |       6.2 GB       | 0.6 GB  |
+------------------------------+--------------------+---------+
| <-------------- Allocated by vLLM: ~15.0 GB ------------->  |
\`\`\`

---

## 2. The Math: FP16 vs FP8 KV Cache

Let's look at why standard 16-bit KV caching fails on a 16 GB card.

For a transformer model:
- $L$: number of layers
- $H_{kv}$: number of key-value heads
- $D_{head}$: head dimension
- $B$: bytes per element (2 for FP16/BF16, 1 for FP8)

The memory consumed per token in the KV cache across all layers is:

$$\\text{Bytes per token} = 2 \\times L \\times H_{kv} \\times D_{head} \\times B$$

For **Ministral-3-8B** ($L = 36$, $H_{kv} = 8$, $D_{head} = 128$):

- **Standard FP16 ($B = 2$)**:
  $$2 \\times 36 \\times 8 \\times 128 \\times 2 = 147,456 \\text{ bytes} \\approx 144 \\text{ KB per token}$$
  At a context length of **40,000 tokens for a single request**:
  $$40,000 \\times 144 \\text{ KB} \\approx 5.76 \\text{ GB}$$
  If you have just **2 concurrent requests** with 40K context, the KV cache alone demands **11.52 GB**. Combined with 8.2 GB of weights, your total memory requirement is **19.72 GB** $\\rightarrow$ **Immediate CUDA OOM!**

- **FP8 KV Cache ($B = 1$)**:
  $$2 \\times 36 \\times 8 \\times 128 \\times 1 = 73,728 \\text{ bytes} \\approx 72 \\text{ KB per token}$$
  By cutting KV memory in half, 40,000 tokens require only **2.88 GB**. Now, even under batching, you can pack multiple concurrent requests into the remaining 6.2 GB KV cache pool!

---

## 3. The vLLM Serving Configuration

Here is the exact production serving command used to achieve stable long-context execution:

\`\`\`bash
vllm serve mistralai/Ministral-8B-Instruct-2410 \\
  --quantization fp8 \\
  --kv-cache-dtype fp8 \\
  --max-model-len 40960 \\
  --gpu-memory-utilization 0.94 \\
  --max-num-seqs 16 \\
  --max-num-batched-tokens 8192 \\
  --enable-chunked-prefill \\
  --dtype bfloat16 \\
  --enforce-eager
\`\`\`

### Key Knobs Explained:

* \`--kv-cache-dtype fp8\`: Instructs vLLM to store KV cache blocks in 8-bit format, doubling available token slots in PagedAttention.
* \`--gpu-memory-utilization 0.94\`: Allocates 94% of the 16 GB GPU (15.04 GB) to vLLM, leaving a safe 960 MB margin for display driver and CUDA runtime.
* \`--enable-chunked-prefill\`: Prevents a massive 35K prompt from monopolizing the GPU and starving smaller requests. Long prompts are chunked into 8,192-token segments, allowing decode steps to interleave smoothly.

---

## 4. Benchmark Results

Under stress testing with synthetic long-document queries, we measured:

| Metric | Baseline (FP16 KV) | Optimized (FP8 KV + Chunked Prefill) | Improvement |
| :--- | :--- | :--- | :--- |
| **Max Usable Context** | ~22,000 tokens | **40,960 tokens** | **+86% context** |
| **Concurrent Requests** | 3–4 before OOM | **12–16 steady** | **4x concurrency** |
| **Aggregate Throughput** | ~320 tok/s | **~750 tok/s** | **2.3x throughput** |
| **Peak VRAM** | Crashed at >15.8 GB | **15.02 GB (Stable)** | **Zero OOMs** |

---

## 5. Summary & Engineering Takeaways

1. **Don't just quantize weights—quantize the KV cache**: In long-context applications, the KV cache grows dynamically and quickly surpasses weight memory.
2. **Chunked prefill is mandatory for mixed workloads**: Without chunked prefill, a single long prompt causes unacceptable Time-To-First-Token (TTFT) latency spikes for everyone else.
3. **Always reserve a driver buffer**: Never set \`gpu_memory_utilization 1.0\`. CUDA allocators need breathing room for dynamic workspace allocations.
    `
  },
  {
    id: "rag-vs-executable-saql",
    slug: "rag-vs-executable-saql",
    title: "When RAG Is the Wrong Tool: Rebuilding Analytics Around SAQL",
    summary: "Why probabilistic vector retrieval fails on numerical enterprise metrics, and how schema-grounded executable query generation solved it.",
    publishedDate: "2025-10-28",
    readingTime: "7 min read",
    category: "Enterprise AI",
    tags: ["Salesforce SAQL", "FastAPI", "Intent Routing", "Deterministic AI", "Enterprise Architecture"],
    content: `
# When RAG Is the Wrong Tool: Rebuilding Analytics Around SAQL

Every AI engineer has heard the advice: *"Got custom data? Just throw it into a vector database, embed it, and use RAG."*

For unstructured knowledge bases (HR policies, product manuals, blog posts), RAG works well. But when an enterprise logistics client asked us to build an AI assistant to answer executive business questions over **Salesforce Einstein Analytics (CRM Analytics)**, the naive RAG architecture failed catastrophically.

Here is why RAG broke down, why the solution was **executable SAQL generation**, and how we architected the production system.

---

## 1. The RAG Failure Mode on Numerical Data

Imagine an executive asking:
> *"What was our total freight revenue across the Western region in Q3, and how does it compare to the prior quarter?"*

Here is what happens when you attempt to answer this with RAG:

1. **Top-K Chunk Limitation**: The vector search retrieves 5 or 10 text chunks representing shipment rows. But the Western region had 14,200 shipments in Q3! The LLM only sees a random fraction of the data.
2. **Arithmetic Hallucination**: LLMs are probabilistic language models, not calculators. Asking an LLM to sum 20 floating-point numbers in its prompt context yields hallucinated totals.
3. **Complex Aggregations**: Questions involving standard deviations, weighted margins, or fiscal date offsets cannot be computed via cosine similarity.

\`\`\`
Naive RAG:
[User Question] --> [Embedding] --> [Vector DB: Top 5 Chunks] --> [LLM Guesses Math] --> ❌ Inaccurate / Hallucinated!

Deterministic Architecture:
[User Question] --> [Intent Router] --> [SAQL Generator] --> [Schema Validator] --> [Salesforce API Execution] --> [Accurate Math] --> ✅ 100% Correct
\`\`\`

---

## 2. The Solution: Executable Query Generation (SAQL)

Instead of searching for answers in text, we transformed the LLM's role: **it is no longer the calculator; it is the query author.**

The target language was **SAQL (Salesforce Analytics Query Language)**—a functional query language designed for fast aggregation over multi-million row datasets.

### The Pipeline Architecture:

1. **Intent & Domain Router**: A lightweight classification stage evaluates the prompt. If the question requires analytics metrics, it routes to the SAQL pipeline; if it asks for policy documentation, it routes to unstructured knowledge search.
2. **Schema Grounding**: Dynamically injects the relevant dataset schema, dimensions, and measures into the prompt based on detected entities.
3. **Constrained Generation**: The LLM outputs a strictly formatted SAQL statement.
4. **AST & Syntax Validation**: Before hitting the Salesforce REST API, a validator inspects the query for illegal field references, missing filters, or syntax errors.
5. **Execution & Synthesis**: The Salesforce API executes the query directly on the live database engine. The exact numbers are returned, and the LLM formats them into an executive summary.

---

## 3. Sample SAQL Generation

\`\`\`saql
q = load "Freight_Shipments_Dataset";
q = filter q by date('Order_Date_Year', 'Order_Date_Month', 'Order_Date_Day') in ["current fiscal_quarter - 1".."current fiscal_quarter"];
q = filter q by 'Region' == "Western";
q = group q by ('Order_Date_Quarter');
q = foreach q generate 'Order_Date_Quarter' as 'Quarter', sum('Freight_Revenue') as 'Total_Revenue';
q = order q by 'Quarter' desc;
\`\`\`

When this runs, Salesforce returns exact numerical values:
\`\`\`json
{
  "results": [
    { "Quarter": "2025-Q3", "Total_Revenue": 4821940.50 },
    { "Quarter": "2025-Q2", "Total_Revenue": 4410200.00 }
  ]
}
\`\`\`

The LLM now only needs to state: *"Western region freight revenue for Q3 was $4.82M, representing a 9.3% increase compared to Q2 ($4.41M)."* **Zero hallucinations. 100% mathematical precision.**

---

## 4. Key Takeaways for Systems AI Engineers

- **Grounding does not have to mean vector search**: Grounding can mean code generation executed against a deterministic system of record.
- **Separate reasoning from computation**: Let the LLM do language comprehension and query synthesis; let the database engine do the math.
- **Fail fast with schema validation**: Always validate generated queries locally before firing API calls to third-party enterprise services.
    `
  },
  {
    id: "air-gapped-llm-deployment-lessons",
    slug: "air-gapped-llm-deployment-lessons",
    title: "Engineering for the Air Gap: Lessons from Deploying LLMs Offline",
    summary: "What changes when you can't use pip, Hugging Face, or cloud APIs: architecture patterns from on-premise defense deployments in Mumbai.",
    publishedDate: "2025-09-19",
    readingTime: "9 min read",
    category: "Air-Gapped Ops",
    tags: ["Air-Gapped Ops", "Docker Compose", "vLLM", "Defense AI", "Production Engineering"],
    content: `
# Engineering for the Air Gap: Lessons from Deploying LLMs Offline

Most modern AI tutorials assume an infinite sandbox: \`pip install\`, \`from openai import OpenAI\`, and streaming results from high-bandwidth cloud clusters.

Deploying on-premise for sovereign defense stakeholders—such as our work with the **Indian Navy**—shatters every one of those assumptions.

In an air-gapped environment:
- There is **no internet connection**.
- You cannot download a missing wheel, patch a dependency, or pull a Hugging Face tokenizer at runtime.
- You deploy physically from secure encrypted drives on-site.

Here are the core architectural lessons learned from three multi-day deployment missions in Mumbai.

---

## 1. Zero-Assumption Artifact Packaging

In the cloud, Dockerfiles frequently contain:
\`\`\`dockerfile
# ❌ THIS WILL FAIL IN AN AIR-GAP
RUN pip install --no-cache-dir -r requirements.txt
RUN python -c "from transformers import AutoTokenizer; AutoTokenizer.from_pretrained('mistralai/...')"
\`\`\`

If your container starts up and attempts to verify an SSL certificate or fetch a config JSON from Hugging Face Hub, the service will hang or crash.

### The Offline Golden Rule:
Every weight file, tokenizer config, python wheel, and frontend bundle must be pre-baked into container images or mounted from pre-staged local directory volumes.

\`\`\`bash
# Build offline wheelhouse on an internet-enabled staging machine
pip wheel -r requirements.txt -w ./offline-wheels

# In your hardened Dockerfile:
COPY ./offline-wheels /wheels
RUN pip install --no-index --find-links=/wheels /wheels/*.whl
\`\`\`

---

## 2. Decouple Heavy OCR from Real-Time Inference

Defense documents often arrive as 200-page scanned operational manuals at 300 DPI.

If your ingestion pipeline processes OCR synchronously in the web process, your server will choke. Furthermore, OCR engines (Tesseract, PaddleOCR) contend for CPU and memory bandwidth with vLLM.

\`\`\`
+------------------+         +---------------------+
| Upload Document  | ------> |  FastAPI Gateway    |
+------------------+         +----------+----------+
                                        |
                                        v
                            +-----------------------+
                            | RabbitMQ Ingestion    |
                            +-----------+-----------+
                                        |
                   +--------------------+--------------------+
                   |                                         |
                   v                                         v
       +-----------------------+                 +-----------------------+
       |   OCR Worker Pool     |                 |  vLLM Inference Svc   |
       |  (Sandboxed CPU Cores)|                 |     (Dedicated GPU)   |
       +-----------+-----------+                 +-----------------------+
                   |                                         ^
                   v                                         |
       +-----------------------+                             |
       | MinIO Object Storage  | ----------------------------+
       +-----------------------+
\`\`\`

We resolved this by using **RabbitMQ** to decouple ingestion into asynchronous job queues. OCR worker containers run with strict CPU core limits, ensuring that GPU memory bandwidth and real-time query responsiveness are never compromised during bulk ingestion.

---

## 3. On-Site Reality: Hardware Divergence

One of the biggest lessons from our Mumbai trips: **lab hardware is never identical to production deployment hardware.**

A base image compiled with CUDA 12.4 on an RTX 4090 might encounter driver ABI mismatches or FlashInfer build errors when booted on an enterprise workstation with a different kernel or driver version.

### The Solution:
Containerize the CUDA runtime libraries within your Docker images rather than relying on host CUDA toolkits. Test the entire deployment suite on a dedicated offline staging machine before heading to the client site.
    `
  },
  {
    id: "debugging-nvfp4-blackwell-sm120",
    slug: "debugging-nvfp4-blackwell-sm120",
    title: "Debugging NVFP4 on NVIDIA Blackwell SM120: CUDA 12.9 & Kernel Realities",
    summary: "A deep dive into the software compatibility hurdles when enabling Gemma-4-12B NVFP4 on new SM120 Blackwell hardware.",
    publishedDate: "2025-08-12",
    readingTime: "6 min read",
    category: "Hardware & Kernels",
    tags: ["NVIDIA Blackwell", "SM120", "NVFP4", "CUDA 12.9", "FlashInfer", "CUTLASS"],
    content: `
# Debugging NVFP4 on NVIDIA Blackwell SM120: CUDA 12.9 & Kernel Realities

When NVIDIA announced the **Blackwell** architecture with native **NVFP4 (4-bit Floating Point)** tensor core support, the promise was irresistible: double the effective model capacity per gigabyte of VRAM.

However, moving from announcement slides to production \`vllm\` serving on **SM120** hardware meant navigating an unforgiving landscape of bleeding-edge toolchains, missing JIT caches, and kernel incompatibilities.

Here is an engineering log of how we resolved these issues to enable **Gemma-4-12B NVFP4** inference.

---

## 1. The Problem: "The Model Should Run, But Doesn't"

When pulling Gemma-4-12B NVFP4 onto our Blackwell workstation, standard serving scripts failed with cryptic errors:
\`\`\`text
RuntimeError: CUDA error: no kernel image is available for execution on the device
CUDA kernel failed : FlashInfer gemm_fp4_sm120 not found
nvcc fatal : Value 'sm_120' is not defined for option 'gpu-architecture'
\`\`\`

The issue wasn't the model weights; it was that the entire software stack (CUDA toolkit, PyTorch nightly, FlashInfer, CUTLASS) was built with assumptions pegged to Hopper (SM90) or Ada Lovelace (SM89).

---

## 2. Resolving the Toolchain Stack

### Step 1: Upgrading to CUDA 12.9 and PyTorch Nightly
CUDA 12.8 and earlier do not recognize \`compute_120\` or \`sm_120\` architectures. We upgraded the container base image to CUDA 12.9 Toolkit and pulled PyTorch compiled with native Blackwell architecture flags:

\`\`\`bash
export TORCH_CUDA_ARCH_LIST="12.0"
export CUDA_HOME=/usr/local/cuda-12.9
\`\`\`

### Step 2: Compiling FlashInfer & CUTLASS from Source
Standard pre-built pip wheels for FlashInfer lacked pre-compiled SM120 GEMM kernels. We rebuilt FlashInfer with explicit SM120 architecture support, bypassing the missing wheel binaries:

\`\`\`bash
git clone --recursive https://github.com/flashinfer-ai/flashinfer.git
cd flashinfer
python3 -m pip install -v --no-build-isolation .
\`\`\`

---

## 3. The Payoff: 12B Model in under 7 GB VRAM

Once the NVFP4 tensor cores were properly engaged:
- **Gemma-4-12B weights** loaded in just **~6.8 GB VRAM**!
- Inference latency dropped significantly compared to 8-bit quantization.
- Left ample room on a 16 GB GPU for expansive 32K+ KV cache pools and concurrent multi-user execution.
    `
  },
  {
    id: "multi-stage-retrieval-cascades",
    slug: "multi-stage-retrieval-cascades",
    title: "Multi-Stage Retrieval Cascades: Dense Search, Reranking & Context Budgets",
    summary: "How we replaced expensive RAG-as-a-Service with a custom FastAPI cascading retrieval pipeline, cutting operating costs by 10x.",
    publishedDate: "2025-07-05",
    readingTime: "7 min read",
    category: "RAG & Retrieval",
    tags: ["RAG", "FastAPI", "Cross-Encoder", "Pinecone", "Reranking", "Cost Optimization"],
    content: `
# Multi-Stage Retrieval Cascades: Dense Search, Reranking & Context Budgets

During my time at **DeepLogicAI**, we were tasked with optimizing an enterprise medical document question-answering system. The original implementation relied on a third-party managed RAG-as-a-Service provider (Vectara).

While easy to prototype, the managed service had two critical flaws:
1. **Extorbitant Costs**: At production scale, per-query API costs escalated unsustainably.
2. **Black-Box Retrieval**: We had no control over chunk boundaries, metadata filters, or reranking weights, leading to low recall on dense medical terminology.

We rebuilt the pipeline from scratch in **FastAPI**, creating a **multi-stage retrieval cascade** that slashed operational costs by **~10x** while boosting answer precision.

---

## 1. The Cascade Architecture

Instead of asking a single retriever to find the top 5 chunks, a cascading pipeline breaks retrieval into specialized stages:

\`\`\`
Stage 1: Broad Dense Retrieval (Fast Recall)
Query --> Embedding Model --> Dense Vector Search --> Top 100 Candidates

Stage 2: Metadata & Hard Filtering (Precision)
Top 100 Candidates --> MySQL Metadata Index (Date, Department, Doc Type) --> Top 40 Candidates

Stage 3: Cross-Encoder Reranking (Semantic Relevance)
Top 40 Candidates --> Lightweight Cross-Encoder (bge-reranker) --> Top 5 Reranked Chunks

Stage 4: Context Budgeting
Top 5 Chunks --> Token Budget Allocator --> Prompt Assembly for LLM
\`\`\`

---

## 2. Why Cross-Encoder Reranking Matters

Bi-encoder embedding models (which compute dot products between pre-computed vectors) are blazingly fast, but they compress an entire paragraph into a single 768-dimensional vector. Fine nuances are inevitably lost.

A **Cross-Encoder** takes the query and candidate chunk together and processes them through all attention layers simultaneously:
$$\\text{Score} = \\text{CrossEncoder}(\\text{Query}, \\text{Candidate})$$

Because cross-encoders are computationally expensive, you cannot run them across 50,000 documents. But running them across **Top 40 candidates** takes only ~25ms on CPU or ~5ms on GPU, yielding dramatically better relevance than vector search alone.

---

## 3. Metadata Architecture: Pinecone to MySQL Migration

Initially, document metadata (dates, authors, access controls) was stored directly inside Pinecone metadata filters. However, complex multi-attribute range queries inside vector databases are notoriously slow and expensive.

We separated concerns:
- **Pinecone**: Stores only vector IDs and embeddings.
- **MySQL**: Stores rich, relational document metadata with composite B-Tree indexes.

This decoupled design reduced vector index size, improved filtering speed by 3x, and gave us complete transactional control over document updates.
    `
  }
];
