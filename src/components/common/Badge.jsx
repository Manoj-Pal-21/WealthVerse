import React from 'react';

export default function Badge({ 
  children, 
  variant = 'brand', // 'brand', 'good', 'success', 'warning', 'danger', 'info', 'neutral', 'purple'
  size = 'md', // 'sm', 'md', 'lg'
  dot = false,
  className = '' 
}) {
  const variantStyles = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/60',
    good: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/60',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/60',
    info: 'bg-blue-50 text-blue-700 border-blue-200/60',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/60',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200/60'
  };

  const dotColors = {
    brand: 'bg-brand-500',
    good: 'bg-emerald-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-blue-500',
    purple: 'bg-purple-500',
    neutral: 'bg-slate-400'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-medium'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant] || variantStyles.brand} ${sizeStyles[size] || sizeStyles.md} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.brand}`} />}
      {children}
    </span>
  );
}
