import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormTextarea, FormFileUpload, FormActions } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { expenseSchema } from "../../../lib/validations";
import { ArrowLeft, DollarSign, CreditCard, Building, FileText, Receipt } from "lucide-react";
import { expenseService } from "../../../services/expense.service";

const expenseCategories = [
  { value: "Fuel", label: "Fuel" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Toll", label: "Toll" },
  { value: "Insurance", label: "Insurance" },
  { value: "Parking", label: "Parking" },
  { value: "Repair", label: "Repair" },
  { value: "Taxes", label: "Taxes" },
  { value: "Permits", label: "Permits" },
  { value: "Registration", label: "Registration" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "Other", label: "Other" },
];

const paymentMethods = [
  { value: "Cash", label: "Cash" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "Debit Card", label: "Debit Card" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "UPI", label: "UPI" },
  { value: "Fuel Card", label: "Fuel Card" },
  { value: "Cheque", label: "Cheque" },
];

const vehicleOptions = [
  { value: "KL-07-AU-4521", label: "Tata Prima 4040.S (KL-07-AU-4521)" },
  { value: "KA-01-MN-3312", label: "Ashok Leyland 4220 (KA-01-MN-3312)" },
  { value: "MH-12-RT-2244", label: "Mahindra Blazo X25 (MH-12-RT-2244)" },
  { value: "DL-03-KP-5567", label: "BharatBenz 2528 (DL-03-KP-5567)" },
  { value: "TN-09-BC-7890", label: "Eicher Pro 6036 (TN-09-BC-7890)" },
  { value: "RJ-14-AB-9988", label: "Volvo FH16 (RJ-14-AB-9988)" },
  { value: "UP-32-CD-6677", label: "Scania R450 (UP-32-CD-6677)" },
];

export default function ExpenseEntry() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const methods = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      vehicle: "", category: "", amount: "", date: "",
      paymentMethod: "", vendor: "", invoiceNumber: "", description: "",
    },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = async () => {
    setShowConfirm(false);
    setSaved(true);
    try {
      const values = methods.getValues();
      await expenseService.create({
        vehicleId: values.vehicle,
        type: values.category,
        amount: parseFloat(values.amount),
        description: values.description,
        date: values.date,
      });
      toast("Expense recorded successfully!", "success");
      setTimeout(() => navigate("/dashboard/operations/expenses"), 1200);
    } catch (err) {
      toast(err?.response?.data?.message || "Failed to record expense", "error");
      setSaved(false);
    }
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Record Expense" subtitle="Add a new expense entry"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Expense Details" description="Basic expense information" icon={DollarSign} delay={0.05}>
            <FormRow>
              <FormSelect name="vehicle" label="Vehicle *" placeholder="Select vehicle" options={vehicleOptions} searchable />
              <FormSelect name="category" label="Category *" placeholder="Select category" options={expenseCategories} />
            </FormRow>
            <FormRow>
              <FormInput name="amount" label="Amount *" placeholder="₹5,000" type="number" />
              <FormDatePicker name="date" label="Date *" />
            </FormRow>
          </FormSection>

          <FormSection title="Payment Information" description="Payment method and vendor" icon={CreditCard} delay={0.1}>
            <FormRow>
              <FormSelect name="paymentMethod" label="Payment Method *" placeholder="Select method" options={paymentMethods} />
              <FormInput name="vendor" label="Vendor *" placeholder="Vendor name" />
            </FormRow>
            <FormRow>
              <FormInput name="invoiceNumber" label="Invoice Number" placeholder="INV-2026-0042" />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Description & Notes" description="Expense description" icon={FileText} delay={0.15}>
          <FormTextarea name="description" label="Description" rows={3} placeholder="Describe the expense..." />
        </FormSection>

        <FormSection title="Receipt Upload" description="Upload expense receipt" icon={Receipt} delay={0.2}>
          <FormFileUpload name="receipt" label="Upload Receipt" accept="image/*,.pdf" />
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Record Expense" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Record Expense?" message="This will add a new expense entry to the system." confirmLabel="Record Expense" />
    </motion.div>
  );
}
