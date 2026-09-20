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
    id: "vllm-inference-optimization",
    slug: "vllm-inference-optimization",
    title: "High-Throughput LLM Inference: PagedAttention, FP8 KV Caching, and Continuous Batching",
    subtitle: "Systematic VRAM memory budgeting, KV cache quantization, and chunked prefill scheduling in vLLM",
    category: "Inference & Systems",
    role: "AI Engineer",
    organization: "Inferigence Quotient",
    period: "2025",
    isConfidential: false,
    metrics: [
      { label: "Memory Strategy", value: "FP8 PagedAttention" },
      { label: "Concurrency Policy", value: "Continuous Batching" },
      { label: "Prefill Handling", value: "Chunked Scheduling" },
      { label: "Serving Engine", value: "vLLM Production" }
    ],
    tags: ["vLLM", "PagedAttention", "FP8 KV Cache", "Memory Budgeting", "Continuous Batching", "Chunked Prefill"],
    context: "In high-throughput LLM serving, GPU memory is dominated not just by static model weights, but by dynamic Key-Value (KV) cache allocations across concurrent sequences. Under long-document workloads, naive inference engines either trigger Out-of-Memory (OOM) aborts or severely throttle concurrency. The engineering objective was to optimize an 8B model serving stack to handle long contexts with high concurrent batch throughput within tight physical memory bounds.",
    constraints: [
      "Strict physical VRAM envelope: Allocations must not exceed available hardware capacity.",
      "Long-document context requirements: System must process multi-thousand-token document prompts without sequence truncation.",
      "High concurrency demand: Must sustain concurrent batch streams without serializing request queues.",
      "Time-to-First-Token (TTFT) guarantees: Long prompt prefills must not starve active decoding iterations."
    ],
    whyStandardFailed: "In default FP16 serving, model weights consume substantial memory while standard 16-bit KV caching requires ~144 KB per token across model layers. Under long contexts and multi-user concurrency, KV cache memory quickly exceeds available VRAM, causing memory thrashing and allocator crashes. Furthermore, un-chunked prefills introduce massive latency spikes for concurrent decode steps.",
    architectureSummary: "Engineered a production vLLM serving pipeline combining 8-bit weight quantization with an calibrated FP8 KV cache and chunked prefill scheduling. By reducing the memory footprint per KV token by 50%, VRAM was deterministically budgeted between static model weights, a pre-allocated dynamic PagedAttention block pool, and a guarded CUDA activation buffer.",
    keyDecisions: [
      {
        title: "Calibrated FP8 KV Cache Allocation",
        explanation: "Enabled FP8 (e4m3fn) KV cache storage inside vLLM. This cut the per-token memory requirement across attention layers in half while maintaining benchmark perplexity parity with FP16."
      },
      {
        title: "PagedAttention & Deterministic Budgeting",
        explanation: "Configured GPU memory utilization ceiling and max model lengths to pre-allocate maximum valid KV block tables in memory while reserving dedicated headroom for CUDA driver runtime allocations."
      },
      {
        title: "Chunked Prefill Scheduling",
        explanation: "Enforced chunked prefill thresholds to break massive document prompts into bounded token chunks, interleaving prefill computation with active decode passes and eliminating TTFT latency spikes."
      }
    ],
    results: [
      "Substantially increased effective sequence capacity and concurrency without memory aborts.",
      "Maintained stable continuous throughput across high-concurrency burst workloads.",
      "Preserved predictable latency profiles under mixed prefill/decode traffic."
    ],
    failureModesAndDebugging: "During stress testing, bursty long prompts initially caused KV-cache block exhaustion under rapid arrival rates. By profiling the execution using Prometheus metrics, we identified that prefill chunks were holding allocations excessively. Tuning batch token ceilings and max sequence limits resolved the bottleneck.",
    tradeoffs: "FP8 KV caching requires careful validation on needle-in-a-haystack tasks, but yields substantial gains in hardware efficiency and throughput.",
    futureImprovements: "Evaluate dynamic speculative decoding with small draft models to further optimize single-stream token generation latency."
  },
  {
    id: "indian-navy-platform",
    slug: "indian-navy-platform",
    title: "Sovereign Air-Gapped Document Intelligence Platform",
    subtitle: "Architecting a multi-service on-premise local-LLM platform for defense document intelligence and operational decision support",
    category: "Defense & Air-Gap",
    role: "AI Engineer",
    organization: "Inferigence Quotient",
    period: "Feb 2025 – Present",
    isConfidential: true,
    publicSafeNotice: "Architecture and operational patterns discussed at a public-safe systems level. Specific defense operational data, internal networks, and proprietary assets are omitted.",
    metrics: [
      { label: "Architecture", value: "5+ Docker Services" },
      { label: "Network Egress", value: "Zero (Air-Gapped)" },
      { label: "On-Site Rollouts", value: "3 Trips (Mumbai)" },
      { label: "Serving", value: "Local vLLM / OCR" }
    ],
    tags: ["Air-Gapped Ops", "Docker Compose", "RabbitMQ", "vLLM", "MongoDB", "MinIO", "OCR", "FastAPI"],
    context: "The Indian Navy required an end-to-end intelligent platform to ingest, index, synthesize, and query massive volumes of operational documents, reports, and legacy maritime files. The system evolved from initial RAG experiments into a sovereign, secure on-premise local-LLM decision support platform.",
    constraints: [
      "Strict Air-Gap: Absolute isolation from the public internet. No cloud APIs, no remote package managers, no external telemetry.",
      "Heavy Ingestion Burden: Continuous streams of dense scanned PDFs, structured records, and multi-page technical manuals requiring OCR.",
      "High Reliability: Must run autonomously without frequent manual DevOps intervention or remote debugging access."
    ],
    whyStandardFailed: "Standard cloud-hosted RAG platforms were legally and architecturally unusable due to sovereign defense data policies. Furthermore, naive single-container Python prototypes crashed during heavy batch document ingestion and could not handle concurrent OCR + LLM inference.",
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
    title: "Deterministic Enterprise Analytics: Replacing RAG with Executable SAQL",
    subtitle: "Replacing probabilistic vector similarity with schema-grounded query synthesis over Salesforce Einstein Analytics",
    category: "Enterprise AI",
    role: "Independent AI Engineer — Consulting",
    organization: "LeanAgile Nautics / Upwork",
    period: "Oct 2025 – May 2026",
    isConfidential: false,
    metrics: [
      { label: "Math Accuracy", value: "100% Deterministic" },
      { label: "Validation", value: "AST Schema Guardrails" },
      { label: "Execution Engine", value: "System of Record" },
      { label: "Ownership", value: "Architecture to Prod" }
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
      { label: "Revision Semantics", value: "Temporal Graph" },
      { label: "Resolution", value: "Automated Checks" },
      { label: "Audit Trail", value: "Full Historical Lineage" }
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
    title: "Inkwell: Local-First Desktop Architecture with Auditable AI Transactions",
    subtitle: "Auditable AI actions, exact PDF text rectangle grounding, and local vLLM routing built with Tauri 2, Rust & React 19",
    category: "Local-First Desktop",
    role: "Lead Architect & Developer",
    organization: "Personal Project",
    period: "Jun 2026 – Present",
    isConfidential: false,
    metrics: [
      { label: "Core Runtime", value: "Tauri 2 + Rust" },
      { label: "State Engine", value: "SQLite WAL Transactions" },
      { label: "Interoperability", value: "Read-Only MCP Server" },
      { label: "Privacy", value: "100% Local Inference" }
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
