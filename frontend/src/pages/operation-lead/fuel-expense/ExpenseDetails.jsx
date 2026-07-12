import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import StatusBadge from "../../../components/common/Badge";
import { Timeline, EmptyState } from "../../../components/fuel-expense/FuelExpenseComponents";
import { expenses } from "../../../data/fuelExpenseData";
import { ArrowLeft, Download, FileText, Truck, User, DollarSign, Calendar, CheckCircle, Clock, MessageSquare, Activity } from "lucide-react";

export default function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <PageHeader title="Expense Not Found" subtitle="The requested expense record does not exist" />
        <EmptyState title="No expense found" description={`Expense ${id} could not be located`} action={<button onClick={() => navigate("/dashboard/operations/expenses")} className="btn btn-primary text-xs">Back to Expenses</button>} />
      </motion.div>
    );
  }

  const timeline = [
    { date: expense.date, title: "Expense Created", description: `${expense.category} expense recorded for ${expense.vehicle}` },
    { date: expense.date, title: expense.paymentStatus === "Approved" || expense.paymentStatus === "Paid" ? "Approved" : "Pending Review", description: expense.approvedBy !== "—" ? `Approved by ${expense.approvedBy}` : "Awaiting approval" },
    { date: expense.date, title: expense.paymentStatus === "Paid" ? "Payment Completed" : "Payment Pending", description: expense.paymentStatus },
  ];

  const details = [
    { label: "Expense ID", value: expense.id, icon: FileText },
    { label: "Category", value: expense.category, icon: DollarSign },
    { label: "Amount", value: `₹${expense.amount.toLocaleString()}`, icon: DollarSign },
    { label: "Status", value: <StatusBadge status={expense.paymentStatus} />, icon: CheckCircle },
    { label: "Date", value: expense.date, icon: Calendar },
    { label: "Approved By", value: expense.approvedBy, icon: User },
    { label: "Invoice", value: expense.invoice || "Not generated", icon: FileText },
  ];

  const comments = [
    { user: "Finance Admin", text: "Expense verified and approved.", time: "2 hours ago" },
    { user: "Operations Lead", text: "Please attach supporting documents.", time: "1 day ago" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        title={`Expense ${expense.id}`}
        subtitle={`${expense.category} - ${expense.vehicleName || expense.vehicle}`}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
            <button className="btn btn-primary text-xs flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Download</button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Expense Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {details.map((d) => (
                <div key={d.label}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <d.icon className="w-3 h-3 text-neutral-textMuted" strokeWidth={1.5} />
                    <p className="text-[10px] font-semibold text-neutral-textMuted uppercase">{d.label}</p>
                  </div>
                  <p className="text-sm font-bold font-headings text-neutral-textMain">{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4 flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> Vehicle & Driver Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-[10px] font-semibold text-neutral-textMuted uppercase">Vehicle</p><p className="text-sm font-bold text-neutral-textMain">{expense.vehicleName}</p><p className="text-xs text-neutral-textMuted">{expense.vehicle}</p></div>
              <div><p className="text-[10px] font-semibold text-neutral-textMuted uppercase">Driver</p><p className="text-sm font-bold text-neutral-textMain">{expense.driver}</p></div>
              <div><p className="text-[10px] font-semibold text-neutral-textMuted uppercase">Category</p><p className="text-sm font-bold text-neutral-textMain">{expense.category}</p></div>
              <div><p className="text-[10px] font-semibold text-neutral-textMuted uppercase">Payment</p><p className="text-sm font-bold text-neutral-textMain">{expense.paymentStatus}</p></div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Comments</h3>
            <div className="space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-accent-light rounded-lg">
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><User className="w-3.5 h-3.5 text-primary" /></div>
                  <div><p className="text-xs font-bold text-neutral-textMain">{c.user}<span className="text-[10px] font-normal text-neutral-textMuted ml-2">{c.time}</span></p><p className="text-xs text-neutral-textMuted mt-0.5">{c.text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Expense Timeline</h3>
            <Timeline stages={timeline} />
          </div>

          <div className="card">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Activity Log</h3>
            <div className="space-y-2">
              {[{ action: "Expense created", time: expense.date }, { action: "Reviewed by finance team", time: expense.date }, { action: "Status updated", time: expense.date }].map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                  <span className="text-neutral-textMain">{a.action}</span>
                  <span className="text-neutral-textMuted ml-auto">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-sm font-bold font-headings text-neutral-textMain mb-3">Approval Workflow</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs"><CheckCircle className="w-3.5 h-3.5 text-success" /><span className="text-neutral-textMain">Submitted</span></div>
              <div className="flex items-center gap-2 text-xs"><Clock className="w-3.5 h-3.5 text-warning" /><span className="text-neutral-textMain">Under Review</span></div>
              <div className="flex items-center gap-2 text-xs"><CheckCircle className="w-3.5 h-3.5 text-neutral-border" /><span className="text-neutral-textMuted">Approved</span></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
