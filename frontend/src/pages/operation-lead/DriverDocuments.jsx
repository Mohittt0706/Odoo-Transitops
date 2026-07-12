import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, ChevronDown, CheckCircle, AlertCircle,
  Filter, Search, Bell, X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { drivers } from '../../data/drivers';
import DocumentCard from '../../components/drivers/DocumentCard';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'identity', label: 'Identity', docs: ['aadhaar'] },
  { id: 'driving', label: 'Driving', docs: ['drivingLicense', 'insurance'] },
  { id: 'medical', label: 'Medical', docs: ['medicalCertificate'] },
  { id: 'training', label: 'Training', docs: ['trainingCertificate'] },
  { id: 'verification', label: 'Verification', docs: ['policeVerification'] },
];

const docKeyToCategory = {
  drivingLicense: 'driving',
  medicalCertificate: 'medical',
  aadhaar: 'identity',
  policeVerification: 'verification',
  trainingCertificate: 'training',
  insurance: 'driving',
};

export default function DriverDocuments() {
  const { driverId } = useParams();
  const [selectedDriverId, setSelectedDriverId] = useState(driverId || drivers[0]?.id);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const selectedDriver = drivers.find(d => d.id === selectedDriverId);
  const documents = selectedDriver ? Object.entries(selectedDriver.documents) : [];

  const totalDocs = documents.length;
  const uploadedDocs = documents.filter(([, doc]) => doc.uploaded).length;
  const pendingDocs = totalDocs - uploadedDocs;
  const completionPct = totalDocs > 0 ? Math.round((uploadedDocs / totalDocs) * 100) : 0;

  const filteredDocs = activeCategory === 'all'
    ? documents
    : documents.filter(([key]) => {
        const cat = categories.find(c => c.id === activeCategory);
        return cat?.docs?.includes(key);
      });

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (action, doc) => {
    showToast(`${action} — ${doc.name}`);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg font-black text-slate-900 font-headings">Driver Documents</h1>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            Manage and organize all driver documentation
          </p>
        </div>
        {!driverId && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors min-w-[240px]"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {selectedDriver?.initials}
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-bold text-slate-900">{selectedDriver?.fullName}</p>
                <p className="text-[10px] text-slate-400 font-semibold">{selectedDriver?.id}</p>
              </div>
              <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', showDropdown && 'rotate-180')} />
            </button>
            {showDropdown && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                {drivers.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDriverId(d.id);
                      setShowDropdown(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors',
                      d.id === selectedDriverId && 'bg-blue-50'
                    )}
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[9px] font-bold">
                      {d.initials}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900">{d.fullName}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{d.id} — {d.employment.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {driverId && selectedDriver && (
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
              {selectedDriver.initials}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{selectedDriver.fullName}</p>
              <p className="text-[10px] text-slate-400 font-semibold">{selectedDriver.employment.role}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</p>
                <p className="text-sm font-black text-slate-900 font-headings">{totalDocs}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Uploaded</p>
                <p className="text-sm font-black text-slate-900 font-headings">{uploadedDocs}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-50">
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending</p>
                <p className="text-sm font-black text-slate-900 font-headings">{pendingDocs}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Completion</p>
            <p className="text-sm font-black text-slate-900 font-headings">{completionPct}%</p>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn(
              'h-full rounded-full',
              completionPct === 100 ? 'bg-emerald-500' : completionPct >= 50 ? 'bg-blue-500' : 'bg-amber-500'
            )}
          />
        </div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); showToast('Document uploaded successfully'); }}
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer',
          isDragOver ? 'border-blue-400 bg-blue-50/50' : 'border-slate-300 hover:border-blue-400'
        )}
      >
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
          <Upload className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-xs font-bold text-slate-700 font-headings">
          Drop documents here or click to browse
        </p>
        <p className="text-[10px] text-slate-400 font-semibold mt-1">
          Supports PDF, JPG, PNG up to 10MB
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-colors',
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredDocs.map(([key, doc], idx) => (
            <motion.div
              key={key}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
            >
              <DocumentCard
                document={doc}
                onDownload={(d) => handleAction('Downloaded', d)}
                onReplace={(d) => handleAction('Replace requested', d)}
                onDelete={(d) => handleAction('Deleted', d)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredDocs.length === 0 && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 flex flex-col items-center gap-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-xs font-bold text-slate-500">No documents in this category</p>
        </div>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            {toast}
            <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
