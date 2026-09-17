import React from 'react';

export function HandDrawnCard({
  children,
  className = '',
  variant = 'default', // 'default', 'postit', 'muted', 'accent'
  decoration = 'none', // 'none', 'tape', 'tack'
  rotate = 'none', // 'none', 'tilt-left', 'tilt-right'
  hoverEffect = false,
  ...props
}) {
  const baseStyle = "relative p-6 transition-all duration-200 rounded-xl border font-serif";

  const variantStyles = {
    default: "bg-white dark:bg-slate-800/90 border-slate-200/90 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 shadow-xs",
    postit: "bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/90 dark:border-amber-900/40 text-amber-950 dark:text-amber-100 shadow-xs",
    muted: "bg-slate-50/90 dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-xs",
    accent: "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 shadow-md"
  };

  const hoverStyle = hoverEffect ? "hover:-translate-y-0.5 hover:shadow-md transition-all duration-200" : "";

  return (
    <div
      className={`${baseStyle} ${variantStyles[variant]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
