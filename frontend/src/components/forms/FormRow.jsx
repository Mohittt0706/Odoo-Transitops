import { cn } from "../../utils/utils";

export default function FormRow({ cols = 2, className = "", children }) {
  return (
    <div className={cn(
      "grid gap-4",
      cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
      className
    )}>
      {children}
    </div>
  );
}
