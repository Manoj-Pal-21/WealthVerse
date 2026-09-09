import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  TrendingUp, 
  Layers, 
  Radar, 
  Target, 
  ShieldCheck, 
  FileText, 
  Compass, 
  Sparkles,
  Users
} from 'lucide-react';
import Badge from '../common/Badge';

export default function Sidebar({ 
  currentPage, 
  onNavigate, 
  onOpenAI 
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'equity', label: 'Equity', icon: TrendingUp },
    { id: 'mutual-funds', label: 'Mutual Funds', icon: Layers },
    { 
      id: 'gaps', 
      label: 'Financial Gaps', 
      icon: Radar, 
      highlight: true, 
      badge: 'Core' 
    },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'protection', label: 'Protection', icon: ShieldCheck },
    { id: 'legacy', label: 'Legacy', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { 
      id: 'ai-agent', 
      label: '360° AI Agent', 
      icon: Compass, 
      badge: 'AI' 
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-screen fixed left-0 top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20">
          <Compass className="w-6 h-6 animate-pulse-subtle" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-slate-900 tracking-tight text-lg">360° Wealth</span>
          </div>
          <p className="text-[11px] font-medium text-slate-400 tracking-wide">Your Money. Smarter.</p>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
          Financial Command
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? 'bg-brand-50 text-brand-700 border border-brand-200/70 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <Badge 
                  variant={item.highlight ? 'brand' : 'purple'} 
                  size="sm"
                  className={isActive ? 'bg-brand-100 border-brand-300 text-brand-800' : ''}
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom "Ask 360° AI" Assistant Card */}
      <div className="p-3 border-t border-slate-100">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-brand-50/70 via-brand-50/30 to-emerald-50/60 border border-brand-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-900">Ask 360° AI</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug mb-3">
            Detect hidden gaps and simulate scenario impact in real time.
          </p>
          <button
            onClick={onOpenAI}
            className="w-full py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <span>Open Copilot</span>
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
