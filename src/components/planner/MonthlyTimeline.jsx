import React, { useState } from 'react';
import { CheckCircle2, Circle, Calendar, ArrowRight, ShieldCheck, CreditCard, TrendingUp, Sparkles } from 'lucide-react';

export default function MonthlyTimeline({ onActionComplete }) {
  const [completedSteps, setCompletedSteps] = useState([0]); // Month 1 in progress / first done

  const toggleStep = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const steps = [
    {
      month: "Month 1",
      title: "Kickstart Safety Buffer & Target Credit Card",
      badge: "Immediate Start",
      badgeColor: "bg-blue-100 text-blue-700",
      actions: [
        "Automate ₹30,000 transfer to liquid fund right after salary credit",
        "Make an extra principal payment of ₹25,000 toward credit card balance",
        "Enable auto-debit of minimum dues to avoid late penalties"
      ],
      milestone: "Liquid Emergency Fund: ₹1.50L • Score +2",
      icon: ShieldCheck,
      iconColor: "text-blue-600 bg-blue-50"
    },
    {
      month: "Month 2",
      title: "Maintain Buffer Pace & Lower Credit Peak",
      badge: "Discipline Phase",
      badgeColor: "bg-indigo-100 text-indigo-700",
      actions: [
        "Continue ₹30,000 emergency fund allocation",
        "Pay down credit card balance by another ₹25,000 (balance drops to ₹1.30L)",
        "Review recurring subscriptions to save ₹3,000/month"
      ],
      milestone: "Liquid Emergency Fund: ₹1.80L • Score +4",
      icon: CreditCard,
      iconColor: "text-amber-600 bg-amber-50"
    },
    {
      month: "Month 3",
      title: "Reach 2-Month Safety Cushion Milestone",
      badge: "Crucial Milestone",
      badgeColor: "bg-emerald-100 text-emerald-700",
      actions: [
        "Deposit ₹30,000 into emergency reserve (Total reaches ₹2.10L)",
        "Credit card balance drops under ₹1.10L (~36% utilization)",
        "Conduct mid-quarter check-in with your AI Financial Advisor"
      ],
      milestone: "Emergency Fund reaches ₹2.1L (2+ Months Living Expenses) • Score +6",
      icon: ShieldCheck,
      iconColor: "text-emerald-600 bg-emerald-50"
    },
    {
      month: "Month 4",
      title: "Drop Credit Utilization Below 30%",
      badge: "Credit Optimization",
      badgeColor: "bg-amber-100 text-amber-700",
      actions: [
        "Final credit card paydown brings outstanding balance to ₹88,000 (29% utilization)",
        "Maintain ₹30,000 monthly emergency contribution",
        "Credit bureaus update CIBIL score positively"
      ],
      milestone: "Credit Utilization achieves Golden Ratio (< 30%) • Score +7",
      icon: CreditCard,
      iconColor: "text-blue-600 bg-blue-50"
    },
    {
      month: "Month 5",
      title: "Expand Long-Term Wealth Accumulation",
      badge: "Growth Phase",
      badgeColor: "bg-purple-100 text-purple-700",
      actions: [
        "Increase existing Mutual Fund SIP by ₹5,000 (from ₹20K to ₹25K/month)",
        "Select low-cost Nifty 50 Index Fund for the incremental allocation",
        "Deposit ₹30,000 to emergency fund (Total reaches ₹2.70L)"
      ],
      milestone: "Monthly Investments hit ₹25,000 • Score +8",
      icon: TrendingUp,
      iconColor: "text-purple-600 bg-purple-50"
    },
    {
      month: "Month 6",
      title: "Full Emergency Goal Reached & Health Score 87",
      badge: "Target Achieved",
      badgeColor: "bg-emerald-100 text-emerald-800",
      actions: [
        "Final ₹30,000 deposit locks in full ₹3,00,000 emergency reserve (3.2+ months)",
        "Rebalance surplus into disciplined wealth building & debt prepayment",
        "Celebrate achieving an 'Excellent' Financial Health Score of 87/100"
      ],
      milestone: "Goal Achieved: ₹3.0L Liquid Buffer + 87 Health Score • Rating: Excellent",
      icon: Sparkles,
      iconColor: "text-emerald-600 bg-emerald-50"
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Calendar className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              6-Month Action Plan Roadmap
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Follow this month-by-month tactical execution to elevate your financial health from 78 to 87.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="text-blue-600 font-bold">{completedSteps.length}</span> of {steps.length} milestones checked
        </div>
      </div>

      {/* Vertical Stepper Timeline */}
      <div className="relative mt-6 space-y-6">
        {/* Continuous vertical line */}
        <div className="absolute top-4 left-6 bottom-4 w-0.5 bg-slate-200" />

        {steps.map((step, idx) => {
          const isDone = completedSteps.includes(idx);
          const IconComp = step.icon;

          return (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Node Indicator */}
              <button
                onClick={() => toggleStep(idx)}
                className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm shrink-0 ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-emerald-200'
                    : 'bg-white border-2 border-slate-200 hover:border-blue-400 text-slate-400'
                }`}
                title={isDone ? "Mark incomplete" : "Mark completed"}
              >
                {isDone ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <span className="font-bold text-sm text-slate-600">{idx + 1}</span>
                )}
              </button>

              {/* Step Card */}
              <div className={`flex-1 p-4 rounded-xl border transition-all ${
                isDone 
                  ? 'bg-emerald-50/40 border-emerald-200' 
                  : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {step.month}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${step.badgeColor}`}>
                      {step.badge}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    {isDone ? "Completed" : "Action Required"}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mt-1">
                  {step.title}
                </h4>

                {/* Actions Checklist */}
                <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                  {step.actions.map((act, actIdx) => (
                    <li key={actIdx} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>

                {/* Milestone Banner */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <span className="text-emerald-600 font-bold">Target:</span>
                  <span>{step.milestone}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
