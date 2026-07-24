import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Logo } from "@/shared/ui/logo";

/* ─── Google SVG Icon ─── */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ─── Auth Shell ─── */
export function AuthShell({
  children,
  mode,
}: {
  children: ReactNode;
  mode: "login" | "register";
}) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white relative overflow-hidden px-4">
      {/* Light subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', 
          backgroundSize: '20px 20px' 
        }} 
      />
      {/* Elegant background gradients */}
      <div className="absolute top-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-brand-teal/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] rounded-full bg-brand-blue/5 blur-[90px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-[360px] z-10 flex flex-col"
      >
        {/* Main card */}
        <div className="relative rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-lg shadow-slate-100/50 overflow-hidden">
          {/* Top accent line */}
          <div className="h-1 bg-gradient-to-r from-brand-teal via-brand-blue to-brand-orange" />

          <div className="p-5 sm:p-6">
            {/* Square Logo & Header */}
            <div className="text-center mb-4">
              <div className="flex justify-center mb-3">
                <Logo iconOnly size="md" />
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400 font-semibold">
                {mode === "login"
                  ? "Sign in to continue your learning journey."
                  : "Start your purposeful learning journey today."}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex rounded-lg bg-slate-100 border border-slate-200/50 p-0.5 mb-4">
              <Link
                to="/login"
                className={`flex-1 text-center py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                  mode === "login"
                    ? "bg-white text-slate-800 shadow-xs border border-slate-200/20"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className={`flex-1 text-center py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${
                  mode === "register"
                    ? "bg-white text-slate-800 shadow-xs border border-slate-200/20"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Sign Up
              </Link>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50/80 px-3 py-2 text-xs font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-2xs"
            >
              <GoogleIcon className="h-4 w-4" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Form content */}
            {children}
          </div>
        </div>

        {/* Bottom link */}
        <div className="mt-4 text-center text-xs text-slate-400 font-medium">
          <Link to="/" className="hover:text-slate-600 transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Styled Input ─── */
interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AuthInput({
  label,
  type = "text",
  placeholder,
  ...props
}: AuthInputProps) {
  return (
    <label className="block">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all disabled:opacity-50"
        {...props}
      />
    </label>
  );
}

/* ─── Styled Button ─── */
interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AuthButton({ children, ...props }: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-gradient-to-r from-brand-teal to-brand-blue px-3 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
      {...props}
    >
      {children}
    </button>
  );
}
