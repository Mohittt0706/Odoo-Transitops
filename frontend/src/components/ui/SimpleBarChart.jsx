export default function SimpleBarChart({ data, height = 160, color = "#2563EB" }) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{
              height: `${(d.value / max) * (height - 24)}px`,
              backgroundColor: color,
              opacity: 0.15 + (d.value / max) * 0.85,
            }}
          />
          <span className="text-[9px] text-neutral-textMuted font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
