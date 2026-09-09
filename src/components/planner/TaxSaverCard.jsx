import React, { useState } from 'react';
import { 
  ReceiptText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Percent, 
  Coins, 
  AlertCircle,
  HelpCircle,
  DownloadCloud
} from 'lucide-react';

export default function TaxSaverCard({ metrics, onOpenRM }) {
  const [activeRegime, setActiveRegime] = useState('old'); // old vs new regime comparison
  const [harvestConfirmed, setHarvestConfirmed] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold">
            <ReceiptText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Tax Optimization & Capital Gains Engine
              </h3>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                FY 2025-26
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Maximize deductions under 80C, 80D, Section 24(b), and harvest ₹1.25L tax-free LTCG.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
            Total Tax Saved: ₹46,800
          </span>
        </div>
      </div>

      {/* 3 Core Tax Optimization Pillars */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Section 80C Card */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">Section 80C Deductions</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                100% Utilized
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900">₹1,50,000</span>
              <span className="text-xs text-slate-400">/ ₹1,50,000 limit</span>
            </div>

            {/* Progress bar */}
            <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-full" />
            </div>

            <div className="mt-3 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>• EPF Statutory Deduction:</span>
                <span className="font-bold">₹96,000</span>
              </div>
              <div className="flex justify-between">
                <span>• Parag Parikh ELSS:</span>
                <span className="font-bold">₹35,500</span>
              </div>
              <div className="flex justify-between">
                <span>• Term Insurance Premium:</span>
                <span className="font-bold">₹18,500</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal 80C allocation achieved.</span>
          </div>
        </div>

        {/* 2. Section 80D Health Card */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-900">Section 80D Health Cover</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                ₹2,600 Buffer Left
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900">₹22,400</span>
              <span className="text-xs text-slate-400">/ ₹25,000 limit</span>
            </div>

            {/* Progress bar */}
            <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full w-[90%]" />
            </div>

            <div className="mt-3 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex justify-between">
                <span>• Care Supreme Family Floater:</span>
                <span className="font-bold">₹22,400</span>
              </div>
              <div className="flex justify-between text-blue-700">
                <span>• Preventive Health Checkup:</span>
                <span className="font-bold">₹2,600 Eligible</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[11px] text-blue-700 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Claim ₹2,600 for preventive health checkup.</span>
          </div>
        </div>

        {/* 3. LTCG Harvesting Card */}
        <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-900">LTCG Tax Harvesting</span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded">
                ₹1.25L Exemption
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-black text-amber-900">₹93,000</span>
              <span className="text-xs text-amber-700">Eligible to Harvest</span>
            </div>

            <div className="mt-2 w-full bg-amber-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-600 h-full rounded-full w-[74%]" />
            </div>

            <p className="mt-3 text-[11px] text-amber-900 leading-relaxed font-medium">
              You have <strong>₹93,000</strong> in unrealized long-term capital gains in Reliance & TCS. Sell and instantly rebuy before March 31 to reset cost base with <strong>₹0 tax</strong>.
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-amber-200 flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800">
              Saves ₹11,625 Tax
            </span>
            <button
              onClick={() => setHarvestConfirmed(true)}
              disabled={harvestConfirmed}
              className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg transition-all ${
                harvestConfirmed
                  ? "bg-emerald-600 text-white"
                  : "bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
              }`}
            >
              {harvestConfirmed ? "Harvest Scheduled ✓" : "Execute 1-Click Harvest"}
            </button>
          </div>
        </div>
      </div>

      {/* Tax Strategy Summary Banner */}
      <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-blue-300">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Tax Regime Recommendation for Manoj Pal
            </h4>
            <p className="text-xs text-slate-200 mt-0.5">
              With ₹1.5L (80C) + ₹25K (80D) + HDFC loan deduction, the <strong>Old Tax Regime saves ₹14,200 more</strong> than the New Regime for your ₹18L gross salary.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenRM}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>Consult Private Wealth Desk</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
