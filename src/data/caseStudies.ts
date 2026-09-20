export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Inference & Systems" | "Defense & Air-Gap" | "Enterprise AI" | "Knowledge Systems" | "Local-First Desktop";
  role: string;
  organization: string;
  period: string;
  isConfidential: boolean;
  publicSafeNotice?: string;
  metrics: Array<{ label: string; value: string }>;
  tags: string[];
  context: string;
  constraints: string[];
  whyStandardFailed: string;
  architectureSummary: string;
  architectureDiagram?: string;
  keyDecisions: Array<{ title: string; explanation: string }>;
  results: string[];
  failureModesAndDebugging: string;
  tradeoffs: string;
  futureImprovements: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "blackwell-vllm-inference",
    slug: "blackwell-vllm-inference",
    title: "Serving an 8B FP8 LLM with 40K Context on a 16 GB Blackwell GPU",
    subtitle: "Inference memory budgeting, FP8 KV cache enablement, and throughput optimization on NVIDIA RTX 5060 Ti",
    category: "Inference & Systems",
    role: "AI Engineer",
    organization: "Inferigence Quotient",
    period: "2025",
    isConfidential: false,
    metrics: [
      { label: "Usable Context Length", value: "22K → 40K" },
      { label: "Aggregate Throughput", value: "~750 tok/s" },
      { label: "Concurrent Batch Size", value: "10–20 reqs" },
      { label: "VRAM Utilization", value: "~15 GB / 16 GB" }
    ],
    tags: ["vLLM", "NVIDIA Blackwell", "RTX 5060 Ti", "FP8 KV Cache", "PagedAttention", "Memory Budgeting"],
    context: "Deploying high-throughput, long-context LLMs on single consumer/workstation GPUs is one of the hardest constraints in local AI engineering. The goal was to serve Ministral-3-8B FP8 with reliable long-context capability (up to 40,000 tokens) and multi-user concurrency for document intelligence within an unforgiving 16 GB VRAM budget on a new NVIDIA RTX 5060 Ti (Blackwell architecture).",
    constraints: [
      "Strict 16 GB VRAM ceiling: Out-of-Memory (OOM) crashes if allocations exceed physical limits.",
      "Support long-context document synthesis (target 32K–40K tokens per request).",
      "Sustain concurrent batch requests (10–20 parallel queries) without serializing queues.",
      "Maintain high token generation throughput (target >600 tokens/sec aggregate)."
    ],
    whyStandardFailed: "In default BF16 or standard FP16 serving, model weights consume ~16 GB alone, leaving zero room for KV cache. Even in FP8 weight quantization, standard 16-bit KV caching consumes ~0.4 MB per token across layers. At 22K context with concurrent requests, the KV cache alone demanded >9 GB, exhausting available memory and crashing the server.",
    architectureSummary: "Engineered a vLLM serving pipeline leveraging 8-bit FP8 weight quantization paired with an experimental FP8 KV cache and prompt-aware scheduling. By reducing KV cache memory footprint per token by 50%, VRAM was precisely partitioned into: 8.2 GB model weights, 6.2 GB dynamic PagedAttention FP8 KV cache blocks, and ~0.6 GB CUDA runtime/activation buffer, running at ~15.0 GB peak utilization.",
    keyDecisions: [
      {
        title: "FP8 KV Cache with Calibration",
        explanation: "Enabled FP8 (e4m3fn) KV cache inside vLLM. This cut the memory requirement per token in half without discernible degradation in long-document needle-in-a-haystack retrieval benchmarks."
      },
      {
        title: "PagedAttention & Memory Budgeting",
        explanation: "Tuned gpu_memory_utilization to 0.94 and calibrated max_model_len to 40,960 tokens, providing maximum KV cache block pre-allocation while preventing CUDA allocator thrashing."
      },
      {
        title: "Prompt-Aware Batch Scheduling",
        explanation: "Configured max_num_batched_tokens and continuous batching so that long document prompts and short iterative prompts were co-scheduled efficiently, keeping TTFT (time-to-first-token) predictable."
      }
    ],
    results: [
      "Expanded practical usable context length from ~22K to ~40K tokens without OOM crashes.",
      "Served concurrent batches of 10–20 requests with aggregate throughput reaching ~750 output tokens/second.",
      "Maintained stable continuous uptime within a tight ~15 GB VRAM footprint on consumer-class 16 GB Blackwell hardware."
    ],
    failureModesAndDebugging: "During initial rollout, sudden bursts of 35K+ token prompts caused KV-cache block starvation, resulting in request queuing spikes. We diagnosed this using vLLM Prometheus metrics, uncovering that prefill chunks were holding allocations too long. We adjusted chunked prefill settings and tuned batch token ceilings to maintain steady streaming throughput.",
    tradeoffs: "FP8 KV cache introduces slight precision trade-offs in extreme mathematical reasoning, but for long-form document synthesis, extraction, and summarization, benchmark perplexity remained virtually identical to FP16.",
    futureImprovements: "Evaluate dynamic speculative decoding with a 1B draft model to further boost single-stream token generation speeds without increasing VRAM consumption."
  },
  {
    id: "indian-navy-platform",
    slug: "indian-navy-platform",
    title: "Secure Air-Gapped Document Intelligence Platform",
    subtitle: "Architecting a multi-service on-premise local-LLM platform for defense document intelligence and operational decision support",
    category: "Defense & Air-Gap",
    role: "AI Engineer",
    organization: "Inferigence Quotient",
    period: "Feb 2025 – Present",
    isConfidential: true,
    publicSafeNotice: "Architecture and operational patterns discussed at a public-safe systems level. Specific defense operational data, internal networks, and proprietary assets are omitted.",
    metrics: [
      { label: "Microservices", value: "5+ Dockerized" },
      { label: "Cloud Dependencies", value: "0 (Air-Gapped)" },
      { label: "On-Site Deployments", value: "3 Trips (Mumbai)" },
      { label: "Availability", value: "High Uptime" }
    ],
    tags: ["Air-Gapped Ops", "Docker Compose", "RabbitMQ", "vLLM", "MongoDB", "MinIO", "OCR", "FastAPI"],
    context: "The Indian Navy required an end-to-end intelligent platform to ingest, index, synthesize, and query massive volumes of operational documents, reports, and legacy maritime files. The system evolved from initial RAG experiments into a sovereign, secure on-premise local-LLM decision support platform.",
    constraints: [
      "Strict Air-Gap: Absolute isolation from the public internet. No cloud APIs, no remote package managers, no external telemetry.",
      "Heavy Ingestion Burden: Continuous streams of dense scanned PDFs, structured records, and multi-page technical manuals requiring OCR.",
      "High Reliability: Must run autonomously without frequent manual DevOps intervention or remote debugging access."
    ],
    whyStandardFailed: "Standard cloud-hosted RAG platforms (OpenAI, AWS Bedrock) were legally and architecturally unusable due to sovereign defense data policies. Furthermore, naive single-container Python prototypes crashed during heavy batch document ingestion and could not handle concurrent OCR + LLM inference.",
    architectureSummary: "Decomposed the system into an asynchronous microservices platform deployed via hardened Docker Compose: Ingestion & OCR Service, RabbitMQ message broker for decoupled task distribution, MongoDB for operational metadata and timelines, MinIO for S3-compatible local object storage, a local vLLM model serving engine, and a FastAPI orchestration API.",
    keyDecisions: [
      {
        title: "Decoupled Asynchronous Ingestion",
        explanation: "Used RabbitMQ to separate long-running OCR and text chunking tasks from real-time LLM inference, ensuring user query latency remained unaffected even during massive bulk file uploads."
      },
      {
        title: "Air-Gapped Artifact Packaging",
        explanation: "Built self-contained, reproducible offline Docker image bundles and pip/wheel caches, enabling zero-assumption physical deployments via secure transfer drives."
      },
      {
        title: "Direct Stakeholder Delivery & Rollout",
        explanation: "Traveled for three multi-day on-site deployment trips in Mumbai, working directly with naval officers and technical staff to tune interfaces, debug on-prem hardware quirks, and gather production feedback."
      }
    ],
    results: [
      "Successfully deployed a 100% self-hosted, sovereign document intelligence platform currently operating on-premise.",
      "Processed hundreds of thousands of operational pages with automated entity extraction, citation grounding, and report generation.",
      "Established reproducible offline upgrade procedures and robust service recovery mechanisms."
    ],
    failureModesAndDebugging: "During the first deployment in Mumbai, hardware differences on the local server caused CUDA library mismatches and unexpected OCR thread locks on large scanned blueprints. We resolved this by isolating OCR processing into sandboxed worker pools with CPU core affinity and packaging verified CUDA runtime drivers inside the base images.",
    tradeoffs: "Prioritized strict data isolation and offline reproducibility over cloud elastic auto-scaling. Every service boundary is bounded and monitored locally.",
    futureImprovements: "Implement local continuous feedback loop with human-in-the-loop validation metrics to further fine-tune domain adapters."
  },
  {
    id: "salesforce-saql-analytics",
    slug: "salesforce-saql-analytics",
    title: "When RAG Is the Wrong Tool: Rebuilding Analytics Around SAQL",
    subtitle: "Replacing inaccurate RAG with schema-grounded executable query generation over Salesforce Einstein Analytics",
    category: "Enterprise AI",
    role: "Independent AI Engineer — Consulting",
    organization: "LeanAgile Nautics / Upwork",
    period: "Oct 2025 – May 2026",
    isConfidential: false,
    metrics: [
      { label: "Math Accuracy", value: "100% Deterministic" },
      { label: "Hallucinations", value: "0 on Aggregations" },
      { label: "Query Speed", value: "Sub-second API" },
      { label: "End-to-End Ownership", value: "Architecture to Prod" }
    ],
    tags: ["Salesforce SAQL", "FastAPI", "Intent Routing", "Query Validation", "Deterministic AI", "Enterprise"],
    context: "An enterprise logistics client needed a conversational assistant to answer complex numerical business intelligence questions over millions of enterprise records in Salesforce Einstein Analytics (CRM Analytics).",
    constraints: [
      "Mathematical Precision: Business executives cannot tolerate approximate or hallucinated revenue, shipment counts, or inventory metrics.",
      "Complex Multi-Dimensional Aggregations: Questions involved multi-level grouping, date filters, and custom fiscal calendars.",
      "Strict Enterprise Security: Queries must honor account-level scoping and schema constraints."
    ],
    whyStandardFailed: "The client initially hired a team that built a standard RAG pipeline: chunking reports into vector databases and asking an LLM to answer. This failed disastrously—the LLM hallucinated sums, averaged percentages incorrectly, missed rows that fell outside the top-k retrieved chunks, and could not calculate dynamic totals.",
    architectureSummary: "Redesigned the entire architecture around deterministic execution: User Question → Intent Router → Schema Grounding Layer → SAQL Query Generator → AST / Schema Validator → Salesforce Analytics API Execution → Structured Result Formatter → Natural Language Synthesizer, with fallback paths for unstructured knowledge queries.",
    keyDecisions: [
      {
        title: "RAG Replacement with Executable Queries",
        explanation: "Replaced probabilistic vector retrieval with code generation. Grounding comes from the system of record executing exact SAQL queries, not from retrieved text chunks."
      },
      {
        title: "AST Validation & Safe Execution Guardrails",
        explanation: "Built a validator that parses generated SAQL against the live Salesforce schema, catching syntax errors and unauthorized field accesses before sending the query to the API."
      },
      {
        title: "Intent Routing & Dual-Track Execution",
        explanation: "Created a router that identifies whether a question requires exact analytical metrics (SAQL execution) or policy/procedural information (knowledge retrieval)."
      }
    ],
    results: [
      "Achieved 100% deterministic mathematical accuracy across all enterprise analytics queries.",
      "Eliminated numerical hallucinations entirely by delegating computation to the database engine.",
      "Delivered production FastAPI microservices integrated into the client's operational logistics workflow."
    ],
    failureModesAndDebugging: "In initial testing, ambiguous user date phrasing ('Q3 last year') caused incorrect calendar filtering. We introduced an explicit date-resolution pre-processor that maps conversational temporal references to exact corporate fiscal period timestamps.",
    tradeoffs: "Requires rigorous schema maintenance and validation logic compared to the quick-and-dirty setup of a vector database, but provides guaranteed accuracy.",
    futureImprovements: "Add automated query explanation cards showing the generated SAQL code and visual bar charts directly in the chat interface."
  },
  {
    id: "evidence-backed-memory",
    slug: "evidence-backed-memory",
    title: "Self-Revising Evidence-Backed Memory Engine",
    subtitle: "Building long-term memory that resolves factual contradictions and supersedes stale information across OCR documents",
    category: "Knowledge Systems",
    role: "AI Engineer",
    organization: "Inferigence Quotient",
    period: "2025",
    isConfidential: true,
    publicSafeNotice: "Conceptual and architectural patterns demonstrated; operational records sanitized.",
    metrics: [
      { label: "Provenance", value: "Exact Page Spans" },
      { label: "Revision Handling", value: "Superseding Semantics" },
      { label: "Temporal Accuracy", value: "Timeline-Aware" }
    ],
    tags: ["Knowledge Representation", "Temporal Reasoning", "OCR", "Evidence Grounding", "Revision Semantics"],
    context: "In intelligence and legal operations, documents are published chronologically. An operational status report from March can be amended or completely superseded by an order issued in July. Standard vector stores treat all text chunks as equally valid, causing LLMs to generate contradictory answers.",
    constraints: [
      "Preserve historical provenance: Must know what was true at time T1 without conflating it with time T2.",
      "Auditability: Every assertion in generated reports must link to an exact page, line, or paragraph span in the original scanned PDF.",
      "Automated revision: When a newer document supersedes an older fact, the knowledge layer must update the active state while preserving the historical audit log."
    ],
    whyStandardFailed: "Vector databases only measure geometric cosine similarity. If an old document says 'Unit Alpha is deployed to Sector 4' and a new document says 'Unit Alpha relocated to Sector 9', both have high similarity to the query 'Where is Unit Alpha?'. A naive LLM either hallucinates a merged answer or selects the wrong chunk.",
    architectureSummary: "Built a temporal knowledge graph and revision engine. As OCR documents are processed, temporal entities, active statuses, and claim spans are extracted. When newer records arrive, the engine executes revision semantics: marking previous records as 'superseded' with pointers to the new evidence, while maintaining full timeline provenance.",
    keyDecisions: [
      {
        title: "Timeline & Entity Extraction Pipeline",
        explanation: "Extracted structured temporal anchors and entity states alongside raw text, indexing facts with effective date windows."
      },
      {
        title: "Exact Bounding-Box Evidence Linking",
        explanation: "Maintained coordinate-level pointers back to scanned PDF page coordinates, allowing users to hover over any statement and view the original highlighted document excerpt."
      },
      {
        title: "Contradiction Resolution Logic",
        explanation: "Implemented automated heuristic and LLM-assisted verification to detect conflicting assertions between newly ingested documents and active knowledge state."
      }
    ],
    results: [
      "Zero factual contradictions in multi-document synthesis across chronologically evolving records.",
      "Full audit trail enabling operators to inspect both the current truth and historical evolution of facts.",
      "Significantly higher user trust due to verifiable visual citation bounding boxes."
    ],
    failureModesAndDebugging: "OCR noise occasionally distorted timestamps (e.g. '2023' read as '2028'). We implemented chronological sanity checks comparing document file metadata and surrounding narrative context to flag suspicious date anomalies before committing revisions.",
    tradeoffs: "Higher ingestion latency per document due to extraction and verification stages, but orders of magnitude higher generation quality.",
    futureImprovements: "Implement automated diff summaries explaining what changed between successive document revisions."
  },
  {
    id: "inkwell-desktop-ide",
    slug: "inkwell-desktop-ide",
    title: "Inkwell: Local-First AI Desktop IDE for Technical PDFs",
    subtitle: "Auditable AI actions, exact PDF text rectangle grounding, and local vLLM routing built with Tauri 2, Rust & React 19",
    category: "Local-First Desktop",
    role: "Lead Architect & Developer",
    organization: "Personal Project",
    period: "Jun 2026 – Present",
    isConfidential: false,
    metrics: [
      { label: "Stack", value: "Tauri 2 + Rust + React 19" },
      { label: "Storage", value: "SQLite WAL + Atomic Commits" },
      { label: "Tool Server", value: "Read-Only MCP Server" },
      { label: "Inference", value: "Local vLLM / Qwen" }
    ],
    tags: ["Tauri 2", "Rust", "React 19", "SQLite WAL", "PDFium", "vLLM", "MCP", "Local-First"],
    context: "Engineers and researchers spend countless hours reading complex technical papers, manuals, and books. Inkwell is an evidence-backed desktop IDE that treats AI actions as auditable, reversible software operations rather than magical, unpredictable mutations.",
    constraints: [
      "Strict Local Privacy: User papers, annotations, and notes must remain on local disk.",
      "Auditable AI Operations: AI should never secretly mutate notes; all changes must be previewed as diff sets and committed via atomic transactions.",
      "High-Performance PDF Rendering: Instant rendering of multi-hundred-page technical manuals without UI lag."
    ],
    whyStandardFailed: "Existing PDF tools either wrap a generic web chat around a document without spatial grounding, or upload private PDFs to cloud APIs without user consent, lacking reversible transactional controls.",
    architectureSummary: "Built on Tauri 2 with Rust backend and React 19 frontend. Uses PDFium/PDF.js for sub-millisecond page rendering, background SQLite with WAL mode for zero-conflict local persistence, local OpenAI-compatible vLLM routing with Qwen models, and an integrated read-only MCP server exposing scoped tools.",
    keyDecisions: [
      {
        title: "Exact PDF-Space Coordinate Grounding",
        explanation: "AI responses link to exact PDF page bounding rectangles, enabling instant citation jumps and inline visual overlays."
      },
      {
        title: "Atomic & Reversible Change Sets",
        explanation: "AI-generated flashcards, summaries, and assessments are presented as atomic diffs that can be individually accepted, edited, or rolled back."
      },
      {
        title: "Scoped Read-Only MCP Server",
        explanation: "Exposes document search and page context tools to external agentic assistants via the Model Context Protocol without ever leaking local filesystem paths."
      }
    ],
    results: [
      "Shipped a blazingly fast desktop app with local model inference and zero cloud telemetry.",
      "100% auditability and reversibility on all AI-assisted notes and annotations.",
      "Full MCP interoperability with external developer agents."
    ],
    failureModesAndDebugging: "Complex multi-column IEEE research papers caused naive text extractors to mix text across columns. We implemented spatial layout analysis in Rust to reconstruct reading order before passing context to local LLMs.",
    tradeoffs: "Desktop deployment requires user to have a local LLM or API endpoint, prioritizing technical users and privacy over casual web convenience.",
    futureImprovements: "Add collaborative peer-to-peer note synchronization using CRDTs over local network."
  }
];
