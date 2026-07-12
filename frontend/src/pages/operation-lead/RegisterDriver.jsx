import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  FileText,
  Briefcase,
  Upload,
  ChevronLeft,
  ChevronRight,
  Check,
  Save,
  X,
  Camera,
  CreditCard,
  Shield,
  Heart,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '../../utils/utils';
import {
  licenseCategories,
  departments,
  roles,
  bloodGroups,
} from '../../data/drivers';

const steps = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'License', icon: FileText },
  { id: 3, label: 'Employment', icon: Briefcase },
  { id: 4, label: 'Documents', icon: Upload },
];

const employmentStatuses = ['Active', 'On Leave', 'Terminated'];
const operationalStatuses = ['Available', 'On Trip', 'Off Duty', 'Suspended'];

const labelClass =
  'text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5';
const inputClass =
  'w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-all';
const selectClass =
  'w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-all appearance-none';
const textareaClass =
  'w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-all resize-none';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

function generateEmpId() {
  return `EMP-${String(Math.floor(1000 + Math.random() * 9000))}`;
}

export default function RegisterDriver() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const [form, setForm] = useState({
    fullName: '',
    employeeId: generateEmpId(),
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    address: '',
    licenseNumber: '',
    licenseCategory: '',
    issueDate: '',
    expiryDate: '',
    issuingAuthority: '',
    joiningDate: '',
    department: '',
    role: '',
    employmentStatus: 'Active',
    operationalStatus: 'Available',
    bloodGroup: '',
    medicalCertExpiry: '',
    visionTestDate: '',
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

  const nextStep = () => {
    if (currentStep < 4) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRegister = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/drivers/all');
    }, 2000);
  };

  const handleSaveDraft = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/drivers/all');
    }, 2000);
  };

  const uploadAreas = [
    { key: 'profilePhoto', label: 'Profile Photo', icon: Camera },
    { key: 'drivingLicense', label: 'Driving License', icon: CreditCard },
    { key: 'identityProof', label: 'Aadhaar / Identity Proof', icon: Shield },
    { key: 'medicalCert', label: 'Medical Certificate', icon: Heart },
    { key: 'policeVerification', label: 'Police Verification', icon: Shield },
    { key: 'trainingCert', label: 'Training Certificate', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white border border-emerald-200 rounded-2xl px-5 py-3.5 shadow-lg"
        >
          <CheckCircle2 className="w-5 h-5 text-success" />
          <div>
            <p className="text-xs font-bold text-slate-800">
              Driver Registered Successfully
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Redirecting to driver list...
            </p>
          </div>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-headings text-2xl font-bold text-slate-900">
            Register New Driver
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete the form below to add a new driver to the system
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative z-10"
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                      isCompleted
                        ? 'bg-success border-success text-white'
                        : isActive
                          ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-200'
                          : 'bg-white border-slate-200 text-slate-400'
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>
                  <p
                    className={cn(
                      'text-[10px] font-bold mt-2 transition-colors',
                      isActive
                        ? 'text-blue-600'
                        : isCompleted
                          ? 'text-success'
                          : 'text-slate-400'
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {currentStep === 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5 text-blue-500" />
                    <h2 className="font-headings text-sm font-bold text-slate-800">
                      Personal Information
                    </h2>
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

              {currentStep === 2 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <h2 className="font-headings text-sm font-bold text-slate-800">
                      License Information
                    </h2>
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
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
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

              {currentStep === 3 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Briefcase className="w-5 h-5 text-blue-500" />
                    <h2 className="font-headings text-sm font-bold text-slate-800">
                      Employment & Operational
                    </h2>
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
                          <option key={d} value={d}>
                            {d}
                          </option>
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
                          <option key={r} value={r}>
                            {r}
                          </option>
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
                          <option key={s} value={s}>
                            {s}
                          </option>
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
                          <option key={s} value={s}>
                            {s}
                          </option>
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
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
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

              {currentStep === 4 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Upload className="w-5 h-5 text-blue-500" />
                    <h2 className="font-headings text-sm font-bold text-slate-800">
                      Documents Upload
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {uploadAreas.map((area) => {
                      const AreaIcon = area.icon;
                      const isUploaded = uploadedFiles[area.key];
                      return (
                        <label
                          key={area.key}
                          className={cn(
                            'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50/30',
                            isUploaded
                              ? 'border-emerald-400 bg-emerald-50/30'
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
                            <CheckCircle2 className="w-8 h-8 text-success mb-2" />
                          ) : (
                            <AreaIcon className="w-8 h-8 text-slate-300 mb-2" />
                          )}
                          <p className="text-xs font-bold text-slate-600">
                            {area.label}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1 text-center">
                            {isUploaded
                              ? isUploaded
                              : 'Click to upload or drag and drop'}
                          </p>
                          {!isUploaded && (
                            <p className="text-[9px] text-slate-300 mt-1">
                              PDF, JPG, PNG up to 10MB
                            </p>
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

        <div className="flex items-center justify-between mt-6">
          <div>
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all shadow-sm shadow-blue-200"
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/drivers/all')}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-all"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <button
                  onClick={handleRegister}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-all shadow-sm shadow-blue-200"
                >
                  <Check className="w-4 h-4" />
                  Register Driver
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
