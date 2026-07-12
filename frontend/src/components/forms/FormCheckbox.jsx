import { useFormContext } from "react-hook-form";
import { cn } from "../../utils/utils";
import { Check } from "lucide-react";

export default function FormCheckbox({ name, label, description, disabled = false, className = "" }) {
  const { register, watch } = useFormContext();
  const checked = watch(name);

  return (
    <label className={cn("flex items-start gap-3 cursor-pointer group py-1", disabled && "opacity-50 cursor-not-allowed", className)}>
      <div className="relative mt-0.5">
        <input type="checkbox" {...register(name)} disabled={disabled}
          className="sr-only peer"
        />
        <div className={cn(
          "w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all duration-150",
          checked
            ? "bg-primary border-primary"
            : "border-neutral-border group-hover:border-neutral-textMuted"
        )}>
          {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
        </div>
      </div>
      <div>
        <span className="text-sm font-medium text-neutral-textMain">{label}</span>
        {description && <p className="text-xs text-neutral-textMuted mt-0.5">{description}</p>}
      </div>
    </label>
  );
}
