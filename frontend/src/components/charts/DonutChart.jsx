import React from 'react';

export default function DonutChart({ title, subtitle, data = [], size = 160 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = 55;
  const strokeWidth = 16;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      {title && (
        <div className="text-center">
          <h4 className="font-headings font-bold text-xs text-slate-800">{title}</h4>
          {subtitle && <span className="text-[10px] text-slate-400 font-semibold">{subtitle}</span>}
        </div>
      )}
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
          {data.map((d, i) => {
            const percent = d.value / total;
            const dashLength = circumference * percent;
            const dashOffset = circumference * cumulativePercent;
            cumulativePercent += percent;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={-dashOffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-900 font-headings">{total}</span>
          <span className="text-[9px] text-slate-400 font-bold uppercase">Total</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[10px] font-bold text-slate-600">
              {d.label} ({d.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
