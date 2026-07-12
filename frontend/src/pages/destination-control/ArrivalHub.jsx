import React, { useState } from 'react';
import {
    Package, Timer, Layers, AlertTriangle,
    MapPin, CheckCircle, ArrowRight, Check, X
} from 'lucide-react';

export default function ArrivalHub() {
    const [incomingShipments] = useState([
        { id: 'SH-0192', source: 'Chicago Depot', carrier: 'TransitOps Express', eta: '10:15 AM', status: 'In Transit', cargo: 'Medical Supplies' },
        { id: 'SH-0185', source: 'Laredo Border', carrier: 'RedLine Freight', eta: '11:40 AM', status: 'Customs Hold', cargo: 'High-Value Electronics' },
        { id: 'SH-0199', source: 'Houston Terminal', carrier: 'Fleet Carrier 4', eta: '12:10 PM', status: 'Departed', cargo: 'Heavy Machining Parts' }
    ]);

    const [bays, setBays] = useState([
        { bay: 'Bay 1', status: 'Occupied (TX-8041)', type: 'occupied', detail: 'Unloading - 45% complete' },
        { bay: 'Bay 2', status: 'Occupied (FL-4821)', type: 'occupied', detail: 'Pre-check verification' },
        { bay: 'Bay 3', status: 'Available', type: 'free', detail: 'Empty' },
        { bay: 'Bay 4', status: 'Available', type: 'free', detail: 'Empty' },
        { bay: 'Bay 5', status: 'Available', type: 'free', detail: 'Empty' }
    ]);

    const [signedOff, setSignedOff] = useState(false);
    const [signatureName, setSignatureName] = useState('');

    const toggleBay = (index) => {
        setBays(prev => prev.map((b, idx) => {
            if (idx === index) {
                return b.type === 'occupied'
                    ? { bay: b.bay, status: 'Available', type: 'free', detail: 'Empty' }
                    : { bay: b.bay, status: 'Occupied (SIM-TRK)', type: 'occupied', detail: 'Unloading - Just docked' };
            }
            return b;
        }));
    };

    const activeBaysCount = bays.filter(b => b.type === 'free').length;

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            {/* Title block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Arrival Hub</h1>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Incoming warehouse manifests, docking bay assignments, and terminal queue trackers</p>
                </div>
                <span className="text-[10px] font-black uppercase bg-blue-50 border border-blue-100 text-blue-600 px-3 py-1.5 rounded-xl shadow-sm">
                    DOCK DOORS: {activeBaysCount} / 5 AVAILABLE
                </span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Expected Shipments', val: '18 Today', sub: '4 completed, 14 pending', icon: Package, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Average Turnaround', val: '28.4 mins', sub: 'Goal: Under 30 mins', icon: Timer, color: 'text-cyan-600 bg-cyan-50' },
                    { label: 'Bays Occupancy', val: `${Math.round(((5 - activeBaysCount) / 5) * 100)}% Active`, sub: `${5 - activeBaysCount} bays active`, icon: Layers, color: 'text-indigo-600 bg-indigo-50' },
                    { label: 'Carrier Delays', val: '1 Pending', sub: 'Laredo customs hold', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' }
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

            {/* Grid columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Table Column */}
                <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider">Incoming Shipment Schedule</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider pb-3">
                                        <th className="pb-3">Shipment ID</th>
                                        <th className="pb-3">Manifest Source</th>
                                        <th className="pb-3">Cargo Type</th>
                                        <th className="pb-3">ETA</th>
                                        <th className="pb-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {incomingShipments.map((ship) => (
                                        <tr key={ship.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4.5 text-xs font-black text-slate-900 font-mono">{ship.id}</td>
                                            <td className="py-4.5 text-xs text-slate-805 font-bold">{ship.source}</td>
                                            <td className="py-4.5 text-xs text-slate-500 font-semibold">{ship.cargo}</td>
                                            <td className="py-4.5 text-xs font-black text-blue-600 font-mono">{ship.eta}</td>
                                            <td className="py-4.5 text-right">
                                                <span className={`inline-flex px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase border
                          ${ship.status === 'Customs Hold'
                                                        ? 'bg-rose-50 border-rose-100 text-rose-600'
                                                        : 'bg-blue-50 border-blue-100 text-blue-600'
                                                    }
                        `}>
                                                    {ship.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Gate control allocation sidebar */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-2 uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-blue-600" />
                            Dock Doors Controller
                        </h3>
                        <p className="text-xs text-slate-400 font-semibold mb-6">Click any bay door button below to toggle its live occupancy status.</p>

                        <div className="flex flex-col gap-3">
                            {bays.map((b, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-slate-150 bg-slate-50/30">
                                    <div>
                                        <h4 className="text-xs font-black text-slate-900">{b.bay}</h4>
                                        <p className="text-[10px] text-slate-450 font-bold mt-0.5">{b.detail}</p>
                                    </div>

                                    <button
                                        onClick={() => toggleBay(idx)}
                                        className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-lg border transition-all cursor-pointer shadow-sm
                      ${b.type === 'occupied'
                                                ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100/50'
                                                : 'bg-emerald-50 border-emerald-150 text-emerald-600 hover:bg-emerald-100/50'
                                            }
                    `}
                                    >
                                        {b.type === 'occupied' ? 'Occupied' : 'Available'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Signature Confirmations Block */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Gate Receipt Digital Sign-off</h3>
                <p className="text-xs text-slate-400 font-semibold mb-6">Attest freight condition and release terminal load checklists.</p>

                {signedOff ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                        <div>
                            <h4 className="text-xs font-black">Digital Receipt Signed Off Successfully</h4>
                            <p className="text-[11px] text-emerald-800/80 font-bold mt-0.5">Signed by: {signatureName} on {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Type supervisor name..."
                            value={signatureName}
                            onChange={(e) => setSignatureName(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-all"
                        />
                        <button
                            onClick={() => {
                                if (signatureName.trim()) {
                                    setSignedOff(true);
                                }
                            }}
                            disabled={!signatureName.trim()}
                            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-all cursor-pointer font-bold inline-flex items-center gap-1.5"
                        >
                            Sign Receipt
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
