export default function MapWidget() {
  return (
    <div className="relative w-full h-64 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden">
      <div className="text-center">
        <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
        <p className="text-xs text-slate-400 font-medium">Live Map</p>
        <p className="text-[10px] text-slate-300 mt-1">4 active dispatches • 2 en route</p>
      </div>
    </div>
  );
}
