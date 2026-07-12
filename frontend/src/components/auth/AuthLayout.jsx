import { motion } from "framer-motion";
import {
  Truck,
  MapPin,
  BarChart3,
  Route,
  Users,
  Shield,
  Warehouse,
  Fuel,
  ClipboardCheck,
} from "lucide-react";
import Logo from "../common/Logo";

const floatingIcons = [
  { Icon: Truck, x: "15%", y: "20%", delay: 0, size: "w-5 h-5" },
  { Icon: MapPin, x: "75%", y: "15%", delay: 0.3, size: "w-4 h-4" },
  { Icon: BarChart3, x: "85%", y: "55%", delay: 0.6, size: "w-5 h-5" },
  { Icon: Route, x: "10%", y: "70%", delay: 0.9, size: "w-4 h-4" },
  { Icon: Users, x: "65%", y: "80%", delay: 1.2, size: "w-5 h-5" },
  { Icon: Shield, x: "30%", y: "85%", delay: 1.5, size: "w-4 h-4" },
  { Icon: Warehouse, x: "50%", y: "10%", delay: 0.4, size: "w-4 h-4" },
  { Icon: Fuel, x: "90%", y: "35%", delay: 0.8, size: "w-3.5 h-3.5" },
  { Icon: ClipboardCheck, x: "20%", y: "45%", delay: 1.1, size: "w-4 h-4" },
];

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex lg:flex-row flex-col">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-[52%] relative bg-gradient-to-br from-slate-50 via-white to-primary/[0.03] overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.35]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="authGrid"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.8" fill="#94a3b8" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#authGrid)" />
          </svg>
        </div>

        {/* Floating icons */}
        {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
              }}
            >
              <Icon className={size} />
            </motion.div>
          </motion.div>
        ))}

        {/* Center illustration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main card illustration */}
            <div className="w-[340px] bg-white rounded-2xl border border-neutral-border shadow-soft-lg p-6 relative">
              {/* Header bar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
                <div className="ml-auto text-[10px] text-neutral-textMuted font-mono">
                  TransitOps Control
                </div>
              </div>

              {/* Fleet map mockup */}
              <div className="bg-slate-50 rounded-xl border border-neutral-border p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-semibold text-neutral-textMuted uppercase tracking-wider">
                    Live Fleet Tracking
                  </span>
                </div>
                <div className="relative h-28 bg-slate-100 rounded-lg overflow-hidden">
                  {/* Route lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 300 120"
                  >
                    <motion.path
                      d="M 20 80 Q 80 20, 150 50 T 280 30"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path
                      d="M 10 40 Q 100 70, 180 35 T 290 60"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, delay: 0.8 }}
                    />
                  </svg>
                  {/* Vehicle dots */}
                  {[
                    { x: "25%", y: "55%", color: "bg-primary" },
                    { x: "55%", y: "35%", color: "bg-success" },
                    { x: "78%", y: "25%", color: "bg-primary" },
                    { x: "42%", y: "65%", color: "bg-warning" },
                  ].map((dot, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2.5 h-2.5 ${dot.color} rounded-full shadow-sm`}
                      style={{ left: dot.x, top: dot.y }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.2 }}
                    />
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Active", value: "24", color: "text-success" },
                  { label: "Routes", value: "18", color: "text-primary" },
                  { label: "Alerts", value: "3", color: "text-warning" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-slate-50 rounded-lg p-2.5 text-center border border-neutral-border"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                  >
                    <div className={`text-lg font-bold font-headings ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-[9px] text-neutral-textMuted font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badges around the card */}
            <motion.div
              className="absolute -top-3 -right-3 bg-white border border-neutral-border rounded-lg px-3 py-1.5 shadow-soft-md flex items-center gap-1.5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-semibold text-neutral-textMuted">
                24 Online
              </span>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 -left-3 bg-white border border-neutral-border rounded-lg px-3 py-1.5 shadow-soft-md flex items-center gap-1.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
            >
              <Route className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-semibold text-neutral-textMuted">
                98.2% On-Time
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom branding */}
        <div className="absolute bottom-8 left-8">
          <Logo size="sm" />
          <p className="text-xs text-neutral-textMuted mt-2 ml-11 max-w-[280px]">
            Enterprise fleet management for modern logistics operations.
          </p>
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white min-h-screen">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Logo size="md" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
