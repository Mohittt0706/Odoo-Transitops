import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import StatusBadge from "../../components/common/Badge";
import { MetricCard } from "../../components/road-captain/RoadCaptainComponents";
import { vehicles, maintenance } from "../../data/mockData";
import { Truck, CircleCheck, AlertTriangle, Fuel, Gauge, Calendar, Shield, Wrench, Battery, Activity } from "lucide-react";

const vehicle = vehicles.find((v) => v.plate === "MH-12-RT-2244");
const vehicleMaint = maintenance.filter((m) => m.plate === "MH-12-RT-2244");

const healthItems = [
  { label: "Engine", status: "Healthy", icon: Activity, color: "text-success" },
  { label: "Brakes", status: "Healthy", icon: CircleCheck, color: "text-success" },
  { label: "Tires", status: "Good", icon: CircleCheck, color: "text-success" },
  { label: "AC", status: "Service Due", icon: AlertTriangle, color: "text-warning" },
  { label: "Battery", status: "Healthy", icon: Battery, color: "text-success" },
  { label: "Transmission", status: "Good", icon: Gauge, color: "text-success" },
];

export default function AssignedVehiclePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Assigned Vehicle" subtitle="Mahindra Blazo X25 — MH-12-RT-2244" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Vehicle Details" delay={0} className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Truck className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-headings text-neutral-textMain">{vehicle?.name}</h3>
              <p className="text-sm text-neutral-textMuted">{vehicle?.plate} — {vehicle?.type}</p>
              <div className="mt-2"><StatusBadge status={vehicle?.status} /></div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Last Service", value: vehicle?.lastService, icon: Calendar },
              { label: "Mileage", value: vehicle?.mileage, icon: Gauge },
              { label: "Registration", value: "Until 2028-01-20", icon: Shield },
              { label: "Insurance", value: "Until 2027-03-12", icon: Shield },
              { label: "Next Service", value: "2026-08-15", icon: Wrench },
              { label: "Tire Condition", value: "Good — 60% tread", icon: CircleCheck },
            ].map((s, i) => (
              <div key={s.label} className="p-3 rounded-xl bg-slate-50/80">
                <div className="flex items-center gap-1.5 mb-1">
                  <s.icon className="w-3 h-3 text-neutral-textMuted" strokeWidth={1.5} />
                  <p className="text-[10px] font-semibold text-neutral-textMuted uppercase">{s.label}</p>
                </div>
                <p className="text-sm font-bold text-neutral-textMain">{s.value}</p>
              </div>
            ))}
          </div>
        </ChartCard>

        <div className="space-y-6">
          <ChartCard title="Fuel Level" delay={0.05}>
            <div className="flex flex-col items-center py-2">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#16A34A" strokeWidth="8" strokeDasharray={`${(vehicle?.fuel / 100) * 251.2} 251.2`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-neutral-textMain">{vehicle?.fuel}%</span>
                </div>
              </div>
              <p className="text-xs text-neutral-textMuted mt-2">Approx. 312 km range</p>
            </div>
          </ChartCard>

          <ChartCard title="Vehicle Health" delay={0.1}>
            <div className="space-y-1">
              {healthItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-neutral-textMain">{item.label}</span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${item.color}`}>
                    <item.icon className="w-3.5 h-3.5" />{item.status}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <ChartCard title="Maintenance History" delay={0.15}>
        {vehicleMaint.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-border">
                  {["Type", "Date", "Status", "Cost", "Technician"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicleMaint.map((m) => (
                  <tr key={m.id} className="border-b border-neutral-border/50">
                    <td className="px-4 py-3 font-medium text-neutral-textMain">{m.type}</td>
                    <td className="px-4 py-3 text-neutral-textMuted">{m.date}</td>
                    <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                    <td className="px-4 py-3 font-semibold text-neutral-textMain">{m.cost}</td>
                    <td className="px-4 py-3 text-neutral-textMuted">{m.technician}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-neutral-textMuted">No maintenance records.</div>
        )}
      </ChartCard>
    </motion.div>
  );
}
