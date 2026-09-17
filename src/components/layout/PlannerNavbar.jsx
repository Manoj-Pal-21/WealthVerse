import React from 'react';
import { 
  HeartPulse, 
  User, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Layers, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquareText, 
  Target,
  ArrowLeft,
  ArrowRight,
  Wallet,
  PieChart,
  CreditCard,
  Headset,
  Briefcase
} from 'lucide-react';

export default function PlannerNavbar({
  activeScreen = 'journey',
  onNavigate,
  score = 78,
  netWorth = 2774000,
  userName = "Manoj Pal",
  onResetDemo,
  journeyStep = 1,
  onSetJourneyStep,
  hasCompletedJourney = false,
  onOpenRM,
  onOpenAiSuggestions
}) {
  const isJourneyPhase = activeScreen === 'journey' || activeScreen === 'profile' || activeScreen === 'welcome';
  const isLoadingPhase = activeScreen === 'loading';

  const journeySteps = [
    { id: 1, label: "1. Cashflow & Age", icon: Wallet },
    { id: 2, label: "2. Investments", icon: PieChart },
    { id: 3, label: "3. Loans & Debt", icon: CreditCard },
    { id: 4, label: "4. Protection & Goals", icon: ShieldCheck },
  ];

  const dashboardViews = [
    { id: 'dashboard', label: '360° Wealth Dashboard', icon: HeartPulse, badge: `${score}` },
    { id: 'plan', label: 'Personalized Plan', icon: ShieldCheck },
    { id: 'advisor', label: 'AI Advisor (New Page)', icon: MessageSquareText, hasAi: true },
    { id: 'progress', label: 'Goal Milestones', icon: Target },
    { id: 'rm', label: 'RM Desk (Vikram)', icon: Briefcase, isRM: true, badge: 'SEBI' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo matching m.Stock Wealth360 */}
          <div 
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            title="Go to Wealth360 Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-900 flex items-center justify-center text-amber-400 shadow-md border border-amber-400/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-950 tracking-tight text-base font-display">
                  m.Stock
                </span>
                <span className="text-slate-500 font-normal text-base">
                  Wealth360
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 ml-1">
                  4 Pillars
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Grow • Protect • Transfer
              </p>
            </div>
          </div>

          {/* Center Context Indicator */}
          {isJourneyPhase ? (
            /* JOURNEY PROGRESS INDICATOR IN HEADER */
            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-2xl">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Journey Progress:
              </span>
              <div className="flex items-center gap-1.5">
                {journeySteps.map((s) => {
                  const isCur = journeyStep === s.id;
                  const isDone = journeyStep > s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSetJourneyStep && onSetJourneyStep(s.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold flex items-center gap-1 transition-all ${
                        isCur
                          ? "bg-blue-600 text-white shadow-xs"
                          : isDone
                          ? "bg-emerald-100 text-emerald-800"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      <span>Step {s.id}</span>
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-black text-blue-600 ml-1">
                {journeyStep * 25}%
              </span>
            </div>
          ) : isLoadingPhase ? (
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Analyzing Wealth Profile...</span>
            </div>
          ) : (
            /* POST-JOURNEY DIAGNOSTIC PILLS */
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700">{userName}</span>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md">
                  Score: {score}/100
                </span>
                <span className="text-xs font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                  NW: ₹{(netWorth / 100000).toFixed(2)}L
                </span>
              </div>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* AI Portfolio Suggestions Trigger */}
            <button
              onClick={onOpenAiSuggestions}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Automated AI Portfolio Suggestions & Overlap Analysis"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">AI Suggestions</span>
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center">
                5
              </span>
            </button>

            {/* RM Portal Switcher Button */}
            <button
              onClick={() => onNavigate('rm')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                activeScreen === 'rm'
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                  : 'bg-indigo-950 hover:bg-indigo-900 text-amber-300 border border-indigo-700/60 hover:scale-105 active:scale-95'
              }`}
              title="Access SEBI Relationship Manager Portal (Vikram Malhotra)"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">RM Portal</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse hidden md:inline" />
            </button>

            {/* Talk to RM Button */}
            <button
              onClick={onOpenRM}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Talk to Dedicated Relationship Manager"
            >
              <Headset className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Talk to RM</span>
            </button>

            {isJourneyPhase ? (
              <button
                onClick={onResetDemo}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                title="Reset or Pre-fill Manoj Pal's verified numbers"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pre-fill Manoj Pal Data</span>
              </button>
            ) : (
              <>
                {/* Back to Journey Edit Button */}
                <button
                  onClick={() => onNavigate('journey')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Edit Information</span>
                </button>

                <button
                  onClick={onResetDemo}
                  title="Reset to default profile"
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SECONDARY ROW: ONLY SHOWN AFTER COMPLETING THE JOURNEY (DASHBOARD VIEWS) */}
      {!isJourneyPhase && !isLoadingPhase && (
        <div className="bg-slate-50/90 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar">
              {dashboardViews.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                        isActive ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.hasAi && !isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping ml-0.5" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
