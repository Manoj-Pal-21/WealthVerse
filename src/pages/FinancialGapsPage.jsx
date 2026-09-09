import React, { useState } from 'react';
import { 
  Radar, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  HelpCircle,
  Clock,
  HeartHandshake
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressBar from '../components/common/ProgressBar';
import Modal from '../components/common/Modal';
import LifeInsuranceRoadmapModal from '../components/roadmap/LifeInsuranceRoadmapModal';
import { 
  financialReadiness, 
  gapCategories, 
  priorityGaps, 
  aiPriorityPlan 
} from '../data/gapsData';
import { formatINR } from '../utils/formatters';

export default function FinancialGapsPage({ onOpenAI, onNavigate }) {
  const [selectedGapForModal, setSelectedGapForModal] = useState(null);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);

  const getStatusBadge = (statusType) => {
    switch(statusType) {
      case 'danger': return <Badge variant="danger" size="sm">High Priority</Badge>;
      case 'warning': return <Badge variant="warning" size="sm">Needs Attention</Badge>;
      default: return <Badge variant="good" size="sm">Good</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Signature Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Financial Gap Radar</h1>
            <Badge variant="brand" size="sm">
              Core Differentiator
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            We don't just track your wealth. We find the vulnerabilities that could impact your future.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setShowRoadmapModal(true)}
          icon={Sparkles}
          className="shadow-md shadow-brand-600/20"
        >
          Ask 360° AI what I should fix first
        </Button>
      </div>

      {/* Top Banner: Large Score + Total Estimated Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Circular Readiness Score Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-card flex flex-col items-center justify-center text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Aggregate Financial Readiness
          </p>

          <div className="relative w-36 h-36 flex items-center justify-center my-2">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-600"
                strokeDasharray="72, 100"
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900 tracking-tight">72</span>
              <span className="text-xs text-slate-400 font-semibold uppercase">/ 100</span>
            </div>
          </div>

          <div className="mt-2">
            <Badge variant="good" size="md">
              Readiness Status: Good
            </Badge>
            <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
              Based on live audit of liabilities, savings rate, emergency hedge, and family estate readiness.
            </p>
          </div>
        </div>

        {/* Total Estimated Gap Banner (2 cols) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl p-7 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Unhedged Exposure Detected
              </span>
            </div>

            <div className="mt-3">
              <p className="text-xs text-slate-400 font-medium">Total Estimated Financial Gap</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
                {formatINR(financialReadiness.totalEstimatedGap)}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-xl leading-relaxed">
              {financialReadiness.description} Closing these gaps will elevate your Financial Readiness score to <strong className="text-brand-300">92/100</strong>.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span><strong>2 Critical</strong> (Insurance, Estate)</span>
              <span>•</span>
              <span><strong>1 Medium</strong> (Retirement)</span>
              <span>•</span>
              <span><strong>3 Optimized</strong></span>
            </div>

            <button
              onClick={() => onOpenAI("What should I fix first?")}
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md"
            >
              <span>Generate Action Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 6 Gap Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              6 Core Vulnerability Vectors
            </h3>
            <p className="text-xs text-slate-500">
              Categorical risk scores calibrated against Indian private wealth benchmarks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gapCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{cat.name}</h4>
                  {getStatusBadge(cat.statusType)}
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{cat.score}</span>
                    <span className="text-xs text-slate-400 font-semibold"> / 100</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-medium">Gap Amount</span>
                    <div className="text-xs font-bold text-rose-600">{cat.gapAmount}</div>
                  </div>
                </div>

                <ProgressBar
                  progress={cat.score}
                  color={cat.statusType === 'danger' ? 'rose' : cat.statusType === 'warning' ? 'amber' : 'brand'}
                  showLabel={false}
                  className="mt-2"
                />

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {cat.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Current: <strong>{cat.current}</strong></span>
                <button
                  onClick={() => setSelectedGapForModal(cat)}
                  className="font-semibold text-brand-700 hover:text-brand-800 transition-colors"
                >
                  Analyze &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highest Priority Deep-Dives (Insurance & Retirement) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insurance Gap Deep-Dive */}
        <Card 
          title="Highest Priority: Life Insurance Gap" 
          subtitle="Family income protection and liability clearance"
          action={
            <Badge variant="danger" size="sm">
              Critical Shortfall
            </Badge>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-rose-50/60 border border-rose-100">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-medium">Current Cover</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">₹50.0 Lakhs</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-medium">Required</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">₹1.25 Crore</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-rose-600 uppercase font-bold">Shortfall</span>
                <div className="text-sm font-extrabold text-rose-700 mt-0.5">₹75.0 Lakhs</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Why this matters:</strong> Your current ₹50L term policy does not fully cover your ₹8.56L outstanding liabilities and 15 years of family living expenses in an untimely event.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">Recommended Remedy:</span> Acquire an additional ₹75L - ₹1Cr pure term insurance policy with critical illness rider. Estimated premium: ~₹1,200/month.
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('protection')}
              >
                Go to Protection
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowRoadmapModal(true)}
                icon={Sparkles}
              >
                View Visual Roadmap
              </Button>
            </div>
          </div>
        </Card>

        {/* Retirement Gap Deep-Dive */}
        <Card 
          title="Retirement Wealth Gap" 
          subtitle="Target corpus projection analysis at age 60"
          action={
            <Badge variant="warning" size="sm">
              ₹58L Shortfall
            </Badge>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-100">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-medium">Current Proj.</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">₹1.42 Crore</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-medium">Goal Target</span>
                <div className="text-sm font-bold text-slate-900 mt-0.5">₹2.00 Crore</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-amber-600 uppercase font-bold">Shortfall</span>
                <div className="text-sm font-extrabold text-amber-700 mt-0.5">₹58.0 Lakhs</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Retirement Corpus Target Progress</span>
                <span className="text-brand-600 font-bold">71%</span>
              </div>
              <ProgressBar progress={71} color="amber" showLabel={false} height="h-2.5" />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Actionable Guidance:</strong> Increasing your monthly SIP from ₹32,000 to approximately <strong>₹44,000</strong> (or applying an automatic 10% annual step-up) will completely bridge this ₹58L shortfall.
            </p>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('goals')}
              >
                Open Goals Simulator
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenAI("Am I on track for retirement?")}
                icon={Sparkles}
              >
                Simulate Projection
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Priority Plan: Ordered 1 to 4 Step Roadmap */}
      <Card 
        title="360° AI Priority Remediation Plan" 
        subtitle="Ordered sequential actions designed to maximize net financial security"
        action={
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            <Compass className="w-4 h-4 animate-pulse-subtle" />
            <span>Optimal Sequence</span>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiPriorityPlan.map((step) => (
            <div 
              key={step.step}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {step.step}
                  </span>
                  <Badge variant={step.status === 'Action Required' ? 'danger' : 'brand'} size="sm">
                    {step.status}
                  </Badge>
                </div>

                <h4 className="text-xs font-bold text-slate-900 mt-2.5 leading-snug">
                  {step.title}
                </h4>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-emerald-700">{step.impact}</span>
                <button
                  onClick={() => onNavigate(step.targetPage)}
                  className="text-brand-600 hover:text-brand-800 font-bold text-xs inline-flex items-center gap-0.5"
                >
                  <span>Fix</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Gap Drill-Down Modal */}
      {selectedGapForModal && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedGapForModal(null)}
          title={`Gap Diagnostic: ${selectedGapForModal.name}`}
          subtitle={`Current Health Score: ${selectedGapForModal.score}/100`}
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Current Metric</span>
                <div className="text-sm font-bold text-slate-900">{selectedGapForModal.current}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Recommended Target</span>
                <div className="text-sm font-bold text-brand-700">{selectedGapForModal.target}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Calculated Gap</span>
                <div className="text-sm font-bold text-rose-600">{selectedGapForModal.gapAmount}</div>
              </div>
            </div>

            <p className="leading-relaxed">
              {selectedGapForModal.summary}
            </p>

            <div className="p-3 rounded-xl bg-brand-50 border border-brand-200 text-brand-900 leading-relaxed">
              <strong>360° AI Assessment:</strong> Addressing this item protects your wealth accumulation trajectory from catastrophic drawdowns or unexpected family succession delays.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedGapForModal(null)}>
                Dismiss
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const q = `How do I fix my ${selectedGapForModal.name} gap?`;
                  setSelectedGapForModal(null);
                  onOpenAI(q);
                }}
              >
                Ask Copilot for Fix
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* 7-Day Visual Roadmap Modal */}
      <LifeInsuranceRoadmapModal
        isOpen={showRoadmapModal}
        onClose={() => setShowRoadmapModal(false)}
        onAskAI={onOpenAI}
      />
    </div>
  );
}
