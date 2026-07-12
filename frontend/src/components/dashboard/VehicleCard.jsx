import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Fuel, Gauge, ArrowRight } from "lucide-react";
import VehicleStatusBadge from "./VehicleStatusBadge";

export default function VehicleCard({ vehicle, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -3 }}
      onClick={() => navigate(`/dashboard/operations/fleet/details/${vehicle.id}`)}
      className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: vehicle.color + "15" }}>
          <Truck className="w-6 h-6" style={{ color: vehicle.color }} strokeWidth={1.8} />
        </div>
        <VehicleStatusBadge status={vehicle.status} />
      </div>

      <h3 className="text-sm font-bold font-headings text-neutral-textMain group-hover:text-primary transition-colors">
        {vehicle.name}
      </h3>
      <p className="text-xs text-neutral-textMuted mt-0.5 font-mono">{vehicle.registration}</p>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-neutral-textMuted" />
          <span className="text-[11px] text-neutral-textMuted">{vehicle.odometer.toLocaleString()} km</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Fuel className="w-3.5 h-3.5 text-neutral-textMuted" />
          <span className="text-[11px] text-neutral-textMuted">{vehicle.fuelLevel}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-border/50">
        <span className="text-[11px] text-neutral-textMuted">{vehicle.type}</span>
        <ArrowRight className="w-4 h-4 text-neutral-border group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </motion.div>
  );
}
