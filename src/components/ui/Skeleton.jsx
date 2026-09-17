import React from 'react';

export function Skeleton({ className = '', variant = 'rectangular' }) {
  const base = "animate-pulse bg-slate-200 dark:bg-slate-800";
  
  if (variant === 'circle') {
    return <div className={`${base} rounded-full ${className}`} />;
  }
  
  return <div className={`${base} rounded-xl ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-10 h-10" variant="circle" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-16 w-full" />
    </div>
  );
}
