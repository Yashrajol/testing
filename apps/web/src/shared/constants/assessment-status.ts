import { useEffect, useState } from "react";

// v2: dashboard now unlocks only after the real 5-question self-assessment,
// so we reset everyone by changing the key.
const KEY = "vedhkrit_self_assessment_done_v2";
const EVENT = "vedhkrit-assessment-status-changed";

export function isAssessmentDone(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(KEY) === "true";
}

export function markAssessmentDone() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, "true");
  window.dispatchEvent(new Event(EVENT));
}

/** Tracks whether the student has completed their Vedhkrit self-assessment yet. New accounts start locked. */
export function useAssessmentStatus() {
  const [done, setDone] = useState(isAssessmentDone);

  useEffect(() => {
    const sync = () => setDone(isAssessmentDone());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { done, markDone: markAssessmentDone };
}
