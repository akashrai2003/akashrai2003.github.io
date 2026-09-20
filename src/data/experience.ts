export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: "full-time" | "consulting" | "internship" | "opensource";
  summary: string;
  highlights: string[];
  technologies: string[];
  metrics?: string[];
  badge?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "inferigence-quotient",
    role: "AI Engineer",
    organization: "Inferigence Quotient",
    period: "Feb 2025 – Present",
    location: "Bengaluru, India",
    type: "full-time",
    badge: "Current Role",
    summary: "Architecting and deploying secure on-premise GenAI platforms, optimizing open-weight LLM inference on modern GPU architectures, and delivering air-gapped document intelligence systems directly to enterprise & defense stakeholders.",
    highlights: [
      "Architected and deployed an end-to-end document intelligence platform for the Indian Navy, evolving RAG-based report generation into an air-gapped local-LLM platform for document analysis, generation, and operational decision support.",
      "Engineered an air-gapped microservices architecture (5+ Dockerized services, RabbitMQ, MongoDB, MinIO, OCR pipelines, vLLM serving) and led 3 multi-day on-site client deployments in Mumbai with zero external cloud dependencies.",
      "Optimized Ministral-3-8B FP8 on NVIDIA RTX 5060 Ti (Blackwell) using vLLM, FP8 KV cache, and prompt-aware batching—doubling practical context from 22K to 40K tokens while serving 10–20 concurrent requests at ~750 output tokens/s within a strict 15 GB VRAM budget.",
      "Enabled Gemma-4-12B NVFP4 inference on SM120 Blackwell hardware by systematically resolving CUDA 12.9, FlashInfer, CUTLASS, and JIT-cache build compatibility bottlenecks.",
      "Independently developed an agentic geospatial assistant connecting conversational LLMs with MBTiles map visualization, temporal reasoning, event playback, and Vega-Lite conversational analytics.",
      "Built a long-term knowledge base with OCR timeline extraction and revision semantics that automatically updates stored facts when superseding documents arrive.",
      "Designed a CuPy-powered GPU-accelerated gRPC classifier microservice, accelerating high-throughput batch predictions without importing heavy PyTorch dependencies downstream.",
      "Conducted domain-adaptive pre-training (DAPT) and PEFT/LoRA R&D on 4× NVIDIA L40S GPUs on AWS, curating military-domain corpora and benchmarking against base-model baselines."
    ],
    technologies: ["vLLM", "NVIDIA Blackwell", "CUDA 12.9", "FP8/NVFP4", "FastAPI", "gRPC", "RabbitMQ", "Docker Compose", "MongoDB", "MinIO", "CuPy", "LangGraph", "PEFT/LoRA"],
    metrics: ["40K Context on 16GB GPU", "~750 output tok/s", "5+ Air-gapped Microservices", "3 On-site Deployments"]
  },
  {
    id: "leanagile-nautics",
    role: "Independent AI Engineer — Consulting",
    organization: "LeanAgile Nautics / Upwork",
    period: "Oct 2025 – May 2026",
    location: "Remote",
    type: "consulting",
    badge: "Consulting",
    summary: "Independent technical architecture and development for enterprise clients needing production-grade AI systems, replacing unreliable naive RAG workflows with deterministic query execution and hybrid graph knowledge engines.",
    highlights: [
      "Owned end-to-end architecture and implementation of an enterprise analytics assistant, replacing an inaccurate RAG-first approach with LLM-generated SAQL over Salesforce Einstein Analytics to correctly answer numerical and metric-heavy questions.",
      "Engineered intent routing, query generation, schema-grounded validation, execution against Salesforce APIs, structured result formatting, and fallback paths with supporting FastAPI microservices.",
      "Delivered a second grounded knowledge system combining Neo4j graph retrieval, vector embeddings, and hybrid semantic search across long finance, product, and marketing documents with strict citation grounding."
    ],
    technologies: ["Salesforce SAQL", "FastAPI", "Neo4j", "Vector Search", "Hybrid Retrieval", "Query Routing", "Deterministic Validation"],
    metrics: ["100% Deterministic SAQL Math", "Hybrid Graph + Vector Retrieval"]
  },
  {
    id: "ai-planet",
    role: "AI Developer Intern",
    organization: "AI Planet",
    period: "Sept 2024 – Feb 2025",
    location: "Remote",
    type: "internship",
    summary: "Orchestrated multi-agent state machines and contributed foundational components to open-source GenAI development platforms.",
    highlights: [
      "Built a multi-agent assessment generator using LangGraph state machines, orchestrating specialized LLM agents through a 7-stage workflow for job-aligned question generation and adaptive candidate evaluation.",
      "Contributed modular pipeline components to GenAI Stack, a visual LLM workflow builder, improving pipeline flexibility and reusability."
    ],
    technologies: ["LangGraph", "State Machines", "Multi-Agent Systems", "Python", "Workflow Decomposition"],
    metrics: ["7-Stage Agentic State Machine", "Automated Assessment Generation"]
  },
  {
    id: "deeplogic-ai",
    role: "AI Intern",
    organization: "DeepLogicAI",
    period: "Mar 2024 – Aug 2024",
    location: "Remote",
    type: "internship",
    summary: "Re-engineered production RAG pipelines, eliminating managed SaaS cost bottlenecks while optimizing retrieval recall and precision.",
    highlights: [
      "Developed a custom production-grade medical RAG pipeline with FastAPI, replacing a third-party Vectara RAGaaS dependency and slashing operational costs by ~10×.",
      "Engineered a cascading retrieval pipeline combining dense semantic search, metadata filtering, cross-encoder reranking, and dynamic context budgeting.",
      "Migrated large-scale document metadata from Pinecone to MySQL, designing an optimized indexing schema for faster filtering and lower latency."
    ],
    technologies: ["FastAPI", "Pinecone", "MySQL", "Cross-Encoder Reranking", "Dense Retrieval", "Docker"],
    metrics: ["10x Operational Cost Reduction", "Sub-100ms Cascading Retrieval"]
  }
];

export const openSourceContributions = [
  {
    project: "kepler.gl",
    stars: "12,000+",
    prNumber: "PR #3262",
    status: "Merged",
    date: "Dec 2025",
    description: "Fixed persistent LLM conversation state in the AI Assistant's restart flow in the 12K-star kepler.gl repository. Cleared internal library and Redux state to prevent stale OpenAI/Gemini history from being resent after restart, preventing token waste and hallucination.",
    link: "https://github.com/keplergl/kepler.gl/pull/3262"
  },
  {
    project: "ML-CaPsule (GSSoC'24)",
    stars: "Community",
    prNumber: "PR #750",
    status: "Merged",
    date: "Jun 2024",
    description: "Implemented Bayesian hyperparameter optimization using Gaussian Processes, TPE, and SMAC across MIT-BIH ECG and MNIST experiments, resolving issue #662 and cutting training time by 40% through efficient hyperparameter sampling.",
    link: "https://github.com/akashrai2003"
  }
];
