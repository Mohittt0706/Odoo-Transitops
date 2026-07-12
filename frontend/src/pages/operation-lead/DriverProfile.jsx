import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Edit3, FileText, History, Truck, Navigation,
  Calendar, Clock, AlertTriangle, CheckCircle, XCircle, ChevronRight,
  User, Shield, BookOpen, Star, Fuel, Gauge, Award, Upload, Download,
  RefreshCw, Trash2, Ban, Route, Car, Eye, Heart, HeartPulse,
  BadgeCheck, Landmark, Fingerprint, Contact, Loader2
} from 'lucide-react';
import { cn } from '../../utils/utils';
import StatusBadge from '../../components/drivers/StatusBadge';
import SafetyScoreBadge from '../../components/drivers/SafetyScoreBadge';
import TimelineEvent from '../../components/drivers/TimelineEvent';
import TelemetryChart from '../../components/charts/TelemetryChart';
import BarChart from '../../components/charts/BarChart';
import { driverService } from '../../services/driver.service';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'trips', label: 'Trip History' },
  { id: 'performance', label: 'Performance' },
  { id: 'incidents', label: 'Incidents' },
  { id: 'documents', label: 'Documents' },
  { id: 'license', label: 'License' },
  { id: 'training', label: 'Training' },
  { id: 'timeline', label: 'Timeline' },
];

const additionalTrips = [
  { id: 'TRIP-3041', from: 'Austin, TX', to: 'Houston, TX', date: '2026-07-10', status: 'In Progress', distance: '165 mi', duration: '2h 45m' },
  { id: 'TRIP-3038', from: 'Dallas, TX', to: 'Austin, TX', date: '2026-06-25', status: 'Completed', distance: '195 mi', duration: '3h 10m' },
  { id: 'TRIP-3035', from: 'Houston, TX', to: 'San Antonio, TX', date: '2026-06-18', status: 'Completed', distance: '197 mi', duration: '2h 55m' },
  { id: 'TRIP-3032', from: 'Austin, TX', to: 'Dallas, TX', date: '2026-06-10', status: 'Completed', distance: '195 mi', duration: '3h 05m' },
  { id: 'TRIP-3029', from: 'San Antonio, TX', to: 'Houston, TX', date: '2026-06-02', status: 'Completed', distance: '197 mi', duration: '2h 50m' },
];

export default function DriverProfile() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!driverId) return;
    setLoading(true);
    setError(null);
    driverService.getById(driverId)
      .then((res) => {
        const d = res.data.driver;
        const initials = d.fullName
          ? d.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
          : '--';
        setDriver({
          ...d,
          id: d._id,
          initials,
          phone: d.contactNumber,
          email: d.email || '',
          employeeId: d.employeeId || '',
          operationalStatus: d.status,
          address: d.address || '',
          assignedVehicle: d.assignedVehicle || null,
          currentTrip: d.currentTrip || null,
          totalTrips: d.totalTrips || 0,
          totalDistance: d.totalDistance || 0,
          avgFuelEfficiency: d.avgFuelEfficiency || 0,
          customerRating: d.customerRating ?? 4.5,
          onTimePerformance: d.onTimePerformance || 95,
          license: {
            number: d.licenseNumber,
            category: d.licenseCategory,
            expiryDate: d.licenseExpiry ? new Date(d.licenseExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A',
            issueDate: d.licenseIssueDate || 'N/A',
            issuingAuthority: d.licenseIssuingAuthority || 'RTO',
            status: d.licenseStatus || 'Active',
          },
          emergencyContact: d.emergencyContact || { name: '—', phone: '—', relation: '—' },
          employment: d.employment || { department: '—', role: '—', joiningDate: '—', status: 'Active' },
          medical: d.medical || { bloodGroup: '—', certificateExpiry: '—' },
          history: d.history || [],
          monthlyPerformance: d.monthlyPerformance || [],
          trainingCompleted: d.trainingCompleted || [],
          documents: d.documents || {},
        });
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Failed to load driver');
      })
      .finally(() => setLoading(false));
  }, [driverId]);

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  if (error) return <div className="flex items-center justify-center min-h-[400px] text-danger">{error}</div>;
  if (!driver) return <div className="flex items-center justify-center min-h-[400px] text-neutral-textMuted">Not found</div>;

  const incidentHistory = driver.history.filter(h =>
    h.type === 'incident' || h.type === 'warning' || h.type === 'suspension'
  );

  const tripHistory = driver.history.filter(h => h.type === 'trip');

  const monthlyTripData = driver.monthlyPerformance.map(m => ({
    label: m.month,
    value: m.trips,
  }));

  const monthlyPerformanceData = driver.monthlyPerformance.map(m => ({
    label: m.month,
    value: m.onTime,
  }));

  const trainingRequirements = [];
  const allTraining = trainingRequirements.map(req => ({
    ...req,
    completed: driver.trainingCompleted.includes(req.name),
  }));

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20 flex-shrink-0">
                {driver.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-lg font-black text-slate-900 font-headings truncate">
                    {driver.fullName}
                  </h1>
                  <StatusBadge status={driver.operationalStatus} size="md" />
                </div>
                <p className="text-xs text-slate-400 font-semibold mb-3">
                  {driver.employeeId}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-600">{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-600">{driver.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assigned Vehicle</span>
                </div>
                <p className="text-sm font-black text-slate-900 font-headings">
                  {driver.assignedVehicle || 'No vehicle assigned'}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                  {driver.assignedVehicle ? 'Current assignment' : 'Awaiting allocation'}
                </p>
              </div>

              {driver.currentTrip ? (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Current Trip</span>
                  </div>
                  <p className="text-sm font-black text-slate-900 font-headings">
                    {driver.currentTrip.destination}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-bold text-slate-500">{driver.currentTrip.id}</span>
                    <span className="text-[10px] font-bold text-slate-400">ETA: {driver.currentTrip.eta}</span>
                  </div>
                  <div className="mt-2.5 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${driver.currentTrip.progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-bold text-blue-600 mt-1">{driver.currentTrip.progress}% complete</p>
                </div>
              ) : (
                <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Trip</span>
                  </div>
                  <p className="text-sm font-black text-slate-400 font-headings">No active trip</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Driver is not on a trip</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-4 flex-shrink-0">
            <SafetyScoreBadge score={driver.safetyScore} size="lg" />
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/drivers/edit/${driver.id}`)}
                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Edit3 className="w-3 h-3" /> Edit
              </button>
              <button
                onClick={() => navigate(`/drivers/documents`)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                <FileText className="w-3 h-3" /> Documents
              </button>
              <button
                onClick={() => navigate(`/drivers/history`)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                <History className="w-3 h-3" /> History
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-shrink-0 px-5 py-3.5 text-xs font-bold transition-colors relative',
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-slate-400 hover:text-slate-700'
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-blue-50">
                    <Contact className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Contact Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-xs font-bold text-slate-700">{driver.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-xs font-bold text-slate-700">{driver.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-xs font-bold text-slate-700">{driver.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-red-50">
                    <HeartPulse className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Emergency Contact</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Name</p>
                      <p className="text-xs font-bold text-slate-700">{driver.emergencyContact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-xs font-bold text-slate-700">{driver.emergencyContact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Relationship</p>
                      <p className="text-xs font-bold text-slate-700">{driver.emergencyContact.relation}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-indigo-50">
                    <Landmark className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Employment Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Department</p>
                      <p className="text-xs font-bold text-slate-700">{driver.employment.department}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Role</p>
                      <p className="text-xs font-bold text-slate-700">{driver.employment.role}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Joining Date</p>
                      <p className="text-xs font-bold text-slate-700">{driver.employment.joiningDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Status</p>
                      <StatusBadge status={driver.employment.status} size="sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-emerald-50">
                    <Fingerprint className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">License Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">License Number</p>
                      <p className="text-xs font-bold text-slate-700">{driver.license.number}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Category</p>
                      <p className="text-xs font-bold text-slate-700">{driver.license.category}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Expiry Date</p>
                      <p className="text-xs font-bold text-slate-700">{driver.license.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Landmark className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Issuing Authority</p>
                      <p className="text-xs font-bold text-slate-700">{driver.license.issuingAuthority}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Status</p>
                      <StatusBadge status={driver.license.status} size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50">
                    <Route className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Trip History</h3>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                  Recent and completed trips for {driver.fullName}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trip ID</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">From</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">To</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Distance</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                      <th className="text-left px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {additionalTrips.map((trip, idx) => (
                      <motion.tr
                        key={trip.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-3.5">
                          <span className="text-xs font-bold text-blue-600 font-mono">{trip.id}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-xs font-semibold text-slate-600">{trip.from}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-xs font-semibold text-slate-600">{trip.to}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-xs font-semibold text-slate-500">{trip.date}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-xs font-bold text-slate-700">{trip.distance}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="text-xs font-semibold text-slate-500">{trip.duration}</span>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={cn(
                            'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full',
                            trip.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-600 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          )}>
                            <span className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              trip.status === 'In Progress' ? 'bg-blue-500' : 'bg-emerald-500'
                            )} />
                            {trip.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: 'Total Trips', value: driver.totalTrips, icon: Route, color: 'blue' },
                  { label: 'Total Distance', value: `${(driver.totalDistance / 1000).toFixed(1)}k mi`, icon: MapPin, color: 'cyan' },
                  { label: 'Avg Fuel Efficiency', value: `${driver.avgFuelEfficiency} mpg`, icon: Fuel, color: 'green' },
                  { label: 'Customer Rating', value: driver.customerRating.toFixed(1), icon: Star, color: 'amber' },
                  { label: 'On-Time Performance', value: `${driver.onTimePerformance}%`, icon: Clock, color: 'purple' },
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm"
                    >
                      <div className={cn('p-1.5 rounded-lg mb-3 w-fit', `bg-${kpi.color}-50`)}>
                        <Icon className={cn('w-4 h-4', `text-${kpi.color}-600`)} />
                      </div>
                      <p className="text-lg font-black text-slate-900 font-headings">{kpi.value}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{kpi.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <TelemetryChart
                    type="line"
                    title="Monthly On-Time Performance"
                    subtitle="Percentage of on-time deliveries"
                    data={monthlyPerformanceData}
                    color="blue"
                  />
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <BarChart
                    title="Monthly Trips"
                    subtitle="Number of trips per month"
                    data={monthlyTripData}
                    color="purple"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-50">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Incidents & Warnings</h3>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                  {incidentHistory.length} record{incidentHistory.length !== 1 ? 's' : ''} found
                </p>
              </div>
              {incidentHistory.length === 0 ? (
                <div className="p-12 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-xs font-bold text-slate-500">No incidents or warnings on record</p>
                </div>
              ) : (
                <div className="p-6 space-y-3">
                  {incidentHistory.map((incident, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={cn(
                        'flex items-start gap-4 p-4 rounded-xl border transition-colors',
                        incident.type === 'incident' ? 'bg-red-50/30 border-red-100 hover:bg-red-50/50' :
                        incident.type === 'suspension' ? 'bg-red-50/30 border-red-100 hover:bg-red-50/50' :
                        'bg-amber-50/30 border-amber-100 hover:bg-amber-50/50'
                      )}
                    >
                      <div className={cn(
                        'p-1.5 rounded-lg flex-shrink-0 mt-0.5',
                        incident.type === 'incident' ? 'bg-red-100 text-red-600' :
                        incident.type === 'suspension' ? 'bg-red-100 text-red-600' :
                        'bg-amber-100 text-amber-600'
                      )}>
                        {incident.type === 'warning' ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xs font-bold text-slate-900 font-headings">{incident.title}</h4>
                          <span className={cn(
                            'text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase',
                            incident.type === 'incident' ? 'bg-red-100 text-red-600' :
                            incident.type === 'suspension' ? 'bg-red-100 text-red-600' :
                            'bg-amber-100 text-amber-600'
                          )}>
                            {incident.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-semibold">{incident.description}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1.5">{incident.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Documents</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                    Uploaded documents for {driver.fullName}
                  </p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                  <Upload className="w-3 h-3" /> Upload New
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(driver.documents).map((doc, idx) => (
                  <motion.div
                    key={doc.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      'bg-white border rounded-xl p-5 transition-all duration-200 hover:shadow-sm',
                      doc.uploaded ? 'border-slate-200/80 hover:border-blue-200' : 'border-dashed border-slate-300 hover:border-blue-300'
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'p-2 rounded-lg',
                          doc.uploaded ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                        )}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 font-headings">{doc.name}</h4>
                          {doc.uploaded ? (
                            <div className="flex items-center gap-1 mt-0.5">
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                              <span className="text-[10px] font-semibold text-emerald-600">Uploaded {doc.date}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 mt-0.5">
                              <AlertTriangle className="w-3 h-3 text-amber-500" />
                              <span className="text-[10px] font-semibold text-amber-600">Not uploaded</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {doc.uploaded ? (
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 transition-colors cursor-pointer">
                          <Download className="w-3 h-3" /> Download
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 transition-colors cursor-pointer">
                          <RefreshCw className="w-3 h-3" /> Replace
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[10px] font-bold text-red-600 transition-colors ml-auto cursor-pointer">
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    ) : (
                      <button className="w-full flex items-center justify-center gap-1.5 mt-3 py-2 rounded-lg border border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 text-[10px] font-bold text-blue-600 transition-colors cursor-pointer">
                        <Upload className="w-3 h-3" /> Upload Document
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'license' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 rounded-lg bg-indigo-50">
                    <Fingerprint className="w-4 h-4 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Driver License</h3>
                  <StatusBadge status={driver.license.status} size="sm" className="ml-auto" />
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">License Number</p>
                      <p className="text-sm font-black text-slate-900 font-headings font-mono">{driver.license.number}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Category</p>
                      <p className="text-sm font-black text-slate-900 font-headings">{driver.license.category}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Issue Date</p>
                      <p className="text-xs font-bold text-slate-700">{driver.license.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Expiry Date</p>
                      <p className="text-xs font-bold text-slate-700">{driver.license.expiryDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Issuing Authority</p>
                    <p className="text-xs font-bold text-slate-700">{driver.license.issuingAuthority}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-1.5 rounded-lg bg-blue-50">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Expiry Timeline</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">License Validity</span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {driver.license.issueDate} — {driver.license.expiryDate}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          driver.license.status === 'Active' ? 'bg-emerald-500' :
                          driver.license.status === 'Expiring Soon' ? 'bg-amber-500' : 'bg-red-500'
                        )}
                        style={{
                          width: driver.license.status === 'Expired' ? '100%' :
                            driver.license.status === 'Expiring Soon' ? '85%' : '65%'
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[9px] text-slate-400 font-semibold">{driver.license.issueDate}</span>
                      <span className={cn(
                        'text-[9px] font-bold',
                        driver.license.status === 'Active' ? 'text-emerald-500' :
                        driver.license.status === 'Expiring Soon' ? 'text-amber-500' : 'text-red-500'
                      )}>
                        {driver.license.status === 'Expired' ? 'Expired' :
                         driver.license.status === 'Expiring Soon' ? 'Renewal needed' : 'Valid'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-semibold">{driver.license.expiryDate}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Blood Group</p>
                        <p className="text-sm font-black text-slate-900 font-headings">{driver.medical.bloodGroup}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Medical Cert Expiry</p>
                        <p className="text-sm font-black text-slate-900 font-headings">{driver.medical.certificateExpiry}</p>
                      </div>
                    </div>
                    <button className={cn(
                      'w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-colors',
                      driver.license.status === 'Expired'
                        ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
                        : driver.license.status === 'Expiring Soon'
                          ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    )}>
                      <RefreshCw className="w-3.5 h-3.5" />
                      {driver.license.status === 'Expired' ? 'Renew Now' :
                       driver.license.status === 'Expiring Soon' ? 'Start Renewal' : 'Renew License'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-emerald-50">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Completed Training</h3>
                </div>
                <div className="space-y-2">
                  {allTraining.filter(t => t.completed).map((training, idx) => (
                    <motion.div
                      key={training.name}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100"
                    >
                      <div className="p-1 rounded-full bg-emerald-500">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900 font-headings">{training.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">Frequency: {training.frequency}</p>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-100 uppercase">
                        Completed
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-slate-100">
                    <BookOpen className="w-4 h-4 text-slate-600" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 font-headings">Required Training</h3>
                </div>
                <div className="space-y-2">
                  {allTraining.filter(t => !t.completed).map((training, idx) => (
                    <motion.div
                      key={training.name}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="p-1 rounded-full bg-slate-200">
                        <XCircle className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-700 font-headings">{training.name}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">
                          Frequency: {training.frequency}
                          {training.mandatory && (
                            <span className="ml-2 text-[9px] font-bold text-amber-600 uppercase">Required</span>
                          )}
                        </p>
                      </div>
                      <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                        Assign
                      </button>
                    </motion.div>
                  ))}
                  {allTraining.filter(t => !t.completed).length === 0 && (
                    <div className="p-8 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <Award className="w-6 h-6 text-emerald-500" />
                      </div>
                      <p className="text-xs font-bold text-slate-500">All required training completed!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 rounded-lg bg-purple-50">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-sm font-black text-slate-900 font-headings">Activity Timeline</h3>
              </div>
              <div className="pl-2">
                {driver.history.map((event, idx) => (
                  <TimelineEvent
                    key={idx}
                    event={event}
                    isLast={idx === driver.history.length - 1}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
