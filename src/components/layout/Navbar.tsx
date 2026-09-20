import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  BookOpen, 
  Briefcase, 
  Terminal, 
  FileText, 
  FolderGit2, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Download,
  ExternalLink,
  Layers
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  theme,
  toggleTheme,
  onOpenResume
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <Cpu size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'case-studies', label: 'Case Studies', icon: <FileText size={16} /> },
    { id: 'writing', label: 'Writing', icon: <BookOpen size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Layers size={16} /> },
    { id: 'contact', label: 'Contact', icon: <FileText size={16} /> },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all var(--transition-base)',
        background: isScrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand & Status */}
        <div 
          onClick={() => handleNavClick('overview')}
          style={{ 
            cursor: 'pointer',
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.85rem' 
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.2))',
            border: '1px solid var(--border-highlight)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-cyan)'
          }}>
            <Cpu size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                {siteConfig.name}
              </span>
              <span className="badge badge-emerald" style={{ padding: '0.15rem 0.45rem', fontSize: '0.7rem' }}>
                <span className="status-dot" style={{ width: '6px', height: '6px' }} />
                Open for AI Roles
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
              LLM Systems & Inference
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-cyan-subtle)' : 'transparent',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'var(--bg-subtle)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle & Resume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'var(--border-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            onClick={onOpenResume}
            className="btn btn-primary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Download size={15} />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card-solid)',
            borderBottom: '1px solid var(--border-card)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-primary)',
                background: activeSection === item.id ? 'var(--accent-cyan-subtle)' : 'transparent',
                border: 'none',
                textAlign: 'left',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
            <a 
              href={siteConfig.resumeUrl} 
              download 
              className="btn btn-primary" 
              style={{ width: '100%' }}
            >
              <Download size={16} />
              Download Resume PDF
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
