import React from 'react';
import { Briefcase, GitPullRequest, Award, CheckCircle2, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { experiences, openSourceContributions } from '../../data/experience';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="section" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>Career History & Proof of Work</span>
          </div>
          <h2 className="section-title">
            Professional Experience & Open Source
          </h2>
          <p className="section-subtitle">
            2+ years of hands-on production engineering across defense platforms, enterprise analytics consulting, and open-source contributions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="glass-card"
              style={{
                padding: '2.25rem',
                borderLeft: exp.badge === 'Current Role' ? '4px solid var(--accent-cyan)' : '1px solid var(--border-card)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {exp.role}
                    </h3>
                    {exp.badge && (
                      <span className="badge badge-emerald">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>
                    {exp.organization}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {exp.summary}
              </p>

              {/* Highlights */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Key Contributions & Deliverables
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                      <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics Pills */}
              {exp.metrics && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {exp.metrics.map((m, i) => (
                    <span key={i} className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
                      ⚡ {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {exp.technologies.map((t, i) => (
                  <span key={i} className="badge" style={{ fontSize: '0.72rem' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Open Source Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <GitPullRequest size={20} color="var(--accent-indigo)" />
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Verified Open Source Contributions
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {openSourceContributions.map((os, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                        {os.project}
                      </span>
                      <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                        ★ {os.stars}
                      </span>
                    </div>
                    <span className="badge badge-emerald">
                      {os.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {os.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    {os.prNumber} • {os.date}
                  </span>

                  <a
                    href={os.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}
                  >
                    <span>View Pull Request</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Achievements & Education */}
        <div style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Award size={18} color="var(--accent-amber)" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Awards & Recognition
              </h4>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>🏆 <strong>1st Place</strong> — IEEE CAS REVA Technical Competition (INR 30,000)</li>
              <li>🥈 <strong>Runner-Up</strong> — IEEE BMSCE Technical Competition</li>
              <li>🚀 <strong>Top 10 Nationwide</strong> — Intel Unnati at IIIT Hyderabad Mobility Summit</li>
              <li>🎓 <strong>Selected</strong> — Amazon ML Summer School 2024</li>
              <li>⚡ <strong>Shortlisted</strong> — AMD AI Premier League National Hackathon</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Briefcase size={18} color="var(--accent-cyan)" />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Education Foundation
              </h4>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                NMIT (NITTE Meenakshi Institute of Technology)
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>
                Bachelor of Engineering in Electronics & Communication (ECE)
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                Dec 2021 – Jul 2025 • Bengaluru, India • CGPA: 8.34
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Strong foundation in digital systems, computer architecture, and signals that informs systems-level AI inference, memory budgeting, and GPU hardware execution.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
