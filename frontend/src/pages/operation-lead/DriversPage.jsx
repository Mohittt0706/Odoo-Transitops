import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { drivers } from "../../data/mockData";
import { Users, UserCheck, UserX, ShieldAlert, Plus, Star } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  {
    key: "name",
    label: "Name",
    render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
          {val.split(" ").map((n) => n[0]).join("")}
        </div>
        <span className="font-medium">{val}</span>
      </div>
    ),
  },
  { key: "license", label: "License" },
  { key: "expiry", label: "Expiry" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
  {
    key: "rating",
    label: "Rating",
    render: (val) => (
      <div className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        <span className="text-sm font-semibold">{val}</span>
      </div>
    ),
  },
  { key: "trips", label: "Trips Completed" },
  { key: "phone", label: "Phone" },
  {
    key: "compliance",
    label: "Compliance",
    render: (val) => (
      <span className={`text-sm font-semibold ${val >= 95 ? "text-emerald-600" : val >= 85 ? "text-amber-600" : "text-red-600"}`}>
        {val}%
      </span>
    ),
  },
];

export default function DriversPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Drivers"
        subtitle="Manage your driver roster"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> Add Driver
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Drivers" value="8" icon={Users} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Active" value="6" change="2 new" changeType="up" icon={UserCheck} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="On Leave" value="1" icon={UserX} color="bg-amber-50 text-amber-600" delay={0.1} />
        <KPICard title="Suspended" value="1" icon={ShieldAlert} color="bg-red-50 text-red-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={drivers}
        searchPlaceholder="Search drivers..."
        pageSize={10}
      />
    </motion.div>
  );
}
