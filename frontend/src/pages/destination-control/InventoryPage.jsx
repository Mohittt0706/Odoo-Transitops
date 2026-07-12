import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/Badge";
import { inventory } from "../../data/mockData";
import { Package, CheckCircle, AlertTriangle, XCircle, Plus } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "item", label: "Item" },
  { key: "quantity", label: "Quantity" },
  { key: "location", label: "Location" },
  { key: "lastUpdated", label: "Last Updated" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
  { key: "category", label: "Category" },
];

export default function InventoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Inventory"
        subtitle="Track stock levels and manage warehouse inventory"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Items" value="6" icon={Package} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="In Stock" value="4" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="Low Stock" value="1" icon={AlertTriangle} color="bg-amber-50 text-amber-600" delay={0.1} />
        <KPICard title="Critical" value="1" icon={XCircle} color="bg-red-50 text-red-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={inventory}
        searchPlaceholder="Search inventory..."
        pageSize={10}
      />
    </motion.div>
  );
}
