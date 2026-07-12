import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function Counter({ value, duration = 2, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Parse numeric value
    const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericPart)) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, numericPart, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      }
    });

    return () => controls.stop();
  }, [value, duration]);

  // Format with commas if large number
  const formatted = typeof displayValue === 'number'
    ? displayValue.toLocaleString() + suffix
    : displayValue;

  return <span>{formatted}</span>;
}

export default function FleetStatistics() {
  const stats = [
    { value: '500', suffix: '+', label: 'Vehicles Managed', desc: 'Heavy duty, flatbed, electric fleets' },
    { value: '12000', suffix: '+', label: 'Trips Completed', desc: 'On-time delivery dispatches' },
    { value: '98', suffix: '%', label: 'Fleet Efficiency', desc: 'Odoo pickings cleared daily' },
    { value: '24/7', suffix: '', label: 'Operations Monitoring', desc: 'Active telemetry coordinates' }
  ];

  return (
    <section className="py-16 bg-white border-b border-neutral-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="card flex flex-col gap-2 bg-white border border-neutral-border rounded-xl p-6 shadow-soft-sm text-center lg:text-left"
            >
              <div className="text-4xl font-extrabold font-headings tracking-tight text-primary">
                {stat.value.includes('/') ? (
                  <span>{stat.value}</span>
                ) : (
                  <Counter value={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="text-sm font-bold text-slate-800 font-headings">
                {stat.label}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
