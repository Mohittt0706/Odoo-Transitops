import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

export default function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  disabled = false,
  className = "",
  helpText,
}) {
  const { register, formState: { errors, touchedFields } } = useFormContext();
  const error = errors[name];
  const touched = touchedFields[name];
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        {Icon && !isPassword && (
          <Icon className={cn(
            "absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-200 z-10 pointer-events-none",
            error ? "text-danger" : focused ? "text-primary" : "text-neutral-textMuted"
          )} strokeWidth={1.8} />
        )}
        <input
          type={inputType}
          disabled={disabled}
          placeholder={placeholder || label}
          {...register(name)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full h-11 bg-white border rounded-lg px-4 text-sm font-sans text-neutral-textMain",
            "transition-all duration-200 outline-none",
            "placeholder:text-neutral-textMuted placeholder:text-xs",
            "disabled:bg-neutral-light disabled:opacity-60 disabled:cursor-not-allowed",
            "autofill:bg-white",
            Icon && !isPassword && "pl-11",
            error
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/10"
              : touched && !error
                ? "border-success focus:border-success focus:ring-2 focus:ring-success/10"
                : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
          )}
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-textMuted hover:text-accent transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        <label className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-textMuted transition-all duration-200 pointer-events-none font-sans",
          Icon && !isPassword && "left-11",
          "peer-placeholder-shown:opacity-100",
          "hidden"
        )}>
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 mt-1.5 text-xs text-danger font-medium"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
      {helpText && !error && (
        <p className="mt-1.5 text-[11px] text-neutral-textMuted">{helpText}</p>
      )}
    </div>
  );
}
