import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-slate-950 py-1 px-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-md">
      <WifiOff className="h-3.5 w-3.5" />
      <span>Working Offline Mode — Local cache enabled for assignments, notes & study resources.</span>
    </div>
  );
}
