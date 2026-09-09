import React, { useState } from 'react';
import { 
  HeartPulse, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  Landmark, 
  ChevronRight, 
  UserCheck, 
  Building2, 
  Coins, 
  Users, 
  Lock, 
  ReceiptText, 
  Scale,
  ExternalLink,
  MessageSquare,
  PanelRightClose,
  PanelRightOpen,
  Bot
} from 'lucide-react';
import ScoreGauge from '../components/planner/ScoreGauge';
import ProjectedChart from '../components/planner/ProjectedChart';
import NetWorthCard from '../components/planner/NetWorthCard';
import DashboardChatbotCopilot from '../components/planner/DashboardChatbotCopilot';
import TaxSaverCard from '../components/planner/TaxSaverCard';
import PortfolioRebalanceCard from '../components/planner/PortfolioRebalanceCard';
import DebtRepaymentPlannerCard from '../components/planner/DebtRepaymentPlannerCard';
import InsuranceAndFamilyCard from '../components/planner/InsuranceAndFamilyCard';
import SecurityComplianceCard from '../components/planner/SecurityComplianceCard';
import AutonomousAiPrescriptionCard from '../components/planner/AutonomousAiPrescriptionCard';
import RMConnectModal from '../components/planner/RMConnectModal';
import FamilyVaultAndNominationModal from '../components/planner/FamilyVaultAndNominationModal';

export default function DashboardScreen({ metrics, onNavigate, onUpdateProfileData }) {
  const [isRMModalOpen, setIsRMModalOpen] = useState(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  
  // Right-Side Docked Copilot State (compact, right-side docked, no top clipping)
  const [isRightCopilotOpen, setIsRightCopilotOpen] = useState(true);
  const [isExpandedWidth, setIsExpandedWidth] = useState(false);

  const {
    monthlyIncome = 150000,
    monthlyExpenses = 92000,
    monthlySavings = 35000,
    monthlyInvestment = 20000,
    monthlyEmi = 18000,
    netWorth = 2774000,
    totalAssets = 3780000,
    totalLiabilities = 1006000,
    thirdPartyLoan = 150000,
    age = 34,
    score = 78,
    status = "Good",
    statusColor = "text-blue-700 bg-blue-50 border-blue-200",
    projectedScore = 87,
    projectedTimeline,
    projectedMetrics
  } = metrics || {};

  const formatLakhs = (amount) => {
    const val = Number(amount) || 0;
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  };

  const summaryCards = [
    { label: "Verified Net Worth", value: formatLakhs(netWorth), sub: `Assets: ${formatLakhs(totalAssets)} • Debt: ${formatLakhs(totalLiabilities)}`, icon: Coins, color: "text-amber-600 bg-amber-50" },
    { label: "Monthly Income", value: `₹${monthlyIncome.toLocaleString('en-IN')}`, sub: "Post-tax in-hand salary", icon: Wallet, color: "text-blue-600 bg-blue-50" },
    { label: "Monthly Expenses", value: `₹${monthlyExpenses.toLocaleString('en-IN')}`, sub: "Living costs", icon: PiggyBank, color: "text-slate-600 bg-slate-100" },
    { label: "Monthly Savings", value: `₹${monthlySavings.toLocaleString('en-IN')}`, sub: "23.3% healthy savings rate", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
    { label: "Monthly SIP", value: `₹${monthlyInvestment.toLocaleString('en-IN')}`, sub: "Active mutual fund SIPs", icon: TrendingUp, color: "text-indigo-600 bg-indigo-50" },
    { label: "Monthly EMI", value: `₹${monthlyEmi.toLocaleString('en-IN')}`, sub: "12% debt-to-income", icon: Landmark, color: "text-purple-600 bg-purple-50" },
  ];

  const pillars = [
    { name: "Savings Health", percentage: 82, status: "Healthy", color: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
    { name: "Debt Health", percentage: 61, status: "Moderate", color: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
    { name: "Emergency Fund", percentage: 43, status: "Needs Boost", color: "bg-rose-500", text: "text-rose-700", bg: "bg-rose-50" },
    { name: "Investment Health", percentage: 72, status: "Good", color: "bg-indigo-500", text: "text-indigo-700", bg: "bg-indigo-50" },
    { name: "Credit Health", percentage: 48, status: "Attention", color: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  ];

  const insights = [
    {
      type: "Positive",
      icon: CheckCircle2,
      color: "text-emerald-700 bg-emerald-50/80 border-emerald-200",
      badgeColor: "bg-emerald-100 text-emerald-800",
      text: "Healthy savings rate of 23.3% and solid equity compounding engine (~77.5% allocation)."
    },
    {
      type: "Warning",
      icon: ShieldAlert,
      color: "text-rose-700 bg-rose-50/80 border-rose-200",
      badgeColor: "bg-rose-100 text-rose-800",
      text: "Life insurance gap of ₹1.00 Crore detected (₹50L existing vs ₹1.50 Cr recommended)."
    },
    {
      type: "Attention",
      icon: AlertTriangle,
      color: "text-amber-700 bg-amber-50/80 border-amber-200",
      badgeColor: "bg-amber-100 text-amber-800",
      text: "Credit card utilization is at 60% (36% APR) and Third-Party hand loan stands at ₹1.50L."
    },
    {
      type: "Opportunity",
      icon: Sparkles,
      color: "text-indigo-700 bg-indigo-50/80 border-indigo-200",
      badgeColor: "bg-indigo-100 text-indigo-800",
      text: "Harvest ₹93,000 in long-term capital gains before March 31 with zero tax liability."
    }
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 py-6 sm:py-8">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isRightCopilotOpen 
          ? (isExpandedWidth ? "max-w-[1980px]" : "max-w-[1880px]") 
          : "max-w-7xl"
      }`}>
        {/* Main Layout: Dashboard Body + Fixed Right Copilot */}
        <div className="relative">
          {/* 1. MAIN DASHBOARD CONTENT AREA (Left & Center with clearance for fixed copilot) */}
          <div className={`min-w-0 space-y-8 transition-all duration-300 ${
            isRightCopilotOpen 
              ? (isExpandedWidth 
                  ? "lg:mr-[620px] xl:mr-[690px] 2xl:mr-[750px]" 
                  : "lg:mr-[500px] xl:mr-[560px] 2xl:mr-[600px]") 
              : "w-full"
          }`}>
            {/* Top Title Banner & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                    <HeartPulse className="w-5 h-5" />
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Financial Health & Wealth Dashboard
                  </h1>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  Diagnosis completed for <span className="font-semibold text-slate-700">Manoj Pal (Age {age})</span> • Verified Net Worth: <strong className="text-slate-900">{formatLakhs(netWorth)}</strong>.
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* DEDICATED NEW PAGE BUTTON */}
                <button
                  onClick={() => onNavigate('advisor')}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Open AI Advisor (New Page)</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </button>

                {/* TOGGLE RIGHT SIDEBAR */}
                <button
                  onClick={() => setIsRightCopilotOpen(!isRightCopilotOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                    isRightCopilotOpen
                      ? "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                      : "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 shadow-2xs"
                  }`}
                >
                  {isRightCopilotOpen ? <PanelRightClose className="w-3.5 h-3.5" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
                  <span>{isRightCopilotOpen ? "Hide AI Copilot" : "Show Right Copilot"}</span>
                </button>

                <button
                  onClick={() => setIsRMModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl transition-all shadow-2xs"
                >
                  <Users className="w-3.5 h-3.5 text-amber-700" />
                  <span>Private Wealth RM</span>
                </button>

                <button
                  onClick={() => setIsVaultModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-600" />
                  <span>Family Vault</span>
                </button>

                <button
                  onClick={() => onNavigate('plan')}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs"
                >
                  <span>Action Plan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </button>
              </div>
            </div>

            {/* 1. Hero Score & Financial Snapshot Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Main Score Card (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden">
                <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Financial Health Score
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Diagnostic Verified
                  </span>
                </div>

                {/* Circular Gauge */}
                <div className="py-3">
                  <ScoreGauge score={score} status={status} size={185} strokeWidth={14} />
                </div>

                <div className="w-full bg-slate-50 rounded-2xl p-3 border border-slate-100 text-xs text-slate-600">
                  <p>
                    Score of <strong className="text-slate-900">{score}/100</strong> places you in the <span className="font-semibold text-blue-600">{status}</span> tier.
                    Trajectory target: <strong className="text-emerald-600">{projectedScore} (Excellent)</strong>.
                  </p>
                </div>
              </div>

              {/* 6 Summary Tiles (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 h-full">
                  {summaryCards.map((card, idx) => {
                    const IconComponent = card.icon;
                    return (
                      <div 
                        key={idx} 
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">{card.label}</span>
                          <div className={`p-1.5 rounded-xl ${card.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="mt-2.5">
                          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight block">
                            {card.value}
                          </span>
                          <span className="text-xs text-slate-400 font-medium mt-0.5 block truncate">
                            {card.sub}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. AI WEALTH ADVISOR COMMAND CENTER GATEWAY */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                      AI Financial Advisor & Wealth Copilot
                    </h3>
                    <span className="text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                      Full Intelligence Mode
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Have deep financial reasoning sessions about your ₹27.74L net worth, private hand loans, and tax optimization.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={() => onNavigate('advisor')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02]"
                >
                  <span>Open Dedicated New Page</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                {!isRightCopilotOpen && (
                  <button
                    onClick={() => setIsRightCopilotOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-xl transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Dock to Right Side</span>
                  </button>
                )}
              </div>
            </div>

            {/* 3. AUTONOMOUS AI DIRECTIVES & PRESCRIPTIONS (WHAT TO DO & WHAT NOT TO DO) */}
            <AutonomousAiPrescriptionCard 
              metrics={metrics}
              onOpenRM={() => setIsRMModalOpen(true)}
              onNavigate={onNavigate}
              onScrollToSection={(sectionId) => {
                const el = document.getElementById(sectionId);
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 4. NEXT BEST ACTION + 5 PILLARS + KEY INSIGHTS (SPACIOUS GRID) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Next Best Action Banner (12 Cols) */}
              <div className="lg:col-span-12 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-blue-100 mb-2 w-max">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Next Best Action</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                    Strengthen Emergency Fund to ₹3.00 Lakh
                  </h3>
                  <p className="text-xs text-blue-100 mt-1 leading-relaxed">
                    Allocate ₹30,000/mo over the next 6 months to liquid cash to build a 3.2-month buffer and lift your score to 87.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('plan')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center gap-2 shrink-0 self-start sm:self-center"
                >
                  <span>View Complete Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Five Pillars Snapshot (6 Cols) */}
              <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Financial Health Breakdown (5 Pillars)
                  </h3>
                  <span className="text-xs font-semibold text-slate-400">Target: 80%+</span>
                </div>

                <div className="mt-3.5 space-y-3">
                  {pillars.map((pillar, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{pillar.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.2 rounded font-bold text-[10px] ${pillar.text} ${pillar.bg}`}>
                            {pillar.status}
                          </span>
                          <span className="font-extrabold text-slate-900 text-xs w-7 text-right">
                            {pillar.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${pillar.color}`}
                          style={{ width: `${pillar.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Key Insights (6 Cols) */}
              <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">
                    Key Diagnostic Insights
                  </h3>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    AI Synthesized
                  </span>
                </div>

                <div className="mt-3 space-y-2.5">
                  {insights.map((ins, idx) => {
                    const IconComp = ins.icon;
                    return (
                      <div key={idx} className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${ins.color}`}>
                        <IconComp className="w-4 h-4 shrink-0 mt-0.5" />
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          {ins.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Comprehensive Net Worth & 4 Core Wealth Sections */}
            <NetWorthCard 
              metrics={metrics} 
              onNavigate={onNavigate}
              onUpdateProfileData={onUpdateProfileData}
              onOpenRM={() => setIsRMModalOpen(true)}
              onOpenTax={() => {
                const el = document.getElementById('tax-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenRebalance={() => {
                const el = document.getElementById('rebalance-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenVault={() => setIsVaultModalOpen(true)}
            />

            {/* 5. Age Factor & Portfolio Rebalancing Engine */}
            <div id="rebalance-section">
              <PortfolioRebalanceCard 
                metrics={metrics} 
                onOpenRM={() => setIsRMModalOpen(true)} 
              />
            </div>

            {/* 6. Tax Optimization & LTCG Harvesting Card */}
            <div id="tax-section">
              <TaxSaverCard 
                metrics={metrics} 
                onOpenRM={() => setIsRMModalOpen(true)} 
              />
            </div>

            {/* 7. Debt Repayment Planner (with Third-Party Loan) */}
            <div id="debt-section">
              <DebtRepaymentPlannerCard metrics={metrics} />
            </div>

            {/* 8. Insurance Protection & Inflation-Adjusted Family Goals */}
            <InsuranceAndFamilyCard 
              metrics={metrics} 
              onOpenRM={() => setIsRMModalOpen(true)} 
            />

            {/* 9. Projected Improvement Visualization (78 ➔ 87) */}
            <ProjectedChart
              currentScore={score}
              projectedScore={projectedScore}
              timeline={projectedTimeline}
              projectedMetrics={projectedMetrics}
            />

            {/* 10. Security, Trust & SEBI Compliance */}
            <SecurityComplianceCard />
          </div>

          {/* 2. RIGHT-SIDE FIXED AI ADVISOR COPILOT (100% Fixed, never moves up on scroll!) */}
          {isRightCopilotOpen && (
            <>
              {/* Desktop Fixed Aside with clearance below 2-row navbar and wider layout */}
              <aside className={`hidden lg:block fixed top-[116px] right-4 xl:right-6 2xl:right-8 z-30 transition-all duration-300 ${
                isExpandedWidth 
                  ? "w-[600px] xl:w-[670px] 2xl:w-[730px]" 
                  : "w-[480px] xl:w-[540px] 2xl:w-[580px]"
              }`}>
                <DashboardChatbotCopilot 
                  metrics={metrics} 
                  onOpenRM={() => setIsRMModalOpen(true)}
                  onNavigateToPage={() => onNavigate('advisor')}
                  onClose={() => setIsRightCopilotOpen(false)}
                  isDocked={true}
                  isExpandedWidth={isExpandedWidth}
                  onToggleExpandWidth={() => setIsExpandedWidth(!isExpandedWidth)}
                />
              </aside>

              {/* Mobile Slide-Over Drawer */}
              <div 
                onClick={() => setIsRightCopilotOpen(false)}
                className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
              />
              <asidhii className="lg:hidden fixed top-16 right-0 bottom-0 w-full sm:w-[480px] z-50 animate-in slide-in-from-right duration-200 p-2 bg-slate-900/20">
                <DashboardChatbotCopilot 
                  metrics={metrics} 
                  onOpenRM={() => setIsRMModalOpen(true)}
                  onNavigateToPage={() => onNavigate('advisor')}
                  onClose={() => setIsRightCopilotOpen(false)}
                  isDocked={true}
                />
              </asidhii>
            </>
          )}
        </div>
      </div>

      {/* Floating Right Copilot Button when collapsed */}
      {!isRightCopilotOpen && (
        <button
          onClick={() => setIsRightCopilotOpen(true)}
          className="fixed right-5 bottom-6 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-2xl shadow-2xl border border-blue-400/40 font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Open AI Copilot</span>
        </button>
      )}

      {/* Relationship Manager Modal */}
      <RMConnectModal 
        isOpen={isRMModalOpen}
        onClose={() => setIsRMModalOpen(false)}
        clientNetWorth={formatLakhs(netWorth)}
      />

      {/* Family Vault & Nomination Modal */}
      <FamilyVaultAndNominationModal
        isOpen={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
      />
    </div>
  );
}
