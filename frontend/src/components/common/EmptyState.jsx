import { motion } from "framer-motion";
import { Inbox } from "lucide-react";

export default function EmptyState({ icon: Icon = Inbox, title = "No data", description = "No records to display.", action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-neutral-border rounded-xl p-12 text-center"
    >
      <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-neutral-textMuted" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-bold font-headings text-neutral-textMain">{title}</h3>
      <p className="text-sm text-neutral-textMuted mt-1 max-w-xs mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}
