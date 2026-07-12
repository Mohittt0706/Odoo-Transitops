import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Truck, ArrowRight, ArrowLeft, ChevronDown,
  LayoutDashboard, Navigation, ShieldCheck, BarChart3, MapPin
} from 'lucide-react';

const roles = [
  { value: 'operation-lead',     label: 'Operations Lead',     sub: 'Mission Control',    icon: LayoutDashboard, route: '/dashboard/operations',  color: 'text-primary',   dot: '#1E3A5F' },
  { value: 'road-captain',       label: 'Road Captain',        sub: 'Driver Cockpit',     icon: Navigation,      route: '/dashboard/road-captain', color: 'text-success',   dot: '#059669' },
  { value: 'safety-officer',     label: 'Safety Officer',      sub: 'Safety Command',     icon: ShieldCheck,     route: '/dashboard/safety',       color: 'text-warning',   dot: '#D97706' },
  { value: 'finance-hub',        label: 'Finance Hub',         sub: 'Finance Command',    icon: BarChart3,       route: '/dashboard/finance',      color: 'text-purple-600', dot: '#7C3AED' },
  { value: 'destination-control',label: 'Destination Control', sub: 'Arrival Hub',        icon: MapPin,          route: '/dashboard/destination',  color: 'text-rose-600',  dot: '#BE123C' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate(selectedRole.route), 600);
  };

  const SelectedIcon = selectedRole.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-neutral-textMain tracking-tight">
          Access Your Workspace
        </h1>
        <p className="text-[13px] text-neutral-textMuted mt-1.5">
          Select a role and launch the demo portal instantly.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Role Selector */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-textMuted uppercase tracking-widest mb-1.5">
            Select Role
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full flex items-center gap-3 px-3.5 py-3 bg-white border border-neutral-border rounded-lg text-left hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="w-7 h-7 rounded-md bg-neutral-light flex items-center justify-center flex-shrink-0">
                <SelectedIcon className={`w-[15px] h-[15px] ${selectedRole.color}`} strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-neutral-textMain leading-tight">{selectedRole.label}</div>
                <div className="text-[10px] text-neutral-textMuted">{selectedRole.sub}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-neutral-textMuted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-border rounded-lg shadow-soft-lg overflow-hidden z-20"
              >
                {roles.map((role) => {
                  const RIcon = role.icon;
                  const isSelected = role.value === selectedRole.value;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => { setSelectedRole(role); setOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-neutral-light ${isSelected ? 'bg-primary-light' : ''}`}
                    >
                      <div className="w-6 h-6 rounded-md bg-neutral-light flex items-center justify-center flex-shrink-0">
                        <RIcon className={`w-[13px] h-[13px] ${role.color}`} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[12px] font-semibold leading-tight ${isSelected ? 'text-primary' : 'text-neutral-textMain'}`}>{role.label}</div>
                        <div className="text-[10px] text-neutral-textMuted">{role.sub}</div>
                      </div>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: role.dot }} />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>

        {/* Demo credentials */}
        <div>
          <label className="block text-[11px] font-bold text-neutral-textMuted uppercase tracking-widest mb-1.5">
            Demo Credentials
          </label>
          <div className="px-3.5 py-2.5 bg-neutral-light rounded-lg border border-neutral-border">
            <div className="text-[12px] text-neutral-textMuted font-mono">demo@transitops.com</div>
            <div className="text-[10px] text-neutral-textMuted/70 mt-0.5">Auto-authorized for demo access</div>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-hover text-white font-bold text-[13px] rounded-lg shadow-soft-md transition-all duration-200 disabled:opacity-70 group mt-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Enter {selectedRole.sub}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </motion.button>
      </form>

      {/* Back link */}
      <div className="mt-6 pt-5 border-t border-neutral-border">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-neutral-textMuted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Return to landing page
        </Link>
      </div>
    </motion.div>
  );
}
