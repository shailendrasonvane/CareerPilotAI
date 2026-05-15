import React from 'react';
import LogoIcon from './LogoIcon';

const Logo = ({ className = "", iconSize = 32, fontSize = "text-2xl", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon size={iconSize} />
      {showText && (
        <span className={`font-black tracking-tight ${fontSize} bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 font-outfit`}>
          CareerPilot <span className="text-indigo-600 dark:text-indigo-400">AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
