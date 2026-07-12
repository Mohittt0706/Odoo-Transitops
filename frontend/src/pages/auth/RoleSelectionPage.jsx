import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Navigation, ShieldCheck,
  BarChart3, MapPin, ArrowRight, ArrowLeft, Truck,
  Users, Route, DollarSign, Package,
} from "lucide-react";

const roles = [];

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-border px-5 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Truck className="w-[15px] h-[15px] text-white" />
            </div>
            <span className="text-sm font-bold text-neutral-textMain tracking-tight">
              Transit<span className="text-accent">Ops</span>
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-[12px] text-neutral-textMuted hover:text-primary transition-colors font-medium inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-5 py-10 sm:py-14">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-textMain">
            Choose Your Workspace
          </h1>
          <p className="text-[13px] text-neutral-textMuted mt-1.5 max-w-lg">
            Select the role that matches your responsibilities to enter your personalized dashboard.
          </p>
        </motion.div>

        {/* Role cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {roles.map((role, index) => {
            const RoleIcon = role.icon;
            return (
              <motion.button
                key={role.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.07, duration: 0.35, ease: "easeOut" }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(role.route)}
                className={`group w-full text-left bg-white border border-neutral-border rounded-lg p-4 shadow-soft-sm hover:shadow-soft-md transition-all duration-200 ${role.borderHover} cursor-pointer flex flex-col gap-3`}
              >
                {/* Card header */}
                <div className="flex items-start justify-between">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${role.bgColor}`}>
                    <RoleIcon className={`w-[18px] h-[18px] ${role.textColor}`} strokeWidth={1.8} />
                  </div>
                  <ArrowRight className={`w-4 h-4 text-neutral-border group-hover:${role.textColor} group-hover:translate-x-0.5 transition-all duration-200`} />
                </div>

                {/* Title */}
                <div>
                  <h3 className={`text-[13px] font-bold text-neutral-textMain group-hover:${role.textColor} transition-colors duration-200`}>
                    {role.title}
                  </h3>
                  <p className={`text-[10px] font-semibold uppercase tracking-widest mt-0.5 ${role.textColor}`}>
                    {role.sub}
                  </p>
                  <p className="text-[12px] text-neutral-textMuted mt-1.5 leading-relaxed line-clamp-2">
                    {role.description}
                  </p>
                </div>

                {/* Mini stats */}
                <div className="flex items-center gap-3 pt-2 border-t border-neutral-border/60">
                  {role.stats.map((stat, si) => (
                    <div key={si} className="flex-1 text-center">
                      <div className={`text-[13px] font-extrabold tabular-nums ${role.textColor}`}>{stat.value}</div>
                      <div className="text-[9px] text-neutral-textMuted font-medium uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-[11px] text-neutral-textMuted mt-8"
        >
          Need a different workspace? Contact your administrator.
        </motion.p>
      </main>
    </div>
  );
}
