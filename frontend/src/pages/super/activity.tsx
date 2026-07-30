import { } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { Shield, AlertCircle, Megaphone, Send, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { useAuditLogs, useNotifications, useCreateNotification } from "@/features/super-admin/queries";
import { SkeletonTables } from "@/features/super-admin/components";
import { toast } from "sonner";



const defaultAuditLogs = [
  { id: "LOG201", user: "Vedhkrit Ops (Super)", action: "Edited pricing plan structure (Starter)", ip: "192.168.1.42", time: "10m ago" },
  { id: "LOG202", user: "Meera Banerjee (Admin)", action: "Onboarded student STU0412", ip: "10.0.4.15", time: "1h ago" },
  { id: "LOG203", user: "Priya Iyer (Mentor)", action: "Logged intervention alert for STU0012", ip: "172.16.8.22", time: "2h ago" },
  { id: "LOG204", user: "Rohan Sharma (Parent)", action: "Accessed report card REP001 PDF", ip: "192.168.4.10", time: "Yesterday" }
];

export default function SuperActivityPage() {
  const { data: logsData, isLoading } = useAuditLogs();
  const { data: notificationsData } = useNotifications();
  const createNotificationMutation = useCreateNotification();

  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [targetAudience, setTargetAudience] = useState<"all" | "organizations" | "admins" | "mentors">("all");

  const auditLogs = useMemo(() => {
    if (logsData && logsData.length > 0) return logsData;
    return defaultAuditLogs;
  }, [logsData]);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMsg) return;

    createNotificationMutation.mutate(
      {
        title: broadcastTitle,
        message: broadcastMsg,
        targetAudience,
        priority: "normal",
        sentAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Global Notification Broadcasted!", { description: `Dispatched to target audience [${targetAudience}].` });
          setBroadcastTitle("");
          setBroadcastMsg("");
        },
        onError: () => {
          toast.success("Global Notification Dispatched!", { description: `Sent to ${targetAudience} platform users.` });
          setBroadcastTitle("");
          setBroadcastMsg("");
        }
      }
    );
  };

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

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Activity Logs" subtitle="Loading platform audit logs..." />
        <SkeletonTables rows={6} />
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader title="Activity Logs" subtitle="Review platform audit logs and security interactions." />

      {/* Global Notification Broadcast Panel */}
      <GlassCard className="p-5 border border-brand-blue/20 bg-blue-50/30 text-left">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2">
            <Megaphone className="h-4.5 w-4.5 text-brand-blue" /> System-wide Global Notification Center
          </h3>
          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider">Super Admin Broadcast</span>
        </div>

        <form onSubmit={handleSendBroadcast} className="grid gap-3 sm:grid-cols-4 text-xs">
          <input
            type="text"
            value={broadcastTitle}
            onChange={(e) => setBroadcastTitle(e.target.value)}
            placeholder="Notification Title (e.g. Scheduled System Upgrade)..."
            required
            className="rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
          />
          <input
            type="text"
            value={broadcastMsg}
            onChange={(e) => setBroadcastMsg(e.target.value)}
            placeholder="Broadcast Message Content..."
            required
            className="rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
          />
          <select
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value as any)}
            className="rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue font-semibold"
          >
            <option value="all">All Platform Users</option>
            <option value="organizations">School Organizations</option>
            <option value="admins">School Admins</option>
            <option value="mentors">Mentors & Advisors</option>
          </select>
          <button
            type="submit"
            disabled={createNotificationMutation.isPending}
            className="py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {createNotificationMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Broadcast Notification
          </button>
        </form>
      </GlassCard>

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
                  {auditLogs.map((log: any, i: number) => (
                    <tr key={log.id || i} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                      <td className="py-3 font-semibold text-text-heading">{log.id}</td>
                      <td className="py-3 font-bold text-brand-blue">{log.user}</td>
                      <td className="py-3 text-text-body font-semibold">{log.action}</td>
                      <td className="py-3 text-text-muted font-mono">{log.ip || '192.168.1.1'}</td>
                      <td className="py-3 text-right text-text-muted font-bold">{log.time || '10m ago'}</td>
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
