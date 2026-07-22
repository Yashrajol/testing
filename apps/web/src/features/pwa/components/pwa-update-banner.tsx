import React from 'react';
import { useSwUpdate } from '../hooks/useSwUpdate';
import { RefreshCw } from 'lucide-react';

export function PwaUpdateBanner() {
  const { hasUpdate, reloadApp } = useSwUpdate();

  if (!hasUpdate) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 rounded-2xl border border-brand-teal/30 bg-teal-900 text-white p-3.5 shadow-2xl text-left flex items-center justify-between gap-3 animate-in slide-in-from-top-4">
      <div>
        <h4 className="font-bold text-xs">New Update Available</h4>
        <p className="text-[10px] text-teal-200 mt-0.5">A new version of Vedhkrit has been deployed.</p>
      </div>

      <button
        onClick={reloadApp}
        className="px-3 py-1.5 bg-white text-teal-900 rounded-xl text-[11px] font-bold hover:bg-teal-50 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
      >
        <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Update Now
      </button>
    </div>
  );
}
