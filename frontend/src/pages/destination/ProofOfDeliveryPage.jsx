import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import { proofOfDelivery } from "../../data/mockData";
import { FileCheck, CheckCircle, Camera, Percent, Upload, Image } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "tripId", label: "Trip ID" },
  { key: "client", label: "Client" },
  { key: "deliveredAt", label: "Delivered At" },
  { key: "signedBy", label: "Signed By" },
  {
    key: "photo",
    label: "Photo",
    render: (val) =>
      val ? (
        <div className="flex items-center gap-1.5 text-emerald-600">
          <Image className="w-4 h-4" />
          <span className="text-xs font-semibold">Uploaded</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-amber-600">
          <Camera className="w-4 h-4" />
          <span className="text-xs font-semibold">Pending</span>
        </div>
      ),
  },
  { key: "notes", label: "Notes" },
];

export default function ProofOfDeliveryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Proof of Delivery"
        subtitle="Manage delivery confirmations and documentation"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Upload className="w-4 h-4" /> Upload POD
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total POD" value="5" icon={FileCheck} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Verified" value="4" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="Pending Photo" value="1" icon={Camera} color="bg-amber-50 text-amber-600" delay={0.1} />
        <KPICard title="Success Rate" value="80%" change="5%" changeType="up" icon={Percent} color="bg-blue-50 text-blue-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={proofOfDelivery}
        searchPlaceholder="Search POD records..."
        pageSize={10}
      />
    </motion.div>
  );
}
