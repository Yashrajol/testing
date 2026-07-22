import { useState, useEffect } from 'react';

export function useSwUpdate() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // Check if there is a waiting worker
      if (registration.waiting) {
        setWaitingWorker(registration.waiting);
        setHasUpdate(true);
      }

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker);
              setHasUpdate(true);
            }
          });
        }
      });
    }).catch(() => {
      // Service worker registration failed silently in non-SW environments
    });
  }, []);

  const reloadApp = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  };

  return { hasUpdate, reloadApp };
}
