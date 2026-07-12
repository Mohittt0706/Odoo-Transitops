import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import AuthLayout from "./layouts/AuthLayout";
import LoginForm from "./components/forms/LoginForm";
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm";
import RoleSelectionPage from "./pages/auth/RoleSelectionPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";

import DriverOverview from "./pages/operation-lead/DriverOverview";
import AllDrivers from "./pages/operation-lead/AllDrivers";
import RegisterDriver from "./pages/operation-lead/RegisterDriver";
import DriverProfile from "./pages/operation-lead/DriverProfile";
import EditDriver from "./pages/operation-lead/EditDriver";
import DriverDocuments from "./pages/operation-lead/DriverDocuments";
import DriverPerformance from "./pages/operation-lead/DriverPerformance";
import LicenseManagement from "./pages/operation-lead/LicenseManagement";
import DriverHistory from "./pages/operation-lead/DriverHistory";
import DriverSettings from "./pages/operation-lead/DriverSettings";

import Navbar from "./components/landing/Navbar";
import HeroSection from "./components/landing/HeroSection";
import TrustedCompanies from "./components/landing/TrustedCompanies";
import FleetStatistics from "./components/landing/FleetStatistics";
import Features from "./components/landing/Features";
import Workflow from "./components/landing/Workflow";
import RoleCards from "./components/landing/RoleCards";
import WhyChoose from "./components/landing/WhyChoose";
import DashboardPreview from "./components/landing/DashboardPreview";
import Testimonials from "./components/landing/Testimonials";
import FAQ from "./components/landing/FAQ";
import Footer from "./components/landing/Footer";
import { ArrowRight } from "lucide-react";

import OperationsDashboard from "./pages/operation-lead/OperationsDashboard";
import FleetLayout from "./layouts/FleetLayout";
import VehicleOverview from "./pages/operation-lead/fleet/VehicleOverview";
import AllVehicles from "./pages/operation-lead/fleet/AllVehicles";
import RegisterVehicle from "./pages/operation-lead/fleet/RegisterVehicle";
import VehicleDetails from "./pages/operation-lead/fleet/VehicleDetails";
import EditVehicle from "./pages/operation-lead/fleet/EditVehicle";
import VehicleDocuments from "./pages/operation-lead/fleet/VehicleDocuments";
import VehicleAnalytics from "./pages/operation-lead/fleet/VehicleAnalytics";
import VehicleHistory from "./pages/operation-lead/fleet/VehicleHistory";
import FleetStatus from "./pages/operation-lead/fleet/FleetStatus";
import VehicleSettings from "./pages/operation-lead/fleet/VehicleSettings";
import VehiclesPage from "./pages/operation-lead/VehiclesPage";
import DriversPage from "./pages/operation-lead/DriversPage";
import TripsPage from "./pages/operation-lead/TripsPage";
import AssignmentsPage from "./pages/operation-lead/AssignmentsPage";
import MaintenancePage from "./pages/operation-lead/MaintenancePage";
import ReportsPage from "./pages/operation-lead/ReportsPage";
import AnalyticsPage from "./pages/operation-lead/AnalyticsPage";
import OperationsNotifications from "./pages/operation-lead/OperationsNotifications";
import OperationsSettings from "./pages/operation-lead/OperationsSettings";

import RoadCaptainDashboard from "./pages/road-captain/RoadCaptainDashboard";
import MyTripsPage from "./pages/road-captain/MyTripsPage";
import TripHistoryPage from "./pages/road-captain/TripHistoryPage";
import AssignedVehiclePage from "./pages/road-captain/AssignedVehiclePage";
import NavigationPage from "./pages/road-captain/NavigationPage";
import FuelLogsPage from "./pages/road-captain/FuelLogsPage";
import DocumentsPage from "./pages/road-captain/DocumentsPage";
import EmergencyPage from "./pages/road-captain/EmergencyPage";
import RoadCaptainProfile from "./pages/road-captain/RoadCaptainProfile";
import RoadCaptainSettings from "./pages/road-captain/RoadCaptainSettings";

import SafetyDashboard from "./pages/safety-officer/SafetyDashboard";
import SafetyDriversPage from "./pages/safety-officer/SafetyDriversPage";
import CompliancePage from "./pages/safety-officer/CompliancePage";
import LicensesPage from "./pages/safety-officer/LicensesPage";
import IncidentsPage from "./pages/safety-officer/IncidentsPage";
import TrainingPage from "./pages/safety-officer/TrainingPage";
import InspectionsPage from "./pages/safety-officer/InspectionsPage";
import SafetyReportsPage from "./pages/safety-officer/SafetyReportsPage";
import SafetySettings from "./pages/safety-officer/SafetySettings";

import FinanceDashboard from "./pages/finance-hub/FinanceDashboard";
import ExpensesPage from "./pages/finance-hub/ExpensesPage";
import FuelCostPage from "./pages/finance-hub/FuelCostPage";
import MaintenanceCostPage from "./pages/finance-hub/MaintenanceCostPage";
import RevenuePage from "./pages/finance-hub/RevenuePage";
import ROIPage from "./pages/finance-hub/ROIPage";
import InvoicesPage from "./pages/finance-hub/InvoicesPage";
import FinanceReportsPage from "./pages/finance-hub/FinanceReportsPage";
import FinanceAnalytics from "./pages/finance-hub/FinanceAnalytics";
import FinanceSettings from "./pages/finance-hub/FinanceSettings";

import DestinationDashboard from "./pages/destination-control/DestinationDashboard";
import IncomingDeliveriesPage from "./pages/destination-control/IncomingDeliveriesPage";
import CompletedDeliveriesPage from "./pages/destination-control/CompletedDeliveriesPage";
import WarehousePage from "./pages/destination-control/WarehousePage";
import InventoryPage from "./pages/destination-control/InventoryPage";
import ReceiversPage from "./pages/destination-control/ReceiversPage";
import ProofOfDeliveryPage from "./pages/destination-control/ProofOfDeliveryPage";
import DestinationReportsPage from "./pages/destination-control/DestinationReportsPage";
import DestinationSettings from "./pages/destination-control/DestinationSettings";

function LandingPage() {
  return (
    <div className="bg-neutral-light min-h-screen text-neutral-textMain flex flex-col font-sans">
      <Navbar />
      <HeroSection />
      <TrustedCompanies />
      <FleetStatistics />
      <Features />
      <Workflow />
      <RoleCards />
      <WhyChoose />
      <DashboardPreview />
      <Testimonials />
      <FAQ />
      <section className="py-20 bg-white border-b border-neutral-border relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center gap-6 relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-headings tracking-tight text-neutral-textMain max-w-2xl leading-tight">
            Transform Your Fleet Operations Today
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
            Authorize your TransitOps Odoo integration keys and start dispatching
            certified operators on optimized route plans in minutes.
          </p>
          <div className="flex items-center gap-3.5 flex-wrap justify-center mt-2">
            <a href="/login" className="btn btn-primary px-8 py-3.5 text-sm shadow-soft-sm">
              Start Free Trial
            </a>
            <a href="/login" className="btn btn-secondary px-8 py-3.5 text-sm flex items-center gap-1.5">
              Request Live Demo <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}

function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><LandingPage /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
        <Route path="/forgot-password" element={<AnimatedPage><ForgotPasswordPage /></AnimatedPage>} />
        <Route path="/role-selection" element={<AnimatedPage><RoleSelectionPage /></AnimatedPage>} />

        <Route path="/dashboard/operations" element={<DashboardLayout role="operations" />}>
          <Route index element={<OperationsDashboard />} />
          <Route path="fleet" element={<FleetLayout />}>
            <Route index element={<VehicleOverview />} />
            <Route path="all" element={<AllVehicles />} />
            <Route path="register" element={<RegisterVehicle />} />
            <Route path="details/:id" element={<VehicleDetails />} />
            <Route path="edit/:id" element={<EditVehicle />} />
            <Route path="documents" element={<VehicleDocuments />} />
            <Route path="analytics" element={<VehicleAnalytics />} />
            <Route path="history" element={<VehicleHistory />} />
            <Route path="status" element={<FleetStatus />} />
            <Route path="settings" element={<VehicleSettings />} />
          </Route>
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<OperationsNotifications />} />
          <Route path="settings" element={<OperationsSettings />} />
        </Route>

        <Route path="/dashboard/road-captain" element={<DashboardLayout role="road-captain" />}>
          <Route index element={<RoadCaptainDashboard />} />
          <Route path="my-trips" element={<MyTripsPage />} />
          <Route path="trip-history" element={<TripHistoryPage />} />
          <Route path="assigned-vehicle" element={<AssignedVehiclePage />} />
          <Route path="navigation" element={<NavigationPage />} />
          <Route path="fuel-logs" element={<FuelLogsPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="emergency" element={<EmergencyPage />} />
          <Route path="profile" element={<RoadCaptainProfile />} />
          <Route path="settings" element={<RoadCaptainSettings />} />
        </Route>

        <Route path="/dashboard/safety" element={<DashboardLayout role="safety" />}>
          <Route index element={<SafetyDashboard />} />
          <Route path="drivers" element={<SafetyDriversPage />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="licenses" element={<LicensesPage />} />
          <Route path="incidents" element={<IncidentsPage />} />
          <Route path="training" element={<TrainingPage />} />
          <Route path="inspections" element={<InspectionsPage />} />
          <Route path="reports" element={<SafetyReportsPage />} />
          <Route path="settings" element={<SafetySettings />} />
        </Route>

        <Route path="/dashboard/finance" element={<DashboardLayout role="finance" />}>
          <Route index element={<FinanceDashboard />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="fuel-cost" element={<FuelCostPage />} />
          <Route path="maintenance-cost" element={<MaintenanceCostPage />} />
          <Route path="revenue" element={<RevenuePage />} />
          <Route path="roi" element={<ROIPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="reports" element={<FinanceReportsPage />} />
          <Route path="analytics" element={<FinanceAnalytics />} />
          <Route path="settings" element={<FinanceSettings />} />
        </Route>

        <Route path="/dashboard/destination" element={<DashboardLayout role="destination" />}>
          <Route index element={<DestinationDashboard />} />
          <Route path="incoming" element={<IncomingDeliveriesPage />} />
          <Route path="completed" element={<CompletedDeliveriesPage />} />
          <Route path="warehouse" element={<WarehousePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="receivers" element={<ReceiversPage />} />
          <Route path="proof-of-delivery" element={<ProofOfDeliveryPage />} />
          <Route path="reports" element={<DestinationReportsPage />} />
          <Route path="settings" element={<DestinationSettings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
