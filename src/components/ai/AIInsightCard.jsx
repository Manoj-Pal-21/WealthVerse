import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function AIInsightCard({
  title,
  description,
  priority = 'Medium Priority',
  priorityLevel = 'medium', // 'high', 'medium', 'good'
  actionText = 'Explain',
  onAction,
  className = ''
}) {
  const badgeVariants = {
    high: 'danger',
    medium: 'warning',
    good: 'good'
  };

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br from-brand-50/40 via-white to-slate-50/60 border border-brand-100/70 hover:border-brand-200 transition-all shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Compass className="w-4 h-4 animate-pulse-subtle" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        </div>
        <Badge variant={badgeVariants[priorityLevel] || 'brand'} size="sm">
          {priority}
        </Badge>
      </div>

      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
        {description}
      </p>

      {actionText && (
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex justify-end">
          <button
            onClick={onAction}
            className="inline-flex items-center text-xs font-semibold text-brand-700 hover:text-brand-800 gap-1 group transition-colors"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
