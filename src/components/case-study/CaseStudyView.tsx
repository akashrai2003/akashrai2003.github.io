import React, { useState } from 'react';
import { Briefcase, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import { caseStudies, CaseStudy } from '../../data/caseStudies';
import { CaseStudyModal } from './CaseStudyModal';

export const CaseStudyView: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Inference & Systems', 'Defense & Air-Gap', 'Enterprise AI', 'Knowledge Systems', 'Local-First Desktop'];

  const filtered = selectedCategory === 'All' 
    ? caseStudies 
    : caseStudies.filter(c => c.category === selectedCategory);

  return (
    <section id="case-studies" className="section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>Production Case Studies</span>
          </div>
          <h2 className="section-title">
            Deep Technical Case Studies
          </h2>
          <p className="section-subtitle">
            Long-form technical breakdowns tracing real production problems through constraints, architecture decisions, memory budgets, failure modes, and measurable outcomes.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === cat ? 700 : 500,
                background: selectedCategory === cat ? 'var(--accent-cyan)' : 'var(--bg-card)',
                color: selectedCategory === cat ? '#06090f' : 'var(--text-secondary)',
                border: selectedCategory === cat ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {filtered.map((cs) => (
            <div 
              key={cs.id}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedCaseStudy(cs)}
            >
              <div>
                {/* Category & Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge badge-cyan">{cs.category}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    {cs.organization}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem', lineHeight: 1.35 }}>
                  {cs.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {cs.subtitle}
                </p>

                {/* Metrics Highlight */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '1.5rem'
                }}>
                  {cs.metrics.slice(0, 2).map((m, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  {cs.tags.map((tag, i) => (
                    <span key={i} className="badge" style={{ fontSize: '0.72rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                color: 'var(--accent-cyan)',
                fontSize: '0.88rem',
                fontWeight: 600
              }}>
                <span>Inspect Technical Breakdown</span>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <CaseStudyModal 
          caseStudy={selectedCaseStudy} 
          onClose={() => setSelectedCaseStudy(null)} 
        />

      </div>
    </section>
  );
};
