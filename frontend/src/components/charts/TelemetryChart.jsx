import React from 'react';

export default function TelemetryChart({
  type = 'line',
  title,
  subtitle,
  data = [],
  color = 'blue'
}) {
  const colorMap = {
    blue: { stroke: '#2563EB', fill: '#EFF6FF', bar: '#2563EB' },
    green: { stroke: '#22C55E', fill: '#DCFCE7', bar: '#22C55E' },
    orange: { stroke: '#F59E0B', fill: '#FEF3C7', bar: '#F59E0B' },
    purple: { stroke: '#8B5CF6', fill: '#F5F3FF', bar: '#8B5CF6' },
    cyan: { stroke: '#06B6D4', fill: '#ECFEFF', bar: '#06B6D4' }
  };

  const activeColor = colorMap[color] || colorMap.blue;

  // Chart coordinate parameters
  const width = 450;
  const height = 200;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = Math.max(...data.map(d => d.value), 1);
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Coordinates mapping
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * chartWidth;
    const y = height - paddingY - (d.value / maxVal) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  const pathD = points.length > 0 
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  const areaD = points.length > 0 
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
        {type === 'line' && points.length > 0 && (
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            {/* Gridlines */}
            <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#F8FAFC" strokeWidth="1" />
            <line x1={paddingX} y1={paddingY + chartHeight / 2} x2={width - paddingX} y2={paddingY + chartHeight / 2} stroke="#F8FAFC" strokeWidth="1" />
            <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#E2E8F0" strokeWidth="1" />

            {/* Area */}
            <path d={areaD} fill={activeColor.fill} opacity="0.8" />
            {/* Path */}
            <path d={pathD} fill="none" stroke={activeColor.stroke} strokeWidth="2" strokeLinecap="round" />

            {/* Circles and labels */}
            {points.map((p, idx) => (
              <g key={idx}>
                <circle cx={p.x} cy={p.y} r="3" fill="#FFFFFF" stroke={activeColor.stroke} strokeWidth="1.5" />
                <text x={p.x} y={height - 10} textAnchor="middle" className="text-[9px] font-bold fill-slate-400 font-headings">
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
