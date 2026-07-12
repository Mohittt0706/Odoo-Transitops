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
import { ArrowLeft, Wrench, AlertTriangle, AlertCircle } from "lucide-react";

const serviceTypes = [
  { value: "Preventive", label: "Preventive Maintenance" },
  { value: "Repair", label: "Repair" },
  { value: "Major Repair", label: "Major Repair" },
  { value: "Service", label: "Service" },
  { value: "Inspection", label: "Inspection" },
];

const maintRecords = [
  { id: "MNT-001", vehicle: "KL-07-AU-4521", serviceType: "Preventive", description: "Scheduled oil change and filter replacement", scheduledDate: "2026-07-15", priority: "High", assignedTo: "Rajesh Mechanic", location: "Ravi Mechanicals", estimatedCost: "₹12,000" },
];

export default function EditMaintenance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const record = maintRecords.find((r) => r.id === id);

  const methods = useForm({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: record ? {
      vehicle: record.vehicle, serviceType: record.serviceType,
      description: record.description, scheduledDate: record.scheduledDate,
      priority: record.priority, assignedTo: record.assignedTo,
      estimatedCost: record.estimatedCost || "", location: record.location || "",
    } : {},
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Maintenance request updated successfully!", "success");
    setTimeout(() => navigate("/dashboard/operations/maintenance"), 1200);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  if (!record) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-neutral-textMuted mx-auto mb-4" strokeWidth={1} />
        <h2 className="text-lg font-bold text-neutral-textMain">Record not found</h2>
        <p className="text-sm text-neutral-textMuted mt-1">The maintenance record "{id}" does not exist.</p>
        <button onClick={() => navigate(-1)} className="mt-4 btn btn-primary text-sm">Go Back</button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Edit Maintenance" subtitle={`${record.vehicle} — ${record.serviceType}`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
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

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Update Request" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Update Request?" message="This will update the maintenance request." confirmLabel="Update Request" />
    </motion.div>
  );
}
