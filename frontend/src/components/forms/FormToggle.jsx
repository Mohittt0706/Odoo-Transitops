import { useFormContext } from "react-hook-form";
import { cn } from "../../utils/utils";

export default function FormToggle({ name, label, description, disabled = false, className = "" }) {
  const { register, watch } = useFormContext();
  const checked = watch(name);

  return (
    <label className={cn("flex items-center justify-between py-2.5 border-b border-neutral-border/50 last:border-0 cursor-pointer group", disabled && "opacity-50 cursor-not-allowed", className)}>
      <div>
        <span className="text-sm font-medium text-neutral-textMain">{label}</span>
        {description && <p className="text-xs text-neutral-textMuted mt-0.5">{description}</p>}
      </div>
      <input type="checkbox" {...register(name)} disabled={disabled} className="sr-only peer" />
      <div className={cn(
        "relative w-10 h-5 rounded-full transition-all duration-200 shrink-0 ml-3",
        checked ? "bg-primary" : "bg-neutral-border"
      )}>
        <span className={cn(
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked && "translate-x-5"
        )} />
      </div>
    </label>
  );
}
