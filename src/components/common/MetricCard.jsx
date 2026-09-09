import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';

export default function MetricCard({
  title,
  value,
  change,
  period,
  isPositive = true,
  status,
  statusType = 'brand',
  icon: Icon,
  iconColor = 'text-brand-600 bg-brand-50',
  className = '',
  onClick
}) {
  return (
    <Card className={`relative overflow-hidden ${className}`} padding="p-5" onClick={onClick}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">{value}</h4>
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100/80">
        {change && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`inline-flex items-center font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {change}
            </span>
            {period && <span className="text-slate-400">{period}</span>}
          </div>
        )}

        {status && (
          <Badge variant={statusType} size="sm">
            {status}
          </Badge>
        )}
      </div>
    </Card>
  );
}
