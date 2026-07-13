import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { FileText, Shield, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/super/activity")({
  component: SuperActivityPage,
  head: () => ({ meta: [{ title: "Platform Logs — Super Admin" }] }),
});

const auditLogs = [
  { id: "LOG201", user: "Vedhkrit Ops (Super)", action: "Edited pricing plan structure (Starter)", ip: "192.168.1.42", time: "10m ago" },
  { id: "LOG202", user: "Meera Banerjee (Admin)", action: "Onboarded student STU0412", ip: "10.0.4.15", time: "1h ago" },
  { id: "LOG203", user: "Priya Iyer (Mentor)", action: "Logged intervention alert for STU0012", ip: "172.16.8.22", time: "2h ago" },
  { id: "LOG204", user: "Rohan Sharma (Parent)", action: "Accessed report card REP001 PDF", ip: "192.168.4.10", time: "Yesterday" }
];

function SuperActivityPage() {
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
      <PageHeader title="Activity Logs" subtitle="Review platform audit logs and security interactions." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Logs table */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="text-base font-display font-bold text-text-heading mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-blue" />
              Platform Interactions Audit
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-text-muted uppercase border-b border-border-default">
                  <tr>
                    <th className="py-2.5 font-bold">Log ID</th>
                    <th className="py-2.5 font-bold">Operator</th>
                    <th className="py-2.5 font-bold">Activity Action</th>
                    <th className="py-2.5 font-bold">IP Source</th>
                    <th className="py-2.5 font-bold text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log, i) => (
                    <tr key={i} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                      <td className="py-3 font-semibold text-text-heading">{log.id}</td>
                      <td className="py-3 font-bold text-brand-blue">{log.user}</td>
                      <td className="py-3 text-text-body font-semibold">{log.action}</td>
                      <td className="py-3 text-text-muted font-mono">{log.ip}</td>
                      <td className="py-3 text-right text-text-muted font-bold">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Security Summary */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 text-left flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-brand-blue animate-pulse" />
                Security Summary
              </h3>
              <div className="space-y-4 text-xs text-text-body">
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">SSL certificate:</span>
                  <span className="font-bold text-brand-teal">ACTIVE (SHA256)</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">Audit trail status:</span>
                  <span className="font-bold text-brand-teal">Logging Active</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted">Database size:</span>
                  <span className="font-bold text-text-heading">142.5 MB</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
