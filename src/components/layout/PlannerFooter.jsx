import { Sparkles, ShieldCheck } from 'lucide-react';

export default function PlannerFooter({ onNavigate }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-900 flex items-center justify-center text-amber-400 border border-amber-400/30">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-slate-950 text-sm">
                  m.Stock
                </span>
                <span className="text-slate-500 font-normal text-sm">
                  Wealth360
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Understand what you own, what you owe, what you're building & what you're leaving behind.
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <button onClick={() => onNavigate('welcome')} className="hover:text-blue-600 transition-colors">
              Welcome
            </button>
            <button onClick={() => onNavigate('profile')} className="hover:text-blue-600 transition-colors">
              Profile
            </button>
            <button onClick={() => onNavigate('dashboard')} className="hover:text-blue-600 transition-colors">
              Dashboard (Score 78)
            </button>
            <button onClick={() => onNavigate('plan')} className="hover:text-blue-600 transition-colors">
              Action Plan
            </button>
            <button onClick={() => onNavigate('advisor')} className="hover:text-blue-600 transition-colors">
              AI Advisor
            </button>
            <button onClick={() => onNavigate('progress')} className="hover:text-blue-600 transition-colors">
              Goals
            </button>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Bank-grade 256-bit encryption • RBI AA compliant</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
          Disclaimer: This financial health diagnosis is for prototype demonstration purposes. Projections are simulated based on deterministic financial formulas.
        </div>
      </div>
    </footer>
  );
}
