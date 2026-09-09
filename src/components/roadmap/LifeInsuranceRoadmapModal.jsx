import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Wallet, 
  Clock, 
  Zap, 
  Building, 
  Sparkles, 
  AlertTriangle, 
  Layers,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { formatINR } from '../../utils/formatters';

export default function LifeInsuranceRoadmapModal({ isOpen, onClose, onAskAI }) {
  const [completedDays, setCompletedDays] = useState([false, false, false, false]);

  const toggleDay = (index) => {
    const next = [...completedDays];
    next[index] = !next[index];
    setCompletedDays(next);
  };

  const planSteps = [
    {
      day: "Day 1",
      title: "Plan Selection & Quote Comparison",
      desc: "Compare 20-30 year pure term life plans with ₹75L - ₹1Cr sum assured from top claim settlement insurers (HDFC Life, ICICI Pru, Tata AIA).",
      status: completedDays[0] ? "Completed" : "Action Required",
      badge: "30 Min Task"
    },
    {
      day: "Day 2",
      title: "Confirm Premium & Digital KYC Submission",
      desc: "Lock in ₹1,200/mo premium (~₹14,400/yr). Submit digital KYC: PAN, Aadhaar, and 3 months salary slips / ITR acknowledgment.",
      status: completedDays[1] ? "Completed" : "Pending",
      badge: "₹1,200/mo"
    },
    {
      day: "Day 3–4",
      title: "Medical Consultation / Tele-Underwriting",
      desc: "Complete swift tele-MER (Medical Examiner Report) or home nurse visit for blood profile and vitals check.",
      status: completedDays[2] ? "Completed" : "Pending",
      badge: "In-home / Tele"
    },
    {
      day: "Day 5–7",
      title: "Policy Issuance & eIA Nominee Registration",
      desc: "Policy document issued. Set up recurring e-NACH auto-debit and link policy to your e-Insurance Account (eIA) with primary nominee.",
      status: completedDays[3] ? "Completed" : "Pending",
      badge: "100% Protected"
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🚀 Your #1 Priority Fix: Life Insurance Gap (₹75L)"
      subtitle="Visual balance sheet diagnostic & 7-day family protection roadmap"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6 text-slate-800">
        
        {/* 1. Visual Financial Snapshot Comparison */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Real Verified Balance Sheet
            </span>
            <Badge variant="danger" size="sm">
              ₹75L Exposure Shock
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Total Assets</span>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">₹37.82 Lakh</div>
              <span className="text-[10px] text-slate-400">Investments & Liquid</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Liabilities</span>
              <div className="text-base font-extrabold text-rose-600 mt-0.5">₹8.56 Lakh</div>
              <span className="text-[10px] text-slate-400">Home Loan Outstanding</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Net Worth</span>
              <div className="text-base font-extrabold text-brand-700 mt-0.5">₹29.26 Lakh</div>
              <span className="text-[10px] text-slate-400">Assets minus Liabilities</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
              <span className="text-[10px] text-rose-700 font-bold uppercase">Life Insurance Gap</span>
              <div className="text-base font-black text-rose-700 mt-0.5">₹75.00 Lakh ⚠️</div>
              <span className="text-[10px] text-rose-600 font-medium">Uncovered family shock</span>
            </div>
          </div>
        </div>

        {/* 2. Visual Reality Check Callout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold tracking-tight">Reality Check: Family Income Shock</h4>
              <p className="text-xs text-rose-100 mt-1 leading-relaxed max-w-xl">
                Your ₹29.26L net worth is tied up in long-term equity and liquid reserves. If an unforeseen event occurs, your family faces an immediate <strong>₹75 Lakh deficit</strong> to clear liabilities and fund 15+ years of living expenses.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl text-center shrink-0 border border-white/20">
            <div className="text-[10px] font-bold text-rose-200 uppercase">Health Score Impact</div>
            <div className="text-lg font-black text-white">+18 Pts</div>
            <div className="text-[10px] text-rose-100">72 ➔ 90 / 100</div>
          </div>
        </div>

        {/* 3. Why Fix This First? 4-Card Grid */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Why Is This Your #1 Priority Fix?
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-sm font-bold">
                🏠
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Immediate Family Survival</h5>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  Eliminates household income loss and liquidates ₹8.56L liabilities instantly without touching equity.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 text-sm font-bold">
                💸
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Extremely High Leverage</h5>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  Cost is only ~₹1,200/month — <strong>less than 3.7%</strong> of your monthly ₹32,000 investment savings.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 text-sm font-bold">
                ⚡
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Fast Digital Turnaround</h5>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  Underwritten in 3–5 working days with paperless digital KYC. Zero complex legal hurdles.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 text-sm font-bold">
                🧱
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Foundation for All Wealth</h5>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  Without insurance protection, any future wealth (SIPs, Retirement ₹2 Cr, Villa) is vulnerable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Interactive 7-Day Step-by-Step Action Roadmap */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-600" />
              7-Day Execution Timeline (Click to complete)
            </h4>
            <span className="text-[11px] text-slate-400">
              {completedDays.filter(Boolean).length} of {planSteps.length} Steps Done
            </span>
          </div>

          <div className="space-y-2.5">
            {planSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => toggleDay(idx)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  completedDays[idx]
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    completedDays[idx] ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {completedDays[idx] ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {step.day}: {step.title}
                      </span>
                      <Badge variant={completedDays[idx] ? 'good' : 'neutral'} size="sm">
                        {step.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    completedDays[idx] ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {completedDays[idx] ? 'Done ✓' : 'Start'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Estimated Monthly Premium: <strong className="text-slate-900">~₹1,200/mo</strong> (Tax deductible u/s 80C)
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => {
                onClose();
                if (onAskAI) onAskAI("Which 20-year term plan is best for a ₹75L cover?");
              }}
              icon={Sparkles}
            >
              Ask AI to Compare Plans
            </Button>
          </div>
        </div>

      </div>
    </Modal>
  );
}
