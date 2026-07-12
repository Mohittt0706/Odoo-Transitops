import { useState, useRef, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { Upload, File, X, AlertCircle, CheckCircle } from "lucide-react";

export default function FormFileUpload({
  name,
  label = "Upload File",
  accept = "image/*,.pdf,.doc,.docx",
  maxSize = 5 * 1024 * 1024,
  multiple = false,
  disabled = false,
  className = "",
}) {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const error = errors[name];
  const files = watch(name) || [];
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const handleFiles = useCallback((fileList) => {
    const newFiles = Array.from(fileList);
    const valid = newFiles.filter((f) => f.size <= maxSize);
    if (valid.length === 0) return;

    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 30;
      if (p >= 100) { p = 100; clearInterval(interval); setUploading(false); }
      setProgress(Math.min(p, 100));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploading(false);
      setProgress(100);
      const updated = multiple ? [...(Array.isArray(files) ? files : []), ...valid] : [valid[0]];
      setValue(name, updated, { shouldValidate: true, shouldDirty: true });
    }, 1000);
  }, [files, maxSize, multiple, name, setValue]);

  const removeFile = (index) => {
    const updated = Array.isArray(files) ? files.filter((_, i) => i !== index) : [];
    setValue(name, updated.length > 0 ? updated : null, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <input type="file" ref={inputRef} accept={accept} multiple={multiple}
        onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ""; }}
        className="hidden" disabled={disabled}
      />
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200",
          dragOver ? "border-primary bg-primary/5" : "border-neutral-border hover:border-primary/40 hover:bg-accent-light",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-danger"
        )}
      >
        {uploading ? (
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
              <Upload className="w-5 h-5 text-primary animate-bounce" />
            </div>
            <p className="text-sm font-medium text-neutral-textMain">Uploading...</p>
            <div className="w-full max-w-xs mx-auto h-1.5 bg-neutral-border rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                className="h-full bg-primary rounded-full transition-all duration-300" />
            </div>
            <p className="text-[11px] text-neutral-textMuted">{Math.round(progress)}%</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
              <Upload className="w-5 h-5 text-neutral-textMuted" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-textMain">{label}</p>
              <p className="text-xs text-neutral-textMuted mt-0.5">
                Drag & drop or <span className="text-primary font-semibold">browse</span> files
              </p>
              <p className="text-[10px] text-neutral-textMuted mt-1">
                Max {(maxSize / 1024 / 1024).toFixed(0)}MB · {accept.replace(/\./g, "").toUpperCase().replace(/,/g, ", ")}
              </p>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {Array.isArray(files) && files.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((file, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 px-3 py-2.5 bg-accent-light rounded-lg border border-neutral-border"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-border flex items-center justify-center shrink-0">
                  {file.type?.startsWith("image/") ? (
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <File className="w-4 h-4 text-neutral-textMuted" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-textMain truncate">{file.name}</p>
                  <p className="text-[10px] text-neutral-textMuted">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button type="button" onClick={() => removeFile(i)}
                  className="p-1 rounded hover:bg-danger/10 text-neutral-textMuted hover:text-danger transition-all">
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 text-xs text-danger font-medium"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
