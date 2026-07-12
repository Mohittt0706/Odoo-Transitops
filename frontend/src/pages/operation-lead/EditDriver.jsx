import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  FileText,
  Briefcase,
  Upload,
  Save,
  X,
  CheckCircle2,
  ChevronRight,
  Camera,
  CreditCard,
  Shield,
  Heart,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../../utils/utils';
import { drivers, licenseCategories, departments, roles, bloodGroups } from '../../data/drivers';

const tabs = [
  { id: 1, label: 'Personal Information', icon: User },
  { id: 2, label: 'License Information', icon: FileText },
  { id: 3, label: 'Employment & Status', icon: Briefcase },
  { id: 4, label: 'Documents', icon: Upload },
];

const employmentStatuses = ['Active', 'On Leave', 'Terminated'];
const operationalStatuses = ['Available', 'On Trip', 'Off Duty', 'Suspended'];

const labelClass = 'text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5';
const inputClass = 'w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-all';
const selectClass = 'w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-all appearance-none';
const textareaClass = 'w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-all resize-none';

const tabContentVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const statusColorMap = {
  Active: 'bg-emerald-100 text-emerald-700',
  'On Leave': 'bg-amber-100 text-amber-700',
  Terminated: 'bg-red-100 text-red-700',
  Available: 'bg-emerald-100 text-emerald-700',
  'On Trip': 'bg-blue-100 text-blue-700',
  'Off Duty': 'bg-slate-100 text-slate-600',
  Suspended: 'bg-red-100 text-red-700',
};

export default function EditDriver() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const driver = drivers.find((d) => d.id === driverId);

  if (!driver) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="font-headings text-lg font-bold text-slate-800 mb-2">Driver Not Found</h2>
          <p className="text-xs text-slate-500 mb-4">The driver you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/drivers/all')}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#2563EB] rounded-xl hover:bg-blue-600 transition-all"
          >
            Back to Drivers
          </button>
        </div>
      </div>
    );
  }

  const [form, setForm] = useState({
    fullName: driver.fullName,
    employeeId: driver.employeeId,
    dateOfBirth: driver.dateOfBirth,
    gender: driver.gender,
    phone: driver.phone,
    email: driver.email,
    emergencyName: driver.emergencyContact.name,
    emergencyPhone: driver.emergencyContact.phone,
    emergencyRelation: driver.emergencyContact.relation,
    address: driver.address,
    licenseNumber: driver.license.number,
    licenseCategory: driver.license.category,
    issueDate: driver.license.issueDate,
    expiryDate: driver.license.expiryDate,
    issuingAuthority: driver.license.issuingAuthority,
    joiningDate: driver.employment.joiningDate,
    department: driver.employment.department,
    role: driver.employment.role,
    employmentStatus: driver.employment.status,
    operationalStatus: driver.operationalStatus,
    bloodGroup: driver.medical.bloodGroup,
    medicalCertExpiry: driver.medical.certificateExpiry,
    visionTestDate: driver.medical.visionTestDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (key, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [key]: file.name }));
    }
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate(`/drivers/profile/${driver.id}`);
    }, 2000);
  };

  const handleDiscard = () => {
    setForm({
      fullName: driver.fullName,
      employeeId: driver.employeeId,
      dateOfBirth: driver.dateOfBirth,
      gender: driver.gender,
      phone: driver.phone,
      email: driver.email,
      emergencyName: driver.emergencyContact.name,
      emergencyPhone: driver.emergencyContact.phone,
      emergencyRelation: driver.emergencyContact.relation,
      address: driver.address,
      licenseNumber: driver.license.number,
      licenseCategory: driver.license.category,
      issueDate: driver.license.issueDate,
      expiryDate: driver.license.expiryDate,
      issuingAuthority: driver.license.issuingAuthority,
      joiningDate: driver.employment.joiningDate,
      department: driver.employment.department,
      role: driver.employment.role,
      employmentStatus: driver.employment.status,
      operationalStatus: driver.operationalStatus,
      bloodGroup: driver.medical.bloodGroup,
      medicalCertExpiry: driver.medical.certificateExpiry,
      visionTestDate: driver.medical.visionTestDate,
    });
    setUploadedFiles({});
    setShowDiscardConfirm(false);
  };

  const uploadAreas = [
    { key: 'profilePhoto', label: 'Profile Photo', icon: Camera },
    { key: 'drivingLicense', label: 'Driving License', icon: CreditCard },
    { key: 'identityProof', label: 'Aadhaar / Identity Proof', icon: Shield },
    { key: 'medicalCert', label: 'Medical Certificate', icon: Heart },
    { key: 'policeVerification', label: 'Police Verification', icon: Shield },
    { key: 'trainingCert', label: 'Training Certificate', icon: Award },
  ];

  const existingDocs = driver.documents;

  const empStatusKey = form.employmentStatus?.replace(/\s+/g, ' ');
  const opStatusKey = form.operationalStatus?.replace(/\s+/g, ' ');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AnimatePresence>
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
      </AnimatePresence>

      <AnimatePresence>
        {showDiscardConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Discard Changes?</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">All unsaved changes will be lost.</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDiscardConfirm(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDiscard}
                  className="px-4 py-2 text-xs font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all"
                >
                  Discard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <button onClick={() => navigate('/drivers/all')} className="hover:text-blue-600 transition-colors font-medium">
            Drivers
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium text-slate-400">Edit</span>
          <ChevronRight className="w-3 h-3" />
          <span className="font-bold text-slate-700">{driver.fullName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
          <div>
            <div className="mb-6">
              <h1 className="font-headings text-2xl font-bold text-slate-900">Edit Driver</h1>
              <p className="text-xs text-slate-500 mt-1">
                Update information for <span className="font-semibold text-slate-700">{driver.fullName}</span>
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100 px-6 overflow-x-auto">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-4 text-xs font-bold whitespace-nowrap border-b-2 transition-all -mb-px',
                        isActive
                          ? 'text-blue-600 border-blue-600'
                          : 'text-slate-400 border-transparent hover:text-slate-600'
                      )}
                    >
                      <TabIcon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabContentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 1 && (
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <User className="w-5 h-5 text-blue-500" />
                          <h2 className="font-headings text-sm font-bold text-slate-800">Personal Information</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className={labelClass}>Full Name</label>
                            <input
                              type="text"
                              name="fullName"
                              value={form.fullName}
                              onChange={handleChange}
                              placeholder="Enter full name"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Employee ID</label>
                            <input
                              type="text"
                              name="employeeId"
                              value={form.employeeId}
                              readOnly
                              className={cn(inputClass, 'bg-slate-100 text-slate-500 cursor-not-allowed')}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Date of Birth</label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={form.dateOfBirth}
                              onChange={handleChange}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Gender</label>
                            <select
                              name="gender"
                              value={form.gender}
                              onChange={handleChange}
                              className={selectClass}
                            >
                              <option value="">Select gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+1 (000) 000-0000"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Email</label>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="driver@transitops.com"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Emergency Contact Name</label>
                            <input
                              type="text"
                              name="emergencyName"
                              value={form.emergencyName}
                              onChange={handleChange}
                              placeholder="Contact name"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Emergency Phone</label>
                            <input
                              type="tel"
                              name="emergencyPhone"
                              value={form.emergencyPhone}
                              onChange={handleChange}
                              placeholder="+1 (000) 000-0000"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Relation</label>
                            <input
                              type="text"
                              name="emergencyRelation"
                              value={form.emergencyRelation}
                              onChange={handleChange}
                              placeholder="e.g. Spouse"
                              className={inputClass}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className={labelClass}>Address</label>
                            <textarea
                              name="address"
                              value={form.address}
                              onChange={handleChange}
                              placeholder="Enter full address"
                              rows={3}
                              className={textareaClass}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 2 && (
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <h2 className="font-headings text-sm font-bold text-slate-800">License Information</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className={labelClass}>License Number</label>
                            <input
                              type="text"
                              name="licenseNumber"
                              value={form.licenseNumber}
                              onChange={handleChange}
                              placeholder="e.g. DL-TX-884291"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>License Category</label>
                            <select
                              name="licenseCategory"
                              value={form.licenseCategory}
                              onChange={handleChange}
                              className={selectClass}
                            >
                              <option value="">Select category</option>
                              {licenseCategories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Issuing Authority</label>
                            <input
                              type="text"
                              name="issuingAuthority"
                              value={form.issuingAuthority}
                              onChange={handleChange}
                              placeholder="e.g. Texas DPS"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Issue Date</label>
                            <input
                              type="date"
                              name="issueDate"
                              value={form.issueDate}
                              onChange={handleChange}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Expiry Date</label>
                            <input
                              type="date"
                              name="expiryDate"
                              value={form.expiryDate}
                              onChange={handleChange}
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 3 && (
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <Briefcase className="w-5 h-5 text-blue-500" />
                          <h2 className="font-headings text-sm font-bold text-slate-800">Employment & Operational</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass}>Joining Date</label>
                            <input
                              type="date"
                              name="joiningDate"
                              value={form.joiningDate}
                              onChange={handleChange}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Department</label>
                            <select
                              name="department"
                              value={form.department}
                              onChange={handleChange}
                              className={selectClass}
                            >
                              <option value="">Select department</option>
                              {departments.map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Role</label>
                            <select
                              name="role"
                              value={form.role}
                              onChange={handleChange}
                              className={selectClass}
                            >
                              <option value="">Select role</option>
                              {roles.map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Employment Status</label>
                            <select
                              name="employmentStatus"
                              value={form.employmentStatus}
                              onChange={handleChange}
                              className={selectClass}
                            >
                              {employmentStatuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Operational Status</label>
                            <select
                              name="operationalStatus"
                              value={form.operationalStatus}
                              onChange={handleChange}
                              className={selectClass}
                            >
                              {operationalStatuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Blood Group</label>
                            <select
                              name="bloodGroup"
                              value={form.bloodGroup}
                              onChange={handleChange}
                              className={selectClass}
                            >
                              <option value="">Select blood group</option>
                              {bloodGroups.map((bg) => (
                                <option key={bg} value={bg}>{bg}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className={labelClass}>Medical Certificate Expiry</label>
                            <input
                              type="date"
                              name="medicalCertExpiry"
                              value={form.medicalCertExpiry}
                              onChange={handleChange}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className={labelClass}>Vision Test Date</label>
                            <input
                              type="date"
                              name="visionTestDate"
                              value={form.visionTestDate}
                              onChange={handleChange}
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 4 && (
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <Upload className="w-5 h-5 text-blue-500" />
                          <h2 className="font-headings text-sm font-bold text-slate-800">Documents Upload</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {uploadAreas.map((area) => {
                            const AreaIcon = area.icon;
                            const isUploaded = uploadedFiles[area.key];
                            const docKey = area.key === 'profilePhoto'
                              ? null
                              : area.key === 'drivingLicense'
                                ? 'drivingLicense'
                                : area.key === 'identityProof'
                                  ? 'aadhaar'
                                  : area.key === 'medicalCert'
                                    ? 'medicalCertificate'
                                    : area.key === 'policeVerification'
                                      ? 'policeVerification'
                                      : 'trainingCertificate';
                            const existingDoc = docKey && existingDocs[docKey];
                            return (
                              <label
                                key={area.key}
                                className={cn(
                                  'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50/30',
                                  isUploaded
                                    ? 'border-emerald-400 bg-emerald-50/30'
                                    : existingDoc?.uploaded
                                      ? 'border-blue-200 bg-blue-50/20'
                                      : 'border-slate-200 bg-slate-50/50'
                                )}
                              >
                                <input
                                  type="file"
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  onChange={(e) => handleFileUpload(area.key, e)}
                                />
                                {isUploaded ? (
                                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                                ) : (
                                  <AreaIcon className={cn('w-8 h-8 mb-2', existingDoc?.uploaded ? 'text-blue-400' : 'text-slate-300')} />
                                )}
                                <p className="text-xs font-bold text-slate-600">{area.label}</p>
                                <p className="text-[10px] text-slate-400 mt-1 text-center">
                                  {isUploaded
                                    ? isUploaded
                                    : existingDoc?.uploaded
                                      ? `Uploaded on ${existingDoc.date}`
                                      : 'Click to upload or drag and drop'}
                                </p>
                                {!isUploaded && !existingDoc?.uploaded && (
                                  <p className="text-[9px] text-slate-300 mt-1">PDF, JPG, PNG up to 10MB</p>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/drivers/profile/${driver.id}`)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-all"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={() => setShowDiscardConfirm(true)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#2563EB] rounded-xl hover:bg-blue-600 transition-all shadow-sm shadow-blue-200"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-8">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-headings text-xl font-bold mb-4 shadow-md shadow-blue-200">
                    {driver.initials}
                  </div>
                  <h3 className="font-headings text-base font-bold text-slate-800">{driver.fullName}</h3>
                  <p className="text-[10px] text-slate-400 mt-1 font-mono">{driver.id}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={cn(
                      'px-2.5 py-1 rounded-full text-[10px] font-bold',
                      statusColorMap[driver.operationalStatus] || 'bg-slate-100 text-slate-600'
                    )}>
                      {driver.operationalStatus}
                    </span>
                    <span className={cn(
                      'px-2.5 py-1 rounded-full text-[10px] font-bold',
                      statusColorMap[driver.employment.status] || 'bg-slate-100 text-slate-600'
                    )}>
                      {driver.employment.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Safety Score</span>
                    <span className={cn(
                      'text-sm font-bold font-headings',
                      driver.safetyScore >= 90
                        ? 'text-emerald-600'
                        : driver.safetyScore >= 75
                          ? 'text-amber-600'
                          : 'text-red-600'
                    )}>
                      {driver.safetyScore}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        driver.safetyScore >= 90
                          ? 'bg-emerald-500'
                          : driver.safetyScore >= 75
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      )}
                      style={{ width: `${driver.safetyScore}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Department</span>
                    <span className="text-xs font-semibold text-slate-700">{driver.employment.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role</span>
                    <span className="text-xs font-semibold text-slate-700">{driver.employment.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Vehicle</span>
                    <span className="text-xs font-semibold text-slate-700">{driver.assignedVehicle || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Trips</span>
                    <span className="text-xs font-semibold text-slate-700">{driver.totalTrips}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">License</span>
                    <span className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full',
                      driver.license.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : driver.license.status === 'Expiring Soon'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                    )}>
                      {driver.license.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
