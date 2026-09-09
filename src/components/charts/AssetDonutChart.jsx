import React, { useState } from 'react';
import { formatINR } from '../../utils/formatters';

export default function AssetDonutChart({ 
  data, 
  centerValue = "₹35.42L",
  centerLabel = "Total Portfolio"
}) {
  const [hovered, setHovered] = useState(null);

  // SVG donut geometry
  const size = 180;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const activeItem = hovered ? data.find(d => d.name === hovered) : null;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Centered Donut Graphic */}
      <div className="relative w-44 h-44 my-1 flex items-center justify-center shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90 transform">
          {data.map((item, idx) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((cumulativePercent / 100) * circumference);
            cumulativePercent += item.percentage;

            const isCurrentHovered = hovered === item.name;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isCurrentHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHovered(item.name)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}
        </svg>

        {/* Center Dynamic Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {activeItem ? activeItem.name : centerLabel}
          </span>
          <span className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
            {activeItem ? `${activeItem.percentage}%` : centerValue}
          </span>
          <span className="text-[11px] font-semibold text-brand-600 mt-0.5">
            {activeItem ? formatINR(activeItem.value, true) : '6 Asset Classes'}
          </span>
        </div>
      </div>

      {/* Spacious Full-Width Legend List */}
      <div className="w-full mt-3 divide-y divide-slate-100/90 border-t border-slate-100/90">
        {data.map((item, idx) => {
          const isItemHovered = hovered === item.name;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center justify-between py-2 px-2.5 rounded-xl transition-all cursor-pointer ${
                isItemHovered ? 'bg-slate-100/90 shadow-xs' : 'hover:bg-slate-50'
              }`}
            >
              {/* Dot + Asset Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs transition-transform" 
                  style={{ 
                    backgroundColor: item.color,
                    transform: isItemHovered ? 'scale(1.25)' : 'scale(1)'
                  }} 
                />
                <span className={`text-xs font-semibold truncate ${
                  isItemHovered ? 'text-slate-900 font-bold' : 'text-slate-700'
                }`}>
                  {item.name}
                </span>
              </div>

              {/* Value + Percentage Badge */}
              <div className="flex items-center gap-3 shrink-0 ml-2">
                {item.value && (
                  <span className="text-xs font-medium text-slate-400">
                    {formatINR(item.value, true)}
                  </span>
                )}
                <span className={`text-xs font-bold w-9 text-right ${
                  isItemHovered ? 'text-brand-700' : 'text-slate-900'
                }`}>
                  {item.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
