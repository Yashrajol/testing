import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { StatCard } from "@/components/stat-card";
import { TrendingUp, BookOpen, Sparkles, Award } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";
import { monthlyGrowth } from "@/lib/mock-data";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/growth")({
  component: ParentGrowthPage,
  head: () => ({ meta: [{ title: "Growth Reports — Parent Portal" }] }),
});

const skillMaturity = [
  { subject: "Problem Solving", initial: 60, current: 85 },
  { subject: "Critical Thinking", initial: 65, current: 90 },
  { subject: "Collaboration", initial: 55, current: 80 },
  { subject: "Creativity", initial: 70, current: 75 },
  { subject: "Communication", level: 60, current: 78 },
];

function ParentGrowthPage() {
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
      <PageHeader title="Growth Reports" subtitle="Observe Aarav's development metrics over the academic year." />

      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Learner Index Growth" value="+12.4%" trend="▲ 4.2% MoM" accent="primary" />
        <StatCard icon={BookOpen} label="Academic Trend" value="Consistent" accent="accent" />
        <StatCard icon={Sparkles} label="Active Skill Boosts" value="3 Skills" accent="primary" />
        <StatCard icon={Award} label="ILDF Progress" value="Explore Stage" accent="warning" />
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Growth Over Time */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <div>
              <h3 className="font-display text-base font-bold text-text-heading">Multi-Dimensional Growth</h3>
              <p className="text-xs text-text-muted mt-0.5">Development trajectory from January to December</p>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="academicGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="skillsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-teal)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--brand-teal)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" name="Academic Index" dataKey="academic" stroke="var(--brand-blue)" fill="url(#academicGrad)" strokeWidth={2.5} />
                  <Area type="monotone" name="Skills Index" dataKey="skills" stroke="var(--brand-teal)" fill="url(#skillsGrad)" strokeWidth={2.5} />
                  <Area type="monotone" name="Wellbeing Index" dataKey="wellbeing" stroke="var(--brand-orange)" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Development Milestones */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-text-heading mb-4">Milestones Reached</h3>
              <div className="space-y-4">
                {[
                  { title: "Completed DBDA Aptitude Test", desc: "Showed strong scientific/logical reasoning.", date: "Feb 14" },
                  { title: "Earned Critical Thinker Badge", desc: "Exceptional performance in mentor logic labs.", date: "Mar 02" },
                  { title: "Stream Selection Seminar", desc: "Attended career alignment check-in.", date: "Mar 15" },
                ].map((m, i) => (
                  <div key={i} className="flex gap-3 text-left">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-teal" />
                    <div>
                      <h4 className="text-xs font-bold text-text-heading leading-tight">{m.title}</h4>
                      <p className="text-[10px] text-text-muted mt-0.5">{m.desc}</p>
                      <span className="text-[9px] text-brand-blue font-semibold mt-1 block">{m.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Skill Maturity Grid */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-5 border border-border-default/50 bg-white/60">
          <div>
            <h3 className="font-display text-base font-bold text-text-heading">Skill Maturity Index</h3>
            <p className="text-xs text-text-muted mt-0.5">Comparison between initial (baseline) assessment and current standing</p>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillMaturity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                <XAxis dataKey="subject" tick={{ fill: "var(--text-heading)", fontSize: 9 }} tickLine={false} />
                <YAxis tick={{ fill: "var(--text-muted)", fontSize: 9 }} tickLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar name="Initial Baseline" dataKey="initial" fill="var(--border-default)" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar name="Current standing" dataKey="current" fill="var(--brand-teal)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
