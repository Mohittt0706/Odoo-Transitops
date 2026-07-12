import { cn } from "../../lib/utils";

const variants = {
  success: "bg-success-light text-success border-emerald-200/50",
  warning: "bg-warning-light text-warning border-amber-200/50",
  danger: "bg-danger-light text-danger border-red-200/50",
  info: "bg-primary-light text-primary border-blue-200/50",
  muted: "bg-accent-light text-neutral-textMuted border-slate-200/50",
  purple: "bg-purple-50 text-purple-600 border-purple-200/50",
};

export default function StatusBadge({ status, variant, className = "" }) {
  const v = variant || (status?.toLowerCase().includes("active") || status?.toLowerCase().includes("completed") || status?.toLowerCase().includes("delivered") ? "success"
    : status?.toLowerCase().includes("pending") || status?.toLowerCase().includes("in progress") || status?.toLowerCase().includes("in transit") ? "warning"
    : status?.toLowerCase().includes("cancelled") || status?.toLowerCase().includes("overdue") || status?.toLowerCase().includes("incident") ? "danger"
    : status?.toLowerCase().includes("scheduled") || status?.toLowerCase().includes("approved") ? "info"
    : "muted");

  return (
    <span className={cn("inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full border", variants[v], className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", {
        "bg-success": v === "success",
        "bg-warning": v === "warning",
        "bg-danger": v === "danger",
        "bg-primary": v === "info",
        "bg-neutral-textMuted": v === "muted",
        "bg-purple-500": v === "purple",
      })} />
      {status}
    </span>
  );
}
