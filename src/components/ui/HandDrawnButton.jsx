import React from 'react';

export function HandDrawnButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'accent', 'secondary', 'postit', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) {
  const baseStyle = "inline-flex items-center justify-center font-serif font-semibold tracking-wide transition-all duration-150 cursor-pointer select-none rounded-lg active:scale-[0.98]";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5 shadow-xs",
    md: "px-4 py-2 text-sm gap-2 shadow-sm",
    lg: "px-6 py-3 text-base gap-2.5 shadow-md"
  };

  const variantStyles = {
    primary: "bg-slate-900 text-white border border-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100 dark:hover:bg-white",
    accent: "bg-blue-700 text-white border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500",
    secondary: "bg-emerald-700 text-white border border-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500",
    postit: "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800/60",
    outline: "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700/80"
  };

  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed pointer-events-none shadow-none" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${disabledStyle} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-5 h-5" : "w-4 h-4"} />}
      <span>{children}</span>
    </button>
  );
}
