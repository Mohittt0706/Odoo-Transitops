import React, { useState } from 'react';
import {
    CheckSquare, ClipboardList, Fuel, Navigation,
    MapPin, ShieldAlert, Award, Compass, Check
} from 'lucide-react';
import { RadialProgress } from '../../components/charts/SvgCharts';

export default function DriverCockpit() {
    const [checklist, setChecklist] = useState({
        brakes: false,
        tires: false,
        lights: false,
        harness: false,
        coupling: false
    });

    const toggleCheck = (key) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const allChecked = Object.values(checklist).every(Boolean);

    return (
        <div className="flex flex-col gap-6 animate-fade-in max-w-5xl mx-auto">
            {/* Title */}
            <div className="border-b border-slate-100 pb-5">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Driver Cockpit</h1>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Mobile-optimized interface for on-duty captains & pre-route checklists</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Dispatch Card */}
                <div className="md:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[9px] font-extrabold uppercase bg-blue-50 border border-blue-100 text-blue-600 px-2.5 py-1 rounded-md">
                                Active Route manifest
                            </span>
                            <span className="text-xs font-black text-slate-400 font-mono">Trip ID: TX-8041</span>
                        </div>

                        <h3 className="text-base font-black text-slate-900 mb-2">Dallas Depot (DFW) → Houston Gate 4</h3>
                        <p className="text-xs text-slate-500 font-semibold mb-6">Cargo: Industrial Turbines & Generators (24,000 lbs)</p>

                        <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                            <div>
                                <p className="text-[9px] font-black text-slate-400 tracking-wider uppercase mb-1">Estimated Drive</p>
                                <p className="text-xs font-black text-slate-800">4 hrs 12 mins remaining</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 tracking-wider uppercase mb-1">Assigned Lane Stops</p>
                                <p className="text-xs font-black text-slate-800">1 Stop (Shell, Waco)</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-1.5 font-bold text-white bg-blue-600 hover:bg-blue-700 py-3 rounded-xl shadow-sm transition-all text-xs cursor-pointer">
                            <Navigation className="w-3.5 h-3.5" />
                            Navigate Route
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-350 py-3 rounded-xl text-xs transition-all cursor-pointer">
                            Report Delay
                        </button>
                    </div>
                </div>

                {/* Driver Scorecard */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-center items-center">
                    <RadialProgress percent={98} label="Safety Rating" subText="Class A driver status active" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pre-Trip Checklist */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            <ClipboardList className="w-4 h-4 text-blue-600" />
                            Pre-Trip Safety Inspection
                        </h3>
                        {allChecked && (
                            <span className="text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Verified
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-slate-400 font-semibold mb-6">Confirm and log mandatory DOT parameters before departure.</p>

                    <div className="flex flex-col gap-3">
                        {[
                            { key: 'brakes', label: 'Brake lines connected & pressure hold check' },
                            { key: 'tires', label: 'Tire inflation, tread depth, and lug nuts okay' },
                            { key: 'lights', label: 'Reflectors, headlights, indicators clean' },
                            { key: 'harness', label: 'Driver safety restraints & ELD logging synced' },
                            { key: 'coupling', label: 'Kingpin coupling lock verified secure' }
                        ].map(item => (
                            <label
                                key={item.key}
                                onClick={() => toggleCheck(item.key)}
                                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-150
                  ${checklist[item.key]
                                        ? 'bg-blue-50/20 border-blue-200/60'
                                        : 'bg-slate-50/50 border-slate-200/60 hover:border-slate-300'
                                    }
                `}
                            >
                                <div className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors
                  ${checklist[item.key]
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-slate-300 bg-white'
                                    }
                `}>
                                    {checklist[item.key] && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <span className={`text-xs font-semibold ${checklist[item.key] ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                                    {item.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Dispatch Notes / Speed Limits */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Compass className="w-4 h-4 text-blue-600 animate-spin-slow" />
                            Route Lane Advisories
                        </h3>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex gap-3.5 items-start">
                                <Fuel className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-xs font-black text-slate-900">Optimal Fuel Lane Stop</h4>
                                    <p className="text-[11px] text-slate-450 font-semibold mt-1 leading-normal">
                                        Shell stop in Waco holds card pre-negotiated discount $-0.25/gallon. Dispatch recommends refuel point here.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-rose-50/40 border border-rose-100 rounded-xl flex gap-3.5 items-start">
                                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-xs font-black text-rose-900">High Wind Advisory</h4>
                                    <p className="text-[11px] text-rose-700/80 font-semibold mt-1 leading-normal">
                                        High-profile vehicle warning active on I-45 corridors near Madisonville. Keep speeds under 55mph.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors mt-6 cursor-pointer">
                        Log DOT Duty Hour Event
                    </button>
                </div>
            </div>
        </div>
    );
}
