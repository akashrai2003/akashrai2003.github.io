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
  role: "AI Systems & Inference Engineer",
  headline: "Architecting high-throughput LLM serving infrastructure, sovereign AI platforms, and deterministic agentic systems.",
  subheadline: "I bridge applied AI and systems engineering: optimizing open-weight inference engines (vLLM, PagedAttention, FP8 quantization), designing sovereign air-gapped document intelligence platforms, and building deterministic execution pipelines over systems of record.",
  status: "Open for AI Systems & Inference Engineering Roles",
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
