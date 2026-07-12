import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import { MaintStatusBadge, PriorityBadge } from "../../../components/maintenance/MaintenanceComponents";
import { maintenance } from "../../../data/maintenanceData";
import { ArrowLeft, Download, Star } from "lucide-react";

const completed = maintenance.filter(j => j.status === "Completed");

const columns = [
  { key: "id", label: "ID", width: "75px" },
  { key: "vehicle", label: "Vehicle", render: (v, r) => <div><p className="text-sm font-semibold">{v}</p><p className="text-[10px] text-neutral-textMuted">{r.plate}</p></div> },
  { key: "issue", label: "Issue" },
  { key: "category", label: "Service Type" },
  { key: "mechanic", label: "Mechanic" },
  { key: "completedDate", label: "Completed" },
  { key: "totalCost", label: "Cost", render: (v) => <span className="font-semibold">{v || "—"}</span> },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status", render: () => <MaintStatusBadge status="Completed" /> },
  { key: "mechanicRating", label: "Rating", render: (v) => <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-sm font-bold">{v}</span></div> },
];

export default function MaintenanceHistory() {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title="Maintenance History" subtitle={`${completed.length} completed services`}
        actions={
          <div className="flex items-center gap-2">
            <button className="btn-icon"><Download className="w-4 h-4" /></button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
          </div>
        }
      />
      <DataTable columns={columns} data={completed} searchPlaceholder="Search history..." pageSize={10}
        onRowClick={(row) => navigate(`/dashboard/operations/maintenance/${row.id}`)} />
    </motion.div>
  );
}
