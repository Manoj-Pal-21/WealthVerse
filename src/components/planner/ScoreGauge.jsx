import React from 'react';

export default function ScoreGauge({ score = 78, maxScore = 100, status = "Good", size = 200, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc angle: 260 degrees arc for a speedo-style circular gauge
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (score / maxScore) * arcLength;

  // Color mapping based on score
  const getColors = (val) => {
    if (val >= 85) return { stroke: "#10B981", bg: "#D1FAE5", text: "text-emerald-600", badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    if (val >= 70) return { stroke: "#2563EB", bg: "#DBEAFE", text: "text-blue-600", badgeBg: "bg-blue-50 text-blue-700 border-blue-200" };
    if (val >= 50) return { stroke: "#F59E0B", bg: "#FEF3C7", text: "text-amber-600", badgeBg: "bg-amber-50 text-amber-700 border-amber-200" };
    return { stroke: "#EF4444", bg: "#FEE2E2", text: "text-rose-600", badgeBg: "bg-rose-50 text-rose-700 border-rose-200" };
  };

  const colors = getColors(score);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-[135deg]"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Track Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Active Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {score}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
            out of {maxScore}
          </span>
          <div className={`mt-2 px-3 py-0.5 rounded-full text-xs font-bold border ${colors.badgeBg}`}>
            {status}
          </div>
        </div>
      </div>
      
      <p className="text-xs text-slate-500 mt-2 font-medium">
        Financial Health Score
      </p>
    </div>
  );
}
