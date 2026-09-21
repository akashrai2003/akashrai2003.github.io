import React from 'react';
import { ArrowLeft, Briefcase, ExternalLink, GitMerge } from 'lucide-react';
import { experiences } from '../../data/experience';

interface ExperiencePageProps {
  onBackHome: () => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onBackHome }) => {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          Engineering Log &amp; Track Record
        </h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
          (Production platforms, defense systems, and open-source contributions)
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

      {/* Verified Open Source Callout */}
      <div
        style={{
          background: 'var(--bg-card-solid)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <GitMerge size={18} color="var(--accent-cyan)" />
          <strong style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
            Open Source Contribution: kepler.gl (12,000+ stars)
          </strong>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
          Merged <a href="https://github.com/keplergl/kepler.gl/pull/3262" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>PR #3262</a>: Resolved Redux lifecycle state desynchronization and unmounted component re-render loops in core visualization engine.
        </p>
        <span className="badge-tech" style={{ color: 'var(--accent-cyan)' }}>
          [MERGED • PRODUCTION IMPACT]
        </span>
      </div>

      {/* Experience Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {experiences.map((exp) => (
          <article
            key={exp.id}
            style={{
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            {/* Top Meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                  {exp.role}
                </h2>
                <div style={{ color: 'var(--accent-cyan)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                  {exp.organization} • <span style={{ color: 'var(--text-tertiary)' }}>{exp.location}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span className="badge-tech">
                  {exp.period}
                </span>
                {exp.badge && (
                  <span className="badge-tech" style={{ background: 'var(--text-primary)', color: 'var(--bg-canvas)' }}>
                    {exp.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {exp.summary}
            </p>

            {/* Highlights ASCII Tree */}
            <div style={{ marginBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.4rem' }}>
                Production Deliverables &amp; Milestones:
              </div>
              {exp.highlights.map((item, idx) => (
                <div key={idx} style={{ paddingLeft: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>
                    {idx === exp.highlights.length - 1 ? '└── ' : '├── '}
                  </span>
                  {item}
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              {exp.technologies.map((tech, i) => (
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
