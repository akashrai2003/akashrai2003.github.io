import React from 'react';

export const AsciiHeader: React.FC = () => {
  const asciiArt = ` █████   ██   ██   █████   ███████  ██   ██
██   ██  ██  ██   ██   ██  ██       ██   ██
███████  █████    ███████  ███████  ███████
██   ██  ██  ██   ██   ██       ██  ██   ██
██   ██  ██   ██  ██   ██  ███████  ██   ██`;

  return (
    <div style={{ marginBottom: '1.5rem', overflowX: 'auto' }}>
      <pre
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.55rem, 1.8vw, 0.95rem)',
          lineHeight: '1.15',
          color: 'var(--text-primary)',
          margin: 0,
          background: 'transparent',
          border: 'none',
          padding: 0,
          fontWeight: 700,
          letterSpacing: '0.02em',
          textShadow: '0 0 12px var(--accent-cyan-glow)'
        }}
      >
        {asciiArt}
      </pre>
    </div>
  );
};
