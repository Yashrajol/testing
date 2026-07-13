import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { platformRevenue } from "@/lib/mock-data";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Users, Activity } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/super/users")({
  component: SuperUsersPage,
  head: () => ({ meta: [{ title: "Users Directory — Super Admin" }] }),
});

function SuperUsersPage() {
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
      <PageHeader title="User Accounts" subtitle="Monitor platform student, parent, and advisor registration trends." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Growth */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">User Growth Trends</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Bar name="Active Accounts" dataKey="users" fill="var(--brand-blue)" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Roles breakdown */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 text-left">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Platform Roles Spread</h3>
            <div className="space-y-4 text-xs text-text-body">
              <div className="flex justify-between border-b border-border-default/30 pb-2">
                <span className="text-text-muted">Student Accounts:</span>
                <span className="font-bold text-brand-teal">12,480 users</span>
              </div>
              <div className="flex justify-between border-b border-border-default/30 pb-2">
                <span className="text-text-muted">Parent Accounts:</span>
                <span className="font-bold text-brand-blue">9,850 users</span>
              </div>
              <div className="flex justify-between border-b border-border-default/30 pb-2">
                <span className="text-text-muted">Mentor/Advisor Accounts:</span>
                <span className="font-bold text-brand-orange">420 users</span>
              </div>
              <div className="flex justify-between border-b border-border-default/30 pb-2">
                <span className="text-text-muted">School Admins:</span>
                <span className="font-bold text-text-heading">120 users</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
