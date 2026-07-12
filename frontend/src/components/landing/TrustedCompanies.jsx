import React from 'react';

export default function TrustedCompanies() {
  const partners = [
    { name: 'Logistics Corp', symbol: 'LC' },
    { name: 'Rapid Freight', symbol: 'RF' },
    { name: 'MoveX', symbol: 'MX' },
    { name: 'CargoLink', symbol: 'CL' },
    { name: 'FleetOne', symbol: 'FO' }
  ];

  return (
    <section className="py-10 bg-slate-50 border-b border-neutral-border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-headings text-center md:text-left">
          Trusted by leading logistics enterprises
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, idx) => (
            <div key={idx} className="flex items-center gap-2 grayscale opacity-45 hover:opacity-75 transition-opacity duration-200 cursor-pointer">
              <div className="w-7 h-7 rounded bg-slate-700 text-white flex items-center justify-center font-black text-xs">
                {partner.symbol}
              </div>
              <span className="font-headings font-extrabold text-sm text-slate-800 tracking-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
