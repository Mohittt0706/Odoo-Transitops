import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/reports/StatCard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/PieChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import { Wallet, Fuel, Wrench, Shield, Users, Car, CircleDollarSign, Wrench as Repair, Receipt, PiggyBank } from "lucide-react";
import { operationalCostBreakdown, monthlyExpenses, departmentSpending } from "../../data/reportData";

export default function OperationalCost() {
  const totalCost = operationalCostBreakdown.reduce((s, d) => s + d.value, 0);

  const costCategories = [
    { label: "Fuel Cost", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Fuel').value / 100000).toFixed(1)}L`, icon: Fuel, change: "+5.8%", changeType: "up", color: "bg-rose-50 text-rose-600", delay: 0 },
    { label: "Maintenance", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Maintenance').value / 100000).toFixed(1)}L`, icon: Wrench, change: "+4.2%", changeType: "up", color: "bg-amber-50 text-amber-600", delay: 0.02 },
    { label: "Insurance", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Insurance').value / 100000).toFixed(1)}L`, icon: Shield, change: "+2.1%", changeType: "up", color: "bg-indigo-50 text-indigo-600", delay: 0.04 },
    { label: "Driver Salary", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Driver Salary').value / 100000).toFixed(1)}L`, icon: Users, change: "+6.5%", changeType: "up", color: "bg-emerald-50 text-emerald-600", delay: 0.06 },
    { label: "Parking", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Parking').value / 100000).toFixed(1)}L`, icon: Car, change: "+1.2%", changeType: "up", color: "bg-cyan-50 text-cyan-600", delay: 0.08 },
    { label: "Toll Charges", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Toll Charges').value / 100000).toFixed(1)}L`, icon: CircleDollarSign, change: "+3.5%", changeType: "up", color: "bg-purple-50 text-purple-600", delay: 0.1 },
    { label: "Repair Cost", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Repairs').value / 100000).toFixed(1)}L`, icon: Repair, change: "+2.8%", changeType: "up", color: "bg-pink-50 text-pink-600", delay: 0.12 },
    { label: "Taxes", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Taxes').value / 100000).toFixed(1)}L`, icon: Receipt, change: "+1.5%", changeType: "up", color: "bg-teal-50 text-teal-600", delay: 0.14 },
    { label: "Miscellaneous", value: `₹${(operationalCostBreakdown.find(d => d.category === 'Miscellaneous').value / 100000).toFixed(1)}L`, icon: PiggyBank, change: "-0.5%", changeType: "down", color: "bg-slate-50 text-slate-600", delay: 0.16 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Operational Cost"
        subtitle="Detailed cost breakdown and expense analysis across all categories"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-9 gap-3 mb-5">
        {costCategories.map((cat) => (
          <StatCard key={cat.label} title={cat.label} value={cat.value} icon={cat.icon} change={cat.change} changeType={cat.changeType} color={cat.color} delay={cat.delay} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Expense Breakdown" subtitle="Total: ₹{(totalCost / 100000).toFixed(1)}L" delay={0.2}
          actions={<TrendIndicator value="+4.2% vs LY" type="up" />}
        >
          <DonutChart data={operationalCostBreakdown} size={140} thickness={16} showTotal={false} />
        </ChartCard>

        <ChartCard title="Monthly Cost Trend" subtitle="Last 12 months" delay={0.25}
          actions={<TrendIndicator value="+3.2%" type="up" />}
        >
          <AreaChart data={monthlyExpenses.map(d => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#DC2626" height={180} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Operational Trend" subtitle="Monthly by category" delay={0.3}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-border">
                  <th className="text-left px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Month</th>
                  <th className="text-right px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Fuel</th>
                  <th className="text-right px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Maint</th>
                  <th className="text-right px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Salary</th>
                  <th className="text-right px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Other</th>
                  <th className="text-right px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Total</th>
                </tr>
              </thead>
              <tbody>
                {monthlyExpenses.slice(-6).map((d, i) => (
                  <motion.tr
                    key={d.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.03 }}
                    className="border-b border-neutral-border/50 hover:bg-accent-light transition-colors"
                  >
                    <td className="px-2 py-2.5 font-bold text-neutral-textMain">{d.label}</td>
                    <td className="px-2 py-2.5 text-right font-semibold tabular-nums">₹{(d.fuel / 1000).toFixed(0)}K</td>
                    <td className="px-2 py-2.5 text-right font-semibold tabular-nums">₹{(d.maintenance / 1000).toFixed(0)}K</td>
                    <td className="px-2 py-2.5 text-right font-semibold tabular-nums">₹{(d.salary / 1000).toFixed(0)}K</td>
                    <td className="px-2 py-2.5 text-right font-semibold tabular-nums">₹{(d.other / 1000).toFixed(0)}K</td>
                    <td className="px-2 py-2.5 text-right font-bold text-neutral-textMain tabular-nums">₹{(d.value / 1000).toFixed(0)}K</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard title="Department Spending" subtitle="Cost by department" delay={0.35}
          actions={<TrendIndicator value="Transport: 32%" type="up" />}
        >
          <SimpleBarChart data={departmentSpending.map(d => ({ label: d.department || d.province, value: Math.round(d.value / 1000) }))} color="#1E3A5F" height={180} />
        </ChartCard>
      </div>

      {/* Savings Opportunities */}
      <ChartCard title="Cost Saving Opportunities" subtitle="Identified areas for optimization" delay={0.4}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Fuel Optimization", saving: "₹85,000/yr", desc: "Route optimization could reduce fuel consumption by 8%", icon: Fuel, color: "bg-rose-50 text-rose-600" },
            { title: "Maintenance Schedule", saving: "₹52,000/yr", desc: "Preventive maintenance reduces emergency repairs by 15%", icon: Wrench, color: "bg-amber-50 text-amber-600" },
            { title: "Insurance Review", saving: "₹28,000/yr", desc: "Fleet-wide policy negotiation could lower premiums", icon: Shield, color: "bg-indigo-50 text-indigo-600" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.05 }}
              className="p-4 rounded-xl border border-neutral-border hover:shadow-soft-sm transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", item.color)}>
                  <item.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-textMain">{item.title}</p>
                  <p className="text-xs font-bold text-success">{item.saving}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-textMuted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
