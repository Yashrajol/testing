import React from "react";
import { GlassCard } from "./glass-card";
import { ShieldAlert, LogIn, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function UnauthorizedScreen({ message = "You need to log in to access this portal." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 text-left">
      <GlassCard className="max-w-md w-full p-6 border border-red-100 bg-white/90 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-red-100 pb-3">
          <div className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-text-heading">401 — Authentication Required</h2>
            <p className="text-xs text-text-muted">Security Guard Notification</p>
          </div>
        </div>

        <p className="text-xs text-text-body leading-relaxed">{message}</p>

        <div className="pt-3 border-t border-slate-100 flex gap-2">
          <Link
            to="/login"
            className="flex-1 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold text-center hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogIn className="h-4 w-4" /> Go to Login
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2.5 border border-slate-200 bg-white text-text-heading rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
