import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import StatusBadge from "../../../components/common/Badge";
import { TripStatusBadge, ProgressBar, Timeline, RouteCard } from "../../../components/trips/TripComponents";
import { trips, timelineEvents } from "../../../data/tripData";
import { ArrowLeft, Truck, User, Package, Fuel, Receipt, FileText, Weight, Map } from "lucide-react";

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);
  if (!trip) return <div className="p-8 text-center text-neutral-textMuted">Trip not found</div>;

  const timeline = timelineEvents.find(t => t.tripId === id)?.events || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title={`Trip ${trip.id}`} subtitle={`${trip.from} → ${trip.to}`}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(`/dashboard/operations/trips/timeline/${trip.id}`)} className="btn btn-secondary text-xs">Timeline</button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card space-y-4">
            <div className="flex items-center justify-between"><h3 className="text-sm font-bold font-headings">Trip Overview</h3><TripStatusBadge status={trip.status} /></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><p className="text-[11px] text-neutral-textMuted">Priority</p><p className="font-semibold mt-0.5"><StatusBadge status={trip.priority} /></p></div>
              <div><p className="text-[11px] text-neutral-textMuted">Distance</p><p className="font-semibold mt-0.5">{trip.distance}</p></div>
              <div><p className="text-[11px] text-neutral-textMuted">Departure</p><p className="font-semibold mt-0.5">{trip.departure}</p></div>
              <div><p className="text-[11px] text-neutral-textMuted">ETA</p><p className="font-semibold mt-0.5">{trip.eta}</p></div>
            </div>
            {trip.status !== "Cancelled" && trip.status !== "Pending" && (
              <div><p className="text-xs font-semibold text-neutral-textMuted mb-1.5">Delivery Progress</p><ProgressBar value={trip.progress} /></div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card space-y-3">
              <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Vehicle</h4>
              <p className="text-sm font-semibold">{trip.vehicleName}</p>
              <p className="text-xs text-neutral-textMuted">{trip.vehicle}</p>
              <div className="flex items-center gap-3 text-xs text-neutral-textMuted"><Fuel className="w-3 h-3" /> Fuel: {trip.fuelUsage || "N/A"}</div>
            </div>
            <div className="card space-y-3">
              <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Driver</h4>
              <p className="text-sm font-semibold">{trip.driver}</p>
              <p className="text-xs text-neutral-textMuted">ID: {trip.driverId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card space-y-3">
              <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> Cargo</h4>
              <p className="text-sm font-semibold">{trip.cargo}</p>
              <div className="flex items-center gap-3 text-xs text-neutral-textMuted"><Weight className="w-3 h-3" /> {trip.cargoWeight} | {trip.value}</div>
            </div>
            <div className="card space-y-3">
              <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><Receipt className="w-3.5 h-3.5" /> Expenses</h4>
              <p className="text-sm font-semibold">{trip.expenses || "N/A"}</p>
              <p className="text-xs text-neutral-textMuted">Revenue: {trip.revenue || "N/A"}</p>
            </div>
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><Map className="w-3.5 h-3.5" /> Route</h4>
            <RouteCard from={trip.from} to={trip.to} distance={trip.distance} />
            {trip.notes && <p className="text-xs text-warning bg-warning-light px-3 py-2 rounded-lg">{trip.notes}</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Documents</h4>
            <div className="space-y-1.5">{trip.documents.map(d => <div key={d} className="flex items-center gap-2 text-xs text-neutral-textMain p-2 bg-accent-light rounded-lg"><FileText className="w-3 h-3 text-primary" /> {d}</div>)}</div>
          </div>
          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Quick Stats</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs"><span className="text-neutral-textMuted">Fuel Usage</span><span className="font-semibold">{trip.fuelUsage || "—"}</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-neutral-textMuted">Expenses</span><span className="font-semibold">{trip.expenses || "—"}</span></div>
              <div className="flex items-center justify-between text-xs"><span className="text-neutral-textMuted">Revenue</span><span className="font-semibold">{trip.revenue || "—"}</span></div>
              {trip.deliveryTime && <div className="flex items-center justify-between text-xs"><span className="text-neutral-textMuted">Delivery Time</span><span className="font-semibold">{trip.deliveryTime}</span></div>}
              {trip.rating && <div className="flex items-center justify-between text-xs"><span className="text-neutral-textMuted">Rating</span><span className="font-semibold">{trip.rating}/5</span></div>}
            </div>
          </div>
          {timeline.length > 0 && (
            <div className="card">
              <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider mb-3">Recent Events</h4>
              <Timeline events={timeline.slice(0, 4)} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
