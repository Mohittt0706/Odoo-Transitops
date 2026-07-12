import { useMemo } from "react";

export default function DonutChart({ data, size = 120, thickness = 14 }) {
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
    <div className="flex items-center gap-4">
      <svg width={size} height={size} className="flex-shrink-0 -rotate-90">
        {segments.map((s, i) => (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth={thickness}
            strokeDasharray={`${s.pct * circumference} ${circumference}`}
            strokeDashoffset={-s.offset * circumference}
            className="transition-all duration-700"
          />
        ))}
      </svg>
      <div className="space-y-1.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-neutral-textMuted">{d.label}</span>
            <span className="font-semibold text-neutral-textMain ml-auto">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
