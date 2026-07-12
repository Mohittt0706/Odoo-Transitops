import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Navigation,
  ShieldCheck,
  BarChart3,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Logo from "../../components/common/Logo";

const roles = [
  {
    title: "Operations Lead",
    description:
      "Manage vehicles, drivers, fleet operations, assignments, and reports.",
    icon: LayoutDashboard,
    color: "bg-primary/10 text-primary",
    route: "/dashboard/operations",
  },
  {
    title: "Road Captain",
    description:
      "Manage assigned trips, routes, fuel logs, and deliveries.",
    icon: Navigation,
    color: "bg-success/10 text-success",
    route: "/dashboard/road-captain",
  },
  {
    title: "Safety Officer",
    description:
      "Monitor driver compliance, incidents, inspections, and licenses.",
    icon: ShieldCheck,
    color: "bg-warning/10 text-warning",
    route: "/dashboard/safety",
  },
  {
    title: "Finance Hub",
    description:
      "Manage expenses, fuel costs, profitability, invoices, and reports.",
    icon: BarChart3,
    color: "bg-purple-500/10 text-purple-600",
    route: "/dashboard/finance",
  },
  {
    title: "Destination Control",
    description:
      "Track incoming deliveries, warehouse operations, and proof of delivery.",
    icon: MapPin,
    color: "bg-rose-500/10 text-rose-600",
    route: "/dashboard/destination",
  },
];

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={() => navigate("/")}
            className="text-xs text-neutral-textMuted hover:text-accent transition-colors font-medium inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5"
          >
            <LayoutDashboard className="w-7 h-7 text-primary" strokeWidth={1.8} />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headings tracking-tight text-neutral-textMain">
            Choose Your Workspace
          </h1>
          <p className="text-sm sm:text-base text-neutral-textMuted mt-2.5 max-w-md mx-auto leading-relaxed">
            Select the workspace that matches your responsibilities.
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="space-y-3">
          {roles.map((role, index) => (
            <motion.button
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 + index * 0.08,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              onClick={() => navigate(role.route)}
              className="group w-full text-left bg-white border border-neutral-border rounded-2xl p-5 sm:p-6 shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 hover:border-primary/30 cursor-pointer flex items-center gap-4 sm:gap-5"
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${role.color}`}
              >
                <role.icon className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold font-headings text-neutral-textMain group-hover:text-primary transition-colors duration-300">
                  {role.title}
                </h3>
                <p className="text-sm text-neutral-textMuted mt-0.5 leading-relaxed">
                  {role.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-neutral-border group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-neutral-textMuted mt-8"
        >
          Need a different workspace? Contact your administrator.
        </motion.p>
      </main>
    </div>
  );
}
