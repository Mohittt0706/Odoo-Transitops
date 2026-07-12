import React from 'react';
import { Truck, MapPin, Battery, ShieldAlert, ArrowRight } from 'lucide-react';
import TelemetryChart from '../charts/TelemetryChart';

export default function DashboardPreview() {
  const kpis = [
    { label: 'Active Fleet', value: '48/52 Vehicles', change: '+4.5% en route' },
    { label: 'Today\'s Trips', value: '142 Dispatches', change: '98% on-time' },
    { label: 'Fuel Target', value: '8.4 km/L', change: '+1.2% efficiency' },
    { label: 'Active Alerts', value: '1 Maintenance', change: 'In Columbus Shop' }
  ];

  const vehicles = [
    { id: 'TRK-204', driver: 'Marcus Vance', destination: 'Chicago Hub', fuel: 78, status: 'En Route' },
    { id: 'TRK-109', driver: 'Sarah Jenkins', destination: 'Detroit Depot', fuel: 45, status: 'En Route' },
    { id: 'VAN-512', driver: 'David Chen', destination: 'Cleveland Yards', fuel: 92, status: 'Available' }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-neutral-border">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-12">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
            Live Interface Mockup
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headings tracking-tight text-neutral-textMain">
            Clean Enterprise Dashboard
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            A premium, spacious operational workspace built to maximize daily dispatcher workflow speeds.
          </p>
        </div>

        {/* Dashboard Frame (Clean White, Subtle Shadows, Light Gray Borders) */}
        <div className="bg-white border border-neutral-border rounded-xl shadow-soft-lg overflow-hidden max-w-5xl mx-auto flex flex-col">
          {/* Header Panel */}
          <div className="bg-slate-50 border-b border-neutral-border px-6 py-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">
                TO
              </div>
              <div className="flex flex-col">
                <span className="font-headings font-extrabold text-sm text-slate-800 leading-none">
                  TransitOps Dispatcher
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Cleveland Hub • Station CLV-09
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                System Connected
              </span>
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-border border-b border-neutral-border">
            {kpis.map((kpi, idx) => (
              <div key={idx} className="bg-white p-6 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-headings">
                  {kpi.label}
                </span>
                <span className="text-lg font-bold text-slate-800 font-headings leading-tight mt-1">
                  {kpi.value}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          {/* Main Area layout: Left chart, Right vehicle list */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-neutral-border flex flex-col gap-6">
              <h4 className="font-headings font-bold text-xs text-slate-700 uppercase tracking-wider">
                Fleet Deliveries Trend
              </h4>
              <TelemetryChart 
                type="line" 
                color="blue" 
                title="" 
                data={[{ label: 'Mon', value: 34 }, { label: 'Tue', value: 42 }, { label: 'Wed', value: 38 }, { label: 'Thu', value: 45 }, { label: 'Fri', value: 52 }]} 
              />
            </div>

            {/* Right: Roster lists */}
            <div className="lg:col-span-5 p-6 flex flex-col gap-6">
              <h4 className="font-headings font-bold text-xs text-slate-700 uppercase tracking-wider">
                Active Fleet Roster
              </h4>
              
              <div className="flex flex-col gap-3">
                {vehicles.map((v, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border border-neutral-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-primary text-xs font-bold">
                        {v.id.split('-')[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 leading-none">{v.id}</span>
                        <span className="text-[10px] text-slate-400 font-medium mt-1">Driver: {v.driver}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-700">{v.destination}</span>
                      <span className="text-[9px] bg-blue-50 text-primary border border-blue-100 font-bold px-2 py-0.5 rounded-full mt-1 uppercase tracking-wider">
                        {v.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-primary font-headings cursor-pointer hover:underline self-start pt-2">
                Open Fleet Control Portal <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
