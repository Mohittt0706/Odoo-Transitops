import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import StatusBadge from "../../components/common/Badge";
import { waypoints } from "../../data/roadCaptainData";
import { Navigation, Clock, ChevronRight, Fuel, MapPin, CloudSun, Gauge } from "lucide-react";

const routeStops = [
  { name: "HP Petrol Station", dist: "38 km", type: "Fuel" },
  { name: "Food Plaza Lonavala", dist: "96 km", type: "Rest" },
  { name: "BPCL Station Pimpri", dist: "128 km", type: "Fuel" },
];

export default function NavigationPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Navigation" subtitle="Mumbai → Pune — Active route" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Active Route" delay={0} className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-semibold">Mumbai</span>
            </div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary via-warning to-success relative">
              <div className="absolute top-1/2 left-[54%] -translate-y-1/2 w-3 h-3 rounded-full bg-warning border-2 border-white shadow-sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Pune</span>
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Distance", value: "148 km", icon: MapPin },
              { label: "ETA", value: "11:30 AM", icon: Clock },
              { label: "Traffic", value: <StatusBadge status="Moderate" variant="warning" />, icon: Gauge },
              { label: "Weather", value: <StatusBadge status="Clear" variant="success" />, icon: CloudSun },
            ].map((s, i) => (
              <div key={s.label} className="p-3 rounded-xl bg-slate-50/80">
                <div className="flex items-center gap-1.5 mb-1">
                  <s.icon className="w-3 h-3 text-neutral-textMuted" />
                  <p className="text-[10px] text-neutral-textMuted uppercase">{s.label}</p>
                </div>
                <p className="text-sm font-bold text-neutral-textMain mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="h-44 bg-slate-100 rounded-xl border border-neutral-border flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-15">
              <svg className="w-full h-full" viewBox="0 0 400 160">
                <path d="M40 30 Q80 50 120 70 Q160 90 200 100 Q260 115 320 130 Q360 135 380 138" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8 4" />
              </svg>
            </div>
            <div className="text-center z-10">
              <Navigation className="w-10 h-10 text-primary mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-neutral-textMain">Route Map</p>
              <p className="text-xs text-neutral-textMuted">Live GPS tracking active</p>
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
                  <div className="flex-1">
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

          <ChartCard title="Nearby Stops" delay={0.1}>
            <div className="space-y-2">
              {routeStops.map((stop) => (
                <div key={stop.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  {stop.type === "Fuel" ? <Fuel className="w-4 h-4 text-primary" /> : <Clock className="w-4 h-4 text-warning" />}
                  <div className="flex-1"><p className="text-sm font-medium text-neutral-textMain">{stop.name}</p><p className="text-[11px] text-neutral-textMuted">{stop.dist}</p></div>
                  <ChevronRight className="w-4 h-4 text-neutral-textMuted" />
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </motion.div>
  );
}
