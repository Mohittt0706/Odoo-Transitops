import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import SimpleBarChart from "../../components/charts/BarChart";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, Fuel, Truck, BarChart3, Download, CheckCircle, FileText } from "lucide-react";

const expenseBreakdown = [
  { name: "Fuel", value: 35 },
  { name: "Maintenance", value: 25 },
  { name: "Insurance", value: 18 },
  { name: "Salaries", value: 15 },
  { name: "Other", value: 7 },
];

const revenueGrowth = [
  { label: "Jan", value: 980000 },
  { label: "Feb", value: 1050000 },
  { label: "Mar", value: 1120000 },
  { label: "Apr", value: 1080000 },
  { label: "May", value: 1200000 },
  { label: "Jun", value: 1240000 },
];

const roiData = [
  { label: "Volvo FH16", value: 32 },
  { label: "Scania R450", value: 28 },
  { label: "Tata Prima", value: 26 },
  { label: "BharatBenz", value: 24 },
  { label: "Mahindra Blazo", value: 22 },
  { label: "Isuzu FVR", value: 8 },
];

export default function FinanceDashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader title="Finance Command" subtitle="Financial overview and profitability" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <KPICard title="Total Revenue" value="₹72.4L" change="12%" trend="up" icon={<IndianRupee className="w-5 h-5" />} />
        <KPICard title="Net Profit" value="₹18.6L" change="8%" trend="up" icon={<TrendingUp className="w-5 h-5" />} />
        <KPICard title="Total Expenses" value="₹53.8L" change="5%" trend="up" icon={<BarChart3 className="w-5 h-5" />} />
        <KPICard title="Fuel Cost" value="₹12.4L" change="3%" trend="down" icon={<Fuel className="w-5 h-5" />} />
        <KPICard title="Vehicle ROI" value="24.8%" change="2%" trend="up" icon={<Truck className="w-5 h-5" />} />
        <KPICard title="Monthly Spend" value="₹8.9L" change="0%" trend="neutral" icon={<IndianRupee className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard title="Expense Breakdown">
          <DonutChart data={expenseBreakdown} />
        </ChartCard>
        <ChartCard title="Revenue Growth">
          <SimpleBarChart data={revenueGrowth} />
        </ChartCard>
        <ChartCard title="ROI Analysis">
          <SimpleBarChart data={roiData} />
        </ChartCard>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <CheckCircle className="w-4 h-4" /> Approve Expense
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            <FileText className="w-4 h-4" /> Generate Financial Report
          </button>
        </div>
      </div>
    </motion.div>
  );
}
