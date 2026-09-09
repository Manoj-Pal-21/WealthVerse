import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  BarChart3, 
  Compass, 
  Sparkles, 
  ShieldAlert, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import PerformanceLineChart from '../components/charts/PerformanceLineChart';
import { 
  equityKPIs, 
  equityHoldings, 
  sectorExposure, 
  equityPerformanceHistory, 
  aiEquityAnalysis 
} from '../data/equityData';
import { formatINR } from '../utils/formatters';

export default function EquityPage({ onOpenAI, onNavigate }) {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Equity Intelligence</h1>
          <p className="text-sm text-slate-500 mt-1">
            Understand your stock portfolio beyond short-term price fluctuations.
          </p>
        </div>

        <Button 
          variant="primary" 
          size="sm"
          onClick={() => onOpenAI("Why is my portfolio down?")}
          icon={Sparkles}
        >
          Ask 360° AI
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Current Value"
          value={formatINR(equityKPIs.currentValue)}
          change={`+${equityKPIs.todayPnLPercent}%`}
          period="today"
          isPositive={true}
          icon={Wallet}
          iconColor="text-brand-600 bg-brand-50"
        />

        <MetricCard
          title="Total Invested"
          value={formatINR(equityKPIs.investedValue)}
          status="5 Core Stocks"
          statusType="neutral"
          icon={BarChart3}
          iconColor="text-blue-600 bg-blue-50"
        />

        <MetricCard
          title="Today's P&L"
          value={`+${formatINR(equityKPIs.todayPnL)}`}
          change="+0.68%"
          period="day gain"
          isPositive={true}
          icon={TrendingUp}
          iconColor="text-emerald-600 bg-emerald-50"
        />

        <MetricCard
          title="Overall Return"
          value={`${equityKPIs.overallReturnPercent}%`}
          change={`+${formatINR(equityKPIs.overallReturn)}`}
          period="absolute"
          isPositive={true}
          icon={TrendingUp}
          iconColor="text-purple-600 bg-purple-50"
        />
      </div>

      {/* Stock Performance Chart with 6 time filters */}
      <Card 
        title="Equity Performance History" 
        subtitle="Trailing performance across multi-duration intervals"
      >
        <PerformanceLineChart
          dataByFilter={equityPerformanceHistory}
          defaultFilter="6M"
          filterOptions={['1D', '1W', '1M', '6M', '1Y', '5Y']}
          color="#0D9488"
        />
      </Card>

      {/* Sector Exposure and AI Equity Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Exposure Card (1 col) */}
        <Card 
          title="Sector Exposure" 
          subtitle="Weight distribution across industries"
          action={<Badge variant="brand" size="sm">5 Sectors</Badge>}
        >
          <div className="space-y-3.5">
            {sectorExposure.map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{sec.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">{formatINR(sec.value, true)}</span>
                    <span className="font-bold text-slate-900 w-8 text-right">{sec.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sec.percentage}%`, backgroundColor: sec.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Equity Analysis Card (2 cols) */}
        <Card 
          className="lg:col-span-2"
          title="360° AI Equity Diagnostic" 
          subtitle="Deep dive on concentration risk, volatility, and diversification metrics"
          action={
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
              <Compass className="w-3.5 h-3.5 animate-pulse-subtle" />
              <span>Risk Sentinel</span>
            </div>
          }
        >
          <div className="space-y-4">
            {/* 3 Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Concentration Risk</div>
                <div className="text-base font-extrabold text-amber-900 mt-1">{aiEquityAnalysis.concentrationRisk}</div>
                <p className="text-[11px] text-amber-700 mt-1">IT sector at 32% (limit &lt; 25%)</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Diversification</div>
                <div className="text-base font-extrabold text-emerald-900 mt-1">{aiEquityAnalysis.diversification}</div>
                <p className="text-[11px] text-emerald-700 mt-1">Well-spread across 4 core sectors</p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
                <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">Volatility Beta</div>
                <div className="text-base font-extrabold text-blue-900 mt-1">{aiEquityAnalysis.volatility}</div>
                <p className="text-[11px] text-blue-700 mt-1">Beta 0.94 relative to NIFTY 50</p>
              </div>
            </div>

            {/* AI Callout Banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {aiEquityAnalysis.insight}
                </p>
              </div>

              {showExplanation && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1.5 animate-in fade-in">
                  <p>• TCS (₹4.67L) + Infosys (₹2.48L) comprise <strong>₹7.15L</strong> of your total equity portfolio.</p>
                  <p>• If global tech spending slows, IT margins may compress, impacting 1/3 of your capital.</p>
                  <p>• Strategic remedy: Deploy future capital into Banking, Pharma, or broader Multi-Asset funds.</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                {showExplanation ? 'Hide Details' : 'Explain Risk'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenAI("Why is my portfolio down?")}
                icon={Sparkles}
              >
                Ask 360° AI
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card 
        title="Stock Holdings Analytics" 
        subtitle="Fundamental equity positions with live valuation metrics"
        action={
          <span className="text-xs text-slate-400 font-medium">Real-time CDSL/NSDL feed</span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium">
                <th className="pb-3 font-medium">Stock Name</th>
                <th className="pb-3 font-medium">Sector</th>
                <th className="pb-3 font-medium text-right">Qty</th>
                <th className="pb-3 font-medium text-right">Avg Price</th>
                <th className="pb-3 font-medium text-right">LTP (₹)</th>
                <th className="pb-3 font-medium text-right">Invested</th>
                <th className="pb-3 font-medium text-right">Current</th>
                <th className="pb-3 font-medium text-right">P&L</th>
                <th className="pb-3 font-medium text-right">Return</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {equityHoldings.map((stk) => (
                <tr key={stk.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5">
                    <span className="font-bold text-slate-900 text-xs">{stk.name}</span>
                    <span className="block text-[10px] text-slate-400 font-semibold">{stk.symbol}</span>
                  </td>
                  <td className="py-3.5">
                    <Badge variant={stk.sector === 'IT' ? 'brand' : stk.sector === 'Banking' ? 'info' : 'warning'} size="sm">
                      {stk.sector}
                    </Badge>
                  </td>
                  <td className="py-3.5 text-right text-slate-700 font-semibold">{stk.qty}</td>
                  <td className="py-3.5 text-right text-slate-600">₹{stk.avgPrice.toFixed(2)}</td>
                  <td className="py-3.5 text-right font-bold text-slate-900">₹{stk.ltp.toFixed(2)}</td>
                  <td className="py-3.5 text-right text-slate-600">{formatINR(stk.invested)}</td>
                  <td className="py-3.5 text-right font-bold text-slate-900">{formatINR(stk.current)}</td>
                  <td className="py-3.5 text-right font-bold text-emerald-600">+{formatINR(stk.pnl)}</td>
                  <td className="py-3.5 text-right">
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50">
                      +{stk.pnlPercent}%
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
