import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { upcomingSessions } from "@/lib/mock-data";
import { Calendar, Video, Clock, CheckCircle2, User } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/mentor/sessions")({
  component: MentorSessionsPage,
  head: () => ({ meta: [{ title: "Advisory Sessions — Mentor Portal" }] }),
});

function MentorSessionsPage() {
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
      <PageHeader 
        title="Session Schedule" 
        subtitle="Manage upcoming mentoring check-ins, record session notes, and submit ratings." 
        action={
          <button className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
            + Schedule Session
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sessions list */}
        <div className="lg:col-span-2 space-y-4">
          {upcomingSessions.map((session, i) => (
            <motion.div key={i} variants={itemVariants}>
              <GlassCard className="p-4 border border-border-default/50 bg-white/60 hover:bg-white/80 transition-all text-left">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-blue/5 border border-brand-blue/15 flex items-center justify-center text-brand-blue">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-text-heading leading-tight truncate">{session.topic}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[10px] text-brand-blue font-bold">Mentee: {session.mentor}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-[9px] text-text-muted font-semibold">{session.date}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="rounded bg-brand-blue/10 px-1.5 py-0.5 text-[8px] font-bold text-brand-blue uppercase tracking-wider">
                          {session.stage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="rounded-xl border border-border-default bg-white p-2 text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
                      <Video className="h-4 w-4" />
                    </button>
                    <button className="rounded-xl gradient-brand px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer">
                      Start Session
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Status statistics card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 text-left flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-brand-blue animate-pulse" />
                Session Metrics
              </h3>
              <div className="space-y-4 text-xs text-text-body">
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">Completed this month:</span>
                  <span className="font-bold text-brand-teal">24 sessions</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">Scheduled today:</span>
                  <span className="font-bold text-brand-blue">3 sessions</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">No-show rate:</span>
                  <span className="font-bold text-text-heading">1.2%</span>
                </div>
              </div>
            </div>
            
            <button className="mt-6 w-full text-center rounded-xl border border-border-default bg-white/70 py-2.5 text-xs font-bold text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
              View Analytics Summary
            </button>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
