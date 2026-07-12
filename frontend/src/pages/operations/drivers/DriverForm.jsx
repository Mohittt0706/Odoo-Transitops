import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormFileUpload, FormActions } from "../../../components/forms";
import { FormLabel } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { driverSchema } from "../../../lib/validations";
import { drivers as driverData } from "../../../data/driverData";
import { ArrowLeft, User, IdCard, MapPin, Phone, Upload } from "lucide-react";

export default function DriverForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = !!id;
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const existing = isEdit ? driverData.find((d) => d.id === id) : null;

  const methods = useForm({
    resolver: zodResolver(driverSchema),
    defaultValues: existing ? {
      firstName: existing.name?.split(" ")[0] || "",
      lastName: existing.name?.split(" ").slice(1).join(" ") || "",
      email: existing.email || "",
      phone: existing.phone || "",
      dateOfBirth: existing.dob || "",
      licenseNumber: existing.licenseNo || "",
      licenseType: existing.licenseType || "",
      licenseExpiry: existing.licenseExpiry || "",
      licenseIssued: existing.licenseIssued || "",
      address: existing.address || "",
      city: existing.city || "",
      state: existing.state || "",
      zipCode: existing.zipCode || "",
      emergencyContactName: existing.emergencyContact?.split(" - ")[0] || "",
      emergencyContactPhone: existing.emergencyContact?.split(" - ")[1] || "",
    } : {
      firstName: "", lastName: "", email: "", phone: "", dateOfBirth: "",
      licenseNumber: "", licenseType: "", licenseExpiry: "", licenseIssued: "",
      address: "", city: "", state: "", zipCode: "",
      emergencyContactName: "", emergencyContactPhone: "",
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast(isEdit ? "Driver updated successfully!" : "Driver registered successfully!", "success");
    setTimeout(() => navigate("/dashboard/operations/drivers"), 1200);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title={isEdit ? "Edit Driver" : "Register Driver"} subtitle={isEdit ? "Update driver information" : "Add a new driver to the fleet"}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Personal Information" description="Driver basic details" icon={User} delay={0.05}>
            <FormRow>
              <FormInput name="firstName" label="First Name *" placeholder="Rajesh" />
              <FormInput name="lastName" label="Last Name *" placeholder="Kumar" />
            </FormRow>
            <FormRow>
              <FormInput name="email" label="Email *" type="email" placeholder="rajesh.kumar@email.com" />
              <FormInput name="phone" label="Phone *" placeholder="+91 98765 43210" />
            </FormRow>
            <FormRow>
              <FormDatePicker name="dateOfBirth" label="Date of Birth *" />
            </FormRow>
          </FormSection>

          <FormSection title="License Information" description="Driving license details" icon={IdCard} delay={0.1}>
            <FormRow>
              <FormInput name="licenseNumber" label="License Number *" placeholder="DL-2024-001234" />
              <FormSelect name="licenseType" label="License Type *" placeholder="Select type"
                options={[{ value: "Heavy Vehicle", label: "Heavy Vehicle" }, { value: "Medium Vehicle", label: "Medium Vehicle" }, { value: "Light Vehicle", label: "Light Vehicle" }]} />
            </FormRow>
            <FormRow>
              <FormDatePicker name="licenseIssued" label="License Issued *" />
              <FormDatePicker name="licenseExpiry" label="License Expiry *" />
            </FormRow>
          </FormSection>

          <FormSection title="Address" description="Residential address" icon={MapPin} delay={0.15}>
            <FormRow>
              <FormInput name="address" label="Address *" placeholder="123, Main Street" />
              <FormInput name="city" label="City *" placeholder="Bangalore" />
            </FormRow>
            <FormRow>
              <FormInput name="state" label="State *" placeholder="Karnataka" />
              <FormInput name="zipCode" label="ZIP Code *" placeholder="560001" />
            </FormRow>
          </FormSection>

          <FormSection title="Emergency Contact" description="Emergency contact details" icon={Phone} delay={0.2}>
            <FormRow>
              <FormInput name="emergencyContactName" label="Contact Name" placeholder="Priya Kumar" />
              <FormInput name="emergencyContactPhone" label="Contact Phone" placeholder="+91 98765 43210" />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Document Uploads" description="Upload driver documents" icon={Upload} delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <FormLabel required>License Document</FormLabel>
              <FormFileUpload name="licenseDoc" label="Upload License" accept="image/*,.pdf" />
            </div>
            <div>
              <FormLabel required>Profile Photo</FormLabel>
              <FormFileUpload name="profilePhoto" label="Upload Photo" accept="image/*" />
            </div>
          </div>
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)}
          submitLabel={isEdit ? "Update Driver" : "Register Driver"} loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title={isEdit ? "Update Driver?" : "Register Driver?"}
        message={`Are you sure you want to ${isEdit ? "update" : "register"} this driver?`}
        confirmLabel={isEdit ? "Update" : "Register"} />
    </motion.div>
  );
}
