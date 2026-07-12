import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import StatusBadge from "../../components/common/Badge";
import { waypoints } from "../../data/roadCaptainData";
import { Navigation, Clock, MapPin, CloudSun, AlertTriangle, ChevronRight, Fuel } from "lucide-react";

export default function TodaysRoute() {
  const routeStops = [
    { name: "HP Petrol Station", dist: "38 km", type: "Fuel" },
    { name: "Food Plaza Lonavala", dist: "96 km", type: "Rest" },
    { name: "BPCL Station Pimpri", dist: "128 km", type: "Fuel" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Today's Route" subtitle="Mumbai → Pune — 148 km" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Distance", value: "148 km", icon: MapPin, color: "primary" },
          { label: "Est. Time", value: "5h 30m", icon: Clock, color: "warning" },
          { label: "Traffic", value: <StatusBadge status="Moderate" variant="warning" />, icon: Navigation, color: "info" },
          { label: "Weather", value: <StatusBadge status="Clear" variant="success" />, icon: CloudSun, color: "success" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.35 }}
            className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-semibold text-neutral-textMuted uppercase">{s.label}</p>
                <p className="text-sm font-bold font-headings text-neutral-textMain mt-1">{s.value}</p>
              </div>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                s.color === "primary" ? "bg-primary/10 text-primary" : s.color === "warning" ? "bg-warning-light text-warning" : s.color === "info" ? "bg-blue-50 text-blue-600" : "bg-success/10 text-success"
              }`}>
                <s.icon className="w-4 h-4" strokeWidth={1.8} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Route Overview" delay={0} className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-neutral-textMain">Mumbai</span>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary via-warning to-success relative">
              <div className="absolute top-1/2 left-[54%] -translate-y-1/2 w-3 h-3 rounded-full bg-warning border-2 border-white shadow-sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-textMain">Pune</span>
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[10px] text-neutral-textMuted uppercase">Distance</p>
              <p className="text-sm font-bold text-neutral-textMain mt-0.5">148 km</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[10px] text-neutral-textMuted uppercase">ETA</p>
              <p className="text-sm font-bold text-neutral-textMain mt-0.5">11:30 AM</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[10px] text-neutral-textMuted uppercase">Traffic</p>
              <p className="text-sm font-bold text-amber-600 mt-0.5">Moderate</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[10px] text-neutral-textMuted uppercase">Condition</p>
              <p className="text-sm font-bold text-success mt-0.5">Good</p>
            </div>
          </div>

          <div className="h-40 bg-slate-100 rounded-xl border border-neutral-border flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 400 160">
                <path d="M40 40 Q80 60 120 80 Q160 100 200 110 Q260 125 320 140 Q360 145 380 148" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8 4" />
              </svg>
            </div>
            <div className="text-center z-10">
              <Navigation className="w-8 h-8 text-primary mx-auto mb-1" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-neutral-textMain">Live Route Map</p>
              <p className="text-xs text-neutral-textMuted">GPS tracking active</p>
            </div>
          </div>
        </ChartCard>

        <div className="space-y-6">
          <ChartCard title="Waypoints" delay={0.05}>
            <div className="space-y-0">
              {waypoints.map((wp, i) => (
                <div key={wp.name} className="flex items-start gap-3 py-2.5 border-b border-neutral-border/50 last:border-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${wp.status === "Departed" || wp.status === "Passed" ? "bg-primary border-primary" : wp.status === "Destination" ? "bg-success border-success" : "bg-white border-neutral-border"}`} />
                    {i < waypoints.length - 1 && <div className="w-0.5 h-6 bg-neutral-border mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-textMain">{wp.name}</p>
                    <p className="text-[11px] text-neutral-textMuted">{wp.dist} — {wp.eta}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    wp.status === "Passed" || wp.status === "Departed" ? "bg-success-light text-success" : wp.status === "Destination" ? "bg-primary-light text-primary" : "bg-accent-light text-neutral-textMuted"
                  }`}>{wp.status}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Recommended Stops" delay={0.1}>
            <div className="space-y-2">
              {routeStops.map((stop) => (
                <div key={stop.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  {stop.type === "Fuel" ? <Fuel className="w-4 h-4 text-primary flex-shrink-0" /> : <Clock className="w-4 h-4 text-warning flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-textMain truncate">{stop.name}</p>
                    <p className="text-[11px] text-neutral-textMuted">{stop.dist}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-textMuted flex-shrink-0" />
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </motion.div>
  );
}
