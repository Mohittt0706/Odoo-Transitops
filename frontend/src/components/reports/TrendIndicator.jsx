import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function TrendIndicator({ value, type = "neutral", size = "sm" }) {
  const sizeClasses = size === "sm" ? "text-[11px] px-1.5 py-0.5" : "text-xs px-2 py-1";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";

  const config = {
    up: { Icon: TrendingUp, cls: "text-success bg-success-light" },
    down: { Icon: TrendingDown, cls: "text-danger bg-danger-light" },
    neutral: { Icon: Minus, cls: "text-neutral-textMuted bg-accent-light" },
  };
  const { Icon, cls } = config[type] || config.neutral;

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn("inline-flex items-center gap-1 rounded-full font-bold", sizeClasses, cls)}
    >
      <Icon className={iconSize} strokeWidth={2.5} />
      {value}
    </motion.span>
  );
}
