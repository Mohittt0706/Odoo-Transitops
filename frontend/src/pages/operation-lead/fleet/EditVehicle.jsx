import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { vehicleSchema } from "../../../lib/validations";
import { vehicleService } from "../../../services/vehicle.service";
import { ArrowLeft, Truck, AlertCircle } from "lucide-react";

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const methods = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {},
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = methods;

  useEffect(() => {
    (async () => {
      try {
        const res = await vehicleService.getById(id);
        const v = res.data.vehicle;
        reset({
          registrationNumber: v.registrationNumber || "",
          vehicleName: v.vehicleName || "",
          vehicleType: v.vehicleType || "",
          maxLoadCapacity: String(v.maxLoadCapacity || ""),
          acquisitionCost: String(v.acquisitionCost || ""),
          odometer: String(v.odometer || "0"),
        });
      } catch (err) {
        setApiError(err?.response?.data?.message || err.message || "Vehicle not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, reset]);

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setApiError(null);
    try {
      const formData = methods.getValues();
      await vehicleService.update(id, {
        registrationNumber: formData.registrationNumber,
        vehicleName: formData.vehicleName,
        vehicleType: formData.vehicleType,
        maxLoadCapacity: Number(formData.maxLoadCapacity),
        acquisitionCost: Number(formData.acquisitionCost),
        odometer: Number(formData.odometer) || 0,
      });
      setSaved(true);
      toast("Vehicle updated successfully", "success");
      setTimeout(() => navigate("/dashboard/operations/fleet"), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to update vehicle";
      setApiError(msg);
      toast(msg, "error");
    }
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </motion.div>
    );
  }

  if (apiError && !methods.getValues().vehicleName) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-neutral-textMuted mx-auto mb-4" strokeWidth={1} />
        <h2 className="text-lg font-bold text-neutral-textMain">Vehicle not found</h2>
        <p className="text-sm text-neutral-textMuted mt-1">{apiError}</p>
        <button onClick={() => navigate(-1)} className="mt-4 btn btn-primary text-sm">Go Back</button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title={`Edit Vehicle`} subtitle={`ID: ${id}`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {apiError && (
        <div className="mb-4 p-3 text-sm text-danger bg-danger-light border border-danger/20 rounded-lg">{apiError}</div>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Basic Information" description="Vehicle identification details" icon={Truck} delay={0.05}>
            <FormRow>
              <FormInput name="registrationNumber" label="Registration Number *" icon={Truck} />
              <FormInput name="vehicleName" label="Vehicle Name *" />
            </FormRow>
            <FormRow>
              <FormInput name="vehicleType" label="Vehicle Type *" />
              <FormInput name="maxLoadCapacity" label="Max Load Capacity (kg) *" type="number" />
            </FormRow>
            <FormRow>
              <FormInput name="acquisitionCost" label="Acquisition Cost (₹) *" type="number" />
              <FormInput name="odometer" label="Odometer (km)" type="number" />
            </FormRow>
          </FormSection>
        </div>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} onReset={() => reset(methods.getValues())}
          submitLabel="Update Vehicle" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Update Vehicle?" message="This will update the vehicle details." confirmLabel="Update Vehicle" />
    </motion.div>
  );
}
