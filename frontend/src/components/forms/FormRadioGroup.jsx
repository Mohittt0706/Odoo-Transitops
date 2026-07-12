import { useFormContext } from "react-hook-form";
import { cn } from "../../utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function FormRadioGroup({ name, label, options = [], required = false, disabled = false, className = "" }) {
  const { register, formState: { errors }, watch } = useFormContext();
  const error = errors[name];
  const value = watch(name);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <p className="text-xs font-semibold text-neutral-textMain uppercase tracking-wider">
          {label}{required && <span className="text-danger ml-0.5">*</span>}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <label key={opt.value}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-all duration-200",
                active
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-neutral-border bg-white text-neutral-textMain hover:border-neutral-textMuted",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <input type="radio" {...register(name)} value={opt.value} disabled={disabled}
                className="sr-only"
              />
              <span className={cn(
                "w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                active ? "border-primary" : "border-neutral-border"
              )}>
                {active && <span className="w-2 h-2 rounded-full bg-primary" />}
              </span>
              {opt.label}
            </label>
          );
        })}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 text-xs text-danger font-medium"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
