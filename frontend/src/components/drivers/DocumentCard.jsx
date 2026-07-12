import React from 'react';
import { FileText, Download, RefreshCw, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/utils';

export default function DocumentCard({ document, onDownload, onReplace, onDelete }) {
  const isUploaded = document.uploaded;

  return (
    <div className={cn(
      'bg-white border rounded-xl p-5 transition-all duration-200 hover:shadow-sm',
      isUploaded ? 'border-slate-200/80 hover:border-blue-200' : 'border-dashed border-slate-300 hover:border-blue-300'
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2 rounded-lg',
            isUploaded ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
          )}>
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 font-headings">{document.name}</h4>
            {isUploaded ? (
              <div className="flex items-center gap-1 mt-0.5">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-600">Uploaded {document.date}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] font-semibold text-amber-600">Not uploaded</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isUploaded && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => onDownload?.(document)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3" /> Download
          </button>
          <button
            onClick={() => onReplace?.(document)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-[10px] font-bold text-slate-600 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Replace
          </button>
          <button
            onClick={() => onDelete?.(document)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[10px] font-bold text-red-600 transition-colors ml-auto cursor-pointer"
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      )}

      {!isUploaded && (
        <button className="w-full flex items-center justify-center gap-1.5 mt-3 py-2 rounded-lg border border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 text-[10px] font-bold text-blue-600 transition-colors cursor-pointer">
          Upload Document
        </button>
      )}
    </div>
  );
}
