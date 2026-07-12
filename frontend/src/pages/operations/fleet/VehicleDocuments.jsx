import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import PageHeader from "../../../components/ui/PageHeader";
import DocumentCard from "../../../components/fleet/DocumentCard";
import { vehicles } from "../../../data/vehicleData";
import { Upload, ChevronDown, FileText, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const filterTabs = ["All", "Insurance", "Registration", "Fitness", "Pollution", "Warranty"];

const documentKeyMap = {
  Insurance: "insurance",
  Registration: "registration",
  Fitness: "fitness",
  Pollution: "pollution",
  Warranty: "warranty",
};

export default function VehicleDocuments() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const vehicle = vehicles.find((v) => v.id === selectedVehicle) || vehicles[0];

  const allDocs = Object.entries(vehicle.documents).map(([key, doc]) => ({
    ...doc,
    key,
    vehicleName: vehicle.name,
    registration: vehicle.registration,
  }));

  const filteredDocs =
    activeTab === "All"
      ? allDocs
      : allDocs.filter((d) => d.key === documentKeyMap[activeTab]);

  const totalCount = allDocs.length;
  const validCount = allDocs.filter((d) => d.status === "Valid").length;
  const expiringCount = allDocs.filter((d) => d.status === "Expiring Soon").length;
  const expiredCount = allDocs.filter((d) => d.status === "Expired").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Vehicle Documents"
        subtitle="Manage and track all vehicle documentation"
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.3 }}
          className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-neutral-textMuted uppercase tracking-wider">Total</p>
              <p className="text-xl font-bold font-headings text-neutral-textMain">{totalCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-neutral-textMuted uppercase tracking-wider">Valid</p>
              <p className="text-xl font-bold font-headings text-neutral-textMain">{validCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning-light flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-neutral-textMuted uppercase tracking-wider">Expiring Soon</p>
              <p className="text-xl font-bold font-headings text-neutral-textMain">{expiringCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-danger-light flex items-center justify-center">
              <XCircle className="w-5 h-5 text-danger" strokeWidth={1.8} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-neutral-textMuted uppercase tracking-wider">Expired</p>
              <p className="text-xl font-bold font-headings text-neutral-textMain">{expiredCount}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 h-10 px-4 text-sm font-medium bg-white border border-neutral-border rounded-xl hover:bg-accent-light transition-colors min-w-[220px] justify-between"
          >
            <span className="truncate">{vehicle.name} ({vehicle.registration})</span>
            <ChevronDown className={cn("w-4 h-4 text-neutral-textMuted transition-transform", dropdownOpen && "rotate-180")} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-neutral-border rounded-xl shadow-soft-lg py-1 z-20 max-h-60 overflow-y-auto">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVehicle(v.id);
                    setDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm hover:bg-accent-light transition-colors",
                    v.id === selectedVehicle && "bg-primary-light text-primary font-medium"
                  )}
                >
                  {v.name} — {v.registration}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 bg-white border border-neutral-border rounded-xl p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                activeTab === tab
                  ? "bg-primary text-white"
                  : "text-neutral-textMuted hover:text-neutral-textMain hover:bg-accent-light"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc, i) => (
          <DocumentCard key={`${vehicle.id}-${doc.key}`} document={doc} index={i} />
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
            <FileText className="w-5 h-5 text-neutral-textMuted" />
          </div>
          <p className="text-sm font-medium text-neutral-textMuted">No documents found for this filter</p>
        </div>
      )}
    </motion.div>
  );
}
