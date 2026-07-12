import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../components/common/Modal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { useToast } from "../../components/common/Toast";
import {
  Eye, Edit, Shield, AlertTriangle, Trash2, Building2, User,
  Phone, Mail, Truck, Clock, Star, CheckCircle, XCircle,
} from "lucide-react";

export function ViewReceiverModal({ open, onClose, receiver }) {
  if (!receiver) return null;
  return (
    <Modal open={open} onClose={onClose} title="Receiver Details" subtitle={receiver.name} size="md">
      <div className="space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-neutral-border/60">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
            {receiver.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-textMain">{receiver.name}</h3>
            <p className="text-xs text-neutral-textMuted">{receiver.id} | {receiver.companyCode || "—"}</p>
            <div className="flex items-center gap-2 mt-1">
              {receiver.verified ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600">
                  <CheckCircle className="w-2.5 h-2.5" /> Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600">
                  <XCircle className="w-2.5 h-2.5" /> Unverified
                </span>
              )}
              <span className="flex items-center gap-1 text-[10px] text-neutral-textMuted">
                <Star className={`w-3 h-3 ${receiver.rating >= 4 ? 'text-amber-400 fill-amber-400' : 'text-neutral-textMuted'}`} />
                {receiver.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Contact Person</p>
            <p className="flex items-center gap-1.5 text-neutral-textMain"><User className="w-3 h-3 text-neutral-textMuted" /> {receiver.contact}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Designation</p>
            <p className="text-neutral-textMain">{receiver.designation || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Phone</p>
            <p className="flex items-center gap-1.5 text-neutral-textMain"><Phone className="w-3 h-3 text-neutral-textMuted" /> {receiver.phone}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Email</p>
            <p className="flex items-center gap-1.5 text-neutral-textMain truncate"><Mail className="w-3 h-3 text-neutral-textMuted" /> {receiver.email}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Address</p>
            <p className="text-neutral-textMain">{receiver.address}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Preferred Warehouse</p>
            <p className="text-neutral-textMain">{receiver.preferredWarehouse || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Delivery Zone</p>
            <p className="text-neutral-textMain">{receiver.deliveryZone || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Total Deliveries</p>
            <p className="flex items-center gap-1.5 text-neutral-textMain"><Truck className="w-3 h-3 text-neutral-textMuted" /> {receiver.totalDeliveries}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Pending</p>
            <p className="flex items-center gap-1.5 text-neutral-textMain"><Clock className="w-3 h-3 text-neutral-textMuted" /> {receiver.pendingDeliveries}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Assigned RM</p>
            <p className="text-neutral-textMain">{receiver.assignedRM || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Verification Date</p>
            <p className="text-neutral-textMain">{receiver.verificationDate || "—"}</p>
          </div>
        </div>

        {receiver.notes && (
          <div className="pt-3 border-t border-neutral-border/60">
            <p className="text-[10px] font-bold text-neutral-textMuted uppercase mb-1">Notes</p>
            <p className="text-xs text-neutral-textMain">{receiver.notes}</p>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-neutral-border/60">
          <button onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function EditReceiverModal({ open, onClose, receiver, onSave }) {
  const toast = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: receiver ? {
      companyName: receiver.name || "",
      contactPerson: receiver.contact || "",
      phone: receiver.phone || "",
      email: receiver.email || "",
      address: receiver.address || "",
      designation: receiver.designation || "",
      status: receiver.status || "active",
    } : {},
  });

  const onSubmit = (data) => {
    Object.assign(receiver, {
      name: data.companyName,
      contact: data.contactPerson,
      phone: data.phone,
      email: data.email,
      address: data.address,
      designation: data.designation,
      status: data.status,
    });
    onSave?.();
    toast(`Receiver "${data.companyName}" updated successfully!`, "success");
    reset();
    onClose();
  };

  if (!receiver) return null;
  return (
    <Modal open={open} onClose={onClose} title="Edit Receiver" subtitle={receiver.name} size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Company Name <span className="text-danger">*</span></label>
            <input {...register("companyName", { required: "Required" })}
              className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary ${errors.companyName ? "border-danger" : "border-neutral-border"}`} />
            {errors.companyName && <p className="text-[9px] text-danger mt-0.5">{errors.companyName.message}</p>}
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Contact Person</label>
            <input {...register("contactPerson")}
              className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Phone <span className="text-danger">*</span></label>
            <input {...register("phone", { required: "Required" })}
              className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary ${errors.phone ? "border-danger" : "border-neutral-border"}`} />
            {errors.phone && <p className="text-[9px] text-danger mt-0.5">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Email <span className="text-danger">*</span></label>
            <input {...register("email", { required: "Required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })}
              className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary ${errors.email ? "border-danger" : "border-neutral-border"}`} />
            {errors.email && <p className="text-[9px] text-danger mt-0.5">{errors.email.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Address</label>
            <input {...register("address")}
              className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Designation</label>
            <input {...register("designation")}
              className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">Status</label>
            <select {...register("status")}
              className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary">
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-border/60">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">Cancel</button>
          <button type="submit"
            className="px-5 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all shadow-soft-sm">
            <Edit className="w-3.5 h-3.5 inline mr-1" /> Update Receiver
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function VerifyReceiverModal({ open, onClose, receiver, onVerify }) {
  const toast = useToast();
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    receiver.verified = true;
    receiver.verificationStatus = "Verified";
    receiver.verificationDate = new Date().toISOString().split("T")[0];
    onVerify?.();
    toast(`"${receiver.name}" has been verified successfully!`, "success");
    setVerifying(false);
    onClose();
  };

  if (!receiver) return null;
  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      onConfirm={handleVerify}
      title="Verify Receiver"
      message={`Are you sure you want to verify "${receiver.name}"? This confirms the receiver's identity and documentation.`}
      confirmLabel={verifying ? "Verifying..." : "Verify Receiver"}
      loading={verifying}
    />
  );
}

export function SuspendReceiverModal({ open, onClose, receiver, onSuspend }) {
  const toast = useToast();
  const [suspending, setSuspending] = useState(false);

  const handleSuspend = () => {
    setSuspending(true);
    receiver.status = "suspended";
    onSuspend?.();
    toast(`"${receiver.name}" has been suspended.`, "warning");
    setSuspending(false);
    onClose();
  };

  if (!receiver) return null;
  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      onConfirm={handleSuspend}
      title="Suspend Receiver"
      message={`Are you sure you want to suspend "${receiver.name}"? Suspended receivers cannot receive new deliveries.`}
      confirmLabel={suspending ? "Suspending..." : "Suspend Receiver"}
      loading={suspending}
      variant="danger"
    />
  );
}

export function DeleteReceiverModal({ open, onClose, receiver, onDelete }) {
  const toast = useToast();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    onDelete?.(receiver.id);
    toast(`"${receiver.name}" has been deleted.`, "error");
    setDeleting(false);
    onClose();
  };

  if (!receiver) return null;
  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      onConfirm={handleDelete}
      title="Delete Receiver"
      message={`Are you sure you want to permanently delete "${receiver.name}"? This action cannot be undone. All associated data will be removed.`}
      confirmLabel={deleting ? "Deleting..." : "Delete Receiver"}
      loading={deleting}
      variant="danger"
    />
  );
}
