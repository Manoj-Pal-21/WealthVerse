import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  HeartHandshake, 
  TrendingUp, 
  Sparkles, 
  GraduationCap, 
  Flame, 
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { DEEP_WEALTH_DATA } from '../../data/wealthDeepData';

export default function InsuranceAndFamilyCard({ metrics, onOpenRM }) {
  const [showTopUpPlan, setShowTopUpPlan] = useState(false);
  const ins = DEEP_WEALTH_DATA.insurance;
  const goals = DEEP_WEALTH_DATA.familyGoals;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Insurance Protection & Inflation-Adjusted Family Goals
              </h3>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                ₹1.00 Cr Gap Detected
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Family security audit, term life coverage gap, and 6% CPI inflation projection for child education.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
            Inflation Modeled: 6.0% p.a.
          </span>
        </div>
      </div>

      {/* Insurance Protection Dual Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Life Insurance Shortfall Card (CRITICAL) */}
        <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Life Insurance Protection Gap</span>
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                High Priority
              </span>
            </div>

            <div className="mt-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500">Existing Cover:</span>
                <span className="text-sm font-bold text-slate-700">₹50.00 Lakh (HDFC Life)</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-xs text-slate-500">Recommended (10x Salary):</span>
                <span className="text-sm font-extrabold text-slate-900">₹1.50 Crore</span>
              </div>
              <div className="flex justify-between items-baseline mt-1.5 pt-1.5 border-t border-rose-200">
                <span className="text-xs font-bold text-rose-900">Coverage Shortfall:</span>
                <span className="text-base font-black text-rose-700">₹1.00 Crore Gap</span>
              </div>
            </div>

            {/* Coverage Ratio Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Coverage Ratio: 33%</span>
                <span className="text-rose-700 font-bold">Needs ₹1.00 Cr Top-Up</span>
              </div>
              <div className="w-full bg-rose-200 rounded-full h-2 overflow-hidden">
                <div className="bg-rose-600 h-full rounded-full w-[33%]" />
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-600 leading-relaxed">
              If something happens to Manoj, the existing ₹50L will be consumed by the ₹10.06L liabilities and leave only ~₹40L for Neha and Aarav.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-200/80 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Estimated Premium: ~₹950/mo</span>
            <button
              onClick={() => setShowTopUpPlan(true)}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              {showTopUpPlan ? "Quotes Loaded ✓" : "Close ₹1.0 Cr Gap"}
            </button>
          </div>
        </div>

        {/* 2. Health Insurance Adequacy Card */}
        <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Health Insurance (Adequate)</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Protected
              </span>
            </div>

            <div className="mt-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500">Plan Name:</span>
                <span className="text-xs font-bold text-slate-800">{ins.health.policyName}</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-xs text-slate-500">Sum Insured:</span>
                <span className="text-sm font-extrabold text-emerald-700">₹15.00 Lakh Floater</span>
              </div>
              <div className="flex justify-between items-baseline mt-1">
                <span className="text-xs text-slate-500">Members Covered:</span>
                <span className="text-xs font-semibold text-slate-700">Manoj, Neha & Aarav</span>
              </div>
            </div>

            {/* Coverage Ratio Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Coverage Adequacy</span>
                <span className="text-emerald-700 font-bold">100% (High Protection)</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-full" />
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-600 leading-relaxed">
              Includes <strong>150% Super No-Claim Bonus</strong> and <strong>Unlimited Auto-Restoration</strong>, protecting your savings from medical hospital bills.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200/80 flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
            <span>Nominee & Claims Registered</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Inflation-Adjusted Family Goals */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Family Financial Goals (Factoring 6.0% Inflation)</span>
          <span className="text-blue-600">Future Value Compounding</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((g) => (
            <div key={g.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900">{g.goalName}</h4>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                  Target: {g.targetYear} ({g.yearsToGoal} yrs)
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="text-[10px] text-slate-400 block uppercase">Cost in Today's Value</span>
                  <span className="font-extrabold text-slate-700">
                    ₹{g.currentCost ? (g.currentCost / 100000).toFixed(2) + " Lakh" : "₹92K / mo"}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                  <span className="text-[10px] text-blue-600 font-bold block uppercase">Future Inflated Cost (6% CPI)</span>
                  <span className="font-black text-blue-900">
                    {g.id === 'aarav-education' ? "₹44.26 Lakh" : "₹2.50 Crore"}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Required Monthly SIP: <strong>₹{g.monthlyRequiredSip ? g.monthlyRequiredSip.toLocaleString('en-IN') : g.monthlyRequiredInvestment.toLocaleString('en-IN')}/mo</strong></span>
                <span className="font-semibold text-emerald-700">{g.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
