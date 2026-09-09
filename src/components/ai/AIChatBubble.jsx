import React from 'react';
import { Compass, User, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import FormattedAIMessage from './FormattedAIMessage';

export default function AIChatBubble({ 
  message, 
  onNavigate 
}) {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="flex items-end gap-2 max-w-[80%]">
          <div className="bg-brand-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm shadow-sm leading-relaxed">
            {message.text}
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-semibold">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  // AI Structured Response
  const data = message.data;
  const contentToRender = message.text || data?.intro;

  return (
    <div className="flex justify-start mb-5">
      <div className="flex items-start gap-2.5 max-w-[95%] w-full">
        <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
          <Compass className="w-4 h-4" />
        </div>

        <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl rounded-tl-sm p-4 shadow-sm text-slate-800 text-sm overflow-hidden">
          {/* Visual Markdown Renderer (Tables, Headings, Reality Check Boxes, Bold text) */}
          <FormattedAIMessage content={contentToRender} onNavigate={onNavigate} />

          {/* Structured Analysis Metrics Cards */}
          {data?.metrics && data.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-3.5">
              {data.metrics.map((m, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{m.label}</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Impact Assessment Card */}
          {data?.impact && (
            <div className={`mt-3.5 p-3 rounded-xl border text-xs leading-relaxed ${
              data.impact.type === 'danger' 
                ? 'bg-rose-50/70 border-rose-200/70 text-rose-900' 
                : data.impact.type === 'warning'
                ? 'bg-amber-50/70 border-amber-200/70 text-amber-900'
                : 'bg-blue-50/70 border-blue-200/70 text-blue-900'
            }`}>
              <div className="flex items-center justify-between mb-1 font-semibold">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Financial Impact
                </span>
                <Badge variant={data.impact.type === 'danger' ? 'danger' : data.impact.type === 'warning' ? 'warning' : 'info'} size="sm">
                  {data.impact.level}
                </Badge>
              </div>
              <p className="mt-1">{data.impact.text}</p>
            </div>
          )}

          {/* Recommendations List */}
          {data?.recommendations && data.recommendations.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Deterministic Recommendation
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {data.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50/80 p-2 rounded-lg border border-slate-100/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Action Button */}
          {data?.nextAction && (
            <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => onNavigate && onNavigate(data.nextAction.targetPage)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200/60 transition-colors"
              >
                <span>{data.nextAction.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
