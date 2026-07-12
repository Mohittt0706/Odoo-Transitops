import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Save,
  X,
  ChevronRight,
  AlertTriangle,
  FileText,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../../utils/utils';
import { driverService } from '../../services/driver.service';

const labelClass = 'text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5';
const inputClass = 'w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-all';
const selectClass = 'w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-all appearance-none';

export default function EditDriver() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    licenseNumber: '',
    licenseCategory: '',
    licenseExpiry: '',
    contactNumber: '',
    email: '',
    status: 'AVAILABLE',
    safetyScore: 100,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await driverService.getById(driverId);
        const d = res.data;
        setForm({
          fullName: d.fullName || '',
          licenseNumber: d.licenseNumber || '',
          licenseCategory: d.licenseCategory || '',
          licenseExpiry: d.licenseExpiry ? d.licenseExpiry.split('T')[0] : '',
          contactNumber: d.contactNumber || '',
          email: d.email || '',
          status: d.status || 'AVAILABLE',
          safetyScore: d.safetyScore ?? 100,
        });
      } catch (err) {
        if (err?.response?.status === 404) {
          setNotFound(true);
        } else {
          setApiError(err?.response?.data?.message || err.message || 'Failed to load driver');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [driverId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSubmitting(true);
    setApiError(null);
    try {
      await driverService.update(driverId, {
        fullName: form.fullName,
        licenseNumber: form.licenseNumber,
        licenseCategory: form.licenseCategory,
        licenseExpiry: form.licenseExpiry || undefined,
        contactNumber: form.contactNumber,
        email: form.email || undefined,
        status: form.status,
      });
      setShowSuccess(true);
      setTimeout(() => { navigate(`/drivers/profile/${driverId}`); }, 2000);
    } catch (err) {
      setApiError(err?.response?.data?.message || err.message || 'Failed to update driver');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="font-headings text-lg font-bold text-slate-800 mb-2">Driver Not Found</h2>
          <p className="text-xs text-slate-500 mb-4">The driver you are looking for does not exist.</p>
          <button onClick={() => navigate('/drivers/all')} className="px-5 py-2.5 text-xs font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all">
            Back to Drivers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white border border-emerald-200 rounded-2xl px-5 py-3.5 shadow-lg"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <div>
            <p className="text-xs font-bold text-slate-800">Driver Updated Successfully</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Redirecting to driver profile...</p>
          </div>
        </motion.div>
      )}

      {apiError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white border border-red-200 rounded-2xl px-5 py-3.5 shadow-lg">
          <p className="text-xs font-bold text-red-500">{apiError}</p>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/drivers/all')} className="hover:text-blue-600 transition-colors font-medium">Drivers</button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-bold text-slate-700">Edit: {form.fullName}</span>
        </div>

        <div className="mb-6">
          <h1 className="font-headings text-2xl font-bold text-slate-900">Edit Driver</h1>
          <p className="text-xs text-slate-500 mt-1">Update driver details</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-blue-500" />
            <h2 className="font-headings text-sm font-bold text-slate-800">Driver Information</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Full Name</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter full name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>License Number</label>
              <input type="text" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="License number" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>License Category</label>
              <select name="licenseCategory" value={form.licenseCategory} onChange={handleChange} className={selectClass}>
                <option value="">Select category</option>
                <option value="LMV">LMV</option>
                <option value="HMV">HMV</option>
                <option value="MCW">MCW</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>License Expiry</label>
              <input type="date" name="licenseExpiry" value={form.licenseExpiry} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contact Number</label>
              <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact number" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={selectClass}>
                <option value="AVAILABLE">Available</option>
                <option value="ON_TRIP">On Trip</option>
                <option value="OFF_DUTY">Off Duty</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Safety Score</label>
              <input type="number" name="safetyScore" value={form.safetyScore} readOnly className={cn(inputClass, 'bg-slate-100 text-slate-500 cursor-not-allowed')} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button onClick={() => navigate(`/drivers/profile/${driverId}`)} className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-all">
            <X className="w-4 h-4" /> Cancel
          </button>
          <button onClick={handleSave} disabled={submitting} className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all shadow-sm shadow-blue-200 disabled:opacity-50">
            {submitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
