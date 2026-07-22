import React from "react";
import { GlassCard } from "./glass-card";
import { Lock, Home, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ForbiddenScreen({
  message = "You do not have the required role or permissions to view this resource.",
}: {
  message?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 text-left">
      <GlassCard className="max-w-md w-full p-6 border border-orange-100 bg-white/90 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-orange-100 pb-3">
          <div className="h-10 w-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-text-heading">403 — Access Forbidden</h2>
            <p className="text-xs text-text-muted">Role-Based Access Control</p>
          </div>
        </div>

        <p className="text-xs text-text-body leading-relaxed">{message}</p>

        <div className="pt-3 border-t border-slate-100 flex gap-2">
          <Link
            to="/dashboard"
            className="flex-1 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold text-center hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Home className="h-4 w-4" /> Return to Dashboard
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
