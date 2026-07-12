import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import VehicleStatusBadge from "../../../components/fleet/VehicleStatusBadge";
import { vehicles } from "../../../data/vehicleData";
import { cn } from "../../../utils/utils";
import { Truck, Plus, Download, Eye, Pencil } from "lucide-react";

const statusFilters = ["All", "Active", "In Maintenance", "Inactive"];

export default function AllVehicles() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState("All");

  const filteredVehicles = activeStatus === "All" ? vehicles : vehicles.filter((v) => v.status === activeStatus);

  const columns = [
    {
      key: "name",
      label: "Vehicle",
      render: (_, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: row.color + "15" }}>
            <Truck className="w-4.5 h-4.5" style={{ color: row.color }} strokeWidth={1.8} />
          </div>
          <span className="font-semibold text-sm text-neutral-textMain">{row.name}</span>
        </div>
      ),
    },
    {
      key: "registration",
      label: "Registration",
      render: (val) => <span className="font-mono text-xs font-semibold text-neutral-textMain">{val}</span>,
    },
    { key: "type", label: "Type" },
    { key: "loadCapacity", label: "Load Capacity" },
    {
      key: "odometer",
      label: "Odometer",
      render: (val) => <span className="text-sm">{val.toLocaleString("en-IN")} km</span>,
    },
    {
      key: "fuelLevel",
      label: "Fuel Level",
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-neutral-border rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", val > 70 ? "bg-emerald-500" : val > 40 ? "bg-amber-500" : "bg-red-500")}
              style={{ width: `${val}%` }}
            />
          </div>
          <span className="text-xs font-medium text-neutral-textMuted">{val}%</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val) => <VehicleStatusBadge status={val} />,
    },
    {
      key: "driver",
      label: "Assigned Driver",
      render: (val) => <span className={cn("text-sm", val === "—" && "text-neutral-textMuted")}>{val}</span>,
    },
    {
      key: "lastService",
      label: "Last Service",
      render: (val) => (
        <span className="text-sm">
          {new Date(val).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/dashboard/operations/fleet/details/${row.id}`)}
            className="p-1.5 rounded-lg text-neutral-textMuted hover:text-primary hover:bg-primary-light transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/dashboard/operations/fleet/edit/${row.id}`)}
            className="p-1.5 rounded-lg text-neutral-textMuted hover:text-warning hover:bg-warning-light transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="All Vehicles"
        subtitle={`${vehicles.length} vehicles registered`}
        actions={
          <>
            <button className="inline-flex items-center gap-2 px-3.5 py-2 border border-neutral-border text-neutral-textMain text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button
              onClick={() => navigate("/dashboard/operations/fleet/register")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-4 h-4" /> Register Vehicle
            </button>
          </>
        }
      />

      <div className="flex items-center gap-2 mb-4">
        {statusFilters.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={cn(
              "px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all",
              activeStatus === status
                ? "bg-primary text-white border-primary"
                : "bg-white text-neutral-textMuted border-neutral-border hover:border-primary/40 hover:text-primary"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredVehicles}
        searchPlaceholder="Search vehicles by name, registration..."
        pageSize={8}
        bulkSelect
        onRowClick={(row) => navigate(`/dashboard/operations/fleet/details/${row.id}`)}
      />
    </motion.div>
  );
}
