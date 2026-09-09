import React from 'react';

export default function ProjectionChart({ 
  timeline, 
  showOptimized = true 
}) {
  if (!timeline || timeline.length === 0) return null;

  const width = 600;
  const height = 220;
  const padX = 40;
  const padY = 25;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const maxVal = 220; // 2.2 Cr scale

  const getPt = (val, idx) => ({
    x: padX + (idx / (timeline.length - 1)) * chartW,
    y: padY + chartH - (val / maxVal) * chartH
  });

  const curPoints = timeline.map((d, i) => getPt(d.currentTrajectory, i));
  const optPoints = timeline.map((d, i) => getPt(d.optimizedTrajectory, i));
  const targetPoints = timeline.map((d, i) => getPt(d.targetLine, i));

  const toSvgPath = (points) => {
    return points.reduce((acc, pt, i) => {
      if (i === 0) return `M ${pt.x} ${pt.y}`;
      const prev = points[i - 1];
      const cpx = prev.x + (pt.x - prev.x) / 2;
      return `${acc} C ${cpx} ${prev.y}, ${cpx} ${pt.y}, ${pt.x} ${pt.y}`;
    }, '');
  };

  const curPath = toSvgPath(curPoints);
  const optPath = toSvgPath(optPoints);
  const targetPath = toSvgPath(targetPoints);

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs mb-3 text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-slate-400" />
          <span className="text-[11px]">Current Trajectory (₹1.42 Cr)</span>
        </div>
        {showOptimized && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-brand-600 rounded-full" />
            <span className="text-[11px] font-semibold text-brand-700">Recommended Trajectory (₹2.04 Cr)</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500" />
          <span className="text-[11px] text-amber-700">Target Line (₹2.00 Cr)</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 select-none">
          {/* Target Dashed Line */}
          <path
            d={targetPath}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Current Trajectory (Gray) */}
          <path
            d={curPath}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
          />

          {/* Optimized Trajectory (Teal) */}
          {showOptimized && (
            <path
              d={optPath}
              fill="none"
              stroke="#0D9488"
              strokeWidth="3"
            />
          )}

          {/* Points */}
          {curPoints.map((pt, i) => (
            <circle key={`cur-${i}`} cx={pt.x} cy={pt.y} r={3} fill="#94A3B8" />
          ))}

          {showOptimized && optPoints.map((pt, i) => (
            <circle key={`opt-${i}`} cx={pt.x} cy={pt.y} r={4} fill="#0D9488" stroke="#FFFFFF" strokeWidth={2} />
          ))}

          {/* X Axis Labels */}
          {timeline.map((d, i) => {
            const x = padX + (i / (timeline.length - 1)) * chartW;
            return (
              <text
                key={i}
                x={x}
                y={height - 5}
                textAnchor="middle"
                className="text-[10px] fill-slate-400 font-medium"
              >
                {d.age}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
