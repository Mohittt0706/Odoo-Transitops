import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { TripStatusBadge, Timeline } from "../../../components/trips/TripComponents";
import { trips, timelineEvents } from "../../../data/tripData";
import { ArrowLeft, XCircle, AlertCircle, User, Shield, RefreshCw } from "lucide-react";

const cancelled = trips.filter(t => t.status === "Cancelled");

export default function CancelledTrips() {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Cancelled Trips" subtitle={`${cancelled.length} trip(s) cancelled`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {cancelled.length === 0 ? (
        <div className="card py-16 text-center"><XCircle className="w-10 h-10 text-neutral-textMuted mx-auto mb-3" /><p className="text-sm text-neutral-textMuted">No cancelled trips</p></div>
      ) : (
        <div className="space-y-4">
          {cancelled.map(trip => {
            const events = timelineEvents.find(t => t.tripId === trip.id)?.events || [];
            return (
              <motion.div key={trip.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2"><h3 className="text-sm font-bold font-headings">{trip.id}</h3><TripStatusBadge status="Cancelled" /></div>
                    <p className="text-xs text-neutral-textMuted mt-1">{trip.from} → {trip.to}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="p-3 bg-danger-light/50 rounded-lg border border-danger/20">
                    <div className="flex items-center gap-1.5 text-danger text-xs font-semibold mb-1"><AlertCircle className="w-3.5 h-3.5" /> Cancellation Reason</div>
                    <p className="text-sm font-medium">{trip.cancelReason}</p>
                  </div>
                  <div className="p-3 bg-accent-light rounded-lg">
                    <div className="flex items-center gap-1.5 text-neutral-textMuted text-xs font-semibold mb-1"><User className="w-3.5 h-3.5" /> Cancelled By</div>
                    <p className="text-sm font-medium">{trip.cancelledBy}</p>
                  </div>
                  <div className="p-3 bg-accent-light rounded-lg">
                    <div className="flex items-center gap-1.5 text-neutral-textMuted text-xs font-semibold mb-1"><Shield className="w-3.5 h-3.5" /> Driver</div>
                    <p className="text-sm font-medium">{trip.driver}</p>
                  </div>
                  <div className="p-3 bg-success-light/50 rounded-lg border border-success/20">
                    <div className="flex items-center gap-1.5 text-success text-xs font-semibold mb-1"><RefreshCw className="w-3.5 h-3.5" /> Refund Status</div>
                    <p className="text-sm font-medium">{trip.refundStatus}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div><p className="text-xs font-semibold text-neutral-textMuted mb-2">Vehicle: {trip.vehicleName} ({trip.vehicle})</p></div>
                  <div><p className="text-xs font-semibold text-neutral-textMuted mb-2">Cargo: {trip.cargo} ({trip.cargoWeight})</p></div>
                </div>
                {events.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neutral-border">
                    <p className="text-xs font-semibold text-neutral-textMuted mb-3">Pre-Cancellation Timeline</p>
                    <Timeline events={events} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
