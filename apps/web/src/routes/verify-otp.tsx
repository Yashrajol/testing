import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/components/auth-shell";
import { FormError } from "@/components/form-error";
import { useVerifyOtpMutation } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const verifyOtpSearchSchema = z.object({
  email: z.string().optional(),
});

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOtpPage,
  validateSearch: verifyOtpSearchSchema,
  head: () => ({ meta: [{ title: "Verify Your Account — Vedhkrit" }] }),
});

function VerifyOtpPage() {
  const { email: emailFromSearch } = Route.useSearch();
  const navigate = useNavigate();
  const verifyOtpMutation = useVerifyOtpMutation();
  const { login } = useAuth();

  const [email, setEmail] = useState(emailFromSearch ?? "");
  const [otp, setOtp] = useState("");
  const [formError, setFormError] = useState<unknown>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !otp) {
      setFormError("Please enter your email and the verification code.");
      return;
    }

    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: (data) => {
          login(data.access_token, data.user);
          toast.success("Account verified!");

          if (data.user.role === "STUDENT") {
            navigate({ to: "/dashboard/student" });
          } else if (data.user.role === "PARENT") {
            navigate({ to: "/dashboard/parent" });
          } else {
            navigate({ to: "/dashboard" });
          }
        },
        onError: (err) => {
          setFormError(err);
          toast.error(err instanceof Error ? err.message : "Verification failed");
        },
      }
    );
  };

  return (
    <AuthShell mode="login">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-2">
          <h3 className="text-sm font-bold text-slate-700">Verify your account</h3>
          <p className="text-xs text-slate-400 mt-1">Enter the 6-digit code sent to your email.</p>
        </div>

        <FormError error={formError} />
        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={verifyOtpMutation.isPending}
        />
        <AuthInput
          label="Verification code"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={verifyOtpMutation.isPending}
        />
        <AuthButton disabled={verifyOtpMutation.isPending}>
          {verifyOtpMutation.isPending ? "Verifying..." : "Verify account"}
        </AuthButton>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">
        Wrong email?{" "}
        <Link
          to="/register"
          className="font-semibold text-brand-blue hover:text-blue-600 transition-colors"
        >
          Go back
        </Link>
      </p>
    </AuthShell>
  );
}
