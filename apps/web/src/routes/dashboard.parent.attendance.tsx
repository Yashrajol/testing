import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { StatCard } from "@/components/stat-card";
import { Calendar, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/attendance")({
  component: ParentAttendancePage,
  head: () => ({ meta: [{ title: "Attendance Tracking — Parent Portal" }] }),
});

const monthlyStats = [
  { month: "January", present: 20, absent: 1, leave: 1 },
  { month: "February", present: 19, absent: 0, leave: 1 },
  { month: "March (Active)", present: 11, absent: 0, leave: 0 },
];

function ParentAttendancePage() {
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
      <PageHeader title="Attendance Logs" subtitle="Verify Aarav's academic attendance status and schedules." />

      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={CheckCircle2} label="Current Session Attendance" value="95.4%" trend="▲ 0.8% since last month" accent="primary" />
        <StatCard icon={Clock} label="Late arrivals" value="0 Days" accent="accent" />
        <StatCard icon={Calendar} label="Approved leaves" value="2 Days" accent="warning" />
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Logs */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-brand-blue" />
              Monthly Breakdowns
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-text-muted uppercase border-b border-border-default">
                  <tr>
                    <th className="py-2.5 font-bold">Month</th>
                    <th className="py-2.5 font-bold text-center">Working Days</th>
                    <th className="py-2.5 font-bold text-center">Days Present</th>
                    <th className="py-2.5 font-bold text-center">Days Absent</th>
                    <th className="py-2.5 font-bold text-center">Leaves Taken</th>
                    <th className="py-2.5 font-bold text-right">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyStats.map((stat, i) => {
                    const total = stat.present + stat.absent + stat.leave;
                    const percent = Math.round((stat.present / (total - stat.leave)) * 100);
                    return (
                      <tr key={i} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                        <td className="py-3 font-semibold text-text-heading">{stat.month}</td>
                        <td className="py-3 text-center text-text-body font-semibold">{total}</td>
                        <td className="py-3 text-center text-brand-teal font-bold">{stat.present}</td>
                        <td className="py-3 text-center text-brand-orange font-bold">{stat.absent}</td>
                        <td className="py-3 text-center text-text-muted">{stat.leave}</td>
                        <td className="py-3 text-right font-bold text-brand-blue">{percent}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Attendance Notification Sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-brand-blue" />
              Notifications
            </h3>
            <div className="space-y-3 text-left">
              <div className="p-3 rounded-xl border border-border-default/50 bg-white/40">
                <span className="text-[10px] font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/15 px-2 py-0.5 rounded">Attendance Check</span>
                <p className="mt-2 text-xs text-text-body leading-relaxed">Aarav was marked <b>Present</b> for all session modules on March 18th.</p>
                <span className="text-[9px] text-text-muted mt-1 block">1 day ago</span>
              </div>
              <div className="p-3 rounded-xl border border-border-default/50 bg-white/40">
                <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/5 border border-brand-orange/15 px-2 py-0.5 rounded">Leave Request Approved</span>
                <p className="mt-2 text-xs text-text-body leading-relaxed">Personal leave requested for Feb 12th approved by Principal Rao.</p>
                <span className="text-[9px] text-text-muted mt-1 block">1 month ago</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
