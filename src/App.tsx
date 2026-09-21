import React, { useState, useEffect } from 'react';
import { TerminalHome } from './components/home/TerminalHome';
import { BlogView } from './components/blog/BlogView';
import { BlogPostPage } from './components/blog/BlogPostPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { CaseStudiesPage } from './components/pages/CaseStudiesPage';
import { ExperiencePage } from './components/pages/ExperiencePage';
import { StackPage } from './components/pages/StackPage';
import { ContactPage } from './components/pages/ContactPage';
import { ResumeModal } from './components/resume/ResumeModal';
import { Logo } from './components/ui/Logo';
import { BlogPost, blogPosts } from './data/blogPosts';

type ThemeMode = 'terminal' | 'cyan' | 'light';
type ViewRoute = 'home' | 'writing' | 'projects' | 'case-studies' | 'experience' | 'stack' | 'contact';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('terminal');
  const [currentRoute, setCurrentRoute] = useState<ViewRoute>('home');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  // Initialize theme and handle hash routing
  useEffect(() => {
    const savedTheme = localStorage.getItem('akash_portfolio_theme') as ThemeMode | null;
    if (savedTheme && ['terminal', 'cyan', 'light'].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      setTheme('terminal');
      document.documentElement.setAttribute('data-theme', 'terminal');
    }

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').replace(/^\//, '');
      if (hash.startsWith('post/')) {
        const slug = hash.replace('post/', '');
        const found = blogPosts.find((p) => p.slug === slug);
        if (found) {
          setActivePost(found);
          return;
        }
      }

      setActivePost(null);
      if (['writing', 'projects', 'case-studies', 'experience', 'stack', 'contact'].includes(hash)) {
        setCurrentRoute(hash as ViewRoute);
      } else {
        setCurrentRoute('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSetTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('akash_portfolio_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const cycle: Record<ThemeMode, ThemeMode> = {
      terminal: 'cyan',
      cyan: 'light',
      light: 'terminal'
    };
    handleSetTheme(cycle[theme]);
  };

  const handleNavigate = (route: string) => {
    setActivePost(null);
    if (route === 'home' || route === '~' || route === '/') {
      setCurrentRoute('home');
      window.location.hash = '';
    } else {
      setCurrentRoute(route as ViewRoute);
      window.location.hash = route;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSelectPost = (post: BlogPost) => {
    setActivePost(post);
    window.location.hash = `post/${post.slug}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToWriting = () => {
    setActivePost(null);
    setCurrentRoute('writing');
    window.location.hash = 'writing';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Dedicated Full-Page Article View (Aleksa Gordic style)
  if (activePost) {
    return (
      <div className="app-root">
        <BlogPostPage
          post={activePost}
          onBack={handleBackToWriting}
          theme={theme === 'light' ? 'light' : 'dark'}
          toggleTheme={toggleTheme}
        />
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="app-root">
      {/* Subpage Header for non-home routes */}
      {currentRoute !== 'home' && (
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              onClick={() => handleNavigate('home')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 700 }}
            >
              <Logo size={24} />
              <span>akash@systems:~</span>
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>/</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{currentRoute}</span>
          </div>

          <button
            onClick={toggleTheme}
            className="theme-switch-btn"
            title="Toggle theme"
          >
            <span>theme:</span>
            <strong style={{ color: 'var(--text-primary)' }}>{theme} /&gt;</strong>
          </button>
        </header>
      )}

      {/* Main View Router */}
      <main>
        {currentRoute === 'home' && (
          <TerminalHome
            onNavigate={handleNavigate}
            theme={theme}
            onToggleTheme={toggleTheme}
            onSetTheme={handleSetTheme}
            onOpenResume={() => setResumeModalOpen(true)}
          />
        )}

        {currentRoute === 'writing' && (
          <BlogView
            onSelectPost={handleSelectPost}
            onBackHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'projects' && (
          <ProjectsPage
            onBackHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'case-studies' && (
          <CaseStudiesPage
            onBackHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'experience' && (
          <ExperiencePage
            onBackHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'stack' && (
          <StackPage
            onBackHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage
            onBackHome={() => handleNavigate('home')}
            onOpenResume={() => setResumeModalOpen(true)}
          />
        )}
      </main>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
