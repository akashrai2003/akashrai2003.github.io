export interface SkillCategory {
  category: string;
  description: string;
  skills: Array<{
    name: string;
    level: "Core" | "Advanced" | "Production" | "Learning";
    context: string;
  }>;
}

export const skillCategories: SkillCategory[] = [
  {
    category: "LLM Systems & Inference Optimization",
    description: "Hands-on model serving, memory budgeting, quantization, and GPU workstation orchestration",
    skills: [
      { name: "vLLM Serving", level: "Production", context: "Serving Ministral, Gemma, and Qwen models with custom memory and batching parameters" },
      { name: "PagedAttention & Memory Budgeting", level: "Production", context: "Tuning max-model-len, max-num-seqs, and VRAM ceilings to prevent OOM errors" },
      { name: "FP8 KV Caching & Quantization", level: "Advanced", context: "Configuring FP8 KV cache allocations and 8-bit weight quantization to double concurrency" },
      { name: "Chunked Prefill Scheduling", level: "Advanced", context: "Mitigating TTFT spikes by interleaving prompt chunking with decode cycles" },
      { name: "Containerized GPU Workstations", level: "Production", context: "Packaging vLLM, drivers, and models inside isolated Docker environments" },
      { name: "PEFT / LoRA Fine-Tuning", level: "Advanced", context: "Domain adaptation benchmarks on multi-GPU instances using curated domain corpora" }
    ]
  },
  {
    category: "Languages & Frameworks",
    description: "Core programming languages and frameworks used in daily production engineering",
    skills: [
      { name: "Python (Core Language)", level: "Production", context: "Primary language for ML systems, inference pipelines, backend services, and automation" },
      { name: "PyTorch & CuPy", level: "Production", context: "Model loading, tensor manipulations, and lightweight GPU-accelerated microservices" },
      { name: "FastAPI", level: "Production", context: "High-throughput asynchronous APIs, typed schemas, and OpenAI-compatible streaming endpoints" },
      { name: "React & TypeScript", level: "Advanced", context: "Interactive web interfaces and desktop UI development (Tauri/React)" },
      { name: "Bash & Linux CLI", level: "Production", context: "Shell scripting, server management, and system monitoring" }
    ]
  },
  {
    category: "Agentic Workflows & Orchestration",
    description: "State-machine orchestration, tool execution, bounded autonomy, and spatial analysis",
    skills: [
      { name: "LangGraph", level: "Production", context: "Multi-stage state machines with explicit transitions, validators, and structured fallbacks" },
      { name: "Model Context Protocol (MCP)", level: "Production", context: "Scoped read-only tool servers without leaking host paths (Inkwell, SocialGraph)" },
      { name: "Agentic Geospatial Analytics", level: "Production", context: "LLMs driving MBTiles playback and dynamic Vega-Lite analytical charts" },
      { name: "Deterministic Tool Interfaces", level: "Production", context: "Schema validation, bounded execution loops, and error recovery" }
    ]
  },
  {
    category: "Backend & Systems Infrastructure",
    description: "Production microservices, messaging, air-gapped deployments, and storage",
    skills: [
      { name: "Docker & Docker Compose", level: "Production", context: "Multi-service air-gapped platform deployment and offline delivery" },
      { name: "RabbitMQ & MinIO", level: "Production", context: "Job queues, asynchronous document ingestion, and S3-compatible storage" },
      { name: "MongoDB & MySQL", level: "Production", context: "Document storage, metadata indexing, and high-performance querying" },
      { name: "Sovereign Air-Gapped Ops", level: "Production", context: "3 on-site deployments in Mumbai with zero external internet access" },
      { name: "Git & Open Source Workflow", level: "Production", context: "Merged PR #3262 in 12K★ kepler.gl, clean PRs, and CI/CD pipelines" }
    ]
  },
  {
    category: "Systems Learning Roadmap",
    description: "Low-level systems and GPU programming actively being studied from first principles",
    skills: [
      { name: "C++ Systems Programming", level: "Learning", context: "Starting from scratch to understand runtime execution and build low-level inference backends" },
      { name: "CUDA & GPU Architecture", level: "Learning", context: "Actively studying thread block scheduling, shared memory hierarchies, and kernel execution" }
    ]
  }
];
