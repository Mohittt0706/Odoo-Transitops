import React from 'react';
import { cn } from '../../utils/utils';

const statusConfig = {
  Available: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'On Trip': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', dot: 'bg-blue-500' },
  'Off Duty': { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', dot: 'bg-slate-400' },
  Suspended: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' },
  Active: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Expiring Soon': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500' },
  Expired: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' },
  'On Leave': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', dot: 'bg-purple-500' },
};

export default function StatusBadge({ status, size = 'sm', showDot = true, className }) {
  const config = statusConfig[status] || statusConfig.Available;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-headings font-bold border rounded-full',
        size === 'sm' && 'text-[10px] px-2 py-0.5',
        size === 'md' && 'text-[11px] px-2.5 py-1',
        size === 'lg' && 'text-xs px-3 py-1',
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {showDot && <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />}
      {status}
    </span>
  );
}
