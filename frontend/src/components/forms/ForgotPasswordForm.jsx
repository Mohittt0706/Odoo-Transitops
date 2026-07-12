import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2, Send } from "lucide-react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import Logo from "../common/Logo";
import FormCard from "../common/FormCard";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <FormCard>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-6 gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <CheckCircle2 className="w-14 h-14 text-success" strokeWidth={1.5} />
            </motion.div>
            <div className="text-center">
              <h2 className="text-lg font-bold font-headings text-neutral-textMain">
                Check Your Email
              </h2>
              <p className="text-sm text-neutral-textMuted mt-1.5 max-w-[280px]">
                We've sent a password reset link to{" "}
                <span className="font-semibold text-accent">{email}</span>
              </p>
            </div>
            <div className="bg-primary-light rounded-lg p-3 w-full mt-2">
              <p className="text-xs text-primary text-center font-medium">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>
            <Link to="/login" className="mt-2">
              <Button variant="secondary" size="md">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, x: -20 }}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-5">
                <Logo size="md" />
              </div>
              <h1 className="text-2xl font-extrabold font-headings text-neutral-textMain tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-neutral-textMuted mt-1.5 max-w-[300px] mx-auto">
                Enter your registered email to receive a password reset link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <InputField
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                error={error}
                icon={Mail}
                autoComplete="email"
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={loading}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Reset Link
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-neutral-border" />
              <div className="flex-1 h-px bg-neutral-border" />
            </div>

            {/* Footer */}
            <div className="text-center">
              <Link
                to="/login"
                className="text-xs text-neutral-textMuted hover:text-accent transition-colors font-medium inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FormCard>
  );
}
