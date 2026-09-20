import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 36, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 44 44" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ 
        filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.45)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))',
        flexShrink: 0
      }}
    >
      <defs>
        {/* Isometric Facet Gradients */}
        <linearGradient id="logoFacetTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
        
        <linearGradient id="logoFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>

        <linearGradient id="logoFacetRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>

        {/* Neural Core Glowing Gradient */}
        <linearGradient id="logoCoreBeam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>

        <radialGradient id="logoGlowCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>

        {/* Filter for glow */}
        <filter id="tensorGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Hexagonal Shield Backdrop */}
      <path 
        d="M22 2.5L39 12.3V31.7L22 41.5L5 31.7V12.3L22 2.5Z" 
        fill="#070c18" 
        stroke="rgba(56, 189, 248, 0.3)" 
        strokeWidth="1.2" 
      />

      {/* 3D Isometric Tensor Facets */}
      {/* Top Facet (Memory / Input Plane) */}
      <path 
        d="M22 4L37.5 13L22 22L6.5 13L22 4Z" 
        fill="url(#logoFacetTop)" 
        fillOpacity="0.35" 
        stroke="rgba(56, 189, 248, 0.6)" 
        strokeWidth="1" 
      />

      {/* Left Facet (Weights / Compute Plane) */}
      <path 
        d="M6.5 13L22 22V39.5L6.5 30.5V13Z" 
        fill="url(#logoFacetLeft)" 
        fillOpacity="0.5" 
        stroke="rgba(99, 102, 241, 0.5)" 
        strokeWidth="1" 
      />

      {/* Right Facet (Attention / KV Cache Plane) */}
      <path 
        d="M22 22L37.5 13V30.5L22 39.5V22Z" 
        fill="url(#logoFacetRight)" 
        fillOpacity="0.65" 
        stroke="rgba(168, 85, 247, 0.5)" 
        strokeWidth="1" 
      />

      {/* Architectural Lattice Guides (Isometric grid lines) */}
      <line x1="22" y1="4" x2="22" y2="22" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="6.5" y1="13" x2="22" y2="22" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
      <line x1="37.5" y1="13" x2="22" y2="22" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />

      {/* Stylized Futuristic Monogram 'A' Carved Across the Isometric Core */}
      {/* Left Leg */}
      <path 
        d="M22 9L12 29.5H16L22 17L28 29.5H32L22 9Z" 
        fill="url(#logoCoreBeam)" 
        filter="url(#tensorGlow)"
      />

      {/* Horizontal Synapse Crossbar */}
      <path 
        d="M15 24.5H29" 
        stroke="#ffffff" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />

      {/* Glowing Quantum Node Vertices */}
      <circle cx="22" cy="9" r="2.2" fill="#ffffff" />
      <circle cx="22" cy="17" r="1.8" fill="#38bdf8" />
      <circle cx="22" cy="24.5" r="2.4" fill="url(#logoGlowCenter)" />
      
      <circle cx="12" cy="29.5" r="1.8" fill="#38bdf8" />
      <circle cx="32" cy="29.5" r="1.8" fill="#c084fc" />

      {/* Subtle corner photon pulses */}
      <circle cx="22" cy="4" r="1.2" fill="#38bdf8" />
      <circle cx="6.5" cy="30.5" r="1.2" fill="#818cf8" />
      <circle cx="37.5" cy="30.5" r="1.2" fill="#a855f7" />
    </svg>
  );
};
