import React from 'react';
import { cn } from '../../lib/utils';
import {
  Route, Car, AlertTriangle, Ban, BookOpen, RefreshCw, Award, Clock
} from 'lucide-react';

const typeConfig = {
  trip: { icon: Route, color: 'text-blue-600 bg-blue-50', line: 'bg-blue-200' },
  vehicle: { icon: Car, color: 'text-cyan-600 bg-cyan-50', line: 'bg-cyan-200' },
  incident: { icon: AlertTriangle, color: 'text-red-600 bg-red-50', line: 'bg-red-200' },
  suspension: { icon: Ban, color: 'text-red-600 bg-red-50', line: 'bg-red-200' },
  warning: { icon: AlertTriangle, color: 'text-amber-600 bg-amber-50', line: 'bg-amber-200' },
  training: { icon: BookOpen, color: 'text-emerald-600 bg-emerald-50', line: 'bg-emerald-200' },
  license: { icon: RefreshCw, color: 'text-indigo-600 bg-indigo-50', line: 'bg-indigo-200' },
  promotion: { icon: Award, color: 'text-purple-600 bg-purple-50', line: 'bg-purple-200' },
  medical: { icon: Clock, color: 'text-pink-600 bg-pink-50', line: 'bg-pink-200' },
};

export default function TimelineEvent({ event, isLast = false }) {
  const config = typeConfig[event.type] || typeConfig.trip;
  const Icon = config.icon;

  return (
    <div className="flex gap-4 relative">
      <div className="flex flex-col items-center">
        <div className={cn('p-1.5 rounded-lg z-10', config.color)}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        {!isLast && <div className={cn('w-0.5 flex-1 mt-1', config.line)} />}
      </div>
      <div className={cn('pb-6 flex-1', isLast && 'pb-0')}>
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-xs font-bold text-slate-900 font-headings">{event.title}</h4>
        </div>
        <p className="text-[10px] text-slate-500 font-semibold mb-1">{event.description}</p>
        <span className="text-[9px] text-slate-400 font-bold">{event.date}</span>
      </div>
    </div>
  );
}
