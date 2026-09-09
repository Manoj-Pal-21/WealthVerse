import React from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Landmark, 
  CreditCard, 
  PiggyBank, 
  Compass, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldAlert,
  Target,
  Sparkles
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import PerformanceLineChart from '../components/charts/PerformanceLineChart';
import AssetDonutChart from '../components/charts/AssetDonutChart';
import AIInsightCard from '../components/ai/AIInsightCard';
import { 
  overviewKPIs, 
  assetAllocation, 
  portfolioHistory, 
  aiFinancialBrief, 
  recentTransactions 
} from '../data/financialData';
import { formatINR } from '../utils/formatters';

export default function OverviewPage({ onNavigate, onOpenAI }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Good afternoon, Manoj 👋
            </h1>
            <Badge variant="brand" size="sm">
              Live Sync
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here's your complete financial command picture at a glance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onNavigate('gaps')}
            icon={ShieldAlert}
          >
            Check Gaps (72/100)
          </Button>

          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onOpenAI("What should I fix first?")}
            icon={Sparkles}
          >
            Ask 360° AI
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Net Worth"
          value={formatINR(overviewKPIs.netWorth.value)}
          change={overviewKPIs.netWorth.change}
          period={overviewKPIs.netWorth.period}
          isPositive={overviewKPIs.netWorth.isPositive}
          icon={Wallet}
          iconColor="text-brand-600 bg-brand-50"
        />

        <MetricCard
          title="Investments"
          value={formatINR(overviewKPIs.investments.value)}
          change={overviewKPIs.investments.change}
          period={overviewKPIs.investments.period}
          isPositive={overviewKPIs.investments.isPositive}
          icon={TrendingUp}
          iconColor="text-blue-600 bg-blue-50"
          onClick={() => onNavigate('portfolio')}
        />

        <MetricCard
          title="Liabilities"
          value={formatINR(overviewKPIs.liabilities.value)}
          change={overviewKPIs.liabilities.change}
          period={overviewKPIs.liabilities.period}
          isPositive={overviewKPIs.liabilities.isPositive}
          icon={CreditCard}
          iconColor="text-amber-600 bg-amber-50"
        />

        <MetricCard
          title="Monthly Investment"
          value={formatINR(overviewKPIs.monthlyInvestment.value)}
          status={overviewKPIs.monthlyInvestment.status}
          statusType="good"
          icon={PiggyBank}
          iconColor="text-emerald-600 bg-emerald-50"
          onClick={() => onNavigate('goals')}
        />
      </div>

      {/* Performance & Allocation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Performance Chart (2 cols) */}
        <Card 
          className="lg:col-span-2" 
          title="Portfolio Performance" 
          subtitle="Real-time aggregate valuation trajectory (+12.4% • +₹3,91,620 gain)"
          action={
            <button 
              onClick={() => onNavigate('portfolio')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <PerformanceLineChart dataByFilter={portfolioHistory} defaultFilter="1Y" />
        </Card>

        {/* Asset Allocation Donut (1 col) */}
        <Card 
          title="Asset Allocation" 
          subtitle="Portfolio distribution across 6 asset classes"
          action={
            <Badge variant="brand" size="sm">₹35.42L</Badge>
          }
        >
          <AssetDonutChart 
            data={assetAllocation} 
            centerValue="₹35.42L"
            centerLabel="Total Portfolio"
          />
        </Card>
      </div>

      {/* Middle Row: AI Financial Brief + Financial Gap Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Financial Brief (2 cols) */}
        <Card 
          className="lg:col-span-2"
          title="AI Financial Brief" 
          subtitle="Top 3 insights identified from your multi-asset telemetry"
          action={
            <div className="flex items-center gap-1 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/50">
              <Compass className="w-3.5 h-3.5 animate-pulse-subtle" />
              <span>360° AI Active</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {aiFinancialBrief.map((brief) => (
              <AIInsightCard
                key={brief.id}
                title={brief.title}
                description={brief.description}
                priority={brief.priority}
                priorityLevel={brief.priorityLevel}
                actionText={brief.actionText}
                onAction={() => onNavigate(brief.actionTarget)}
              />
            ))}
          </div>
        </Card>

        {/* Financial Gap Radar Card (1 col) */}
        <Card 
          title="Financial Gap Radar" 
          subtitle="Overall Financial Readiness score"
          action={
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('gaps')}
            >
              Analyze
            </Button>
          }
        >
          <div className="flex flex-col items-center text-center py-1">
            {/* Circular Readiness Score */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand-600 transition-all duration-1000 ease-out"
                  strokeDasharray="72, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-900">72</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">out of 100</span>
              </div>
            </div>

            <div className="mt-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Good Readiness
              </span>
              <p className="text-xs text-slate-500 mt-1.5 leading-snug">
                Estimated balance sheet gap of <strong className="text-slate-800">₹38.50L</strong> detected.
              </p>
            </div>

            {/* Radar Mini Score Bars */}
            <div className="w-full mt-4 space-y-2 text-left border-t border-slate-100 pt-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Emergency Fund</span>
                <span className="font-semibold text-emerald-600">82/100</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Retirement</span>
                <span className="font-semibold text-amber-600">68/100</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Insurance Cover</span>
                <span className="font-semibold text-rose-600">45/100 (Critical)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Row: Goals Progress & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals Progress Widget (1 col) */}
        <Card 
          title="Active Goals" 
          subtitle="4 life milestones tracked"
          action={
            <button 
              onClick={() => onNavigate('goals')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Retirement (Target ₹2 Cr)</span>
                <span className="text-brand-600 font-bold">71%</span>
              </div>
              <ProgressBar progress={71} color="brand" showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Home Purchase (₹50L)</span>
                <span className="text-blue-600 font-bold">64%</span>
              </div>
              <ProgressBar progress={64} color="blue" showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Child Education (₹30L)</span>
                <span className="text-amber-600 font-bold">40%</span>
              </div>
              <ProgressBar progress={40} color="amber" showLabel={false} />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>New Car (₹10L)</span>
                <span className="text-purple-600 font-bold">40%</span>
              </div>
              <ProgressBar progress={40} color="purple" showLabel={false} />
            </div>
          </div>
        </Card>

        {/* Recent Transactions Table (2 cols) */}
        <Card 
          className="lg:col-span-2"
          title="Recent Transactions" 
          subtitle="Automated ledger sync across linked folios and demat"
          action={
            <span className="text-xs text-slate-400 font-medium">Auto-reconciled</span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium">
                  <th className="pb-3 font-medium">Asset / Description</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 font-semibold text-slate-800">
                      {tx.asset}
                      <span className="block text-[11px] font-normal text-slate-400">{tx.type}</span>
                    </td>
                    <td className="py-3">
                      <Badge variant="neutral" size="sm">
                        {tx.category}
                      </Badge>
                    </td>
                    <td className="py-3 text-slate-500">{tx.date}</td>
                    <td className={`py-3 text-right font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {tx.amount > 0 ? `+${formatINR(tx.amount)}` : formatINR(tx.amount)}
                    </td>
                    <td className="py-3 text-right">
                      <Badge variant="good" size="sm">
                        {tx.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
