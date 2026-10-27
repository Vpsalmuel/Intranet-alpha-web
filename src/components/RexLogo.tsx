import React from 'react';

export default function RexLogo({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 480 210" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rex Insurance Logo"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* 1. Upper Orange Arc */}
      <path 
        d="M 12 30 H 96 C 145 30 185 70 185 119 H 143 C 143 93 122 72 96 72 H 12 Z" 
        fill="#F36F21"
      />
      
      {/* 2. Middle Navy Arc */}
      <path 
        d="M 12 78 H 96 C 145 78 185 118 185 167 V 195 H 143 V 167 C 143 141 122 120 96 120 H 12 Z" 
        fill="#313B76"
      />
      
      {/* 3. Bottom-Left Navy Accent Block */}
      <rect 
        x="12" 
        y="153" 
        width="42" 
        height="42" 
        fill="#313B76" 
      />
      
      {/* 4. "rex" Wordmark */}
      <text 
        x="220" 
        y="136" 
        fontFamily="Inter, 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" 
        fontWeight="900" 
        fontSize="145" 
        fill="#313B76" 
        letterSpacing="-5"
      >
        rex
      </text>
      
      {/* 5. "insurance" Wordmark */}
      <text 
        x="222" 
        y="190" 
        fontFamily="Inter, 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" 
        fontWeight="800" 
        fontSize="48" 
        fill="#313B76" 
        letterSpacing="-0.5"
      >
        insurance
      </text>
    </svg>
  );
}
