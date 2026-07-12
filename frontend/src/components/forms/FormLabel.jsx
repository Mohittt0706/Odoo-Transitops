import { cn } from "../../utils/utils";

export default function FormLabel({ children, required = false, className = "" }) {
  return (
    <label className={cn("block text-xs font-semibold text-neutral-textMain mb-1.5", className)}>
      {children}
      {required && <span className="text-danger ml-0.5">*</span>}
    </label>
  );
}
