import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  CreditCard, 
  DollarSign, 
  ArrowRight, 
  Clock, 
  Zap, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Users, 
  FileText,
  BadgeAlert,
  Percent,
  Compass
} from 'lucide-react';

export default function AutonomousAiPrescriptionCard({ 
  metrics, 
  onOpenRM, 
  onNavigate,
  onScrollToSection 
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'dos' | 'donts' | 'urgent'
  const [acknowledgedItems, setAcknowledgedItems] = useState({});
  const [isExpandedView, setIsExpandedView] = useState(true);

  const toggleAcknowledge = (id) => {
    setAcknowledgedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const {
    monthlyIncome = 150000,
    monthlyExpenses = 92000,
    monthlySavings = 35000,
    monthlyInvestment = 20000,
    netWorth = 2774000,
    totalAssets = 3780000,
    totalLiabilities = 1006000,
    score = 78,
    projectedScore = 87,
    age = 34
  } = metrics || {};

  // 6 WHAT YOU MUST DO (Direct Actionable Prescriptions)
  const dosList = [
    {
      id: 'do-1',
      type: 'do',
      urgency: 'Immediate (Month 1-4)',
      title: 'Execute Debt Avalanche on 36% ICICI Credit Card First',
      summary: 'Allocate ₹30,000/mo of your ₹35,000 monthly cash savings to wipe out the ₹1.80 Lakh balance in 3.5 months.',
      why: 'This eliminates a 36% APR finance charge leak (₹5,400/mo), saving ₹32,400 in annual interest and reducing credit utilization from 60% to below 29%.',
      impact: '+4 Health Points • Saves ₹32,400',
      tag: 'Critical Debt Avalanche',
      category: 'Debt Health',
      actionText: 'Simulate Avalanche Payoff',
      actionTarget: 'debt-section'
    },
    {
      id: 'do-2',
      type: 'do',
      urgency: 'Month 4-13',
      title: 'Formalize & Repay Ramesh Sharma Hand Loan (₹1.50L)',
      summary: 'Establish a structured ₹15,000/month bank transfer to Ramesh Sharma starting in Month 4, clearing the entire loan in 10 months.',
      why: 'Zero-interest informal loans carry high relational exposure. Structuring regular payments secures personal trust and removes unrecorded liability risks.',
      impact: '+3 Health Points • Zero Relational Risk',
      tag: 'Informal Debt Clearance',
      category: 'Liability Health',
      actionText: 'View Repayment Schedule',
      actionTarget: 'debt-section'
    },
    {
      id: 'do-3',
      type: 'do',
      urgency: 'Month 1 (Immediate)',
      title: 'Bridge ₹1.00 Crore Term Life Insurance Shortfall',
      summary: 'Purchase a ₹1.00 Cr pure term policy (tenure 30 years till age 64) to raise total cover to ₹1.50 Cr (10x annual income of ₹18L).',
      why: 'Your current ₹50L policy leaves a dangerous ₹1.00 Cr protection gap for your verified nominee Neha Pal and child Aarav. Pure term cost is only ~₹1,250/mo.',
      impact: '+5 Health Points • Shields Family',
      tag: 'Family Protection Shield',
      category: 'Protection',
      actionText: 'Consult Private Wealth RM',
      actionRM: true
    },
    {
      id: 'do-4',
      type: 'do',
      urgency: 'Before March 31',
      title: 'Harvest ₹93,000 Unrealized LTCG at 0% Tax',
      summary: 'Sell and immediately repurchase eligible long-term equity mutual funds or bluechips with ₹93,000 in gains under Section 112A.',
      why: 'Indian tax law grants up to ₹1,25,000 in annual equity gains completely tax-free. Resetting the acquisition cost saves ₹11,625 in future taxes with ₹0 tax liability today.',
      impact: '+2 Health Points • Saves ₹11,625 Tax',
      tag: 'Section 112A Tax Window',
      category: 'Tax Efficiency',
      actionText: 'Open Tax Optimizer',
      actionTarget: 'tax-section'
    },
    {
      id: 'do-5',
      type: 'do',
      urgency: 'Next 6 Months',
      title: 'Build 3.2-Month Liquid Emergency Reserve (₹3.00 Lakh)',
      summary: 'Channel ₹30,000/mo into an instant-redemption Liquid Mutual Fund (yielding ~6.8–7.1%) until liquid cash grows from ₹1.20L to ₹3.00L.',
      why: 'Current ₹1.20L cash covers only 1.3 months of living costs (₹92k/mo). A ₹3.00L liquid buffer prevents forced equity selling during sudden job or health shocks.',
      impact: '+5 Health Points • Crisis Immunity',
      tag: 'Liquidity Anchor',
      category: 'Emergency Cushion',
      actionText: 'Review Reserve Glidepath',
      actionTarget: 'rebalance-section'
    },
    {
      id: 'do-6',
      type: 'do',
      urgency: 'Annual Filing',
      title: 'Maximize Remaining ₹2,600 Section 80D via Health Checkup',
      summary: 'Claim ₹2,600 under Section 80D by booking preventive health checkups for yourself and spouse Neha.',
      why: 'Your Care Supreme policy utilizes ₹22,400 of the ₹25,000 limit. The unused ₹2,600 can be claimed under preventive checkup rules to save ₹811 in net income tax.',
      impact: '+1 Health Point • Full 80D Utilization',
      tag: 'Preventive Health Deduction',
      category: 'Tax Efficiency',
      actionText: 'Review 80D Details',
      actionTarget: 'tax-section'
    }
  ];

  // 6 WHAT YOU MUST NOT DO (Critical Pitfalls & Prohibitions)
  const dontsList = [
    {
      id: 'dont-1',
      type: 'dont',
      severity: 'High Threat',
      title: 'DO NOT Pay Only the "Minimum Amount Due" on ICICI Credit Card',
      summary: 'Never opt for the 5% minimum payment on your ₹1.80L credit card balance.',
      why: 'Revolving balances compound at 36.0% APR (3.0% per month = ~₹5,400/mo in pure interest bleed). Furthermore, high revolving debt drags your CIBIL score down by 12 points.',
      impact: 'Avoids ₹5,400/mo interest bleed & CIBIL score hit',
      tag: 'Critical Debt Trap',
      category: 'Debt Health',
      rule: 'Pay the full statement balance every single billing cycle.'
    },
    {
      id: 'dont-2',
      type: 'dont',
      severity: 'High Threat',
      title: 'DO NOT Stop or Liquidate Active ₹20,000/mo Mutual Fund SIPs',
      summary: 'Do not redeem Parag Parikh or Mirae Asset units to settle loans or pay off cards.',
      why: 'Liquidating equities breaks 14.8% compounding, triggers exit loads, and incurs short-term capital gains tax. Your ₹35,000/mo net savings is already enough to clear credit cards in 3.5 months!',
      impact: 'Preserves ₹18.5L in 15-yr compounding growth',
      tag: 'Compounding Integrity',
      category: 'Investments',
      rule: 'Service all debt payoffs strictly from monthly cash flow, not portfolio liquidation.'
    },
    {
      id: 'dont-3',
      type: 'dont',
      severity: 'Severe Pitfall',
      title: 'DO NOT Buy ULIPs, Traditional Endowment, or Guaranteed Return Policies',
      summary: 'Refuse any insurance policy bundled with investment returns or savings guarantees.',
      why: 'ULIPs and endowment plans carry heavy front-loaded agent commissions (6–9%) and historically deliver sub-inflation yields (5–6%). Their death benefit rarely meets the required 10x income standard.',
      impact: 'Protects child education fund from 6% inflation drag',
      tag: 'Toxic Financial Product',
      category: 'Protection',
      rule: 'Keep insurance and investments completely segregated. Buy pure term cover only.'
    },
    {
      id: 'dont-4',
      type: 'dont',
      severity: 'Moderate Risk',
      title: 'DO NOT Increase Direct Stock Exposure Beyond 50% of Assets',
      summary: 'Avoid adding fresh capital into single stocks or engaging in speculative F&O/intraday trades.',
      why: 'Your portfolio is already 77.5% in equity (Direct Equity 43.7% + Mutual Funds 33.9%). At age 34 with a 6-year-old child, further direct stock concentration introduces unacceptable downside volatility.',
      impact: 'Maintains disciplined risk glidepath (100 - Age = 66% benchmark)',
      tag: 'Portfolio Concentration Risk',
      category: 'Asset Allocation',
      rule: 'Direct incremental surplus into liquid debt and balanced assets to lower portfolio beta.'
    },
    {
      id: 'dont-5',
      type: 'dont',
      severity: 'Relational Risk',
      title: 'DO NOT Keep the ₹1.50L Ramesh Sharma Hand Loan Informal & Unwritten',
      summary: 'Do not delay having an open, scheduled discussion regarding your friend hand loan.',
      why: 'Handshake loans with zero payment timeline cause silent stress and create severe awkwardness if the lender unexpectedly demands the full capital during an emergency.',
      impact: 'Eliminates family/friend disputes & emotional liability',
      tag: 'Social & Financial Integrity',
      category: 'Liability Health',
      rule: 'Formalize payment dates via UPI/bank transfers with an explicit 10-month schedule.'
    },
    {
      id: 'dont-6',
      type: 'dont',
      severity: 'Cash Drag',
      title: 'DO NOT Park Emergency Buffer in a Standard 3.0% Savings Account',
      summary: 'Do not let liquid savings sit idle in your regular salary account.',
      why: 'Standard bank savings accounts yield ~3.0% post-tax, which actively loses purchasing power against 6.0% CPI inflation. Liquid funds provide 6.8–7.1% yield with instant T+0 access.',
      impact: 'Prevents ~3.0% annual real loss to CPI inflation',
      tag: 'Inflation Drag',
      category: 'Liquidity',
      rule: 'Use automated sweep-in fixed deposits or top-tier liquid mutual funds.'
    }
  ];

  // Filtering
  const filteredDos = (activeFilter === 'donts') ? [] : (activeFilter === 'urgent' ? dosList.slice(0, 3) : dosList);
  const filteredDonts = (activeFilter === 'dos') ? [] : (activeFilter === 'urgent' ? dontsList.slice(0, 2) : dontsList);

  const handleActionClick = (item) => {
    if (item.actionRM && onOpenRM) {
      onOpenRM();
      return;
    }
    if (item.actionTarget) {
      if (onScrollToSection) {
        onScrollToSection(item.actionTarget);
      } else {
        const el = document.getElementById(item.actionTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (onNavigate) {
          onNavigate('plan');
        }
      }
    }
  };

  const totalDirectives = dosList.length + dontsList.length;
  const acknowledgedCount = Object.values(acknowledgedItems).filter(Boolean).length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-300">
      {/* Top AI Autonomous Diagnosis Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                  Autonomous AI Prescription Engine
                </h2>
                <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Telemetry Auto-Analyzed
                </span>
                <span className="text-[10px] font-bold bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-full border border-white/10">
                  Manoj Pal (Age {age}) • Score {score}/100 ➔ {projectedScore} Target
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                The AI has continuously audited your complete balance sheet (<strong>₹37.80L Assets</strong> vs. <strong>₹10.06L Liabilities</strong>). 
                Below are your direct prescriptions: <strong className="text-emerald-300">what you must do</strong> and <strong className="text-rose-300">what you must strictly avoid</strong> — no chat query needed.
              </p>
            </div>
          </div>

          {/* Quick Metrics Badge & Toggle */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-white/15 text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
                Directives Status
              </span>
              <span className="text-xs font-extrabold text-white">
                {acknowledgedCount} of {totalDirectives} Acknowledged
              </span>
            </div>

            <button
              onClick={() => setIsExpandedView(!isExpandedView)}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all"
              title={isExpandedView ? "Collapse Details" : "Expand Details"}
            >
              {isExpandedView ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? "bg-white text-slate-900 shadow"
                  : "bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>All Directives ({totalDirectives})</span>
            </button>

            <button
              onClick={() => setActiveFilter('dos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'dos'
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 border border-emerald-500/20"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>What You MUST DO ({dosList.length})</span>
            </button>

            <button
              onClick={() => setActiveFilter('donts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'donts'
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                  : "bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 border border-rose-500/20"
              }`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>What You MUST NOT DO ({dontsList.length})</span>
            </button>

            <button
              onClick={() => setActiveFilter('urgent')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'urgent'
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-amber-950/40 text-amber-300 hover:bg-amber-900/50 border border-amber-500/20"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Immediate 30-Day Critical</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> 6 Strategic Actions
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> 6 Critical Pitfalls
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      {isExpandedView && (
        <div className="p-5 sm:p-6 bg-slate-50/60 space-y-6">
          {/* Dual Column Layout: Left = Strategic DO's, Right = Strict DONT's */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* COLUMN 1: WHAT YOU MUST DO (GREEN) */}
            {(activeFilter === 'all' || activeFilter === 'dos' || activeFilter === 'urgent') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                      What You SHOULD DO (Strategic Actions)
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {filteredDos.length} Directives
                  </span>
                </div>

                <div className="space-y-3.5">
                  {filteredDos.map((item, idx) => {
                    const isDone = acknowledgedItems[item.id];
                    return (
                      <div 
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all duration-200 ${
                          isDone 
                            ? "bg-emerald-50/40 border-emerald-200 opacity-90"
                            : "bg-white border-slate-200/90 shadow-2xs hover:border-emerald-300 hover:shadow-sm"
                        }`}
                      >
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                  {item.urgency}
                                </span>
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                  {item.category}
                                </span>
                              </div>
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 leading-snug">
                                {item.title}
                              </h4>
                            </div>
                          </div>

                          {/* Acknowledge Button */}
                          <button
                            onClick={() => toggleAcknowledge(item.id)}
                            className={`p-1.5 rounded-xl border transition-all shrink-0 ${
                              isDone
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "bg-slate-50 text-slate-400 hover:text-emerald-700 border-slate-200 hover:border-emerald-300"
                            }`}
                            title={isDone ? "Marked as Acknowledged" : "Click to Acknowledge"}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Prescription Details */}
                        <p className="text-xs text-slate-700 mt-2 font-medium leading-relaxed">
                          {item.summary}
                        </p>

                        {/* Financial Rationale Box */}
                        <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/80 text-[11px] text-emerald-900 leading-normal">
                          <strong className="font-bold text-emerald-950">AI Reasoning:</strong> {item.why}
                        </div>

                        {/* Card Footer: Impact + Action Button */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-extrabold text-emerald-700 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            {item.impact}
                          </span>

                          <button
                            onClick={() => handleActionClick(item)}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline cursor-pointer group"
                          >
                            <span>{item.actionText}</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* COLUMN 2: WHAT YOU MUST NOT DO (RED) */}
            {(activeFilter === 'all' || activeFilter === 'donts' || activeFilter === 'urgent') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                      <XCircle className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                      What You MUST NOT DO (Strict Pitfalls)
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    {filteredDonts.length} Warnings
                  </span>
                </div>

                <div className="space-y-3.5">
                  {filteredDonts.map((item, idx) => {
                    const isDone = acknowledgedItems[item.id];
                    return (
                      <div 
                        key={item.id}
                        className={`p-4 rounded-2xl border transition-all duration-200 ${
                          isDone 
                            ? "bg-rose-50/40 border-rose-200 opacity-90"
                            : "bg-white border-slate-200/90 shadow-2xs hover:border-rose-300 hover:shadow-sm"
                        }`}
                      >
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                  {item.severity}
                                </span>
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                  {item.category}
                                </span>
                              </div>
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 leading-snug">
                                {item.title}
                              </h4>
                            </div>
                          </div>

                          {/* Acknowledge Button */}
                          <button
                            onClick={() => toggleAcknowledge(item.id)}
                            className={`p-1.5 rounded-xl border transition-all shrink-0 ${
                              isDone
                                ? "bg-rose-600 text-white border-rose-600"
                                : "bg-slate-50 text-slate-400 hover:text-rose-700 border-slate-200 hover:border-rose-300"
                            }`}
                            title={isDone ? "Acknowledged Rule" : "Click to Acknowledge"}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Prescription Warning */}
                        <p className="text-xs text-slate-700 mt-2 font-medium leading-relaxed">
                          {item.summary}
                        </p>

                        {/* Financial Danger Box */}
                        <div className="mt-2.5 p-2.5 rounded-xl bg-rose-50/60 border border-rose-100/80 text-[11px] text-rose-900 leading-normal">
                          <strong className="font-bold text-rose-950">Downside Risk:</strong> {item.why}
                        </div>

                        {/* Card Footer: Safeguard Rule */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-extrabold text-rose-700 flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            {item.impact}
                          </span>

                          <div className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            Rule: {item.rule}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Execution Bar */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-blue-900 font-semibold text-center sm:text-left">
              <Compass className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                Following these 12 directives lifts your score from <strong>78</strong> to <strong>87</strong> and recovers an estimated <strong>₹74,000+</strong> in debt interest & taxes.
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate && onNavigate('plan')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 hover:scale-[1.02]"
              >
                <span>Full 90-Day Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onOpenRM && onOpenRM()}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-amber-600" />
                <span>Validate with RM Vikram</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
