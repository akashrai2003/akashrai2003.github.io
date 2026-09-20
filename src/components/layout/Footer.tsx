import React from 'react';
import { Github, Linkedin, Mail, Phone, ArrowUp, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-card-solid)',
      padding: '4rem 0 2.5rem',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Identity & Positioning */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Logo size={32} />
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {siteConfig.name}
              </span>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              AI Engineer specializing in LLM systems, agentic state machines, RAG, and GPU-optimized inference on NVIDIA Blackwell & AMD hardware.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
              <ShieldCheck size={16} color="var(--accent-emerald)" />
              <span>Sovereign, air-gapped & privacy-first AI systems</span>
            </div>
          </div>

          {/* Direct Contact & Social */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
              Direct Channels
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a 
                href={`mailto:${siteConfig.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Mail size={16} color="var(--accent-cyan)" />
                <span>{siteConfig.email}</span>
              </a>

              <a 
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--text-secondary)', fontSize: '0.92rem' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Phone size={16} color="var(--accent-emerald)" />
                <span>{siteConfig.phone}</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-highlight)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <Github size={18} />
                </a>

                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-highlight)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Systems Proof Summary */}
          <div>
            <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-primary)', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)' }}>
              Systems Credibility
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>⚙️ <strong>vLLM Serving:</strong> PagedAttention memory budgeting & FP8 KV cache</li>
              <li>🛡️ <strong>Sovereign AI:</strong> 5+ microservices platform deployed for Indian Navy</li>
              <li>📐 <strong>Deterministic AI:</strong> Executable SAQL generation replacing naive RAG</li>
              <li>🌟 <strong>Open Source:</strong> Merged PR #3262 in 12K-star kepler.gl</li>
              <li>📍 Based in <strong>Bengaluru, India</strong> • Available Globally</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          fontSize: '0.85rem',
          color: 'var(--text-tertiary)'
        }}>
          <div>
            © {new Date().getFullYear()} Akash Rai. Built with Vite, React 19, and TypeScript. Hosted on GitHub Pages.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <ArrowUp size={14} />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
