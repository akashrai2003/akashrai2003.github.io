import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Check, Copy } from 'lucide-react';
import { BlogPost } from '../../data/blogPosts';
import { Logo } from '../ui/Logo';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

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
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo))',
          transition: 'width 50ms linear'
        }} />
      </div>

      {/* Sticky Header */}
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

      {/* Article Container (Clean, Centered, Aleksa Gordic aesthetic) */}
      <main className="container" style={{ maxWidth: '820px', padding: '3.5rem 1.5rem 6rem' }}>
        
        {/* Article Meta Header */}
        <header style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.8rem' }}>
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
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: '1.25rem'
          }}>
            {post.title}
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '1.5rem'
          }}>
            {post.summary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {post.tags.map((t, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.75rem' }}>
                #{t}
              </span>
            ))}
          </div>
        </header>

        {/* Clean Article Body */}
        <article className="prose" style={{ maxWidth: '100%' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Bottom Author & Back Card */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Logo size={42} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                Akash Rai
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                AI Systems & Inference Engineer • Bengaluru, India
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="btn btn-primary btn-sm"
          >
            ← Back to all posts
          </button>
        </div>

      </main>

    </div>
  );
};
