import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import { MetricCard, ConfirmationModal, Toast, EmptyState } from "../../components/road-captain/RoadCaptainComponents";
import { Fuel, IndianRupee, Gauge, CalendarPlus, Plus, Upload } from "lucide-react";
import { rcFuelLogs } from "../../data/roadCaptainData";

const columns = [
  { key: "id", label: "Log ID", width: "70px" },
  { key: "date", label: "Date" },
  { key: "station", label: "Fuel Station", render: (v) => <span className="text-sm font-medium">{v}</span> },
  { key: "fuelType", label: "Type" },
  { key: "liters", label: "Quantity", render: (v) => `${v} L` },
  { key: "cost", label: "Cost", render: (v) => <span className="font-semibold">{v}</span> },
  { key: "mileage", label: "Mileage" },
  { key: "status", label: "Status", render: (v) => <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${v === "Approved" ? "bg-success-light text-success" : "bg-warning-light text-warning"}`}>{v}</span> },
];

export default function FuelLogsPage() {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const stats = [
    { label: "Total Fuel", value: "543 L", icon: Fuel, color: "primary" },
    { label: "Total Cost", value: "₹48,870", icon: IndianRupee, color: "success" },
    { label: "Avg Mileage", value: "5.0 km/L", icon: Gauge, color: "warning" },
    { label: "This Month", value: "5 entries", icon: CalendarPlus, color: "purple" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader
        title="Fuel Logs"
        subtitle="Track fuel consumption"
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => setShowModal(true)} className="btn btn-ghost text-xs flex items-center gap-1.5"><Upload className="w-3.5 h-3.5" /> Upload Receipt</button>
            <button className="btn btn-primary text-xs flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Entry</button>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => <MetricCard key={s.label} {...s} delay={i * 0.05} />)}
      </div>

      <DataTable columns={columns} data={rcFuelLogs} searchPlaceholder="Search fuel logs..." pageSize={8} />

      <ConfirmationModal open={showModal} title="Upload Receipt" message="Upload fuel receipt for approval?" confirmLabel="Upload" onConfirm={() => { setShowModal(false); setToast({ type: "success", message: "Receipt uploaded!" }); }} onCancel={() => setShowModal(false)} />
      {toast && <Toast show type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </motion.div>
  );
}
