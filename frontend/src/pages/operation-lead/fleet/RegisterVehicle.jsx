import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/layout/PageHeader";
import { vehicleTypes, manufacturers, fuelTypes } from "../../../data/vehicleData";
import { cn } from "../../../utils/utils";
import { Upload, X, Save, RotateCcw, ArrowLeft } from "lucide-react";

const transmissionOptions = ["Manual", "Automatic"];
const statusOptions = [
  { value: "Active", label: "Available" },
  { value: "On Trip", label: "On Trip" },
  { value: "In Maintenance", label: "In Shop" },
  { value: "Retired", label: "Retired" },
];

const uploadAreas = [
  { key: "vehicleImage", label: "Vehicle Image" },
  { key: "registrationCert", label: "Registration Certificate" },
  { key: "insuranceCert", label: "Insurance" },
  { key: "fitnessCert", label: "Fitness Certificate" },
  { key: "emissionCert", label: "Emission Certificate" },
];

const initialForm = {
  registrationNumber: "",
  vehicleName: "",
  vehicleModel: "",
  vehicleType: "",
  manufacturer: "",
  manufacturingYear: "",
  vinNumber: "",
  engineNumber: "",
  licensePlate: "",
  maxLoadCapacity: "",
  fuelType: "",
  transmission: "",
  mileage: "",
  odometer: "",
  purchaseDate: "",
  acquisitionCost: "",
  insuranceProvider: "",
  insuranceExpiry: "",
  warrantyExpiry: "",
  operationalStatus: "Active",
  vehicleImage: null,
  registrationCert: null,
  insuranceCert: null,
  fitnessCert: null,
  emissionCert: null,
};

export default function RegisterVehicle() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleFileChange = (key, file) => {
    setForm((prev) => ({ ...prev, [key]: file }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.registrationNumber.trim()) newErrors.registrationNumber = "Required";
    if (!form.vehicleName.trim()) newErrors.vehicleName = "Required";
    if (!form.vehicleModel.trim()) newErrors.vehicleModel = "Required";
    if (!form.vehicleType) newErrors.vehicleType = "Required";
    if (!form.manufacturer) newErrors.manufacturer = "Required";
    if (!form.manufacturingYear) newErrors.manufacturingYear = "Required";
    if (!form.vinNumber.trim()) newErrors.vinNumber = "Required";
    if (!form.engineNumber.trim()) newErrors.engineNumber = "Required";
    if (!form.licensePlate.trim()) newErrors.licensePlate = "Required";
    if (!form.maxLoadCapacity.trim()) newErrors.maxLoadCapacity = "Required";
    if (!form.fuelType) newErrors.fuelType = "Required";
    if (!form.transmission) newErrors.transmission = "Required";
    if (!form.mileage.trim()) newErrors.mileage = "Required";
    if (!form.odometer.trim()) newErrors.odometer = "Required";
    if (!form.purchaseDate) newErrors.purchaseDate = "Required";
    if (!form.acquisitionCost.trim()) newErrors.acquisitionCost = "Required";
    if (!form.insuranceProvider.trim()) newErrors.insuranceProvider = "Required";
    if (!form.insuranceExpiry) newErrors.insuranceExpiry = "Required";
    if (!form.warrantyExpiry) newErrors.warrantyExpiry = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/dashboard/operations/fleet");
    }
  };

  const inputClass = (key) =>
    cn(
      "w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all",
      errors[key] ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
    );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Register New Vehicle"
        subtitle="Add a new vehicle to your fleet"
        actions={
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3.5 py-2 border border-neutral-border text-neutral-textMain text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white border border-neutral-border rounded-xl p-6 shadow-soft-sm">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Registration Number *</label>
                <input value={form.registrationNumber} onChange={(e) => updateField("registrationNumber", e.target.value)} placeholder="e.g. KL-07-AU-4521" className={inputClass("registrationNumber")} />
                {errors.registrationNumber && <p className="text-[10px] text-danger mt-1">{errors.registrationNumber}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Vehicle Name *</label>
                <input value={form.vehicleName} onChange={(e) => updateField("vehicleName", e.target.value)} placeholder="e.g. Tata Prima 4040.S" className={inputClass("vehicleName")} />
                {errors.vehicleName && <p className="text-[10px] text-danger mt-1">{errors.vehicleName}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Vehicle Model *</label>
                <input value={form.vehicleModel} onChange={(e) => updateField("vehicleModel", e.target.value)} placeholder="e.g. Prima 4040.S" className={inputClass("vehicleModel")} />
                {errors.vehicleModel && <p className="text-[10px] text-danger mt-1">{errors.vehicleModel}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Vehicle Type *</label>
                <select value={form.vehicleType} onChange={(e) => updateField("vehicleType", e.target.value)} className={inputClass("vehicleType")}>
                  <option value="">Select type</option>
                  {vehicleTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.vehicleType && <p className="text-[10px] text-danger mt-1">{errors.vehicleType}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Manufacturer *</label>
                <select value={form.manufacturer} onChange={(e) => updateField("manufacturer", e.target.value)} className={inputClass("manufacturer")}>
                  <option value="">Select manufacturer</option>
                  {manufacturers.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                {errors.manufacturer && <p className="text-[10px] text-danger mt-1">{errors.manufacturer}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Manufacturing Year *</label>
                <input type="number" min="2000" max="2026" value={form.manufacturingYear} onChange={(e) => updateField("manufacturingYear", e.target.value)} placeholder="e.g. 2023" className={inputClass("manufacturingYear")} />
                {errors.manufacturingYear && <p className="text-[10px] text-danger mt-1">{errors.manufacturingYear}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">VIN Number *</label>
                <input value={form.vinNumber} onChange={(e) => updateField("vinNumber", e.target.value)} placeholder="e.g. MAT725104N123456" className={inputClass("vinNumber")} />
                {errors.vinNumber && <p className="text-[10px] text-danger mt-1">{errors.vinNumber}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Engine Number *</label>
                <input value={form.engineNumber} onChange={(e) => updateField("engineNumber", e.target.value)} placeholder="e.g. TATA-DE12-4040" className={inputClass("engineNumber")} />
                {errors.engineNumber && <p className="text-[10px] text-danger mt-1">{errors.engineNumber}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">License Plate *</label>
                <input value={form.licensePlate} onChange={(e) => updateField("licensePlate", e.target.value)} placeholder="e.g. KL-07-AU-4521" className={cn(inputClass("licensePlate"), "font-mono")} />
                {errors.licensePlate && <p className="text-[10px] text-danger mt-1">{errors.licensePlate}</p>}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-neutral-border rounded-xl p-6 shadow-soft-sm">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Maximum Load Capacity *</label>
                <input value={form.maxLoadCapacity} onChange={(e) => updateField("maxLoadCapacity", e.target.value)} placeholder="e.g. 40 Tons" className={inputClass("maxLoadCapacity")} />
                {errors.maxLoadCapacity && <p className="text-[10px] text-danger mt-1">{errors.maxLoadCapacity}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Fuel Type *</label>
                <select value={form.fuelType} onChange={(e) => updateField("fuelType", e.target.value)} className={inputClass("fuelType")}>
                  <option value="">Select fuel type</option>
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                {errors.fuelType && <p className="text-[10px] text-danger mt-1">{errors.fuelType}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Transmission *</label>
                <select value={form.transmission} onChange={(e) => updateField("transmission", e.target.value)} className={inputClass("transmission")}>
                  <option value="">Select transmission</option>
                  {transmissionOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.transmission && <p className="text-[10px] text-danger mt-1">{errors.transmission}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Mileage *</label>
                <input value={form.mileage} onChange={(e) => updateField("mileage", e.target.value)} placeholder="e.g. 4.2 km/L" className={inputClass("mileage")} />
                {errors.mileage && <p className="text-[10px] text-danger mt-1">{errors.mileage}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Odometer (km) *</label>
                <input type="number" min="0" value={form.odometer} onChange={(e) => updateField("odometer", e.target.value)} placeholder="e.g. 124500" className={inputClass("odometer")} />
                {errors.odometer && <p className="text-[10px] text-danger mt-1">{errors.odometer}</p>}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white border border-neutral-border rounded-xl p-6 shadow-soft-sm">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4">Financial Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Purchase Date *</label>
                <input type="date" value={form.purchaseDate} onChange={(e) => updateField("purchaseDate", e.target.value)} className={inputClass("purchaseDate")} />
                {errors.purchaseDate && <p className="text-[10px] text-danger mt-1">{errors.purchaseDate}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Acquisition Cost *</label>
                <input value={form.acquisitionCost} onChange={(e) => updateField("acquisitionCost", e.target.value)} placeholder="e.g. ₹45,00,000" className={inputClass("acquisitionCost")} />
                {errors.acquisitionCost && <p className="text-[10px] text-danger mt-1">{errors.acquisitionCost}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Insurance Provider *</label>
                <input value={form.insuranceProvider} onChange={(e) => updateField("insuranceProvider", e.target.value)} placeholder="e.g. ICICI Lombard" className={inputClass("insuranceProvider")} />
                {errors.insuranceProvider && <p className="text-[10px] text-danger mt-1">{errors.insuranceProvider}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Insurance Expiry *</label>
                <input type="date" value={form.insuranceExpiry} onChange={(e) => updateField("insuranceExpiry", e.target.value)} className={inputClass("insuranceExpiry")} />
                {errors.insuranceExpiry && <p className="text-[10px] text-danger mt-1">{errors.insuranceExpiry}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Warranty Expiry *</label>
                <input type="date" value={form.warrantyExpiry} onChange={(e) => updateField("warrantyExpiry", e.target.value)} className={inputClass("warrantyExpiry")} />
                {errors.warrantyExpiry && <p className="text-[10px] text-danger mt-1">{errors.warrantyExpiry}</p>}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-neutral-border rounded-xl p-6 shadow-soft-sm">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4">Operational Status</h3>
            <div className="grid grid-cols-2 gap-3">
              {statusOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all",
                    form.operationalStatus === opt.value ? "border-primary bg-primary-light/30" : "border-neutral-border hover:border-primary/30"
                  )}
                >
                  <input
                    type="radio"
                    name="operationalStatus"
                    value={opt.value}
                    checked={form.operationalStatus === opt.value}
                    onChange={(e) => updateField("operationalStatus", e.target.value)}
                    className="w-4 h-4 text-primary accent-primary"
                  />
                  <span className="text-sm font-semibold text-neutral-textMain">{opt.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white border border-neutral-border rounded-xl p-6 shadow-soft-sm">
          <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4">Document Uploads</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {uploadAreas.map((area) => (
              <div key={area.key}>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">{area.label}</label>
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-neutral-border rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary-light/20 transition-all group">
                  {form[area.key] ? (
                    <div className="text-center px-2">
                      <p className="text-xs font-semibold text-primary truncate max-w-[120px]">{form[area.key].name}</p>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); handleFileChange(area.key, null); }}
                        className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-danger hover:underline"
                      >
                        <X className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-neutral-textMuted group-hover:text-primary transition-colors" strokeWidth={1.5} />
                      <span className="text-[11px] text-neutral-textMuted mt-1.5">Click to upload</span>
                    </>
                  )}
                  <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => handleFileChange(area.key, e.target.files[0])} />
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center justify-end gap-3 pb-6">
          <button type="button" onClick={() => navigate(-1)} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-textMuted hover:bg-accent-light rounded-lg transition-colors">
            Cancel
          </button>
          <button type="button" onClick={() => setForm(initialForm)} className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-border text-sm font-semibold text-neutral-textMain rounded-lg hover:bg-accent-light transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Save className="w-4 h-4" /> Save Vehicle
          </button>
        </div>
      </form>
    </motion.div>
  );
}
