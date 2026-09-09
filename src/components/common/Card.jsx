import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  action, 
  headerBorder = false,
  padding = 'p-6',
  onClick
}) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-card transition-all duration-200 ${onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-card-hover' : ''} ${className}`}
    >
      {(title || subtitle || action) && (
        <div className={`flex items-center justify-between px-6 pt-5 ${headerBorder ? 'pb-4 border-b border-slate-100' : 'pb-2'}`}>
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center space-x-2">{action}</div>}
        </div>
      )}
      <div className={padding}>
        {children}
      </div>
    </div>
  );
}
