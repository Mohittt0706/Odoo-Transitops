import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import { motion } from "framer-motion";

const revenueVsExpenses = [
  { label: "Jan", value: 980000 },
  { label: "Feb", value: 1050000 },
  { label: "Mar", value: 1120000 },
  { label: "Apr", value: 1080000 },
  { label: "May", value: 1200000 },
  { label: "Jun", value: 1240000 },
];

const costPerKm = [
  { label: "Volvo FH16", value: 18.5 },
  { label: "Scania R450", value: 19.2 },
  { label: "Tata Prima", value: 21.0 },
  { label: "BharatBenz", value: 22.4 },
  { label: "Mahindra Blazo", value: 23.1 },
  { label: "Ashok Leyland", value: 24.8 },
  { label: "Eicher Pro", value: 26.5 },
  { label: "Isuzu FVR", value: 28.9 },
];

const profitabilityByClient = [
  { label: "Amazon India", value: 3450000 },
  { label: "Reliance Retail", value: 2800000 },
  { label: "Flipkart", value: 2200000 },
  { label: "Wipro", value: 1800000 },
  { label: "HUL", value: 1500000 },
  { label: "Tata Chemicals", value: 900000 },
];

const budgetUtilization = [
  { label: "Fuel", value: 88 },
  { label: "Maintenance", value: 72 },
  { label: "Salaries", value: 95 },
  { label: "Insurance", value: 100 },
  { label: "Toll & Parking", value: 65 },
  { label: "Admin", value: 45 },
];

export default function FinanceAnalytics() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader title="Analytics" subtitle="Financial analytics and insights" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue vs Expenses Trend">
          <SimpleBarChart data={revenueVsExpenses} />
        </ChartCard>
        <ChartCard title="Cost per KM Analysis">
          <SimpleBarChart data={costPerKm} />
        </ChartCard>
        <ChartCard title="Profitability by Client">
          <SimpleBarChart data={profitabilityByClient} />
        </ChartCard>
        <ChartCard title="Monthly Budget Utilization (%)">
          <SimpleBarChart data={budgetUtilization} />
        </ChartCard>
      </div>
    </motion.div>
  );
}
