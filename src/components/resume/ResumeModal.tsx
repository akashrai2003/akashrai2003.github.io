import React from 'react';
import confetti from 'canvas-confetti';
import { X, Download, ExternalLink, FileText, CheckCircle2, Shield, Calendar, MapPin, Mail, Phone, Github, Linkedin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#6366f1', '#10b981', '#ffffff']
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2500,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        background: 'var(--bg-card-solid)',
        border: '1px solid var(--border-highlight)',
        borderRadius: 'var(--radius-xl)',
        width: '100%',
        maxWidth: '920px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        padding: '2.5rem',
        position: 'relative'
      }}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close resume"
          style={{
            position: 'sticky',
            top: 0,
            float: 'right',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-card)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {siteConfig.name}
              </h2>
              <span className="badge badge-emerald">Verified Resume</span>
            </div>
            <div style={{ fontSize: '1rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>
              {siteConfig.role}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={13} /> Bengaluru, India</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={13} /> {siteConfig.email}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Phone size={13} /> {siteConfig.phone}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <a
              href={siteConfig.resumeUrl}
              download="Akash_Rai_Resume.pdf"
              onClick={handleDownload}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>

            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ExternalLink size={16} />
              <span>Open in New Tab</span>
            </a>
          </div>
        </div>

        {/* Embedded PDF Viewer or Fallback Preview */}
        <div style={{
          background: 'var(--code-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          overflow: 'hidden',
          marginBottom: '2rem',
          minHeight: '480px'
        }}>
          <iframe
            src={`${siteConfig.resumeUrl}#toolbar=0&navpanes=0`}
            title="Akash Rai Resume"
            width="100%"
            height="550px"
            style={{ border: 'none' }}
          />
        </div>

        {/* Quick Highlights Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>
              Current Employment
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              AI Engineer at Inferigence Quotient (Feb 2025 – Present)
            </div>
          </div>

          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-emerald)', marginBottom: '0.25rem' }}>
              Inference &amp; Systems Focus
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              vLLM Serving, PagedAttention, FP8 Quantization, Docker Microservices
            </div>
          </div>

          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-indigo)', marginBottom: '0.25rem' }}>
              Open Source Proof
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Merged PR #3262 in kepler.gl (12,000+ stars)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
