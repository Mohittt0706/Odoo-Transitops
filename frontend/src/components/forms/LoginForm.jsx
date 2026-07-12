import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Navigation,
  ShieldCheck,
  BarChart3,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Mail,
  CheckCircle2,
} from "lucide-react";
import InputField from "../common/Input";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";
import FormCard from "../common/Card";
import { useAuth } from "../../context/AuthContext";
import { mockUsers, roleLabels } from "../../data/mockUsers";

const roles = [
  {
    id: "operations",
    title: "Operations Lead",
    description: "Manage vehicles, drivers, fleet operations, and reports.",
    icon: LayoutDashboard,
    color: "bg-primary/10 text-primary",
  },
  {
    id: "road-captain",
    title: "Road Captain",
    description: "Manage assigned trips, routes, fuel logs, and deliveries.",
    icon: Navigation,
    color: "bg-success/10 text-success",
  },
  {
    id: "safety",
    title: "Safety Officer",
    description: "Monitor driver compliance, incidents, inspections, and licenses.",
    icon: ShieldCheck,
    color: "bg-warning/10 text-warning",
  },
  {
    id: "finance",
    title: "Finance Hub",
    description: "Manage expenses, fuel costs, profitability, and invoices.",
    icon: BarChart3,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "destination",
    title: "Destination Control",
    description: "Track incoming deliveries, warehouse operations, and proof of delivery.",
    icon: MapPin,
    color: "bg-rose-500/10 text-rose-600",
  },
];

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setErrors({});
    setLoginError("");
  };

  const handleBack = () => {
    setSelectedRole(null);
    setForm({ email: "", password: "" });
    setErrors({});
    setLoginError("");
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 3) {
      errs.password = "Password must be at least 3 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (loginError) setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    const result = login(form.email, form.password, selectedRole);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      await new Promise((r) => setTimeout(r, 800));
      navigate(`/dashboard/${selectedRole}`);
    } else {
      setLoginError(result.error);
    }
  };

  const selectedRoleData = roles.find((r) => r.id === selectedRole);
  const hintUser = mockUsers.find((u) => u.role === selectedRole);
  const hintEmail = hintUser?.email;
  const hintPassword = hintUser?.password;

  return (
    <FormCard>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-8 gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <CheckCircle2 className="w-14 h-14 text-success" strokeWidth={1.5} />
            </motion.div>
            <p className="text-sm font-semibold text-neutral-textMain font-headings">
              Welcome, {roleLabels[selectedRole]}!
            </p>
            <p className="text-xs text-neutral-textMuted text-center">
              Redirecting to your dashboard...
            </p>
          </motion.div>
        ) : !selectedRole ? (
          <motion.div
            key="roles"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold font-headings text-neutral-textMain tracking-tight">
                Choose Your Role
              </h1>
              <p className="text-sm text-neutral-textMuted mt-1.5">
                Select your workspace to continue.
              </p>
            </div>

            <div className="space-y-2.5">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <motion.button
                    key={role.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.35 }}
                    onClick={() => handleRoleSelect(role.id)}
                    className="group w-full text-left bg-white border border-neutral-border rounded-xl p-4 hover:shadow-soft-md transition-all duration-250 hover:border-primary/30 cursor-pointer flex items-center gap-3.5"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${role.color}`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold font-headings text-neutral-textMain group-hover:text-primary transition-colors duration-300">
                        {role.title}
                      </h3>
                      <p className="text-xs text-neutral-textMuted mt-0.5 leading-relaxed line-clamp-1">
                        {role.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-border group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>

            <div className="text-center mt-6">
              <Link
                to="/"
                className="text-xs text-neutral-textMuted hover:text-accent transition-colors font-medium"
              >
                &larr; Back to Home
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-textMuted hover:text-accent transition-colors font-medium mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Change role
            </button>

            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-neutral-border">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${selectedRoleData.color}`}
              >
                <selectedRoleData.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div>
                <h2 className="text-lg font-extrabold font-headings text-neutral-textMain">
                  {selectedRoleData.title}
                </h2>
                <p className="text-xs text-neutral-textMuted">Sign in to continue</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                icon={Mail}
                autoComplete="email"
              />

              <PasswordInput
                name="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                autoComplete="current-password"
              />

              {loginError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-danger font-medium"
                >
                  {loginError}
                </motion.p>
              )}

              <div className="flex items-center justify-between pt-0.5">
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full mt-2" size="lg" loading={loading}>
                Sign In
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-accent-light rounded-lg border border-neutral-border">
              <p className="text-[11px] font-semibold text-neutral-textMuted mb-1">
                Demo Credentials
              </p>
              <p className="text-[11px] text-neutral-textMuted font-mono">
                Email: <span className="text-primary font-semibold">{hintEmail}</span>
              </p>
              <p className="text-[11px] text-neutral-textMuted font-mono">
                Password: <span className="text-primary font-semibold">{hintPassword}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormCard>
  );
}
