import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, Truck, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import SafetyScoreBadge from './SafetyScoreBadge';

export default function DriverCard({ driver }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)' }}
      className="bg-white border border-slate-200/80 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:border-blue-200"
      onClick={() => navigate(`/drivers/profile/${driver.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {driver.initials}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 font-headings">{driver.fullName}</h4>
            <p className="text-[10px] text-slate-400 font-semibold">{driver.employeeId}</p>
          </div>
        </div>
        <StatusBadge status={driver.operationalStatus} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-600">{driver.assignedVehicle || 'Unassigned'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-600">{driver.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-600 truncate">{driver.currentTrip?.destination || 'No active trip'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <SafetyScoreBadge score={driver.safetyScore} size="sm" />
        <button className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
          View Profile <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}
