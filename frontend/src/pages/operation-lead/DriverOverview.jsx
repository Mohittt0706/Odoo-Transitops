import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, CheckCircle, Truck, Clock, AlertTriangle,
  FileWarning, Shield, TrendingUp, UserPlus, List,
  ShieldCheck, ChevronRight, CalendarDays, Award,
  Activity, ArrowRight
} from 'lucide-react';
import { drivers } from '../../data/drivers';
import DonutChart from '../../components/charts/DonutChart';
import AreaChart from '../../components/charts/AreaChart';
import BarChart from '../../components/charts/BarChart';
import { cn } from '../../lib/utils';

export default function DriverOverview() {
  const totalDrivers = drivers.length;
  const availableDrivers = drivers.filter(d => d.operationalStatus === 'Available').length;
  const onTripDrivers = drivers.filter(d => d.operationalStatus === 'On Trip').length;
  const offDutyDrivers = drivers.filter(d => d.operationalStatus === 'Off Duty').length;
  const suspendedDrivers = drivers.filter(d => d.operationalStatus === 'Suspended').length;
  const expiringLicenses = drivers.filter(d => d.license.status === 'Expiring Soon').length;
  const avgSafetyScore = Math.round(drivers.reduce((sum, d) => sum + d.safetyScore, 0) / totalDrivers);
  const driverUtilization = Math.round((onTripDrivers / totalDrivers) * 100);

  const statusDistribution = [
    { label: 'Available', value: availableDrivers, color: '#22C55E' },
    { label: 'On Trip', value: onTripDrivers, color: '#06B6D4' },
    { label: 'Off Duty', value: offDutyDrivers, color: '#F59E0B' },
    { label: 'Suspended', value: suspendedDrivers, color: '#EF4444' },
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const safetyTrendData = months.map((month, i) => {
    const scores = drivers.map(d => d.monthlyPerformance[i]?.rating ? d.monthlyPerformance[i].rating * 20 : 85);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return { label: month, value: avg };
  });

  const tripCountData = months.map((month, i) => {
    const totalTrips = drivers.reduce((sum, d) => sum + (d.monthlyPerformance[i]?.trips || 0), 0);
    return { label: month, value: totalTrips };
  });

  const licenseExpiryData = drivers.map(d => {
    const expiry = new Date(d.license.expiryDate);
    const now = new Date();
    const monthsUntil = Math.max(0, Math.round((expiry - now) / (1000 * 60 * 60 * 24 * 30)));
    return { label: d.firstName, value: monthsUntil };
  });

  const allHistory = drivers.flatMap(d =>
    d.history.map(h => ({ ...h, driver: d.fullName, driverId: d.id }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date));
  const recentActivity = allHistory.slice(0, 5);

  const upcomingRenewals = drivers
    .filter(d => d.license.status === 'Expiring Soon' || new Date(d.license.expiryDate) > new Date())
    .sort((a, b) => new Date(a.license.expiryDate) - new Date(b.license.expiryDate))
    .slice(0, 5);

  const topPerformers = [...drivers]
    .sort((a, b) => b.safetyScore - a.safetyScore)
    .slice(0, 5);

  const kpis = [
    { label: 'Total Drivers', value: totalDrivers, sub: `${totalDrivers} registered`, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Available Drivers', value: availableDrivers, sub: `${Math.round((availableDrivers / totalDrivers) * 100)}% of fleet`, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Drivers On Trip', value: onTripDrivers, sub: `${driverUtilization}% utilization`, icon: Truck, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Off Duty', value: offDutyDrivers, sub: `${Math.round((offDutyDrivers / totalDrivers) * 100)}% of fleet`, icon: Clock, color: 'text-orange-600 bg-orange-50' },
    { label: 'Suspended', value: suspendedDrivers, sub: 'Requires attention', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    { label: 'Expiring Licenses', value: expiringLicenses, sub: 'Renewal pending', icon: FileWarning, color: 'text-amber-600 bg-amber-50' },
    { label: 'Avg Safety Score', value: avgSafetyScore, sub: 'Across all drivers', icon: Shield, color: 'text-purple-600 bg-purple-50' },
    { label: 'Fleet Utilization', value: `${driverUtilization}%`, sub: 'On trip vs total', icon: TrendingUp, color: 'text-indigo-600 bg-indigo-50' },
  ];

  const historyIconMap = {
    trip: { icon: Truck, color: 'text-blue-600 bg-blue-50' },
    training: { icon: Award, color: 'text-emerald-600 bg-emerald-50' },
    incident: { icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    warning: { icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    license: { icon: FileWarning, color: 'text-orange-600 bg-orange-50' },
    vehicle: { icon: Truck, color: 'text-cyan-600 bg-cyan-50' },
    promotion: { icon: Award, color: 'text-purple-600 bg-purple-50' },
    medical: { icon: ShieldCheck, color: 'text-rose-600 bg-rose-50' },
    suspension: { icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Driver Management Overview</h1>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">Real-time driver metrics and compliance tracking</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-350 hover:shadow-sm transition-all duration-200 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase">{kpi.label}</span>
                <div className={cn('p-1.5 rounded-lg transition-transform group-hover:scale-105', kpi.color)}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-mono mb-1">{kpi.value}</h3>
              <p className="text-[10px] text-slate-400 font-bold">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex items-center justify-center">
          <DonutChart
            title="Driver Status Distribution"
            subtitle="Current operational breakdown"
            data={statusDistribution}
          />
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <AreaChart
            title="Safety Score Trend"
            subtitle="Monthly average safety rating across fleet"
            data={safetyTrendData}
            color="green"
            height={200}
          />
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <BarChart
            title="Monthly Trip Count"
            subtitle="Total trips per driver per month"
            data={tripCountData}
            color="blue"
            height={200}
          />
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <BarChart
            title="License Expiry Timeline"
            subtitle="Months remaining until expiry per driver"
            data={licenseExpiryData}
            color="orange"
            height={200}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xs font-black text-slate-900 mb-5 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Recent Driver Activity
          </h3>
          <div className="flex flex-col gap-3">
            {recentActivity.map((event, idx) => {
              const mapped = historyIconMap[event.type] || { icon: Activity, color: 'text-slate-600 bg-slate-50' };
              const EventIcon = mapped.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className={cn('p-1.5 rounded-lg shrink-0', mapped.color)}>
                    <EventIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-[11px] font-black text-slate-800 truncate">{event.title}</h4>
                      <span className="text-[9px] text-slate-400 font-semibold shrink-0 font-mono">{event.date}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{event.driver}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xs font-black text-slate-900 mb-5 uppercase tracking-wider flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-amber-600" />
            Upcoming License Renewals
          </h3>
          <div className="flex flex-col gap-3">
            {upcomingRenewals.map((driver, idx) => {
              const expiry = new Date(driver.license.expiryDate);
              const now = new Date();
              const daysUntil = Math.max(0, Math.round((expiry - now) / (1000 * 60 * 60 * 24)));
              return (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-black text-slate-600">{driver.initials}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[11px] font-black text-slate-800 truncate">{driver.fullName}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{driver.license.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={cn(
                      'text-[9px] font-black px-2 py-0.5 rounded border',
                      daysUntil < 60
                        ? 'bg-red-50 border-red-100 text-red-600'
                        : daysUntil < 120
                          ? 'bg-amber-50 border-amber-100 text-amber-600'
                          : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                    )}>
                      {daysUntil}d
                    </span>
                    <p className="text-[9px] text-slate-400 font-semibold mt-1 font-mono">{driver.license.expiryDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xs font-black text-slate-900 mb-5 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-600" />
            Top Performing Drivers
          </h3>
          <div className="flex flex-col gap-3">
            {topPerformers.map((driver, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black',
                  idx === 0 ? 'bg-amber-100 text-amber-700' :
                    idx === 1 ? 'bg-slate-200 text-slate-600' :
                      idx === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-500'
                )}>
                  #{idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[11px] font-black text-slate-800 truncate">{driver.fullName}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{driver.employment.role}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-sm font-black text-slate-900 font-mono">{driver.safetyScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/drivers/register"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm hover:shadow transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Register New Driver
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/drivers/all"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold shadow-sm hover:shadow transition-all"
        >
          <List className="w-4 h-4" />
          View All Drivers
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/drivers/licenses"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold shadow-sm hover:shadow transition-all"
        >
          <ShieldCheck className="w-4 h-4" />
          License Compliance
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
