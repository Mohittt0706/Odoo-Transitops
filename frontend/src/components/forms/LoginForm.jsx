import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import InputField from "../common/InputField";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import Logo from "../common/Logo";
import FormCard from "../common/FormCard";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);

    await new Promise((r) => setTimeout(r, 1000));
    navigate("/role-selection");
  };

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
              Welcome back!
            </p>
            <p className="text-xs text-neutral-textMuted text-center">
              Redirecting you to your workspace...
            </p>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, x: -20 }}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-5">
                <Logo size="md" />
              </div>
              <h1 className="text-2xl font-extrabold font-headings text-neutral-textMain tracking-tight">
                Welcome Back
              </h1>
              <p className="text-sm text-neutral-textMuted mt-1.5">
                Manage your fleet with confidence.
              </p>
            </div>

            {/* Form */}
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

              <div className="flex items-center justify-between pt-0.5">
                <Checkbox
                  label="Remember me"
                  checked={form.remember}
                  onChange={handleChange}
                  name="remember"
                />
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full mt-2"
                size="lg"
                loading={loading}
              >
                Sign In
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-neutral-border" />
              <span className="text-[11px] text-neutral-textMuted font-medium">
                TransitOps v2.0
              </span>
              <div className="flex-1 h-px bg-neutral-border" />
            </div>

            {/* Footer */}
            <div className="text-center">
              <Link
                to="/"
                className="text-xs text-neutral-textMuted hover:text-accent transition-colors font-medium"
              >
                &larr; Back to Home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormCard>
  );
}
