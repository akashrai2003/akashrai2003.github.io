import React, { useState } from 'react';
import { Layers, Bot, Database, Server, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LayerInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  subtitle: string;
  technologies: string[];
  solvedProblems: string[];
  exampleProject: string;
}

export const StackVisualizer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(3); // Default to Inference

  const layers: LayerInfo[] = [
    {
      id: 'apps-agents',
      name: '1. Applications & Agents',
      icon: <Bot size={20} />,
      subtitle: 'Deterministic state-machine orchestration and tool use',
      technologies: ['LangGraph', 'State Machines', 'MCP Servers', 'React 19', 'Tauri 2', 'Vega-Lite'],
      solvedProblems: [
        'Multi-agent workflow decomposition with bounded loops and schema validators',
        'Scoped read-only MCP tool servers preventing arbitrary filesystem leaks',
        'Conversational geospatial analytics driving MBTiles playback and temporal charts'
      ],
      exampleProject: 'LangGraph Assessment Generator & Inkwell Desktop IDE'
    },
    {
      id: 'retrieval-knowledge',
      name: '2. Retrieval & Knowledge',
      icon: <Database size={20} />,
      subtitle: 'Hybrid retrieval, schema grounding, and revision semantics',
      technologies: ['Salesforce SAQL', 'Neo4j Graph', 'Vector Embeddings', 'Cross-Encoders', 'OCR Grounding'],
      solvedProblems: [
        'Replacing hallucination-prone RAG with executable SAQL queries for exact math',
        'Self-revising memory engines that supersede stale operational facts over time',
        'Multi-stage retrieval cascades combining dense search and cross-encoder reranking'
      ],
      exampleProject: 'Salesforce SAQL Analytics & DeepLogicAI Medical RAG'
    },
    {
      id: 'backend-services',
      name: '3. Backend & Microservices',
      icon: <Server size={20} />,
      subtitle: 'Asynchronous event pipelines and typed high-throughput APIs',
      technologies: ['FastAPI', 'gRPC', 'RabbitMQ', 'MongoDB', 'MinIO', 'MySQL', 'CuPy'],
      solvedProblems: [
        'Decoupling long-running OCR extraction from real-time LLM inference queues',
        'GPU-accelerated gRPC classifier microservices avoiding PyTorch dependency bloat',
        'Separating vector embeddings from relational metadata for 3x faster filtering'
      ],
      exampleProject: 'Indian Navy Air-Gapped Platform & CuPy Classifier'
    },
    {
      id: 'inference-gpu',
      name: '4. Inference & GPU Hardware',
      icon: <Cpu size={20} />,
      subtitle: 'vLLM serving, memory budgeting, and new hardware enablement',
      technologies: ['vLLM', 'NVIDIA Blackwell', 'FP8 / NVFP4', 'FP8 KV Cache', 'FlashInfer', 'PagedAttention'],
      solvedProblems: [
        'Doubling usable context from 22K to 40K on a 16 GB RTX 5060 Ti Blackwell GPU',
        'Resolving CUDA 12.9, CUTLASS, and JIT kernel issues for Gemma-4-12B NVFP4 on SM120',
        'Prompt-aware batch scheduling to serve 10–20 concurrent requests at ~750 tok/s'
      ],
      exampleProject: 'Ministral-3-8B FP8 Optimization on Blackwell RTX 5060 Ti'
    },
    {
      id: 'deployment-airgap',
      name: '5. Deployment & Air-Gap',
      icon: <ShieldCheck size={20} />,
      subtitle: 'Offline packaging, sovereign defense delivery, and stability',
      technologies: ['Docker Compose', 'Air-Gapped Ops', 'Offline Wheels', 'Linux', 'AWS Multi-GPU', 'AMD ROCm'],
      solvedProblems: [
        'Zero-assumption offline container packaging for sovereign naval installations',
        'Led 3 on-site deployments in Mumbai diagnosing local hardware and CUDA ABIs',
        'Multi-GPU DAPT/LoRA R&D on 4× NVIDIA L40S and AMD MI300X accelerators'
      ],
      exampleProject: 'Indian Navy Mumbai On-Site Deployments & AMD Premier League'
    }
  ];

  const current = layers[selectedLayer];

  return (
    <section className="section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>Full-Stack AI Architecture</span>
          </div>
          <h2 className="section-title">
            Across the Production AI Stack
          </h2>
          <p className="section-subtitle">
            Most LLM applications fail at the boundaries between layers. Here is how I operate end-to-end—from agentic state machines down to GPU kernel execution and air-gapped delivery.
          </p>
        </div>

        {/* Horizontal Layer Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.65rem',
          marginBottom: '2rem'
        }}>
          {layers.map((layer, idx) => {
            const isSelected = selectedLayer === idx;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(idx)}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--bg-card-solid)' : 'var(--bg-card)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
                  color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ color: isSelected ? 'var(--accent-cyan)' : 'var(--text-tertiary)' }}>
                  {layer.icon}
                </div>
                <div style={{ fontWeight: isSelected ? 700 : 500, fontSize: '0.88rem' }}>
                  {layer.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Layer Card */}
        <div className="glass-card" style={{ padding: '2.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--accent-cyan)' }}>{current.icon}</span>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {current.name}
                </h3>
              </div>
              <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)' }}>
                {current.subtitle}
              </p>
            </div>

            <div className="badge badge-cyan" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
              <span>Case Study Anchor: {current.exampleProject}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Solved Problems */}
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                Production Challenges Solved
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {current.solvedProblems.map((problem, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={17} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                Core Tooling & Frameworks
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {current.technologies.map((tech, i) => (
                  <span key={i} className="badge badge-indigo" style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '1.75rem', padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>
                  THE ENGINEERING PHILOSOPHY
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  "Fix failures at the right layer: if answers are inaccurate, check query structure; if serving OOMs, budget the KV cache; if air-gapped, package offline wheels."
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
