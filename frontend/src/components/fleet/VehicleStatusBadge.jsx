import { cn } from "../../lib/utils";

const statusConfig = {
  Active: "bg-success-light text-success border-emerald-200/50",
  "In Maintenance": "bg-warning-light text-warning border-amber-200/50",
  Inactive: "bg-accent-light text-neutral-textMuted border-slate-200/50",
  "On Trip": "bg-primary-light text-primary border-blue-200/50",
  Retired: "bg-danger-light text-danger border-red-200/50",
  Available: "bg-success-light text-success border-emerald-200/50",
};

export default function VehicleStatusBadge({ status, className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full border",
        statusConfig[status] || statusConfig.Inactive,
        className
      )}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full mr-1.5", {
          "bg-success": status === "Active" || status === "Available",
          "bg-warning": status === "In Maintenance",
          "bg-neutral-textMuted": status === "Inactive" || status === "Retired",
          "bg-primary": status === "On Trip",
        })}
      />
      {status}
    </span>
  );
}
