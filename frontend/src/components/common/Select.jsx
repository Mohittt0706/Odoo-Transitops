import { useState } from "react";
import { cn } from "../../utils/utils";
import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  error,
  className,
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isActive = focused || hasValue;

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full h-12 bg-white border rounded-lg px-4 text-sm text-neutral-textMain appearance-none outline-none cursor-pointer",
            "transition-all duration-200",
            error
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/10"
              : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10",
            isActive ? "pt-5 pb-1" : ""
          )}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => {
            const optValue = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;
            return <option key={optValue} value={optValue}>{optLabel}</option>;
          })}
        </select>
        <label className={cn(
          "absolute left-4 transition-all duration-200 pointer-events-none",
          isActive
            ? "top-1.5 text-[10px] font-semibold text-neutral-textMuted"
            : "top-1/2 -translate-y-1/2 text-sm text-neutral-textMuted",
          focused && !error && "text-primary",
          error && "text-danger"
        )}>
          {label}
        </label>
        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted pointer-events-none" />
      </div>
      {error && <p className="mt-1.5 text-xs text-danger font-medium pl-1">{error}</p>}
    </div>
  );
}
