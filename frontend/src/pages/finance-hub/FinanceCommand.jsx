import React, { useState } from 'react';
import {
    DollarSign, TrendingUp, Download, Plus,
    CreditCard, Wrench, X, Check
} from 'lucide-react';
import { AreaChart } from '../../components/charts/SvgCharts';

export default function FinanceCommand() {
    const [expenseLogs, setExpenseLogs] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ vehicle: '', item: '', category: 'Fuel Card', cost: '' });
    const [formError, setFormError] = useState('');

    // Revenue chart data (last 7 days)
    const chartData = [];

    const distribution = [];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!form.vehicle || !form.item || !form.cost) {
            setFormError('Please fill out all fields.');
            return;
        }

        const newLog = {
            id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            vehicle: form.vehicle.toUpperCase(),
            item: form.item,
            category: form.category,
            cost: `$${parseFloat(form.cost).toFixed(2)}`
        };

        setExpenseLogs(prev => [newLog, ...prev]);
        setShowModal(false);
        setForm({ vehicle: '', item: '', category: 'Fuel Card', cost: '' });
        setFormError('');
    };

    return (
        <div className="flex flex-col gap-6 animate-fade-in relative">
            {/* Title Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Finance Command Center</h1>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Logistics cost accounting, corporate fuel cards, and operational ROI audits</p>
                </div>
                <div className="flex gap-2.5">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer">
                        <Download className="w-4 h-4 text-slate-400" />
                        Export CSV
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4.5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Record Invoice
                    </button>
                </div>
            </div>

            {/* KPI stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Total Revenue (MTD)', val: '$184,302', sub: '+15.2% vs last month', icon: DollarSign, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Fuel Card Spend', val: '$32,940', sub: 'Under budget by 4.0%', icon: CreditCard, color: 'text-cyan-600 bg-cyan-50' },
                    { label: 'Maintenance Cost MTD', val: '$12,405', sub: '8 invoices pending', icon: Wrench, color: 'text-amber-600 bg-amber-50' },
                    { label: 'Operating Profit Margin', val: '22.8%', sub: 'Peak performance tier', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' }
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

            {/* Interactive Revenue Chart Row */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Revenue Stream Forecast</h3>
                        <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Last 7 days operational billing margins</p>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase bg-emerald-50 border border-emerald-100 text-emerald-600 px-2 py-0.5 rounded">Upward trend active</span>
                </div>
                <AreaChart data={chartData} strokeColor="#2563eb" fillGradient="url(#blueGrad)" />
            </div>

            {/* Grid columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Expenditure Logs Table */}
                <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider">Expenditures Manifest</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider pb-3">
                                        <th className="pb-3">Log ID</th>
                                        <th className="pb-3">Date</th>
                                        <th className="pb-3">Tractor</th>
                                        <th className="pb-3">Description</th>
                                        <th className="pb-3">Category</th>
                                        <th className="pb-3 text-right">Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {expenseLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 text-xs font-black text-slate-900 font-mono">{log.id}</td>
                                            <td className="py-4 text-xs text-slate-500 font-semibold">{log.date}</td>
                                            <td className="py-4 text-xs font-black text-slate-700 font-mono">{log.vehicle}</td>
                                            <td className="py-4 text-xs text-slate-600 font-semibold">{log.item}</td>
                                            <td className="py-4">
                                                <span className={`inline-flex px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border
                          ${log.category === 'Fuel Card'
                                                        ? 'bg-blue-50 border-blue-100 text-blue-600'
                                                        : log.category === 'Maintenance'
                                                            ? 'bg-amber-50 border-amber-150 text-amber-600'
                                                            : 'bg-slate-50 border-slate-200 text-slate-550'
                                                    }
                        `}>
                                                    {log.category}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right text-xs font-black text-slate-800 font-mono">{log.cost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Budget Distribution Visual */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-wider">Expense Distribution</h3>

                        <div className="flex flex-col gap-5">
                            {distribution.map((dist, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-semibold text-slate-600">{dist.label}</span>
                                        <span className="font-bold font-mono text-slate-900">{dist.val} ({dist.pct})</span>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${dist.color}`} style={{ width: dist.pct }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer">
                        Run Margin Auditing
                    </button>
                </div>
            </div>

            {/* Interactive Floating Invoice Recorder Form Modal */}
            {showModal && (
                <>
                    <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 transition-opacity" onClick={() => setShowModal(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl z-55 animate-fade-in mx-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Record New Invoice</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {formError && (
                            <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold rounded-lg">
                                {formError}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Tractor Unit ID</label>
                                <input
                                    type="text"
                                    name="vehicle"
                                    placeholder="e.g. TX-8041"
                                    value={form.vehicle}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Invoice Description</label>
                                <input
                                    type="text"
                                    name="item"
                                    placeholder="e.g. Fuel Refuel (Pilot, Waco)"
                                    value={form.item}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-slate-700 outline-none transition-all cursor-pointer"
                                    >
                                        <option value="Fuel Card">Fuel Card</option>
                                        <option value="Maintenance">Maintenance</option>
                                        <option value="Tolls">Tolls</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Cost Amount ($)</label>
                                    <input
                                        type="number"
                                        name="cost"
                                        step="0.01"
                                        placeholder="e.g. 142.50"
                                        value={form.cost}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-colors cursor-pointer"
                                >
                                    Save Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
