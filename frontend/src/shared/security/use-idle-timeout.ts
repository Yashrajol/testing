import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { authStore } from "@/shared/api/auth-store";

const DEFAULT_IDLE_TIMEOUT_MS = 15 * 60 * 1000; // 15 Minutes

export function useIdleTimeout(
  onIdle?: () => void,
  timeoutMs: number = DEFAULT_IDLE_TIMEOUT_MS
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Only set timer if user is logged in
    if (authStore.getAccessToken()) {
      timerRef.current = setTimeout(() => {
        toast.warning("Session Expired", {
          description: "You have been logged out due to inactivity for security reasons.",
        });
        authStore.clearSession();
        if (onIdle) onIdle();
        if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }, timeoutMs);
    }
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((evt) => window.addEventListener(evt, handleActivity));
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((evt) => window.removeEventListener(evt, handleActivity));
    };
  }, [timeoutMs]);
}
