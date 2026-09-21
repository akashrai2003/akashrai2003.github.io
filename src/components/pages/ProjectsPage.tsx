import React from 'react';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

interface ProjectsPageProps {
  onBackHome: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBackHome }) => {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          Systems &amp; Inference Projects
        </h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
          (Akash Rai engineering projects &amp; research builds)
        </div>

        <button
          onClick={onBackHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.95rem',
            fontWeight: 600,
            padding: 0
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
        >
          <span>(&lt; back to home)</span>
        </button>
      </div>

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {projects.map((proj) => (
          <article
            key={proj.id}
            style={{
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            {/* Top Bar: Title & Links */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {proj.title}
                </h2>
                <div style={{ color: 'var(--accent-cyan)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
                  {proj.tagline}
                </div>
              </div>

              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-card)',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-card)'}
                >
                  <Github size={14} />
                  <span>source</span>
                </a>
              )}
            </div>

            {/* Meta tags */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
              <span className="badge-tech" style={{ background: 'var(--text-primary)', color: 'var(--bg-canvas)' }}>
                {proj.category}
              </span>
              <span className="badge-tech">
                {proj.period}
              </span>
              {proj.metrics.map((m, i) => (
                <span key={i} className="badge-tech" style={{ color: 'var(--accent-cyan)' }}>
                  [{m}]
                </span>
              ))}
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {proj.summary}
            </p>

            {/* Key Architectural Bullets with ASCII Tree */}
            <div style={{ marginBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.35rem' }}>
                Engineering Architecture &amp; Subsystems:
              </div>
              {proj.features.map((feat, idx) => (
                <div key={idx} style={{ paddingLeft: '0.5rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>
                    {idx === proj.features.length - 1 ? '└── ' : '├── '}
                  </span>
                  {feat}
                </div>
              ))}
            </div>

            {/* Stack Tags */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              {proj.stack.map((tech, i) => (
                <span key={i} className="badge-tech" style={{ fontSize: '0.75rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
