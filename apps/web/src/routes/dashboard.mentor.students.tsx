import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { students } from "@/lib/mock-data";
import { UserCheck, Star, Calendar, MessageCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/mentor/students")({
  component: MentorStudentsPage,
  head: () => ({ meta: [{ title: "Assigned Students — Mentor Portal" }] }),
});

const myStudents = students.slice(0, 12); // Mentor Priya Iyer has 12 assigned mentees

function MentorStudentsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <PageHeader title="Assigned Mentees" subtitle="Review profiles, diagnostic milestones, and action items for your 12 assigned students." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myStudents.map((student, i) => (
          <motion.div key={i} variants={itemVariants}>
            <GlassCard className="p-5 border border-border-default/50 bg-white/60 h-full flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-3 border-b border-border-default/40 pb-3 mb-4">
                  <img src={student.avatar} alt="" className="h-10 w-10 rounded-full bg-slate-200 border border-border-default" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-text-heading leading-tight truncate">{student.name}</h4>
                    <p className="text-[10px] text-text-muted font-bold mt-0.5">Grade {student.grade}-{student.section} • {student.school.slice(0, 15)}</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-text-body">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Aptitude Score:</span>
                    <span className="font-bold text-brand-blue">{student.academic}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Growth Score:</span>
                    <span className="font-bold text-brand-blue">{student.growthScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">ILDF Maturity:</span>
                    <span className="rounded-md bg-brand-blue/5 border border-brand-blue/15 px-2 py-0.5 text-[8.5px] font-bold text-brand-blue uppercase">
                      {student.stage}
                    </span>
                  </div>
                  {student.riskLevel !== "low" && (
                    <div className="flex justify-between">
                      <span className="text-text-muted">Risk Alert:</span>
                      <span className={`inline-flex items-center gap-1 text-[8.5px] font-bold border rounded px-1.5 py-0.5 ${
                        student.riskLevel === "high" 
                          ? "bg-destructive/5 border-destructive/15 text-destructive" 
                          : "bg-warning/5 border-warning/15 text-warning"
                      }`}>
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {student.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-border-default/30 flex gap-2">
                <button className="flex-1 text-center rounded-xl border border-border-default bg-white/70 py-2 text-[10px] font-bold text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
                  Notes
                </button>
                <button className="flex-1 text-center rounded-xl gradient-brand py-2 text-[10px] font-bold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer">
                  Manage Plan
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
