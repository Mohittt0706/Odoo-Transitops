import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormFileUpload, FormActions } from "../../components/forms";
import { FormLabel } from "../../components/forms";
import { useToast } from "../../components/common/Toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { profileSchema } from "../../lib/validations";
import { User, Mail, Phone, Building, Globe, MapPin, Camera, Save } from "lucide-react";

export default function RoadCaptainProfile() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const methods = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Vikram Singh",
      email: "vikram.singh@transitops.in",
      phone: "+91 98765 43212",
      department: "Transport",
      role: "Road Captain",
      timezone: "IST (UTC+5:30)",
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Profile updated successfully!", "success");
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Edit Profile" subtitle="Update your personal information and preferences" />
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FormSection title="Profile Photo" description="Upload your profile picture" icon={Camera} delay={0.05}>
            <div className="flex flex-col items-center py-4">
              <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mb-4 relative group cursor-pointer">
                <User className="w-14 h-14 text-primary" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <FormFileUpload name="avatar" label="Change Photo" accept="image/*" />
            </div>
          </FormSection>

          <div className="lg:col-span-2 space-y-6">
            <FormSection title="Personal Information" description="Your basic details" icon={User} delay={0.1}>
              <FormRow>
                <FormInput name="name" label="Full Name *" placeholder="Vikram Singh" icon={User} />
                <FormInput name="email" label="Email *" type="email" placeholder="vikram@transitops.in" icon={Mail} />
              </FormRow>
              <FormRow>
                <FormInput name="phone" label="Phone" placeholder="+91 98765 43212" icon={Phone} />
                <FormSelect name="department" label="Department" placeholder="Select department"
                  options={[{ value: "Transport", label: "Transport" }, { value: "Logistics", label: "Logistics" }, { value: "Warehouse", label: "Warehouse" }, { value: "Administration", label: "Administration" }, { value: "Maintenance", label: "Maintenance" }]} />
              </FormRow>
              <FormRow>
                <FormInput name="role" label="Role" placeholder="Road Captain" icon={Building} />
                <FormSelect name="timezone" label="Timezone" placeholder="Select timezone"
                  options={[{ value: "IST (UTC+5:30)", label: "IST (UTC+5:30)" }, { value: "GMT (UTC+0)", label: "GMT (UTC+0)" }, { value: "PST (UTC-8)", label: "PST (UTC-8)" }, { value: "EST (UTC-5)", label: "EST (UTC-5)" }]} />
              </FormRow>
            </FormSection>
          </div>
        </div>

        <FormActions onSubmit={onSubmit} submitLabel="Save Profile" loading={isSubmitting} success={saved} showCancel={false} showReset={false} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Update Profile?" message="Are you sure you want to save these changes?" confirmLabel="Save Changes" />
    </motion.div>
  );
}
