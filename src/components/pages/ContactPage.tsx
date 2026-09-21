import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Github, Linkedin, FileText } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface ContactPageProps {
  onBackHome: () => void;
  onOpenResume: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBackHome, onOpenResume }) => {
  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem', fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          Contact &amp; Communications
        </h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
          (Get in touch for AI systems roles, GPU inference optimization, and advisory)
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

      {/* Terminal Card Frame */}
      <div
        style={{
          background: 'var(--bg-card-solid)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            # cat /etc/network/interfaces.d/contact.conf
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
            I am currently open to high-impact roles in <strong>AI Systems Engineering</strong>, <strong>High-Throughput LLM Serving</strong>, and <strong>Deterministic Agent Architectures</strong>. Based in Bengaluru, India with seamless collaboration across global time zones (US, Europe, APAC).
          </p>
        </div>

        <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '1.5rem 0' }} />

        {/* Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Direct Email
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '1.1rem',
                fontWeight: 700,
                textDecoration: 'underline'
              }}
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              LinkedIn
            </div>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '1.05rem',
                textDecoration: 'underline'
              }}
            >
              {siteConfig.linkedin}
            </a>
          </div>

          <div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              GitHub
            </div>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '1.05rem',
                textDecoration: 'underline'
              }}
            >
              {siteConfig.github}
            </a>
          </div>

          <div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Verified Resume
            </div>
            <button
              onClick={onOpenResume}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-cyan)',
                fontSize: '1.05rem',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontFamily: 'inherit',
                padding: 0,
                textAlign: 'left'
              }}
            >
              Akash_Rai_Resume.pdf (Click to preview)
            </button>
          </div>

          <div>
            <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Physical Location
            </div>
            <div style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}>
              {siteConfig.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
