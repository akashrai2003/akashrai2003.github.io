import React from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Layers, Cpu, Award } from 'lucide-react';
import { CaseStudy } from '../../data/caseStudies';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose }) => {
  if (!caseStudy) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div 
        style={{
          background: 'var(--bg-card-solid)',
          border: '1px solid var(--border-highlight)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          padding: '2.5rem'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'sticky',
            top: 0,
            float: 'right',
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-card)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--border-card)';
          }}
        >
          <X size={20} />
        </button>

        {/* Confidentiality Alert if applicable */}
        {caseStudy.isConfidential && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: 'var(--accent-amber)',
            fontSize: '0.85rem',
            marginBottom: '1.5rem'
          }}>
            <ShieldAlert size={18} style={{ flexShrink: 0 }} />
            <span>
              {caseStudy.publicSafeNotice || "Public-safe engineering case study. Sensitive operational identifiers and proprietary client data are excluded."}
            </span>
          </div>
        )}

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span className="badge badge-cyan">{caseStudy.category}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              {caseStudy.organization} • {caseStudy.period}
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
            {caseStudy.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {caseStudy.subtitle}
          </p>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '1rem',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '2.5rem'
        }}>
          {caseStudy.metrics.map((m, idx) => (
            <div key={idx}>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Content Body: 10-Part Technical Deep-Dive */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* 1. Context & Problem */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="var(--accent-cyan)" />
              1. The Context & Production Problem
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {caseStudy.context}
            </p>
          </div>

          {/* 2. Constraints */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} color="var(--accent-amber)" />
              2. Hard Physical & Operational Constraints
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {caseStudy.constraints.map((c, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Why Standard Approaches Failed */}
          <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.06)', borderLeft: '3px solid #ef4444' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.5rem' }}>
              3. Why Conventional Approaches Failed
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {caseStudy.whyStandardFailed}
            </p>
          </div>

          {/* 4. Architecture Summary */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={18} color="var(--accent-indigo)" />
              4. System Architecture
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {caseStudy.architectureSummary}
            </p>
          </div>

          {/* 5. Key Engineering Decisions */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="var(--accent-emerald)" />
              5. Key Engineering Decisions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {caseStudy.keyDecisions.map((dec, idx) => (
                <div key={idx} style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>
                    {dec.title}
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {dec.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Measurable Results */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="var(--accent-cyan)" />
              6. Production Outcomes & Metrics
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {caseStudy.results.map((r, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Failure Modes & Debugging */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              7. Failure Modes & What Broke During Rollout
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {caseStudy.failureModesAndDebugging}
            </p>
          </div>

          {/* 8. Trade-offs */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              8. Conscious Trade-offs
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {caseStudy.tradeoffs}
            </p>
          </div>

          {/* 9. Future Work */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              9. What I Would Improve Next
            </h3>
            <p style={{ color: 'var(--text-tertiary)', lineHeight: 1.7, fontSize: '0.92rem' }}>
              {caseStudy.futureImprovements}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
