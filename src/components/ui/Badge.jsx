import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    purple: 'bg-purple-950/80 text-purple-300 border-purple-800/50',
    amber: 'bg-amber-950/80 text-amber-300 border-amber-800/50',
    emerald: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
