import { motion } from "framer-motion";
import { cn } from "../../../utils/utils";
import PageHeader from "../../../components/layout/PageHeader";
import VehicleStatusBadge from "../../../components/common/VehicleStatusBadge";
import { vehicles } from "../../../data/vehicleData";
import { Truck, Fuel, Clock, ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const columns = [
  { status: "Available", filter: (v) => v.status === "Active" && v.driver === "—" },
  { status: "On Trip", filter: (v) => v.status === "Active" && v.driver !== "—" },
  { status: "In Maintenance", filter: (v) => v.status === "In Maintenance" },
  { status: "Inactive", filter: (v) => v.status === "Inactive" },
];

const columnColors = {
  Available: "border-t-success",
  "On Trip": "border-t-primary",
  "In Maintenance": "border-t-warning",
  Inactive: "border-t-neutral-textMuted",
};

const columnHeaderColors = {
  Available: "bg-success-light text-success",
  "On Trip": "bg-primary-light text-primary",
  "In Maintenance": "bg-warning-light text-warning",
  Inactive: "bg-accent-light text-neutral-textMuted",
};

export default function FleetStatus() {
  const navigate = useNavigate();

  const groupedVehicles = columns.map((col) => ({
    ...col,
    vehicles: vehicles.filter(col.filter),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Fleet Status"
        subtitle="Real-time overview of your entire fleet"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {groupedVehicles.map((col, ci) => (
          <motion.div
            key={col.status}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08, duration: 0.3 }}
            className={cn(
              "bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden border-t-2",
              columnColors[col.status]
            )}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-border">
              <h3 className="text-sm font-bold font-headings text-neutral-textMain">{col.status}</h3>
              <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full", columnHeaderColors[col.status])}>
                {col.vehicles.length}
              </span>
            </div>

            <div className="p-3 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
              {col.vehicles.map((vehicle, vi) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.08 + vi * 0.05, duration: 0.25 }}
                  whileHover={{ y: -2 }}
                  onClick={() => navigate(`/dashboard/operations/fleet/details/${vehicle.id}`)}
                  className="bg-white border border-neutral-border/60 rounded-xl p-4 hover:shadow-soft-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: vehicle.color + "15" }}
                      >
                        <Truck className="w-4.5 h-4.5" style={{ color: vehicle.color }} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-textMain group-hover:text-primary transition-colors leading-tight">
                          {vehicle.name}
                        </p>
                        <p className="text-[11px] text-neutral-textMuted font-mono">{vehicle.registration}</p>
                      </div>
                    </div>
                    <VehicleStatusBadge status={col.status === "Available" ? "Available" : col.status} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-neutral-textMuted" />
                        <span className="text-[11px] text-neutral-textMuted">
                          {vehicle.driver === "—" ? "Unassigned" : vehicle.driver}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-neutral-textMuted" />
                      <div className="flex-1 h-1.5 bg-neutral-border rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            vehicle.fuelLevel > 70 ? "bg-emerald-500" : vehicle.fuelLevel > 40 ? "bg-amber-500" : "bg-red-500"
                          )}
                          style={{ width: `${vehicle.fuelLevel}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-neutral-textMuted font-medium">{vehicle.fuelLevel}%</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-border/40">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-neutral-textMuted" />
                        <span className="text-[10px] text-neutral-textMuted">
                          {vehicle.lastService
                            ? `Serviced ${new Date(vehicle.lastService).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`
                            : "No service record"}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-border group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}

              {col.vehicles.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-xs text-neutral-textMuted">No vehicles in this category</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
