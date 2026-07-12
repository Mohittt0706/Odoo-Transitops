import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { MaintStatusBadge, PriorityBadge, ProgressBar, Timeline } from "../../../components/maintenance/MaintenanceComponents";
import { maintenanceService } from "../../../services/maintenance.service";
import { ArrowLeft, Wrench, User, Truck, FileText, DollarSign, Star, Phone, Mail, Loader2 } from "lucide-react";
import { cn } from "../../../utils/utils";

export default function MaintenanceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    maintenanceService.getById(id)
      .then((res) => {
        const r = res.data.record;
        setJob({
          ...r,
          id: r._id,
          vehicle: r.vehicleId?.vehicleName || 'Unknown',
          plate: r.vehicleId?.registrationNumber || '—',
          vehicleId: r.vehicleId?._id || '—',
          issue: r.issue,
          description: r.description,
          status: r.status,
          cost: r.cost,
          date: r.maintenanceDate ? new Date(r.maintenanceDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—',
          completedDate: r.completedDate ? new Date(r.completedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—',
          priority: r.priority || 'Medium',
          category: r.category || r.issue,
          reportedBy: r.reportedBy || '—',
          approvalStatus: r.approvalStatus || 'Approved',
          warranty: r.warranty || 'N/A',
          mechanic: r.technicianName || 'Unassigned',
          mechanicExp: r.mechanicExp || '—',
          garage: r.garage || '—',
          mechanicPhone: r.mechanicPhone || '—',
          mechanicEmail: r.mechanicEmail || '—',
          mechanicRating: r.mechanicRating ?? '—',
          mechanicAvail: r.mechanicAvail || '—',
          timeline: r.timeline || [],
          labourCost: r.labourCost || '—',
          partsCost: r.partsCost || '—',
          tax: r.tax || '—',
          discount: r.discount || null,
          totalCost: r.cost ? `₹${r.cost.toLocaleString()}` : '—',
          estimatedCost: r.estimatedCost || '—',
          documents: r.documents || [],
          invoice: r.invoice || null,
          duration: r.duration || '—',
          notes: r.remarks || r.notes || '',
        });
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Failed to load maintenance record");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  if (error) return <div className="flex items-center justify-center min-h-[400px] text-danger">{error}</div>;
  if (!job) return <div className="flex items-center justify-center min-h-[400px] text-neutral-textMuted">Not found</div>;

  const progressMap = { COMPLETED: 100, IN_PROGRESS: 55, WAITING_PARTS: 35, OPEN: 10, SCHEDULED: 10 };
  const progress = progressMap[job.status] || 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title={job.id} subtitle={`${job.vehicle} — ${job.issue}`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2"><h3 className="text-sm font-bold font-headings">Maintenance Summary</h3><div className="flex items-center gap-2"><PriorityBadge priority={job.priority} /><MaintStatusBadge status={job.status} /></div></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><p className="text-[11px] text-neutral-textMuted">Category</p><p className="font-semibold mt-0.5">{job.category}</p></div>
              <div><p className="text-[11px] text-neutral-textMuted">Reported By</p><p className="font-semibold mt-0.5">{job.reportedBy}</p></div>
              <div><p className="text-[11px] text-neutral-textMuted">Service Date</p><p className="font-semibold mt-0.5">{job.date}</p></div>
              <div><p className="text-[11px] text-neutral-textMuted">Approval</p><p className="font-semibold mt-0.5">{job.approvalStatus}</p></div>
            </div>
            <p className="text-sm text-neutral-textMuted">{job.description}</p>
            <div><p className="text-xs font-semibold text-neutral-textMuted mb-1">Repair Progress</p><ProgressBar value={progress} /></div>
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Vehicle Information</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><p className="text-[11px] text-neutral-textMuted">Vehicle</p><p className="font-semibold">{job.vehicle}</p></div>
              <div><p className="text-[11px] text-neutral-textMuted">Plate</p><p className="font-semibold">{job.plate}</p></div>
              <div><p className="text-[11px] text-neutral-textMuted">Vehicle ID</p><p className="font-semibold">{job.vehicleId}</p></div>
              <div><p className="text-[11px] text-neutral-textMuted">Warranty</p><p className="font-semibold">{job.warranty || "N/A"}</p></div>
            </div>
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Assigned Mechanic</h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">{job.mechanic[0]}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{job.mechanic}</p>
                <p className="text-xs text-neutral-textMuted">{job.mechanicExp} exp · {job.garage}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-neutral-textMuted"><Phone className="w-3 h-3" />{job.mechanicPhone}<Mail className="w-3 h-3 ml-1" />{job.mechanicEmail}</div>
              </div>
              <div className="text-right"><div className="flex items-center gap-1 text-xs"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{job.mechanicRating}</div><span className="text-[10px] text-neutral-textMuted">{job.mechanicAvail}</span></div>
            </div>
          </div>

          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Timeline</h4>
            {job.timeline.length > 0 ? <Timeline stages={job.timeline} /> : <p className="text-sm text-neutral-textMuted py-4">No timeline events</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Cost Breakdown</h4>
            <div className="space-y-2 text-sm">
              {[{ label: "Labour Cost", value: job.labourCost }, { label: "Parts Cost", value: job.partsCost }, { label: "Tax", value: job.tax }, { label: "Discount", value: job.discount ? `-${job.discount}` : null }, { label: "Total Amount", value: job.totalCost, bold: true }].filter(x => x.value).map(x => (
                <div key={x.label} className={cn("flex items-center justify-between", x.bold && "pt-2 border-t border-neutral-border font-bold")}>
                  <span className="text-neutral-textMuted">{x.label}</span><span>{x.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-border"><span className="text-neutral-textMuted">Estimated</span><span>{job.estimatedCost}</span></div>
            </div>
          </div>
          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Documents</h4>
            {job.documents.length > 0 ? job.documents.map(d => (
              <div key={d} className="flex items-center gap-2 text-xs p-2 bg-accent-light rounded-lg"><FileText className="w-3 h-3 text-primary" />{d}</div>
            )) : <p className="text-sm text-neutral-textMuted">No documents</p>}
            {job.invoice && <div className="flex items-center gap-2 text-xs p-2 bg-success-light rounded-lg"><FileText className="w-3 h-3 text-success" />{job.invoice}</div>}
          </div>
          <div className="card space-y-3">
            <h4 className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Service Info</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-neutral-textMuted">Duration</span><span className="font-semibold">{job.duration || "—"}</span></div>
              <div className="flex justify-between"><span className="text-neutral-textMuted">Completed</span><span className="font-semibold">{job.completedDate || "—"}</span></div>
              {job.notes && <div className="p-2 bg-warning-light text-warning rounded-lg text-xs mt-2">{job.notes}</div>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
