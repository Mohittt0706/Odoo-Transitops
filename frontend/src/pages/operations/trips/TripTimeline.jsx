import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Timeline, TripStatusBadge, ProgressBar } from "../../../components/trips/TripComponents";
import { trips, timelineEvents } from "../../../data/tripData";
import { ArrowLeft, Clock, MapPin } from "lucide-react";

export default function TripTimelinePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);
  if (!trip) return <div className="p-8 text-center text-neutral-textMuted">Trip not found</div>;

  const events = timelineEvents.find(t => t.tripId === id)?.events || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Trip Timeline" subtitle={`${trip.id} — ${trip.from} → ${trip.to}`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center gap-3 mb-6">
            <TripStatusBadge status={trip.status} />
            <span className="text-xs text-neutral-textMuted flex items-center gap-1"><MapPin className="w-3 h-3" /> {trip.from} → {trip.to}</span>
          </div>
          {events.length > 0 ? <Timeline events={events} /> : (
            <div className="py-12 text-center text-neutral-textMuted text-sm">No timeline events recorded for this trip.</div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider mb-4">Trip Progress</h4>
            <ProgressBar value={trip.progress} size="md" />
            <div className="flex items-center justify-between mt-4 text-xs">
              <span className="text-neutral-textMuted flex items-center gap-1"><Clock className="w-3 h-3" /> ETA</span>
              <span className="font-semibold">{trip.eta}</span>
            </div>
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Event Summary</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between"><span className="text-neutral-textMuted">Total Events</span><span className="font-semibold">{events.length}</span></div>
              <div className="flex items-center justify-between"><span className="text-neutral-textMuted">Checkpoints</span><span className="font-semibold">{events.filter(e => e.icon === "Flag").length}</span></div>
              <div className="flex items-center justify-between"><span className="text-neutral-textMuted">Distance</span><span className="font-semibold">{trip.distance}</span></div>
              <div className="flex items-center justify-between"><span className="text-neutral-textMuted">Status</span><TripStatusBadge status={trip.status} /></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
