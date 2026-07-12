import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import { CheckCircle, Wrench, Fuel, Route, Shield, Clock, FileText } from "lucide-react";

const iconMap = {
  trip: Route,
  maintenance: Wrench,
  fuel: Fuel,
  insurance: Shield,
  service: Clock,
  document: FileText,
  default: CheckCircle,
};

const colorMap = {
  trip: "bg-primary-light text-primary",
  maintenance: "bg-warning-light text-warning",
  fuel: "bg-success-light text-success",
  insurance: "bg-purple-50 text-purple-600",
  service: "bg-blue-50 text-blue-600",
  document: "bg-accent-light text-neutral-textMuted",
  default: "bg-success-light text-success",
};

export default function TimelineItem({ item, index = 0, isLast = false }) {
  const Icon = iconMap[item.type] || iconMap.default;
  const color = colorMap[item.type] || colorMap.default;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", color)}>
          <Icon className="w-4 h-4" strokeWidth={2} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-neutral-border my-1" />}
      </div>

      <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-textMain">{item.title}</p>
            <p className="text-xs text-neutral-textMuted mt-0.5">{item.description}</p>
          </div>
          <span className="text-[11px] text-neutral-textMuted whitespace-nowrap ml-4">{item.date}</span>
        </div>
        {item.detail && (
          <div className="mt-2 text-xs text-neutral-textMuted bg-accent-light rounded-lg px-3 py-2">
            {item.detail}
          </div>
        )}
      </div>
    </motion.div>
  );
}
