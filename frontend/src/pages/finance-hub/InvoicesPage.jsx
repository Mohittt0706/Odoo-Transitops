import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/Badge";
import { invoices } from "../../data/mockData";
import { motion } from "framer-motion";
import { IndianRupee, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "client", label: "Client" },
  { key: "amount", label: "Amount" },
  { key: "date", label: "Date" },
  { key: "dueDate", label: "Due Date" },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={val} /> },
  { key: "trips", label: "Trips" },
];

export default function InvoicesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader
        title="Invoices"
        subtitle="Manage client invoices and payments"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            + Create Invoice
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total" value="₹87.15L" change="10%" trend="up" icon={<IndianRupee className="w-5 h-5" />} />
        <KPICard title="Paid" value="₹24.95L" change="8%" trend="up" icon={<CheckCircle className="w-5 h-5" />} />
        <KPICard title="Pending" value="₹27.7L" change="5%" trend="up" icon={<Clock className="w-5 h-5" />} />
        <KPICard title="Overdue" value="₹34.5L" change="15%" trend="up" icon={<AlertTriangle className="w-5 h-5" />} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable columns={columns} data={invoices} />
      </div>
    </motion.div>
  );
}
