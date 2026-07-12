import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import { Loader2, CheckCircle, Save, X, RotateCcw, ArrowLeft, Trash2 } from "lucide-react";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-soft-sm hover:shadow-soft-md",
  secondary: "bg-white text-neutral-textMain border border-neutral-border hover:bg-accent-light shadow-soft-sm",
  ghost: "bg-transparent text-neutral-textMuted hover:bg-accent-light hover:text-accent",
  danger: "bg-danger text-white hover:bg-red-600 shadow-soft-sm",
};

const sizes = {
  sm: "h-9 px-4 text-xs rounded-lg",
  md: "h-10 px-5 text-xs rounded-lg",
  lg: "h-12 px-7 text-sm rounded-lg",
};

export function FormButton({ children, variant = "primary", size = "md", loading = false, disabled = false, icon, type = "button", success = false, className = "", ...props }) {
  return (
    <motion.button
      type={type}
      whileTap={loading || disabled ? {} : { scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center font-semibold font-headings transition-all duration-200 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variants[variant],
        sizes[size],
        success && "bg-success hover:bg-success shadow-soft-sm",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : success ? (
        <CheckCircle className="w-4 h-4 mr-2" />
      ) : icon ? (
        <icon className="w-4 h-4 mr-2" />
      ) : null}
      {success ? "Saved!" : children}
    </motion.button>
  );
}

export default function FormActions({
  onSubmit,
  onCancel,
  onReset,
  onDelete,
  submitLabel = "Save",
  loading = false,
  success = false,
  showCancel = true,
  showReset = true,
  className = "",
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-center justify-between gap-3 pt-2 border-t border-neutral-border/50", className)}
    >
      <div className="flex items-center gap-2">
        {onDelete && (
          <FormButton variant="danger" size="md" icon={Trash2} onClick={onDelete}>Delete</FormButton>
        )}
      </div>
      <div className="flex items-center gap-2">
        {showCancel && onCancel && (
          <FormButton variant="secondary" size="md" icon={X} onClick={onCancel}>Cancel</FormButton>
        )}
        {showReset && onReset && (
          <FormButton variant="ghost" size="md" icon={RotateCcw} onClick={onReset}>Reset</FormButton>
        )}
        <FormButton type="submit" size="md" icon={Save} variant="primary" loading={loading} success={success} onClick={onSubmit}>
          {submitLabel}
        </FormButton>
      </div>
    </motion.div>
  );
}
