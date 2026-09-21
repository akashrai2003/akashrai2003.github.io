import React, { useState, useRef, useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';

interface TerminalOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

interface InteractiveTerminalProps {
  onNavigate: (route: string) => void;
  onThemeChange: (theme: 'terminal' | 'cyan' | 'light') => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  onNavigate,
  onThemeChange
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalOutput[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      if (!trimmed) {
        setHistory((prev) => [
          ...prev,
          { id: Math.random().toString(), command: '', output: null }
        ]);
        return;
      }

      setCmdHistory((prev) => [...prev, trimmed]);
      setCmdIndex(-1);
      executeCommand(trimmed);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIndex);
      setInput(cmdHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex === -1) return;
      const nextIndex = cmdIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setCmdIndex(-1);
        setInput('');
      } else {
        setCmdIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    }
  };

  const executeCommand = (cmdStr: string) => {
    const parts = cmdStr.split(' ').filter(Boolean);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    let result: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        result = (
          <div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Available commands:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.2rem 1rem' }}>
              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>help</span>
              <span>Display this command manual</span>

              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>ls</span>
              <span>List available directories and text files</span>

              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>cd &lt;dir&gt;</span>
              <span>Navigate to a directory (writing, projects, case-studies, experience, stack, contact)</span>

              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>cat &lt;file&gt;</span>
              <span>View contents of file (~/.social, /proc/status, philosophy.txt)</span>

              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>whoami</span>
              <span>Print system user identity and specialization</span>

              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>theme &lt;name&gt;</span>
              <span>Switch visual palette: terminal | cyan | light</span>

              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>echo &lt;str&gt;</span>
              <span>Print string arguments to stdout</span>

              <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>clear</span>
              <span>Clear terminal history and reset viewport</span>
            </div>
          </div>
        );
        break;

      case 'ls':
        result = (
          <div style={{ lineHeight: 1.7 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div>
                <span
                  className="folder-link"
                  onClick={() => onNavigate('writing')}
                >
                  📁 writing/
                </span>
                <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.75rem', fontSize: '0.85rem' }}>
                  — 3 technical deep-dives (Blackwell SM120, vLLM, Speculative Decoding)
                </span>
              </div>

              <div>
                <span
                  className="folder-link"
                  onClick={() => onNavigate('projects')}
                >
                  📁 projects/
                </span>
                <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.75rem', fontSize: '0.85rem' }}>
                  — 4 production systems & high-throughput inference engines
                </span>
              </div>

              <div>
                <span
                  className="folder-link"
                  onClick={() => onNavigate('case-studies')}
                >
                  📁 case-studies/
                </span>
                <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.75rem', fontSize: '0.85rem' }}>
                  — Architectural deep dives: vLLM PagedAttention & Navy platform
                </span>
              </div>

              <div>
                <span
                  className="folder-link"
                  onClick={() => onNavigate('experience')}
                >
                  📁 experience/
                </span>
                <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.75rem', fontSize: '0.85rem' }}>
                  — Engineering track record, Indian Navy deployment, and open source
                </span>
              </div>

              <div>
                <span
                  className="folder-link"
                  onClick={() => onNavigate('stack')}
                >
                  📁 stack/
                </span>
                <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.75rem', fontSize: '0.85rem' }}>
                  — Python, vLLM, PyTorch, FastAPI, Docker, and systems learning roadmap
                </span>
              </div>

              <div>
                <span
                  className="folder-link"
                  onClick={() => onNavigate('contact')}
                >
                  📁 contact/
                </span>
                <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.75rem', fontSize: '0.85rem' }}>
                  — Direct email, calendar, and secure comms
                </span>
              </div>

              <div style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                📄 philosophy.txt &nbsp;&nbsp; 📄 status.txt &nbsp;&nbsp; 📄 social.txt
              </div>
            </div>
          </div>
        );
        break;

      case 'cd': {
        const target = args[0]?.replace(/\/$/, '');
        if (!target || target === '~' || target === '..' || target === '/') {
          onNavigate('home');
          result = <span style={{ color: 'var(--text-secondary)' }}>Navigated to home directory ~</span>;
        } else if (['writing', 'blog', 'blogs', 'posts'].includes(target)) {
          onNavigate('writing');
          result = <span style={{ color: 'var(--text-secondary)' }}>Opening writing directory ~/writing/...</span>;
        } else if (['projects', 'project'].includes(target)) {
          onNavigate('projects');
          result = <span style={{ color: 'var(--text-secondary)' }}>Opening projects directory ~/projects/...</span>;
        } else if (['case-studies', 'casestudies', 'case-study'].includes(target)) {
          onNavigate('case-studies');
          result = <span style={{ color: 'var(--text-secondary)' }}>Opening case-studies directory ~/case-studies/...</span>;
        } else if (['experience', 'work', 'career'].includes(target)) {
          onNavigate('experience');
          result = <span style={{ color: 'var(--text-secondary)' }}>Opening experience directory ~/experience/...</span>;
        } else if (['stack', 'skills', 'tech'].includes(target)) {
          onNavigate('stack');
          result = <span style={{ color: 'var(--text-secondary)' }}>Opening stack directory ~/stack/...</span>;
        } else if (['contact', 'email'].includes(target)) {
          onNavigate('contact');
          result = <span style={{ color: 'var(--text-secondary)' }}>Opening contact directory ~/contact/...</span>;
        } else {
          result = (
            <span style={{ color: '#ef4444' }}>
              bash: cd: {target}: No such directory. Type 'ls' to view available pages.
            </span>
          );
        }
        break;
      }

      case 'cat': {
        const file = args[0]?.toLowerCase();
        if (['~/.social', 'social.txt', '.social', 'social'].includes(file)) {
          result = (
            <div style={{ lineHeight: 1.6 }}>
              <div><span style={{ color: 'var(--text-tertiary)' }}>GitHub:   </span> <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>{siteConfig.github}</a></div>
              <div><span style={{ color: 'var(--text-tertiary)' }}>LinkedIn: </span> <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>{siteConfig.linkedin}</a></div>
              <div><span style={{ color: 'var(--text-tertiary)' }}>Email:    </span> <a href={`mailto:${siteConfig.email}`} style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>{siteConfig.email}</a></div>
              <div><span style={{ color: 'var(--text-tertiary)' }}>Resume:   </span> <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>Akash_Rai_Resume.pdf</a></div>
            </div>
          );
        } else if (['/proc/status', 'status.txt', 'status'].includes(file)) {
          result = (
            <div style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              <div><strong style={{ color: 'var(--text-primary)' }}>Identity:</strong> {siteConfig.name}</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Role:</strong> {siteConfig.role}</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Location:</strong> {siteConfig.location}</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>Core:</strong> Python, vLLM, PagedAttention, FP8 KV Caching, FastAPI, Docker, Sovereign AI</div>
              <div><strong style={{ color: 'var(--text-primary)' }}>OSS:</strong> Kepler.gl PR #3262 (12,000+ stars)</div>
            </div>
          );
        } else if (['philosophy.txt', 'philosophy'].includes(file)) {
          result = (
            <div style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
              "building practical AI systems • passionate about inference &amp; diving deeper into the bare metal"
            </div>
          );
        } else {
          result = (
            <span style={{ color: '#ef4444' }}>
              cat: {args[0] || ''}: No such file. Try 'cat ~/.social', 'cat /proc/status', or 'cat philosophy.txt'.
            </span>
          );
        }
        break;
      }

      case 'whoami':
        result = (
          <div style={{ color: 'var(--text-primary)' }}>
            akash — AI Systems &amp; GenAI Application Engineer (UID: 1000)
          </div>
        );
        break;

      case 'echo':
        result = (
          <div style={{ color: 'var(--text-secondary)' }}>
            {args.join(' ')}
          </div>
        );
        break;

      case 'theme': {
        const themeChoice = args[0]?.toLowerCase();
        if (themeChoice === 'terminal' || themeChoice === 'matrix' || themeChoice === 'green') {
          onThemeChange('terminal');
          result = <span style={{ color: 'var(--text-secondary)' }}>Switched to Terminal CRT Phosphor Green theme</span>;
        } else if (themeChoice === 'cyan' || themeChoice === 'blue' || themeChoice === 'dark') {
          onThemeChange('cyan');
          result = <span style={{ color: 'var(--text-secondary)' }}>Switched to Cyber Cyan theme</span>;
        } else if (themeChoice === 'light' || themeChoice === 'paper') {
          onThemeChange('light');
          result = <span style={{ color: 'var(--text-secondary)' }}>Switched to Light Monospace theme</span>;
        } else {
          result = (
            <span style={{ color: '#ef4444' }}>
              Usage: theme &lt;terminal | cyan | light&gt;
            </span>
          );
        }
        break;
      }

      case 'clear':
        setHistory([]);
        return;

      default:
        result = (
          <span style={{ color: '#ef4444' }}>
            bash: {cmd}: command not found. Type <strong style={{ color: 'var(--text-primary)' }}>help</strong> for available commands.
          </span>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmdStr,
        output: result
      }
    ]);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      style={{
        cursor: 'text',
        marginTop: '1.25rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      {/* Executed History */}
      {history.map((item) => (
        <div key={item.id} style={{ marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: item.output ? '0.35rem' : '0' }}>
            <span className="terminal-prompt-prefix">akash@systems:~$</span>
            <span className="terminal-command-text">{item.command}</span>
          </div>
          {item.output && (
            <div style={{ paddingLeft: '0.5rem', marginBottom: '0.5rem' }}>
              {item.output}
            </div>
          )}
        </div>
      ))}

      {/* Active Input Line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="terminal-prompt-prefix">akash@systems:~$</span>
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              fontWeight: 500,
              padding: 0,
              margin: 0
            }}
            placeholder="type 'help' or 'ls'..."
          />
        </div>
      </div>
    </div>
  );
};
