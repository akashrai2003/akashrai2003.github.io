import React from 'react';
import { FolderGit2, Github, ExternalLink, CheckCircle2, Shield, Layers, Award } from 'lucide-react';
import { projects } from '../../data/projects';

export const ProjectsView: React.FC = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>Independent Systems & Research</span>
          </div>
          <h2 className="section-title">
            Featured Technical Projects
          </h2>
          <p className="section-subtitle">
            Local-first desktop products, multi-stage ETL knowledge graph pipelines, and accelerator fine-tuning experiments built to solve real engineering workflows.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge badge-cyan">{proj.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {proj.status === 'Active' ? (
                      <span className="badge badge-emerald">Active Build</span>
                    ) : proj.status === 'Hackathon Shortlist' ? (
                      <span className="badge badge-amber">AMD Shortlist</span>
                    ) : (
                      <span className="badge">Complete</span>
                    )}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: '0.94rem', color: 'var(--accent-cyan)', marginBottom: '1rem', fontWeight: 600 }}>
                  {proj.tagline}
                </p>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {proj.summary}
                </p>

                {/* Key Features */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                    Key Innovations
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {proj.features.slice(0, 3).map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle2 size={15} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics strip */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem'
                }}>
                  {proj.metrics.map((m, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                      ✓ {m}
                    </span>
                  ))}
                </div>

                {/* Stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  {proj.stack.map((s, i) => (
                    <span key={i} className="badge" style={{ fontSize: '0.72rem' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  {proj.period}
                </span>

                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    <Github size={15} />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
