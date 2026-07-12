import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import ChartCard from "../../components/ui/ChartCard";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  Navigation,
  Clock,
  ChevronRight,
  Fuel,
} from "lucide-react";

const waypoints = [
  { name: "Mumbai Central", distance: "0 km", eta: "06:00 AM", status: "Departed" },
  { name: "Panvel Toll Plaza", distance: "35 km", eta: "06:45 AM", status: "Passed" },
  { name: "Khalapur", distance: "62 km", eta: "07:30 AM", status: "Passed" },
  { name: "Lonavala", distance: "96 km", eta: "08:30 AM", status: "Upcoming" },
  { name: "Pimpri-Chinchwad", distance: "125 km", eta: "09:45 AM", status: "Upcoming" },
  { name: "Pune", distance: "148 km", eta: "11:30 AM", status: "Destination" },
];

const routeStops = [
  { name: "HP Petrol Station", distance: "38 km", type: "Fuel" },
  { name: "Food Plaza Lonavala", distance: "96 km", type: "Rest" },
  { name: "BPCL Station Pimpri", distance: "128 km", type: "Fuel" },
];

export default function NavigationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Navigation"
        subtitle="Active route and waypoints"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Active Route" delay={0} className="lg:col-span-2">
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

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                Distance
              </p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">148 km</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                ETA
              </p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">5h 30m</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                Traffic
              </p>
              <div className="flex items-center gap-1 mt-1">
                <StatusBadge status="Moderate" variant="warning" />
              </div>
            </div>
          </div>

          <div className="h-48 bg-slate-100 rounded-xl border border-neutral-border flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-primary" />
              <div className="absolute top-16 left-24 w-2 h-2 rounded-full bg-primary" />
              <div className="absolute top-20 left-40 w-2 h-2 rounded-full bg-warning" />
              <div className="absolute top-28 left-56 w-2 h-2 rounded-full bg-neutral-textMuted" />
              <div className="absolute top-32 right-32 w-2 h-2 rounded-full bg-success" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                <path
                  d="M40 40 Q80 80 120 100 Q160 120 200 130 Q260 145 320 160 Q360 170 380 175"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeDasharray="8 4"
                />
              </svg>
            </div>
            <div className="text-center z-10">
              <Navigation className="w-10 h-10 text-primary mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-neutral-textMain">Route Map</p>
              <p className="text-xs text-neutral-textMuted mt-1">Live GPS tracking active</p>
            </div>
          </div>
        </ChartCard>

        <div className="space-y-6">
          <ChartCard title="Waypoints" delay={0.05}>
            <div className="space-y-0">
              {waypoints.map((wp, i) => (
                <div
                  key={wp.name}
                  className="flex items-start gap-3 py-2.5 border-b border-neutral-border/50 last:border-0"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        wp.status === "Departed" || wp.status === "Passed"
                          ? "bg-primary border-primary"
                          : wp.status === "Destination"
                          ? "bg-success border-success"
                          : "bg-white border-neutral-border"
                      }`}
                    />
                    {i < waypoints.length - 1 && (
                      <div className="w-0.5 h-6 bg-neutral-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-textMain">{wp.name}</p>
                    <p className="text-[11px] text-neutral-textMuted mt-0.5">
                      {wp.distance} — {wp.eta}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      wp.status === "Passed" || wp.status === "Departed"
                        ? "bg-success-light text-success"
                        : wp.status === "Destination"
                        ? "bg-primary-light text-primary"
                        : "bg-accent-light text-neutral-textMuted"
                    }`}
                  >
                    {wp.status}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Nearby Stops" delay={0.1}>
            <div className="space-y-2">
              {routeStops.map((stop) => (
                <div
                  key={stop.name}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {stop.type === "Fuel" ? (
                    <Fuel className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-warning flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-textMain truncate">
                      {stop.name}
                    </p>
                    <p className="text-[11px] text-neutral-textMuted">{stop.distance}</p>
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
