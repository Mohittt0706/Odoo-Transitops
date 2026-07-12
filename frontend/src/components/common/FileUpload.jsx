import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { Upload, X, File, Image, FileText, Check, AlertCircle } from "lucide-react";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024;

export default function FileUpload({
  files = [],
  onFilesChange,
  accept = ACCEPTED_TYPES,
  maxSize = MAX_SIZE,
  multiple = true,
  label = "Upload files",
  hint = "JPG, PNG, PDF up to 10MB",
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const validateFile = useCallback((file) => {
    if (!accept.includes(file.type) && !accept.includes("." + file.name.split(".").pop())) {
      return { valid: false, error: `${file.name}: Unsupported format` };
    }
    if (file.size > maxSize) {
      const mb = (maxSize / 1024 / 1024).toFixed(0);
      return { valid: false, error: `${file.name}: Exceeds ${mb}MB limit` };
    }
    return { valid: true, error: null };
  }, [accept, maxSize]);

  const addFiles = useCallback((fileList) => {
    const newFiles = [];
    const errors = [];
    Array.from(fileList).forEach((file) => {
      const result = validateFile(file);
      if (result.valid) {
        const id = `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
        newFiles.push({ id, file, name: file.name, size: file.size, type: file.type, preview, progress: 0, status: "pending" });
      } else {
        errors.push(result.error);
      }
    });
    if (newFiles.length > 0) {
      const updated = multiple ? [...files, ...newFiles] : newFiles;
      onFilesChange?.(updated);
      newFiles.forEach((f, i) => {
        setTimeout(() => {
          onFilesChange?.((prev) =>
            prev.map((pf) => pf.id === f.id ? { ...pf, progress: 100, status: "uploaded" } : pf)
          );
        }, 500 + i * 300);
      });
    }
    return errors;
  }, [files, multiple, onFilesChange, validateFile]);

  const removeFile = useCallback((id) => {
    const file = files.find((f) => f.id === id);
    if (file?.preview) URL.revokeObjectURL(file.preview);
    onFilesChange?.(files.filter((f) => f.id !== id));
  }, [files, onFilesChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleInput = useCallback((e) => {
    if (e.target.files?.length) {
      addFiles(e.target.files);
      e.target.value = "";
    }
  }, [addFiles]);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200",
          dragOver
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-neutral-border hover:border-primary/50 hover:bg-accent-light/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept.join(",")}
          multiple={multiple}
          onChange={handleInput}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
            dragOver ? "bg-primary text-white" : "bg-accent-light text-neutral-textMuted"
          )}>
            <Upload className="w-5 h-5" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-textMain">{label}</p>
            <p className="text-xs text-neutral-textMuted mt-0.5">{hint}</p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          <AnimatePresence>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 bg-accent-light rounded-lg px-3 py-2 border border-neutral-border/50"
              >
                {file.type?.startsWith("image/") && file.preview ? (
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-neutral-border">
                    <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                  </div>
                ) : file.type === "application/pdf" ? (
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <File className="w-4 h-4 text-blue-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-neutral-textMain truncate">{file.name}</p>
                  <p className="text-[10px] text-neutral-textMuted">{formatSize(file.size)}</p>
                </div>
                {file.status === "uploaded" ? (
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : file.status === "error" ? (
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                  className="p-0.5 rounded hover:bg-black/5 text-neutral-textMuted transition-colors flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
