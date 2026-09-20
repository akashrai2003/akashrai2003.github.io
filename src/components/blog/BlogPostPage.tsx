import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Copy, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { BlogPost } from '../../data/blogPosts';
import { Logo } from '../ui/Logo';
import { siteConfig } from '../../data/siteConfig';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// Helper Code Block with syntax styling & one-click copy
const CodeBlock: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace(/language-/, '') : '';
  const codeContent = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'relative',
      margin: '1.75rem 0',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-card)',
      background: 'var(--bg-card-solid)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
    }}>
      {/* Code Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-tertiary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
          </div>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            {language || 'code'}
          </span>
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'transparent',
            border: 'none',
            color: copied ? 'var(--accent-emerald)' : 'var(--text-tertiary)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            padding: '0.2rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            transition: 'color var(--transition-fast)'
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Content */}
      <div style={{
        padding: '1.25rem 1.25rem',
        overflowX: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.88rem',
        lineHeight: 1.65,
        color: '#e2e8f0',
        background: '#070b14'
      }}>
        <pre style={{ margin: 0, background: 'transparent', border: 'none', padding: 0 }}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onBack,
  theme,
  toggleTheme
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', position: 'relative' }}>
      
      {/* Top Reading Progress Bar (Aleksa Gordic style) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 9999,
        background: 'transparent'
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)',
          transition: 'width 60ms linear',
          boxShadow: '0 0 10px rgba(56, 189, 248, 0.7)'
        }} />
      </div>

      {/* Sticky Top Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.85rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '0.92rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            <ArrowLeft size={16} />
            <span>← Back to all writing</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handleCopyLink}
              title="Share article link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {copiedLink ? <Check size={14} color="var(--accent-emerald)" /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle light / dark mode"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Article Container (Aleksa Gordic clean layout: centered max 800px) */}
      <main className="container" style={{ maxWidth: '820px', padding: '3.5rem 1.5rem 6rem' }}>
        
        {/* Article Meta Header */}
        <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.82rem', padding: '0.25rem 0.75rem' }}>
              {post.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              <Calendar size={14} />
              <span>{post.publishedDate}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              <Clock size={14} />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 2.85rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '1.25rem'
          }}>
            {post.title}
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
            fontWeight: 400
          }}>
            {post.summary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {post.tags.map((t, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.75rem' }}>
                #{t}
              </span>
            ))}
          </div>
        </header>

        {/* Clean Article Body with KaTeX & Styled Callouts */}
        <article className="prose" style={{ maxWidth: '100%' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // Custom Blockquote (Aleksa Gordic Callout styling)
              blockquote({ children }) {
                return (
                  <div style={{
                    margin: '2rem 0',
                    padding: '1.25rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(56, 189, 248, 0.05)',
                    borderLeft: '4px solid var(--accent-cyan)',
                    borderTop: '1px solid rgba(56, 189, 248, 0.15)',
                    borderRight: '1px solid rgba(56, 189, 248, 0.15)',
                    borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7
                  }}>
                    {children}
                  </div>
                );
              },
              // Code Block with syntax styling & copy button
              code({ node, inline, className, children, ...props }: any) {
                if (inline) {
                  return (
                    <code
                      style={{
                        background: 'rgba(56, 189, 248, 0.1)',
                        color: 'var(--accent-cyan)',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        fontSize: '0.88em',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid rgba(56, 189, 248, 0.2)'
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return <CodeBlock className={className}>{children}</CodeBlock>;
              },
              // Anchor links (citations & external links)
              a({ href, children }) {
                const isAnchor = href?.startsWith('#');
                return (
                  <a
                    href={href}
                    target={isAnchor ? '_self' : '_blank'}
                    rel={isAnchor ? undefined : 'noopener noreferrer'}
                    style={{
                      color: 'var(--accent-cyan)',
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      fontWeight: 600,
                      transition: 'color var(--transition-fast)'
                    }}
                  >
                    {children}
                  </a>
                );
              },
              // Table component for responsive display
              table({ children }) {
                return (
                  <div style={{ overflowX: 'auto', margin: '2rem 0', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-subtle)',
                    borderBottom: '2px solid var(--border-card)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td style={{
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)'
                  }}>
                    {children}
                  </td>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Bottom Author & Back Card (Aleksa Gordic style) */}
        <div style={{
          marginTop: '4.5rem',
          padding: '2.25rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Logo size={48} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                {siteConfig.name}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                AI Systems Engineer • High-Throughput Inference, vLLM & Agentic Ops
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                <a 
                  href={siteConfig.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}
                >
                  GitHub ↗
                </a>
                <a 
                  href={siteConfig.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}
                >
                  LinkedIn ↗
                </a>
                <a 
                  href={`mailto:${siteConfig.email}`} 
                  style={{ color: 'var(--text-tertiary)', textDecoration: 'none' }}
                >
                  Contact ✉
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="btn btn-primary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={15} />
            <span>Back to all posts</span>
          </button>
        </div>

      </main>

    </div>
  );
};
