import { useState } from "react";
import { cn } from "../../lib/utils";

export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isActive = focused || hasValue;

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        {Icon && (
          <Icon
            className={cn(
              "absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-200 z-10",
              focused ? "text-primary" : "text-neutral-textMuted",
              error && "text-danger"
            )}
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "w-full h-12 bg-white border rounded-lg px-4 text-sm font-sans text-neutral-textMain",
            "transition-all duration-200 outline-none",
            "placeholder-transparent",
            Icon && "pl-11",
            error
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/10"
              : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10",
            "peer"
          )}
          placeholder={label}
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none font-sans",
            Icon && "left-11",
            isActive
              ? "top-1.5 text-[10px] font-semibold text-neutral-textMuted"
              : "top-1/2 -translate-y-1/2 text-sm text-neutral-textMuted",
            focused && !error && "text-primary",
            error && "text-danger"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-danger font-medium pl-1">{error}</p>
      )}
    </div>
  );
}
