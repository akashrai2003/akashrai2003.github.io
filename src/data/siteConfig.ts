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
  role: "AI Engineer — LLM Systems, Agentic AI, RAG & Local Inference",
  headline: "Building production LLM systems from retrieval and agents to local GPU inference.",
  subheadline: "I bridge applied AI and systems engineering: secure on-premise document intelligence, LangGraph agentic workflows, vLLM inference optimization on NVIDIA Blackwell hardware, and full-stack production GenAI platforms.",
  status: "Open for AI Engineer / LLM Systems Roles",
  location: "Bengaluru, India (Open to Remote)",
  email: "akashtooop@gmail.com",
  phone: "+91 8097253859",
  github: "https://github.com/akashrai2003",
  linkedin: "https://linkedin.com/in/akash-rai1701",
  resumeUrl: "./resume/Akash_Rai_Resume.pdf",
  proofMetrics: [
    {
      value: "22K → 40K",
      label: "Context Doubled",
      context: "Ministral-3-8B FP8 on 16 GB RTX 5060 Ti Blackwell via FP8 KV cache"
    },
    {
      value: "~750 tok/s",
      label: "Aggregate Throughput",
      context: "10–20 concurrent requests at ~15 GB VRAM utilization"
    },
    {
      value: "5+ Services",
      label: "Air-Gapped Platform",
      context: "Dockerized on-prem Indian Navy doc intelligence with RabbitMQ & vLLM"
    },
    {
      value: "10x Lower",
      label: "RAG Operating Cost",
      context: "Replaced third-party RAGaaS with custom FastAPI & reranking pipeline"
    },
    {
      value: "PR #3262",
      label: "Merged kepler.gl PR",
      context: "Fixed persistent LLM conversation state in 12K-star open source repo"
    }
  ]
};
