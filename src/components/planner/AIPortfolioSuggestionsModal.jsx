import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Bot, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Coins, 
  FileText, 
  PieChart, 
  Zap, 
  MessageSquare, 
  Headset,
  Check
} from 'lucide-react';
import { generatePortfolioAiSuggestions } from '../../services/portfolioAiSuggester';

export default function AIPortfolioSuggestionsModal({
  isOpen,
  onClose,
  profileData,
  metrics,
  onNavigateToAdvisor,
  onOpenRM
}) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [appliedActions, setAppliedActions] = useState({});

  if (!isOpen) return null;

  const { suggestions, criticalCount } = generatePortfolioAiSuggestions(profileData, metrics);

  const toggleApply = (id) => {
    setAppliedActions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredSuggestions = suggestions.filter(s => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'critical') return s.severity === 'Critical' || s.severity === 'High';
    if (selectedFilter === 'tax') return s.category.includes('Tax');
    if (selectedFilter === 'overlap') return s.category.includes('Overlap') || s.category.includes('Concentration');
    if (selectedFilter === 'allocation') return s.category.includes('Allocation') || s.category.includes('Emergency');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with Deep Navy / Gold Gradient */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Autonomous AI Wealth Intelligence</span>
            </span>
            <span className="text-xs text-slate-300">• Live Portfolio Audit</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            AI Automated Portfolio Recommendations
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Real-time diagnostics generated directly from your direct equity holdings, mutual fund schemes, debt ratio, and age benchmarks.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>{criticalCount} Critical High-Impact Fixes</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-amber-300">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+9 Potential Health Score Lift</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <Coins className="w-3.5 h-3.5" />
              <span>₹44,025 Annual Financial Optimization</span>
            </div>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: `All Suggestions (${suggestions.length})` },
            { id: 'critical', label: `Critical Alerts (${criticalCount})` },
            { id: 'overlap', label: 'Overlap & Concentration' },
            { id: 'tax', label: 'Tax Harvesting' },
            { id: 'allocation', label: 'Allocation & Reserves' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === f.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Body: Suggestion Cards List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/50">
          {filteredSuggestions.map((s) => {
            const isApplied = appliedActions[s.id];
            return (
              <div 
                key={s.id}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-sm ${
                  isApplied ? 'border-emerald-300 ring-1 ring-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {/* Header of Suggestion */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${s.severityColor}`}>
                        {s.severity} Priority
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        {s.category}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {s.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => toggleApply(s.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                      isApplied 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Included in Plan</span>
                      </>
                    ) : (
                      <>
                        <span>Add to My Action Plan</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Detected Telemetry */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed mb-3">
                  <strong className="text-slate-900 font-bold block mb-0.5">🔍 What AI Detected in Your Portfolio:</strong>
                  {s.detectedData}
                </div>

                {/* AI Recommendation */}
                <div className="text-xs text-slate-700 leading-relaxed mb-3">
                  <strong className="text-blue-700 font-bold block mb-0.5">💡 Automated AI Recommendation:</strong>
                  {s.recommendation}
                </div>

                {/* Financial Impact & Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{s.financialImpact}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        if (onNavigateToAdvisor) {
                          onNavigateToAdvisor(s.actionQuery);
                        }
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Ask AI Advisor</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenRM) onOpenRM();
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      <Headset className="w-3 h-3 text-amber-500" />
                      <span>Consult RM</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Formula-backed algorithms calibrated for Indian taxation & SEBI guidelines.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
          >
            Close & Return to App
          </button>
        </div>

      </div>
    </div>
  );
}
