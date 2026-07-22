import { AlertCircle } from "lucide-react";
import { ApiError } from "@/lib/api";

/**
 * Inline error banner for auth forms. Renders the server's actual message rather
 * than a generic failure, so a wrong password, a validation problem, a rate limit,
 * and an unreachable server are all distinguishable.
 */
export function FormError({ error }: { error: unknown }) {
  if (!error) return null;

  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "Something went wrong.";

  // The status only helps when it points at something the user can act on.
  const status = error instanceof ApiError ? error.status : undefined;
  const hint =
    status === 0
      ? "The server may be waking up — wait a moment and try again."
      : status === 429
        ? "Too many attempts were made from this device."
        : undefined;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-left"
    >
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
      <div className="min-w-0">
        <p className="text-xs font-semibold leading-snug text-red-700">{message}</p>
        {hint && <p className="mt-0.5 text-[11px] leading-snug text-red-500">{hint}</p>}
      </div>
    </div>
  );
}
