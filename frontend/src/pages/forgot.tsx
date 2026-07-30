import { Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/app/layouts/auth-shell";

export default function ForgotPage() {
  return (
    <AuthShell mode="login">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Reset link sent!");
        }}
        className="space-y-4"
      >
        <div className="text-center mb-2">
          <h3 className="text-sm font-bold text-slate-700">Reset your password</h3>
          <p className="text-xs text-slate-400 mt-1">We'll email you a secure link to reset it.</p>
        </div>
        <AuthInput label="Email" type="email" placeholder="you@example.com" />
        <AuthButton>Send reset link</AuthButton>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">
        Remembered?{" "}
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
