import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  useImage?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 36, className = '', useImage = true }) => {
  if (useImage) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: Math.max(6, Math.round(size * 0.16)),
          overflow: 'hidden',
          background: '#040804',
          border: '1px solid var(--border-card)',
          boxShadow: '0 0 16px var(--accent-cyan-glow), inset 0 0 8px rgba(0, 0, 0, 0.8)',
          flexShrink: 0,
          transition: 'all var(--transition-fast)'
        }}
        title="Akash Rai — Terminal Systems"
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="Akash Rai Terminal Systems Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    );
  }

  // Pure SVG Vector Fallback / Scalable Render
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        filter: 'drop-shadow(0 0 12px var(--accent-cyan-glow))',
        flexShrink: 0
      }}
    >
      <defs>
        <linearGradient id="terminalLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--text-primary)" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <filter id="logoGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Silicon Die Boundary Frame */}
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="7"
        fill="var(--bg-card-solid)"
        stroke="var(--text-primary)"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      <rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="4"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="0.75"
        strokeDasharray="2 3"
        strokeOpacity="0.25"
      />

      {/* Terminal Prompt Chevron (Upper Left Apex of A) */}
      <path
        d="M12 15L22 23L12 31"
        stroke="url(#terminalLogoGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#logoGlowFilter)"
      />

      {/* Circuit Spine (Right Slanted Leg of A) */}
      <path
        d="M24 10L36 34"
        stroke="url(#terminalLogoGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        filter="url(#logoGlowFilter)"
      />

      {/* Inner PCB Circuit Traces */}
      <path d="M22 23L27 23L30 29" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.75" />
      <path d="M24 14L28 20L28 26" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.6" />

      {/* Blinking Terminal Execution Block Cursor (Crossbar of A) */}
      <rect
        x="17"
        y="27"
        width="11"
        height="4"
        rx="1"
        fill="var(--text-primary)"
        filter="url(#logoGlowFilter)"
      />

      {/* Silicon Via Circuit Nodes */}
      <circle cx="24" cy="10" r="2.2" fill="var(--text-primary)" />
      <circle cx="36" cy="34" r="2" fill="var(--text-primary)" />
      <circle cx="12" cy="15" r="1.5" fill="var(--text-primary)" />
      <circle cx="12" cy="31" r="1.5" fill="var(--text-primary)" />
      <circle cx="30" cy="29" r="1.2" fill="#22c55e" />
      <circle cx="28" cy="26" r="1.2" fill="#22c55e" />
    </svg>
  );
};
