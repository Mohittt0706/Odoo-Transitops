import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import { TripStatusBadge } from "../../../components/trips/TripComponents";
import { trips } from "../../../data/tripData";
import { ArrowLeft, Download, Star } from "lucide-react";

const completed = trips.filter(t => t.status === "Completed");

const columns = [
  { key: "id", label: "ID", width: "80px" },
  { key: "driver", label: "Driver" },
  { key: "vehicle", label: "Vehicle" },
  { key: "from", label: "Route", render: (val, row) => <span className="text-sm font-medium">{val} → {row.to}</span> },
  { key: "distance", label: "Distance" },
  { key: "revenue", label: "Revenue", render: (val) => <span className="font-semibold text-success">{val}</span> },
  { key: "deliveryTime", label: "Delivery Time" },
  { key: "rating", label: "Rating", render: (val) => (
    <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-sm font-bold">{val}</span></div>
  )},
  { key: "completedAt", label: "Completed At" },
  { key: "status", label: "Status", render: () => <TripStatusBadge status="Completed" /> },
];

export default function CompletedTrips() {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title="Completed Trips" subtitle={`${completed.length} trips completed`}
        actions={
          <div className="flex items-center gap-2">
            <button className="btn-icon"><Download className="w-4 h-4" /></button>
            <button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
          </div>
        }
      />
      <DataTable columns={columns} data={completed} searchPlaceholder="Search completed trips..." pageSize={10}
        onRowClick={(row) => navigate(`/dashboard/operations/trips/details/${row.id}`)} />
    </motion.div>
  );
}
