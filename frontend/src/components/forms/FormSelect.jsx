import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { ChevronDown, Search, AlertCircle, Check } from "lucide-react";

export default function FormSelect({
  name,
  label,
  options = [],
  placeholder = "Select...",
  required = false,
  disabled = false,
  searchable = false,
  className = "",
  onChange,
}) {
  const { register, setValue, watch, formState: { errors, touchedFields } } = useFormContext();
  const error = errors[name];
  const touched = touchedFields[name];
  const value = watch(name);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const selected = options.find((o) => o.value === value);

  return (
    <div className={cn("relative", className)} ref={ref}>
      <div className="relative">
        <input {...register(name)} type="hidden" />
        <button type="button" disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
          className={cn(
            "w-full h-11 bg-white border rounded-lg px-4 text-sm font-sans text-left transition-all duration-200",
            "flex items-center justify-between gap-2",
            "disabled:bg-neutral-light disabled:opacity-60 disabled:cursor-not-allowed",
            error
              ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/10"
              : touched && !error
                ? "border-success"
                : "border-neutral-border hover:border-neutral-textMuted focus:border-primary focus:ring-2 focus:ring-primary/10",
            !value && "text-neutral-textMuted"
          )}
        >
          <span className={cn("truncate", value && "text-neutral-textMain")}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown className={cn("w-4 h-4 text-neutral-textMuted shrink-0 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -4, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-1 w-full bg-white border border-neutral-border rounded-xl shadow-soft-lg overflow-hidden"
          >
            {searchable && (
              <div className="p-2 border-b border-neutral-border/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-textMuted" />
                  <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..." autoFocus
                    className="w-full h-8 pl-8 pr-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all"
                  />
                </div>
              </div>
            )}
            <div className="max-h-48 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="px-3 py-2 text-xs text-neutral-textMuted">No options found</p>
              ) : (
                filtered.map((opt) => {
                  const active = value === opt.value;
                  return (
                    <button key={opt.value} type="button"
                      onClick={() => {
                        setValue(name, opt.value, { shouldValidate: true, shouldDirty: true });
                        onChange?.(opt.value);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors",
                        active ? "bg-primary/5 text-primary font-semibold" : "text-neutral-textMain hover:bg-accent-light"
                      )}
                    >
                      <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                        {active && <Check className="w-3 h-3 text-primary" strokeWidth={3} />}
                      </span>
                      {opt.label}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 mt-1.5 text-xs text-danger font-medium"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
