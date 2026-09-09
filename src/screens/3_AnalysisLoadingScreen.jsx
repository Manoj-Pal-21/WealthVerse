import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  HeartPulse, 
  BrainCircuit,
  ArrowRight
} from 'lucide-react';

export default function AnalysisLoadingScreen({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(15);

  const steps = [
    { label: "Benchmarking Age 34 Portfolio Glidepath (100 - Age)...", delay: 280 },
    { label: "Auditing ₹37.80L Multi-Assets (Equities, MF, Gold, FD)...", delay: 600 },
    { label: "Validating ₹10.06L Liabilities (incl. Third-Party Hand Loan)...", delay: 950 },
    { label: "Computing ₹27.74 Lakh Verified Net Worth...", delay: 1300 },
    { label: "Evaluating 80C, 80D & ₹1.25L LTCG Tax Harvesting...", delay: 1650 },
    { label: "Detecting ₹1.00 Crore Life Gap & Initializing AI Copilot...", delay: 1950 },
  ];

  useEffect(() => {
    // Step progression timers
    const timers = steps.map((step, idx) => {
      return setTimeout(() => {
        setActiveStep(idx + 1);
        setProgress(Math.min(15 + ((idx + 1) / steps.length) * 85, 100));
      }, step.delay);
    });

    // Final completion trigger at ~2100ms
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />

        {/* Pulsing Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner relative">
          <HeartPulse className="w-8 h-8 animate-pulse text-blue-600" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-5">
          Analyzing Your Financial Health
        </h2>
        <p className="text-xs text-slate-500 mt-1.5">
          Synthesizing 5 core pillars and projecting 6-month wealth trajectories...
        </p>

        {/* Smooth Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
            <span>Diagnostic Engine</span>
            <span className="text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 6 Step Checklist */}
        <div className="mt-7 text-left space-y-2.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
          {steps.map((s, idx) => {
            const isCompleted = activeStep > idx;
            const isCurrent = activeStep === idx;

            return (
              <div 
                key={idx} 
                className={`flex items-center gap-3 text-xs font-semibold transition-all duration-200 ${
                  isCompleted 
                    ? 'text-emerald-700' 
                    : isCurrent 
                      ? 'text-blue-700 font-bold' 
                      : 'text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span>{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Instant Skip Button */}
        <div className="mt-6">
          <button
            onClick={onComplete}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1"
          >
            <span>Skip animation</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
