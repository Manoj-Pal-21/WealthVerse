import React, { useState } from 'react';
import { 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Snowflake, 
  TrendingDown, 
  ShieldAlert,
  Coins,
  Building2,
  Users
} from 'lucide-react';
import { DEEP_WEALTH_DATA } from '../../data/wealthDeepData';

export default function DebtRepaymentPlannerCard({ metrics }) {
  const [strategy, setStrategy] = useState('avalanche'); // 'avalanche' or 'snowball'
  const liabilities = DEEP_WEALTH_DATA.liabilities;
  const totalDebt = metrics?.totalLiabilities || 1006000;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Debt Elimination & Repayment Strategy
              </h3>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Total Debt: ₹{(totalDebt / 100000).toFixed(2)} Lakh
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Includes institutional loans, revolving credit card debt, and <strong>Third-Party Personal Hand Loan</strong>.
            </p>
          </div>
        </div>

        {/* Strategy Switcher Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setStrategy('avalanche')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              strategy === 'avalanche'
                ? "bg-white text-rose-700 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>Debt Avalanche (Save Max ₹)</span>
          </button>

          <button
            onClick={() => setStrategy('snowball')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              strategy === 'snowball'
                ? "bg-white text-blue-700 shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Snowflake className="w-3.5 h-3.5 text-blue-600" />
            <span>Debt Snowball (Quick Wins)</span>
          </button>
        </div>
      </div>

      {/* Strategy Impact Banner */}
      <div className={`mt-5 p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        strategy === 'avalanche'
          ? "bg-rose-50/70 border-rose-200 text-rose-950"
          : "bg-blue-50/70 border-blue-200 text-blue-950"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white ${
            strategy === 'avalanche' ? "bg-rose-600" : "bg-blue-600"
          }`}>
            {strategy === 'avalanche' ? <Flame className="w-4 h-4" /> : <Snowflake className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wide">
              {strategy === 'avalanche' ? "Highest Interest Priority (Recommended)" : "Smallest Balance Priority (Psychological Wins)"}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              {strategy === 'avalanche' 
                ? "Attacks 36% APR credit card first. Saves ₹58,400 in total interest and eliminates debt in 18 months."
                : "Clears ₹76K consumer loan, then ₹1.5L Third-Party loan for relationship goodwill and mental relief."
              }
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Interest Saved</span>
          <span className="text-sm font-extrabold text-emerald-600">
            {strategy === 'avalanche' ? "₹58,400 Saved" : "₹38,200 Saved"}
          </span>
        </div>
      </div>

      {/* Liabilities Breakdown List */}
      <div className="mt-6 space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Debt Payoff Queue (Ranked by {strategy === 'avalanche' ? "Interest Rate" : "Balance Size"})
        </div>

        {liabilities.map((loan, idx) => {
          const isThirdParty = loan.id === 'third-party-loan';
          const isCreditCard = loan.id === 'icici-cc';

          return (
            <div 
              key={loan.id}
              className={`p-4 rounded-2xl border transition-all ${
                isCreditCard 
                  ? "bg-rose-50/30 border-rose-200" 
                  : isThirdParty 
                  ? "bg-amber-50/30 border-amber-200"
                  : "bg-slate-50/60 border-slate-200/80"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    idx === 0 
                      ? "bg-rose-600 text-white" 
                      : "bg-slate-200 text-slate-700"
                  }`}>
                    #{idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {loan.name}
                      </h4>
                      {isThirdParty && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Hand Loan
                        </span>
                      )}
                      {isCreditCard && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">
                          36% Finance Drag
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Lender: <strong>{loan.lender}</strong> • Type: {loan.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Interest Rate</span>
                    <span className={`text-xs font-bold ${isCreditCard ? "text-rose-600" : "text-slate-800"}`}>
                      {loan.interestRate}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">Outstanding</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      ₹{loan.outstandingAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Third-Party Loan Guidance Callout */}
      <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
        <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Third-Party Hand Loan Protocol (₹1,50,000):</span> While this loan carries 0% interest with family friend Ramesh Sharma, clearing or setting a predictable monthly installment of ₹15,000 ensures mutual trust and zero social awkwardness before large investment scaling.
        </div>
      </div>
    </div>
  );
}
