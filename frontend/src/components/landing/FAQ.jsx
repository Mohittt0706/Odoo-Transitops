import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      q: 'What is TransitOps?',
      a: 'TransitOps is an enterprise transport and fleet operations platform. It integrates live vehicle telematics, coordinates mapping, safety audit compliance, and invoice/expense tracking into a clean, modern interface synced with Odoo ERP.'
    },
    {
      q: 'Who is it for?',
      a: 'It is built for fleet operators, logistics companies, dispatcher teams, and freight managers looking to streamline vehicle tracking, improve CDL compliance, and automate warehouse dock logistics.'
    },
    {
      q: 'Can multiple roles use it?',
      a: 'Yes. TransitOps features role-based workspace layouts tailored for Operations Leads, Road Captains (Drivers), Safety Officers, Finance Hub leads, and Destination (Warehouse Dock) controllers.'
    },
    {
      q: 'Is it cloud-based?',
      a: 'Yes, TransitOps is a fully cloud-hosted platform offering real-time coordination pipelines and secure, authenticated API integrations.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-neutral-border">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
            Common Inquiries
          </span>
          <h2 className="text-3xl font-extrabold font-headings tracking-tight text-neutral-textMain">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Find answers to standard questions about the platform, security clearances, and Odoo integrations.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isExpanded = expanded === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-neutral-border rounded-xl overflow-hidden shadow-soft-sm transition-shadow duration-200 hover:shadow-soft-md"
              >
                <button
                  onClick={() => setExpanded(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-headings font-bold text-sm text-slate-800 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-5 border-t border-slate-100 text-xs text-slate-500 leading-relaxed font-semibold bg-white">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
