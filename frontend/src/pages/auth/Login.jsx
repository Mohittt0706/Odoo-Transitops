import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, ShieldCheck, Mail, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Login() {
    const [role, setRole] = useState('operation-lead');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulate routing based on role selection
        if (role === 'operation-lead') {
            navigate('/dashboard/operations');
        } else if (role === 'road-captain') {
            navigate('/dashboard/captain');
        } else if (role === 'safety-officer') {
            navigate('/dashboard/safety');
        } else if (role === 'finance-hub') {
            navigate('/dashboard/finance');
        } else if (role === 'destination-control') {
            navigate('/dashboard/destination');
        }
    };

    return (
        <div className="text-center w-full max-w-sm mx-auto">
            {/* Brand Header */}
            <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-md">
                    <Compass className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                    Transit<span className="text-blue-500">Ops</span>
                </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-100 mb-1.5">Ops Console Access</h2>
            <p className="text-xs text-slate-400 mb-8">Select a role below to simulate immediate platform authorization.</p>

            <form onSubmit={handleLogin} className="flex flex-col gap-5 text-left">
                <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">
                        Select Simulator Persona
                    </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none cursor-pointer transition-colors"
                    >
                        <option value="operation-lead">Operations Lead (Mission Control)</option>
                        <option value="road-captain">Road Captain (Driver Cockpit)</option>
                        <option value="safety-officer">Safety Officer (Safety Command)</option>
                        <option value="finance-hub">Finance Hub (Finance Command)</option>
                        <option value="destination-control">Destination Control (Arrival Hub)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">
                        Simulator Credentials
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="email"
                            placeholder="demo@transitops.com"
                            disabled
                            className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-500 cursor-not-allowed outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full font-bold text-white bg-blue-600 hover:bg-blue-500 py-3.5 rounded-xl shadow-md transition-all duration-200 mt-2 cursor-pointer group"
                >
                    Authorize Portal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>

            <div className="mt-8 border-t border-slate-900 pt-6">
                <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-350 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Return to Landing Page
                </Link>
            </div>
        </div>
    );
}
