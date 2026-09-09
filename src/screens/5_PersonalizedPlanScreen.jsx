import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert,
  CreditCard, 
  TrendingUp, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  AlertCircle,
  Plus,
  Flame,
  CheckCircle2,
  XCircle,
  BookmarkCheck
} from 'lucide-react';
import MonthlyTimeline from '../components/planner/MonthlyTimeline';

export default function PersonalizedPlanScreen({ onNavigate }) {
  const [addedPlans, setAddedPlans] = useState([1, 2]); // Default pre-added 1 & 2

  const togglePlan = (id) => {
    if (addedPlans.includes(id)) {
      setAddedPlans(addedPlans.filter(i => i !== id));
    } else {
      setAddedPlans([...addedPlans, id]);
    }
  };

  const priorityActions = [
    {
      id: 1,
      priority: "Priority 1 (High)",
      priorityColor: "bg-rose-50 text-rose-700 border-rose-200",
      title: "Strengthen Emergency Fund",
      icon: ShieldCheck,
      iconColor: "text-rose-600 bg-rose-50",
      targetText: "Build ₹1,20,000 ➔ ₹3,00,000 (3.2 Months Living Expenses)",
      monthlyAction: "Allocate ₹30,000/month for 6 months into high-yield liquid fund",
      reason: "Current reserve covers only 1.3 months. A ₹3.0L buffer fully insulates your family and investments against job transition or medical contingencies.",
      impact: "+5 Health Points",
      tag: "Highest ROI on Resilience"
    },
    {
      id: 2,
      priority: "Priority 2 (High)",
      priorityColor: "bg-amber-50 text-amber-700 border-amber-200",
      title: "Reduce Credit Card Utilization Below 30%",
      icon: CreditCard,
      iconColor: "text-amber-600 bg-amber-50",
      targetText: "Reduce ₹1,80,000 (60%) ➔ ₹88,000 (29%)",
      monthlyAction: "Pay down ₹90,000 over 3-4 months (split across bi-weekly cycles)",
      reason: "Credit bureaus penalize revolving balances above 30%. Lowering this to 29% immediately reclaims lost credit health points and prevents high finance charges.",
      impact: "+4 Health Points",
      tag: "Credit Bureau Optimization"
    },
    {
      id: 3,
      priority: "Priority 3 (Medium)",
      priorityColor: "bg-blue-50 text-blue-700 border-blue-200",
      title: "Increase Long-Term Investment SIP",
      icon: TrendingUp,
      iconColor: "text-blue-600 bg-blue-50",
      targetText: "Scale SIP ₹20,000/mo ➔ ₹25,000/mo (+₹5,000/mo)",
      monthlyAction: "Activate ₹5,000/mo incremental SIP in Nifty 50 Index Fund in Month 5",
      reason: "Once your emergency cushion crosses ₹2.1L in Month 3, channeling ₹5,000/mo into compounding equity generates an estimated extra ₹18.5L over 15 years.",
      impact: "+2 Health Points",
      tag: "Compounding Wealth"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <BookmarkCheck className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Personalized Financial Plan
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Engineered for Manoj Pal • 3 high-leverage recommendations to lift score from <strong className="text-slate-700">78</strong> to <strong className="text-emerald-600">87</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('advisor')}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Financial Advisor</span>
            </button>
          </div>
        </div>

        {/* 3 Recommended Action Priority Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Recommended High-Impact Actions
            </h3>
            <span className="text-xs text-slate-500">
              {addedPlans.length} of {priorityActions.length} active in your roadmap
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {priorityActions.map((action) => {
              const isAdded = addedPlans.includes(action.id);
              const IconComponent = action.icon;

              return (
                <div
                  key={action.id}
                  className={`bg-white rounded-2xl border-2 p-6 shadow-sm flex flex-col justify-between transition-all ${
                    isAdded ? 'border-blue-500 shadow-blue-500/5' : 'border-slate-200'
                  }`}
                >
                  <div>
                    {/* Top Row: Priority Badge & Impact */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${action.priorityColor}`}>
                        {action.priority}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {action.impact}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className={`p-2.5 rounded-xl ${action.iconColor}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {action.title}
                      </h4>
                    </div>

                    {/* Target & Action Details */}
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Target Objective
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">
                        {action.targetText}
                      </p>
                    </div>

                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Tactical Execution
                      </span>
                      <p className="text-xs text-slate-700 mt-0.5 font-medium leading-relaxed">
                        {action.monthlyAction}
                      </p>
                    </div>

                    <div className="mt-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Why this matters
                      </span>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {action.reason}
                      </p>
                    </div>
                  </div>

                  {/* Add / Added Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => togglePlan(action.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        isAdded
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Added to My Plan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to My Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Autonomous AI Guardrails: What You MUST NOT DO */}
        <div className="bg-rose-50/60 border border-rose-200/90 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-rose-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-600 text-white shadow-sm">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-rose-950">
                  Autonomous AI Guardrails: What You MUST NOT DO
                </h3>
                <p className="text-xs text-rose-700 mt-0.5">
                  Critical pitfalls that would derail Manoj Pal's trajectory from 78 to 87
                </p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-wide bg-rose-200 text-rose-900 px-2.5 py-1 rounded-full">
              Strict Prohibitions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs">
              <strong className="text-xs font-extrabold text-rose-950 block">
                1. DO NOT Pay Minimum Due
              </strong>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                Paying 5% minimum on ICICI card leaves 95% compounding at 36% APR (₹5,400/mo bleed) and penalizes CIBIL score.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs">
              <strong className="text-xs font-extrabold text-rose-950 block">
                2. DO NOT Stop Active SIPs
              </strong>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                Pausing ₹20k/mo SIP breaks 14.8% compounding. Service all debt payoffs strictly from your monthly ₹35k cash surplus.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs">
              <strong className="text-xs font-extrabold text-rose-950 block">
                3. DO NOT Buy ULIPs
              </strong>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                Never purchase insurance bundled with investments. 6–9% agent commission drag and 5% yields underperform inflation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs">
              <strong className="text-xs font-extrabold text-rose-950 block">
                4. DO NOT Leave Loans Unscheduled
              </strong>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                Informal loans with Ramesh Sharma carry immense emotional and relational risk. Formalize repayment dates immediately.
              </p>
            </div>
          </div>
        </div>

        {/* 6-Month Execution Timeline Component */}
        <MonthlyTimeline />

        {/* Bottom Navigation CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Ready to execute or need personalized answers?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Chat with your AI Financial Advisor or review your goal milestones.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('progress')}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              View Goal Tracker
            </button>

            <button
              onClick={() => onNavigate('advisor')}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              <span>Ask AI Advisor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
