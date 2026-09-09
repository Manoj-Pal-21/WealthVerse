import React from 'react';
import { TrendingUp, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

export default function ProjectedChart({
  currentScore = 78,
  projectedScore = 87,
  timeline = [
    { month: "Current", score: 78, note: "Today" },
    { month: "Month 1", score: 80, note: "Start ₹30K emergency" },
    { month: "Month 2", score: 82, note: "Pay credit card" },
    { month: "Month 3", score: 84, note: "Buffer reaches ₹2.1L" },
    { month: "Month 4", score: 85, note: "Credit util < 35%" },
    { month: "Month 6", score: 87, note: "Goal ₹3.0L Achieved" },
  ],
  projectedMetrics = {
    emergencyFund: { current: "₹1.2L", projected: "₹3.0L", months: "1.3 mo ➔ 3.2 mo" },
    creditUtilization: { current: "60%", projected: "29%", status: "Healthy (<30%)" },
    monthlyInvestment: { current: "₹20K", projected: "₹25K", gain: "+₹5,000/mo" }
  }
}) {
  // Chart dimensions for SVG
  const width = 600;
  const height = 180;
  const paddingX = 40;
  const paddingY = 30;

  const minScore = 70;
  const maxScore = 92;

  // Calculate points for the smooth line
  const points = timeline.map((item, index) => {
    const x = paddingX + (index / (timeline.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((item.score - minScore) / (maxScore - minScore)) * (height - paddingY * 2);
    return { x, y, ...item };
  });

  // Construct SVG Path
  const pathData = points.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, '');

  // Fill area under curve
  const areaData = `${pathData} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Projected Financial Health (6-Month Trajectory)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Expected score growth based on executing your personalized action plan.
          </p>
        </div>

        {/* Score delta pill */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-400 block uppercase">Current</span>
            <span className="text-xl font-extrabold text-blue-600">{currentScore}</span>
          </div>
          <span className="text-slate-300 font-bold text-xl">➔</span>
          <div>
            <span className="text-xs font-semibold text-emerald-600 block uppercase">Projected</span>
            <span className="text-xl font-extrabold text-emerald-600">{projectedScore}</span>
          </div>
          <div className="ml-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
            +9 Pts
          </div>
        </div>
      </div>

      {/* SVG Trajectory Chart */}
      <div className="w-full overflow-x-auto py-4">
        <div className="min-w-[500px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[75, 80, 85, 90].map((gridVal) => {
              const y = height - paddingY - ((gridVal - minScore) / (maxScore - minScore)) * (height - paddingY * 2);
              return (
                <g key={gridVal}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#F1F5F9"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text x={paddingX - 10} y={y + 3} textAnchor="end" fill="#94A3B8" fontSize="10" fontWeight="500">
                    {gridVal}
                  </text>
                </g>
              );
            })}

            {/* Area under curve */}
            <path d={areaData} fill="url(#scoreGradient)" />

            {/* Line */}
            <path
              d={pathData}
              fill="none"
              stroke="#2563EB"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {points.map((pt, i) => {
              const isFirst = i === 0;
              const isLast = i === points.length - 1;
              return (
                <g key={i} className="group cursor-pointer">
                  {/* Outer ring */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isLast ? "7" : "5"}
                    fill={isLast ? "#10B981" : isFirst ? "#2563EB" : "#3B82F6"}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="transition-all duration-200 group-hover:r-8 shadow-sm"
                  />

                  {/* Value badge on top */}
                  <text
                    x={pt.x}
                    y={pt.y - 12}
                    textAnchor="middle"
                    fill={isLast ? "#059669" : "#1E293B"}
                    fontSize="12"
                    fontWeight={isLast || isFirst ? "800" : "600"}
                  >
                    {pt.score}
                  </text>

                  {/* X-axis Month label */}
                  <text
                    x={pt.x}
                    y={height - 8}
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {pt.month}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 3 Target Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 pt-4 border-t border-slate-100">
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Emergency Fund
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-base font-extrabold text-slate-900">
                {projectedMetrics.emergencyFund.current} ➔ {projectedMetrics.emergencyFund.projected}
              </span>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
              {projectedMetrics.emergencyFund.months}
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Credit Card Utilization
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-base font-extrabold text-slate-900">
                {projectedMetrics.creditUtilization.current} ➔ {projectedMetrics.creditUtilization.projected}
              </span>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
              Optimal (&lt; 30%)
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Monthly Investment
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-base font-extrabold text-slate-900">
                {projectedMetrics.monthlyInvestment.current} ➔ {projectedMetrics.monthlyInvestment.projected}
              </span>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
              {projectedMetrics.monthlyInvestment.gain}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
