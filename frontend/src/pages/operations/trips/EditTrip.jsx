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
import { ArrowLeft, Route, Package, AlertTriangle, FileText, AlertCircle } from "lucide-react";

const allTrips = [
  { id: "TR-0001", title: "Delhi to Mumbai Freight", vehicle: "KL-07-AU-4521", driver: "Rajesh Kumar", origin: "Mumbai, Maharashtra", destination: "Delhi, NCR", scheduledStart: "2026-07-01", scheduledEnd: "2026-07-05", cargoType: "Electronics", cargoWeight: "2.5 tons", cargoValue: "₹5,00,000", tripType: "Freight", priority: "High", notes: "Handle with care" },
  { id: "TR-0002", title: "Bangalore to Chennai Express", vehicle: "KA-01-MN-3312", driver: "Amit Singh", origin: "Bangalore, Karnataka", destination: "Chennai, Tamil Nadu", scheduledStart: "2026-07-03", scheduledEnd: "2026-07-04", cargoType: "Garments", cargoWeight: "1.8 tons", cargoValue: "₹3,20,000", tripType: "Express", priority: "Normal", notes: "" },
];

export default function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const trip = allTrips.find((t) => t.id === id);

  const methods = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: trip ? {
      title: trip.title, vehicle: trip.vehicle, driver: trip.driver,
      origin: trip.origin, destination: trip.destination,
      scheduledStart: trip.scheduledStart, scheduledEnd: trip.scheduledEnd,
      cargoType: trip.cargoType, cargoWeight: trip.cargoWeight || "",
      cargoValue: trip.cargoValue || "", tripType: trip.tripType || "Freight",
      priority: trip.priority || "Normal", notes: trip.notes || "",
    } : {},
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Trip updated successfully!", "success");
    setTimeout(() => navigate("/dashboard/operations/trips"), 1200);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  if (!trip) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-neutral-textMuted mx-auto mb-4" strokeWidth={1} />
        <h2 className="text-lg font-bold text-neutral-textMain">Trip not found</h2>
        <p className="text-sm text-neutral-textMuted mt-1">The trip with ID "{id}" does not exist.</p>
        <button onClick={() => navigate(-1)} className="mt-4 btn btn-primary text-sm">Go Back</button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Edit Trip" subtitle={`${trip.title} — ${id}`}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
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

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Update Trip" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Update Trip?" message="This will update the trip details." confirmLabel="Update Trip" />
    </motion.div>
  );
}
