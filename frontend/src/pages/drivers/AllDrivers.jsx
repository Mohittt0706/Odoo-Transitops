import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Users,
  UserCheck,
  Truck,
  UserX,
  ShieldOff,
  FileSpreadsheet,
  ChevronDown,
  X,
  Check,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import StatusBadge from '../../components/drivers/StatusBadge';
import SafetyScoreBadge from '../../components/drivers/SafetyScoreBadge';
import { drivers, driverStatuses, licenseCategories } from '../../data/drivers';

const ROWS_PER_PAGE = 8;

export default function AllDrivers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDrivers, setSelectedDrivers] = useState(new Set());
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const stats = useMemo(() => ({
    total: drivers.length,
    available: drivers.filter((d) => d.operationalStatus === 'Available').length,
    onTrip: drivers.filter((d) => d.operationalStatus === 'On Trip').length,
    offDuty: drivers.filter((d) => d.operationalStatus === 'Off Duty').length,
    suspended: drivers.filter((d) => d.operationalStatus === 'Suspended').length,
  }), []);

  const filteredDrivers = useMemo(() => {
    let result = drivers.filter((d) => {
      const matchesSearch =
        d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.license.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.phone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || d.operationalStatus === statusFilter;
      const matchesCategory = categoryFilter === 'All' || d.license.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        let aVal, bVal;
        switch (sortColumn) {
          case 'driver':
            aVal = a.fullName.toLowerCase();
            bVal = b.fullName.toLowerCase();
            break;
          case 'licenseNumber':
            aVal = a.license.number.toLowerCase();
            bVal = b.license.number.toLowerCase();
            break;
          case 'licenseCategory':
            aVal = a.license.category.toLowerCase();
            bVal = b.license.category.toLowerCase();
            break;
          case 'licenseExpiry':
            aVal = new Date(a.license.expiryDate).getTime();
            bVal = new Date(b.license.expiryDate).getTime();
            break;
          case 'phone':
            aVal = a.phone.toLowerCase();
            bVal = b.phone.toLowerCase();
            break;
          case 'safetyScore':
            aVal = a.safetyScore;
            bVal = b.safetyScore;
            break;
          case 'vehicle':
            aVal = (a.assignedVehicle || 'zzz').toLowerCase();
            bVal = (b.assignedVehicle || 'zzz').toLowerCase();
            break;
          case 'status':
            aVal = a.operationalStatus.toLowerCase();
            bVal = b.operationalStatus.toLowerCase();
            break;
          default:
            return 0;
        }
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchTerm, statusFilter, categoryFilter, sortColumn, sortDirection]);

  const totalPages = Math.ceil(filteredDrivers.length / ROWS_PER_PAGE);
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleSelectAll = () => {
    if (selectedDrivers.size === paginatedDrivers.length) {
      setSelectedDrivers(new Set());
    } else {
      setSelectedDrivers(new Set(paginatedDrivers.map((d) => d.id)));
    }
  };

  const toggleSelectDriver = (id) => {
    setSelectedDrivers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isAllSelected = paginatedDrivers.length > 0 && selectedDrivers.size === paginatedDrivers.length;
  const isPartialSelected = selectedDrivers.size > 0 && selectedDrivers.size < paginatedDrivers.length;

  const getLicenseExpiryBadge = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry < 0) return 'Expired';
    if (daysUntilExpiry <= 30) return 'Expiring Soon';
    return null;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedDrivers(new Set());
  };

  const SortIndicator = ({ column }) => {
    if (sortColumn !== column) return null;
    return (
      <span className="ml-1 text-primary">
        {sortDirection === 'asc' ? '\u2191' : '\u2193'}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight font-headings">All Drivers</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage and monitor your entire driver fleet</p>
        </div>
        <button
          onClick={() => navigate('/drivers/register')}
          className="btn btn-primary gap-2"
        >
          <Plus className="w-4 h-4" />
          Register Driver
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Drivers', value: stats.total, icon: Users, color: 'text-primary bg-primary-light' },
          { label: 'Available', value: stats.available, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'On Trip', value: stats.onTrip, icon: Truck, color: 'text-blue-600 bg-blue-50' },
          { label: 'Off Duty', value: stats.offDuty, icon: UserX, color: 'text-slate-500 bg-slate-100' },
          { label: 'Suspended', value: stats.suspended, icon: ShieldOff, color: 'text-red-600 bg-red-50' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div className={cn('p-1.5 rounded-lg transition-transform group-hover:scale-105', stat.color)}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-headings">{stat.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search drivers, IDs, licenses..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none transition-all w-64 font-semibold"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-4 py-2.5 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none pr-8"
              >
                <option value="All">All Statuses</option>
                {driverStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-4 py-2.5 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none pr-8"
              >
                <option value="All">All Categories</option>
                {licenseCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            {selectedDrivers.size > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 text-[10px] font-black text-primary bg-primary-light border border-blue-200 px-3 py-1.5 rounded-full"
              >
                <Check className="w-3 h-3" />
                {selectedDrivers.size} selected
              </motion.span>
            )}
          </div>
          <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-4 py-2.5 rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-all">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-2 w-10">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(el) => { if (el) el.indeterminate = isPartialSelected; }}
                      onChange={toggleSelectAll}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer accent-primary"
                    />
                  </div>
                </th>
                <th
                  className="pb-3 cursor-pointer hover:text-slate-600 transition-colors"
                  onClick={() => handleSort('driver')}
                >
                  Driver<SortIndicator column="driver" />
                </th>
                <th
                  className="pb-3 cursor-pointer hover:text-slate-600 transition-colors"
                  onClick={() => handleSort('licenseNumber')}
                >
                  License Number<SortIndicator column="licenseNumber" />
                </th>
                <th
                  className="pb-3 cursor-pointer hover:text-slate-600 transition-colors"
                  onClick={() => handleSort('licenseCategory')}
                >
                  Category<SortIndicator column="licenseCategory" />
                </th>
                <th
                  className="pb-3 cursor-pointer hover:text-slate-600 transition-colors"
                  onClick={() => handleSort('licenseExpiry')}
                >
                  License Expiry<SortIndicator column="licenseExpiry" />
                </th>
                <th
                  className="pb-3 cursor-pointer hover:text-slate-600 transition-colors"
                  onClick={() => handleSort('phone')}
                >
                  Phone<SortIndicator column="phone" />
                </th>
                <th
                  className="pb-3 cursor-pointer hover:text-slate-600 transition-colors"
                  onClick={() => handleSort('safetyScore')}
                >
                  Safety Score<SortIndicator column="safetyScore" />
                </th>
                <th
                  className="pb-3 cursor-pointer hover:text-slate-600 transition-colors"
                  onClick={() => handleSort('vehicle')}
                >
                  Vehicle<SortIndicator column="vehicle" />
                </th>
                <th
                  className="pb-3 cursor-pointer hover:text-slate-600 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  Status<SortIndicator column="status" />
                </th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {paginatedDrivers.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                          <FileSpreadsheet className="w-7 h-7 text-slate-300" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500">No drivers found</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-1">Try adjusting your search or filter criteria</p>
                        </div>
                        {(searchTerm || statusFilter !== 'All' || categoryFilter !== 'All') && (
                          <button
                            onClick={() => {
                              setSearchTerm('');
                              setStatusFilter('All');
                              setCategoryFilter('All');
                              setCurrentPage(1);
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
                  paginatedDrivers.map((driver) => {
                    const expiryBadge = getLicenseExpiryBadge(driver.license.expiryDate);
                    return (
                      <motion.tr
                        key={driver.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/drivers/profile/${driver.id}`)}
                      >
                        <td
                          className="py-4 pr-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedDrivers.has(driver.id)}
                            onChange={() => toggleSelectDriver(driver.id)}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer accent-primary"
                          />
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-[10px] shadow-sm shrink-0">
                              {driver.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 font-headings truncate">{driver.fullName}</p>
                              <p className="text-[10px] text-slate-400 font-semibold">{driver.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-xs font-mono font-bold text-slate-700">{driver.license.number}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-[10px] font-bold text-slate-600">{driver.license.category}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-600">
                              {new Date(driver.license.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            {expiryBadge && (
                              <StatusBadge status={expiryBadge} size="sm" />
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-[10px] font-bold text-slate-600">{driver.phone}</span>
                        </td>
                        <td className="py-4">
                          <SafetyScoreBadge score={driver.safetyScore} size="sm" showLabel={false} />
                        </td>
                        <td className="py-4">
                          {driver.assignedVehicle ? (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                              <Truck className="w-3 h-3 text-slate-400" />
                              {driver.assignedVehicle}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 italic">Unassigned</span>
                          )}
                        </td>
                        <td className="py-4">
                          <StatusBadge status={driver.operationalStatus} size="sm" />
                        </td>
                        <td className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => navigate(`/drivers/profile/${driver.id}`)}
                              className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 hover:bg-primary-light transition-all"
                              title="View Driver"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => navigate(`/drivers/edit/${driver.id}`)}
                              className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all"
                              title="Edit Driver"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredDrivers.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400">
              Showing {((currentPage - 1) * ROWS_PER_PAGE) + 1} to {Math.min(currentPage * ROWS_PER_PAGE, filteredDrivers.length)} of {filteredDrivers.length} drivers
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                  'p-2 rounded-lg border transition-all',
                  currentPage === 1
                    ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 cursor-pointer'
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    'min-w-[32px] h-8 rounded-lg text-[10px] font-black border transition-all',
                    page === currentPage
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 cursor-pointer'
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                  'p-2 rounded-lg border transition-all',
                  currentPage === totalPages
                    ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 cursor-pointer'
                )}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
