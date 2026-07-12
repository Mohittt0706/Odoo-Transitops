import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  History,
  Route,
  AlertTriangle,
  BookOpen,
  RefreshCw,
  AlertCircle,
  Ban,
  Clock,
  Car,
  Award,
  Filter,
  CalendarDays,
  Users,
  Activity,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../../utils/utils';
import { drivers } from '../../data/drivers';
import TimelineEvent from '../../components/drivers/TimelineEvent';

const EVENT_TYPES = [];

const DATE_RANGES = [];

function getDateRangeCutoff(range) {
  const now = new Date();
  switch (range) {
    case 'week': {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      return d;
    }
    case 'month': {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 1);
      return d;
    }
    case '3months': {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 3);
      return d;
    }
    case 'year': {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      return d;
    }
    default:
      return null;
  }
}

function formatDateHeader(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function groupEventsByDate(events) {
  const groups = {};
  events.forEach((event) => {
    const key = event.date;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(event);
  });
  return Object.entries(groups).sort(([a], [b]) => new Date(b) - new Date(a));
}

export default function DriverHistory() {
  const { id } = useParams();
  const [selectedDriver, setSelectedDriver] = useState(id || 'all');
  const [eventType, setEventType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allEvents = useMemo(() => {
    if (selectedDriver === 'all') {
      return drivers.flatMap((driver) =>
        (driver.history || []).map((event) => ({
          ...event,
          driverName: driver.fullName,
          driverId: driver.id,
        }))
      );
    }
    const driver = drivers.find((d) => d.id === selectedDriver);
    if (!driver) return [];
    return (driver.history || []).map((event) => ({
      ...event,
      driverName: driver.fullName,
      driverId: driver.id,
    }));
  }, [selectedDriver]);

  const filteredEvents = useMemo(() => {
    let result = allEvents;

    if (eventType !== 'all') {
      result = result.filter((e) => e.type === eventType);
    }

    const cutoff = getDateRangeCutoff(dateRange);
    if (cutoff) {
      result = result.filter((e) => new Date(e.date) >= cutoff);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(term) ||
          e.description.toLowerCase().includes(term) ||
          e.driverName.toLowerCase().includes(term)
      );
    }

    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [allEvents, eventType, dateRange, searchTerm]);

  const groupedEvents = useMemo(() => groupEventsByDate(filteredEvents), [filteredEvents]);

  const stats = useMemo(() => {
    const events = allEvents;
    return {
      total: events.length,
      trips: events.filter((e) => e.type === 'trip').length,
      incidents: events.filter((e) => e.type === 'incident').length,
      training: events.filter((e) => e.type === 'training').length,
    };
  }, [allEvents]);

  const statCards = [];

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight font-headings flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Driver History
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Complete activity timeline and event log for all drivers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div
                  className={cn(
                    'p-1.5 rounded-lg transition-transform group-hover:scale-105',
                    stat.color
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-headings">{stat.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none transition-all w-64 font-semibold"
              />
            </div>
            <div className="relative">
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-4 py-2.5 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none pr-8"
              >
                <option value="all">All Drivers</option>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.fullName}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-4 py-2.5 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none pr-8"
              >
                {DATE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  onClick={() => setEventType(type.value)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all duration-200',
                    eventType === type.value
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {type.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="p-4 rounded-2xl bg-slate-100 mb-4">
                <CalendarDays className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-sm font-bold text-slate-500 font-headings mb-1">No events found</h3>
              <p className="text-xs text-slate-400 font-semibold max-w-xs">
                Try adjusting your filters or date range to see more activity
              </p>
            </motion.div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <AnimatePresence mode="popLayout">
                <div className="flex flex-col gap-6">
                  {groupedEvents.map(([date, events], groupIdx) => (
                    <motion.div
                      key={date}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ delay: groupIdx * 0.04 }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-xs font-bold text-slate-900 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
                          {formatDateHeader(date)}
                        </div>
                        <div className="flex-1 h-px bg-slate-100" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                          {events.length} event{events.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="ml-1 pl-4 border-l-2 border-slate-100">
                        {events.map((event, eventIdx) => (
                          <div key={`${event.date}-${eventIdx}`} className="relative">
                            {selectedDriver === 'all' && (
                              <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary/30 ring-2 ring-white" />
                            )}
                            <TimelineEvent
                              event={event}
                              isLast={eventIdx === events.length - 1 && groupIdx === groupedEvents.length - 1}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          )}
        </div>

        {filteredEvents.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
            <p className="text-[10px] font-bold text-slate-400">
              Showing {filteredEvents.length} of {allEvents.length} events
            </p>
            <button
              onClick={() => {
                const el = document.querySelector('.scrollbar-thin');
                if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[10px] font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Back to top
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
