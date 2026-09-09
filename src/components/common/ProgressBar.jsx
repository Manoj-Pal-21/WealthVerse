import React from 'react';

export default function ProgressBar({
  progress = 0,
  max = 100,
  color = 'brand', // 'brand', 'emerald', 'amber', 'rose', 'blue'
  showLabel = true,
  label = '',
  height = 'h-2',
  className = ''
}) {
  const percentage = Math.min(Math.max(Math.round((progress / max) * 100), 0), 100);

  const colorVariants = {
    brand: 'bg-brand-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    blue: 'bg-blue-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5">
          <span>{label}</span>
          <span className="font-semibold text-slate-800">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}>
        <div 
          className={`${height} rounded-full transition-all duration-500 ease-out ${colorVariants[color] || colorVariants.brand}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
