import React from 'react';
import { 
  ArrowRight, 
  Cpu, 
  Terminal, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Github, 
  Linkedin,
  FileCode2
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenResume }) => {
  return (
    <section className="section" style={{ paddingTop: '7.5rem', paddingBottom: '4.5rem' }}>
      <div className="container">
        
        {/* Top Status & Role Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          <div className="section-tag" style={{ margin: 0 }}>
            <Cpu size={14} />
            <span>AI Systems & Inference Engineering</span>
          </div>
          <div className="badge badge-emerald">
            <span className="status-dot" />
            <span>Available for Global Roles • Bengaluru / Remote</span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.035em',
          maxWidth: '950px',
          marginBottom: '1.5rem',
          color: 'var(--text-primary)'
        }}>
          Building production LLM systems from{' '}
          <span className="gradient-text">retrieval & agents</span> to{' '}
          <span style={{ color: 'var(--accent-cyan)' }}>local GPU inference</span>.
        </h1>

        {/* Supporting Copy */}
        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '820px',
          lineHeight: 1.7,
          marginBottom: '2.5rem'
        }}>
          I work at the intersection of applied GenAI and systems engineering: architecting secure on-premise document intelligence platforms, designing deterministic query routing, building self-revising memory engines, and tuning vLLM serving parameters for high-throughput execution under real GPU memory budgets.
        </p>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button 
            onClick={() => onNavigate('case-studies')}
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
          >
            <span>Explore Case Studies</span>
            <ArrowRight size={18} />
          </button>

          <button 
            onClick={() => onNavigate('writing')}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}
          >
            <BookOpen size={18} color="var(--accent-cyan)" />
            <span>Technical Writing</span>
          </button>

          <button 
            onClick={onOpenResume}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.4rem', fontSize: '0.95rem' }}
          >
            <FileCode2 size={18} color="var(--accent-indigo)" />
            <span>Resume</span>
          </button>

          <button 
            onClick={() => onNavigate('contact')}
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.4rem', fontSize: '0.95rem' }}
          >
            <span>Get in Touch</span>
          </button>
        </div>

        {/* Proof Strip (Metrics Grid) */}
        <div style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 1.5rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-tertiary)'
          }}>
            <Zap size={14} color="var(--accent-amber)" />
            <span>Verified Systems Proof & Production Metrics</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {siteConfig.proofMetrics.map((metric, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-highlight)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-cyan)',
                  marginBottom: '0.25rem'
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem'
                }}>
                  {metric.label}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-tertiary)',
                  lineHeight: 1.45
                }}>
                  {metric.context}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
