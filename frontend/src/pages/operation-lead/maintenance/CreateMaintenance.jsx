import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormTextarea, FormFileUpload, FormActions } from "../../../components/forms";
import { FormLabel } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { maintenanceSchema } from "../../../lib/validations";
import { ArrowLeft, Wrench, AlertTriangle, Upload } from "lucide-react";

const serviceTypes = [
  { value: "Preventive", label: "Preventive Maintenance" },
  { value: "Repair", label: "Repair" },
  { value: "Major Repair", label: "Major Repair" },
  { value: "Service", label: "Service" },
  { value: "Inspection", label: "Inspection" },
];

export default function CreateMaintenance() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const methods = useForm({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: {
      vehicle: "", serviceType: "", description: "", scheduledDate: "",
      priority: "", assignedTo: "", estimatedCost: "", location: "",
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Maintenance request created successfully!", "success");
    setTimeout(() => navigate("/dashboard/operations/maintenance"), 1200);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Schedule Maintenance" subtitle="Create a new maintenance request"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Maintenance Details" description="Service type and description" icon={Wrench} delay={0.05}>
            <FormRow>
              <FormSelect name="vehicle" label="Vehicle *" placeholder="Select vehicle" searchable
                options={[{ value: "KL-07-AU-4521", label: "KL-07-AU-4521 — Tata Prima" }, { value: "KA-01-MN-3312", label: "KA-01-MN-3312 — Ashok Leyland" }, { value: "MH-12-RT-2244", label: "MH-12-RT-2244 — Mahindra Blazo" }, { value: "DL-03-KP-5567", label: "DL-03-KP-5567 — BharatBenz" }, { value: "TN-09-BC-7890", label: "TN-09-BC-7890 — Eicher Pro" }]} />
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
                options={[{ value: "Rajesh Mechanic", label: "Rajesh Mechanic" }, { value: "Suresh Auto", label: "Suresh Auto" }, { value: "Anil Brakes", label: "Anil Brakes" }, { value: "CoolTech Kumar", label: "CoolTech Kumar" }]} />
              <FormSelect name="location" label="Location" placeholder="Select garage"
                options={[{ value: "Ravi Mechanicals", label: "Ravi Mechanicals" }, { value: "Transit Auto Care", label: "Transit Auto Care" }, { value: "FleetFix Pro", label: "FleetFix Pro" }, { value: "CoolTech Services", label: "CoolTech Services" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Cost Estimate" description="Estimated cost" icon={AlertTriangle} delay={0.2}>
            <FormRow>
              <FormInput name="estimatedCost" label="Estimated Cost" placeholder="₹15,000" />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Document Uploads" description="Upload service documents and images" icon={Upload} delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <FormLabel>Service Images</FormLabel>
              <FormFileUpload name="serviceImages" label="Upload Images" accept="image/*" multiple />
            </div>
            <div>
              <FormLabel>Service Documents</FormLabel>
              <FormFileUpload name="serviceDocs" label="Upload Documents" accept="image/*,.pdf" multiple />
            </div>
          </div>
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Submit Request" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Submit Maintenance Request?" message="This will schedule a new maintenance request." confirmLabel="Submit Request" />
    </motion.div>
  );
}
