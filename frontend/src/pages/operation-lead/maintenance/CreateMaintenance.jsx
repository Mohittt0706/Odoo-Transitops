import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormTextarea, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { maintenanceSchema } from "../../../lib/validations";
import { maintenanceService } from "../../../services/maintenance.service";
import { ArrowLeft, Wrench, AlertTriangle } from "lucide-react";

export default function CreateMaintenance() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiError, setApiError] = useState(null);

  const methods = useForm({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      vehicleId: "", issue: "", cost: "", maintenanceDate: "", status: "OPEN",
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    setApiError(null);
    try {
      const fd = methods.getValues();
      await maintenanceService.create({
        vehicleId: fd.vehicleId,
        issue: fd.issue,
        description: fd.issue,
        cost: Number(fd.cost) || 0,
        maintenanceDate: fd.maintenanceDate || undefined,
        status: "OPEN",
      });
      setSaved(true);
      toast("Maintenance request created successfully!", "success");
      setTimeout(() => navigate("/dashboard/operations/maintenance"), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to create maintenance request";
      setApiError(msg);
      toast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Schedule Maintenance" subtitle="Create a new maintenance request"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {apiError && (
        <div className="mb-4 p-3 text-sm text-danger bg-danger-light border border-danger/20 rounded-lg">{apiError}</div>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Maintenance Details" description="Vehicle and issue" icon={Wrench} delay={0.05}>
            <FormRow>
              <FormInput name="vehicleId" label="Vehicle ID *" placeholder="Vehicle ObjectId" />
              <FormSelect name="status" label="Status" options={[{ value: "OPEN", label: "Open" }, { value: "IN_PROGRESS", label: "In Progress" }]} />
            </FormRow>
            <FormRow cols={1}>
              <FormTextarea name="issue" label="Issue Description *" rows={3} />
            </FormRow>
          </FormSection>

          <FormSection title="Scheduling" description="Timing and cost" icon={AlertTriangle} delay={0.1}>
            <FormRow>
              <FormDatePicker name="maintenanceDate" label="Maintenance Date" />
              <FormInput name="cost" label="Estimated Cost (₹)" placeholder="15000" type="number" />
            </FormRow>
          </FormSection>
        </div>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Create Request" loading={isSubmitting || submitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Create Maintenance Request?" message="This will schedule a new maintenance task." confirmLabel="Create Request" />
    </motion.div>
  );
}
