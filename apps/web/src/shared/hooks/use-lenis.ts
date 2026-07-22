import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/**
 * Initialises a singleton Lenis smooth-scroll instance and keeps it alive
 * for the lifetime of the component that mounts it.
 * Call this once at the layout level (MarketingLayout).
 */
export function useLenis() {
  useEffect(() => {
    // Reuse existing instance if already running
    if (lenisInstance) return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenisInstance?.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}
