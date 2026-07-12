import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { fuelLogSchema } from "../../../lib/validations";
import { fuelService } from "../../../services/fuel.service";
import { ArrowLeft, Fuel } from "lucide-react";

export default function AddFuelLog() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiError, setApiError] = useState(null);

  const methods = useForm({
    resolver: zodResolver(fuelLogSchema),
    defaultValues: {
      vehicleId: "", liters: "", cost: "", date: "", fuelStation: "",
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
      await fuelService.create({
        vehicleId: fd.vehicleId,
        liters: Number(fd.liters) || 0,
        cost: Number(fd.cost) || 0,
        date: fd.date || undefined,
        fuelStation: fd.fuelStation,
      });
      setSaved(true);
      toast("Fuel log added successfully!", "success");
      setTimeout(() => navigate("/dashboard/operations/fuel"), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to add fuel log";
      setApiError(msg);
      toast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Add Fuel Log" subtitle="Record a fuel transaction"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {apiError && (
        <div className="mb-4 p-3 text-sm text-danger bg-danger-light border border-danger/20 rounded-lg">{apiError}</div>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Fuel Details" description="Fuel transaction info" icon={Fuel} delay={0.05}>
            <FormRow>
              <FormInput name="vehicleId" label="Vehicle ID *" placeholder="Vehicle ObjectId" />
              <FormInput name="fuelStation" label="Fuel Station" placeholder="HP, BP, IOCL..." />
            </FormRow>
            <FormRow>
              <FormInput name="liters" label="Liters *" placeholder="50" type="number" />
              <FormInput name="cost" label="Total Cost (₹) *" placeholder="5000" type="number" />
            </FormRow>
          </FormSection>
          <FormSection title="Date" description="Transaction date" icon={Fuel} delay={0.1}>
            <FormRow>
              <FormDatePicker name="date" label="Date" />
            </FormRow>
          </FormSection>
        </div>
        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Add Fuel Log" loading={isSubmitting || submitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Add Fuel Log?" message="This will record a new fuel transaction." confirmLabel="Add Fuel Log" />
    </motion.div>
  );
}
