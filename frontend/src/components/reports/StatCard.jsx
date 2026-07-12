import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

function MiniSparkline({ data = [], color = "#1E3A5F" }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "bg-primary/10 text-primary",
  change,
  changeType = "neutral",
  sparklineData,
  delay = 0,
  onClick,
  className,
}) {
  const trendColors = {
    up: "text-success bg-success-light",
    down: "text-danger bg-danger-light",
    neutral: "text-neutral-textMuted bg-accent-light",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className={cn(
        "bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 group",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-neutral-textMuted uppercase tracking-widest">{title}</p>
          <p className="text-[24px] font-extrabold text-neutral-textMain tracking-tight leading-none mt-1 tabular-nums">
            {value}
          </p>
          {subtitle && (
            <p className="text-[11px] text-neutral-textMuted mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110", color)}>
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        {sparklineData && <MiniSparkline data={sparklineData} />}
        {change && (
          <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold", trendColors[changeType])}>
            {change}
          </span>
        )}
      </div>
    </motion.div>
  );
}
