import React, { useState } from 'react';
import { 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  Landmark,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import ConnectedAccountsCard from '../components/planner/ConnectedAccountsCard';

export default function ProgressGoalsScreen({ metrics, onNavigate }) {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Emergency Reserve Fund",
      category: "Safety Cushion",
      current: 120000,
      target: 300000,
      currentText: "₹1,20,000",
      targetText: "₹3,00,000",
      percent: 40,
      targetDate: "6 Months",
      monthlyAllocation: "₹30,000/mo",
      color: "bg-blue-600",
      bgLight: "bg-blue-50 text-blue-700 border-blue-200",
      icon: ShieldCheck
    },
    {
      id: 2,
      title: "Personal Loan Repayment",
      category: "Debt Freedom",
      current: 210000,
      target: 600000,
      currentText: "₹2,10,000 Repaid",
      targetText: "₹6,00,000 Total",
      percent: 35,
      targetDate: "36 Months remaining",
      monthlyAllocation: "₹18,000/mo EMI",
      color: "bg-purple-600",
      bgLight: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Landmark
    },
    {
      id: 3,
      title: "Long-Term Wealth Portfolio",
      category: "Financial Independence",
      current: 450000,
      target: 1000000,
      currentText: "₹4,50,000",
      targetText: "₹10,00,000",
      percent: 45,
      targetDate: "Target: Dec 2027",
      monthlyAllocation: "₹20,000/mo SIP",
      color: "bg-emerald-600",
      bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: TrendingUp
    }
  ]);

  const milestones = [
    { title: "Diagnostic Assessment Completed", score: "Score 78", status: "Completed", date: "Today" },
    { title: "Emergency Buffer Reaches ₹2.1L", score: "Score 84", status: "Upcoming (M3)", date: "Month 3" },
    { title: "Credit Utilization Drops Below 30%", score: "Score 85", status: "Upcoming (M4)", date: "Month 4" },
    { title: "Target ₹3.0L Buffer & Health Score 87", score: "Score 87 (Excellent)", status: "Goal (M6)", date: "Month 6" },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Target className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Financial Journey & Goals
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Track your wealth accumulation, debt payoff milestones, and health score progression.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-sm"
            >
              View Health Dashboard
            </button>
            <button
              onClick={() => onNavigate('advisor')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consult Advisor</span>
            </button>
          </div>
        </div>

        {/* 1. Health Score Milestone Progression Strip */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Financial Health Progression: 78 ➔ 87 Target
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Each milestone executed moves you closer to the "Excellent" tier.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
              Trajectory: +9 Points
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {milestones.map((m, idx) => {
              const isFirst = idx === 0;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isFirst
                      ? 'bg-blue-50/70 border-blue-200'
                      : 'bg-slate-50/60 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-blue-600">{m.date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isFirst ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-2">
                    {m.title}
                  </h4>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Outcome:</span>
                    <span className="font-extrabold text-emerald-700">{m.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Three Active Financial Goals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Active Financial Goals
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              3 active targets tracked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map((g) => {
              const IconComp = g.icon;
              return (
                <div
                  key={g.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all"
                >
                  <div>
                    {/* Category & Icon */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${g.bgLight}`}>
                        {g.category}
                      </span>
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mt-3">
                      {g.title}
                    </h4>

                    {/* Progress Percent Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-blue-600">{g.percent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${g.color}`}
                          style={{ width: `${g.percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Numbers */}
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Accumulated</span>
                        <span className="text-sm font-extrabold text-slate-900">{g.currentText}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block font-medium">Target</span>
                        <span className="text-sm font-extrabold text-slate-900">{g.targetText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Stats */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-blue-600">{g.monthlyAllocation}</span>
                    <span className="text-slate-400">{g.targetDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Connected Accounts Card */}
        <ConnectedAccountsCard />
      </div>
    </div>
  );
}
