import React from 'react';
import { cn } from '../../lib/utils';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-slate-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
