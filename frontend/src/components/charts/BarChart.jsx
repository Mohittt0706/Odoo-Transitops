import React from 'react';

export default function BarChart({ title, subtitle, data = [], color = 'blue', height = 200 }) {
  const colorMap = {
    blue: { bar: '#2563EB', bg: '#EFF6FF' },
    green: { bar: '#22C55E', bg: '#DCFCE7' },
    orange: { bar: '#F59E0B', bg: '#FEF3C7' },
    purple: { bar: '#8B5CF6', bg: '#F5F3FF' },
    cyan: { bar: '#06B6D4', bg: '#ECFEFF' },
  };

  const activeColor = colorMap[color] || colorMap.blue;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const width = 450;
  const paddingX = 40;
  const paddingY = 20;
  const chartHeight = height - paddingY * 2;
  const barWidth = Math.max(((width - paddingX * 2) / data.length) * 0.6, 8);
  const gap = ((width - paddingX * 2) / data.length) * 0.4;

  return (
    <div className="flex flex-col gap-2 w-full">
      {title && (
        <div>
          <h4 className="font-headings font-bold text-xs text-slate-800">{title}</h4>
          {subtitle && <span className="text-[10px] text-slate-400 font-semibold">{subtitle}</span>}
        </div>
      )}
      <div className="relative w-full flex justify-center py-1">
        {data.length > 0 && (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#E2E8F0" strokeWidth="1" />
            <line x1={paddingX} y1={paddingY + chartHeight / 2} x2={width - paddingX} y2={paddingY + chartHeight / 2} stroke="#F8FAFC" strokeWidth="1" />
            <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#F8FAFC" strokeWidth="1" />

            {data.map((d, i) => {
              const x = paddingX + i * ((width - paddingX * 2) / data.length) + gap / 2;
              const barH = (d.value / maxVal) * chartHeight;
              const y = height - paddingY - barH;
              return (
                <g key={i}>
                  <rect x={x} y={y} width={barWidth} height={barH} rx="3" fill={activeColor.bar} opacity="0.85" />
                  <rect x={x} y={y} width={barWidth} height={barH} rx="3" fill="white" opacity="0.15" />
                  <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" className="text-[8px] font-bold fill-slate-400 font-headings">
                    {d.label}
                  </text>
                  <text x={x + barWidth / 2} y={y - 4} textAnchor="middle" className="text-[7px] font-bold fill-slate-500 font-headings">
                    {d.value}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
