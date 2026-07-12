import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import VehicleStatusBadge from "../../../components/common/VehicleStatusBadge";
import DocumentCard from "../../../components/dashboard/DocumentCard";
import TimelineItem from "../../../components/timeline/TimelineItem";
import { vehicleService } from "../../../services/vehicle.service";
import { cn } from "../../../utils/utils";
import {
  Truck, Edit, Trash2, Gauge, Fuel, Shield, Wrench,
  Calendar, MapPin, User, Loader2, AlertTriangle
} from "lucide-react";

const tabs = ["Overview", "Specifications", "Trip History", "Maintenance", "Fuel Logs", "Expenses", "Documents", "Timeline"];

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    vehicleService.getById(id)
      .then((res) => {
        const v = res.data.vehicle;
        setVehicle({
          ...v,
          id: v._id,
          name: v.vehicleName,
          registration: v.registrationNumber,
          type: v.vehicleType,
          loadCapacity: v.maxLoadCapacity,
          color: v.color || "#3B82F6",
          model: v.model || "",
          manufacturer: v.manufacturer || "",
          year: v.year || "",
          vin: v.vin || "",
          engineNo: v.engineNo || "",
          licensePlate: v.licensePlate || v.registrationNumber,
          fuelType: v.fuelType || "",
          transmission: v.transmission || "",
          mileage: v.mileage || "",
          purchaseDate: v.purchaseDate || v.createdAt,
          insuranceProvider: v.insuranceProvider || "",
          insuranceExpiry: v.insuranceExpiry || "",
          driver: v.driver || "",
          fuelLevel: v.fuelLevel ?? 0,
          warrantyExpiry: v.warrantyExpiry || v.createdAt,
          nextService: v.nextService || v.createdAt,
          tripHistory: v.tripHistory || [],
          maintenanceHistory: v.maintenanceHistory || [],
          fuelLogs: v.fuelLogs || [],
          expenses: v.expenses || [],
          documents: v.documents || {},
        });
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Failed to load vehicle");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  if (error) return <div className="flex items-center justify-center min-h-[400px] text-danger">{error}</div>;
  if (!vehicle) return <div className="flex items-center justify-center min-h-[400px] text-neutral-textMuted">Not found</div>;

  const tripColumns = [
    { key: "id", label: "Trip ID" },
    { key: "from", label: "From", render: (val) => <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-neutral-textMuted" /> {val}</span> },
    { key: "to", label: "To", render: (val) => <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-neutral-textMuted" /> {val}</span> },
    { key: "date", label: "Date", render: (val) => new Date(val).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "distance", label: "Distance" },
    { key: "status", label: "Status", render: (val) => <VehicleStatusBadge status={val === "In Transit" ? "On Trip" : val === "Completed" ? "Active" : "Inactive"} /> },
  ];

  const maintenanceColumns = [
    { key: "id", label: "ID" },
    { key: "type", label: "Type" },
    { key: "date", label: "Date", render: (val) => new Date(val).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "cost", label: "Cost" },
    { key: "technician", label: "Technician" },
    { key: "status", label: "Status", render: (val) => <VehicleStatusBadge status={val === "Completed" ? "Active" : val === "In Progress" ? "On Trip" : "Inactive"} /> },
  ];

  const fuelLogColumns = [
    { key: "id", label: "ID" },
    { key: "date", label: "Date", render: (val) => new Date(val).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { key: "liters", label: "Liters" },
    { key: "cost", label: "Cost" },
    { key: "station", label: "Station" },
    { key: "mileage", label: "Mileage" },
  ];

  const expenseColumns = [
    { key: "id", label: "ID" },
    { key: "category", label: "Category" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date", render: (val) => new Date(val).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  const buildTimeline = () => {
    const items = [];
    vehicle.tripHistory.forEach((t) => {
      items.push({ type: "trip", title: `${t.from} → ${t.to}`, description: t.distance, date: t.date, detail: `Trip ${t.id} — ${t.status}` });
    });
    vehicle.maintenanceHistory.forEach((m) => {
      items.push({ type: "maintenance", title: m.type, description: m.technician, date: m.date, detail: `${m.cost} — ${m.status}` });
    });
    vehicle.fuelLogs.forEach((f) => {
      items.push({ type: "fuel", title: `Fuel Refill — ${f.liters}L`, description: f.station, date: f.date, detail: f.cost });
    });
    return items.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const overviewDetails = [
    { icon: User, label: "Driver", value: vehicle.driver },
    { icon: Gauge, label: "Odometer", value: `${vehicle.odometer.toLocaleString("en-IN")} km` },
    { icon: Fuel, label: "Fuel Level", value: `${vehicle.fuelLevel}%` },
    { icon: Shield, label: "Insurance", value: vehicle.insuranceProvider },
    { icon: Calendar, label: "Warranty Expiry", value: new Date(vehicle.warrantyExpiry).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { icon: Wrench, label: "Next Service", value: new Date(vehicle.nextService).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  const specRows = [
    { label: "Registration", value: vehicle.registration },
    { label: "Model", value: vehicle.model },
    { label: "Type", value: vehicle.type },
    { label: "Manufacturer", value: vehicle.manufacturer },
    { label: "Year", value: vehicle.year },
    { label: "VIN", value: vehicle.vin },
    { label: "Engine No.", value: vehicle.engineNo },
    { label: "License Plate", value: vehicle.licensePlate },
    { label: "Load Capacity", value: vehicle.loadCapacity },
    { label: "Fuel Type", value: vehicle.fuelType },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Mileage", value: vehicle.mileage },
    { label: "Purchase Date", value: new Date(vehicle.purchaseDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
    { label: "Acquisition Cost", value: vehicle.acquisitionCost },
    { label: "Insurance Provider", value: vehicle.insuranceProvider },
    { label: "Insurance Expiry", value: new Date(vehicle.insuranceExpiry).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title={vehicle.name}
        subtitle={vehicle.registration}
        actions={
          <>
            <button
              onClick={() => navigate(`/dashboard/operations/fleet/edit/${vehicle.id}`)}
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-neutral-border text-neutral-textMain text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors"
            >
              <Edit className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this vehicle?")) {
                  vehicleService.remove(vehicle.id).then(() => navigate("/dashboard/operations/fleet")).catch((err) => setError(err.response?.data?.message || "Delete failed"));
                }
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-danger/30 text-danger text-sm font-semibold rounded-lg hover:bg-danger-light transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </>
        }
      />

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: vehicle.color + "15" }}>
          <Truck className="w-8 h-8" style={{ color: vehicle.color }} strokeWidth={1.5} />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold font-headings text-neutral-textMain">{vehicle.name}</h2>
            <VehicleStatusBadge status={vehicle.status} />
          </div>
          <p className="text-sm text-neutral-textMuted mt-0.5 font-mono">{vehicle.registration} &middot; {vehicle.type} &middot; {vehicle.manufacturer}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-neutral-border mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all -mb-px",
              activeTab === tab
                ? "text-primary border-primary"
                : "text-neutral-textMuted border-transparent hover:text-neutral-textMain hover:border-neutral-border"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overviewDetails.map((d) => (
            <div key={d.label} className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                  <d.icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                </div>
                <span className="text-xs font-semibold text-neutral-textMuted uppercase tracking-wider">{d.label}</span>
              </div>
              <p className="text-lg font-bold text-neutral-textMain">{d.value}</p>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "Specifications" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {specRows.map((row, i) => (
                <tr key={i} className={cn("border-b border-neutral-border/50 last:border-0", i % 2 === 0 && "bg-slate-50/50")}>
                  <td className="px-5 py-3 font-semibold text-neutral-textMuted w-1/3">{row.label}</td>
                  <td className="px-5 py-3 text-neutral-textMain font-mono text-xs">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === "Trip History" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <DataTable columns={tripColumns} data={vehicle.tripHistory} searchPlaceholder="Search trips..." emptyMessage="No trip history found" />
        </motion.div>
      )}

      {activeTab === "Maintenance" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <DataTable columns={maintenanceColumns} data={vehicle.maintenanceHistory} searchPlaceholder="Search maintenance..." emptyMessage="No maintenance records found" />
        </motion.div>
      )}

      {activeTab === "Fuel Logs" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <DataTable columns={fuelLogColumns} data={vehicle.fuelLogs} searchPlaceholder="Search fuel logs..." emptyMessage="No fuel logs found" />
        </motion.div>
      )}

      {activeTab === "Expenses" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <DataTable columns={expenseColumns} data={vehicle.expenses} searchPlaceholder="Search expenses..." emptyMessage="No expenses found" />
        </motion.div>
      )}

      {activeTab === "Documents" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(vehicle.documents).map((doc, i) => (
            <DocumentCard key={i} document={doc} index={i} />
          ))}
        </motion.div>
      )}

      {activeTab === "Timeline" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-neutral-border rounded-xl p-6 shadow-soft-sm">
          {buildTimeline().length > 0 ? (
            buildTimeline().map((item, i) => (
              <TimelineItem key={i} item={item} index={i} isLast={i === buildTimeline().length - 1} />
            ))
          ) : (
            <p className="text-sm text-neutral-textMuted text-center py-8">No timeline events found</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
