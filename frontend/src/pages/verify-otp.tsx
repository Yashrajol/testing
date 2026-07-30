import { Link, useNavigate } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/app/layouts/auth-shell";
import { FormError } from "@/shared/ui/form-error";
import { useVerifyOtpMutation } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

interface VerifyOtpPageProps {
  initialEmail?: string;
  devOtp?: string;
}

export default function VerifyOtpPage({ initialEmail = "", devOtp = "" }: VerifyOtpPageProps) {
  const navigate = useNavigate();
  const verifyOtpMutation = useVerifyOtpMutation();

  const [email, setEmail] = useState(initialEmail);
  // In dev mode, pre-fill the OTP field with the code returned by the server
  const [otp, setOtp] = useState(devOtp);
  const [formError, setFormError] = useState<unknown>(null);

  const isDev = import.meta.env.DEV || import.meta.env.VITE_APP_ENV === "development";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !otp) {
      setFormError("Please enter your email and the verification code.");
      return;
    }

    verifyOtpMutation.mutate(
      { email, otpCode: otp },
      {
        onSuccess: () => {
          toast.success("Account verified! Let's set up your profile.");
          navigate({ to: "/onboarding" });
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
          <p className="text-xs text-slate-400 mt-1">
            Enter the 6-digit code sent to your registered mobile number.
          </p>
        </div>

        {/* Dev-mode OTP hint banner */}
        {isDev && devOtp && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
            <p className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
              <span>🔑</span>
              <span>Dev Mode — OTP pre-filled:</span>
              <span className="font-mono tracking-widest text-amber-900">{devOtp}</span>
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              In production, this code is sent via SMS to your mobile number.
            </p>
          </div>
        )}

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
          label="Verification code (6-digit OTP)"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          disabled={verifyOtpMutation.isPending}
        />
        <AuthButton disabled={verifyOtpMutation.isPending}>
          {verifyOtpMutation.isPending ? "Verifying..." : "Verify & Enter Dashboard"}
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
