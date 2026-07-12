import { motion } from "framer-motion";
import { useMemo } from "react";

export default function AreaChart({ data, height = 160, color = "#059669", gradient = true }) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const W = 300;
  const H = height - 24;
  const pad = 20;

  const points = useMemo(() =>
    data.map((d, i) => ({
      x: pad + (i / (data.length - 1)) * (W - pad * 2),
      y: H - ((d.value - min) / range) * (H - pad),
      label: d.label,
      value: d.value,
    })),
    [data, H, min, range]
  );

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;

  const gradientId = `area-grad-${color.replace("#", "")}`;

  return (
    <div className="relative" style={{ height }}>
      <svg
        viewBox={`0 0 ${W} ${H + 24}`}
        className="w-full h-full overflow-visible"
        aria-label="Area chart"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          <clipPath id={`clip-${gradientId}`}>
            <motion.rect
              x="0"
              y="0"
              height={H + 24}
              initial={{ width: 0 }}
              animate={{ width: W }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </clipPath>
        </defs>

        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t, i) => (
          <line
            key={i}
            x1={pad}
            x2={W - pad}
            y1={H - t * (H - pad)}
            y2={H - t * (H - pad)}
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area fill */}
        {gradient && (
          <motion.path
            d={areaPath}
            fill={`url(#${gradientId})`}
            clipPath={`url(#clip-${gradientId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )}

        {/* Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath={`url(#clip-${gradientId})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i} className="group cursor-pointer">
            <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="white"
              stroke={color}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.04 }}
            />
            <text
              x={p.x}
              y={H + 16}
              textAnchor="middle"
              fontSize="9"
              fill="#64748B"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontWeight="500"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
