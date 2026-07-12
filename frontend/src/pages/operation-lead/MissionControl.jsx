import React, { useState } from 'react';
import {
    Plus, Compass, Clock, Activity, ShieldAlert,
    Search, CheckCircle, AlertTriangle, Filter, ArrowUpRight
} from 'lucide-react';
import MapWidget from '../../components/maps/MapWidget';

export default function MissionControl() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const activeDispatches = [
        { id: 'TX-8041', driver: 'Marcus Vance', destination: 'Houston, TX', progress: 75, status: 'On Route', time: 'ETA 2 hrs', speed: '65 mph', alert: false },
        { id: 'CA-9102', driver: 'Sarah Jenkins', destination: 'Los Angeles, CA', progress: 40, status: 'On Route', time: 'ETA 6 hrs', speed: '58 mph', alert: false },
        { id: 'NY-3012', driver: "Liam O'Connor", destination: 'Buffalo, NY', progress: 95, status: 'Approaching', time: 'ETA 15 mins', speed: '45 mph', alert: false },
        { id: 'FL-4821', driver: 'Elena Rostova', destination: 'Miami, FL', progress: 15, status: 'Delayed', time: 'Weather hold', speed: '0 mph', alert: true }
    ];

    const logs = [
        { time: '09:51', text: 'Truck CA-9102 successfully passed departure inspection checklists.', type: 'info' },
        { time: '09:47', text: 'Route warning dispatched to FL-4821 for convective storm fronts.', type: 'warn' },
        { time: '09:32', text: 'Tire Pressure sensor alerts: TX-8041 left-rear normal pressure.', type: 'info' },
        { time: '09:15', text: 'High Speed alert triggered for NY-3012: 82mph in 70mph zone.', type: 'danger' }
    ];

    // Filtered dispatches
    const filteredDispatches = activeDispatches.filter(d => {
        const matchesSearch = d.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.destination.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            {/* Title block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Mission Control Center</h1>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Live operational command dashboard for active fleet coordinates</p>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4.5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer">
                    <Plus className="w-4 h-4" />
                    Dispatch New Fleet
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Active Trips', val: '142', sub: '12 added today', icon: Compass, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Avg Fleet Speed', val: '58.4 mph', sub: 'Optimal fuel range', icon: Activity, color: 'text-cyan-600 bg-cyan-50' },
                    { label: 'On-Schedule Rate', val: '94.2%', sub: 'Target: 95.0%', icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Exceptions Alerted', val: '1 Hold', sub: 'Customs delay active', icon: ShieldAlert, color: 'text-amber-600 bg-amber-50' }
                ].map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-350 hover:shadow-sm transition-all duration-200 group">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase">{kpi.label}</span>
                                <div className={`p-1.5 rounded-lg transition-transform group-hover:scale-105 ${kpi.color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 font-mono mb-1">{kpi.val}</h3>
                            <p className="text-[10px] text-slate-400 font-bold">{kpi.sub}</p>
                        </div>
                    );
                })}
            </div>

            {/* Embedded Live Map Component */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Active Telemetry Map</h3>
                    <span className="text-[9px] font-extrabold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">Live coordinates active</span>
                </div>
                <MapWidget />
            </div>

            {/* Main split grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Table Column */}
                <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Active Operations Tracker</h3>

                            {/* Search & Filter Toolbar */}
                            <div className="flex gap-2 w-full sm:w-auto">
                                <div className="relative flex-1 sm:flex-none">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search dispatches..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full sm:w-44 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-slate-800 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-1.5 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors"
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="On Route">On Route</option>
                                        <option value="Approaching">Approaching</option>
                                        <option value="Delayed">Delayed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider pb-3">
                                        <th className="pb-3">Trip ID</th>
                                        <th className="pb-3">Driver Name</th>
                                        <th className="pb-3">Destination</th>
                                        <th className="pb-3">Progress</th>
                                        <th className="pb-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredDispatches.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-8 text-center text-xs font-bold text-slate-400">
                                                No active dispatches found matching criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredDispatches.map((trip) => (
                                            <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4.5 text-xs font-black text-slate-900 font-mono">{trip.id}</td>
                                                <td className="py-4.5 text-xs text-slate-800 font-bold">{trip.driver}</td>
                                                <td className="py-4.5 text-xs text-slate-500 font-semibold">{trip.destination}</td>
                                                <td className="py-4.5 w-44">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="flex-1 h-1.5 bg-slate-150 rounded-full overflow-hidden">
                                                            <div className={`h-full ${trip.alert ? 'bg-amber-500' : 'bg-blue-600'}`} style={{ width: `${trip.progress}%` }}></div>
                                                        </div>
                                                        <span className="text-[10px] font-extrabold font-mono text-slate-500">{trip.progress}%</span>
                                                    </div>
                                                </td>
                                                <td className="py-4.5 text-right">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase border
                            ${trip.alert
                                                            ? 'bg-amber-50 border-amber-200 text-amber-600'
                                                            : trip.status === 'Approaching'
                                                                ? 'bg-indigo-50 border-indigo-150 text-indigo-600'
                                                                : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                                        }
                          `}>
                                                        {trip.alert ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                                        {trip.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Telemetry Log Column */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-6">Operational Logs</h3>

                        <div className="flex flex-col gap-4">
                            {logs.map((log, idx) => (
                                <div key={idx} className="flex gap-3 text-xs leading-normal border-b border-slate-100 pb-3">
                                    <span className="font-mono text-slate-400 font-bold shrink-0">{log.time}</span>
                                    <span className={`font-semibold
                    ${log.type === 'danger'
                                            ? 'text-rose-600'
                                            : log.type === 'warn'
                                                ? 'text-amber-600'
                                                : 'text-slate-600'
                                        }
                  `}>{log.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors mt-6 cursor-pointer">
                        View Live Stream
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}
