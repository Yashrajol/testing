import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";
import { monthlyGrowth, radarData } from "@/lib/mock-data";
import { BarChart3, TrendingUp, Users, Brain } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/admin/analytics")({
  component: AdminAnalyticsPage,
  head: () => ({ meta: [{ title: "School Analytics — School Admin" }] }),
});

const stagesDistribution = [
  { name: "Discover", value: 142, color: "var(--brand-blue)" },
  { name: "Explore", value: 118, color: "var(--brand-teal)" },
  { name: "Align", value: 96, color: "var(--brand-orange)" },
  { name: "Prepare", value: 84, color: "var(--brand)" },
  { name: "Achieve", value: 60, color: "var(--brand-purple)" },
];

function AdminAnalyticsPage() {
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
      <PageHeader title="School Analytics" subtitle="Aggregate diagnostics and development metrics dashboard." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Growth index */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-base font-bold text-text-heading">Development Indices</h3>
                <p className="text-xs text-text-muted mt-0.5">Cohort averages across the year</p>
              </div>
              <span className="rounded-full bg-brand-blue/5 border border-brand-blue/15 px-2.5 py-0.5 text-[10px] font-bold text-brand-blue">School-wide</span>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="academicAnalytics" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" name="Academic Average" dataKey="academic" stroke="var(--brand-blue)" fill="url(#academicAnalytics)" strokeWidth={2.5} />
                  <Area type="monotone" name="Skills Average" dataKey="skills" stroke="var(--brand-teal)" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" name="Wellbeing Average" dataKey="wellbeing" stroke="var(--brand-orange)" fill="transparent" strokeWidth={2} strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* ILDF stage distribution */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60">
            <div>
              <h3 className="font-display text-base font-bold text-text-heading">ILDF Stage Spread</h3>
              <p className="text-xs text-text-muted mt-0.5">Active stages cohort count</p>
            </div>
            <div className="mt-6 h-60 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stagesDistribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75}>
                    {stagesDistribution.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Radar metrics average */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Baseline Dimensions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={radarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="dimension" tick={{ fill: "var(--text-heading)", fontSize: 9 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 9 }} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar name="DPS School Average" dataKey="score" fill="var(--brand-blue)" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar name="Global Benchmark" dataKey="benchmark" fill="var(--border-default)" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Core Stats */}
        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Active Student Enrollment", value: "500", desc: "+12.4% YoY Growth", icon: Users, color: "var(--brand-blue)" },
            { label: "AI Diagnostic Completion", value: "88%", desc: "Grade 10 completed tests", icon: Brain, color: "var(--brand-teal)" },
            { label: "Average Growth Indicator", value: "+22%", desc: "Consolidated development index", icon: TrendingUp, color: "var(--brand-orange)" },
            { label: "Assigned Advisors", value: "12", desc: "42 Mentees per advisor average", icon: BarChart3, color: "var(--brand)" }
          ].map((stat, i) => (
            <GlassCard key={i} className="p-5 border border-border-default/50 bg-white/60 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</span>
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-50 border border-border-default text-brand-blue" style={{ color: stat.color }}>
                  <stat.icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="font-display text-2xl font-extrabold text-text-heading">{stat.value}</div>
                <div className="text-[9px] text-text-muted font-bold mt-0.5">{stat.desc}</div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
