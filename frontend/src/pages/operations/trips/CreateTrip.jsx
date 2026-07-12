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
import { ArrowLeft, Route, Package, AlertTriangle, FileText } from "lucide-react";

export default function CreateTrip() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const methods = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: "", vehicle: "", driver: "", origin: "", destination: "",
      scheduledStart: "", scheduledEnd: "", cargoType: "", cargoWeight: "",
      cargoValue: "", tripType: "", priority: "", notes: "",
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Trip created successfully!", "success");
    setTimeout(() => navigate("/dashboard/operations/trips"), 1200);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Create Trip" subtitle="Schedule a new delivery trip"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Trip Details" description="Basic trip information" icon={Route} delay={0.05}>
            <FormRow>
              <FormInput name="title" label="Trip Title *" placeholder="Delhi to Mumbai Freight" />
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
              <FormInput name="origin" label="Origin *" placeholder="Mumbai, Maharashtra" />
              <FormInput name="destination" label="Destination *" placeholder="Delhi, NCR" />
            </FormRow>
            <FormRow>
              <FormDatePicker name="scheduledStart" label="Scheduled Start *" />
              <FormDatePicker name="scheduledEnd" label="Scheduled End *" />
            </FormRow>
          </FormSection>

          <FormSection title="Assignment" description="Vehicle and driver assignment" icon={AlertTriangle} delay={0.15}>
            <FormRow>
              <FormSelect name="vehicle" label="Vehicle *" placeholder="Select vehicle"
                options={[{ value: "KL-07-AU-4521", label: "KL-07-AU-4521 — Tata Prima" }, { value: "KA-01-MN-3312", label: "KA-01-MN-3312 — Ashok Leyland" }, { value: "MH-12-RT-2244", label: "MH-12-RT-2244 — Mahindra Blazo" }, { value: "DL-03-KP-5567", label: "DL-03-KP-5567 — BharatBenz" }, { value: "UP-32-CD-6677", label: "UP-32-CD-6677 — Scania R450" }]}
                searchable />
              <FormSelect name="driver" label="Driver *" placeholder="Select driver"
                options={[{ value: "Rajesh Kumar", label: "Rajesh Kumar" }, { value: "Amit Singh", label: "Amit Singh" }, { value: "Suresh Reddy", label: "Suresh Reddy" }, { value: "Vikram Patel", label: "Vikram Patel" }, { value: "Manish Verma", label: "Manish Verma" }]}
                searchable />
            </FormRow>
          </FormSection>

          <FormSection title="Cargo Information" description="Cargo details" icon={Package} delay={0.2}>
            <FormRow>
              <FormInput name="cargoType" label="Cargo Type *" placeholder="Electronics, Garments, etc." />
              <FormInput name="cargoWeight" label="Cargo Weight" placeholder="2.5 tons" />
            </FormRow>
            <FormRow>
              <FormInput name="cargoValue" label="Cargo Value" placeholder="₹5,00,000" />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Additional Notes" description="Any additional information" icon={FileText} delay={0.25}>
          <FormTextarea name="notes" label="Notes" rows={3} />
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Create Trip" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Create Trip?" message="This will schedule a new trip. You can modify it later." confirmLabel="Create Trip" />
    </motion.div>
  );
}
