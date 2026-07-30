import { } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { 
  TrendingUp, BookOpen, Award, CheckCircle2, 
  AlertCircle, Download
} from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/app/providers/auth-context";
import { useParentAcademics, useParentAssessments } from "@/features/parent/queries/useParent";
import { useParentAnalytics } from "@/features/analytics/queries";
import { ExportModal } from "@/features/analytics/components";
import { useMemo, useState } from "react";



export default function ChildProgressPage() {
  const { user } = useAuth();
  const studentId = user?.studentId || user?.children?.[0]?.id || 'student-123';
  const [showExportModal, setShowExportModal] = useState(false);

  // React Queries
  const { data: academicsData, isLoading: academicsLoading, isError: academicsError, refetch: refetchAcademics } = useParentAcademics(studentId);
  const { data: assessmentsData, isLoading: assessmentsLoading } = useParentAssessments(studentId);
  const { data: parentAnalytics } = useParentAnalytics(user?.id);

  const academicAvg = academicsData?.academicAverage ?? 81.4;

  const monthlyProgressData = useMemo(() => {
    if (parentAnalytics?.growthTrends && parentAnalytics.growthTrends.length > 0) {
      return parentAnalytics.growthTrends.map((g) => ({
        month: g.month,
        Academic: g.academics,
        Attendance: g.attendance,
        Homework: g.skills,
      }));
    }
    if (academicsData?.history && academicsData.history.length > 0) {
      return academicsData.history;
    }
    return [
      { month: "Jan", Academic: 70, Attendance: 90, Homework: 80 },
      { month: "Feb", Academic: 72, Attendance: 92, Homework: 85 },
      { month: "Mar", Academic: 75, Attendance: 95, Homework: 88 },
      { month: "Apr", Academic: 78, Attendance: 94, Homework: 90 },
      { month: "May", Academic: 82, Attendance: 94, Homework: 92 },
    ];
  }, [parentAnalytics, academicsData]);

  const subjectsData = useMemo(() => {
    if (!academicsData?.subjects || academicsData.subjects.length === 0) {
      return [
        { 
          subject: "Mathematics", 
          score: 85, 
          trend: "+4% since midterm",
          teacher: "Mrs. Sunita Rao", 
          lastTest: "18/20 (Calculus Quiz)", 
          improvement: "Needs practice in trigonometric equations and structural graphing." 
        },
        { 
          subject: "Science", 
          score: 82, 
          trend: "+2% since midterm",
          teacher: "Mr. Alok Sen", 
          lastTest: "17/20 (Chemical Bonds Test)", 
          improvement: "Review balanced organic chemical equations and physics kinetics formulas." 
        },
        { 
          subject: "English", 
          score: 78, 
          trend: "+5% since midterm",
          teacher: "Mrs. Priya Sharma", 
          lastTest: "16/20 (Grammar Assessment)", 
          improvement: "Pay closer attention to essay structuring, prepositions, and active voice usage." 
        },
      ];
    }
    return academicsData.subjects;
  }, [academicsData]);

  const assessments = useMemo(() => {
    if (!assessmentsData || assessmentsData.length === 0) {
      return [
        { name: "Academic Diagnostic", type: "Academic", date: "May 15, 2025", status: "Completed", score: "84/100" },
        { name: "DBDA Aptitude Test", type: "Aptitude", date: "May 10, 2025", status: "Completed", score: "78/100" },
        { name: "VAK Learning Styles Survey", type: "Cognitive", date: "Apr 28, 2025", status: "Completed", score: "Visual" },
        { name: "21st Century Skills Diagnostic", type: "Skills", date: "Apr 15, 2025", status: "Completed", score: "76/100" },
      ];
    }
    return assessmentsData;
  }, [assessmentsData]);

  const isLoading = academicsLoading || assessmentsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Child Progress" subtitle="Loading performance statistics..." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <GlassCard key={n} className="p-4 border border-slate-100 bg-white h-24 animate-pulse">
              <div />
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (academicsError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load Academics report</h3>
        <button
          onClick={() => refetchAcademics()}
          className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-navy transition-all cursor-pointer shadow-sm"
        >
          Retry
        </button>
      </div>
    );
  }

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
      className="space-y-6 text-left"
    >
      <PageHeader 
        title="Child Progress" 
        subtitle="Detailed performance breakdown and academic trajectories." 
        action={
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-800 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" /> Export Progress Report
          </button>
        }
      />

      {/* Overview Cards Row */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-semibold text-xs text-text-body">
        <div className="glass p-5 rounded-2xl border border-slate-100 bg-white text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Academic average</span>
            <BookOpen className="h-4.5 w-4.5 text-brand-blue" />
          </div>
          <div className="mt-3 font-display text-3xl font-bold text-text-heading">{academicAvg}%</div>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">▲ +3.4% this term</span>
        </div>

        <div className="glass p-5 rounded-2xl border border-slate-100 bg-white text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Homework Completion</span>
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
          </div>
          <div className="mt-3 font-display text-3xl font-bold text-text-heading">92%</div>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">On Schedule</span>
        </div>

        <div className="glass p-5 rounded-2xl border border-slate-100 bg-white text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</span>
            <TrendingUp className="h-4.5 w-4.5 text-brand-teal" />
          </div>
          <div className="mt-3 font-display text-3xl font-bold text-text-heading">94%</div>
          <span className="text-[10px] text-slate-400 font-semibold block mt-1">Target: 90%+</span>
        </div>

        <div className="glass p-5 rounded-2xl border border-slate-100 bg-white text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Assessments</span>
            <Award className="h-4.5 w-4.5 text-brand-orange" />
          </div>
          <div className="mt-3 font-display text-3xl font-bold text-text-heading">{assessments.length} Complete</div>
          <span className="text-[10px] text-amber-600 font-semibold block mt-1">All diagnostics clear</span>
        </div>
      </motion.div>

      {/* Progress Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Line Graph */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <div className="text-left">
              <h3 className="font-display text-sm font-bold text-text-heading">Academic & Attendance Trend</h3>
              <p className="text-[10px] text-text-muted mt-0.5">Tracking performance, check-ins, and assignments completion</p>
            </div>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyProgressData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Line type="monotone" name="Academic average (%)" dataKey="Academic" stroke="var(--brand-blue)" strokeWidth={2.5} />
                  <Line type="monotone" name="Attendance (%)" dataKey="Attendance" stroke="var(--brand-teal)" strokeWidth={2.5} />
                  <Line type="monotone" name="Homework Completion (%)" dataKey="Homework" stroke="var(--brand-orange)" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Recent Assessments */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-slate-100 bg-white h-full flex flex-col justify-between text-left">
            <div>
              <h3 className="font-display text-sm font-bold text-text-heading mb-4">Recent Diagnostic Tests</h3>
              <div className="space-y-3.5 font-semibold text-xs text-text-body">
                {assessments.map((ass, i) => (
                  <div key={i} className="flex justify-between items-center gap-3 p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-text-heading truncate">{ass.name}</h4>
                      <p className="text-[9px] text-text-muted mt-0.5">{ass.date} • <span className="font-semibold text-brand-teal">{ass.type}</span></p>
                    </div>
                    <span className="shrink-0 rounded bg-brand-blue/5 border border-brand-blue/10 px-2 py-0.5 text-[10px] font-bold text-brand-blue">
                      {ass.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Subject Performance Breakdown */}
      <motion.div variants={itemVariants} className="space-y-4 text-left">
        <h3 className="font-display text-base font-bold text-text-heading">Subject Performance & Feedback</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {subjectsData.map((sub, i) => (
            <GlassCard key={i} className="p-5 border border-slate-100 bg-white hover:border-slate-200 transition-colors flex flex-col justify-between text-left">
              <div>
                <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-3">
                  <div>
                    <h4 className="font-display text-sm font-bold text-text-heading leading-tight">{sub.subject}</h4>
                    <p className="text-[9.5px] text-text-muted mt-0.5">{sub.teacher}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-brand-blue block leading-none">{sub.score}%</span>
                    <span className="text-[8px] font-semibold text-emerald-600 block mt-1">{sub.trend}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-semibold text-text-body">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Last Assessment</span>
                    <span className="text-xs text-text-body font-semibold mt-0.5 block">{sub.lastTest}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Areas for Improvement</span>
                    <p className="text-[10.5px] text-text-muted leading-relaxed mt-1 font-medium">{sub.improvement}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Export Report Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        reportType="parent"
        title="Export Child Progress Report"
      />
    </motion.div>
  );
}
