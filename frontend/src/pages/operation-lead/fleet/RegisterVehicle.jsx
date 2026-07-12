import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormRadioGroup, FormFileUpload, FormActions } from "../../../components/forms";
import { FormLabel } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { vehicleSchema } from "../../../lib/validations";
import { vehicleTypes, manufacturers, fuelTypes } from "../../../data/vehicleData";
import { ArrowLeft, Truck, Settings, IndianRupee, Activity, Upload } from "lucide-react";

const transmissionOptions = [
  { value: "Manual", label: "Manual" },
  { value: "Automatic", label: "Automatic" },
];

const statusOptions = [
  { value: "Active", label: "Available" },
  { value: "On Trip", label: "On Trip" },
  { value: "In Maintenance", label: "In Maintenance" },
  { value: "Retired", label: "Retired" },
];

const availabilityOptions = [
  { value: "Immediate", label: "Immediate" },
  { value: "Scheduled", label: "Scheduled" },
  { value: "Unavailable", label: "Unavailable" },
];

const defaultValues = {
  plateNumber: "", vehicleName: "", brand: "", model: "", year: "", vin: "", engineNumber: "",
  fuelType: "", transmission: "", color: "", seatingCapacity: "",
  registrationNumber: "", registrationDate: "", registrationExpiry: "",
  insuranceNumber: "", insuranceExpiry: "", insuranceProvider: "",
  purchaseDate: "", purchasePrice: "", depreciationMethod: "",
  vehicleStatus: "Active", availability: "Immediate",
};

export default function RegisterVehicle() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const methods = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues,
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = methods;

  const onSubmit = () => {
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Vehicle registered successfully", "success");
    setTimeout(() => navigate("/dashboard/operations/fleet"), 1200);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Register New Vehicle" subtitle="Add a new vehicle to your fleet"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Basic Information" description="Vehicle identification details" icon={Truck} delay={0.05}>
            <FormRow>
              <FormInput name="plateNumber" label="Plate Number *" placeholder="KL-07-AU-4521" icon={Truck} />
              <FormInput name="vehicleName" label="Vehicle Name *" placeholder="Tata Prima 4040.S" />
            </FormRow>
            <FormRow>
              <FormSelect name="brand" label="Brand *" placeholder="Select brand"
                options={manufacturers.map((m) => ({ value: m, label: m }))} searchable />
              <FormInput name="model" label="Model *" placeholder="Prima 4040.S" />
            </FormRow>
            <FormRow>
              <FormSelect name="year" label="Year *" placeholder="Select year"
                options={Array.from({ length: 27 }, (_, i) => ({ value: String(2026 - i), label: String(2026 - i) }))} />
              <FormInput name="vin" label="VIN Number *" placeholder="MAT725104N123456" />
            </FormRow>
            <FormRow>
              <FormInput name="engineNumber" label="Engine Number *" placeholder="TATA-DE12-4040" />
              <FormInput name="color" label="Color" placeholder="White" />
            </FormRow>
          </FormSection>

          <FormSection title="Specifications" description="Technical specifications" icon={Settings} delay={0.1}>
            <FormRow>
              <FormSelect name="fuelType" label="Fuel Type *" placeholder="Select fuel type"
                options={fuelTypes.map((f) => ({ value: f, label: f }))} />
              <FormSelect name="transmission" label="Transmission *" placeholder="Select transmission"
                options={transmissionOptions} />
            </FormRow>
            <FormRow>
              <FormInput name="seatingCapacity" label="Seating Capacity" placeholder="2" type="number" />
              <FormSelect name="vehicleStatus" label="Vehicle Status *" placeholder="Select status"
                options={[{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }, { value: "Pending", label: "Pending" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Registration & Insurance" description="Registration and insurance details" icon={Activity} delay={0.15}>
            <FormRow>
              <FormInput name="registrationNumber" label="Registration Number *" placeholder="KL-07-AU-4521" />
              <FormDatePicker name="registrationDate" label="Registration Date *" />
            </FormRow>
            <FormRow>
              <FormDatePicker name="registrationExpiry" label="Registration Expiry *" />
              <FormInput name="insuranceNumber" label="Insurance Number *" placeholder="POL-2024-001234" />
            </FormRow>
            <FormRow>
              <FormDatePicker name="insuranceExpiry" label="Insurance Expiry *" />
              <FormInput name="insuranceProvider" label="Insurance Provider *" placeholder="ICICI Lombard" />
            </FormRow>
          </FormSection>

          <FormSection title="Financial Information" description="Purchase and financial details" icon={IndianRupee} delay={0.2}>
            <FormRow>
              <FormDatePicker name="purchaseDate" label="Purchase Date" />
              <FormInput name="purchasePrice" label="Purchase Price" placeholder="₹45,00,000" />
            </FormRow>
            <FormRow>
              <FormSelect name="depreciationMethod" label="Depreciation Method" placeholder="Select method"
                options={[{ value: "Straight Line", label: "Straight Line" }, { value: "Declining Balance", label: "Declining Balance" }, { value: "Sum of Years", label: "Sum of Years" }]} />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Operational Status" description="Set vehicle availability and status" icon={Activity} delay={0.25}>
          <div className="space-y-6">
            <FormRadioGroup name="vehicleStatus" label="Vehicle Status" options={statusOptions} />
          </div>
        </FormSection>

        <FormSection title="Document Uploads" description="Upload vehicle documents" icon={Upload} delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <FormLabel>Vehicle Image</FormLabel>
              <FormFileUpload name="vehicleImage" label="Upload Image" accept="image/*" />
            </div>
            <div>
              <FormLabel>Registration Certificate</FormLabel>
              <FormFileUpload name="registrationCert" label="Upload Document" accept="image/*,.pdf" />
            </div>
            <div>
              <FormLabel>Insurance Certificate</FormLabel>
              <FormFileUpload name="insuranceCert" label="Upload Document" accept="image/*,.pdf" />
            </div>
          </div>
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} onReset={() => reset(defaultValues)}
          submitLabel="Save Vehicle" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Register Vehicle?" message="This will add a new vehicle to your fleet. You can edit details later." confirmLabel="Register Vehicle" />
    </motion.div>
  );
}
