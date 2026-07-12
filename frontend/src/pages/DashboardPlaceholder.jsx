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

const dashboards = {};

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
