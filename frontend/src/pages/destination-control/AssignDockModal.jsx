import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Modal from "../../components/common/Modal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { useToast } from "../../components/common/Toast";
import { Dock, Truck, User, Building2, Calendar, Clock, AlertTriangle, FileText } from "lucide-react";

const supervisors = [
  "Rajesh Mehta", "Priya Gupta", "Vikash Singh", "Meena Patel",
  "Suresh Iyer", "Anita Desai", "Rahul Verma", "Deepa Nair",
];

export default function AssignDockModal({ open, onClose, onAssign, dockData, incomingDeliveries, warehouseWorkers }) {
  const toast = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const availableDocks = useMemo(() => dockData.filter(d => d.status === "Available"), [dockData]);
  const pendingDeliveries = useMemo(() => incomingDeliveries.filter(d =>
    d.status === "Waiting Dock" || d.status === "Arrived" || d.status === "On Route"
  ), [incomingDeliveries]);
  const activeSupervisors = useMemo(() => warehouseWorkers.filter(w => w.active && w.role === "Supervisor").map(w => w.name),
    [warehouseWorkers]);
  const allSupervisors = activeSupervisors.length > 0 ? activeSupervisors : supervisors;

  const {
    register, handleSubmit, watch, setValue, reset, formState: { errors },
  } = useForm({
    defaultValues: {
      deliveryId: "", truckNumber: "", driver: "", warehouse: "",
      dock: "", arrivalDate: "", arrivalTime: "", priority: "Medium",
      supervisor: "", unloadingTime: "60", remarks: "",
    },
  });

  const selectedDelivery = watch("deliveryId");

  const handleDeliveryChange = (id) => {
    const delivery = incomingDeliveries.find(d => d.id === id);
    if (delivery) {
      setValue("truckNumber", delivery.truck);
      setValue("driver", delivery.driver);
      setValue("warehouse", delivery.destination);
      setValue("arrivalDate", delivery.arrivalTime.split(" ")[0] || "");
      setValue("arrivalTime", delivery.arrivalTime.split(" ")[1] || "");
      setValue("priority", delivery.priority);
    }
  };

  const onFormSubmit = (data) => {
    setShowConfirm(true);
  };

  const confirmAssign = () => {
    setSubmitting(true);
    const data = watch();
    const dock = dockData.find(d => d.name === data.dock);
    const delivery = incomingDeliveries.find(d => d.id === data.deliveryId);

    try {
      if (dock) {
        dock.status = "Occupied";
        dock.utilization = 100;
        dock.currentVehicle = data.truckNumber;
        dock.cargoType = delivery?.cargo || null;
        dock.assignedWorker = data.supervisor;
      }

      if (delivery) {
        delivery.status = "Dock Assigned";
        delivery.dock = data.dock;
      }

      onAssign?.({
        ...data,
        dockId: dock?.id,
        deliveryId: data.deliveryId,
      });

      toast("Dock assigned successfully to " + data.truckNumber, "success");
      setShowConfirm(false);
      setSubmitting(false);
      reset();
      onClose();
    } catch {
      toast("Failed to assign dock. Please try again.", "error");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title="Assign Dock" subtitle="Assign an available dock to an incoming delivery"
        size="lg">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delivery ID */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <Truck className="w-3 h-3" /> Delivery ID <span className="text-danger ml-0.5">*</span>
              </label>
              <select {...register("deliveryId", { required: "Delivery ID is required" })}
                onChange={(e) => { handleDeliveryChange(e.target.value); }}
                className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.deliveryId ? "border-danger" : "border-neutral-border"}`}>
                <option value="">Select delivery</option>
                {pendingDeliveries.map(d => (
                  <option key={d.id} value={d.id}>{d.id} - {d.truck}</option>
                ))}
              </select>
              {errors.deliveryId && <p className="text-[10px] text-danger mt-1">{errors.deliveryId.message}</p>}
            </div>

            {/* Truck Number (auto-filled) */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <Truck className="w-3 h-3" /> Truck Number <span className="text-danger ml-0.5">*</span>
              </label>
              <input {...register("truckNumber", { required: "Truck number is required" })}
                readOnly className={`w-full h-10 px-3 text-sm bg-neutral-light/50 border rounded-lg outline-none text-neutral-textMain ${errors.truckNumber ? "border-danger" : "border-neutral-border"}`} />
              {errors.truckNumber && <p className="text-[10px] text-danger mt-1">{errors.truckNumber.message}</p>}
            </div>

            {/* Driver (auto-filled) */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <User className="w-3 h-3" /> Driver <span className="text-danger ml-0.5">*</span>
              </label>
              <input {...register("driver", { required: "Driver is required" })}
                readOnly className={`w-full h-10 px-3 text-sm bg-neutral-light/50 border rounded-lg outline-none text-neutral-textMain ${errors.driver ? "border-danger" : "border-neutral-border"}`} />
              {errors.driver && <p className="text-[10px] text-danger mt-1">{errors.driver.message}</p>}
            </div>

            {/* Warehouse */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <Building2 className="w-3 h-3" /> Warehouse <span className="text-danger ml-0.5">*</span>
              </label>
              <input {...register("warehouse", { required: "Warehouse is required" })}
                readOnly className={`w-full h-10 px-3 text-sm bg-neutral-light/50 border rounded-lg outline-none text-neutral-textMain ${errors.warehouse ? "border-danger" : "border-neutral-border"}`} />
              {errors.warehouse && <p className="text-[10px] text-danger mt-1">{errors.warehouse.message}</p>}
            </div>

            {/* Available Dock */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <Dock className="w-3 h-3" /> Available Dock <span className="text-danger ml-0.5">*</span>
              </label>
              <select {...register("dock", { required: "Please select an available dock" })}
                className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.dock ? "border-danger" : "border-neutral-border"}`}>
                <option value="">Select dock</option>
                {availableDocks.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.dock && <p className="text-[10px] text-danger mt-1">{errors.dock.message}</p>}
              {availableDocks.length === 0 && (
                <p className="text-[10px] text-amber-600 mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5" /> No docks available
                </p>
              )}
            </div>

            {/* Arrival Date */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <Calendar className="w-3 h-3" /> Arrival Date <span className="text-danger ml-0.5">*</span>
              </label>
              <input type="date" {...register("arrivalDate", {
                required: "Arrival date is required",
                validate: v => !v || new Date(v) >= new Date(new Date().toDateString()) || "Date cannot be in the past",
              })}
                className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.arrivalDate ? "border-danger" : "border-neutral-border"}`} />
              {errors.arrivalDate && <p className="text-[10px] text-danger mt-1">{errors.arrivalDate.message}</p>}
            </div>

            {/* Arrival Time */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <Clock className="w-3 h-3" /> Arrival Time <span className="text-danger ml-0.5">*</span>
              </label>
              <input type="time" {...register("arrivalTime", { required: "Arrival time is required" })}
                className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.arrivalTime ? "border-danger" : "border-neutral-border"}`} />
              {errors.arrivalTime && <p className="text-[10px] text-danger mt-1">{errors.arrivalTime.message}</p>}
            </div>

            {/* Priority */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <AlertTriangle className="w-3 h-3" /> Priority <span className="text-danger ml-0.5">*</span>
              </label>
              <select {...register("priority", { required: "Priority is required" })}
                className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.priority ? "border-danger" : "border-neutral-border"}`}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.priority && <p className="text-[10px] text-danger mt-1">{errors.priority.message}</p>}
            </div>

            {/* Assigned Supervisor */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <User className="w-3 h-3" /> Assigned Supervisor <span className="text-danger ml-0.5">*</span>
              </label>
              <select {...register("supervisor", { required: "Supervisor is required" })}
                className={`w-full h-10 px-3 text-sm bg-neutral-light border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 ${errors.supervisor ? "border-danger" : "border-neutral-border"}`}>
                <option value="">Select supervisor</option>
                {allSupervisors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.supervisor && <p className="text-[10px] text-danger mt-1">{errors.supervisor.message}</p>}
            </div>

            {/* Estimated Unloading Time */}
            <div>
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <Clock className="w-3 h-3" /> Est. Unloading Time (min)
              </label>
              <input type="number" min="15" max="480" {...register("unloadingTime")}
                className="w-full h-10 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>

            {/* Remarks */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-1 text-[11px] font-bold text-neutral-textMuted uppercase mb-1.5">
                <FileText className="w-3 h-3" /> Remarks
              </label>
              <textarea rows={2} {...register("remarks")}
                placeholder="Any special instructions or notes..."
                className="w-full px-3 py-2 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-border/60">
            <button type="button" onClick={() => { reset(); onClose(); }}
              className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">
              Cancel
            </button>
            <button type="button" onClick={() => reset()}
              className="px-4 py-2 text-xs font-semibold text-neutral-textMain bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">
              Reset
            </button>
            <button type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-soft-sm">
              <Dock className="w-3.5 h-3.5" /> Assign Dock
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmationModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmAssign}
        title="Confirm Dock Assignment"
        message={`Assign ${watch("dock")} to ${watch("truckNumber")} (${watch("driver")})? This will mark the dock as occupied.`}
        confirmLabel={submitting ? "Assigning..." : "Confirm Assignment"}
        loading={submitting}
      />
    </>
  );
}
