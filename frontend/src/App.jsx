import React from 'react';
import Navbar from './components/landing/Navbar';
import HeroSection from './components/landing/HeroSection';
import TrustedCompanies from './components/landing/TrustedCompanies';
import FleetStatistics from './components/landing/FleetStatistics';
import Features from './components/landing/Features';
import Workflow from './components/landing/Workflow';
import RoleCards from './components/landing/RoleCards';
import WhyChoose from './components/landing/WhyChoose';
import DashboardPreview from './components/landing/DashboardPreview';
import Testimonials from './components/landing/Testimonials';
import FAQ from './components/landing/FAQ';
import Footer from './components/landing/Footer';
import { ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <div className="bg-neutral-light min-h-screen text-neutral-textMain flex flex-col font-sans">
      
      {/* 1. Header Navigation Bar */}
      <Navbar />

      {/* 2. Hero Presentation */}
      <HeroSection />

      {/* 3. Social Proofing Badges */}
      <TrustedCompanies />

      {/* 4. Fleet Telematics statistics */}
      <FleetStatistics />

      {/* 5. Feature capability blocks */}
      <Features />

      {/* 6. Integration timeline checklist */}
      <Workflow />

      {/* 7. Workspace role showcases */}
      <RoleCards />

      {/* 8. Central benefits lists */}
      <WhyChoose />

      {/* 9. Live operations control preview */}
      <DashboardPreview />

      {/* 10. Customer reviews boards */}
      <Testimonials />

      {/* 11. Platform FAQs dropdowns */}
      <FAQ />

      {/* 12. Final Call-to-Action panel */}
      <section className="py-20 bg-white border-b border-neutral-border relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center gap-6 relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-headings tracking-tight text-neutral-textMain max-w-2xl leading-tight">
            Transform Your Fleet Operations Today
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
            Authorize your TransitOps Odoo integration keys and start dispatching certified operators on optimized route plans in minutes.
          </p>
          <div className="flex items-center gap-3.5 flex-wrap justify-center mt-2">
            <button className="btn btn-primary px-8 py-3.5 text-sm shadow-soft-sm">
              Start Free Trial
            </button>
            <button className="btn btn-secondary px-8 py-3.5 text-sm flex items-center gap-1.5">
              Request Live Demo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 13. System Footer info */}
      <Footer />

    </div>
  );
}
