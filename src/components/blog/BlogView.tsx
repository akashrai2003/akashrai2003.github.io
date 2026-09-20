import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { blogPosts, BlogPost } from '../../data/blogPosts';
import { BlogPostModal } from './BlogPostModal';

export const BlogView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Inference & GPU', 'Enterprise AI', 'Air-Gapped Ops', 'Hardware & Kernels', 'RAG & Retrieval'];

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
    <section id="writing" className="section" style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}>
      <div className="container">
        
        <div className="section-header">
          <div className="section-tag">
            <BookOpen size={14} />
            <span>Technical Writing & Architecture Notes</span>
          </div>
          <h2 className="section-title">
            Engineering Insights & Postmortems
          </h2>
          <p className="section-subtitle">
            Long-form essays, memory math breakdowns, and production lessons on GPU inference, local-first serving, air-gapped platforms, and deterministic AI systems.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          {/* Search Input */}
          <div style={{
            position: 'relative',
            maxWidth: '520px'
          }}>
            <Search 
              size={18} 
              color="var(--text-tertiary)" 
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              placeholder="Search posts by keyword, tag (e.g. vLLM, SAQL, Blackwell)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-card)'}
            />
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
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
        </div>

        {/* Posts List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => setActivePost(post)}
            >
              <div>
                {/* Meta Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="badge badge-cyan">{post.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                    <Clock size={13} />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.35
                }}>
                  {post.title}
                </h3>

                {/* Summary */}
                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  {post.summary}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                  {post.tags.map((tag, i) => (
                    <span key={i} className="badge" style={{ fontSize: '0.72rem' }}>
                      #{tag}
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
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--accent-cyan)'
              }}>
                <span>Read Full Article</span>
                <ArrowRight size={16} />
              </div>
            </article>
          ))}
        </div>

        {/* Modal Viewer */}
        <BlogPostModal 
          post={activePost} 
          onClose={() => setActivePost(null)} 
        />

      </div>
    </section>
  );
};
