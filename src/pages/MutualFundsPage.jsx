import React, { useState } from 'react';
import { 
  Layers, 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2,
  PieChart
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { 
  mutualFundsKPIs, 
  activeSips, 
  fundAllocation, 
  mfGrowthHistory, 
  fundOverlapData 
} from '../data/mutualFundsData';
import { formatINR } from '../utils/formatters';

export default function MutualFundsPage({ onOpenAI, onNavigate }) {
  const [showOverlapModal, setShowOverlapModal] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mutual Funds Command</h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor SIPs, returns, market capitalization allocation, and portfolio overlap.
          </p>
        </div>

        <Button 
          variant="primary" 
          size="sm"
          onClick={() => onOpenAI("Show my portfolio risk")}
          icon={Sparkles}
        >
          Audit Mutual Funds
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Current Value"
          value={formatINR(mutualFundsKPIs.currentValue)}
          status="All Folios"
          statusType="neutral"
          icon={Layers}
          iconColor="text-brand-600 bg-brand-50"
        />

        <MetricCard
          title="Total Invested"
          value={formatINR(mutualFundsKPIs.investedValue)}
          status="5 Active SIPs"
          statusType="info"
          icon={Calendar}
          iconColor="text-blue-600 bg-blue-50"
        />

        <MetricCard
          title="Total Return"
          value={`+${formatINR(mutualFundsKPIs.totalReturn)}`}
          change={`+${mutualFundsKPIs.totalReturnPercent}%`}
          period="gain"
          isPositive={true}
          icon={TrendingUp}
          iconColor="text-emerald-600 bg-emerald-50"
        />

        <MetricCard
          title="XIRR Return"
          value={`${mutualFundsKPIs.xirr}%`}
          status="Healthy"
          statusType="good"
          icon={TrendingUp}
          iconColor="text-purple-600 bg-purple-50"
        />

        <MetricCard
          title="Monthly SIP"
          value={formatINR(mutualFundsKPIs.monthlySip)}
          status="Auto-Debited"
          statusType="brand"
          icon={Calendar}
          iconColor="text-teal-600 bg-teal-50"
        />
      </div>

      {/* Fund Overlap Detection Banner (Core Requirement) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50/40 border border-amber-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Fund Overlap Detected</h3>
              <Badge variant="warning" size="sm">
                18% Redundancy
              </Badge>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
              AI detected: <strong>{fundOverlapData.fundA}</strong> and <strong>{fundOverlapData.fundB}</strong> hold duplicate large-cap positions. Consider reviewing overlapping funds to simplify your portfolio.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowOverlapModal(true)}
          className="shrink-0 border-amber-300 text-amber-900 hover:bg-amber-100/50"
        >
          View Overlap Analysis
        </Button>
      </div>

      {/* Active SIPs Grid */}
      <Card 
        title="Active Systematic Investment Plans (SIPs)" 
        subtitle="Current recurring automated mandates debited monthly"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSips.map((sip) => (
            <div 
              key={sip.id} 
              className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{sip.name}</h4>
                  <Badge variant="neutral" size="sm" className="mt-1">
                    {sip.category}
                  </Badge>
                </div>
                <Badge variant="good" size="sm" dot={true}>
                  {sip.status}
                </Badge>
              </div>

              <div className="flex items-baseline justify-between border-t border-slate-200/60 pt-2.5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">SIP Amount</span>
                  <div className="text-sm font-bold text-slate-900">{formatINR(sip.sipAmount)}/mo</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">XIRR</span>
                  <div className="text-sm font-bold text-emerald-600">+{sip.xirr}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Next Debit: {sip.nextDate}</span>
                <span>Val: {formatINR(sip.current, true)}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Growth Chart and Fund Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart (2 cols) */}
        <Card 
          className="lg:col-span-2"
          title="Mutual Fund Portfolio Growth" 
          subtitle="Net Asset Value (NAV) compounding timeline (Jan 2026 – Aug 2026)"
        >
          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-4">
            {mfGrowthHistory.map((item, idx) => {
              const maxVal = 1600000;
              const heightPercent = (item.value / maxVal) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatINR(item.value, true)}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-lg h-40 flex items-end p-1">
                    <div 
                      className="w-full bg-brand-600 group-hover:bg-brand-500 rounded-t-md transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600">{item.month}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Fund Allocation Donut / Bar (1 col) */}
        <Card 
          title="Market Cap Allocation" 
          subtitle="Equity mutual fund capitalization split"
          action={<Badge variant="brand" size="sm">Diverse</Badge>}
        >
          <div className="space-y-4">
            {fundAllocation.map((cap, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{cap.name}</span>
                  <span className="font-bold text-slate-900">{cap.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cap.percentage}%`, backgroundColor: cap.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Balanced Structure:</span> 35% Large Cap core provides stability while 30% Flexi Cap & 20% Mid Cap capture Indian economic expansion.
          </div>
        </Card>
      </div>

      {/* Fund Overlap Detailed Modal */}
      <Modal
        isOpen={showOverlapModal}
        onClose={() => setShowOverlapModal(false)}
        title="Fund Overlap & Redundancy Analysis"
        subtitle="Comparing Axis Bluechip Fund vs Mirae Asset Large Cap Fund"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-900 uppercase">Portfolio Overlap Factor</div>
              <div className="text-2xl font-black text-amber-800 mt-0.5">{fundOverlapData.overlapPercentage}% Overlap</div>
            </div>
            <Badge variant="warning" size="md">Needs Consolidation</Badge>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Common Underlying Holdings
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              <div className="bg-slate-50 px-3 py-2 flex justify-between text-[11px] font-bold text-slate-600">
                <span>Stock Holding</span>
                <div className="flex gap-6">
                  <span>Axis Bluechip</span>
                  <span>Mirae Asset</span>
                </div>
              </div>
              {fundOverlapData.commonHoldings.map((h, i) => (
                <div key={i} className="px-3 py-2.5 flex justify-between text-xs hover:bg-slate-50">
                  <span className="font-semibold text-slate-800">{h.stock}</span>
                  <div className="flex gap-8 text-slate-600">
                    <span className="w-16 text-right font-medium">{h.weightA}</span>
                    <span className="w-16 text-right font-medium">{h.weightB}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200/80 text-xs text-brand-900 leading-relaxed">
            <strong>360° AI Recommendation:</strong> {fundOverlapData.aiRecommendation}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowOverlapModal(false)}>
              Close
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => {
                setShowOverlapModal(false);
                onOpenAI("How do I fix my mutual fund overlap?");
              }}
            >
              Ask AI Remediation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
