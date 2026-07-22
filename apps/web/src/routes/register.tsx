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

  const [role, setRole] = useState<"STUDENT" | "PARENT">("STUDENT");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [formError, setFormError] = useState<unknown>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!firstName || !lastName || !email || !password) {
      setFormError("Please fill in all fields.");
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
      { email, password, name: `${firstName} ${lastName}`.trim(), role },
      {
        onSuccess: (data) => {
          if (data?.autoActivated) {
            toast.success("Account created! You can sign in now.");
            navigate({ to: "/login" });
            return;
          }
          toast.success("Account created! Check your email for a verification code.");
          navigate({ to: "/verify-otp", search: { email } });
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

        <div className="space-y-1 text-left">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            I am registering as a
          </span>
          <div className="flex rounded-lg bg-slate-100 border border-slate-200/50 p-0.5 mb-1">
            <button
              type="button"
              onClick={() => setRole("STUDENT")}
              className={`flex-1 text-center py-1.5 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer ${
                role === "STUDENT"
                  ? "bg-white text-slate-800 shadow-xs border border-slate-200/20"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              disabled={registerMutation.isPending}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("PARENT")}
              className={`flex-1 text-center py-1.5 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer ${
                role === "PARENT"
                  ? "bg-white text-slate-800 shadow-xs border border-slate-200/20"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              disabled={registerMutation.isPending}
            >
              Parent
            </button>
          </div>
        </div>

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
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {registerMutation.isPending ? "Creating account..." : "Create account"}
        </AuthButton>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">
        Already a member?{" "}
        <Link
          to="/login"
          className="font-semibold text-brand-blue hover:text-blue-600 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
