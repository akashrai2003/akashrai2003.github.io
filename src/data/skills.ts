export interface SkillCategory {
  category: string;
  description: string;
  skills: Array<{
    name: string;
    level: "Core" | "Advanced" | "Production";
    context: string;
  }>;
}

export const skillCategories: SkillCategory[] = [
  {
    category: "LLM Systems & Inference",
    description: "Open-weight model serving, quantization, kernel optimization, and GPU memory budgeting",
    skills: [
      { name: "vLLM", level: "Production", context: "Ministral-3-8B, Gemma-4-12B, Qwen3-9B serving with custom configs" },
      { name: "FP8 / NVFP4 Quantization", level: "Advanced", context: "SM120 Blackwell compatibility, FP8 KV cache, weight quantization" },
      { name: "KV Cache & PagedAttention", level: "Production", context: "VRAM budgeting, max-model-len, max-num-seqs tuning" },
      { name: "CUDA 12.9 / FlashInfer", level: "Advanced", context: "Resolving JIT compilation, CUTLASS kernels, and hardware builds" },
      { name: "CuPy", level: "Production", context: "GPU-accelerated gRPC classifier microservice without PyTorch bloat" },
      { name: "PEFT / LoRA / DAPT", level: "Advanced", context: "Domain-adaptive pretraining on 4× L40S GPUs with curated corpora" }
    ]
  },
  {
    category: "Retrieval & Grounded Knowledge",
    description: "Multi-stage retrieval pipelines, deterministic query generation, and knowledge graphs",
    skills: [
      { name: "RAG & Reranking", level: "Production", context: "Cascading dense retrieval + cross-encoder reranking, context selection" },
      { name: "Salesforce SAQL Generation", level: "Production", context: "Executable queries replacing naive RAG for accurate enterprise metrics" },
      { name: "Neo4j Knowledge Graphs", level: "Production", context: "Graph relationships + vector embeddings hybrid retrieval" },
      { name: "Evidence-Backed Memory", level: "Production", context: "Temporal OCR timeline extraction with revision and update semantics" },
      { name: "Vector Stores", level: "Production", context: "Pinecone, sqlite-vec, MongoDB vector search, MySQL metadata indexing" }
    ]
  },
  {
    category: "Agentic Workflows & Orchestration",
    description: "State-machine orchestration, tool execution, bounded autonomy, and spatial analysis",
    skills: [
      { name: "LangGraph", level: "Production", context: "7-stage state machines with explicit transitions, validators, fallbacks" },
      { name: "Model Context Protocol (MCP)", level: "Production", context: "Scoped read-only tool servers without leaking host paths (Inkwell, SocialGraph)" },
      { name: "Agentic Geospatial Analytics", level: "Production", context: "LLMs driving MBTiles playback and dynamic Vega-Lite charts" },
      { name: "Deterministic Tool Interfaces", level: "Production", context: "Schema validation, bounded loops, structured recovery" }
    ]
  },
  {
    category: "Backend & Systems Infrastructure",
    description: "Production microservices, messaging, air-gapped deployments, and storage",
    skills: [
      { name: "FastAPI / gRPC", level: "Production", context: "High-throughput asynchronous APIs, typed schemas, gRPC services" },
      { name: "Docker & Docker Compose", level: "Production", context: "Multi-service air-gapped platform deployment and offline delivery" },
      { name: "RabbitMQ & MinIO", level: "Production", context: "Job queues, asynchronous ingestion, object storage for OCR documents" },
      { name: "MongoDB & MySQL", level: "Production", context: "Document storage, metadata indexing, high-performance querying" },
      { name: "Linux & Air-Gapped Ops", level: "Production", context: "3 on-site deployments in Mumbai, offline dependency packaging" }
    ]
  },
  {
    category: "Local-First Desktop & Engineering",
    description: "Native apps, PDF intelligence, graph analytics, and distributed experiments",
    skills: [
      { name: "React 19 & TypeScript", level: "Production", context: "High-performance reactive interfaces, modern frontend architecture" },
      { name: "Tauri 2 & Rust", level: "Advanced", context: "Local-first desktop IDE (Inkwell) with SQLite WAL and PDFium" },
      { name: "Python / C++", level: "Production", context: "Core programming languages for ML, backend, and numerical computing" },
      { name: "NetworkX / Leiden", level: "Advanced", context: "Community detection and graph analytics in SocialGraph" }
    ]
  }
];
