import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Search, Bell, HelpCircle, ChevronDown, Radio,
    Truck, ShieldAlert, DollarSign, MapPin, Sparkles, Check
} from 'lucide-react';

export default function Topbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showRoleMenu, setShowRoleMenu] = useState(false);

    const roles = [
        { label: 'Operations Lead', role: 'Mission Control', path: '/dashboard/operations', icon: Radio, color: 'text-blue-600 bg-blue-50' },
        { label: 'Road Captain', role: 'Driver Cockpit', path: '/dashboard/captain', icon: Truck, color: 'text-cyan-600 bg-cyan-50' },
        { label: 'Safety Officer', role: 'Safety Command', path: '/dashboard/safety', icon: ShieldAlert, color: 'text-emerald-600 bg-emerald-50' },
        { label: 'Finance Hub', role: 'Finance Command', path: '/dashboard/finance', icon: DollarSign, color: 'text-indigo-600 bg-indigo-50' },
        { label: 'Destination Control', role: 'Arrival Hub', path: '/dashboard/destination', icon: MapPin, color: 'text-purple-600 bg-purple-50' },
    ];

    const currentRoleObj = roles.find(r => location.pathname === r.path) || roles[0];

    const getHeaderTitle = () => {
        const path = location.pathname.split('/').pop();
        if (!path || path === 'dashboard') return 'Control Panel';
        if (path === 'operations') return 'Mission Control';
        if (path === 'captain') return 'Driver Cockpit';
        if (path === 'safety') return 'Safety Command';
        if (path === 'finance') return 'Finance Command';
        if (path === 'destination') return 'Arrival Hub';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 text-slate-800 sticky top-0 z-40">
            {/* Left side: Breadcrumb & Title */}
            <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Console</span>
                <span className="text-slate-300">/</span>
                <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                    {getHeaderTitle()}
                </h2>
            </div>

            {/* Right side: Search, Role Switcher, Alerts, Profile */}
            <div className="flex items-center gap-6">
                {/* Quick Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search manifests, vehicles, telemetry..."
                        className="w-72 bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 outline-none transition-all"
                    />
                </div>

                {/* Interactive Role Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setShowRoleMenu(!showRoleMenu)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-sm transition-all cursor-pointer"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span className="hidden sm:inline">Role:</span>
                        <span className="text-slate-900 font-bold">{currentRoleObj.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {showRoleMenu && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowRoleMenu(false)} />
                            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-150 p-2 shadow-xl z-50 animate-fade-in">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1.5">Switch Operator Workspace</p>
                                <div className="flex flex-col gap-0.5">
                                    {roles.map((r) => {
                                        const isSelected = location.pathname === r.path;
                                        const Icon = r.icon;
                                        return (
                                            <button
                                                key={r.path}
                                                onClick={() => {
                                                    navigate(r.path);
                                                    setShowRoleMenu(false);
                                                }}
                                                className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer
                          ${isSelected
                                                        ? 'bg-blue-50/80 text-blue-600'
                                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                                    }
                        `}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`p-1.5 rounded-lg ${r.color}`}>
                                                        <Icon className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{r.label}</p>
                                                        <p className="text-[9px] text-slate-400 font-medium">{r.role}</p>
                                                    </div>
                                                </div>
                                                {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Notifications and Help Icons */}
                <div className="flex items-center gap-3">
                    <button className="relative p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all cursor-pointer">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all cursor-pointer">
                        <HelpCircle className="w-4 h-4" />
                    </button>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20">
                        JD
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-xs font-bold text-slate-900 leading-tight">John Doe</p>
                        <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">Ops Controller</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
