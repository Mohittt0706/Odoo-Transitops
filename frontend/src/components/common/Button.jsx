import { Loader2 } from "lucide-react";
import { cn } from "../../utils/utils";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover shadow-soft-sm hover:shadow-soft-md active:scale-[0.98]",
    secondary:
      "bg-white text-neutral-textMain border border-neutral-border hover:bg-accent-light shadow-soft-sm active:scale-[0.98]",
    ghost:
      "bg-transparent text-neutral-textMuted hover:bg-accent-light hover:text-accent",
    danger:
      "bg-danger text-white hover:bg-red-600 shadow-soft-sm active:scale-[0.98]",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs rounded-lg",
    md: "h-11 px-6 text-sm rounded-lg",
    lg: "h-12 px-8 text-sm rounded-lg",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-headings font-semibold",
        "transition-all duration-200 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
}
