import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { Calendar, Clock, AlertCircle } from "lucide-react";

export default function FormDatePicker({ name, label, type = "date", required = false, disabled = false, className = "" }) {
  const { register, formState: { errors, touchedFields } } = useFormContext();
  const error = errors[name];
  const touched = touchedFields[name];
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <div className={cn(
          "absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-200 z-10 pointer-events-none",
          error ? "text-danger" : focused ? "text-primary" : "text-neutral-textMuted"
        )}>
          {type === "time" ? <Clock className="w-[18px] h-[18px]" strokeWidth={1.8} /> : <Calendar className="w-[18px] h-[18px]" strokeWidth={1.8} />}
        </div>
        <input
          type={type}
          disabled={disabled}
          {...register(name)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full h-11 bg-white border rounded-lg pl-11 pr-4 text-sm font-sans text-neutral-textMain",
            "transition-all duration-200 outline-none",
            "disabled:bg-neutral-light disabled:opacity-60 disabled:cursor-not-allowed",
            "appearance-none [&::-webkit-calendar-picker-indicator]:opacity-40 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer",
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
