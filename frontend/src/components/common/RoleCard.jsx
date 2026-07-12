import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils/utils";

export default function RoleCard({ role, index }) {
  const navigate = useNavigate();
  const { title, description, icon: Icon, color, route } = role;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => navigate(route)}
      className={cn(
        "group w-full text-left bg-white border border-neutral-border rounded-2xl p-6",
        "shadow-soft-sm hover:shadow-soft-lg transition-all duration-300",
        "hover:border-primary/30 cursor-pointer",
        "flex items-start gap-5"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
          color
        )}
      >
        <Icon className="w-6 h-6" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold font-headings text-neutral-textMain group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-neutral-textMuted mt-1 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex-shrink-0 mt-1">
        <ArrowRight className="w-5 h-5 text-neutral-border group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </motion.button>
  );
}
