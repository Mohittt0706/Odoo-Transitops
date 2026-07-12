import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  LayoutDashboard,
  Navigation,
  ShieldCheck,
  BarChart3,
  MapPin,
} from "lucide-react";
import Logo from "../components/common/Logo";

const dashboards = {
  operations: {
    title: "Operations Lead Dashboard",
    description: "Fleet management, vehicle assignments, driver coordination, and operational reports.",
    icon: LayoutDashboard,
    color: "bg-primary/10 text-primary",
    stats: [
      { label: "Active Vehicles", value: "24" },
      { label: "On Route", value: "18" },
      { label: "Drivers", value: "32" },
      { label: "Pending Tasks", value: "7" },
    ],
  },
  "road-captain": {
    title: "Road Captain Dashboard",
    description: "Trip management, route planning, fuel logs, and delivery tracking.",
    icon: Navigation,
    color: "bg-success/10 text-success",
    stats: [
      { label: "Today's Trips", value: "12" },
      { label: "Completed", value: "8" },
      { label: "In Transit", value: "4" },
      { label: "Fuel Logs", value: "15" },
    ],
  },
  safety: {
    title: "Safety Officer Dashboard",
    description: "Driver compliance, incident reports, vehicle inspections, and license management.",
    icon: ShieldCheck,
    color: "bg-warning/10 text-warning",
    stats: [
      { label: "Compliance", value: "94%" },
      { label: "Incidents", value: "2" },
      { label: "Inspections", value: "6" },
      { label: "Expiring Licenses", value: "3" },
    ],
  },
  finance: {
    title: "Finance Hub Dashboard",
    description: "Expense tracking, fuel costs, profitability analysis, and invoice management.",
    icon: BarChart3,
    color: "bg-purple-500/10 text-purple-600",
    stats: [
      { label: "Monthly Spend", value: "$48K" },
      { label: "Fuel Costs", value: "$12K" },
      { label: "Revenue", value: "$72K" },
      { label: "Pending Invoices", value: "5" },
    ],
  },
  destination: {
    title: "Destination Control Dashboard",
    description: "Incoming deliveries, warehouse operations, proof of delivery, and inventory tracking.",
    icon: MapPin,
    color: "bg-rose-500/10 text-rose-600",
    stats: [
      { label: "Incoming", value: "9" },
      { label: "Delivered", value: "14" },
      { label: "Warehouse", value: "82%" },
      { label: "POD Pending", value: "4" },
    ],
  },
};

export default function DashboardPlaceholder() {
  const { role } = useParams();
  const navigate = useNavigate();
  const dashboard = dashboards[role];

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-headings">Dashboard Not Found</h1>
          <button
            onClick={() => navigate("/role-selection")}
            className="mt-4 text-primary hover:underline text-sm font-medium"
          >
            Back to Role Selection
          </button>
        </div>
      </div>
    );
  }

  const Icon = dashboard.icon;

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <div className="h-5 w-px bg-neutral-border" />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${dashboard.color}`}>
                <Icon className="w-4 h-4" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold font-headings text-neutral-textMain">
                {dashboard.title}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/role-selection")}
            className="text-xs text-neutral-textMuted hover:text-accent transition-colors font-medium inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Switch Workspace
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold font-headings tracking-tight text-neutral-textMain">
            {dashboard.title}
          </h1>
          <p className="text-sm text-neutral-textMuted mt-1.5">{dashboard.description}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {dashboard.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm"
              >
                <div className="text-2xl font-bold font-headings text-neutral-textMain">
                  {stat.value}
                </div>
                <div className="text-xs text-neutral-textMuted font-medium mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Placeholder content */}
          <div className="mt-8 bg-white border border-neutral-border rounded-2xl p-10 shadow-soft-sm text-center">
            <div className="w-16 h-16 bg-accent-light rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-neutral-textMuted" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold font-headings text-neutral-textMain">
              Dashboard Under Development
            </h3>
            <p className="text-sm text-neutral-textMuted mt-1.5 max-w-sm mx-auto">
              This workspace is being built with full fleet management capabilities.
              Check back soon for updates.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
