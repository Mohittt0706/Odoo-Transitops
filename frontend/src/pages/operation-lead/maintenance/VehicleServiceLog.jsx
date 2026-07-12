import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { MaintStatusBadge } from "../../../components/maintenance/MaintenanceComponents";
import { maintenance } from "../../../data/maintenanceData";
import { ArrowLeft, Wrench, Calendar, FileText, Truck, DollarSign } from "lucide-react";

const grouped = maintenance.reduce((acc, j) => {
  if (!acc[j.vehicle]) acc[j.vehicle] = [];
  acc[j.vehicle].push(j);
  return acc;
}, {});

export default function VehicleServiceLog() {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Vehicle Service Log" subtitle="Chronological service history by vehicle"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {Object.keys(grouped).length === 0 ? (
        <div className="card py-16 text-center"><Wrench className="w-10 h-10 text-neutral-textMuted mx-auto mb-3" /><p className="text-sm text-neutral-textMuted">No service records found</p></div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([vehicle, entries]) => (
            <motion.div key={vehicle} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card">
              <div className="flex items-center gap-2.5 mb-4"><Truck className="w-4 h-4 text-primary" /><h3 className="text-sm font-bold font-headings">{vehicle}</h3><span className="text-[11px] text-neutral-textMuted">{entries.length} service(s)</span></div>
              <div className="space-y-2">
                {entries.sort((a, b) => new Date(b.date) - new Date(a.date)).map(j => (
                  <div key={j.id} onClick={() => navigate(`/dashboard/operations/maintenance/${j.id}`)} className="flex items-center justify-between p-3 bg-accent-light rounded-lg hover:bg-primary-light/50 cursor-pointer transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Wrench className="w-3.5 h-3.5 text-primary" /></div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-neutral-textMain">{j.issue}</p>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-textMuted mt-0.5">
                          <span className="flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" />{j.date}</span>
                          <span className="flex items-center gap-0.5"><DollarSign className="w-2.5 h-2.5" />{j.totalCost || j.estimatedCost}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <MaintStatusBadge status={j.status} />
                      {j.invoice && <FileText className="w-3.5 h-3.5 text-success" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
