import React from 'react';

const LogoIcon = ({ className = "w-10 h-10", size = 40 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      {/* Modern stylized navigation arrow / growth symbol */}
      <path 
        d="M20 5L35 32L20 26L5 32L20 5Z" 
        fill="url(#logo-gradient)" 
        stroke="white" 
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path 
        d="M20 5V26" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeOpacity="0.3" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LogoIcon;
