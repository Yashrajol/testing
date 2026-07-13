import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { students } from "@/lib/mock-data";
import { AlertTriangle, Clock, Calendar, Check } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/mentor/alerts")({
  component: MentorAlertsPage,
  head: () => ({ meta: [{ title: "Risk Alerts — Mentor Portal" }] }),
});

const myStudents = students.slice(0, 12);
const alerts = myStudents.filter(s => s.riskLevel !== "low");

function MentorAlertsPage() {
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
      <PageHeader title="Risk Warnings" subtitle="Inspect and log interventions for students displaying declines in wellbeing or coursework indices." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Alerts list */}
        <div className="lg:col-span-2 space-y-4">
          {alerts.map((student, i) => (
            <motion.div key={i} variants={itemVariants}>
              <GlassCard className="p-5 border border-destructive/20 bg-destructive/5 text-left flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start border-b border-destructive/10 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt="" className="h-9 w-9 rounded-full bg-slate-200" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-text-heading leading-tight truncate">{student.name}</h4>
                        <p className="text-[9px] text-text-muted font-bold mt-0.5">Grade {student.grade}-{student.section} • {student.school.slice(0, 15)}</p>
                      </div>
                    </div>
                    
                    <span className="inline-flex items-center gap-1 text-[8px] font-bold border border-destructive/20 bg-destructive/10 rounded-full px-2.5 py-0.5 text-destructive uppercase tracking-wider">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {student.riskLevel.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-text-body font-semibold">
                    Warning: Wellbeing index dipped 12% in the last 2 weeks (Current: {student.wellbeing}/100).
                  </p>
                  <p className="text-[11px] text-text-muted leading-relaxed mt-2">
                    Action Required: Schedule a 30-minute check-in with the parent and student to discuss exam stress.
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-destructive/10 flex gap-2 justify-end">
                  <button className="rounded-xl border border-border-default bg-white px-3.5 py-1.5 text-xs font-semibold text-text-heading hover:bg-bg-secondary transition-colors cursor-pointer">
                    Schedule Call
                  </button>
                  <button className="rounded-xl bg-destructive text-white px-3.5 py-1.5 text-xs font-bold shadow-md hover:bg-red-600 transition-colors cursor-pointer">
                    Acknowledge & Intervene
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Analytics Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 text-left flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-brand-orange" />
                Interventions Status
              </h3>
              
              <div className="space-y-4 text-xs text-text-body">
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">High Risk Alerts:</span>
                  <span className="font-bold text-destructive">1 active</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">Medium Risk Alerts:</span>
                  <span className="font-bold text-brand-orange">2 active</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">Interventions logged:</span>
                  <span className="font-bold text-brand-teal">8 resolved</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
