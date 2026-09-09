import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  HeartPulse, 
  Lock, 
  BarChart3,
  Layers
} from 'lucide-react';
import ScoreGauge from '../components/planner/ScoreGauge';

export default function WelcomeScreen({ onNavigate, onStartDemo }) {
  const features = [
    {
      title: "Understand your financial health",
      description: "Diagnose your complete financial situation across savings, debt, investments, emergency reserves, and credit health in one comprehensive score.",
      icon: HeartPulse,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      highlight: "5-Pillar Score (0-100)"
    },
    {
      title: "Get personalized recommendations",
      description: "No generic tips. Receive high-impact, mathematically prioritized actions like strengthening emergency funds and optimizing credit utilization.",
      icon: Target,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      highlight: "High-Impact Priority Fixes"
    },
    {
      title: "Track your progress",
      description: "See your simulated 6-month trajectory from 78 to 87. Track monthly milestones with realistic roadmaps and verified account sync.",
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      highlight: "6-Month Projected Growth"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50/50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>FINANCIAL INTELLIGENCE THAT GUIDES ACTION</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mt-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Take control of your <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent">
              financial health.
            </span>
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Understand where you stand today and get a personalized plan for where you want to be.
          </p>

          <p className="mt-2 text-sm font-semibold text-slate-500 italic">
            "Don't just understand your finances. Know what you should do next."
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('profile')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Financial Health Journey (4 Steps)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onStartDemo}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-base rounded-xl shadow-sm transition-all"
            >
              <span>Load Manoj Pal's Verified Profile</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bank-grade 256-bit Security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>No Spam • No Hidden Fees</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-slate-400" />
              <span>RBI Account Aggregator Protocol</span>
            </div>
          </div>
        </div>

        {/* Interactive Visual Preview Showcase */}
        <div className="mt-14 max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-blue-300 uppercase">
                Sample Live Diagnosis
              </span>
              <h3 className="text-xl font-bold mt-1">
                Manoj Pal’s Financial Diagnostics
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Income: ₹1,50,000/mo • Expenses: ₹92,000/mo • Emergency Fund: 1.3 mos
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15">
              <span className="text-xs text-slate-300">Target Score:</span>
              <span className="text-sm font-extrabold text-emerald-400">87 (in 6 months)</span>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Score Preview */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <ScoreGauge score={78} status="Good" size={170} strokeWidth={12} />
              <span className="text-xs font-semibold text-slate-500 mt-1">
                Benchmark: Top 25% of peers
              </span>
            </div>

            {/* Diagnostic Pillar snapshot */}
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
                  <span className="text-slate-700">Emergency Fund (1.3 mo)</span>
                  <span className="text-rose-600 font-bold">43% (Needs Boost)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[43%]" />
                </div>
              </div>
            </div>

            {/* Next Best Action Callout */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>YOUR NEXT BEST ACTION</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mt-2">
                Strengthen Emergency Fund to ₹3,00,000
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Allocate ₹30,000/mo to liquid funds to reach 3.2 months buffer and lift score to 87.
              </p>
              <button
                onClick={() => onNavigate('dashboard')}
                className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Explore Full Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars / Feature Cards */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              A Complete Financial Guidance System
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Transforming scattered numbers into a clear, prioritized action roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${feat.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                      {feat.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
