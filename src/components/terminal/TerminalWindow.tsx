import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string | number;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'akash@systems — bash — 80x24',
  children,
  className = '',
  maxWidth = '780px'
}) => {
  return (
    <div
      className={`terminal-shell-card ${className}`}
      style={{
        maxWidth: maxWidth,
        margin: '0 auto',
        width: '100%'
      }}
    >
      {/* Title Bar with macOS Traffic Light Dots */}
      <div className="terminal-shell-titlebar">
        <div className="terminal-dots">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <div style={{ fontWeight: 600, letterSpacing: '0.02em', fontSize: '0.8rem' }}>
          {title}
        </div>
        <div style={{ width: '40px' }} />
      </div>

      {/* Terminal Body */}
      <div style={{ padding: '1.75rem 1.75rem 2rem' }}>
        {children}
      </div>
    </div>
  );
};
