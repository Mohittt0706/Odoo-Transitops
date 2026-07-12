import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { invoices } from "../../data/mockData";
import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, Calendar, BarChart3 } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "client", label: "Client" },
  { key: "amount", label: "Amount" },
  { key: "date", label: "Date" },
  { key: "dueDate", label: "Due Date" },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={val} /> },
  { key: "trips", label: "Trips" },
];

export default function RevenuePage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader title="Revenue" subtitle="Track revenue and client payments" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Revenue" value="₹72.4L" change="12%" trend="up" icon={<IndianRupee className="w-5 h-5" />} />
        <KPICard title="Average Trip" value="₹1.8L" change="5%" trend="up" icon={<BarChart3 className="w-5 h-5" />} />
        <KPICard title="This Month" value="₹12.4L" change="8%" trend="up" icon={<Calendar className="w-5 h-5" />} />
        <KPICard title="Growth" value="12%" change="3%" trend="up" icon={<TrendingUp className="w-5 h-5" />} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable columns={columns} data={invoices} />
      </div>
    </motion.div>
  );
}
