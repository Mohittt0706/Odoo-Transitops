import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "../../lib/utils";

export default function PasswordInput({
  label = "Password",
  name,
  value,
  onChange,
  onBlur,
  error,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const hasValue = value && value.length > 0;
  const isActive = focused || hasValue;

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Lock
          className={cn(
            "absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-200 z-10",
            focused ? "text-primary" : "text-neutral-textMuted",
            error && "text-danger"
          )}
        />
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            "w-full h-12 bg-white border rounded-lg pl-11 pr-12 text-sm font-sans text-neutral-textMain",
            "transition-all duration-200 outline-none",
            "placeholder-transparent",
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
            "absolute left-11 transition-all duration-200 pointer-events-none font-sans",
            isActive
              ? "top-1.5 text-[10px] font-semibold text-neutral-textMuted"
              : "top-1/2 -translate-y-1/2 text-sm text-neutral-textMuted",
            focused && !error && "text-primary",
            error && "text-danger"
          )}
        >
          {label}
        </label>
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-textMuted hover:text-neutral-textMain transition-colors duration-200"
          tabIndex={-1}
        >
          {visible ? (
            <EyeOff className="w-[18px] h-[18px]" />
          ) : (
            <Eye className="w-[18px] h-[18px]" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-danger font-medium pl-1">{error}</p>
      )}
    </div>
  );
}
