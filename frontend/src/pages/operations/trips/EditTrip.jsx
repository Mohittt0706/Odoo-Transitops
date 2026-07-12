import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormTextarea, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { tripSchema } from "../../../lib/validations";
import { tripService } from "../../../services/trip.service";
import { ArrowLeft, Route, Package, AlertTriangle, FileText, AlertCircle, Loader2 } from "lucide-react";

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [tripData, setTripData] = useState(null);

  const methods = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: "", vehicle: "", driver: "", origin: "", destination: "",
      scheduledStart: "", scheduledEnd: "", cargoType: "", cargoWeight: "",
      cargoValue: "", tripType: "Freight", priority: "Normal", notes: "",
    },
  });

  const { handleSubmit, formState: { isSubmitting }, reset } = methods;

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const res = await tripService.getById(id);
        const d = res.data.trip || res.data;
        setTripData(d);
        const vehicleVal = d.vehicleId?.registrationNumber || (typeof d.vehicleId === "string" ? d.vehicleId : "") || "";
        const driverVal = d.driverId?.fullName || (typeof d.driverId === "string" ? d.driverId : "") || "";
        const titleVal = d.title || `${d.source || ""} → ${d.destination || ""}`;
        reset({
          title: titleVal,
          vehicle: vehicleVal,
          driver: driverVal,
          origin: d.source || "",
          destination: d.destination || "",
          scheduledStart: d.scheduledStart || "",
          scheduledEnd: d.scheduledEnd || "",
          cargoType: d.cargoType || "",
          cargoWeight: d.cargoWeight ? String(d.cargoWeight) : "",
          cargoValue: d.cargoValue || "",
          tripType: d.tripType || "Freight",
          priority: d.priority || "Normal",
          notes: d.notes || "",
        });
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || "Failed to load trip";
        setFetchError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id, reset]);

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setSubmitting(true);
    setApiError(null);
    try {
      const fd = methods.getValues();
      await tripService.update(id, {
        source: fd.origin,
        destination: fd.destination,
        cargoWeight: Number(fd.cargoWeight) || 0,
        plannedDistance: Number(fd.plannedDistance) || 0,
        vehicleId: fd.vehicle,
        driverId: fd.driver,
        notes: fd.notes,
        scheduledStart: fd.scheduledStart || undefined,
        scheduledEnd: fd.scheduledEnd || undefined,
        cargoType: fd.cargoType || undefined,
        priority: fd.priority || undefined,
      });
      setSaved(true);
      toast("Trip updated successfully!", "success");
      setTimeout(() => navigate("/dashboard/operations/trips"), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Failed to update trip";
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
        <p className="text-sm text-neutral-textMuted">Loading trip details...</p>
      </motion.div>
    );
  }

  if (fetchError) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-danger mx-auto mb-4" strokeWidth={1} />
        <h2 className="text-lg font-bold text-neutral-textMain">Failed to load trip</h2>
        <p className="text-sm text-neutral-textMuted mt-1">{fetchError}</p>
        <button onClick={() => navigate(-1)} className="mt-4 btn btn-primary text-sm">Go Back</button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Edit Trip" subtitle={`${(tripData?.title || tripData?.source || "")} — ${id}`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      {apiError && (
        <div className="mb-4 p-3 text-sm text-danger bg-danger-light border border-danger/20 rounded-lg">{apiError}</div>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Trip Details" description="Basic trip information" icon={Route} delay={0.05}>
            <FormRow>
              <FormInput name="title" label="Trip Title *" />
              <FormSelect name="tripType" label="Trip Type *" placeholder="Select type"
                options={[{ value: "Freight", label: "Freight" }, { value: "Express", label: "Express" }, { value: "Container", label: "Container" }, { value: "Special", label: "Special" }]} />
            </FormRow>
            <FormRow cols={1}>
              <FormSelect name="priority" label="Priority *" placeholder="Select priority"
                options={[{ value: "Low", label: "Low" }, { value: "Normal", label: "Normal" }, { value: "Medium", label: "Medium" }, { value: "High", label: "High" }, { value: "Critical", label: "Critical" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Route" description="Origin and destination" icon={Route} delay={0.1}>
            <FormRow>
              <FormInput name="origin" label="Origin *" />
              <FormInput name="destination" label="Destination *" />
            </FormRow>
            <FormRow>
              <FormDatePicker name="scheduledStart" label="Scheduled Start *" />
              <FormDatePicker name="scheduledEnd" label="Scheduled End *" />
            </FormRow>
          </FormSection>

          <FormSection title="Assignment" description="Vehicle and driver assignment" icon={AlertTriangle} delay={0.15}>
            <FormRow>
              <FormSelect name="vehicle" label="Vehicle *" placeholder="Select vehicle" searchable
                options={[{ value: "KL-07-AU-4521", label: "KL-07-AU-4521 — Tata Prima" }, { value: "KA-01-MN-3312", label: "KA-01-MN-3312 — Ashok Leyland" }, { value: "MH-12-RT-2244", label: "MH-12-RT-2244 — Mahindra Blazo" }]} />
              <FormSelect name="driver" label="Driver *" placeholder="Select driver" searchable
                options={[{ value: "Rajesh Kumar", label: "Rajesh Kumar" }, { value: "Amit Singh", label: "Amit Singh" }, { value: "Suresh Reddy", label: "Suresh Reddy" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Cargo Information" description="Cargo details" icon={Package} delay={0.2}>
            <FormRow>
              <FormInput name="cargoType" label="Cargo Type *" />
              <FormInput name="cargoWeight" label="Cargo Weight" />
            </FormRow>
            <FormRow>
              <FormInput name="cargoValue" label="Cargo Value" />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Additional Notes" description="Any additional information" icon={FileText} delay={0.25}>
          <FormTextarea name="notes" label="Notes" rows={3} />
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Update Trip" loading={isSubmitting || submitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Update Trip?" message="This will update the trip details." confirmLabel="Update Trip" />
    </motion.div>
  );
}
