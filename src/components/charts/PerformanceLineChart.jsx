import React, { useState } from 'react';
import { formatINR } from '../../utils/formatters';

export default function PerformanceLineChart({ 
  dataByFilter, 
  defaultFilter = '1Y',
  filterOptions = ['1M', '3M', '6M', '1Y', '3Y'],
  color = '#0D9488' // Teal brand
}) {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const data = dataByFilter[activeFilter] || dataByFilter[Object.keys(dataByFilter)[0]] || [];

  if (!data || data.length === 0) return null;

  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;
  const paddingBottom = range * 0.15;
  const effectiveMin = Math.max(0, minValue - paddingBottom);
  const effectiveRange = maxValue - effectiveMin;

  // Chart coordinates
  const width = 600;
  const height = 240;
  const padX = 40;
  const padY = 20;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const points = data.map((d, i) => {
    const x = padX + (i / (data.length - 1)) * chartW;
    const y = padY + chartH - ((d.value - effectiveMin) / effectiveRange) * chartH;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    // Smooth bezier curve control points
    const prev = points[i - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

  const [hoveredPoint, setHoveredPoint] = useState(points[points.length - 1]);

  return (
    <div>
      {/* Top Filter and Current Hover Display */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">
            {formatINR(hoveredPoint ? hoveredPoint.value : values[values.length - 1])}
          </span>
          <span className="ml-2 text-xs text-slate-500">
            {hoveredPoint ? (hoveredPoint.date || hoveredPoint.time) : ''}
          </span>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f);
                const newData = dataByFilter[f] || [];
                if (newData.length) {
                  setHoveredPoint(newData[newData.length - 1]);
                }
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart Graphic */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 select-none overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r, idx) => {
            const y = padY + chartH * (1 - r);
            return (
              <line
                key={idx}
                x1={padX}
                y1={y}
                x2={width - padX}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {/* Gradient Fill Area */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Stroke Line */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points */}
          {points.map((pt, i) => (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(pt)}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === pt ? 6 : 3}
                fill={hoveredPoint === pt ? color : '#FFFFFF'}
                stroke={color}
                strokeWidth={hoveredPoint === pt ? 3 : 2}
                className="transition-all duration-150"
              />
              <rect
                x={pt.x - 15}
                y={0}
                width="30"
                height={height}
                fill="transparent"
              />
            </g>
          ))}

          {/* X Axis labels */}
          {points.map((pt, i) => (
            <text
              key={i}
              x={pt.x}
              y={height - 5}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 font-medium"
            >
              {pt.date || pt.time}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
