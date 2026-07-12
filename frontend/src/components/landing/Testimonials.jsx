import React from 'react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      company: 'Apex Industries',
      text: 'TransitOps transformed our warehouse bottleneck. Pre-allocating docks and syncing POD sheets directly to Odoo saves us hours every single day.',
      avatar: 'SJ'
    },
    {
      name: 'Marcus Vance',
      company: 'Midwest Cargo',
      text: 'The safety warnings and live telematics logs keep us compliant. Our safety audit score jumped from 82 to 98% within a month.',
      avatar: 'MV'
    },
    {
      name: 'David Chen',
      company: 'Rapid Freight',
      text: 'We tried several tracking platforms, but none integrated with our Odoo inventory and stock pickings like TransitOps. Clean interface and highly usable.',
      avatar: 'DC'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-neutral-border">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-16">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary font-headings">
            Customer Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headings tracking-tight text-neutral-textMain">
            Trusted by Fleet Managers
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            See how logistics and transportation organizations scale operations with TransitOps.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="card bg-white border border-neutral-border p-6 rounded-xl flex flex-col justify-between gap-6 shadow-soft-sm card-transition hover:shadow-soft-md"
            >
              <div className="flex flex-col gap-4">
                {/* 5 Star Rating */}
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic leading-relaxed font-semibold">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                  {rev.avatar}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-headings font-bold text-xs text-slate-800 leading-none">
                    {rev.name}
                  </h4>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {rev.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
