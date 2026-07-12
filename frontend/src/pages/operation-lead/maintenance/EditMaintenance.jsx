import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormTextarea, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { maintenanceSchema } from "../../../lib/validations";
import { maintenanceService } from "../../../services/maintenance.service";
import { ArrowLeft, Wrench, AlertTriangle, AlertCircle, Loader2 } from "lucide-react";

const serviceTypes = [
  { value: "Preventive", label: "Preventive Maintenance" },
  { value: "Repair", label: "Repair" },
  { value: "Major Repair", label: "Major Repair" },
  { value: "Service", label: "Service" },
  { value: "Inspection", label: "Inspection" },
];

export default function EditMaintenance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [recordData, setRecordData] = useState(null);

  const methods = useForm({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      vehicle: "", serviceType: "Service", description: "", scheduledDate: "",
      priority: "Medium", assignedTo: "", estimatedCost: "", location: "",
    },
  });

  const { handleSubmit, formState: { isSubmitting }, reset } = methods;

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await maintenanceService.getById(id);
        const d = res.data.record || res.data;
        setRecordData(d);
        const vehicleVal = d.vehicleId?.registrationNumber || (typeof d.vehicleId === "string" ? d.vehicleId : "") || "";
        reset({
          vehicle: vehicleVal,
          serviceType: d.serviceType || "Service",
          description: d.issue || d.description || "",
          scheduledDate: d.maintenanceDate || "",
          priority: d.priority || "Medium",
          assignedTo: d.technicianName || "",
          estimatedCost: d.cost ? String(d.cost) : "",
          location: d.location || "",
        });
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || "Failed to load maintenance record";
        setFetchError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id, reset]);

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    setApiError(null);
    try {
      const fd = methods.getValues();
      await maintenanceService.update(id, {
        vehicleId: fd.vehicle,
        issue: fd.description,
        description: fd.description,
        cost: Number(fd.estimatedCost) || 0,
        maintenanceDate: fd.scheduledDate || undefined,
        technicianName: fd.assignedTo,
        status: fd.status || undefined,
      });
      setSaved(true);
      toast("Maintenance request updated successfully!", "success");
      setTimeout(() => navigate("/dashboard/operations/maintenance"), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to update maintenance request";
      setApiError(msg);
      toast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
        <p className="text-sm text-neutral-textMuted">Loading maintenance details...</p>
      </motion.div>
    );
  }

  if (fetchError) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-danger mx-auto mb-4" strokeWidth={1} />
        <h2 className="text-lg font-bold text-neutral-textMain">Failed to load record</h2>
        <p className="text-sm text-neutral-textMuted mt-1">{fetchError}</p>
        <button onClick={() => navigate(-1)} className="mt-4 btn btn-primary text-sm">Go Back</button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Edit Maintenance" subtitle={`${(recordData?.vehicleId?.registrationNumber || recordData?.vehicleId || "")} — ${recordData?.issue || recordData?.serviceType || "Maintenance"}`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {apiError && (
        <div className="mb-4 p-3 text-sm text-danger bg-danger-light border border-danger/20 rounded-lg">{apiError}</div>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Maintenance Details" description="Service type and description" icon={Wrench} delay={0.05}>
            <FormRow>
              <FormSelect name="vehicle" label="Vehicle *" placeholder="Select vehicle" searchable
                options={[{ value: "KL-07-AU-4521", label: "KL-07-AU-4521 — Tata Prima" }, { value: "KA-01-MN-3312", label: "KA-01-MN-3312 — Ashok Leyland" }, { value: "MH-12-RT-2244", label: "MH-12-RT-2244 — Mahindra Blazo" }]} />
              <FormSelect name="serviceType" label="Service Type *" placeholder="Select type" options={serviceTypes} />
            </FormRow>
            <FormRow cols={1}>
              <FormTextarea name="description" label="Description *" rows={3} />
            </FormRow>
          </FormSection>

          <FormSection title="Scheduling" description="Timing and priority" icon={AlertTriangle} delay={0.1}>
            <FormRow>
              <FormDatePicker name="scheduledDate" label="Scheduled Date *" />
              <FormSelect name="priority" label="Priority *" placeholder="Select priority"
                options={[{ value: "Critical", label: "Critical" }, { value: "High", label: "High" }, { value: "Medium", label: "Medium" }, { value: "Low", label: "Low" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Assignment" description="Mechanic and location" icon={Wrench} delay={0.15}>
            <FormRow>
              <FormSelect name="assignedTo" label="Assigned To *" placeholder="Select mechanic"
                options={[{ value: "Rajesh Mechanic", label: "Rajesh Mechanic" }, { value: "Suresh Auto", label: "Suresh Auto" }, { value: "Anil Brakes", label: "Anil Brakes" }]} />
              <FormSelect name="location" label="Location" placeholder="Select garage"
                options={[{ value: "Ravi Mechanicals", label: "Ravi Mechanicals" }, { value: "Transit Auto Care", label: "Transit Auto Care" }, { value: "FleetFix Pro", label: "FleetFix Pro" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Cost Estimate" description="Estimated cost" icon={AlertTriangle} delay={0.2}>
            <FormRow>
              <FormInput name="estimatedCost" label="Estimated Cost" />
            </FormRow>
          </FormSection>
        </div>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Update Request" loading={isSubmitting || submitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Update Request?" message="This will update the maintenance request." confirmLabel="Update Request" />
    </motion.div>
  );
}
