import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { AlertCircle } from "lucide-react";

export default function FormTextarea({ name, label, required = false, disabled = false, rows = 3, className = "" }) {
  const { register, formState: { errors, touchedFields } } = useFormContext();
  const error = errors[name];
  const touched = touchedFields[name];
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <textarea
          disabled={disabled}
          rows={rows}
          placeholder={label}
          {...register(name)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-white border rounded-lg px-4 py-3 text-sm font-sans text-neutral-textMain resize-y min-h-[80px]",
            "transition-all duration-200 outline-none",
            "placeholder:text-neutral-textMuted placeholder:text-xs",
            "disabled:bg-neutral-light disabled:opacity-60 disabled:cursor-not-allowed",
            error
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/10"
              : touched && !error
                ? "border-success focus:border-success focus:ring-2 focus:ring-success/10"
                : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
          )}
        />
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
    </div>
  );
}
