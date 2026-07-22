import React from 'react';
import { usePwaInstall } from '../hooks/usePwaInstall';
import { Download, X } from 'lucide-react';

export function PwaInstallBanner() {
  const { isInstallable, isInstalled, promptInstall } = usePwaInstall();
  const [dismissed, setDismissed] = React.useState(false);

  if (!isInstallable || isInstalled || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 max-w-sm rounded-2xl border border-brand-blue/20 bg-white p-4 shadow-xl text-left flex items-center justify-between gap-3 animate-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3">
        <img
          src="/assets/brand/veda-logo.png"
          alt="Vedhkrit"
          className="h-10 w-10 rounded-xl border border-slate-100 object-cover shrink-0"
        />
        <div>
          <h4 className="font-bold text-xs text-text-heading">Install Vedhkrit App</h4>
          <p className="text-[10px] text-text-muted mt-0.5">Quick access & offline learning tools.</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={promptInstall}
          className="px-3 py-1.5 bg-brand-blue text-white rounded-xl text-[11px] font-bold hover:bg-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Download className="h-3.5 w-3.5" /> Install
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
