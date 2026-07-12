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
import Logo from "../components/common/Logo";

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
      {/* Left Panel — Enterprise Navy Branded */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden"
           style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #0F2340 50%, #162D4A 100%)" }}>

        {/* Subtle grid dot pattern */}
        <div className="absolute inset-0 opacity-[0.12]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="authGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#authGrid)" />
          </svg>
        </div>

        {/* Radial glow accent */}
        <div className="absolute inset-0 opacity-20"
             style={{ background: "radial-gradient(ellipse at 30% 40%, #0369A1 0%, transparent 60%)" }} />

        {/* Floating icons */}
        {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
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
              style={{ willChange: "transform" }}
            >
              <Icon className={size} />
            </motion.div>
          </motion.div>
        ))}

        {/* Center illustration card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main card */}
            <div className="w-[340px] bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-soft-xl p-6 relative">
              {/* Header bar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-danger/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
                <div className="ml-auto text-[10px] text-white/60 font-mono">
                  TransitOps Control
                </div>
              </div>

              {/* Fleet map mockup */}
              <div className="bg-white/10 rounded-xl border border-white/20 p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">
                    Live Fleet Tracking
                  </span>
                </div>
                <div className="relative h-28 bg-white/5 rounded-lg overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 120">
                    <motion.path
                      d="M 20 80 Q 80 20, 150 50 T 280 30"
                      fill="none"
                      stroke="#0369A1"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                    />
                    <motion.path
                      d="M 10 40 Q 100 70, 180 35 T 290 60"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2.5, delay: 0.8 }}
                    />
                  </svg>
                  {[
                    { x: "25%", y: "55%", color: "bg-accent" },
                    { x: "55%", y: "35%", color: "bg-success" },
                    { x: "78%", y: "25%", color: "bg-accent" },
                    { x: "42%", y: "65%", color: "bg-warning" },
                  ].map((dot, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2.5 h-2.5 ${dot.color} rounded-full shadow-sm ring-2 ring-white/30`}
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
                  { label: "Routes", value: "18", color: "text-white" },
                  { label: "Alerts", value: "3", color: "text-warning" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/10 rounded-lg p-2.5 text-center border border-white/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                  >
                    <div className={`text-lg font-extrabold tabular-nums ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-[9px] text-white/50 font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-3 -right-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 flex items-center gap-1.5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-semibold text-white/80">24 Online</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-3 -left-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 flex items-center gap-1.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
            >
              <Route className="w-3 h-3 text-white/70" />
              <span className="text-[10px] font-semibold text-white/80">98.2% On-Time</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom branding */}
        <div className="absolute bottom-8 left-8">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm tracking-tight">
              Transit<span className="text-accent">Ops</span>
            </span>
          </div>
          <p className="text-xs text-white/50 max-w-[280px] leading-relaxed">
            Enterprise fleet management for modern logistics operations.
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-neutral-light min-h-screen">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Truck className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-neutral-textMain text-base">
              Transit<span className="text-accent">Ops</span>
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
