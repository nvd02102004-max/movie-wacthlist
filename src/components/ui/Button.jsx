import React from 'react';
import { cn } from '../../lib/utils';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
  
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30 focus:ring-purple-500',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 focus:ring-slate-600',
    danger: 'bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 focus:ring-rose-500',
    ghost: 'hover:bg-slate-800 text-slate-400 hover:text-white',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
