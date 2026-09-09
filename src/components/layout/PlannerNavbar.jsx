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
  CreditCard
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
  hasCompletedJourney = false
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
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => {
              if (hasCompletedJourney) {
                onNavigate('dashboard');
              } else {
                onNavigate('journey');
              }
            }}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  Financial Health Planner
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border ${
                  isJourneyPhase 
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}>
                  {isJourneyPhase ? "Guided Journey" : "Verified Diagnostics"}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                {isJourneyPhase ? "Step-by-step diagnostic intake" : "Diagnose • Prioritize • Act"}
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
