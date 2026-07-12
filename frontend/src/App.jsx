import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import AuthLayout from "./layouts/AuthLayout";
import DriverLayout from "./layouts/DriverLayout";
import LoginForm from "./components/forms/LoginForm";
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm";
import RoleSelectionPage from "./pages/auth/RoleSelectionPage";
import DashboardPlaceholder from "./pages/DashboardPlaceholder";

import DriverOverview from "./pages/drivers/DriverOverview";
import AllDrivers from "./pages/drivers/AllDrivers";
import RegisterDriver from "./pages/drivers/RegisterDriver";
import DriverProfile from "./pages/drivers/DriverProfile";
import EditDriver from "./pages/drivers/EditDriver";
import DriverDocuments from "./pages/drivers/DriverDocuments";
import DriverPerformance from "./pages/drivers/DriverPerformance";
import LicenseManagement from "./pages/drivers/LicenseManagement";
import DriverHistory from "./pages/drivers/DriverHistory";
import DriverSettings from "./pages/drivers/DriverSettings";

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
        <Route
          path="/"
          element={
            <AnimatedPage>
              <LandingPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedPage>
              <LoginPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AnimatedPage>
              <ForgotPasswordPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/role-selection"
          element={
            <AnimatedPage>
              <RoleSelectionPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/dashboard/:role"
          element={
            <AnimatedPage>
              <DashboardPlaceholder />
            </AnimatedPage>
          }
        />
        <Route path="/drivers" element={<DriverLayout />}>
          <Route index element={<DriverOverview />} />
          <Route path="overview" element={<DriverOverview />} />
          <Route path="all" element={<AllDrivers />} />
          <Route path="register" element={<RegisterDriver />} />
          <Route path="profile/:driverId" element={<DriverProfile />} />
          <Route path="edit/:driverId" element={<EditDriver />} />
          <Route path="documents" element={<DriverDocuments />} />
          <Route path="documents/:driverId" element={<DriverDocuments />} />
          <Route path="performance" element={<DriverPerformance />} />
          <Route path="performance/:driverId" element={<DriverPerformance />} />
          <Route path="licenses" element={<LicenseManagement />} />
          <Route path="history" element={<DriverHistory />} />
          <Route path="history/:driverId" element={<DriverHistory />} />
          <Route path="settings" element={<DriverSettings />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
