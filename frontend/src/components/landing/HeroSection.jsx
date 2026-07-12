import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Truck, Compass, Battery, AlertTriangle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-28 md:pt-36 pb-20 overflow-hidden relative border-b border-neutral-border bg-white">
      {/* Background soft grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side: Typography and CTAs */}
        <div className="lg:col-span-6 flex flex-col gap-6 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1 text-xs font-bold text-primary mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              TransitOps v2.5
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headings tracking-tight leading-[1.08] text-neutral-textMain"
          >
            Smarter Fleet Operations. <span className="text-primary">One Unified Platform.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-slate-500 text-sm md:text-base leading-relaxed"
          >
            Manage vehicles, drivers, trips, maintenance, fuel expenses, and operational analytics from one intelligent platform. Optimized for Odoo and enterprise logistics teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center gap-3.5 flex-wrap mt-2"
          >
            <button className="btn btn-primary shadow-soft-sm px-6 py-3.5 text-sm">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn btn-secondary px-6 py-3.5 text-sm flex items-center gap-2">
              <Play className="w-4 h-4 text-slate-600 fill-current" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Right Side: High Fidelity Telematics Mockup & Floating UI */}
        <div className="lg:col-span-6 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-lg bg-slate-50 border border-neutral-border rounded-xl p-6 shadow-soft-lg relative"
          >
            {/* Live Map Tracker mockup */}
            <div className="bg-white border border-neutral-border rounded-lg overflow-hidden shadow-soft-sm h-64 relative mb-6">
              {/* Map background grids and route line path */}
              <div className="absolute inset-0 bg-[#F1F5F9] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
              
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Route Path line */}
                <path
                  d="M 50 120 Q 150 40 280 180 T 400 100"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                />
                
                {/* Route Points */}
                <circle cx="50" cy="120" r="6" fill="#10B981" />
                <circle cx="400" cy="100" r="6" fill="#EF4444" />
              </svg>

              {/* Moving Vehicle Mockup Marker */}
              <motion.div
                animate={{
                  x: [0, 80, 200, 310],
                  y: [0, -50, 45, -20]
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute left-[50px] top-[120px] -translate-x-1/2 -translate-y-1/2 bg-white border border-neutral-border px-3 py-1.5 rounded-lg shadow-soft-md flex items-center gap-2"
              >
                <Truck className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold text-slate-800">TRK-204</span>
              </motion.div>
            </div>

            {/* Dashboard Telemetry Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-neutral-border rounded-lg p-4 shadow-soft-sm flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Fleet Battery</span>
                  <span className="text-base font-extrabold text-slate-800">92% Average</span>
                </div>
                <Battery className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="bg-white border border-neutral-border rounded-lg p-4 shadow-soft-sm flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Route Alerts</span>
                  <span className="text-base font-extrabold text-slate-800">1 Logged</span>
                </div>
                <AlertTriangle className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>
            </div>

            {/* Floating Widget 1: Driver status card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white border border-neutral-border rounded-lg p-3 shadow-soft-md hidden sm:flex items-center gap-3 w-44"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-primary text-xs shrink-0">
                AD
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-800 leading-none">Alex Dupont</span>
                <span className="text-[9px] font-semibold text-slate-400 mt-1 uppercase">Operations Lead</span>
              </div>
            </motion.div>

            {/* Floating Widget 2: Speedometer GPS card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white border border-neutral-border rounded-lg p-3.5 shadow-soft-md hidden sm:flex items-center gap-3 w-40"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telemetry Speed</span>
                <span className="text-xs font-extrabold text-slate-800 mt-0.5">68 Mph</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
