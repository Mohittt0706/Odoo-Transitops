import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  ShieldCheck,
  Clock,
  AlertTriangle,
  XCircle,
  ChevronDown,
  Eye,
  RefreshCw,
  CalendarClock,
  Bell,
  ChevronRight,
  FileSpreadsheet,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import StatusBadge from '../../components/drivers/StatusBadge';
import AreaChart from '../../components/charts/AreaChart';
import { drivers } from '../../data/drivers';

const licenseStatuses = ['Active', 'Expiring Soon', 'Expired'];
const categoryOptions = ['Class A CDL', 'Class B CDL', 'Class C CDL'];

function getDaysUntilExpiry(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getMonthLabel(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

export default function LicenseManagement() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const allLicenses = useMemo(
    () => drivers.map((d) => ({ ...d, daysUntilExpiry: getDaysUntilExpiry(d.license.expiryDate) })),
    []
  );

  const kpis = useMemo(() => {
    const total = allLicenses.length;
    const active = allLicenses.filter((d) => d.license.status === 'Active').length;
    const expiringSoon = allLicenses.filter((d) => d.license.status === 'Expiring Soon').length;
    const expired = allLicenses.filter((d) => d.license.status === 'Expired').length;
    return { total, active, expiringSoon, expired };
  }, [allLicenses]);

  const statusProportions = useMemo(() => {
    const total = kpis.total || 1;
    return {
      active: (kpis.active / total) * 100,
      expiring: (kpis.expiringSoon / total) * 100,
      expired: (kpis.expired / total) * 100,
    };
  }, [kpis]);

  const expiryTimelineData = useMemo(() => {
    const now = new Date();
    const months = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      months.push({
        label: d.toLocaleDateString('en-US', { month: 'short' }),
        year: d.getFullYear(),
        month: d.getMonth(),
        count: 0,
      });
    }
    allLicenses.forEach((driver) => {
      const exp = new Date(driver.license.expiryDate);
      for (const m of months) {
        if (exp.getMonth() === m.month && exp.getFullYear() === m.year) {
          m.count++;
        }
      }
    });
    return months.map((m) => ({ label: m.label, value: m.count }));
  }, [allLicenses]);

  const filteredLicenses = useMemo(() => {
    let result = allLicenses;
    if (statusFilter !== 'All') {
      result = result.filter((d) => d.license.status === statusFilter);
    }
    if (categoryFilter !== 'All') {
      result = result.filter((d) => d.license.category === categoryFilter);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (d) =>
          d.fullName.toLowerCase().includes(term) ||
          d.license.number.toLowerCase().includes(term)
      );
    }
    return [...result].sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
  }, [allLicenses, statusFilter, categoryFilter, searchTerm]);

  const upcomingRenewals = useMemo(() => {
    return allLicenses
      .filter((d) => d.daysUntilExpiry > 0 && d.daysUntilExpiry <= 180)
      .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
  }, [allLicenses]);

  const reminders = useMemo(() => {
    const milestones = [
      { label: 'Overdue', range: [-Infinity, 0], color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', icon: XCircle },
      { label: '30 Days', range: [1, 30], color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', icon: AlertTriangle },
      { label: '60 Days', range: [31, 60], color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500', icon: Clock },
      { label: '90 Days', range: [61, 90], color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', icon: Bell },
    ];
    return milestones.map((m) => ({
      ...m,
      drivers: allLicenses.filter(
        (d) => d.daysUntilExpiry >= m.range[0] && d.daysUntilExpiry <= m.range[1]
      ),
    }));
  }, [allLicenses]);

  const rowBg = (status) => {
    if (status === 'Expired') return 'bg-red-50/40';
    if (status === 'Expiring Soon') return 'bg-amber-50/30';
    return '';
  };

  const urgencyColor = (days) => {
    if (days <= 0) return 'text-red-600';
    if (days <= 30) return 'text-red-600';
    if (days <= 60) return 'text-amber-600';
    if (days <= 90) return 'text-blue-600';
    return 'text-emerald-600';
  };

  const urgencyBadge = (days) => {
    if (days <= 0) return 'bg-red-50 text-red-600 border-red-200';
    if (days <= 30) return 'bg-red-50 text-red-600 border-red-200';
    if (days <= 60) return 'bg-amber-50 text-amber-600 border-amber-200';
    if (days <= 90) return 'bg-blue-50 text-blue-600 border-blue-200';
    return 'bg-emerald-50 text-emerald-600 border-emerald-200';
  };

  const kpiCards = [
    {
      label: 'Total Licenses',
      value: kpis.total,
      icon: FileSpreadsheet,
      color: 'text-primary bg-primary-light',
    },
    {
      label: 'Active Licenses',
      value: kpis.active,
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Expiring Soon',
      value: kpis.expiringSoon,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Expired',
      value: kpis.expired,
      icon: XCircle,
      color: 'text-red-600 bg-red-50',
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-xl font-black text-slate-900 tracking-tight font-headings">
          License Management
        </h1>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">
          Monitor license compliance, expirations, and renewal status
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div
                  className={cn(
                    'p-1.5 rounded-lg transition-transform group-hover:scale-105',
                    kpi.color
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-headings">{kpi.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-primary-light">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 font-headings">
              License Status Overview
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold">
              Fleet-wide license compliance distribution
            </p>
          </div>
        </div>
        <div className="flex rounded-full overflow-hidden h-6 border border-slate-200">
          {kpis.active > 0 && (
            <div
              className="bg-emerald-500 flex items-center justify-center text-[9px] font-black text-white transition-all"
              style={{ width: `${statusProportions.active}%` }}
            >
              {kpis.active} Active
            </div>
          )}
          {kpis.expiringSoon > 0 && (
            <div
              className="bg-amber-500 flex items-center justify-center text-[9px] font-black text-white transition-all"
              style={{ width: `${statusProportions.expiring}%` }}
            >
              {kpis.expiringSoon} Expiring
            </div>
          )}
          {kpis.expired > 0 && (
            <div
              className="bg-red-500 flex items-center justify-center text-[9px] font-black text-white transition-all"
              style={{ width: `${statusProportions.expired}%` }}
            >
              {kpis.expired} Expired
            </div>
          )}
        </div>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500">
              Active ({statusProportions.active.toFixed(0)}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold text-slate-500">
              Expiring ({statusProportions.expiring.toFixed(0)}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold text-slate-500">
              Expired ({statusProportions.expired.toFixed(0)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <AreaChart
          title="Expiry Timeline"
          subtitle="Licenses expiring per month over the next 12 months"
          data={expiryTimelineData}
          color="orange"
          height={220}
        />
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-primary-light">
            <Search className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 font-headings">
              Advanced Filters
            </h3>
            <p className="text-[10px] text-slate-400 font-semibold">
              Search and filter the license registry
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-4 py-2.5 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none pr-8"
            >
              <option value="All">All Statuses</option>
              {licenseStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-4 py-2.5 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none pr-8"
            >
              <option value="All">All Categories</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by driver name or license..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none transition-all w-72 font-semibold"
            />
          </div>
          {(statusFilter !== 'All' || categoryFilter !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setStatusFilter('All');
                setCategoryFilter('All');
                setSearchTerm('');
              }}
              className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:text-primary-hover transition-colors"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-primary-light">
            <FileSpreadsheet className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 font-headings">License Registry</h3>
            <p className="text-[10px] text-slate-400 font-semibold">
              {filteredLicenses.length} license{filteredLicenses.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pt-1">Driver</th>
                <th className="pb-3 pt-1">License Number</th>
                <th className="pb-3 pt-1">Category</th>
                <th className="pb-3 pt-1">Issue Date</th>
                <th className="pb-3 pt-1">Expiry Date</th>
                <th className="pb-3 pt-1">Issuing Authority</th>
                <th className="pb-3 pt-1">Status</th>
                <th className="pb-3 pt-1">Days Until Expiry</th>
                <th className="pb-3 pt-1 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLicenses.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                        <FileSpreadsheet className="w-7 h-7 text-slate-300" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500">No licenses found</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                      {(statusFilter !== 'All' || categoryFilter !== 'All' || searchTerm) && (
                        <button
                          onClick={() => {
                            setStatusFilter('All');
                            setCategoryFilter('All');
                            setSearchTerm('');
                          }}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:text-primary-hover transition-colors mt-1"
                        >
                          <X className="w-3 h-3" />
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLicenses.map((driver) => (
                  <motion.tr
                    key={driver.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn('hover:bg-slate-50/50 transition-colors', rowBg(driver.license.status))}
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-[10px] shadow-sm shrink-0">
                          {driver.photo ? (
                            <img
                              src={driver.photo}
                              alt={driver.fullName}
                              className="h-9 w-9 rounded-xl object-cover"
                            />
                          ) : (
                            driver.initials
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 font-headings truncate">
                            {driver.fullName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-semibold">{driver.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-xs font-mono font-bold text-slate-700">
                        {driver.license.number}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-[10px] font-bold text-slate-600">
                        {driver.license.category}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-[10px] font-bold text-slate-600">
                        {formatDate(driver.license.issueDate)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-[10px] font-bold text-slate-600">
                        {formatDate(driver.license.expiryDate)}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-[10px] font-bold text-slate-600">
                        {driver.license.issuingAuthority}
                      </span>
                    </td>
                    <td className="py-4">
                      <StatusBadge status={driver.license.status} size="sm" />
                    </td>
                    <td className="py-4">
                      <span
                        className={cn(
                          'inline-flex items-center text-[10px] font-black border px-2.5 py-1 rounded-lg',
                          urgencyBadge(driver.daysUntilExpiry)
                        )}
                      >
                        {driver.daysUntilExpiry <= 0
                          ? `${Math.abs(driver.daysUntilExpiry)}d overdue`
                          : `${driver.daysUntilExpiry}d`}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          className={cn(
                            'p-1.5 rounded-lg bg-slate-50 border border-slate-200 transition-all',
                            driver.daysUntilExpiry <= 60
                              ? 'text-amber-600 hover:border-amber-300 hover:bg-amber-50'
                              : 'text-slate-500 hover:text-primary hover:border-primary/30 hover:bg-primary-light'
                          )}
                          title="Renew License"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => navigate(`/drivers/profile/${driver.id}`)}
                          className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 hover:bg-primary-light transition-all"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-amber-50">
            <CalendarClock className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 font-headings">Renewal Calendar</h3>
            <p className="text-[10px] text-slate-400 font-semibold">
              Upcoming license renewals sorted by urgency
            </p>
          </div>
        </div>
        {upcomingRenewals.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-xs font-bold text-slate-400">No upcoming renewals in the next 180 days</p>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200" />
            <div className="flex flex-col gap-4">
              {upcomingRenewals.map((driver, idx) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="relative flex items-start gap-4 pl-12"
                >
                  <div
                    className={cn(
                      'absolute left-3.5 top-2 w-3 h-3 rounded-full border-2 border-white shadow-sm',
                      driver.daysUntilExpiry <= 30
                        ? 'bg-red-500'
                        : driver.daysUntilExpiry <= 60
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                    )}
                  />
                  <div className="flex-1 bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 hover:border-slate-300 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-[9px] shadow-sm shrink-0">
                          {driver.initials}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 font-headings">
                            {driver.fullName}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-slate-400">
                              {driver.license.category}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {driver.license.number}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-600">
                          {formatDate(driver.license.expiryDate)}
                        </p>
                        <p
                          className={cn(
                            'text-[10px] font-black mt-0.5',
                            urgencyColor(driver.daysUntilExpiry)
                          )}
                        >
                          {driver.daysUntilExpiry <= 0
                            ? `${Math.abs(driver.daysUntilExpiry)}d overdue`
                            : `${driver.daysUntilExpiry} days remaining`}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-xl bg-red-50">
            <Bell className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 font-headings">Reminder Timeline</h3>
            <p className="text-[10px] text-slate-400 font-semibold">
              License renewal milestone notifications
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {reminders.map((milestone) => {
            const Icon = milestone.icon;
            return (
              <div
                key={milestone.label}
                className={cn(
                  'border rounded-xl p-4 transition-all',
                  milestone.drivers.length > 0
                    ? `${milestone.bg} ${milestone.border}`
                    : 'bg-slate-50/40 border-slate-200/60'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        milestone.drivers.length > 0 ? milestone.dot : 'bg-slate-300'
                      )}
                    />
                    <span
                      className={cn(
                        'text-[10px] font-black uppercase tracking-wider',
                        milestone.drivers.length > 0 ? milestone.color : 'text-slate-400'
                      )}
                    >
                      {milestone.label === 'Overdue' ? 'Overdue' : `Within ${milestone.label}`}
                    </span>
                    <span
                      className={cn(
                        'text-[9px] font-bold px-2 py-0.5 rounded-full border',
                        milestone.drivers.length > 0
                          ? `${milestone.bg} ${milestone.border} ${milestone.color}`
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                      )}
                    >
                      {milestone.drivers.length} driver{milestone.drivers.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <Icon
                    className={cn(
                      'w-4 h-4',
                      milestone.drivers.length > 0 ? milestone.color : 'text-slate-300'
                    )}
                  />
                </div>
                {milestone.drivers.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {milestone.drivers.map((driver) => (
                      <div
                        key={driver.id}
                        className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2 border border-white/80"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-[8px] shadow-sm shrink-0">
                            {driver.initials}
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-800 font-headings">
                              {driver.fullName}
                            </p>
                            <p className="text-[9px] text-slate-400 font-semibold">
                              {driver.license.category} · {driver.license.number}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-600">
                            {formatDate(driver.license.expiryDate)}
                          </p>
                          <p
                            className={cn(
                              'text-[9px] font-black',
                              urgencyColor(driver.daysUntilExpiry)
                            )}
                          >
                            {driver.daysUntilExpiry <= 0
                              ? `${Math.abs(driver.daysUntilExpiry)}d overdue`
                              : `${driver.daysUntilExpiry}d left`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400 font-semibold pl-4">
                    No licenses in this milestone range
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
