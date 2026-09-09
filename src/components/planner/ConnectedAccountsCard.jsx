import React, { useState } from 'react';
import { Building2, CreditCard, PieChart, Landmark, RefreshCw, CheckCircle2, Shield } from 'lucide-react';

export default function ConnectedAccountsCard() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState("Just now");

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSynced("Just now");
    }, 1200);
  };

  const accounts = [
    {
      type: "Bank Account",
      name: "HDFC Salary Account (••8492)",
      value: "₹1,20,000",
      detail: "Primary Salary & Liquid Buffer",
      icon: Landmark,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      status: "Synced"
    },
    {
      type: "Credit Card",
      name: "ICICI Sapphiro Visa (••2104)",
      value: "₹1,80,000 used",
      detail: "Credit Limit: ₹3,00,000 (60% Utilized)",
      icon: CreditCard,
      color: "bg-amber-50 text-amber-600 border-amber-100",
      status: "Synced"
    },
    {
      type: "Investment Demat",
      name: "Sharekhan Wealth Demat & MF",
      value: "₹4,50,000",
      detail: "Equity & Mutual Fund SIPs (₹20,000/mo)",
      icon: PieChart,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      status: "Synced"
    },
    {
      type: "Loan Account",
      name: "HDFC Bank Personal Loan",
      value: "₹6,00,000",
      detail: "Monthly EMI: ₹18,000 • 36 Mos Remaining",
      icon: Building2,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      status: "Synced"
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Connected Accounts</h3>
            <p className="text-xs text-slate-500">
              Live automated data sync via RBI-Licensed Account Aggregator (AA)
            </p>
          </div>
        </div>

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>

      {/* Account Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
        {accounts.map((acc, idx) => {
          const IconComponent = acc.icon;
          return (
            <div
              key={idx}
              className="flex items-start justify-between p-3.5 bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-xl transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-lg border ${acc.color} shrink-0`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">{acc.type}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      <CheckCircle2 className="w-2.5 h-2.5" /> {acc.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">{acc.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{acc.detail}</p>
                </div>
              </div>

              <div className="text-right pl-2">
                <span className="text-sm font-extrabold text-slate-900 block">{acc.value}</span>
                <span className="text-[10px] text-slate-400">Synced {lastSynced}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security & Verification Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>256-bit bank-grade encryption • Read-only consent valid for 180 days</span>
        </div>
        <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
          + Link Another Account
        </span>
      </div>
    </div>
  );
}
