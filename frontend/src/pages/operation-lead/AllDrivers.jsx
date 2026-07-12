import { useState, useEffect, useMemo, useCallback } from 'react';
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
import { cn } from '../../utils/utils';
import StatusBadge from '../../components/drivers/StatusBadge';
import SafetyScoreBadge from '../../components/drivers/SafetyScoreBadge';
import { driverService } from '../../services/driver.service';

const ROWS_PER_PAGE = 8;

export default function AllDrivers() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDrivers, setSelectedDrivers] = useState(new Set());
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: currentPage, limit: ROWS_PER_PAGE };
      if (searchTerm) params.search = searchTerm;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (categoryFilter !== 'All') params.licenseCategory = categoryFilter;
      const res = await driverService.getAll(params);
      setDrivers(res.data.drivers || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load drivers');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, categoryFilter]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const stats = useMemo(() => {
    return {
      total: drivers.length,
      available: drivers.filter((d) => d.status === 'AVAILABLE').length,
      onTrip: drivers.filter((d) => d.status === 'ON_TRIP').length,
      offDuty: drivers.filter((d) => d.status === 'OFF_DUTY').length,
      suspended: drivers.filter((d) => d.status === 'SUSPENDED').length,
    };
  }, [drivers]);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusLabel = (status) => {
    if (!status) return 'Unknown';
    return status.replace(/_/g, ' ');
  };

  const getLicenseExpiryBadge = (expiryDate) => {
    if (!expiryDate) return null;
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-sm text-danger">{error}</p>
        <button onClick={fetchDrivers} className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark">
          Retry
        </button>
      </div>
    );
  }

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
          { label: 'Total Drivers', value: drivers.length, icon: Users, color: 'text-primary bg-primary-light' },
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
                placeholder="Search drivers, licenses..."
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
                <option value="AVAILABLE">Available</option>
                <option value="ON_TRIP">On Trip</option>
                <option value="OFF_DUTY">Off Duty</option>
                <option value="SUSPENDED">Suspended</option>
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
                <option value="LMV">LMV</option>
                <option value="HMV">HMV</option>
                <option value="MCW">MCW</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
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
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer accent-primary"
                  />
                </th>
                <th className="pb-3">Driver</th>
                <th className="pb-3">License Number</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">License Expiry</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Safety Score</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="py-16 text-center">
                      <div className="flex justify-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                    </td>
                  </tr>
                ) : drivers.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                          <FileSpreadsheet className="w-7 h-7 text-slate-300" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500">No drivers found</p>
                          <p className="text-[10px] text-slate-400 font-semibold mt-1">Try adjusting your search or filter criteria</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  drivers.map((driver) => {
                    const expiryBadge = getLicenseExpiryBadge(driver.licenseExpiry);
                    return (
                      <motion.tr
                        key={driver._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/drivers/profile/${driver._id}`)}
                      >
                        <td className="py-4 pr-2">
                          <input
                            type="checkbox"
                            className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer accent-primary"
                          />
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center font-bold text-[10px] shadow-sm shrink-0">
                              {getInitials(driver.fullName)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 font-headings truncate">{driver.fullName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-xs font-mono font-bold text-slate-700">{driver.licenseNumber}</span>
                        </td>
                        <td className="py-4">
                          <span className="text-[10px] font-bold text-slate-600">{driver.licenseCategory}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-600">
                              {driver.licenseExpiry ? new Date(driver.licenseExpiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                            </span>
                            {expiryBadge && (
                              <StatusBadge status={expiryBadge} size="sm" />
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-[10px] font-bold text-slate-600">{driver.contactNumber || '-'}</span>
                        </td>
                        <td className="py-4">
                          <SafetyScoreBadge score={driver.safetyScore} size="sm" showLabel={false} />
                        </td>
                        <td className="py-4">
                          <StatusBadge status={getStatusLabel(driver.status)} size="sm" />
                        </td>
                        <td className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => navigate(`/drivers/profile/${driver._id}`)}
                              className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 hover:bg-primary-light transition-all"
                              title="View Driver"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => navigate(`/drivers/edit/${driver._id}`)}
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
      </div>
    </div>
  );
}
