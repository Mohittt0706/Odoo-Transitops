import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import { receivers } from "../../data/mockData";
import { Users, UserCheck, Truck, Clock, Plus, Star } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  {
    key: "name",
    label: "Name",
    render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
          {val.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        <span className="font-medium">{val}</span>
      </div>
    ),
  },
  { key: "contact", label: "Contact" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "totalDeliveries", label: "Total Deliveries" },
  {
    key: "pendingDeliveries",
    label: "Pending",
    render: (val) => (
      <span className={`text-sm font-semibold ${val > 0 ? "text-amber-600" : "text-emerald-600"}`}>
        {val}
      </span>
    ),
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
];

export default function ReceiversPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Receivers"
        subtitle="Manage clients and delivery recipients"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> Add Receiver
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Clients" value="5" icon={Users} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Active" value="5" change="100%" changeType="up" icon={UserCheck} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="Total Deliveries" value="190" change="8%" changeType="up" icon={Truck} color="bg-blue-50 text-blue-600" delay={0.1} />
        <KPICard title="Pending" value="11" icon={Clock} color="bg-amber-50 text-amber-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={receivers}
        searchPlaceholder="Search receivers..."
        pageSize={10}
      />
    </motion.div>
  );
}
