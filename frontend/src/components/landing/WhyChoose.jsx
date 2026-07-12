import React from 'react';
import { motion } from 'framer-motion';
import { Check, Database, RefreshCw, Layers } from 'lucide-react';

export default function WhyChoose() {
  const benefits = [
    { title: 'Reduce operational costs', desc: 'Prevent unnecessary fuel idling and optimize routes to cut down fuel billing.' },
    { title: 'Increase fleet utilization', desc: 'Pre-allocate cargo docks and reduce terminal clearance wait times.' },
    { title: 'Improve driver safety', desc: 'Flag speeding incidents and monitor Class A CDL certifications automatically.' },
    { title: 'Automate maintenance schedules', desc: 'Receive automated alerts for parts replacements based on mileage logs.' },
    { title: 'Track expenses in real-time', desc: 'Attach toll purchases and fuel billing logs directly to Odoo ERP databases.' },
    { title: 'Enterprise analytics reports', desc: 'Export tax journals, driver cards, and revenue sheets with one click.' }
  ];

  return (
    <section className="py-20 bg-white border-b border-neutral-border">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Interactive Odoo API Illustration Panel */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="w-full max-w-sm bg-slate-50 border border-neutral-border rounded-xl p-6 shadow-soft-md relative">
            <h4 className="font-headings font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">
              TransitOps Integration
            </h4>

            {/* Odoo Sync mockup card */}
            <div className="flex flex-col gap-3">
              <div className="bg-white border border-neutral-border rounded-lg p-4 shadow-soft-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#111827] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ERP
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 leading-none">Odoo Inventory</span>
                    <span className="text-[9px] text-slate-400 mt-1">Status: Fully Synced</span>
                  </div>
                </div>
                <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              {/* Connector line */}
              <div className="flex justify-center py-1">
                <div className="w-0.5 h-6 bg-slate-200 border-dashed border-l"></div>
              </div>

              {/* TransitOps central core card */}
              <div className="bg-white border border-primary/20 rounded-lg p-4 shadow-soft-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                    OPS
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800 leading-none">TransitOps Core</span>
                    <span className="text-[9px] text-slate-400 mt-1">Port: 18073 Active</span>
                  </div>
                </div>
                <Layers className="w-4 h-4 text-primary" />
              </div>
            </div>

            {/* Float badge 1: Database records */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white border border-neutral-border px-3 py-1.5 rounded-lg shadow-soft-md flex items-center gap-2"
            >
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-bold text-slate-800">4,210 Logs</span>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Benefits Lists */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
              Enterprise Benefits
            </span>
            <h2 className="text-3xl font-extrabold font-headings tracking-tight text-neutral-textMain mt-1.5 mb-3">
              Why Logistics Teams Choose TransitOps
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We sync telematics data and Odoo inventory workflows into a clean, modern command interface that keeps logistics fleets compliant and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
            {benefits.map((ben, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headings font-bold text-xs text-slate-800 leading-tight">
                    {ben.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal font-medium">
                    {ben.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
