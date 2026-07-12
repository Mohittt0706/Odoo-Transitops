import { z } from "zod";

export const vehicleSchema = z.object({
  plateNumber: z.string().min(1, "Plate number is required").max(20, "Plate number too long"),
  vehicleName: z.string().min(1, "Vehicle name is required").max(100),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  vin: z.string().min(1, "VIN is required").max(17, "VIN must be 17 characters"),
  engineNumber: z.string().min(1, "Engine number is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  color: z.string().optional(),
  seatingCapacity: z.string().optional(),

  registrationNumber: z.string().min(1, "Registration number is required"),
  registrationDate: z.string().min(1, "Registration date is required"),
  registrationExpiry: z.string().min(1, "Registration expiry is required"),

  insuranceNumber: z.string().min(1, "Insurance number is required"),
  insuranceExpiry: z.string().min(1, "Insurance expiry is required"),
  insuranceProvider: z.string().min(1, "Insurance provider is required"),

  purchaseDate: z.string().optional(),
  purchasePrice: z.string().optional(),
  depreciationMethod: z.string().optional(),

  vehicleStatus: z.string().min(1, "Status is required"),
  availability: z.string().min(1, "Availability is required"),
});

export const vehicleEditSchema = vehicleSchema;

export const driverSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  dateOfBirth: z.string().min(1, "Date of birth is required"),

  licenseNumber: z.string().min(1, "License number is required"),
  licenseType: z.string().min(1, "License type is required"),
  licenseExpiry: z.string().min(1, "License expiry is required"),
  licenseIssued: z.string().min(1, "License issued date is required"),

  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required").max(10),

  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

export const driverEditSchema = driverSchema;

export const tripSchema = z.object({
  title: z.string().min(1, "Trip title is required").max(200),
  vehicle: z.string().min(1, "Vehicle selection is required"),
  driver: z.string().min(1, "Driver selection is required"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  scheduledStart: z.string().min(1, "Scheduled start is required"),
  scheduledEnd: z.string().min(1, "Scheduled end is required"),
  cargoType: z.string().min(1, "Cargo type is required"),
  cargoWeight: z.string().optional(),
  cargoValue: z.string().optional(),
  tripType: z.string().min(1, "Trip type is required"),
  priority: z.string().min(1, "Priority is required"),
  notes: z.string().optional(),
}).refine((data) => {
  if (data.scheduledStart && data.scheduledEnd) {
    return new Date(data.scheduledEnd) > new Date(data.scheduledStart);
  }
  return true;
}, { message: "End date must be after start date", path: ["scheduledEnd"] });

export const tripEditSchema = tripSchema;

export const maintenanceSchema = z.object({
  vehicle: z.string().min(1, "Vehicle selection is required"),
  serviceType: z.string().min(1, "Service type is required"),
  description: z.string().min(1, "Description is required"),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
  priority: z.string().min(1, "Priority is required"),
  assignedTo: z.string().min(1, "Assigned to is required"),
  estimatedCost: z.string().optional(),
  location: z.string().optional(),
});

export const maintenanceEditSchema = maintenanceSchema;

export const fuelLogSchema = z.object({
  vehicle: z.string().min(1, "Vehicle selection is required"),
  driver: z.string().min(1, "Driver selection is required"),
  fuelStation: z.string().min(1, "Fuel station is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  quantity: z.string().min(1, "Quantity is required"),
  pricePerUnit: z.string().min(1, "Price per unit is required"),
  totalAmount: z.string().optional(),
  odometerStart: z.string().optional(),
  odometerEnd: z.string().optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
  date: z.string().min(1, "Date is required"),
  remarks: z.string().optional(),
});

export const expenseSchema = z.object({
  vehicle: z.string().min(1, "Vehicle selection is required"),
  category: z.string().min(1, "Category is required"),
  amount: z.string().min(1, "Amount is required"),
  date: z.string().min(1, "Date is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  vendor: z.string().min(1, "Vendor is required"),
  invoiceNumber: z.string().optional(),
  description: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15).optional(),
  department: z.string().optional(),
  role: z.string().optional(),
  timezone: z.string().optional(),
});

export const companySchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(200),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  website: z.string().optional(),
  taxId: z.string().optional(),
  currency: z.string().min(1, "Currency is required"),
  timezone: z.string().min(1, "Timezone is required"),
  dateFormat: z.string().min(1, "Date format is required"),
});
