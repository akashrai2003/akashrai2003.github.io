export interface SiteConfig {
  name: string;
  headline: string;
  subheadline: string;
  role: string;
  status: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  proofMetrics: Array<{
    value: string;
    label: string;
    context: string;
  }>;
}

export const siteConfig: SiteConfig = {
  name: "Akash Rai",
  role: "AI Systems & GenAI Application Engineer",
  headline: "Building high-throughput inference pipelines, sovereign air-gapped platforms, and deterministic agentic systems in Python.",
  subheadline: "I engineer practical GenAI systems: from multi-service agentic workflows and sovereign air-gapped deployments, to hands-on vLLM inference optimizations (PagedAttention, FP8 KV cache, chunked prefill)—while passionately learning the low-level systems stack from scratch.",
  status: "Open for AI Systems & GenAI Engineering Roles",
  location: "Bengaluru, India (Open to Remote)",
  email: "akashtooop@gmail.com",
  phone: "+91 8097253859",
  github: "https://github.com/akashrai2003",
  linkedin: "https://linkedin.com/in/akash-rai1701",
  resumeUrl: "./resume/Akash_Rai_Resume.pdf",
  proofMetrics: [
    {
      value: "vLLM Serving",
      label: "Inference Optimization",
      context: "PagedAttention memory budgeting, FP8 KV cache allocation, and chunked prefill scheduling"
    },
    {
      value: "Sovereign AI",
      label: "Air-Gapped Deployment",
      context: "5+ Dockerized microservices platform for Indian Navy with zero external network egress"
    },
    {
      value: "Deterministic",
      label: "Schema-Grounded Querying",
      context: "Replaced probabilistic vector RAG with validated executable query generation over systems of record"
    },
    {
      value: "Merged PR #3262",
      label: "Open Source Engineering",
      context: "Resolved persistent LLM state and Redux lifecycle management in 12K-star kepler.gl"
    }
  ]
};
