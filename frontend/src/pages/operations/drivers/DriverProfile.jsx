import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/ui/PageHeader";
import StatusBadge from "../../../components/ui/StatusBadge";
import { DriverAvatar, SafetyBadge, LicenseBadge, DriverStatsCard } from "../../../components/drivers/DriverComponents";
import { drivers } from "../../../data/driverData";
import { MapPin, Phone, Mail, Calendar, Truck, Route, Award, FileText, AlertCircle, Star, Map, Gauge, Fuel } from "lucide-react";

export default function DriverProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const driver = drivers.find(d => d.id === id);
  if (!driver) return <div className="p-8 text-center text-neutral-textMuted">Driver not found</div>;

  const stats = [
    { icon: Route, label: "Total Trips", value: driver.trips, color: "primary" },
    { icon: Award, label: "Completed", value: driver.completed, color: "success" },
    { icon: AlertCircle, label: "Cancelled", value: driver.cancelled, color: "danger" },
    { icon: Gauge, label: "Distance", value: driver.distance, color: "warning" },
    { icon: Star, label: "Avg Rating", value: driver.avgRating, color: "warning" },
    { icon: Fuel, label: "Safety Score", value: `${driver.safetyScore}%`, color: driver.safetyScore >= 90 ? "success" : "warning" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title={driver.name} subtitle={`${driver.id} | ${driver.experience}`}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(`/dashboard/operations/drivers/license/${driver.id}`)} className="btn btn-secondary text-xs">License Details</button>
            <button onClick={() => navigate(`/dashboard/operations/drivers/edit/${driver.id}`)} className="btn btn-primary text-xs">Edit Driver</button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="card text-center">
            <DriverAvatar name={driver.name} size="xl" className="mx-auto" />
            <h3 className="text-lg font-bold font-headings text-neutral-textMain mt-3">{driver.name}</h3>
            <p className="text-xs text-neutral-textMuted">{driver.id}</p>
            <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
              <StatusBadge status={driver.status} />
              <LicenseBadge status={driver.licenseStatus} />
              <SafetyBadge score={driver.safetyScore} size="md" />
            </div>
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Personal Info</h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm"><Mail className="w-3.5 h-3.5 text-neutral-textMuted flex-shrink-0" /><span>{driver.email}</span></div>
              <div className="flex items-center gap-2.5 text-sm"><Phone className="w-3.5 h-3.5 text-neutral-textMuted flex-shrink-0" /><span>{driver.phone}</span></div>
              <div className="flex items-center gap-2.5 text-sm"><MapPin className="w-3.5 h-3.5 text-neutral-textMuted flex-shrink-0" /><span>{driver.address}</span></div>
              <div className="flex items-center gap-2.5 text-sm"><Calendar className="w-3.5 h-3.5 text-neutral-textMuted flex-shrink-0" /><span>DOB: {driver.dob}</span></div>
              <div className="flex items-center gap-2.5 text-sm"><Calendar className="w-3.5 h-3.5 text-neutral-textMuted flex-shrink-0" /><span>Joined: {driver.joiningDate}</span></div>
            </div>
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Emergency Contact</h4>
            <p className="text-sm">{driver.emergencyContact}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.map((s, i) => <DriverStatsCard key={i} {...s} />)}
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">License Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-neutral-textMuted text-[11px]">License No</p><p className="font-semibold">{driver.licenseNo}</p></div>
              <div><p className="text-neutral-textMuted text-[11px]">License Type</p><p className="font-semibold">{driver.licenseType}</p></div>
              <div><p className="text-neutral-textMuted text-[11px]">Expiry Date</p><p className="font-semibold">{driver.licenseExpiry}</p></div>
              <div><p className="text-neutral-textMuted text-[11px]">Status</p><LicenseBadge status={driver.licenseStatus} /></div>
            </div>
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Assigned Vehicle</h4>
            <div className="flex items-center gap-2.5"><Truck className="w-4 h-4 text-primary" /><p className="text-sm font-semibold">{driver.vehicle}</p></div>
          </div>

          {driver.currentTrip && (
            <div className="card space-y-3">
              <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Current Trip</h4>
              <div className="flex items-center gap-2.5"><Map className="w-4 h-4 text-primary" /><p className="text-sm">{driver.currentTrip.from} → {driver.currentTrip.to}</p></div>
              <StatusBadge status={driver.currentTrip.status} />
            </div>
          )}

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Documents</h4>
            <div className="flex flex-wrap gap-2">
              {driver.documents.map(doc => (
                <span key={doc} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent-light rounded-lg text-xs font-medium text-neutral-textMuted">
                  <FileText className="w-3 h-3" /> {doc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
