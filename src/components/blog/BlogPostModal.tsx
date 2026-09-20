import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { X, Calendar, Clock, Tag, Share2, ArrowLeft } from 'lucide-react';
import { BlogPost } from '../../data/blogPosts';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0.88)',
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
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          padding: '2.5rem'
        }}
      >
        {/* Navigation / Close */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <button
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to all posts</span>
          </button>

          <button
            onClick={onClose}
            aria-label="Close post"
            style={{
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
        </div>

        {/* Post Metadata Header */}
        <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span className="badge badge-cyan">{post.category}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
              <Calendar size={14} />
              <span>{post.publishedDate}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
              <Clock size={14} />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.25 }}>
            {post.title}
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {post.summary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.25rem' }}>
            {post.tags.map((t, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.75rem' }}>
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Rendered Markdown Body */}
        <div className="prose" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            Written by <strong>Akash Rai</strong> • AI Engineer & Systems Builder
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
          >
            Close Post
          </button>
        </div>

      </div>
    </div>
  );
};
