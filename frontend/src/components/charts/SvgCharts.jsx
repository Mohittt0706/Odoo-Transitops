export function RadialProgress({ percent = 0, label = "", subText = "" }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#2563eb" strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 50 50)" />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          className="text-lg font-bold fill-slate-900" fontSize="18">{percent}%</text>
      </svg>
      {label && <span className="text-xs font-semibold text-slate-900">{label}</span>}
      {subText && <span className="text-[10px] text-slate-400">{subText}</span>}
    </div>
  );
}

export function AreaChart({ data = [], strokeColor = "#2563eb", fillGradient = "url(#blueGrad)" }) {
  if (!data.length) {
    return <div className="flex items-center justify-center h-32 text-xs text-slate-400">No chart data</div>;
  }
  const w = 300, h = 120;
  const max = Math.max(...data.map(d => d.value || 0), 1);
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - (d.value / max) * h}`).join(" ");
  const polyPts = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={polyPts} fill={fillGradient} />
      <polyline points={pts} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
