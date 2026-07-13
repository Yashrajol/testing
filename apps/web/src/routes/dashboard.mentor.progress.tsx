import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { TrendingUp, Award, Calendar } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/mentor/progress")({
  component: MentorProgressPage,
  head: () => ({ meta: [{ title: "Cohort Progress — Mentor Portal" }] }),
});

const cohortWeeklyTrend = [
  { week: "Week 1", score: 62, attendance: 90 },
  { week: "Week 2", score: 65, attendance: 92 },
  { week: "Week 3", score: 64, attendance: 91 },
  { week: "Week 4", score: 68, attendance: 94 },
  { week: "Week 5", score: 71, attendance: 95 },
  { week: "Week 6", score: 74, attendance: 96 },
  { week: "Week 7", score: 78, attendance: 95 },
  { week: "Week 8", score: 81, attendance: 97 },
];

function MentorProgressPage() {
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
      <PageHeader title="Cohort Progress" subtitle="Observe weekly academic and skill maturation indices across your cohorts." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly line chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Cohort Weekly Performance</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohortWeeklyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="week" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" name="Maturity Index" dataKey="score" stroke="var(--brand-blue)" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" name="Attendance Average" dataKey="attendance" stroke="var(--brand-teal)" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Milestone logs */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-brand-blue" />
              Cohort Milestones
            </h3>
            <div className="space-y-4 text-left">
              {[
                { title: "VAK Learning diagnostics finished", desc: "95% completion rate across Grade 10 cohorts.", date: "Completed" },
                { title: "Electives PCM counseling logs", desc: "PCM compatibility reports compiled.", date: "Completed" },
                { title: "Junior Coding Hackathon enrollments", desc: "Action plans dispatched to mentees.", date: "Active" }
              ].map((m, idx) => (
                <div key={idx} className="border-l-2 border-brand-teal pl-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-text-heading leading-tight">{m.title}</span>
                    <span className="text-[8px] font-bold text-brand-teal uppercase">{m.date}</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1 leading-normal">{m.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
