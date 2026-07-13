import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { mentors } from "@/lib/mock-data";
import { UserCheck, Star, Calendar, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/admin/mentors")({
  component: AdminMentorsPage,
  head: () => ({ meta: [{ title: "Mentors Directory — School Admin" }] }),
});

function AdminMentorsPage() {
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
        title="Mentor Alignments" 
        subtitle="Review advisor assignments, cohort session ratings, and escalation triggers." 
        action={
          <button className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
            + Onboard Mentor
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mentor Table */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="text-base font-bold text-text-heading mb-4">Assigned Platform Advisors</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-text-muted uppercase border-b border-border-default">
                  <tr>
                    <th className="py-2.5 font-bold">Mentor</th>
                    <th className="py-2.5 font-bold">Expertise Domain</th>
                    <th className="py-2.5 font-bold text-center">Active Mentees</th>
                    <th className="py-2.5 font-bold text-center">Sessions Logged</th>
                    <th className="py-2.5 font-bold text-center">Avg Rating</th>
                    <th className="py-2.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mentors.slice(0, 10).map((m, i) => (
                    <tr key={i} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                      <td className="py-3 font-bold text-text-heading">
                        <div className="flex items-center gap-2">
                          <img src={m.avatar} alt="" className="h-6 w-6 rounded-full bg-slate-200" />
                          <span>{m.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-text-body font-semibold">{m.expertise}</td>
                      <td className="py-3 text-center text-text-heading font-bold">{m.students} Mentees</td>
                      <td className="py-3 text-center text-text-muted">{m.sessions}</td>
                      <td className="py-3 text-center font-bold text-brand-orange">
                        <span className="inline-flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-brand-orange text-brand-orange" />
                          {m.rating}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button className="text-[10px] font-bold text-brand-teal hover:text-brand-blue transition-colors flex items-center gap-0.5 ml-auto">
                          Details
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Action items sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <UserCheck className="h-5 w-5 text-brand-blue" />
              Advisory Summaries
            </h3>
            <div className="space-y-4 text-left">
              <div className="border-l-2 border-brand-teal pl-3">
                <span className="text-[9px] font-bold text-brand-teal uppercase tracking-wider block">Session Completion</span>
                <span className="text-xs font-bold text-text-heading mt-0.5 block">92% weekly checklist targets met</span>
                <p className="text-[10px] text-text-muted mt-1 leading-normal">Mentors are actively conducting Explore & Align stream diagnostic sessions.</p>
              </div>
              <div className="border-l-2 border-brand-orange pl-3">
                <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider block">Escalation Flag</span>
                <span className="text-xs font-bold text-text-heading mt-0.5 block">3 wellbeing index alerts triggered</span>
                <p className="text-[10px] text-text-muted mt-1 leading-normal">Advisors noted increased exam stress spikes. Guided parent templates dispatched.</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
