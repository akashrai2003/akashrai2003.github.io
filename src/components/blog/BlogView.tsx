import React, { useState, useMemo } from 'react';
import { Search, ArrowLeft, Clock, Tag } from 'lucide-react';
import { blogPosts, BlogPost } from '../../data/blogPosts';

interface BlogViewProps {
  onSelectPost: (post: BlogPost) => void;
  onBackHome?: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onSelectPost, onBackHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Inference & GPU', 'Hardware & Kernels', 'Enterprise AI', 'Air-Gapped Ops'];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem', fontFamily: 'var(--font-mono)' }}>
      {/* Aleksa Gordic style header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          LLM Systems can be understood
        </h1>
        <div style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
          (Akash Rai engineering writing)
        </div>

        {onBackHome && (
          <div>
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
        )}
      </div>

      {/* Search & Category Filter */}
      <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search posts (e.g. Blackwell, vLLM, Speculative Decoding)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.7rem 0.85rem 0.7rem 2.5rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-card)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color var(--transition-fast)'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-card)'}
          />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="badge-tech"
              style={{
                cursor: 'pointer',
                background: selectedCategory === cat ? 'var(--text-primary)' : 'var(--bg-subtle)',
                color: selectedCategory === cat ? 'var(--bg-canvas)' : 'var(--text-secondary)',
                border: selectedCategory === cat ? '1px solid var(--text-primary)' : '1px solid var(--border-card)',
                fontWeight: selectedCategory === cat ? 700 : 500
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article List (Aleksa Gordic Clean Text List with Modal Badges) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            style={{
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '2.5rem'
            }}
          >
            {/* Title as Underlined Link */}
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.65rem', lineHeight: 1.4 }}>
              <span
                onClick={() => onSelectPost(post)}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  cursor: 'pointer',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              >
                {post.title}
              </span>
            </h2>

            {/* Date & Metadata */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', color: 'var(--text-tertiary)', fontSize: '0.82rem', marginBottom: '0.9rem' }}>
              <span>{post.publishedDate}</span>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={13} />
                <span>{post.readingTime}</span>
              </div>
              <span>•</span>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {post.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="badge-tech" style={{ fontSize: '0.72rem' }}>
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>

            {/* Abstract */}
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
              {post.summary}
            </p>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div style={{ color: 'var(--text-tertiary)', padding: '2rem 0', textAlign: 'center' }}>
            No articles found matching "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
