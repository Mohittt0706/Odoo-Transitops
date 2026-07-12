import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { cn } from "../../utils/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

function AnimatedNumber({ value }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => {
    // Handle values with currency prefix like ₹12.4L
    if (typeof value === "string") return value;
    return Math.round(v).toLocaleString();
  });

  useEffect(() => {
    if (typeof value === "number") {
      const controls = animate(motionVal, value, { duration: 0.9, ease: "easeOut" });
      return controls.stop;
    }
  }, [value]);

  if (typeof value === "string") return <>{value}</>;
  return <motion.span>{rounded}</motion.span>;
}

export default function KPICard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  color = "bg-primary/10 text-primary",
  delay = 0,
}) {
  const trendConfig = {
    up:      { Icon: TrendingUp,   cls: "text-success",          bg: "bg-success-light" },
    down:    { Icon: TrendingDown, cls: "text-danger",           bg: "bg-danger-light"  },
    neutral: { Icon: Minus,        cls: "text-neutral-textMuted", bg: "bg-neutral-muted" },
  };
  const trend = trendConfig[changeType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      className="bg-white border border-neutral-border rounded-lg p-4 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-neutral-textMuted uppercase tracking-widest mb-2">
            {title}
          </p>
          <p className="text-[26px] font-extrabold text-neutral-textMain tracking-tight leading-none tabular-nums">
            <AnimatedNumber value={value} />
          </p>
          {change !== undefined && (
            <div className={cn("inline-flex items-center gap-1 mt-2.5 px-2 py-0.5 rounded-full", trend.bg)}>
              <trend.Icon className={cn("w-3 h-3", trend.cls)} strokeWidth={2.5} />
              <span className={cn("text-[11px] font-bold", trend.cls)}>
                {change}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110", color)}>
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
