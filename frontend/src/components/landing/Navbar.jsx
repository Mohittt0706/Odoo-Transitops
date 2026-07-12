import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Roles', href: '#roles' },
    { label: 'About', href: '#footer' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-white/95 border-b border-neutral-border shadow-soft-sm' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-soft-sm">
            <Shield className="w-5.5 h-5.5 fill-current" />
          </div>
          <div>
            <span className="font-headings font-extrabold text-xl tracking-tight text-neutral-textMain">
              Transit<span className="text-primary">Ops</span>
            </span>
            <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Fleet Command</div>
          </div>
        </div>

        {/* Center: Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative text-sm font-semibold text-neutral-textMuted hover:text-neutral-textMain transition-colors duration-150 flex items-center gap-1.5"
            >
              {link.label}
              {link.badge && (
                <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={() => navigate("/login")} className="text-sm font-semibold text-neutral-textMuted hover:text-neutral-textMain transition-colors duration-150 cursor-pointer">
            Log In
          </button>
          <button onClick={() => navigate("/login")} className="btn btn-primary text-xs flex items-center gap-1.5 shadow-soft-sm">
            Get Started <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="btn-icon p-2">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-white border-b border-neutral-border overflow-hidden px-6 pb-6 pt-2 flex flex-col gap-4 shadow-soft-md"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-neutral-textMuted hover:text-neutral-textMain py-2 border-b border-slate-50 flex items-center justify-between"
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <button onClick={() => { setMobileMenuOpen(false); navigate("/login"); }} className="btn btn-secondary w-full text-xs">
                Log In
              </button>
              <button onClick={() => { setMobileMenuOpen(false); navigate("/login"); }} className="btn btn-primary w-full text-xs">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
