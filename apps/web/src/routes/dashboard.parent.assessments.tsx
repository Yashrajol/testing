import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { ClipboardCheck, CheckCircle2, Award, TrendingUp, FileText } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/assessments")({
  component: ParentAssessmentsPage,
  head: () => ({ meta: [{ title: "Child's Assessments — Parent Portal" }] }),
});

// Read-only mirror of the child's assessment activity, so parents see everything the student does.
const completedTests = [
  { subject: "Science", chapter: "Chapter 1: Matter in Surroundings", score: 90, date: "15 May 2026" },
  { subject: "Mathematics", chapter: "Chapter 4: Linear Equations Basics", score: 96, date: "02 May 2026" },
  { subject: "English", chapter: "Chapter 3: Grammar Conversions", score: 80, date: "18 Apr 2026" },
];

function ParentAssessmentsPage() {
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 text-left">
      <PageHeader title="Child's Assessments" subtitle="See how Yash is doing across the Vedhkrit self-assessment and school tests." />

      {/* Self-assessment status */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-5 border border-emerald-100 bg-emerald-50/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">Vedhkrit Self-Assessment</span>
              <span className="font-bold text-sm text-text-heading">Completed — reviewed by mentor</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Vedhkrit Index</span>
            <span className="font-display text-2xl font-black text-brand-blue">82<span className="text-sm text-text-muted">/100</span></span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Tests Completed", val: completedTests.length, icon: FileText, color: "text-brand-blue bg-blue-50" },
          { label: "Average Score", val: "88.7%", icon: TrendingUp, color: "text-brand-teal bg-teal-50" },
          { label: "Best Subject", val: "Mathematics", icon: Award, color: "text-purple-600 bg-purple-50" },
        ].map((s, i) => (
          <motion.div key={i} variants={itemVariants}>
            <GlassCard className="p-5 border border-slate-100 bg-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{s.label}</span>
                <span className="font-display text-xl font-black text-text-heading mt-1 block">{s.val}</span>
              </div>
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="h-4.5 w-4.5" /></div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Completed tests list */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-5 border border-slate-100 bg-white">
          <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-2">
            <ClipboardCheck className="h-4.5 w-4.5 text-brand-blue" /> Recent Test Results
          </h3>
          <div className="space-y-3">
            {completedTests.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-md">{t.subject}</span>
                  <h4 className="font-bold text-xs text-text-heading mt-1.5 truncate">{t.chapter}</h4>
                  <p className="text-[10px] text-text-muted mt-0.5">Attempted on {t.date}</p>
                </div>
                <div className="text-right shrink-0 pl-3">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Score</span>
                  <span className="text-lg font-black text-brand-blue">{t.score}%</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/dashboard/parent/reports"
            className="mt-4 w-full rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 py-2.5 text-center text-xs font-bold text-text-heading transition-colors block"
          >
            View Full Reports
          </Link>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
