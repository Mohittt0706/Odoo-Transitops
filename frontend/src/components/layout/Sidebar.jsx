import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Compass, Radio, Truck, ShieldAlert, DollarSign, MapPin,
    User, Settings, ArrowLeft
} from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard/operations', label: 'Operations Lead', icon: Radio, role: 'Mission Control' },
        { path: '/dashboard/captain', label: 'Road Captain', icon: Truck, role: 'Driver Cockpit' },
        { path: '/dashboard/safety', label: 'Safety Officer', icon: ShieldAlert, role: 'Safety Command' },
        { path: '/dashboard/finance', label: 'Finance Hub', icon: DollarSign, role: 'Finance Command' },
        { path: '/dashboard/destination', label: 'Arrival Hub', icon: MapPin, role: 'Arrival Control' },
    ];

    const secondaryItems = [
        { path: '/dashboard/profile', label: 'My Profile', icon: User },
        { path: '/dashboard/settings', label: 'Settings', icon: Settings },
        { path: '/', label: 'Back to Home', icon: ArrowLeft }
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen p-5 z-30 shrink-0">
            {/* Brand Header */}
            <div className="flex items-center gap-2.5 mb-8 px-2">
                <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                    <Compass className="h-5 w-5 animate-pulse-soft" />
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900">
                    Transit<span className="text-blue-600">Ops</span>
                </span>
            </div>

            {/* Navigation Group */}
            <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">
                    CONSOLE WORKSPACES
                </p>

                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link key={item.path} to={item.path} className="relative group">
                            <div className={`
                flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200
                ${isActive
                                    ? 'text-blue-600 bg-blue-50/70'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                                }
              `}>
                                <Icon className={`w-4.5 h-4.5 transition-transform group-hover:scale-105 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-650'}`} />
                                <div className="flex flex-col">
                                    <span>{item.label}</span>
                                    <span className={`text-[9px] font-medium mt-0.5 ${isActive ? 'text-blue-500/80' : 'text-slate-400 group-hover:text-slate-500'}`}>{item.role}</span>
                                </div>

                                {/* Active Indicator Pill */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-indicator"
                                        className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-600"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-1 border-t border-slate-100 pt-5 mt-auto">
                {secondaryItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200
                ${isActive
                                    ? 'text-blue-600 bg-blue-50/70'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                                }
              `}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
