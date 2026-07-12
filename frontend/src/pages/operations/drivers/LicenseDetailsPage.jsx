import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { LicenseBadge, DriverStatsCard } from "../../../components/drivers/DriverComponents";
import { drivers, licenseStats } from "../../../data/driverData";
import { FileText, Download, Upload, AlertTriangle, ShieldCheck, Clock, XCircle, ArrowLeft } from "lucide-react";

export default function LicenseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const driver = drivers.find(d => d.id === id);
  if (!driver) return <div className="p-8 text-center text-neutral-textMuted">Driver not found</div>;

  const stats = [
    { icon: ShieldCheck, label: "Valid", value: licenseStats.valid, color: "success" },
    { icon: Clock, label: "Expiring Soon", value: licenseStats.expiringSoon, color: "warning" },
    { icon: XCircle, label: "Expired", value: licenseStats.expired, color: "danger" },
    { icon: FileText, label: "Total Licenses", value: licenseStats.total, color: "primary" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="License Details" subtitle={`${driver.name} - ${driver.licenseNo}`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => <DriverStatsCard key={i} {...s} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card space-y-5">
          <h3 className="text-sm font-bold font-headings text-neutral-textMain">License Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1"><p className="text-[11px] text-neutral-textMuted">License Number</p><p className="font-semibold text-neutral-textMain">{driver.licenseNo}</p></div>
            <div className="space-y-1"><p className="text-[11px] text-neutral-textMuted">Category</p><p className="font-semibold text-neutral-textMain">{driver.licenseType}</p></div>
            <div className="space-y-1"><p className="text-[11px] text-neutral-textMuted">Issue Date</p><p className="font-semibold text-neutral-textMain">{driver.licenseExpiry.replace("2027", "2019").replace("2026", "2018")}</p></div>
            <div className="space-y-1"><p className="text-[11px] text-neutral-textMuted">Expiry Date</p><p className="font-semibold text-neutral-textMain">{driver.licenseExpiry}</p></div>
            <div className="space-y-1"><p className="text-[11px] text-neutral-textMuted">Verification Status</p><div className="mt-0.5"><LicenseBadge status={driver.licenseStatus} /></div></div>
            <div className="space-y-1"><p className="text-[11px] text-neutral-textMuted">Renewal Reminder</p><p className="font-semibold text-neutral-textMain">{driver.licenseStatus === "Expiring Soon" ? "45 days remaining" : driver.licenseStatus === "Expired" ? "Overdue" : "Not required"}</p></div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-neutral-border">
            <button className="btn btn-primary text-xs flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Download License</button>
            <button className="btn btn-secondary text-xs flex items-center gap-1.5"><Upload className="w-3.5 h-3.5" /> Upload New License</button>
          </div>
        </div>

        <div className="card space-y-4">
          <h3 className="text-sm font-bold font-headings text-neutral-textMain">Quick Overview</h3>
          <div className="p-3 bg-warning-light/50 rounded-lg border border-warning/20 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-warning">Expiring Licenses</p>
              <p className="text-[11px] text-warning/80 mt-0.5">{licenseStats.expiringSoon} driver(s) need renewal soon</p>
            </div>
          </div>
          <div className="p-3 bg-danger-light/50 rounded-lg border border-danger/20 flex items-start gap-2.5">
            <XCircle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-danger">Expired Licenses</p>
              <p className="text-[11px] text-danger/80 mt-0.5">{licenseStats.expired} driver(s) with expired licenses</p>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <h4 className="text-[11px] font-semibold text-neutral-textMuted uppercase tracking-wider">All Drivers License Status</h4>
            {drivers.map(d => (
              <button key={d.id} onClick={() => navigate(`/dashboard/operations/drivers/license/${d.id}`)} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-accent-light transition-colors">
                <span className="text-xs font-medium text-neutral-textMain">{d.name}</span>
                <LicenseBadge status={d.licenseStatus} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
