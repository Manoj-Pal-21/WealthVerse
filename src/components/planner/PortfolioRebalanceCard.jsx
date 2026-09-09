import React, { useState } from 'react';
import { 
  Scale, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2,
  PieChart,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export default function PortfolioRebalanceCard({ metrics, onOpenRM }) {
  const [rebalanceExecuted, setRebalanceExecuted] = useState(false);

  const age = metrics?.age || 34;
  const recommendedEquity = Math.max(100 - age, 50); // 66%
  const actualEquity = metrics?.ageFactor?.actualEquityPct || 77.5;
  const drift = (actualEquity - recommendedEquity).toFixed(1);

  const modelPortfolio = [
    { asset: "Equities (Stocks + MF)", current: actualEquity, target: recommendedEquity, drift: `+${drift}%`, color: "bg-blue-600", status: "Overweight (Growth Stage)" },
    { asset: "Fixed Income & FDs", current: 10.8, target: 18.0, drift: "-7.2%", color: "bg-purple-600", status: "Underweight" },
    { asset: "Gold (Digital/SGB)", current: 8.5, target: 8.0, drift: "+0.5%", color: "bg-amber-500", status: "Optimal Corridor" },
    { asset: "Liquid Cash Buffer", current: 3.1, target: 8.0, drift: "-4.9%", color: "bg-emerald-500", status: "Underweight (1.3 mo)" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Age Factor & Portfolio Rebalancing Engine
              </h3>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                Age {age} Benchmark
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Lifecycle allocation based on the <em>100 - Age rule</em> ({recommendedEquity}% Equity / {100 - recommendedEquity}% Debt & Cash).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
            Retirement Horizon: 26 Years
          </span>
        </div>
      </div>

      {/* Age Factor Insight Strip */}
      <div className="mt-5 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Compass className="w-5 h-5 text-indigo-600 shrink-0" />
          <div className="text-xs text-slate-700">
            <span className="font-bold text-indigo-950">Lifecycle Analysis:</span> At Age 34, Manoj is in his <strong>Peak Wealth Accumulation Phase</strong>.
            Your current equity exposure is <strong>{actualEquity}%</strong> vs the conservative benchmark of <strong>{recommendedEquity}%</strong> (Drift: <span className="font-bold text-blue-700">+{drift}%</span>).
          </div>
        </div>

        <span className="text-[11px] font-bold text-indigo-800 bg-indigo-100/80 px-2.5 py-1 rounded-lg shrink-0">
          Aggressive Growth Mode
        </span>
      </div>

      {/* Allocation Comparison Table */}
      <div className="mt-6 space-y-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Actual Allocation vs Target Model
        </div>

        <div className="space-y-3">
          {modelPortfolio.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-800">{item.asset}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500">Current: <strong className="text-slate-900">{item.current}%</strong></span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-500">Target: <strong className="text-indigo-700">{item.target}%</strong></span>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                    item.drift.startsWith('+') ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.drift}
                  </span>
                </div>
              </div>

              {/* Progress Comparison */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                <div 
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.current}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax-Efficient Rebalancing Advice */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Tax-Efficient Rebalance Strategy</span>
          </div>
          <p className="text-xs text-slate-200 mt-1.5 max-w-xl leading-relaxed">
            <strong>Do not sell existing equity holdings</strong> to rebalance (avoids paying capital gains tax).
            Instead, channel your monthly surplus of <strong>₹30,000/mo</strong> toward liquid cash (₹3.0L target) and debt reduction over the next 6 months to automatically glide back to the target corridor.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => setRebalanceExecuted(true)}
            disabled={rebalanceExecuted}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              rebalanceExecuted
                ? "bg-emerald-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
            }`}
          >
            {rebalanceExecuted ? "Rebalance Route Active ✓" : "Activate Glidepath Strategy"}
          </button>
        </div>
      </div>
    </div>
  );
}
