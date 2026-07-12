import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormTextarea, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { tripSchema } from "../../../lib/validations";
import { tripService } from "../../../services/trip.service";
import { ArrowLeft, Route, Package, AlertTriangle, FileText } from "lucide-react";

export default function CreateTrip() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiError, setApiError] = useState(null);

  const methods = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      source: "", destination: "", cargoWeight: "", plannedDistance: "", cargoType: "", notes: "",
      vehicleId: "", driverId: "", receiverId: "",
      scheduledStart: "", scheduledEnd: "", priority: "NORMAL",
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
      await tripService.create({
        source: fd.source,
        destination: fd.destination,
        cargoWeight: Number(fd.cargoWeight) || 0,
        plannedDistance: Number(fd.plannedDistance) || 0,
        cargoType: fd.cargoType,
        vehicleId: fd.vehicleId,
        driverId: fd.driverId,
        receiverId: fd.receiverId,
        notes: fd.notes,
      });
      setSaved(true);
      toast("Trip created successfully!", "success");
      setTimeout(() => navigate("/dashboard/operations/trips"), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to create trip";
      setApiError(msg);
      toast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Create Trip" subtitle="Schedule a new delivery trip"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {apiError && (
        <div className="mb-4 p-3 text-sm text-danger bg-danger-light border border-danger/20 rounded-lg">{apiError}</div>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Route" description="Origin and destination" icon={Route} delay={0.05}>
            <FormRow>
              <FormInput name="source" label="Origin *" placeholder="Mumbai, Maharashtra" />
              <FormInput name="destination" label="Destination *" placeholder="Delhi, NCR" />
            </FormRow>
            <FormRow>
              <FormInput name="plannedDistance" label="Distance (km) *" placeholder="1400" type="number" />
              <FormInput name="cargoWeight" label="Cargo Weight (kg) *" placeholder="25000" type="number" />
            </FormRow>
          </FormSection>

          <FormSection title="Assignment" description="Vehicle, driver, receiver" icon={AlertTriangle} delay={0.1}>
            <FormRow>
              <FormInput name="vehicleId" label="Vehicle ID *" placeholder="Vehicle ObjectId" />
              <FormInput name="driverId" label="Driver ID *" placeholder="Driver ObjectId" />
            </FormRow>
            <FormRow>
              <FormInput name="receiverId" label="Receiver ID" placeholder="Receiver ObjectId" />
              <FormInput name="cargoType" label="Cargo Type" placeholder="Electronics, Garments..." />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Additional Notes" description="Any additional information" icon={FileText} delay={0.25}>
          <FormTextarea name="notes" label="Notes" rows={3} />
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Create Trip" loading={isSubmitting || submitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Create Trip?" message="This will schedule a new trip. You can modify it later." confirmLabel="Create Trip" />
    </motion.div>
  );
}
