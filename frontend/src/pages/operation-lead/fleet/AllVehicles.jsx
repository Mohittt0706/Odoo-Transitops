import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import VehicleStatusBadge from "../../../components/common/VehicleStatusBadge";
import { vehicleService } from "../../../services/vehicle.service";
import { Truck, Plus, Download, Eye, Pencil } from "lucide-react";
import { cn } from "../../../utils/utils";

const statusFilters = ["All", "AVAILABLE", "ON_TRIP", "IN_SHOP"];

export default function AllVehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState("All");

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (activeStatus !== "All") params.status = activeStatus;
      const res = await vehicleService.getAll(params);
      setVehicles(res.data.vehicles || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  }, [activeStatus]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const columns = [
    {
      key: "name",
      label: "Vehicle",
      render: (_, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10">
            <Truck className="w-4.5 h-4.5 text-primary" strokeWidth={1.8} />
          </div>
          <span className="font-semibold text-sm text-neutral-textMain">{row.vehicleName}</span>
        </div>
      ),
    },
    {
      key: "registration",
      label: "Registration",
      render: (_, row) => (
        <span className="font-mono text-xs font-semibold text-neutral-textMain">{row.registrationNumber}</span>
      ),
    },
    { key: "vehicleType", label: "Type" },
    {
      key: "maxLoadCapacity",
      label: "Load Capacity",
      render: (val) => <span className="text-sm">{val?.toLocaleString("en-IN") || "-"} kg</span>,
    },
    {
      key: "odometer",
      label: "Odometer",
      render: (val) => <span className="text-sm">{(val || 0).toLocaleString("en-IN")} km</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (val) => <VehicleStatusBadge status={val} />,
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/dashboard/operations/fleet/details/${row._id}`)}
            className="p-1.5 rounded-lg text-neutral-textMuted hover:text-primary hover:bg-primary-light transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/dashboard/operations/fleet/edit/${row._id}`)}
            className="p-1.5 rounded-lg text-neutral-textMuted hover:text-warning hover:bg-warning-light transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <PageHeader title="All Vehicles" subtitle="Error loading vehicles" />
        <div className="flex flex-col items-center gap-4 py-20">
          <p className="text-sm text-danger">{error}</p>
          <button onClick={fetchVehicles} className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark">
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

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
            {status === "All" ? "All" : status.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={vehicles}
        searchPlaceholder="Search vehicles by name, registration..."
        pageSize={8}
        bulkSelect
        onRowClick={(row) => navigate(`/dashboard/operations/fleet/details/${row._id}`)}
      />
    </motion.div>
  );
}
