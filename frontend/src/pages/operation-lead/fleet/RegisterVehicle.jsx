import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { vehicleSchema } from "../../../lib/validations";
import { vehicleService } from "../../../services/vehicle.service";
import { ArrowLeft, Truck, Settings, IndianRupee, Activity } from "lucide-react";

const defaultValues = {
  registrationNumber: "", vehicleName: "", vehicleType: "", maxLoadCapacity: "", acquisitionCost: "", odometer: "0",
};

export default function RegisterVehicle() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [apiError, setApiError] = useState(null);

  const methods = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues,
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = methods;

  const onSubmit = (formData) => {
    setApiError(null);
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    setApiError(null);
    try {
      const formData = methods.getValues();
      await vehicleService.create({
        registrationNumber: formData.registrationNumber,
        vehicleName: formData.vehicleName,
        vehicleType: formData.vehicleType,
        maxLoadCapacity: Number(formData.maxLoadCapacity),
        acquisitionCost: Number(formData.acquisitionCost),
        odometer: Number(formData.odometer) || 0,
      });
      setSaved(true);
      toast("Vehicle registered successfully", "success");
      setTimeout(() => navigate("/dashboard/operations/fleet"), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to register vehicle";
      setApiError(msg);
      toast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Register New Vehicle" subtitle="Add a new vehicle to your fleet"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {apiError && (
        <div className="mb-4 p-3 text-sm text-danger bg-danger-light border border-danger/20 rounded-lg">{apiError}</div>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Basic Information" description="Vehicle identification details" icon={Truck} delay={0.05}>
            <FormRow>
              <FormInput name="registrationNumber" label="Registration Number *" placeholder="KL-07-AU-4521" icon={Truck} />
              <FormInput name="vehicleName" label="Vehicle Name *" placeholder="Tata Prima 4040.S" />
            </FormRow>
            <FormRow>
              <FormInput name="vehicleType" label="Vehicle Type *" placeholder="Truck/Trailer" />
              <FormInput name="maxLoadCapacity" label="Max Load Capacity (kg) *" placeholder="25000" type="number" />
            </FormRow>
            <FormRow>
              <FormInput name="acquisitionCost" label="Acquisition Cost (₹) *" placeholder="4500000" type="number" />
              <FormInput name="odometer" label="Odometer (km)" placeholder="0" type="number" />
            </FormRow>
          </FormSection>
        </div>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} onReset={() => reset(defaultValues)}
          submitLabel="Save Vehicle" loading={isSubmitting || submitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Register Vehicle?" message="This will add a new vehicle to your fleet. You can edit details later." confirmLabel="Register Vehicle" />
    </motion.div>
  );
}
