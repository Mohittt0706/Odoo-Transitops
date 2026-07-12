import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Users, Compass, Activity, FileText, ArrowRight } from 'lucide-react';

export default function Workflow() {
  const steps = [
    { num: '01', title: 'Register Vehicles', desc: 'Add new truck profiles, cabin limits, and temp bounds.', icon: Truck },
    { num: '02', title: 'Register Drivers', desc: 'Link CDL certifications and verify compliance status.', icon: Users },
    { num: '03', title: 'Assign Trips', desc: 'Sync stock pickings from Odoo and map active route plans.', icon: Compass },
    { num: '04', title: 'Track Operations', desc: 'Audit speeds, fuel consumption, and cabin telemetry.', icon: Activity },
    { num: '05', title: 'Generate Reports', desc: 'Export tax expenses, driver cards, and revenue sheets.', icon: FileText }
  ];

  return (
    <section id="solutions" className="py-20 bg-white border-b border-neutral-border">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
            Simple Integration Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headings tracking-tight text-neutral-textMain">
            How TransitOps Works
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Get your operations set up and fully integrated with Odoo ERP workflows in five simple steps.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative flex flex-col lg:flex-row items-stretch gap-8 lg:gap-4 mt-8">
          {steps.map((st, idx) => {
            const StepIcon = st.icon;
            return (
              <div key={idx} className="flex-1 flex flex-col lg:flex-row items-center relative">
                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="card bg-white border border-neutral-border p-6 rounded-xl flex flex-col gap-3 w-full shadow-soft-sm relative z-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-headings text-slate-200">
                      {st.num}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-primary">
                      <StepIcon className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <h3 className="font-headings font-bold text-sm text-slate-800 leading-tight">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {st.desc}
                  </p>
                </motion.div>

                {/* Arrow Connector (only on desktop and not for the last step) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center text-slate-200 shrink-0 w-8 mx-1 z-0">
                    <ArrowRight className="w-5 h-5 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
