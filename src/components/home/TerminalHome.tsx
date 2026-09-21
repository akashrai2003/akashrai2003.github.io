import React from 'react';
import { TerminalWindow } from '../terminal/TerminalWindow';
import { AsciiHeader } from '../terminal/AsciiHeader';
import { InteractiveTerminal } from '../terminal/InteractiveTerminal';
import { siteConfig } from '../../data/siteConfig';

interface TerminalHomeProps {
  onNavigate: (route: string) => void;
  theme: 'terminal' | 'cyan' | 'light';
  onToggleTheme: () => void;
  onSetTheme: (theme: 'terminal' | 'cyan' | 'light') => void;
  onOpenResume: () => void;
}

export const TerminalHome: React.FC<TerminalHomeProps> = ({
  onNavigate,
  theme,
  onToggleTheme,
  onSetTheme,
  onOpenResume
}) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2.5rem 1rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative'
      }}
    >
      {/* Top Floating Controls (Aleksa Gordic style top-right mode switch) */}
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: '1rem',
          gap: '0.75rem'
        }}
      >
        <button
          onClick={onToggleTheme}
          className="theme-switch-btn"
          title="Toggle color palette (Terminal CRT -> Cyber Cyan -> Light)"
        >
          <span>theme:</span>
          <strong style={{ color: 'var(--text-primary)' }}>{theme} /&gt;</strong>
        </button>
      </div>

      {/* Primary Terminal Window Frame */}
      <TerminalWindow maxWidth="820px" title="akash@systems — bash — 80x24">
        {/* ASCII Header Banner */}
        <AsciiHeader />

        {/* 1. Philosophy Command */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="terminal-prompt-prefix">$</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>echo $PHILOSOPHY</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', paddingLeft: '0.85rem', fontStyle: 'italic' }}>
            "building practical AI systems • passionate about inference &amp; diving deeper into the bare metal"
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '1.25rem 0' }} />

        {/* 2. System Status Command */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="terminal-prompt-prefix">#</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>cat /proc/status</span>
          </div>
          <div style={{ paddingLeft: '0.85rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>→ Currently:</span> AI Systems &amp; GenAI Application Engineer building high-throughput inference pipelines, sovereign air-gapped platforms, and agentic workflows.
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>→ Track Record:</span>
              <div style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                <div>├── <strong style={{ color: 'var(--text-primary)' }}>Sovereign AI for Indian Navy:</strong> Air-gapped platform across 5+ Docker microservices with zero external network egress</div>
                <div>├── <strong style={{ color: 'var(--text-primary)' }}>Open Source (kepler.gl):</strong> Merged <a href="https://github.com/keplergl/kepler.gl/pull/3262" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>PR #3262</a> resolving persistent state in 12K★ repository</div>
                <div>└── <strong style={{ color: 'var(--text-primary)' }}>vLLM Inference Optimization:</strong> PagedAttention memory budgeting, chunked prefill, and containerized serving on modern GPUs</div>
              </div>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>→ Primary Stack:</span> Python, PyTorch, vLLM, FastAPI, Docker, Linux, LangGraph, SQL
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>→ Learning Roadmap:</span> Starting C++ from scratch &amp; actively studying CUDA to master low-level inference runtimes from first principles
            </div>

            <div>
              <span style={{ color: 'var(--accent-cyan)' }}>→ Location:</span> Bengaluru, India <span style={{ color: 'var(--text-tertiary)' }}>(Open to Global Remote)</span>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '1.25rem 0' }} />

        {/* 3. Directory Listing Navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span className="terminal-prompt-prefix">#</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>ls ~/pages/</span>
          </div>

          <div style={{ paddingLeft: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <div>
              <span className="folder-link" onClick={() => onNavigate('writing')}>
                📂 writing/
              </span>
              <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.85rem', fontSize: '0.88rem' }}>
                — 3 technical deep-dives (Blackwell SM120, vLLM, Speculative Decoding)
              </span>
            </div>

            <div>
              <span className="folder-link" onClick={() => onNavigate('projects')}>
                📂 projects/
              </span>
              <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.85rem', fontSize: '0.88rem' }}>
                — 4 production systems (Custom Triton Kernels, Distributed Cluster, MedVision)
              </span>
            </div>

            <div>
              <span className="folder-link" onClick={() => onNavigate('case-studies')}>
                📂 case-studies/
              </span>
              <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.85rem', fontSize: '0.88rem' }}>
                — Architectural deep dives: vLLM PagedAttention &amp; Indian Navy platform
              </span>
            </div>

            <div>
              <span className="folder-link" onClick={() => onNavigate('experience')}>
                📂 experience/
              </span>
              <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.85rem', fontSize: '0.88rem' }}>
                — Chronological engineering log &amp; verified open-source contributions
              </span>
            </div>

            <div>
              <span className="folder-link" onClick={() => onNavigate('stack')}>
                📂 stack/
              </span>
              <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.85rem', fontSize: '0.88rem' }}>
                — Low-level systems, GPU inference, and deterministic agent capabilities
              </span>
            </div>

            <div>
              <span className="folder-link" onClick={() => onNavigate('contact')}>
                📂 contact/
              </span>
              <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.85rem', fontSize: '0.88rem' }}>
                — Direct contact, email, and meeting scheduler
              </span>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '1.25rem 0' }} />

        {/* 4. Social & Resumes */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="terminal-prompt-prefix">#</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>cat ~/.social</span>
          </div>
          <div style={{ paddingLeft: '0.85rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            <div>
              • <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>GitHub (github.com/akashrai2003)</a>
            </div>
            <div>
              • <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>LinkedIn (linkedin.com/in/akash-rai1701)</a>
            </div>
            <div>
              • <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>Email ({siteConfig.email})</a>
            </div>
            <div>
              • <button onClick={onOpenResume} style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', padding: 0 }}>Resume (Akash_Rai_Resume.pdf)</button>
            </div>
          </div>
        </div>

        {/* 5. Live Interactive Shell Prompt */}
        <InteractiveTerminal
          onNavigate={onNavigate}
          onThemeChange={onSetTheme}
        />
      </TerminalWindow>
    </div>
  );
};
