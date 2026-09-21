import React from 'react';
import { ArrowLeft, Terminal, Cpu, Database, Network } from 'lucide-react';
import { skillCategories } from '../../data/skills';

interface StackPageProps {
  onBackHome: () => void;
}

export const StackPage: React.FC<StackPageProps> = ({ onBackHome }) => {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          Technical Stack &amp; Systems Capabilities
        </h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
          (GPU inference, low-level tooling, agentic orchestration, and systems infrastructure)
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

      {/* Stack Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>#</span>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {cat.category}
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              {cat.description}
            </p>

            {/* Skills Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <strong style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                      {skill.name}
                    </strong>
                    <span
                      className="badge-tech"
                      style={{
                        fontSize: '0.7rem',
                        borderColor: skill.level === 'Learning' ? 'var(--accent-amber)' : undefined,
                        color: skill.level === 'Learning' ? 'var(--accent-amber)' : undefined
                      }}
                    >
                      {skill.level === 'Learning' ? 'Roadmap / Studying' : skill.level}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                    {skill.context}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
