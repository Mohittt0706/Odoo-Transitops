import React from 'react';
import { cn } from '../../utils/utils';

export default function SafetyScoreBadge({ score, size = 'md', showLabel = true, className }) {
  const getColor = (s) => {
    if (s >= 90) return { ring: 'text-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Excellent' };
    if (s >= 80) return { ring: 'text-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', label: 'Good' };
    if (s >= 70) return { ring: 'text-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', label: 'Average' };
    return { ring: 'text-red-500', bg: 'bg-red-50', text: 'text-red-700', label: 'Poor' };
  };

  const config = getColor(score);
  const radius = size === 'lg' ? 28 : size === 'md' ? 22 : 16;
  const stroke = size === 'lg' ? 5 : size === 'md' ? 4 : 3;
  const dimension = (radius + stroke) * 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <svg viewBox={`0 0 ${dimension} ${dimension}`} className="w-full h-full -rotate-90">
          <circle cx={dimension / 2} cy={dimension / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn(config.ring, 'transition-all duration-700')}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-headings font-black', config.text, size === 'lg' ? 'text-sm' : size === 'md' ? 'text-xs' : 'text-[10px]')}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span className={cn('font-headings font-bold', config.text, size === 'lg' ? 'text-xs' : 'text-[10px]')}>
            {config.label}
          </span>
          <span className="text-[9px] text-slate-400 font-semibold">Safety Score</span>
        </div>
      )}
    </div>
  );
}
