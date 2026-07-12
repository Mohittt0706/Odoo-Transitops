import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Checkbox({
  label,
  checked,
  onChange,
  className = "",
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-2.5 cursor-pointer group select-none",
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div
          className={cn(
            "w-[18px] h-[18px] rounded-[5px] border-2 transition-all duration-200",
            "flex items-center justify-center",
            checked
              ? "bg-primary border-primary"
              : "border-neutral-border group-hover:border-neutral-textMuted"
          )}
        >
          {checked && (
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          )}
        </div>
      </div>
      <span className="text-sm text-neutral-textMuted font-sans">{label}</span>
    </label>
  );
}
