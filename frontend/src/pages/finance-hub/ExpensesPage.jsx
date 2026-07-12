import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/Badge";
import { expenses } from "../../data/mockData";
import { motion } from "framer-motion";
import { IndianRupee, Clock, CheckCircle, Calendar } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "category", label: "Category" },
  { key: "vehicle", label: "Vehicle" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={val} /> },
  { key: "approvedBy", label: "Approved By" },
];

export default function ExpensesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader
        title="Expenses"
        subtitle="Track and manage all expenses"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            + Add Expense
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Expenses" value="₹53.8L" change="5%" trend="up" icon={<IndianRupee className="w-5 h-5" />} />
        <KPICard title="Pending Approval" value="₹1.3L" change="2%" trend="up" icon={<Clock className="w-5 h-5" />} />
        <KPICard title="Approved" value="₹52.5L" change="4%" trend="up" icon={<CheckCircle className="w-5 h-5" />} />
        <KPICard title="This Month" value="₹8.9L" change="3%" trend="up" icon={<Calendar className="w-5 h-5" />} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable columns={columns} data={expenses} />
      </div>
    </motion.div>
  );
}
