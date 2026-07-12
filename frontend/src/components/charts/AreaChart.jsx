import React from 'react';

export default function AreaChart({ title, subtitle, data = [], color = 'blue', height = 200 }) {
  const colorMap = {
    blue: { stroke: '#2563EB', fill: '#EFF6FF' },
    green: { stroke: '#22C55E', fill: '#DCFCE7' },
    orange: { stroke: '#F59E0B', fill: '#FEF3C7' },
    purple: { stroke: '#8B5CF6', fill: '#F5F3FF' },
    cyan: { stroke: '#06B6D4', fill: '#ECFEFF' },
  };

  const activeColor = colorMap[color] || colorMap.blue;
  const width = 450;
  const paddingX = 40;
  const paddingY = 20;
  const chartHeight = height - paddingY * 2;
  const chartWidth = width - paddingX * 2;
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  const points = data.map((d, i) => ({
    x: paddingX + (i / (data.length - 1 || 1)) * chartWidth,
    y: height - paddingY - (d.value / maxVal) * chartHeight,
    label: d.label,
    value: d.value,
  }));

  const pathD =
    points.length > 0
      ? `M ${points[0].x} ${points[0].y} ` +
        points
          .slice(1)
          .map((p) => {
            const prev = points[points.indexOf(p) - 1];
            const cpx1 = prev.x + (p.x - prev.x) * 0.4;
            const cpx2 = prev.x + (p.x - prev.x) * 0.6;
            return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
          })
          .join(' ')
      : '';

  const areaD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
      : '';

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
            <defs>
              <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={activeColor.stroke} stopOpacity="0.2" />
                <stop offset="100%" stopColor={activeColor.stroke} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#F8FAFC" strokeWidth="1" />
            <line x1={paddingX} y1={paddingY + chartHeight / 2} x2={width - paddingX} y2={paddingY + chartHeight / 2} stroke="#F8FAFC" strokeWidth="1" />
            <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#E2E8F0" strokeWidth="1" />

            <path d={areaD} fill={`url(#grad-${color})`} />
            <path d={pathD} fill="none" stroke={activeColor.stroke} strokeWidth="2" strokeLinecap="round" />

            {points.map((p, idx) => (
              <g key={idx}>
                <circle cx={p.x} cy={p.y} r="3" fill="#FFFFFF" stroke={activeColor.stroke} strokeWidth="1.5" />
                <text x={p.x} y={height - 8} textAnchor="middle" className="text-[8px] font-bold fill-slate-400 font-headings">
                  {p.label}
                </text>
              </g>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
