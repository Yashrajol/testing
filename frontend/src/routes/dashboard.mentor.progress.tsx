import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Award, Download } from "lucide-react";
import { motion } from "motion/react";
import { useMentorDashboard, useMentorAttendance } from "@/features/mentor/queries";
import { useMentorAnalytics } from "@/features/analytics/queries";
import { ExportModal, SkeletonCharts } from "@/features/analytics/components";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/dashboard/mentor/progress")({
  component: MentorProgressPage,
  head: () => ({ meta: [{ title: "Cohort Progress — Mentor Portal" }] }),
});

const defaultCohortWeeklyTrend = [
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
  const [showExportModal, setShowExportModal] = useState(false);
  const { data: dashboardData, isLoading: dashboardLoading } = useMentorDashboard();
  const { data: attendanceData, isLoading: attendanceLoading } = useMentorAttendance();
  const { data: mentorAnalytics } = useMentorAnalytics();

  const isLoading = dashboardLoading || attendanceLoading;

  const chartData = useMemo(() => {
    if (mentorAnalytics?.growthTrends && mentorAnalytics.growthTrends.length > 0) {
      return mentorAnalytics.growthTrends.map((g, idx) => ({
        week: g.month || `Week ${idx + 1}`,
        score: g.overall,
        attendance: g.attendance,
      }));
    }
    if (attendanceData && attendanceData.length > 0) {
      return defaultCohortWeeklyTrend.map((w, idx) => ({
        ...w,
        attendance: Math.round(attendanceData[idx % attendanceData.length]?.percentage || w.attendance),
      }));
    }
    return defaultCohortWeeklyTrend;
  }, [mentorAnalytics, attendanceData]);

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
        <PageHeader title="Cohort Progress" subtitle="Loading analytics and progress trends..." />
        <SkeletonCharts />
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
      <PageHeader 
        title="Cohort Progress" 
        subtitle="Observe weekly academic and skill maturation indices across your cohorts." 
        action={
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-800 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" /> Export Cohort Report
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly line chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <h3 className="font-display text-base font-bold text-text-heading mb-4">Cohort Weekly Performance</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

      {/* Export Report Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        reportType="mentor"
        title="Export Cohort Analytics Report"
      />
    </motion.div>
  );
}
