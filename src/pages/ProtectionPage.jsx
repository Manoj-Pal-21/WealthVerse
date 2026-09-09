import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Heart, 
  Wallet, 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import LifeInsuranceRoadmapModal from '../components/roadmap/LifeInsuranceRoadmapModal';
import { 
  protectionKPIs, 
  emergencyReadiness, 
  aiProtectionRecommendation 
} from '../data/protectionData';
import { formatINR } from '../utils/formatters';

export default function ProtectionPage({ onOpenAI, onNavigate }) {
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Financial Protection</h1>
          <p className="text-sm text-slate-500 mt-1">
            Understand how prepared your household is for unexpected shocks and catastrophic events.
          </p>
        </div>

        <Button 
          variant="primary" 
          size="sm"
          onClick={() => onOpenAI("Explain my life insurance gap")}
          icon={Sparkles}
        >
          Check Vulnerabilities
        </Button>
      </div>

      {/* Top 4 Protection Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {protectionKPIs.map((kpi) => (
          <Card key={kpi.id} padding="p-5" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.title}</span>
                <Badge variant={kpi.statusType} size="sm">
                  {kpi.score}/100
                </Badge>
              </div>

              <div className="mt-2.5">
                <div className="text-xl font-black text-slate-900">
                  {kpi.unit === 'amount' 
                    ? `${formatINR(kpi.currentValue, true)} / ${formatINR(kpi.targetValue, true)}`
                    : kpi.unit === 'coverage'
                    ? formatINR(kpi.currentValue, true)
                    : `${formatINR(kpi.currentValue)}/mo`
                  }
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{kpi.note}</p>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-100">
              <ProgressBar 
                progress={kpi.score} 
                color={kpi.statusType === 'danger' ? 'rose' : kpi.statusType === 'warning' ? 'amber' : 'brand'} 
                showLabel={false}
                height="h-1.5"
              />
            </div>
          </Card>
        ))}
      </div>

      {/* AI Recommendation Banner: Life Insurance Vulnerability */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-white to-rose-50/30 border border-rose-200/90 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/20">
              <ShieldAlert className="w-6 h-6 animate-pulse-subtle" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                  {aiProtectionRecommendation.headline}
                </span>
                <Badge variant="danger" size="sm">Critical Vulnerability</Badge>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                {aiProtectionRecommendation.type} — Shortfall of {formatINR(aiProtectionRecommendation.gapAmount, true)}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-6 text-xs text-slate-600">
                <span>Current Cover: <strong>{formatINR(aiProtectionRecommendation.currentCover, true)}</strong></span>
                <span>•</span>
                <span>Required Benchmark: <strong>{formatINR(aiProtectionRecommendation.estimatedRequired, true)}</strong></span>
                <span>•</span>
                <span className="text-rose-700 font-bold">Uncovered Gap: {formatINR(aiProtectionRecommendation.gapAmount, true)}</span>
              </div>

              <p className="text-xs text-slate-600 mt-2.5 max-w-3xl leading-relaxed">
                {aiProtectionRecommendation.advice}
              </p>
            </div>
          </div>

          <Button
            variant="danger"
            size="md"
            onClick={() => setShowRoadmapModal(true)}
            className="shrink-0"
          >
            Understand My Protection Gap
          </Button>
        </div>
      </div>

      {/* Emergency Readiness & Protection Health Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emergency Readiness Widget */}
        <Card 
          title="Emergency Liquidity Readiness" 
          subtitle="Monthly burn rate hedged against income disruption"
          action={
            <Badge variant="good" size="sm">
              {emergencyReadiness.status}
            </Badge>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Monthly Expenses</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{formatINR(emergencyReadiness.monthlyExpenses)}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Current Reserve</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{formatINR(emergencyReadiness.currentReserve, true)}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Recommended</span>
                <div className="text-sm font-bold text-brand-700 mt-0.5">{formatINR(emergencyReadiness.recommendedReserve, true)}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-medium">Months Covered</span>
                <div className="text-sm font-bold text-emerald-600 mt-0.5">{emergencyReadiness.monthsCovered} months</div>
              </div>
            </div>

            {/* Liquid Allocation Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Liquid Asset Reserves
              </h4>
              <div className="space-y-2">
                {emergencyReadiness.liquidBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                    <span className="font-semibold text-slate-700">{item.source}</span>
                    <span className="font-bold text-slate-900">{formatINR(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              With <strong>6.8 months</strong> of liquidity in place, you are just ₹90K shy of the 8-month gold standard benchmark.
            </p>
          </div>
        </Card>

        {/* Protection Health Progress Summary */}
        <Card 
          title="Protection Health Summary" 
          subtitle="4-Pillar Downside Defense Framework"
        >
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Emergency Fund (6.8 / 8.0 Months)</span>
                <span className="text-brand-600 font-bold">82%</span>
              </div>
              <ProgressBar progress={82} color="brand" showLabel={false} height="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Life Cover (₹50L / ₹1.25 Cr)</span>
                <span className="text-rose-600 font-bold">40% (Critical Gap)</span>
              </div>
              <ProgressBar progress={40} color="rose" showLabel={false} height="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Health Cover (₹10L Comprehensive Floater)</span>
                <span className="text-emerald-600 font-bold">100% (Optimal)</span>
              </div>
              <ProgressBar progress={100} color="emerald" showLabel={false} height="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                <span>Debt Health (EMI 16.3% of Income)</span>
                <span className="text-amber-600 font-bold">70% (Manageable)</span>
              </div>
              <ProgressBar progress={70} color="amber" showLabel={false} height="h-2" />
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('gaps')}
              >
                View in Financial Gap Radar
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* 7-Day Visual Roadmap Modal */}
      <LifeInsuranceRoadmapModal
        isOpen={showRoadmapModal}
        onClose={() => setShowRoadmapModal(false)}
        onAskAI={onOpenAI}
      />
    </div>
  );
}
