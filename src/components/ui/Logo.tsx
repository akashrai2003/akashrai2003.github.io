import React from 'react';

interface LogoProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 36 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.35))' }}
    >
      <defs>
        <linearGradient id="akashLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="akashGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>

      {/* Hexagonal / Squircle Silicon Frame */}
      <rect 
        x="2" 
        y="2" 
        width="36" 
        height="36" 
        rx="10" 
        fill="url(#akashGlowGrad)" 
        stroke="url(#akashLogoGrad)" 
        strokeWidth="1.5" 
      />

      {/* Neural Core Grid Lines */}
      <line x1="2" y1="20" x2="10" y2="20" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="20" x2="38" y2="20" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="2" x2="20" y2="10" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="30" x2="20" y2="38" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Stylized "A" Tensor Architecture Glyph */}
      <path 
        d="M20 9L29.5 28H24.5L20 18.5L15.5 28H10.5L20 9Z" 
        fill="url(#akashLogoGrad)" 
      />

      {/* Crossbar & Center Synapse Node */}
      <path d="M14.5 23.5H25.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="18.5" r="2.2" fill="#ffffff" />
      <circle cx="10.5" cy="28" r="1.5" fill="#38bdf8" />
      <circle cx="29.5" cy="28" r="1.5" fill="#a855f7" />
    </svg>
  );
};
