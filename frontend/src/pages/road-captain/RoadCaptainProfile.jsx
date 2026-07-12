import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import { MetricCard } from "../../components/road-captain/RoadCaptainComponents";
import { performanceData } from "../../data/roadCaptainData";
import { User, Phone, Mail, BadgeCheck, Truck, Star, Clock, Ruler, TrendingUp, CheckCircle, Calendar, MapPin, Gauge, Target, Edit3, Shield } from "lucide-react";

const profileStats = [
  { label: "Total Trips", value: "512", icon: Truck, color: "primary" },
  { label: "Rating", value: "4.9 / 5", icon: Star, color: "warning" },
  { label: "Experience", value: "12 years", icon: Clock, color: "success" },
  { label: "Total Distance", value: "1.8L km", icon: Ruler, color: "purple" },
];

const performanceMetrics = [
  { label: "On-Time Delivery", value: "97%", target: "95%", met: true },
  { label: "Safety Score", value: "99%", target: "90%", met: true },
  { label: "Fuel Efficiency", value: "5.2 km/L", target: "4.5 km/L", met: true },
  { label: "Compliance", value: "99%", target: "95%", met: true },
  { label: "Customer Rating", value: "4.9", target: "4.5", met: true },
  { label: "Trip Completion", value: "98%", target: "95%", met: true },
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="My Profile" subtitle="Driver profile and performance" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Profile" delay={0} className="lg:col-span-1">
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold font-headings text-neutral-textMain">Vikram Singh</h2>
            <p className="text-sm text-neutral-textMuted">Road Captain</p>
            <p className="text-xs text-neutral-textMuted mt-0.5">EMP-0042</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-semibold text-warning">4.9</span>
              <span className="text-xs text-neutral-textMuted">(512 trips)</span>
            </div>
          </div>
          <div className="space-y-2.5 mt-4 border-t border-neutral-border pt-4">
            {[
              { icon: Phone, text: "+91 98765 43212" },
              { icon: Mail, text: "vikram.singh@transitops.in" },
              { icon: BadgeCheck, text: "MH-2018-2244 (License)" },
              { icon: MapPin, text: "Mumbai, Maharashtra" },
              { icon: Calendar, text: "Joined Jan 2018" },
              { icon: Shield, text: "Safety Score: 99%" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <s.icon className="w-4 h-4 text-neutral-textMuted flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-neutral-textMain">{s.text}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {profileStats.map((s, i) => <MetricCard key={s.label} {...s} delay={i * 0.05} />)}
          </div>

          <ChartCard title="Performance Metrics" delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {performanceMetrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80">
                  <div>
                    <p className="text-sm font-medium text-neutral-textMain">{metric.label}</p>
                    <p className="text-[11px] text-neutral-textMuted mt-0.5">Target: {metric.target}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-neutral-textMain">{metric.value}</span>
                    {metric.met && <TrendingUp className="w-4 h-4 text-success" />}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ChartCard title="Safety Score Trend" delay={0.2}>
              <SimpleBarChart data={performanceData.safetyScore.map((v, i) => ({ label: `W${i + 1}`, value: v }))} color="#16A34A" />
            </ChartCard>
            <ChartCard title="Fuel Efficiency" delay={0.25}>
              <SimpleBarChart data={performanceData.fuelEfficiency.map((v, i) => ({ label: `W${i + 1}`, value: Math.round(v * 10) }))} color="#F59E0B" />
            </ChartCard>
          </div>
        </div>
      </div>

      <ChartCard title="Recent Activity" delay={0.3}>
        <div className="space-y-0">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-neutral-border/50 last:border-0">
              <div className="mt-0.5"><a.icon className={`w-4 h-4 ${a.color}`} /></div>
              <div className="flex-1"><p className="text-sm font-medium text-neutral-textMain">{a.action}</p><p className="text-xs text-neutral-textMuted mt-0.5">{a.route}</p></div>
              <span className="text-[11px] text-neutral-textMuted flex-shrink-0">{a.date}</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}
