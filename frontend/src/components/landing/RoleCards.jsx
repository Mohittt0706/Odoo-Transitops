import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, ShieldAlert, Wallet, Warehouse, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RoleCards() {
  const roles = [
    {
      title: 'Operations Lead',
      icon: Shield,
      desc: 'Oversees overall fleet telematics coordinates, schedules dispatch routes, and manages Odoo pickings sync.',
      points: ['Real-time fleet coordinates maps', 'Operator roster schedulers', 'Odoo picking lines integrations']
    },
    {
      title: 'Road Captain',
      icon: Truck,
      desc: 'Driver-focused cockpit for logging pre-trip details, managing fuel logs, and verifying speed/battery bounds.',
      points: ['Navigation route checkpoints', 'Reimbursable toll registers', 'Shift limit warnings']
    },
    {
      title: 'Safety Officer',
      icon: ShieldAlert,
      desc: 'Audit compliance states, log driving infractions, and oversee CDL license expiration records.',
      points: ['Incident warning logbooks', 'CDL validation portals', 'Driver health indexes']
    },
    {
      title: 'Finance Hub',
      icon: Wallet,
      desc: 'Manage toll billing invoices, fuel expense registers, and operational ROI margins ledger.',
      points: ['Approve expense requests', 'Reconcile tax billing ledgers', 'Fleet operations ROI reports']
    },
    {
      title: 'Destination Control',
      icon: Warehouse,
      desc: 'Coordinate warehouse dock allocations, log incoming truck queues, and sign POD cargo forms.',
      points: ['Allocate incoming truck bays', 'Sign Proof of Delivery forms', 'Monitor dock processing speeds']
    }
  ];

  return (
    <section id="roles" className="py-20 bg-slate-50 border-b border-neutral-border">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
            Role-Based UI Workspaces
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headings tracking-tight text-neutral-textMain">
            Tailored Dashboard Workspaces
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Five distinct operational platforms designed to optimize individual logistics operations and maximize efficiency.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((rl, idx) => {
            const RoleIcon = rl.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="card bg-white border border-neutral-border p-6 rounded-xl flex flex-col justify-between gap-6 card-transition shadow-soft-sm"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary shrink-0">
                    <RoleIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-headings font-bold text-base text-slate-800 leading-tight">
                      {rl.title}
                    </h3>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5 block">
                      Operations Role
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {rl.desc}
                  </p>
                  
                  {/* Responsibilities */}
                  <ul className="flex flex-col gap-2 mt-2">
                    {rl.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="btn btn-secondary w-full text-xs flex items-center justify-center gap-1.5 py-2.5 rounded-lg mt-4 shadow-soft-sm font-semibold">
                  View Workspace <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
