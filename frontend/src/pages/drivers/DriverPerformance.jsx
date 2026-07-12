import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {
  Route, AlertTriangle, ShieldAlert, Star, Clock,
  TrendingUp, TrendingDown, ChevronDown, ArrowUpDown,
  ChevronUp, Lightbulb, ThumbsUp, Target, Zap,
  BarChart3, Fuel, CheckCircle2, Trophy
} from 'lucide-react';
import { drivers } from '../../data/drivers';
import TelemetryChart from '../../components/charts/TelemetryChart';
import BarChart from '../../components/charts/BarChart';
import AreaChart from '../../components/charts/AreaChart';
import SafetyScoreBadge from '../../components/drivers/SafetyScoreBadge';
import { cn } from '../../lib/utils';

export default function DriverPerformance() {
  const { driverId } = useParams();
  const [selectedDriverId, setSelectedDriverId] = useState(driverId || '');
  const [sortColumn, setSortColumn] = useState('month');
  const [sortDirection, setSortDirection] = useState('asc');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedDriver = drivers.find((d) => d.id === selectedDriverId) || null;
  const performanceData = selectedDriver
    ? selectedDriver.monthlyPerformance
    : (() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return months.map((month, i) => {
          const activeDrivers = drivers.filter((d) => d.monthlyPerformance[i]);
          const totalTrips = activeDrivers.reduce((s, d) => s + (d.monthlyPerformance[i]?.trips || 0), 0);
          const totalDistance = activeDrivers.reduce((s, d) => s + (d.monthlyPerformance[i]?.distance || 0), 0);
          const avgFuel = activeDrivers.reduce((s, d) => s + (d.monthlyPerformance[i]?.fuel || 0), 0) / (activeDrivers.length || 1);
          const avgRating = activeDrivers.reduce((s, d) => s + (d.monthlyPerformance[i]?.rating || 0), 0) / (activeDrivers.length || 1);
          const avgOnTime = activeDrivers.reduce((s, d) => s + (d.monthlyPerformance[i]?.onTime || 0), 0) / (activeDrivers.length || 1);
          return { month, trips: totalTrips, distance: totalDistance, fuel: Math.round(avgFuel * 10) / 10, rating: Math.round(avgRating * 100) / 100, onTime: Math.round(avgOnTime) };
        });
      })();

  const driverList = selectedDriver ? [selectedDriver] : drivers;

  const totalTrips = performanceData.reduce((s, m) => s + m.trips, 0);
  const totalDistance = performanceData.reduce((s, m) => s + m.distance, 0);
  const totalIncidents = driverList.reduce((s, d) => s + d.incidents, 0);
  const totalViolations = driverList.reduce((s, d) => s + d.violations, 0);

  const formatDistance = (d) => {
    if (d >= 1000000) return `${(d / 1000000).toFixed(1)}M mi`;
    if (d >= 1000) return `${(d / 1000).toFixed(1)}K mi`;
    return `${d} mi`;
  };

  const bestMonth = [...performanceData].sort((a, b) => b.trips - a.trips)[0];
  const avgFuelEfficiency = Math.round((performanceData.reduce((s, m) => s + m.fuel, 0) / performanceData.length) * 100) / 100;
  const avgCustomerRating = Math.round((performanceData.reduce((s, m) => s + m.rating, 0) / performanceData.length) * 100) / 100;
  const avgOnTimePerformance = Math.round(performanceData.reduce((s, m) => s + m.onTime, 0) / performanceData.length);

  const monthlyTripsData = performanceData.map((m) => ({ label: m.month, value: m.trips }));
  const monthlyDistanceData = performanceData.map((m) => ({ label: m.month, value: m.distance }));
  const safetyTrendData = performanceData.map((m) => ({ label: m.month, value: m.onTime }));
  const fuelData = performanceData.map((m) => ({ label: m.month, value: m.fuel }));

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...performanceData].sort((a, b) => {
    let aVal = a[sortColumn];
    let bVal = b[sortColumn];
    if (sortColumn === 'month') {
      const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      aVal = monthOrder.indexOf(a.month);
      bVal = monthOrder.indexOf(b.month);
    }
    if (typeof aVal === 'string') return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const findBestWorst = (key) => {
    const vals = performanceData.map((m) => m[key]);
    return { best: Math.max(...vals), worst: Math.min(...vals) };
  };

  const tripsStats = findBestWorst('trips');
  const distanceStats = findBestWorst('distance');
  const fuelStats = findBestWorst('fuel');
  const ratingStats = findBestWorst('rating');
  const onTimeStats = findBestWorst('onTime');

  const strengths = [];
  const improvements = [];
  const recommendations = [];

  if (avgOnTimePerformance >= 95) strengths.push('Consistently high on-time delivery performance');
  if (avgFuelEfficiency >= 7.5) strengths.push('Above average fuel efficiency reducing operational costs');
  if (avgCustomerRating >= 4.6) strengths.push('Excellent customer satisfaction ratings');
  if (totalIncidents <= 1) strengths.push('Strong safety record with minimal incidents');
  if (totalViolations === 0) strengths.push('Zero policy violations — fully compliant');

  if (avgOnTimePerformance < 90) improvements.push('On-time performance below target — needs schedule optimization');
  if (avgFuelEfficiency < 7.0) improvements.push('Fuel efficiency below fleet average — eco driving training recommended');
  if (totalIncidents > 3) improvements.push('High incident count — mandatory defensive driving refresher required');
  if (totalViolations > 1) improvements.push('Multiple violations detected — compliance review needed');
  if (avgCustomerRating < 4.4) improvements.push('Customer rating below expectations — service quality improvement needed');

  if (improvements.some((i) => i.includes('fuel'))) recommendations.push('Schedule eco-driving certification course');
  if (improvements.some((i) => i.includes('incident') || i.includes('violation'))) recommendations.push('Enroll in advanced defensive driving program');
  if (improvements.some((i) => i.includes('on-time'))) recommendations.push('Implement route optimization and buffer scheduling');
  if (improvements.some((i) => i.includes('customer'))) recommendations.push('Conduct customer service skills workshop');
  if (strengths.length === 0 && improvements.length === 0) recommendations.push('Maintain current performance standards');

  const kpis = [
    { label: 'Total Trips', value: totalTrips.toLocaleString(), icon: Trip, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Distance', value: formatDistance(totalDistance), icon: Route, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Accidents', value: totalIncidents, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    { label: 'Violations', value: totalViolations, icon: ShieldAlert, color: 'text-amber-600 bg-amber-50' },
  ];

  const summaryCards = [
    { label: 'Best Month', value: bestMonth.month, sub: `${bestMonth.trips} trips`, icon: Trophy, color: 'text-violet-600 bg-violet-50' },
    { label: 'Avg Fuel Efficiency', value: `${avgFuelEfficiency}`, sub: 'mi/kWh', icon: Fuel, color: 'text-cyan-600 bg-cyan-50' },
    { label: 'Customer Rating', value: avgCustomerRating.toFixed(1), sub: 'out of 5.0', icon: Star, color: 'text-amber-600 bg-amber-50' },
    { label: 'On-Time %', value: `${avgOnTimePerformance}%`, sub: 'performance', icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
  ];

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return <ArrowUpDown className="w-3 h-3 text-slate-300" />;
    return sortDirection === 'asc' ? <ChevronUp className="w-3 h-3 text-blue-600" /> : <ChevronDown className="w-3 h-3 text-blue-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Driver Performance Analytics</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Comprehensive performance metrics and insights</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-slate-300 hover:shadow-sm transition-all min-w-[200px] justify-between"
          >
            <span className="truncate">
              {selectedDriver ? selectedDriver.fullName : 'All Drivers (Aggregate)'}
            </span>
            <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', dropdownOpen && 'rotate-180')} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
              <button
                onClick={() => { setSelectedDriverId(''); setDropdownOpen(false); }}
                className={cn(
                  'w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 transition-colors border-b border-slate-100',
                  !selectedDriverId ? 'text-blue-600 bg-blue-50' : 'text-slate-700'
                )}
              >
                All Drivers (Aggregate)
              </button>
              {drivers.map((d) => (
                <button
                  key={d.id}
                  onClick={() => { setSelectedDriverId(d.id); setDropdownOpen(false); }}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-slate-50 transition-colors',
                    selectedDriverId === d.id ? 'text-blue-600 bg-blue-50' : 'text-slate-700'
                  )}
                >
                  <span>{d.fullName}</span>
                  <span className="text-slate-400 ml-1.5 font-semibold">({d.id})</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedDriver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center gap-5"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-md">
            <span className="text-base font-black text-white">{selectedDriver.initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-black text-slate-900 truncate">{selectedDriver.fullName}</h2>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              {selectedDriver.employment.role} — {selectedDriver.employment.department}
            </p>
          </div>
          <SafetyScoreBadge score={selectedDriver.safetyScore} size="lg" />
        </motion.div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-sm transition-all group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase">{kpi.label}</span>
                <div className={cn('p-1.5 rounded-lg group-hover:scale-105 transition-transform', kpi.color)}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-mono">{kpi.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-sm transition-all group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase">{card.label}</span>
                <div className={cn('p-1.5 rounded-lg group-hover:scale-105 transition-transform', card.color)}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-mono">{card.value}</h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">{card.sub}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm"
        >
          <BarChart
            title="Monthly Trips"
            subtitle="Trip count per month"
            data={monthlyTripsData}
            color="blue"
            height={200}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm"
        >
          <AreaChart
            title="Monthly Distance"
            subtitle="Distance covered per month"
            data={monthlyDistanceData}
            color="green"
            height={200}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm"
        >
          <TelemetryChart
            type="line"
            title="Safety Score Trend"
            subtitle="On-time delivery percentage"
            data={safetyTrendData}
            color="orange"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.45 }}
          className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm"
        >
          <BarChart
            title="Fuel Efficiency Trend"
            subtitle="Monthly fuel efficiency (mi/kWh)"
            data={fuelData}
            color="cyan"
            height={200}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm overflow-hidden"
      >
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Monthly Performance Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {[
                  { key: 'month', label: 'Month' },
                  { key: 'trips', label: 'Trips' },
                  { key: 'distance', label: 'Distance' },
                  { key: 'fuel', label: 'Fuel Eff.' },
                  { key: 'rating', label: 'Rating' },
                  { key: 'onTime', label: 'On-Time %' },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="text-left px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{col.label}</span>
                      <SortIcon column={col.key} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-xs font-black text-slate-800">{row.month}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'text-xs font-bold font-mono px-2 py-0.5 rounded',
                      row.trips === tripsStats.best ? 'bg-emerald-50 text-emerald-700' :
                      row.trips === tripsStats.worst ? 'bg-red-50 text-red-600' :
                      'text-slate-700'
                    )}>
                      {row.trips}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'text-xs font-bold font-mono px-2 py-0.5 rounded',
                      row.distance === distanceStats.best ? 'bg-emerald-50 text-emerald-700' :
                      row.distance === distanceStats.worst ? 'bg-red-50 text-red-600' :
                      'text-slate-700'
                    )}>
                      {row.distance.toLocaleString()} mi
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'text-xs font-bold font-mono px-2 py-0.5 rounded',
                      row.fuel === fuelStats.best ? 'bg-emerald-50 text-emerald-700' :
                      row.fuel === fuelStats.worst ? 'bg-red-50 text-red-600' :
                      'text-slate-700'
                    )}>
                      {row.fuel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className={cn(
                        'w-3 h-3',
                        row.rating === ratingStats.best ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                      )} />
                      <span className={cn(
                        'text-xs font-bold font-mono px-2 py-0.5 rounded',
                        row.rating === ratingStats.best ? 'bg-emerald-50 text-emerald-700' :
                        row.rating === ratingStats.worst ? 'bg-red-50 text-red-600' :
                        'text-slate-700'
                      )}>
                        {row.rating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            row.onTime === onTimeStats.best ? 'bg-emerald-500' :
                            row.onTime === onTimeStats.worst ? 'bg-red-500' :
                            'bg-blue-500'
                          )}
                          style={{ width: `${row.onTime}%` }}
                        />
                      </div>
                      <span className={cn(
                        'text-xs font-bold font-mono',
                        row.onTime === onTimeStats.best ? 'text-emerald-700' :
                        row.onTime === onTimeStats.worst ? 'text-red-600' :
                        'text-slate-700'
                      )}>
                        {row.onTime}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.55 }}
        className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-5">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Performance Insights</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-emerald-50">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Strengths</h4>
            </div>
            {strengths.length > 0 ? strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-[11px] font-semibold text-slate-700">{s}</span>
              </div>
            )) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400">No standout strengths identified</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-amber-50">
                <Target className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Areas for Improvement</h4>
            </div>
            {improvements.length > 0 ? improvements.map((s, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                <TrendingDown className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-[11px] font-semibold text-slate-700">{s}</span>
              </div>
            )) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400">All metrics within acceptable range</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-lg bg-blue-50">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Recommendations</h4>
            </div>
            {recommendations.length > 0 ? recommendations.map((s, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                <span className="text-[11px] font-semibold text-slate-700">{s}</span>
              </div>
            )) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400">Continue current training regimen</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
