import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { CaseStudyView } from './components/case-study/CaseStudyView';
import { BlogView } from './components/blog/BlogView';
import { BlogPostPage } from './components/blog/BlogPostPage';
import { ProjectsView } from './components/projects/ProjectsView';
import { SkillsView } from './components/skills/SkillsView';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { ConsultingSection } from './components/consulting/ConsultingSection';
import { ContactSection } from './components/contact/ContactSection';
import { ResumeModal } from './components/resume/ResumeModal';
import { BlogPost, blogPosts } from './data/blogPosts';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('akash_portfolio_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Check if URL hash points to a specific blog slug
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('post/')) {
      const slug = hash.replace('post/', '');
      const found = blogPosts.find((p) => p.slug === slug);
      if (found) {
        setActivePost(found);
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('akash_portfolio_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleSelectPost = (post: BlogPost) => {
    setActivePost(post);
    window.location.hash = `post/${post.slug}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToWriting = () => {
    setActivePost(null);
    window.location.hash = 'writing';
    setTimeout(() => {
      const element = document.getElementById('writing');
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    }, 50);
  };

  const handleNavigate = (sectionId: string) => {
    if (activePost) {
      setActivePost(null);
    }
    setActiveSection(sectionId);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Dedicated Full-Page Article View (Aleksa Gordic style)
  if (activePost) {
    return (
      <BlogPostPage
        post={activePost}
        onBack={handleBackToWriting}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className="app-root">
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Content */}
      <main id="overview">
        {/* 1. Hero & Verified Proof Metrics */}
        <Hero
          onNavigate={handleNavigate}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* 2. Experience & Open Source Proof */}
        <ExperienceTimeline />

        {/* 3. Deep Technical Case Studies */}
        <CaseStudyView />

        {/* 4. Technical Writing / Engineering Blog */}
        <BlogView onSelectPost={handleSelectPost} />

        {/* 5. Selected Projects */}
        <ProjectsView />

        {/* 6. Technical Skills */}
        <SkillsView />

        {/* 7. Capabilities / Advisory */}
        <ConsultingSection />

        {/* 8. Direct Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
