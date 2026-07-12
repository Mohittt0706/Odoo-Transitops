import React, { useState } from 'react';
import {
    ShieldCheck, AlertOctagon, UserX, Clock,
    TrafficCone, Award, ArrowUpRight, HelpCircle, CheckCircle
} from 'lucide-react';

export default function SafetyCommand() {
    const [complianceAlerts, setComplianceAlerts] = useState([]);

    const [telematicsAlerts, setTelematicsAlerts] = useState([]);

    const resolveCompliance = (id) => {
        setComplianceAlerts(prev => prev.map(item => item.id === id ? { ...item, resolved: true } : item));
    };

    const resolveTelematics = (id) => {
        setTelematicsAlerts(prev => prev.map(item => item.id === id ? { ...item, resolved: true } : item));
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            {/* Title */}
            <div className="border-b border-slate-100 pb-5">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Safety Command Center</h1>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">FMCSA safety ratings, Hours of Service compliance monitoring, and driver audits</p>
            </div>

            {/* Safety Scores KPI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Safety Compliance Index', val: '98.4%', sub: 'Target: 95.0%', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Pending Violations', val: '0 Active', sub: 'No DOT holds', icon: AlertOctagon, color: 'text-emerald-600 bg-emerald-50' },
                    { label: 'Active Driver Audits', val: '1 Auditing', sub: 'Due in 4 days', icon: UserX, color: 'text-amber-600 bg-amber-50' },
                    { label: 'ELD Sync Rate', val: '100.0%', sub: 'All ELDs communicating', icon: Clock, color: 'text-blue-600 bg-blue-50' }
                ].map((score, idx) => {
                    const Icon = score.icon;
                    return (
                        <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-350 hover:shadow-sm transition-all duration-200 group">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[9px] font-bold text-slate-455 tracking-wider uppercase">{score.label}</span>
                                <div className={`p-1.5 rounded-lg transition-transform group-hover:scale-105 ${score.color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 font-mono mb-1">{score.val}</h3>
                            <p className="text-[10px] text-slate-400 font-bold">{score.sub}</p>
                        </div>
                    );
                })}
            </div>

            {/* Two columns layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Compliance warnings */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                            <TrafficCone className="w-4 h-4 text-amber-500 animate-bounce-slow" />
                            Compliance & Licensing Audits
                        </h3>

                        <div className="flex flex-col gap-4">
                            {complianceAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`flex justify-between items-center p-4 rounded-xl border transition-all
                    ${alert.resolved
                                            ? 'bg-slate-50/40 border-slate-200/50 opacity-60'
                                            : 'bg-slate-50/60 border-slate-150 hover:border-slate-350'
                                        }
                  `}
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border
                        ${alert.resolved
                                                    ? 'bg-slate-100 border-slate-200 text-slate-400'
                                                    : alert.priority === 'Critical'
                                                        ? 'bg-rose-50 border-rose-100 text-rose-600'
                                                        : alert.priority === 'High'
                                                            ? 'bg-amber-50 border-amber-100 text-amber-600'
                                                            : 'bg-blue-50 border-blue-100 text-blue-600'
                                                }
                      `}>
                                                {alert.resolved ? 'Resolved' : alert.priority}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-400 font-mono">{alert.type}</span>
                                        </div>
                                        <h4 className={`text-xs font-black ${alert.resolved ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{alert.driver}</h4>
                                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{alert.issue}</p>
                                    </div>

                                    {!alert.resolved && (
                                        <button
                                            onClick={() => resolveCompliance(alert.id)}
                                            className="text-[10px] font-black text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
                                        >
                                            Resolve
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer">
                        Run Custom Compliance Audit
                    </button>
                </div>

                {/* Telematics Incidents */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                            <Award className="w-4 h-4 text-blue-600" />
                            Active Telematics Logs
                        </h3>

                        <div className="flex flex-col gap-4">
                            {telematicsAlerts.map((inc) => (
                                <div
                                    key={inc.id}
                                    className={`p-4 rounded-xl border flex justify-between items-start transition-all
                    ${inc.resolved
                                            ? 'bg-slate-50/40 border-slate-200/50 opacity-60'
                                            : 'bg-slate-50/60 border-slate-150 hover:border-slate-350'
                                        }
                  `}
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-[9px] font-black text-slate-400 font-mono">{inc.id}</span>
                                            <span className="text-[9px] text-slate-400 font-semibold">• {inc.time}</span>
                                        </div>
                                        <h4 className={`text-xs font-black ${inc.resolved ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                            {inc.driver} <span className="font-semibold text-slate-450 text-[10px]">({inc.type})</span>
                                        </h4>
                                        <p className="text-[10px] text-slate-400 font-semibold mt-1">Severity: <span className="text-slate-600 font-bold">{inc.severity}</span></p>
                                    </div>

                                    {!inc.resolved ? (
                                        <button
                                            onClick={() => resolveTelematics(inc.id)}
                                            className="text-[10px] font-black text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm mt-0.5"
                                        >
                                            Acknowledge
                                        </button>
                                    ) : (
                                        <span className="text-[9px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded flex items-center gap-1 mt-0.5">
                                            <CheckCircle className="w-3 h-3" />
                                            Noted
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer">
                        Export Driver Safety Scores
                    </button>
                </div>
            </div>
        </div>
    );
}
