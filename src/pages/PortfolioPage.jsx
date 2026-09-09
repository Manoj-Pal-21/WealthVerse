import React, { useState } from 'react';
import { 
  PieChart, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import PerformanceLineChart from '../components/charts/PerformanceLineChart';
import AssetDonutChart from '../components/charts/AssetDonutChart';
import { 
  portfolioHistory, 
  assetAllocation 
} from '../data/financialData';
import { formatINR } from '../utils/formatters';

export default function PortfolioPage({ onNavigate, onOpenAI }) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Equity', 'Mutual Funds', 'ETF', 'FD', 'Gold'];

  const topHoldings = [
    {
      id: 'h-1',
      name: 'Reliance Industries Ltd',
      type: 'Equity (Large Cap)',
      category: 'Equity',
      invested: 441000,
      current: 536490,
      pnl: 95490,
      pnlPercent: 21.65,
      isPositive: true
    },
    {
      id: 'h-2',
      name: 'Tata Consultancy Services',
      type: 'Equity (IT)',
      category: 'Equity',
      invested: 387200,
      current: 467500,
      pnl: 80300,
      pnlPercent: 20.74,
      isPositive: true
    },
    {
      id: 'h-3',
      name: 'ICICI Prudential Liquid Fund',
      type: 'Debt Mutual Fund',
      category: 'Mutual Funds',
      invested: 200000,
      current: 210000,
      pnl: 10000,
      pnlPercent: 5.0,
      isPositive: true
    },
    {
      id: 'h-4',
      name: 'SBI Bluechip Fund (Direct)',
      type: 'Large Cap Fund',
      category: 'Mutual Funds',
      invested: 220000,
      current: 286000,
      pnl: 66000,
      pnlPercent: 30.0,
      isPositive: true
    },
    {
      id: 'h-5',
      name: 'HDFC Bank Ltd',
      type: 'Equity (Banking)',
      category: 'Equity',
      invested: 355200,
      current: 403200,
      pnl: 48000,
      pnlPercent: 13.51,
      isPositive: true
    }
  ];

  const filteredHoldings = activeTab === 'All' 
    ? topHoldings 
    : topHoldings.filter(h => h.category.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Portfolio</h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and understand all your investments in one unified command view.
          </p>
        </div>

        <Button 
          variant="primary" 
          size="sm"
          onClick={() => onOpenAI("Show my portfolio risk")}
          icon={Sparkles}
        >
          Ask AI
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-3 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              activeTab === tab
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Portfolio Value"
          value="₹35,42,200"
          change="+8.7%"
          period="vs last month"
          isPositive={true}
          icon={PieChart}
          iconColor="text-brand-600 bg-brand-50"
        />

        <MetricCard
          title="Today's P&L"
          value="+₹18,450"
          change="+1.2%"
          period="today"
          isPositive={true}
          icon={TrendingUp}
          iconColor="text-emerald-600 bg-emerald-50"
        />

        <MetricCard
          title="Overall P&L"
          value="+₹5,42,200"
          change="+18.7%"
          period="all-time"
          isPositive={true}
          icon={ArrowUpRight}
          iconColor="text-blue-600 bg-blue-50"
        />

        <MetricCard
          title="Portfolio XIRR"
          value="14.8%"
          status="Beats NIFTY"
          statusType="good"
          icon={Clock}
          iconColor="text-purple-600 bg-purple-50"
        />
      </div>

      {/* Large Performance Chart */}
      <Card 
        title="Portfolio Growth Trajectory" 
        subtitle="Historical consolidated equity, mutual fund, and fixed asset growth"
      >
        <PerformanceLineChart dataByFilter={portfolioHistory} defaultFilter="1Y" />
      </Card>

      {/* Allocation & AI Analysis Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Allocation Donut */}
        <Card 
          title="Portfolio Allocation" 
          subtitle="Capital exposure across asset classes"
          action={<Badge variant="brand" size="sm">6 Assets</Badge>}
        >
          <AssetDonutChart 
            data={assetAllocation} 
            centerValue="₹35.42L"
            centerLabel="Total Portfolio"
          />
        </Card>

        {/* AI Portfolio Analysis Card (2 cols) */}
        <Card 
          className="lg:col-span-2"
          title="360° AI Portfolio Analysis" 
          subtitle="Automated cross-asset diagnostics and diversification audit"
          action={
            <Badge variant="brand" size="sm" dot={true}>
              Algorithmic Review
            </Badge>
          }
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Portfolio is moderately diversified</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Your allocation across equity (48%), mutual funds (22%), and debt/liquid (20%) provides sufficient resilience against severe market drawdowns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">IT sector concentration is slightly high</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    32% of your stock exposure is tied to technology stocks (TCS & Infosys). Recommended benchmark is below 25%.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Mutual fund portfolio has 18% overlap</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Axis Bluechip Fund and Mirae Asset Large Cap Fund share common underlying stocks (ICICI Bank, Reliance, Infosys).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('mutual-funds')}
              >
                Inspect Overlap
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenAI("Show my portfolio risk")}
                icon={Sparkles}
              >
                View Detailed AI Analysis
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Holdings Table */}
      <Card 
        title="Top Portfolio Holdings" 
        subtitle="Ranked by total current market capitalization"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium">
                <th className="pb-3 font-medium">Asset Name</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium text-right">Invested</th>
                <th className="pb-3 font-medium text-right">Current Value</th>
                <th className="pb-3 font-medium text-right">Total P&L</th>
                <th className="pb-3 font-medium text-right">Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHoldings.map((h) => (
                <tr key={h.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5">
                    <span className="font-bold text-slate-800 text-xs">{h.name}</span>
                    <span className="block text-[11px] text-slate-400 font-medium">{h.type}</span>
                  </td>
                  <td className="py-3.5">
                    <Badge variant={h.category === 'Equity' ? 'brand' : 'info'} size="sm">
                      {h.category}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right font-medium text-slate-600">
                    {formatINR(h.invested)}
                  </td>
                  <td className="py-3.5 text-right font-bold text-slate-900">
                    {formatINR(h.current)}
                  </td>
                  <td className="py-3.5 text-right font-bold text-emerald-600">
                    +{formatINR(h.pnl)}
                  </td>
                  <td className="py-3.5 text-right">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50">
                      +{h.pnlPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
