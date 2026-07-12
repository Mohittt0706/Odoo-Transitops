import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/common/Modal";
import { useToast } from "../../components/common/Toast";
import { Package, Hash, Ruler, Thermometer, Weight, User, FileText, Plus } from "lucide-react";

const storageTypes = ["General", "Cold Storage", "Fragile Goods", "Hazardous", "Export", "Bulk Storage"];

export default function NewSectionModal({ open, onClose, onCreate, warehouseSections }) {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const existingCodes = warehouseSections.map(s => {
    const parts = s.name.split("-");
    return parts.length > 1 ? parts[0].trim() : s.name.substring(0, 4).toUpperCase();
  });

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: {
      sectionName: "", sectionCode: "", storageType: "",
      capacity: "", maxWeight: "", tempRange: "",
      supervisor: "", description: "",
    },
  });

  const onSubmit = (data) => {
    const code = data.sectionCode.toUpperCase();
    if (existingCodes.includes(code)) {
      toast("Section code '" + code + "' already exists. Please use a unique code.", "error");
      return;
    }

    setSubmitting(true);

    const typeColors = {
      "General": "#1E3A5F", "Cold Storage": "#06B6D4", "Fragile Goods": "#D97706",
      "Hazardous": "#DC2626", "Export": "#7C3AED", "Bulk Storage": "#059669",
    };
    const typeShort = {
      "General": "Dry", "Cold Storage": "Cold", "Fragile Goods": "Controlled",
      "Hazardous": "Ventilated", "Export": "Controlled", "Bulk Storage": "Dry",
    };

    const capacity = parseInt(data.capacity, 10) || 0;
    const newSection = {
      name: `${data.sectionCode} - ${data.sectionName}`,
      capacity,
      used: 0,
      type: typeShort[data.storageType] || "Dry",
    };

    warehouseSections.push(newSection);

    const newDistro = {
      label: data.storageType,
      value: Math.max(1, Math.round(capacity / 100)),
      color: typeColors[data.storageType] || "#1E3A5F",
    };

    onCreate?.({
      section: newSection,
      distribution: newDistro,
      formData: data,
    });

    toast(`Section "${data.sectionCode} - ${data.sectionName}" created successfully!`, "success");
    setSubmitting(false);
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Create Warehouse Section" subtitle="Add a new storage section to the warehouse"
      size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Section Name */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
              <Package className="w-3 h-3" /> Section Name <span className="text-danger ml-0.5">*</span>
            </label>
            <input {...register("sectionName", { required: "Section name is required" })}
              placeholder="e.g., Cold Storage - Zone 2"
              className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.sectionName ? "border-danger" : "border-neutral-border"}`} />
            {errors.sectionName && <p className="text-[10px] text-danger mt-1">{errors.sectionName.message}</p>}
          </div>

          {/* Section Code */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
              <Hash className="w-3 h-3" /> Section Code <span className="text-danger ml-0.5">*</span>
            </label>
            <input {...register("sectionCode", {
              required: "Section code is required",
              pattern: { value: /^[A-Za-z0-9-]+$/, message: "Only letters, numbers, and hyphens" },
            })}
              placeholder="e.g., SEC-Z02"
              className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.sectionCode ? "border-danger" : "border-neutral-border"}`} />
            {errors.sectionCode && <p className="text-[10px] text-danger mt-1">{errors.sectionCode.message}</p>}
          </div>

          {/* Storage Type */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
              <Package className="w-3 h-3" /> Storage Type <span className="text-danger ml-0.5">*</span>
            </label>
            <select {...register("storageType", { required: "Storage type is required" })}
              className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.storageType ? "border-danger" : "border-neutral-border"}`}>
              <option value="">Select type</option>
              {storageTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.storageType && <p className="text-[10px] text-danger mt-1">{errors.storageType.message}</p>}
          </div>

          {/* Capacity */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
              <Ruler className="w-3 h-3" /> Capacity (sq ft) <span className="text-danger ml-0.5">*</span>
            </label>
            <input type="number" min="1" {...register("capacity", {
              required: "Capacity is required",
              min: { value: 1, message: "Must be at least 1 sq ft" },
              valueAsNumber: true,
            })}
              placeholder="e.g., 5000"
              className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.capacity ? "border-danger" : "border-neutral-border"}`} />
            {errors.capacity && <p className="text-[10px] text-danger mt-1">{errors.capacity.message}</p>}
          </div>

          {/* Max Weight */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
              <Weight className="w-3 h-3" /> Max Weight (kg)
            </label>
            <input type="number" min="0" {...register("maxWeight", {
              min: { value: 0, message: "Must be positive" },
              valueAsNumber: true,
            })}
              placeholder="e.g., 10000"
              className="w-full h-10 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10" />
            {errors.maxWeight && <p className="text-[10px] text-danger mt-1">{errors.maxWeight.message}</p>}
          </div>

          {/* Temperature Range */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
              <Thermometer className="w-3 h-3" /> Temperature Range
            </label>
            <input {...register("tempRange")}
              placeholder="e.g., -10°C to 4°C"
              className="w-full h-10 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>

          {/* Assigned Supervisor */}
          <div>
            <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
              <User className="w-3 h-3" /> Assigned Supervisor
            </label>
            <input {...register("supervisor")}
              placeholder="e.g., Rajesh Mehta"
              className="w-full h-10 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
              <FileText className="w-3 h-3" /> Description
            </label>
            <textarea rows={2} {...register("description")}
              placeholder="Describe the section purpose, restrictions, or special handling..."
              className="w-full px-3 py-2 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-border/60">
          <button type="button" onClick={() => { reset(); onClose(); }}
            className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">
            Cancel
          </button>
          <button type="button" onClick={() => reset()}
            className="px-4 py-2 text-xs font-semibold text-neutral-textMain bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">
            Reset
          </button>
          <button type="submit" disabled={submitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-soft-sm disabled:opacity-60">
            {submitting ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            Create Section
          </button>
        </div>
      </form>
    </Modal>
  );
}
