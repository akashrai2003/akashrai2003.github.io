export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  period: string;
  category: "Desktop & Local-First" | "Data & Knowledge Graph" | "Model Fine-Tuning" | "Distributed Systems";
  featured: boolean;
  status: "Active" | "Completed" | "Hackathon Shortlist";
  github?: string;
  demoUrl?: string;
  stack: string[];
  metrics: string[];
  summary: string;
  features: string[];
  architectureNotes: string;
}

export const projects: ProjectItem[] = [
  {
    id: "inkwell",
    title: "Inkwell — Evidence-Backed AI Learning IDE",
    tagline: "Local-first desktop IDE for technical PDFs with auditable AI actions and exact PDF text grounding",
    period: "Jun 2026 – Present",
    category: "Desktop & Local-First",
    featured: true,
    status: "Active",
    github: "https://github.com/akashrai2003",
    stack: ["React 19", "TypeScript", "Rust", "Tauri 2", "SQLite WAL", "PDFium", "vLLM", "MCP"],
    metrics: ["100% Local Privacy", "Sub-millisecond PDF Rendering", "Atomic SQLite Commits", "Zero Cloud Telemetry"],
    summary: "A high-performance local-first desktop application designed for deep technical reading. Connects to local OpenAI-compatible vLLM endpoints, grounding all notes and assessments to exact PDF-space coordinate rectangles.",
    features: [
      "Exact coordinate grounding linking AI assertions directly to visual highlight rectangles on PDF pages.",
      "Atomic, reversible change sets where AI-generated flashcards and assessments are previewed as diffs and committed via SQLite transactions.",
      "Privacy-aware model routing defaulting sensitive documents to local Qwen models on vLLM with gated cloud fallbacks.",
      "Integrated read-only MCP server allowing external AI agents to query paper context without leaking filesystem paths."
    ],
    architectureNotes: "Engineered on Tauri 2 with Rust handling PDFium text extraction and SQLite WAL storage. React 19 handles the reactive document viewer and canvas overlay."
  },
  {
    id: "socialgraph",
    title: "SocialGraph — LLM Knowledge Graph Pipeline",
    tagline: "Asynchronous 5-stage ETL pipeline converting 1,500+ posts into a navigable Obsidian knowledge graph",
    period: "2026",
    category: "Data & Knowledge Graph",
    featured: true,
    status: "Completed",
    github: "https://github.com/akashrai2003",
    stack: ["FastAPI", "Playwright", "vLLM", "NetworkX", "Leiden Algorithm", "MCP", "Python"],
    metrics: ["1,500+ Posts Ingested", "8 MCP Tools", "25+ CLI Commands", "74+ Tests in CI"],
    summary: "Transforms unstructured saved social and technical posts into a richly linked personal knowledge graph with automated semantic edge inference, Leiden community clustering, and MCP developer tooling.",
    features: [
      "5-stage asynchronous ETL pipeline with idempotent checkpoints for crash-safe incremental reruns.",
      "Multi-provider LLM routing between a self-hosted Qwen 9B FP8 on vLLM and hosted Llama 3.3 70B.",
      "Local cosine-similarity embeddings, Leiden graph community detection, and NetworkX topological analysis.",
      "FastAPI interactive dashboard, 25+ CLI commands, and an 8-tool MCP server for AI IDE integration."
    ],
    architectureNotes: "Built with robust software engineering rigor: 74+ unit and integration tests running on GitHub Actions CI."
  },
  {
    id: "amd-sft-reasoning",
    title: "AMD AI Premier League — SFT Reasoning Agents",
    tagline: "Fine-tuning Qwen3-4B SLMs for multi-step logic and mathematics on AMD MI300X accelerators",
    period: "Jul 2025",
    category: "Model Fine-Tuning",
    featured: false,
    status: "Hackathon Shortlist",
    github: "https://github.com/akashrai2003",
    stack: ["Qwen3", "PyTorch", "torchtune", "vLLM", "AMD MI300X", "ROCm"],
    metrics: ["Shortlisted Nationwide", "AMD MI300X Accelerated", "Custom Reasoning Datasets"],
    summary: "Developed specialized reasoning datasets and conducted supervised fine-tuning (SFT) of two Qwen3-4B small language models on AMD MI300X hardware for AMD's flagship national AI competition.",
    features: [
      "Engineered multi-turn reasoning traces for complex logic puzzles, discrete math, and deductive tasks.",
      "Trained with torchtune pipelines on AMD Instinct MI300X accelerators utilizing ROCm software stack.",
      "Served adapted models through vLLM for high-throughput competitive head-to-head evaluation."
    ],
    architectureNotes: "Demonstrated hardware diversity by optimizing and serving models on AMD enterprise AI infrastructure."
  },
  {
    id: "distributed-tuning",
    title: "Distributed LLM Fine-Tuning & Quantization",
    tagline: "Scalable fine-tuning on Azure CPU clusters with Horovod, Ray Tune, and quantization trade-off analysis",
    period: "May 2025",
    category: "Distributed Systems",
    featured: false,
    status: "Completed",
    github: "https://github.com/akashrai2003",
    stack: ["Horovod", "Ray Tune", "Azure", "PEFT", "GGUF", "AWQ", "GPTQ"],
    metrics: ["Distributed CPU Clusters", "Quantization Benchmarking", "Hyperparameter Search"],
    summary: "Implemented distributed training experiments using Horovod and Ray Tune on Azure CPU clusters with PEFT, evaluating GGUF, AWQ, and GPTQ quantization trade-offs across model size, latency, and perplexity.",
    features: [
      "Automated distributed hyperparameter search across learning rates, rank dimension, and LoRA alpha.",
      "Benchmarked GGUF vs AWQ vs GPTQ memory footprint and token generation latency across varied batch sizes."
    ],
    architectureNotes: "Explored cost-efficient cluster training and quantization trade-offs for production deployment."
  }
];
