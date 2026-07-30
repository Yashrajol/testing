import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/app/layouts/auth-shell";
import { FormError } from "@/shared/ui/form-error";
import { useRegisterMutation } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Sign Up — Vedhkrit" }] }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const role = "STUDENT";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [formError, setFormError] = useState<unknown>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!firstName || !lastName || !email || !phone || !password) {
      setFormError("Please fill in all fields including mobile number.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    if (!agreed) {
      setFormError("Please agree to the Terms of Service & Privacy Policy.");
      return;
    }

    registerMutation.mutate(
      { email, phoneNumber: phone, password, name: `${firstName} ${lastName}`.trim(), role } as any,
      {
        onSuccess: (data) => {
          if (data?.autoActivated) {
            toast.success("Account created! You can sign in now.");
            navigate({ to: "/login" });
            return;
          }
          toast.success("Account created! Check your mobile for the OTP code.");
          navigate({ to: "/verify-otp", search: { email, devOtp: data?.devOtp || "" } });
        },
        onError: (err) => {
          setFormError(err);
          toast.error(err instanceof Error ? err.message : "Registration failed");
        },
      }
    );
  };

  return (
    <AuthShell mode="register">
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormError error={formError} />

        <div className="grid grid-cols-2 gap-3.5">
          <AuthInput
            label="First name"
            placeholder="Aarav"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={registerMutation.isPending}
          />
          <AuthInput
            label="Last name"
            placeholder="Sharma"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={registerMutation.isPending}
          />
        </div>
        <AuthInput
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={registerMutation.isPending}
        />
        <AuthInput
          label="Mobile number (OTP will be sent here)"
          type="tel"
          placeholder="+91 98765 43210"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={registerMutation.isPending}
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={registerMutation.isPending}
        />

        <label className="flex items-start gap-2 text-xs text-slate-400 font-medium cursor-pointer select-none pt-0.5">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 bg-white text-brand-blue focus:ring-brand-blue/30 accent-brand-blue shrink-0"
          />
          <span className="leading-tight">
            I agree to the{" "}
            <Link to="/" className="text-brand-blue hover:text-blue-600 transition-colors font-semibold">
              Terms of Service
            </Link>{" "}
            &{" "}
            <Link to="/" className="text-brand-blue hover:text-blue-600 transition-colors font-semibold">
              Privacy Policy
            </Link>
          </span>
        </label>

        <AuthButton disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Sending OTP & creating account..." : "Create Account & Send OTP"}
        </AuthButton>
      </form>

      <div className="mt-4 pt-3 border-t border-slate-100 text-center space-y-1.5 text-xs text-slate-400">
        <p>
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold text-brand-blue hover:text-blue-600 transition-colors"
          >
            Sign in
          </Link>
        </p>
        <div className="flex justify-center gap-3 text-[11px] font-semibold text-slate-500 pt-1">
          <Link to="/register-school" className="hover:text-brand-blue transition-colors">
            Register School →
          </Link>
          <span>•</span>
          <Link to="/register-mentor" className="hover:text-brand-blue transition-colors">
            Apply as Mentor →
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}

export default RegisterPage;
