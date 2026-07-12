import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import ChartCard from "../../components/ui/ChartCard";
import SimpleBarChart from "../../components/ui/SimpleBarChart";
import { motion } from "framer-motion";
import { TrendingUp, Trophy, AlertTriangle, BarChart3 } from "lucide-react";

const roiPerVehicle = [
  { label: "Volvo FH16", value: 32 },
  { label: "Scania R450", value: 28 },
  { label: "Tata Prima", value: 26 },
  { label: "BharatBenz", value: 24 },
  { label: "Mahindra Blazo", value: 22 },
  { label: "Ashok Leyland", value: 20 },
  { label: "Eicher Pro", value: 18 },
  { label: "Tata Ultra", value: 15 },
  { label: "AMW 2523", value: 12 },
  { label: "Isuzu FVR", value: 8 },
];

const roiBreakdown = [
  { vehicle: "Volvo FH16", investment: "₹45.0L", returns: "₹59.4L", roi: "32%", status: "Excellent" },
  { vehicle: "Scania R450", investment: "₹42.0L", returns: "₹53.8L", roi: "28%", status: "Excellent" },
  { vehicle: "Tata Prima 4040.S", investment: "₹38.0L", returns: "₹47.9L", roi: "26%", status: "Good" },
  { vehicle: "BharatBenz 2528", investment: "₹35.0L", returns: "₹43.4L", roi: "24%", status: "Good" },
  { vehicle: "Mahindra Blazo X25", investment: "₹32.0L", returns: "₹39.0L", roi: "22%", status: "Good" },
  { vehicle: "Ashok Leyland 4220", investment: "₹30.0L", returns: "₹36.0L", roi: "20%", status: "Average" },
  { vehicle: "Eicher Pro 6036", investment: "₹28.0L", returns: "₹33.0L", roi: "18%", status: "Average" },
  { vehicle: "Tata Ultra 1918", investment: "₹22.0L", returns: "₹25.3L", roi: "15%", status: "Below Avg" },
  { vehicle: "AMW 2523", investment: "₹25.0L", returns: "₹28.0L", roi: "12%", status: "Below Avg" },
  { vehicle: "Isuzu FVR", investment: "₹20.0L", returns: "₹21.6L", roi: "8%", status: "Poor" },
];

export default function ROIPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader title="ROI Analysis" subtitle="Return on investment by vehicle" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Overall ROI" value="24.8%" change="2%" trend="up" icon={<TrendingUp className="w-5 h-5" />} />
        <KPICard title="Best Vehicle" value="Volvo FH16 - 32%" change="3%" trend="up" icon={<Trophy className="w-5 h-5" />} />
        <KPICard title="Worst Vehicle" value="Isuzu FVR - 8%" change="1%" trend="down" icon={<AlertTriangle className="w-5 h-5" />} />
        <KPICard title="Fleet Average" value="24.8%" change="2%" trend="up" icon={<BarChart3 className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="ROI Per Vehicle">
          <SimpleBarChart data={roiPerVehicle} />
        </ChartCard>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Breakdown by Vehicle</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Vehicle</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Investment</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Returns</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">ROI</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {roiBreakdown.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-900">{row.vehicle}</td>
                    <td className="py-3 px-2 text-gray-600">{row.investment}</td>
                    <td className="py-3 px-2 text-gray-600">{row.returns}</td>
                    <td className="py-3 px-2 text-emerald-600 font-semibold">{row.roi}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.status === "Excellent" ? "bg-emerald-100 text-emerald-700" :
                        row.status === "Good" ? "bg-blue-100 text-blue-700" :
                        row.status === "Average" ? "bg-yellow-100 text-yellow-700" :
                        row.status === "Below Avg" ? "bg-orange-100 text-orange-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
