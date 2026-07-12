import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import StatusBadge from "../../components/common/Badge";
import { vehicles, maintenance } from "../../data/mockData";
import {
  Truck,
  CircleCheck,
  AlertTriangle,
} from "lucide-react";

const vehicle = vehicles.find((v) => v.plate === "MH-12-RT-2244");
const vehicleMaintenance = maintenance.filter(
  (m) => m.plate === "MH-12-RT-2244"
);

const healthItems = [
  { label: "Engine", status: "Healthy", color: "text-success", icon: CircleCheck },
  { label: "Brakes", status: "Healthy", color: "text-success", icon: CircleCheck },
  { label: "Tires", status: "Good", color: "text-success", icon: CircleCheck },
  { label: "AC", status: "Service Due", color: "text-warning", icon: AlertTriangle },
  { label: "Battery", status: "Healthy", color: "text-success", icon: CircleCheck },
];

export default function AssignedVehiclePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Assigned Vehicle"
        subtitle="Current vehicle details and health status"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Vehicle Details" delay={0} className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Truck className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-headings text-neutral-textMain">
                {vehicle?.name}
              </h3>
              <p className="text-sm text-neutral-textMuted mt-0.5">
                {vehicle?.plate} — {vehicle?.type}
              </p>
              <div className="mt-2">
                <StatusBadge status={vehicle?.status} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                Last Service
              </p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">
                {vehicle?.lastService}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                Mileage
              </p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">
                {vehicle?.mileage}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                Tire Condition
              </p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">Good</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                Next Service
              </p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">
                2026-08-15
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                Insurance Valid
              </p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">
                Until 2027-03-12
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80">
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                Registration
              </p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">
                Until 2028-01-20
              </p>
            </div>
          </div>
        </ChartCard>

        <div className="space-y-6">
          <ChartCard title="Fuel Level" delay={0.05}>
            <div className="flex flex-col items-center py-2">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="8"
                    strokeDasharray={`${(vehicle?.fuel / 100) * 251.2} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-neutral-textMain">
                    {vehicle?.fuel}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-textMuted mt-2">
                Approx. 312 km range
              </p>
            </div>
          </ChartCard>

          <ChartCard title="Vehicle Health" delay={0.1}>
            <div className="space-y-2">
              {healthItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-sm text-neutral-textMain">
                    {item.label}
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${item.color}`}>
                    <item.icon className="w-3.5 h-3.5" />
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <ChartCard
        title="Maintenance History"
        subtitle="Recent service records for this vehicle"
        delay={0.15}
      >
        {vehicleMaintenance.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-border">
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted">
                    Cost
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted">
                    Technician
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicleMaintenance.map((m) => (
                  <tr key={m.id} className="border-b border-neutral-border/50">
                    <td className="px-4 py-3 font-medium text-neutral-textMain">
                      {m.type}
                    </td>
                    <td className="px-4 py-3 text-neutral-textMuted">{m.date}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="px-4 py-3 font-semibold text-neutral-textMain">
                      {m.cost}
                    </td>
                    <td className="px-4 py-3 text-neutral-textMuted">
                      {m.technician}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-neutral-textMuted">
            No maintenance records for this vehicle.
          </div>
        )}
      </ChartCard>
    </motion.div>
  );
}
