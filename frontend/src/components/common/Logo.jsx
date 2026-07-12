import { Truck } from "lucide-react";

export default function Logo({ size = "md", className = "" }) {
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-lg" },
    md: { icon: "w-8 h-8", text: "text-xl" },
    lg: { icon: "w-10 h-10", text: "text-2xl" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="bg-primary rounded-lg p-1.5 flex items-center justify-center">
        <Truck className={`${s.icon} text-white`} strokeWidth={2.5} />
      </div>
      <span className={`font-headings font-bold ${s.text} text-accent tracking-tight`}>
        Transit<span className="text-primary">Ops</span>
      </span>
    </div>
  );
}
