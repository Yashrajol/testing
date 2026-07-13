import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { StatCard } from "@/components/stat-card";
import { Building2, DollarSign, Users, Activity } from "lucide-react";
import { schoolList, platformRevenue } from "@/lib/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/super/")({
  component: SuperOverview,
  head: () => ({ meta: [{ title: "Platform Control Center — Super Admin" }] }),
});

function SuperOverview() {
  const totalStudents = schoolList.reduce((a, s) => a + s.students, 0);
  const mrr = platformRevenue[platformRevenue.length - 1].mrr;

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
      <PageHeader title="Platform Control Center" subtitle={`${schoolList.length} schools • ${totalStudents.toLocaleString()} students`} />
      
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="MRR" value={`₹${(mrr/1000).toFixed(0)}K`} trend="▲ 14% MoM" accent="accent" />
        <StatCard icon={Building2} label="Schools Onboarded" value={schoolList.length} trend="▲ 3 this month" accent="primary" />
        <StatCard icon={Users} label="Total Students" value={totalStudents.toLocaleString()} trend="▲ 8.2% YoY" accent="primary" />
        <StatCard icon={Activity} label="Active Sessions/day" value="2,486" trend="▲ 12%" accent="warning" />
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Monthly Recurring Revenue</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand-teal)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--brand-teal)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" name="MRR (INR)" dataKey="mrr" stroke="var(--brand-teal)" fill="url(#mrrGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-text-heading mb-4">Activity Summary</h3>
              <div className="space-y-4 text-xs text-text-body text-left">
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">Database Health:</span>
                  <span className="font-bold text-brand-teal">99.98% OK</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">API Latency Avg:</span>
                  <span className="font-bold text-brand-blue">42ms</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">PWA Cache hits:</span>
                  <span className="font-bold text-text-heading">94.1%</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
