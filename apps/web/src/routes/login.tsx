import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/components/auth-shell";
import { FormError } from "@/components/form-error";
import { useLoginMutation } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign In — Vedhkrit" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<unknown>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError("Please enter both your email and password.");
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          login(data.access_token, data.user);
          toast.success("Successfully logged in!");

          // Redirect to appropriate dashboard
          if (data.user.role === "STUDENT") {
            navigate({ to: "/dashboard/student" });
          } else if (data.user.role === "PARENT") {
            navigate({ to: "/dashboard/parent" });
          } else if (data.user.role === "MENTOR") {
            navigate({ to: "/dashboard/mentor" });
          } else if (data.user.role === "ADMIN") {
            navigate({ to: "/dashboard/admin" });
          } else if (data.user.role === "SUPERADMIN") {
            navigate({ to: "/dashboard/super" });
          } else {
            navigate({ to: "/dashboard" });
          }
        },
        onError: (err) => {
          setFormError(err);
          toast.error(err instanceof Error ? err.message : "Login failed");
        },
      }
    );
  };

  return (
    <AuthShell mode="login">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormError error={formError} />

        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginMutation.isPending}
        />
        <AuthInput 
          label="Password" 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginMutation.isPending}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-slate-400 font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-slate-300 bg-white text-brand-blue focus:ring-brand-blue/30 accent-brand-blue"
            />
            Remember me
          </label>
          <Link
            to="/forgot"
            className="text-xs font-semibold text-brand-blue hover:text-blue-600 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </AuthButton>
      </form>

      <p className="mt-5 text-center text-xs text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-brand-blue hover:text-blue-600 transition-colors"
        >
          Create one
        </Link>
      </p>
    </AuthShell>
  );
}
