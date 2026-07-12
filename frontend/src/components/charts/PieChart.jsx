import { useMemo } from "react";

export default function DonutChart({ data, size = 128, thickness = 14, showTotal = true }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = useMemo(() => {
    return data.reduce(
      (acc, d) => {
        const pct = d.value / total;
        return {
          items: [...acc.items, { ...d, pct, offset: acc.offset }],
          offset: acc.offset + pct,
        };
      },
      { items: [], offset: 0 }
    ).items;
  }, [data, total]);

  return (
    <div className="flex items-center gap-5">
      {/* Donut with center KPI */}
      <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={thickness}
          />
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${s.pct * circumference} ${circumference}`}
              strokeDashoffset={-s.offset * circumference}
              className="transition-all duration-700"
            />
          ))}
        </svg>
        {/* Center KPI text */}
        {showTotal && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold text-neutral-textMain tabular-nums leading-none">
              {total}
            </span>
            <span className="text-[9px] font-semibold text-neutral-textMuted uppercase tracking-wide mt-0.5">
              Total
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-[12px] text-neutral-textMuted">{d.label}</span>
            <span className="text-[12px] font-bold text-neutral-textMain ml-auto tabular-nums">
              {d.value}
            </span>
            <span className="text-[10px] text-neutral-textMuted">
              ({Math.round((d.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
