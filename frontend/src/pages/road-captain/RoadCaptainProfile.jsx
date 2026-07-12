import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import ChartCard from "../../components/ui/ChartCard";
import {
  User,
  Phone,
  Mail,
  BadgeCheck,
  Truck,
  Star,
  Clock,
  Ruler,
  TrendingUp,
  CheckCircle,
  Calendar,
  MapPin,
} from "lucide-react";

const profileStats = [
  { label: "Total Trips", value: "512", icon: Truck, color: "bg-primary/10 text-primary" },
  { label: "Rating", value: "4.9 / 5", icon: Star, color: "bg-warning-light text-warning" },
  { label: "Experience", value: "12 years", icon: Clock, color: "bg-success-light text-success" },
  { label: "Total Distance", value: "1.8L km", icon: Ruler, color: "bg-purple-50 text-purple-600" },
];

const performanceMetrics = [
  { label: "On-Time Delivery", value: "97%", target: "95%", met: true },
  { label: "Safety Score", value: "99%", target: "90%", met: true },
  { label: "Fuel Efficiency", value: "4.8 km/L", target: "4.5 km/L", met: true },
  { label: "Compliance", value: "99%", target: "95%", met: true },
  { label: "Customer Rating", value: "4.9", target: "4.5", met: true },
  { label: "Cargo Damage", value: "0.2%", target: "<1%", met: true },
];

const recentActivity = [
  { date: "2026-07-12", action: "Trip TR-0084 started", route: "Mumbai → Pune", icon: Truck, color: "text-primary" },
  { date: "2026-07-11", action: "Trip TR-0077 completed", route: "Chennai → Bangalore", icon: CheckCircle, color: "text-success" },
  { date: "2026-07-10", action: "Pre-trip inspection passed", route: "MH-12-RT-2244", icon: CheckCircle, color: "text-success" },
  { date: "2026-07-09", action: "Fuel logged at BPCL", route: "95L — ₹8,550", icon: MapPin, color: "text-warning" },
  { date: "2026-07-08", action: "Tire rotation completed", route: "Scheduled maintenance", icon: Calendar, color: "text-purple-600" },
];

export default function RoadCaptainProfile() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="My Profile"
        subtitle="Your driver profile and performance"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Profile" delay={0} className="lg:col-span-1">
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold font-headings text-neutral-textMain">
              Vikram Singh
            </h2>
            <p className="text-sm text-neutral-textMuted mt-1">Road Captain</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-semibold text-warning">4.9</span>
              <span className="text-xs text-neutral-textMuted ml-1">(512 trips)</span>
            </div>
          </div>

          <div className="space-y-3 mt-4 border-t border-neutral-border pt-4">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-neutral-textMuted flex-shrink-0" />
              <span className="text-sm text-neutral-textMain">+91 98765 43212</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-neutral-textMuted flex-shrink-0" />
              <span className="text-sm text-neutral-textMain">vikram.singh@transitops.in</span>
            </div>
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-4 h-4 text-neutral-textMuted flex-shrink-0" />
              <span className="text-sm text-neutral-textMain">MH-2018-2244</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-neutral-textMuted flex-shrink-0" />
              <span className="text-sm text-neutral-textMain">12 years experience</span>
            </div>
          </div>
        </ChartCard>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {profileStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} mb-3`}>
                  <stat.icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-lg font-bold font-headings text-neutral-textMain mt-1">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          <ChartCard title="Performance Metrics" delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {performanceMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80"
                >
                  <div>
                    <p className="text-sm font-medium text-neutral-textMain">
                      {metric.label}
                    </p>
                    <p className="text-[11px] text-neutral-textMuted mt-0.5">
                      Target: {metric.target}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-neutral-textMain">
                      {metric.value}
                    </span>
                    {metric.met && (
                      <TrendingUp className="w-4 h-4 text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <ChartCard title="Recent Activity" delay={0.25}>
        <div className="space-y-0">
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3 border-b border-neutral-border/50 last:border-0"
            >
              <div className="mt-0.5">
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-textMain">
                  {activity.action}
                </p>
                <p className="text-xs text-neutral-textMuted mt-0.5">{activity.route}</p>
              </div>
              <span className="text-[11px] text-neutral-textMuted flex-shrink-0">
                {activity.date}
              </span>
            </div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}
