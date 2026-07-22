import React from 'react';
import { GlassCard } from '@/shared/ui/glass-card';

export function SkeletonCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <GlassCard key={i} className="p-4.5 border border-slate-100 bg-white animate-pulse">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <div className="h-3 w-20 bg-slate-200 rounded" />
              <div className="h-7 w-14 bg-slate-200 rounded" />
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-200" />
          </div>
          <div className="h-2.5 w-24 bg-slate-200 rounded mt-3" />
        </GlassCard>
      ))}
    </div>
  );
}

export function SkeletonTables({ rows = 5 }: { rows?: number }) {
  return (
    <GlassCard className="p-5 border border-slate-100 bg-white animate-pulse">
      <div className="h-4 w-32 bg-slate-200 rounded mb-4" />
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-slate-100">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-28 bg-slate-200 rounded" />
                <div className="h-2 w-20 bg-slate-200 rounded" />
              </div>
            </div>
            <div className="h-6 w-16 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function SkeletonCharts() {
  return (
    <GlassCard className="p-5 border border-slate-100 bg-white animate-pulse">
      <div className="h-4 w-40 bg-slate-200 rounded mb-4" />
      <div className="h-64 bg-slate-100 rounded-xl flex items-end justify-between p-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full bg-slate-200 rounded-t"
            style={{ height: `${30 + Math.random() * 60}%` }}
          />
        ))}
      </div>
    </GlassCard>
  );
}

export function SkeletonCalendar() {
  return (
    <GlassCard className="p-5 border border-slate-100 bg-white animate-pulse">
      <div className="h-4 w-36 bg-slate-200 rounded mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl">
            <div className="h-10 w-10 rounded-xl bg-slate-200 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-32 bg-slate-200 rounded" />
              <div className="h-2.5 w-24 bg-slate-200 rounded" />
            </div>
            <div className="h-8 w-20 bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function SkeletonStudentProfile() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-4 w-36 bg-slate-200 rounded" />
          <div className="h-3 w-28 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-16 bg-slate-100 rounded-xl" />
        <div className="h-16 bg-slate-100 rounded-xl" />
        <div className="h-16 bg-slate-100 rounded-xl" />
        <div className="h-16 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}
