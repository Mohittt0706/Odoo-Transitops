import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, Users, Compass, Wrench, Fuel, BarChart3, ShieldCheck, Activity 
} from 'lucide-react';

export default function Features() {
  const featureList = [
    { title: 'Fleet Management', desc: 'Track vehicle telemetry, fuel diagnostics, cargo cabinet temperatures, and maintenance statuses from a single screen.', icon: Truck },
    { title: 'Driver Management', desc: 'Monitor Class A CDL licenses, log working hours, audit compliance states, and log driver roster updates.', icon: Users },
    { title: 'Trip Planning', desc: 'Assign route paths, coordinates, active pickings, and log automatic ETAs on active delivery routes.', icon: Compass },
    { title: 'Maintenance Tracking', desc: 'Schedule engine checks, track diagnostics, and receive automated warnings for vehicle parts replacement.', icon: Wrench },
    { title: 'Fuel & Expense Tracking', desc: 'Log toll charges, fuel purchases, and operational receipts with automatic margin ledger updates.', icon: Fuel },
    { title: 'Operational Analytics', desc: 'Review daily trip counts, average speeds, cargo load capacities, and fleet metrics using clean visual reports.', icon: BarChart3 },
    { title: 'Role-Based Access', desc: 'Switch layouts automatically between Operations Lead, Driver, Safety Officer, Finance, and Dock managers.', icon: ShieldCheck },
    { title: 'Real-Time Monitoring', desc: 'Verify coordinates with sub-second polling updates mapped directly to your dispatch dashboard.', icon: Activity }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 border-b border-neutral-border">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
            Complete Operations Suite
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headings tracking-tight text-neutral-textMain">
            Operational Excellence. Built-In.
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Every tool required to run a high-volume logistics and freight command station in one integrated platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="card bg-white border border-neutral-border rounded-xl p-6 shadow-soft-sm flex flex-col card-transition h-full"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-headings font-bold text-sm text-slate-800 leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
