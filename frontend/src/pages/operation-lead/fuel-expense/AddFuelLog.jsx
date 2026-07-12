import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Form, FormSection, FormRow, FormInput, FormSelect, FormDatePicker, FormTextarea, FormFileUpload, FormActions } from "../../../components/forms";
import { FormLabel } from "../../../components/forms";
import { useToast } from "../../../components/common/Toast";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { fuelLogSchema } from "../../../lib/validations";
import { ArrowLeft, Fuel, Droplets, Gauge, CreditCard, Receipt } from "lucide-react";

export default function AddFuelLog() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const methods = useForm({
    resolver: zodResolver(fuelLogSchema),
    defaultValues: {
      vehicle: "", driver: "", fuelStation: "", fuelType: "Diesel",
      quantity: "", pricePerUnit: "", totalAmount: "",
      odometerStart: "", odometerEnd: "",
      paymentMethod: "Fuel Card", date: "", remarks: "",
    },
  });

  const { handleSubmit, control, setValue, formState: { isSubmitting } } = methods;

  const quantity = useWatch({ control, name: "quantity" });
  const price = useWatch({ control, name: "pricePerUnit" });
  const odoStart = useWatch({ control, name: "odometerStart" });
  const odoEnd = useWatch({ control, name: "odometerEnd" });

  useEffect(() => {
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(price) || 0;
    if (q && p) setValue("totalAmount", `₹${(q * p).toLocaleString()}`);
    else setValue("totalAmount", "");
  }, [quantity, price, setValue]);

  const vehicleOptions = [
    { value: "KL-07-AU-4521", label: "Tata Prima 4040.S (KL-07-AU-4521)" },
    { value: "KA-01-MN-3312", label: "Ashok Leyland 4220 (KA-01-MN-3312)" },
    { value: "MH-12-RT-2244", label: "Mahindra Blazo X25 (MH-12-RT-2244)" },
    { value: "DL-03-KP-5567", label: "BharatBenz 2528 (DL-03-KP-5567)" },
    { value: "RJ-14-AB-9988", label: "Volvo FH16 (RJ-14-AB-9988)" },
  ];

  const onSubmit = () => setShowConfirm(true);

  const confirmSubmit = () => {
    setShowConfirm(false);
    setSaved(true);
    toast("Fuel log created successfully!", "success");
    setTimeout(() => navigate("/dashboard/operations/fuel"), 1200);
  };

  useEffect(() => { const first = document.querySelector("input"); first?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Add Fuel Log" subtitle="Record a new fuel transaction"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormSection title="Transaction Details" description="Fuel purchase information" icon={Fuel} delay={0.05}>
            <FormRow>
              <FormSelect name="vehicle" label="Vehicle *" placeholder="Select vehicle" options={vehicleOptions} searchable />
              <FormInput name="driver" label="Driver *" placeholder="Rajesh Kumar" />
            </FormRow>
            <FormRow>
              <FormInput name="fuelStation" label="Fuel Station *" placeholder="BPCL, IOCL, etc." />
              <FormSelect name="fuelType" label="Fuel Type *" placeholder="Select type"
                options={[{ value: "Diesel", label: "Diesel" }, { value: "Petrol", label: "Petrol" }, { value: "CNG", label: "CNG" }, { value: "EV", label: "EV" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Fuel Measurements" description="Quantity and pricing" icon={Droplets} delay={0.1}>
            <FormRow>
              <FormInput name="quantity" label="Quantity (L) *" placeholder="100" type="number" />
              <FormInput name="pricePerUnit" label="Price per Litre *" placeholder="90" type="number" />
            </FormRow>
            <FormRow>
              <FormInput name="totalAmount" label="Total Amount" placeholder="Auto-calculated" />
              <FormSelect name="paymentMethod" label="Payment Method *" placeholder="Select method"
                options={[{ value: "Fuel Card", label: "Fuel Card" }, { value: "Cash", label: "Cash" }, { value: "Credit", label: "Credit" }, { value: "UPI", label: "UPI" }]} />
            </FormRow>
          </FormSection>

          <FormSection title="Odometer Readings" description="Vehicle mileage tracking" icon={Gauge} delay={0.15}>
            <FormRow>
              <FormInput name="odometerStart" label="Previous Odometer (km)" placeholder="123900" type="number" />
              <FormInput name="odometerEnd" label="Current Odometer (km)" placeholder="124500" type="number" />
            </FormRow>
            <p className="text-[11px] text-neutral-textMuted">
              {odoStart && odoEnd && parseFloat(odoEnd) > parseFloat(odoStart)
                ? `Distance travelled: ${parseFloat(odoEnd) - parseFloat(odoStart)} km`
                : "Enter both readings to calculate distance"}
              {quantity && odoStart && odoEnd && parseFloat(odoEnd) > parseFloat(odoStart)
                && ` · Fuel economy: ${((parseFloat(odoEnd) - parseFloat(odoStart)) / parseFloat(quantity)).toFixed(1)} km/L`}
            </p>
          </FormSection>

          <FormSection title="Date & Notes" description="Transaction date and remarks" icon={CreditCard} delay={0.2}>
            <FormRow>
              <FormDatePicker name="date" label="Fuel Date *" />
            </FormRow>
            <FormRow cols={1}>
              <FormTextarea name="remarks" label="Remarks" rows={2} />
            </FormRow>
          </FormSection>
        </div>

        <FormSection title="Receipt Upload" description="Upload fuel receipt" icon={Receipt} delay={0.25}>
          <FormFileUpload name="receipt" label="Upload Receipt" accept="image/*,.pdf" />
        </FormSection>

        <FormActions onSubmit={onSubmit} onCancel={() => navigate(-1)} submitLabel="Submit Fuel Log" loading={isSubmitting} success={saved} />
      </Form>

      <ConfirmationModal open={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={confirmSubmit}
        title="Submit Fuel Log?" message="This will record a new fuel transaction." confirmLabel="Submit" />
    </motion.div>
  );
}
