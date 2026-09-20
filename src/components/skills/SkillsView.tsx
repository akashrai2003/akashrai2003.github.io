import React, { useState } from 'react';
import { Cpu, CheckCircle2, Zap, Terminal, Database, Server, Layers } from 'lucide-react';
import { skillCategories } from '../../data/skills';

export const SkillsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="section">
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <Cpu size={14} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">
            Skills Backed by Production Proof
          </h2>
          <p className="section-subtitle">
            Every listed skill is grounded in real production ownership—from Blackwell GPU kernel enablement and vLLM FP8 serving to air-gapped defense platforms.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {skillCategories.map((cat, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: '0.65rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--bg-card-solid)' : 'var(--bg-card)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
                  color: isSelected ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat.category}
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              {skillCategories[activeTab].category}
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
              {skillCategories[activeTab].description}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {skillCategories[activeTab].skills.map((skill, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    {skill.name}
                  </span>
                  <span className={`badge ${skill.level === 'Production' ? 'badge-emerald' : 'badge-cyan'}`} style={{ fontSize: '0.72rem' }}>
                    {skill.level}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {skill.context}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
