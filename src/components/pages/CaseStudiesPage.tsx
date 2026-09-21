import React from 'react';
import { ArrowLeft, Shield, Cpu, Layers } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';

interface CaseStudiesPageProps {
  onBackHome: () => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onBackHome }) => {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          Architectural Case Studies
        </h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
          (Production systems, failure modes, and hardware tradeoffs)
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

      {/* Studies */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        {caseStudies.map((study) => (
          <article
            key={study.id}
            style={{
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '2.25rem',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            {/* Meta */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span className="badge-tech" style={{ background: 'var(--text-primary)', color: 'var(--bg-canvas)' }}>
                {study.category}
              </span>
              <span className="badge-tech">
                {study.organization} • {study.period}
              </span>
              {study.isConfidential && (
                <span className="badge-tech" style={{ borderColor: 'var(--accent-amber)', color: 'var(--accent-amber)' }}>
                  [CONFIDENTIAL / AIR-GAPPED SAFE]
                </span>
              )}
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
              {study.title}
            </h2>
            <div style={{ color: 'var(--accent-cyan)', fontSize: '0.92rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              {study.subtitle}
            </div>

            {/* Metrics Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              background: 'var(--bg-subtle)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}>
              {study.metrics.map((m, i) => (
                <div key={i}>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    {m.label}
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Context & Failure of Naive Baseline */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem', fontSize: '0.92rem' }}>
                $ cat context.txt &amp;&amp; cat baseline_failure.log
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                {study.context}
              </p>
              <div style={{
                background: 'rgba(239, 68, 68, 0.08)',
                borderLeft: '3px solid #ef4444',
                padding: '0.75rem 1rem',
                fontSize: '0.86rem',
                color: 'var(--text-secondary)',
                borderRadius: '0 4px 4px 0'
              }}>
                <strong style={{ color: '#ef4444' }}>Why Standard RAG / Naive Baseline Failed: </strong>
                {study.whyStandardFailed}
              </div>
            </div>

            {/* Architecture Summary */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem', fontSize: '0.92rem' }}>
                $ cat solution_architecture.md
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {study.architectureSummary}
              </p>
            </div>

            {/* Key Decisions Tree */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '0.92rem' }}>
                Core Engineering Decisions:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {study.keyDecisions.map((dec, idx) => (
                  <div key={idx} style={{ paddingLeft: '0.5rem', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--text-tertiary)' }}>
                      {idx === study.keyDecisions.length - 1 ? '└── ' : '├── '}
                    </span>
                    <strong style={{ color: 'var(--text-primary)' }}>{dec.title}: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{dec.explanation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              {study.tags.map((t, i) => (
                <span key={i} className="badge-tech" style={{ fontSize: '0.75rem' }}>
                  #{t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
