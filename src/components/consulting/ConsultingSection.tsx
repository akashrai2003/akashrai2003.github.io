import React from 'react';
import { Briefcase, ArrowRight, ShieldCheck, CheckCircle2, Zap, Mail, MessageSquare } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const ConsultingSection: React.FC = () => {
  const capabilities = [
    {
      title: "Production LLM Architecture",
      desc: "Turn fragile prototypes into deployable services. Choose between deterministic queries, RAG, agentic tools, or hybrid architectures."
    },
    {
      title: "Inference Optimization & VRAM Budgeting",
      desc: "Model fit, FP8/NVFP4 quantization, PagedAttention KV-cache tuning, batch scheduling, and maximizing token throughput under strict GPU limits."
    },
    {
      title: "Agentic Workflows with LangGraph",
      desc: "Design state machines with bounded loops, deterministic schema validation, fallback paths, and observable telemetry."
    },
    {
      title: "Local-First & Air-Gapped GenAI",
      desc: "Deploy open-weight models (vLLM, Qwen, Ministral) in sovereign on-premise environments with zero cloud dependencies."
    },
    {
      title: "RAG & Knowledge Graph Redesign",
      desc: "Diagnose why naive RAG fails. Rebuild retrieval with dense search, cross-encoder reranking, graph relationships, and evidence grounding."
    },
    {
      title: "Architecture Rescue & Redesign",
      desc: "Identify when a chat-first or vector approach is wrong, and replace it with executable queries (e.g. SAQL, SQL) for 100% mathematical accuracy."
    }
  ];

  return (
    <section className="section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <Zap size={14} />
            <span>Consulting & Advisory</span>
          </div>
          <h2 className="section-title">
            How I Can Help Your Team
          </h2>
          <p className="section-subtitle">
            I help startups, enterprises, and defense teams move from probabilistic LLM demos to deterministic, deployable, and cost-efficient production software.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{ padding: '1.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {cap.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Work With Me Banner */}
        <div className="glass-card" style={{
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(13, 19, 34, 0.9) 0%, rgba(20, 29, 51, 0.95) 100%)',
          border: '1px solid var(--border-highlight)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>
              Direct Technical Engagement
            </span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Building production AI systems or hiring for LLM systems roles?
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '650px' }}>
              Let's discuss how we can engineer reliable retrieval, agent orchestration, or GPU-optimized inference for your organization.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={`mailto:${siteConfig.email}?subject=Production%20AI%20Engineering%20Discussion`}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.6rem' }}
            >
              <Mail size={16} />
              <span>Get In Touch</span>
            </a>

            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.4rem' }}
            >
              <MessageSquare size={16} />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
