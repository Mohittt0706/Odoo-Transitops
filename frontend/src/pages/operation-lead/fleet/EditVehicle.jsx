import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormRadioGroup, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { vehicleSchema } from "../../../lib/validations";
import { vehicles, vehicleTypes, manufacturers, fuelTypes } from "../../../data/vehicleData";
import { ArrowLeft, Truck, Settings, IndianRupee, Activity, AlertCircle } from "lucide-react";

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

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const vehicle = vehicles.find((v) => v.id === id);

  const methods = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: vehicle ? {
      plateNumber: vehicle.registration || vehicle.licensePlate || "",
      vehicleName: vehicle.name || "",
      brand: vehicle.manufacturer || "",
      model: vehicle.model || "",
      year: String(vehicle.year || ""),
      vin: vehicle.vin || "",
      engineNumber: vehicle.engineNo || "",
      fuelType: vehicle.fuelType || "",
      transmission: vehicle.transmission || "",
      color: vehicle.color || "",
      seatingCapacity: String(vehicle.seatingCapacity || ""),
      registrationNumber: vehicle.registration || "",
      registrationDate: vehicle.registrationDate || "",
      registrationExpiry: vehicle.registrationExpiry || "",
      insuranceNumber: vehicle.insuranceNumber || "",
      insuranceExpiry: vehicle.insuranceExpiry || "",
      insuranceProvider: vehicle.insuranceProvider || "",
      purchaseDate: vehicle.purchaseDate || "",
      purchasePrice: vehicle.acquisitionCost || "",
      depreciationMethod: vehicle.depreciationMethod || "",
      vehicleStatus: vehicle.status === "Active" ? "Active" : vehicle.status === "On Trip" ? "On Trip" : vehicle.status === "In Maintenance" ? "In Maintenance" : "Retired",
      availability: "Immediate",
    } : {},
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Vehicle updated successfully", "success");
    setTimeout(() => navigate("/dashboard/operations/fleet"), 1200);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  if (!vehicle) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
        <AlertCircle className="w-16 h-16 text-neutral-textMuted mx-auto mb-4" strokeWidth={1} />
        <h2 className="text-lg font-bold text-neutral-textMain">Vehicle not found</h2>
        <p className="text-sm text-neutral-textMuted mt-1">The vehicle with ID "{id}" does not exist.</p>
        <button onClick={() => navigate(-1)} className="mt-4 btn btn-primary text-sm">Go Back</button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title={`Edit Vehicle — ${vehicle.name}`} subtitle={vehicle.registration}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Basic Information" description="Vehicle identification details" icon={Truck} delay={0.05}>
            <FormRow>
              <FormInput name="plateNumber" label="Plate Number *" icon={Truck} />
              <FormInput name="vehicleName" label="Vehicle Name *" />
            </FormRow>
            <FormRow>
              <FormSelect name="brand" label="Brand *" placeholder="Select brand" options={manufacturers.map((m) => ({ value: m, label: m }))} searchable />
              <FormInput name="model" label="Model *" />
            </FormRow>
            <FormRow>
              <FormSelect name="year" label="Year *" placeholder="Select year" options={Array.from({ length: 27 }, (_, i) => ({ value: String(2026 - i), label: String(2026 - i) }))} />
              <FormInput name="vin" label="VIN Number *" />
            </FormRow>
            <FormRow>
              <FormInput name="engineNumber" label="Engine Number *" />
              <FormInput name="color" label="Color" />
            </FormRow>
          </FormSection>

          <FormSection title="Specifications" description="Technical specifications" icon={Settings} delay={0.1}>
            <FormRow>
              <FormSelect name="fuelType" label="Fuel Type *" placeholder="Select fuel type" options={fuelTypes.map((f) => ({ value: f, label: f }))} />
              <FormSelect name="transmission" label="Transmission *" placeholder="Select transmission" options={transmissionOptions} />
            </FormRow>
            <FormRow>
              <FormInput name="seatingCapacity" label="Seating Capacity" type="number" />
            </FormRow>
          </FormSection>

          <FormSection title="Registration & Insurance" description="Registration and insurance details" icon={Activity} delay={0.15}>
            <FormRow>
              <FormInput name="registrationNumber" label="Registration Number *" />
              <FormDatePicker name="registrationDate" label="Registration Date *" />
            </FormRow>
            <FormRow>
              <FormDatePicker name="registrationExpiry" label="Registration Expiry *" />
              <FormInput name="insuranceNumber" label="Insurance Number *" />
            </FormRow>
            <FormRow>
              <FormDatePicker name="insuranceExpiry" label="Insurance Expiry *" />
              <FormInput name="insuranceProvider" label="Insurance Provider *" />
            </FormRow>
          </FormSection>

          <FormSection title="Financial Information" description="Purchase and financial details" icon={IndianRupee} delay={0.2}>
            <FormRow>
              <FormDatePicker name="purchaseDate" label="Purchase Date" />
              <FormInput name="purchasePrice" label="Purchase Price" />
            </FormRow>
            <FormRow>
              <FormSelect name="depreciationMethod" label="Depreciation Method" placeholder="Select method"
                options={[{ value: "Straight Line", label: "Straight Line" }, { value: "Declining Balance", label: "Declining Balance" }, { value: "Sum of Years", label: "Sum of Years" }]} />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Operational Status" description="Set vehicle availability and status" icon={Activity} delay={0.25}>
          <FormRadioGroup name="vehicleStatus" label="Vehicle Status" options={statusOptions} />
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} onReset={() => reset(methods.getValues())}
          submitLabel="Update Vehicle" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Update Vehicle?" message="This will update the vehicle details." confirmLabel="Update Vehicle" />
    </motion.div>
  );
}
