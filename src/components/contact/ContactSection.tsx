import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, Github, Linkedin, MessageSquare } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open default mail client with pre-filled content
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry: AI Engineering')}&body=${encodeURIComponent(`Hi Akash,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} />
            <span>Direct Communication</span>
          </div>
          <h2 className="section-title">
            Get In Touch
          </h2>
          <p className="section-subtitle">
            Whether you are discussing full-time AI engineering roles, technical advisory, or systems architecture, I'd love to connect.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1.2fr)',
          gap: '2.5rem'
        }}>
          
          {/* Direct Channels Column */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Direct Channels & Availability
            </h3>
            
            <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                <span className="status-dot" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent-emerald)' }}>
                  {siteConfig.status}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                Open to global remote roles and on-site opportunities in Bengaluru. Fast response time within 24 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Mail size={16} color="var(--accent-cyan)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {siteConfig.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    aria-label="Copy Email"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: copied ? 'var(--accent-emerald)' : 'var(--text-tertiary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.78rem'
                    }}
                  >
                    {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  <Phone size={16} color="var(--accent-emerald)" />
                  <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>{siteConfig.phone}</span>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  <MapPin size={16} color="var(--accent-amber)" />
                  <span style={{ fontSize: '0.9rem' }}>{siteConfig.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ flex: 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Github size={17} />
                <span>GitHub</span>
              </a>

              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ flex: 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Linkedin size={17} />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Form Column */}
          <div className="glass-card" style={{ padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Send a Direct Message
            </h3>

            {submitted ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}>
                <CheckCircle2 size={42} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem auto' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Message Ready!
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Your email client has been launched with your pre-filled inquiry. You can also reach me directly at <strong>{siteConfig.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-card)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-card)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.92rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                    SUBJECT / ROLE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior AI Engineer Opportunity / Architecture Advisory"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, team requirements, or discussion topic..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.92rem',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.6rem' }}
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
