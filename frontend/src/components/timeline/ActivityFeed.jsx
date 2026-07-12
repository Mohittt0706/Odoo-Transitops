import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import { Truck, Wrench, Fuel, Route, UserCheck, Clock } from "lucide-react";

const typeIcons = {
  trip: Route,
  maintenance: Wrench,
  fuel: Fuel,
  assignment: UserCheck,
  default: Truck,
};

const typeColors = {
  trip: "bg-primary-light text-primary",
  maintenance: "bg-warning-light text-warning",
  fuel: "bg-success-light text-success",
  assignment: "bg-purple-50 text-purple-600",
  default: "bg-accent-light text-neutral-textMuted",
};

export default function ActivityFeed({ activities }) {
  return (
    <div className="space-y-1">
      {activities.map((activity, i) => {
        const Icon = typeIcons[activity.type] || typeIcons.default;
        const color = typeColors[activity.type] || typeColors.default;

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-accent-light/50 rounded-lg transition-colors cursor-pointer"
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", color)}>
              <Icon className="w-4 h-4" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-textMain truncate">{activity.action}</p>
              <p className="text-[11px] text-neutral-textMuted truncate">{activity.vehicle} — {activity.detail}</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-neutral-textMuted flex-shrink-0">
              <Clock className="w-3 h-3" />
              {activity.time}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
