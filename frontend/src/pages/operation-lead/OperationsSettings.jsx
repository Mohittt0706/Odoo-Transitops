import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormToggle, FormFileUpload, FormActions } from "../../components/forms";
import { FormLabel } from "../../components/forms";
import { useToast } from "../../components/common/Toast";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { companySchema } from "../../lib/validations";
import { Settings, Building, Bell, Monitor, Shield, Upload, Save } from "lucide-react";

export default function OperationsSettings() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [notifyPush, setNotifyPush] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  const companyMethods = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "TransitOps India Pvt Ltd",
      address: "123, Fleet Avenue, Industrial Area",
      phone: "+91 22 4567 8900",
      email: "info@transitops.in",
      website: "https://transitops.in",
      taxId: "GST-27AABCT1234A1Z5",
      currency: "INR (₹)",
      timezone: "IST (UTC+5:30)",
      dateFormat: "DD/MM/YYYY",
    },
  });

  const { handleSubmit: handleCompanySubmit, formState: { isSubmitting: isCompanySubmitting } } = companyMethods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Settings saved successfully!", "success");
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Settings" subtitle="Configure your TransitOps preferences"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5">Back</button>}
      />

      <Form methods={companyMethods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Company Details" description="Business information" icon={Building} delay={0.05}>
            <FormRow>
              <FormInput name="companyName" label="Company Name *" placeholder="TransitOps India Pvt Ltd" />
              <FormInput name="address" label="Address *" placeholder="123, Fleet Avenue" />
            </FormRow>
            <FormRow>
              <FormInput name="phone" label="Phone *" placeholder="+91 22 4567 8900" />
              <FormInput name="email" label="Email *" type="email" placeholder="info@transitops.in" />
            </FormRow>
            <FormRow>
              <FormInput name="website" label="Website" placeholder="https://transitops.in" />
              <FormInput name="taxId" label="Tax ID" placeholder="GST-27AABCT1234A1Z5" />
            </FormRow>
          </FormSection>

          <FormSection title="Regional Settings" description="Locale and format preferences" icon={Settings} delay={0.1}>
            <FormRow>
              <FormSelect name="currency" label="Currency *" placeholder="Select currency"
                options={[{ value: "INR (₹)", label: "INR (₹)" }, { value: "USD ($)", label: "USD ($)" }, { value: "EUR (€)", label: "EUR (€)" }, { value: "GBP (£)", label: "GBP (£)" }]} />
              <FormSelect name="timezone" label="Timezone *" placeholder="Select timezone"
                options={[{ value: "IST (UTC+5:30)", label: "IST (UTC+5:30)" }, { value: "GMT (UTC+0)", label: "GMT (UTC+0)" }, { value: "PST (UTC-8)", label: "PST (UTC-8)" }, { value: "EST (UTC-5)", label: "EST (UTC-5)" }]} />
            </FormRow>
            <FormRow>
              <FormSelect name="dateFormat" label="Date Format *" placeholder="Select format"
                options={[{ value: "DD/MM/YYYY", label: "DD/MM/YYYY" }, { value: "MM/DD/YYYY", label: "MM/DD/YYYY" }, { value: "YYYY-MM-DD", label: "YYYY-MM-DD" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Notification Preferences" description="Configure notification channels" icon={Bell} delay={0.15}>
            <div className="divide-y divide-neutral-border/50">
              <FormToggle name="notifyEmail" label="Email Notifications" description="Receive alerts via email" />
              <FormToggle name="notifySms" label="SMS Notifications" description="Get critical alerts via SMS" />
              <FormToggle name="notifyPush" label="Push Notifications" description="Browser push notifications" />
            </div>
          </FormSection>

          <FormSection title="Security Settings" description="Account security preferences" icon={Shield} delay={0.2}>
            <div className="divide-y divide-neutral-border/50">
              <FormToggle name="twoFactor" label="Two-Factor Authentication" description="Add an extra layer of security" />
              <FormToggle name="sessionTimeout" label="Session Timeout" description="Auto-logout after inactivity" />
            </div>
          </FormSection>
        </div>

        <FormSection title="Company Logo" description="Upload your company logo" icon={Upload} delay={0.25}>
          <div className="max-w-sm">
            <FormFileUpload name="logo" label="Upload Logo" accept="image/*" />
          </div>
        </FormSection>

        <FormActions onSubmit={onSubmit} submitLabel="Save Settings" loading={isCompanySubmitting} success={saved} showCancel={false} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Save Settings?" message="This will update your company settings and preferences." confirmLabel="Save Settings" />
    </motion.div>
  );
}
