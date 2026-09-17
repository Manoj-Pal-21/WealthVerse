import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Target,
  Users,
  HeartHandshake,
  Headset,
  TrendingUp,
  HeartPulse,
  ChevronRight,
  CheckCircle2,
  PieChart,
  Wallet,
  Coins,
  FileText
} from 'lucide-react';
import ScoreGauge from '../components/planner/ScoreGauge';

export default function WelcomeScreen({ 
  onNavigate, 
  onStartDemo, 
  onOpenRM,
  hasCompletedJourney = false 
}) {
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // The 4 Pillars of Wealth360
  const pillars = [
    {
      num: "01",
      code: "KNOW",
      title: "Understand your complete financial life.",
      description: "Get total clarity across income, living expenses, assets, liabilities, and true net worth.",
      items: ["Net Worth Tracking", "Cashflow Analysis", "Debt-to-Income", "Emergency Coverage"],
      color: "border-blue-200 hover:border-blue-400 bg-blue-50/40"
    },
    {
      num: "02",
      code: "GROW",
      title: "Build and optimise your wealth.",
      description: "Optimize direct equity, mutual funds, gold, fixed deposits, and dynamic portfolio rebalancing.",
      items: ["Equity Portfolio", "Mutual Fund Overlap", "Asset Allocation", "Tax Harvesting"],
      color: "border-amber-200 hover:border-amber-400 bg-amber-50/40"
    },
    {
      num: "03",
      code: "PROTECT",
      title: "Protect yourself and your family.",
      description: "Guard against unforeseen life events, medical emergencies, high-cost debt, and market drops.",
      items: ["Term Insurance Gap", "Health Floater", "Credit Card APR Drag", "Emergency Reserve"],
      color: "border-emerald-200 hover:border-emerald-400 bg-emerald-50/40"
    },
    {
      num: "04",
      code: "TRANSFER",
      title: "Plan what happens to your wealth next.",
      description: "Seamlessly prepare family wealth continuity, digital vault documents, wills, and nominees.",
      items: ["Nomination Audit", "Digital Will", "Family Wealth Vault", "Estate Continuity"],
      color: "border-purple-200 hover:border-purple-400 bg-purple-50/40"
    }
  ];

  // The 15 Feature Tags from Wealth360
  const featureTags = [
    { name: "Net Worth", pillar: "KNOW", desc: "Live unified computation across all your assets minus liabilities." },
    { name: "Wealth Health", pillar: "KNOW", desc: "Institutional 0–100 calibrated score with 5-pillar breakdown." },
    { name: "Portfolio Analysis", pillar: "GROW", desc: "Detailed breakdown of large, mid, and small cap holding distribution." },
    { name: "Goal Planning", pillar: "GROW", desc: "Mathematical milestone tracking for emergency fund, home, and retirement." },
    { name: "Tax Opportunities", pillar: "GROW", desc: "Tax harvesting and capital gains optimization across equity and debt." },
    { name: "Insurance", pillar: "PROTECT", desc: "Human Life Value (HLV) calculation against family debt obligations." },
    { name: "Debt Planning", pillar: "PROTECT", desc: "Repayment prioritization to eliminate 36% APR credit card traps." },
    { name: "Inflation Impact", pillar: "GROW", desc: "Purchasing power protection modeling real 7% inflation drag." },
    { name: "Portfolio Rebalancing", pillar: "GROW", desc: "Dynamic drift alerts returning your allocation to target weightings." },
    { name: "Nomination", pillar: "TRANSFER", desc: "Cross-asset nominee audit to prevent frozen accounts and legal delay." },
    { name: "Will", pillar: "TRANSFER", desc: "Digital estate framework ensuring your assets pass smoothly to heirs." },
    { name: "Family Wealth Vault", pillar: "TRANSFER", desc: "Encrypted, confidential document repository for policy and folio numbers." },
    { name: "AI Wealth Coach", pillar: "KNOW", desc: "Context-injected Sharekhan Qwen-3-4B-Instruct LLM advisory copilot." },
    { name: "Wealth Map", pillar: "KNOW", desc: "Holistic radar view connecting assets, debts, and life milestones." },
    { name: "Life Impact Simulator", pillar: "PROTECT", desc: "Stress-testing your finances against job disruption or emergency expenses." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ========================================================= */}
        {/* 1. HERO SECTION (1:1 with wealth-360.vercel.app/wealth360) */}
        {/* ========================================================= */}
        <section className="gradient-navy text-navy-foreground shadow-raised relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16 border border-slate-800">
          {/* Subtle background ambient elements */}
          <div className="absolute -right-16 -top-16 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl">
            <span className="bg-white/10 text-amber-300 border border-white/15 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="size-3.5 text-amber-400" />
              <span>m.Stock Wealth360</span>
            </span>

            <h1 className="font-display mt-6 text-3xl sm:text-5xl lg:text-6xl leading-tight font-extrabold tracking-tight">
              Your wealth is more than your portfolio.
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
              Understand what you own, what you owe, what you're building and what you're leaving behind — all in one intelligent wealth journey.
            </p>

            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-300/80 font-medium">
              One intelligent view to help you grow, protect and transfer your wealth.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => onNavigate(hasCompletedJourney ? 'dashboard' : 'journey')}
                className="inline-flex items-center justify-center gap-2 font-bold cursor-pointer transition-all shadow-lg shadow-amber-500/20 h-11 rounded-xl px-7 bg-gold text-gold-foreground hover:bg-gold/90 hover:scale-[1.02] active:scale-[0.98] text-sm"
              >
                <span>{hasCompletedJourney ? "Open my Wealth360" : "Get Started"}</span>
                <ArrowRight className="size-4" />
              </button>

              <button
                onClick={onOpenRM}
                className="inline-flex items-center justify-center gap-2 font-bold cursor-pointer transition-all h-11 rounded-xl px-6 border border-white/25 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-sm"
              >
                <Headset className="size-4 text-amber-400" />
                <span>Talk to RM</span>
              </button>

              <button
                onClick={onStartDemo}
                className="inline-flex items-center justify-center gap-2 font-semibold cursor-pointer transition-all h-11 rounded-xl px-5 text-slate-300 hover:text-white hover:bg-white/10 text-xs"
              >
                <span>Load Manoj Pal (Demo)</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. FOUR PILLARS FRAMEWORK                                 */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
                One connected framework
              </p>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Four pillars, one financial life
              </h2>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <ShieldCheck className="size-5" />
              <span className="text-xs font-bold hidden sm:inline">Institutional Standard</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
            {pillars.map((p, idx) => (
              <div 
                key={p.code} 
                onClick={() => setSelectedPillar(selectedPillar === p.code ? null : p.code)}
                className={`surface-card p-6 transition-all duration-200 cursor-pointer ${
                  selectedPillar === p.code ? 'ring-2 ring-blue-600 shadow-md' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono font-bold text-xs">
                    {p.num}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    Pillar
                  </span>
                </div>

                <p className="font-display mt-4 text-base font-extrabold tracking-wider text-slate-900">
                  {p.code}
                </p>
                <p className="text-slate-600 mt-1.5 text-xs leading-relaxed font-medium">
                  {p.title}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  {p.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. 15 FEATURE TAGS / CAPABILITY TILES                     */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
              A clearer way to manage your financial life
            </h2>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Click any capability to inspect
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {featureTags.map((tag) => {
              const isSelected = selectedTag?.name === tag.name;
              return (
                <button
                  key={tag.name}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-blue-600 text-white shadow-sm scale-105' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-2xs'
                  }`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>

          {/* Active Tag Inspector Callout */}
          {selectedTag && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl animate-in fade-in duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider">
                    {selectedTag.pillar} PILLAR
                  </span>
                  <span className="text-xs font-bold text-slate-900">•</span>
                  <span className="text-xs font-extrabold text-slate-900">{selectedTag.name}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedTag.desc}
                </p>
              </div>
              <button
                onClick={() => onNavigate('journey')}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shrink-0"
              >
                Analyze in Journey
              </button>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* 4. TRUST & PRIVACY SECTION (1:1 with Wealth360)           */}
        {/* ========================================================= */}
        <section className="surface-card flex items-start gap-4 p-6 sm:p-7 border border-slate-200/90">
          <span className="bg-slate-100 text-slate-800 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200">
            <Lock className="size-5 text-slate-700" />
          </span>
          <div>
            <h2 className="font-display text-base font-bold text-slate-900">
              Your information. Your control.
            </h2>
            <p className="text-slate-600 mt-1.5 max-w-3xl text-xs leading-relaxed font-normal">
              You choose what to share, you can edit it later, and no transaction is performed automatically. Recommendations are informational and subject to market conditions. A production version can connect Account Aggregator with your consent.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. THREE STRATEGIC PILLAR CARDS (1:1 with Wealth360)      */}
        {/* ========================================================= */}
        <section className="bg-slate-100/80 border border-slate-200/80 grid gap-6 rounded-3xl p-6 sm:p-8 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Target className="size-5" />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-900">
              Understand what matters now
            </p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Start with a guided financial discovery journey covering income, debt, and liquid reserves.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <Users className="size-5" />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-900">
              Plan around real life
            </p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Bring family, goals, risks and future changes together in one single connected dashboard.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <HeartHandshake className="size-5" />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-900">
              Make wealth carry forward
            </p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Understand nomination, continuity and the people who matter with digital vaults and wills.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. INTERACTIVE SAMPLE LIVE DIAGNOSIS (MANOJ PAL)          */}
        {/* ========================================================= */}
        <section className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-amber-300 uppercase px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                VERIFIED PROFILE DEMO
              </span>
              <h3 className="text-xl font-bold mt-2">
                Manoj Pal’s 360° Health Diagnostics
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Income: ₹1,50,000/mo • Expenses: ₹92,000/mo • Net Worth: ₹27.74 Lakh
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
              <span className="text-xs text-slate-300">Target Score:</span>
              <span className="text-sm font-extrabold text-emerald-400">87 / 100 (in 6 months)</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Score Gauge */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <ScoreGauge score={78} status="Good" size={160} strokeWidth={12} />
              <span className="text-xs font-semibold text-slate-500 mt-1">
                Benchmark: Top 25% of peers
              </span>
            </div>

            {/* Pillar Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Diagnostic Health Ratios
              </span>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Savings Rate (23.3%)</span>
                  <span className="text-emerald-600 font-bold">82% (Healthy)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[82%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Credit Card Usage (60%)</span>
                  <span className="text-amber-600 font-bold">48% (Attention)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[48%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Emergency Cushion (1.3 mo)</span>
                  <span className="text-rose-600 font-bold">43% (Needs Boost)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[43%]" />
                </div>
              </div>
            </div>

            {/* Next Best Action */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>YOUR NEXT BEST ACTION</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mt-2">
                Strengthen Emergency Fund to ₹3,00,000
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Allocate ₹30,000/mo to liquid reserves to reach 3.2 months buffer and lift score to 87.
              </p>
              <button
                onClick={() => onNavigate('dashboard')}
                className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Full Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
