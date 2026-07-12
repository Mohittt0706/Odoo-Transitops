import { FormProvider, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

export default function Form({ methods, onSubmit, className = "", children, ...props }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={cn("space-y-8", className)} noValidate {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

export function useFormFormContext() {
  return useFormContext();
}
