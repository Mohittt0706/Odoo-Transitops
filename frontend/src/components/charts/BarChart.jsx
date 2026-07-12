import { motion } from "framer-motion";

export default function SimpleBarChart({ data, height = 160, color = "#1E3A5F" }) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => {
        const barH = Math.max((d.value / max) * (height - 24), 4);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
            {/* Value label on hover */}
            <div className="relative flex-1 flex items-end w-full">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <span className="text-[9px] font-bold text-neutral-textMain bg-white border border-neutral-border rounded px-1 py-0.5 shadow-soft-sm whitespace-nowrap">
                  {d.value}
                </span>
              </div>
              <motion.div
                className="w-full rounded-t-md cursor-pointer"
                style={{ backgroundColor: color }}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: barH,
                  opacity: 0.25 + (d.value / max) * 0.75,
                }}
                whileHover={{ opacity: 1, scaleX: 0.92 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <span className="text-[9px] text-neutral-textMuted font-medium">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
