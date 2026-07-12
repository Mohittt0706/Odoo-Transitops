import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/Badge";
import { DriverAvatar, SafetyBadge, LicenseBadge } from "../../components/drivers/DriverComponents";
import { drivers, driverStats } from "../../data/driverData";
import { Users, UserCheck, UserX, ShieldAlert, Plus, Star, Download } from "lucide-react";
import { cn } from "../../lib/utils";

const statusColors = { Active: "success", "On Leave": "warning", Suspended: "danger" };

const columns = [
  { key: "id", label: "ID", width: "80px" },
  { key: "name", label: "Driver", render: (val, row) => (
    <div className="flex items-center gap-2.5">
      <DriverAvatar name={val} />
      <div><p className="text-sm font-semibold text-neutral-textMain">{val}</p><p className="text-[11px] text-neutral-textMuted">{row.email}</p></div>
    </div>
  )},
  { key: "licenseStatus", label: "License", render: (val) => <LicenseBadge status={val} /> },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={val} variant={statusColors[val]} /> },
  { key: "safetyScore", label: "Safety", render: (val) => <SafetyBadge score={val} /> },
  { key: "rating", label: "Rating", render: (val) => (
    <div className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span className="text-sm font-bold">{val}</span></div>
  )},
  { key: "trips", label: "Trips" },
  { key: "phone", label: "Phone" },
  { key: "experience", label: "Experience" },
];

export default function DriversPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [safetyFilter, setSafetyFilter] = useState("all");

  const filtered = useMemo(() => {
    let result = drivers;
    if (statusFilter !== "all") result = result.filter(d => d.status === statusFilter);
    if (safetyFilter === "high") result = result.filter(d => d.safetyScore >= 90);
    else if (safetyFilter === "medium") result = result.filter(d => d.safetyScore >= 75 && d.safetyScore < 90);
    else if (safetyFilter === "low") result = result.filter(d => d.safetyScore < 75);
    return result;
  }, [statusFilter, safetyFilter]);

  const kpiCards = [
    { title: "Total Drivers", value: driverStats.total, icon: Users, color: "bg-primary/10 text-primary" },
    { title: "Active", value: driverStats.active, change: "Available", changeType: "up", icon: UserCheck, color: "bg-emerald-50 text-emerald-600" },
    { title: "On Leave", value: driverStats.onLeave, icon: UserX, color: "bg-amber-50 text-amber-600" },
    { title: "Suspended", value: driverStats.suspended, icon: ShieldAlert, color: "bg-red-50 text-red-600" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Drivers" subtitle="Manage your driver roster and performance"
        actions={
          <div className="flex items-center gap-2">
            <button className="btn-icon"><Download className="w-4 h-4" /></button>
            <button onClick={() => navigate("/dashboard/operations/drivers/add")} className="btn btn-primary text-xs">
              <Plus className="w-3.5 h-3.5" /> Add Driver
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((kpi, i) => (
          <motion.div key={kpi.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.35 }}
            className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-neutral-textMuted uppercase tracking-wider">{kpi.title}</p>
                <p className="text-2xl font-bold font-headings text-neutral-textMain mt-1.5">{kpi.value}</p>
                {kpi.change && <p className="text-[11px] text-success mt-1">{kpi.change}</p>}
              </div>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", kpi.color)}>
                <kpi.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1 p-1 bg-white border border-neutral-border rounded-lg">
          {["all", "Active", "On Leave", "Suspended"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-all", statusFilter === s ? "bg-primary text-white" : "text-neutral-textMuted hover:text-accent")}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
        <select value={safetyFilter} onChange={e => setSafetyFilter(e.target.value)} className="h-8 px-3 text-xs font-semibold bg-white border border-neutral-border rounded-lg outline-none text-neutral-textMuted">
          <option value="all">All Safety</option>
          <option value="high">High (90+)</option>
          <option value="medium">Medium (75-89)</option>
          <option value="low">Low (&lt;75)</option>
        </select>
      </div>

      <DataTable columns={columns} data={filtered} searchPlaceholder="Search drivers..." pageSize={8} bulkSelect
        onRowClick={(row) => navigate(`/dashboard/operations/drivers/profile/${row.id}`)}
        actions={
          <>
            <button onClick={() => navigate("/dashboard/operations/drivers/analytics")} className="btn btn-secondary text-xs">Analytics</button>
          </>
        }
      />
    </motion.div>
  );
}
