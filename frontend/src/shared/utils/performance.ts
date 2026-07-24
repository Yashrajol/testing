/**
 * Web Vitals & Performance Monitoring Utilities
 */

export interface WebVitalsMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  inp?: number;
  tti?: number;
}

const metrics: WebVitalsMetrics = {};

export function measureWebVitals() {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return;
  }

  try {
    // 1. Observe First Contentful Paint (FCP) & Largest Contentful Paint (LCP)
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metrics.fcp = Math.round(entry.startTime);
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });

    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        metrics.lcp = Math.round(lastEntry.startTime);
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // 2. Observe Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          metrics.cls = Number(clsValue.toFixed(4));
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // 3. Observe Interaction to Next Paint (INP)
    const inpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.duration) {
          metrics.inp = Math.round(entry.duration);
        }
      }
    });
    inpObserver.observe({ type: 'first-input', buffered: true });
  } catch {
    // Observers unsupported in current browser
  }
}

export function getWebVitals(): WebVitalsMetrics {
  return { ...metrics };
}

// Selector Memoization Helper
export function memoizeSelector<T, R>(fn: (input: T) => R): (input: T) => R {
  let lastInput: T | null = null;
  let lastResult: R | null = null;

  return (input: T): R => {
    if (lastInput !== null && lastInput === input) {
      return lastResult as R;
    }
    lastInput = input;
    lastResult = fn(input);
    return lastResult;
  };
}
