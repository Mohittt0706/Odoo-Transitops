import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/common/Modal";
import { useToast } from "../../components/common/Toast";
import {
  Building2, Hash, FileText, MapPin, Globe, Phone, Mail,
  User, Warehouse, Clock, Shield, Camera, Upload, Plus,
} from "lucide-react";

const companyTypes = [];
const deliveryZones = [];
const warehouses = [];
const docks = [];
const timeSlots = [];
const rmList = [];

let receiverCounter = 0;

function generateCode(name) {
  const prefix = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 4) || "RCVR";
  return `${prefix}-${String(receiverCounter).padStart(3, "0")}`;
}

export default function AddReceiverModal({ open, onClose, onSave, existingReceivers }) {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const existingNames = useMemo(() => existingReceivers.map(r => r.name.toLowerCase()), [existingReceivers]);
  const existingEmails = useMemo(() => existingReceivers.map(r => r.email.toLowerCase()), [existingReceivers]);
  const existingCodes = useMemo(() => existingReceivers.map(r => r.companyCode?.toLowerCase()).filter(Boolean), [existingReceivers]);

  const {
    register, handleSubmit, watch, setValue, reset, formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "", companyCode: "", companyType: "", gstNumber: "",
      address: "", city: "", state: "", country: "India", postalCode: "",
      contactPerson: "", designation: "", phone: "", alternatePhone: "", email: "",
      preferredWarehouse: "", deliveryZone: "", defaultDock: "", preferredDeliveryTime: "",
      expectedMonthlyDeliveries: "0",
      verificationStatus: "pending", verificationDate: "", assignedRM: "",
      notes: "",
    },
  });

  const companyName = watch("companyName");

  const handleCompanyNameChange = (e) => {
    const name = e.target.value;
    setValue("companyName", name);
    if (name.trim()) {
      setValue("companyCode", generateCode(name));
    }
  };

  const onSubmit = (data) => {
    if (existingNames.includes(data.companyName.toLowerCase())) {
      toast("A receiver with this company name already exists.", "error");
      return;
    }
    if (existingEmails.includes(data.email.toLowerCase())) {
      toast("A receiver with this email already exists.", "error");
      return;
    }
    if (existingCodes.includes(data.companyCode.toLowerCase())) {
      toast("A receiver with this company code already exists.", "error");
      return;
    }

    setSubmitting(true);

    const isVerified = data.verificationStatus === "verified";
    const newReceiver = {
      id: `RC-${String(receiverCounter).padStart(3, "0")}`,
      companyCode: data.companyCode,
      companyType: data.companyType,
      gstNumber: data.gstNumber,
      name: data.companyName,
      contact: data.contactPerson,
      designation: data.designation,
      phone: data.phone,
      alternatePhone: data.alternatePhone,
      email: data.email,
      address: `${data.address}, ${data.city}, ${data.state}, ${data.country} - ${data.postalCode}`,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
      preferredWarehouse: data.preferredWarehouse,
      deliveryZone: data.deliveryZone,
      defaultDock: data.defaultDock,
      preferredDeliveryTime: data.preferredDeliveryTime,
      expectedMonthlyDeliveries: parseInt(data.expectedMonthlyDeliveries) || 0,
      verified: isVerified,
      verificationDate: isVerified ? (data.verificationDate || new Date().toISOString().split("T")[0]) : null,
      verificationStatus: isVerified ? "Verified" : "Pending Verification",
      assignedRM: data.assignedRM,
      notes: data.notes,
      totalDeliveries: 0,
      pendingDeliveries: 0,
      rating: 0,
      digitalSignature: false,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    receiverCounter++;
    onSave?.(newReceiver);
    toast(`Receiver "${data.companyName}" added successfully!`, "success");
    setSubmitting(false);
    reset();
    onClose();
  };

  const handleSaveAndAddAnother = async () => {
    await handleSubmit(onSubmit)();
  };

  const handleReset = () => {
    reset({
      companyName: "", companyCode: "", companyType: "", gstNumber: "",
      address: "", city: "", state: "", country: "India", postalCode: "",
      contactPerson: "", designation: "", phone: "", alternatePhone: "", email: "",
      preferredWarehouse: "", deliveryZone: "", defaultDock: "", preferredDeliveryTime: "",
      expectedMonthlyDeliveries: "0",
      verificationStatus: "pending", verificationDate: "", assignedRM: "",
      notes: "",
    });
    toast("Form reset", "info");
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Receiver" subtitle="Register a new delivery receiver in the system"
      size="xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
        {/* Company Information */}
        <div>
          <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-primary" /> Company Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Company Name <span className="text-danger">*</span></label>
              <input {...register("companyName", { required: "Company name is required" })}
                onChange={handleCompanyNameChange}
                placeholder="e.g., Acme Corp"
                className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.companyName ? "border-danger" : "border-neutral-border"}`} />
              {errors.companyName && <p className="text-[9px] text-danger mt-0.5">{errors.companyName.message}</p>}
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Company Code <span className="text-danger">*</span></label>
              <input {...register("companyCode", { required: "Company code is required" })}
                placeholder="Auto-generated"
                className={`w-full h-9 px-3 text-xs bg-neutral-light/50 border rounded-lg outline-none font-mono ${errors.companyCode ? "border-danger" : "border-neutral-border"}`} />
              {errors.companyCode && <p className="text-[9px] text-danger mt-0.5">{errors.companyCode.message}</p>}
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Company Type</label>
              <select {...register("companyType")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select type</option>
                {companyTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">GST Number</label>
              <input {...register("gstNumber")}
                placeholder="e.g., 27AAACP1234A1Z5"
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Company Address <span className="text-danger">*</span></label>
              <input {...register("address", { required: "Address is required" })}
                placeholder="Street, building, area"
                className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.address ? "border-danger" : "border-neutral-border"}`} />
              {errors.address && <p className="text-[9px] text-danger mt-0.5">{errors.address.message}</p>}
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">City <span className="text-danger">*</span></label>
              <input {...register("city", { required: "City is required" })}
                className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.city ? "border-danger" : "border-neutral-border"}`} />
              {errors.city && <p className="text-[9px] text-danger mt-0.5">{errors.city.message}</p>}
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">State</label>
              <input {...register("state")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Country</label>
              <input {...register("country")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Postal Code <span className="text-danger">*</span></label>
              <input {...register("postalCode", { required: "Postal code is required" })}
                className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.postalCode ? "border-danger" : "border-neutral-border"}`} />
              {errors.postalCode && <p className="text-[9px] text-danger mt-0.5">{errors.postalCode.message}</p>}
            </div>
          </div>
        </div>

        {/* Primary Contact */}
        <div>
          <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary" /> Primary Contact
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Contact Person <span className="text-danger">*</span></label>
              <input {...register("contactPerson", { required: "Contact person is required" })}
                className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.contactPerson ? "border-danger" : "border-neutral-border"}`} />
              {errors.contactPerson && <p className="text-[9px] text-danger mt-0.5">{errors.contactPerson.message}</p>}
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Designation</label>
              <input {...register("designation")}
                placeholder="e.g., Logistics Manager"
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Phone Number <span className="text-danger">*</span></label>
              <input {...register("phone", {
                required: "Phone number is required",
                pattern: { value: /^[\d\s\+\-\(\)]{7,20}$/, message: "Invalid phone number" },
              })}
                placeholder="+91 98765 43210"
                className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.phone ? "border-danger" : "border-neutral-border"}`} />
              {errors.phone && <p className="text-[9px] text-danger mt-0.5">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Alternate Phone</label>
              <input {...register("alternatePhone")}
                placeholder="+91 98765 43211"
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Email Address <span className="text-danger">*</span></label>
              <input {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
              })}
                placeholder="contact@company.com"
                className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.email ? "border-danger" : "border-neutral-border"}`} />
              {errors.email && <p className="text-[9px] text-danger mt-0.5">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div>
          <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Warehouse className="w-3.5 h-3.5 text-primary" /> Delivery Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Preferred Warehouse</label>
              <select {...register("preferredWarehouse")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select warehouse</option>
                {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Delivery Zone</label>
              <select {...register("deliveryZone")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select zone</option>
                {deliveryZones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Default Dock</label>
              <select {...register("defaultDock")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select dock</option>
                {docks.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Preferred Delivery Time</label>
              <select {...register("preferredDeliveryTime")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select time</option>
                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Expected Monthly Deliveries</label>
              <input type="number" min="0" {...register("expectedMonthlyDeliveries")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
          </div>
        </div>

        {/* Verification */}
        <div>
          <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary" /> Verification
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Verification Status</label>
              <select {...register("verificationStatus")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="pending">Pending Verification</option>
                <option value="verified">Verified</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Verification Date</label>
              <input type="date" {...register("verificationDate")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Assigned RM</label>
              <select {...register("assignedRM")}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="">Select RM</option>
                {rmList.map(rm => <option key={rm} value={rm}>{rm}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-primary" /> Additional Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Notes</label>
              <textarea rows={3} {...register("notes")}
                placeholder="Any special notes about this receiver..."
                className="w-full px-3 py-2 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none" />
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Company Logo</label>
                <div className="flex items-center gap-3 p-3 bg-neutral-light border border-dashed border-neutral-border rounded-lg">
                  <Camera className="w-5 h-5 text-neutral-textMuted" />
                  <span className="text-[11px] text-neutral-textMuted">Upload logo image (PNG, JPG)</span>
                  <button type="button" className="ml-auto px-3 py-1 text-[10px] font-bold text-primary bg-primary-light rounded-lg hover:bg-primary/20 transition-colors">
                    Browse
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Supporting Documents</label>
                <div className="flex items-center gap-3 p-3 bg-neutral-light border border-dashed border-neutral-border rounded-lg">
                  <Upload className="w-5 h-5 text-neutral-textMuted" />
                  <span className="text-[11px] text-neutral-textMuted">Upload documents (PDF, DOC)</span>
                  <button type="button" className="ml-auto px-3 py-1 text-[10px] font-bold text-primary bg-primary-light rounded-lg hover:bg-primary/20 transition-colors">
                    Browse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-border/60">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">
            Cancel
          </button>
          <button type="button" onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold text-neutral-textMain bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">
            Reset
          </button>
          <button type="button" onClick={handleSaveAndAddAnother}
            className="px-4 py-2 text-xs font-semibold text-neutral-textMain bg-white border border-primary/30 text-primary rounded-lg hover:bg-primary-light transition-all">
            Save &amp; Add Another
          </button>
          <button type="submit" disabled={submitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-soft-sm disabled:opacity-60">
            {submitting ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            Save Receiver
          </button>
        </div>
      </form>
    </Modal>
  );
}
