import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/shared/ui/glass-card";
import {
  Check,
  Lock,
  Sparkles,
  ArrowRight,
  Calendar,
  ListTodo,
  Award,
  CheckSquare,
  Square,
  BookOpen,
  Clock,
  Users,
  Flame,
  Book,
  Compass,
  FileText,
  Download,
  HelpCircle,
  Video,
  AlertCircle,
  Play,
  GraduationCap,
  Activity,
  UserCheck,
  ChevronRight,
  ClipboardCheck,
  Bell
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/providers/auth-context";
import { useStudentDashboard } from "@/features/dashboard/queries/use-student-dashboard";
import { useNotifications } from "@/features/notifications/queries/useNotifications";
import { cn } from "@/shared/utils/utils";
import { toast } from "sonner";
import { useAssessmentStatus } from "@/shared/constants/assessment-status";
import { studentAvatar } from "@/shared/utils/avatars";
import { SelfAssessmentModal } from "@/features/assessments/components/self-assessment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";

export const Route = createFileRoute("/dashboard/student/")({
  component: StudentDashboardOverview,
  head: () => ({ meta: [{ title: "Student Dashboard — Vedhkrit" }] }),
});

function StudentDashboardOverview() {
  const { user } = useAuth();
  const studentId = user?.id || 'student-123';
  const { data: dashboardData, isLoading, isError, refetch } = useStudentDashboard(studentId);
  const { data: notificationsData } = useNotifications(studentId);

  const [homeworkCheck, setHomeworkCheck] = useState<Array<{ id: string | number; text: string; done: boolean }>>([]);
  const [revisionGoals, setRevisionGoals] = useState<Array<{ id: string | number; text: string; done: boolean }>>([]);

  useEffect(() => {
    if (dashboardData?.assignmentStatus) {
      if (dashboardData.assignmentStatus.checklist) {
        setHomeworkCheck(dashboardData.assignmentStatus.checklist);
      }
      if (dashboardData.assignmentStatus.revisionGoals) {
        setRevisionGoals(dashboardData.assignmentStatus.revisionGoals);
      }
    }
  }, [dashboardData]);

  const [pomoTime, setPomoTime] = useState(1500); // 25 mins
  const [pomoRunning, setPomoRunning] = useState(false);
  const { done: assessmentDone, markDone } = useAssessmentStatus();
  const [showAssessmentPrompt, setShowAssessmentPrompt] = useState(false);
  const [showSelfAssessment, setShowSelfAssessment] = useState(false);

  useEffect(() => {
    if (!assessmentDone) {
      const t = setTimeout(() => setShowAssessmentPrompt(true), 600);
      return () => clearTimeout(t);
    }
  }, [assessmentDone]);

  useEffect(() => {
    let interval: any = null;
    if (pomoRunning) {
      interval = setInterval(() => {
        setPomoTime(prev => {
          if (prev <= 1) {
            setPomoRunning(false);
            toast.success("Focus session completed! Take a 5-minute break.");
            return 1500;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pomoRunning]);

  const userName = dashboardData?.studentName || user?.name || "Student";

  if (isLoading) {
    return (
      <div className="flex h-[60dvh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load dashboard data</h3>
        <p className="text-xs text-text-muted max-w-sm">
          Something went wrong while connecting to the server. Please check your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
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

  // Circular progress helper
  const CircularProgress = ({ percent, size = 52, strokeWidth = 5, colorClass = "text-brand-blue" }: { percent: number; size?: number; strokeWidth?: number; colorClass?: string }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            className="text-slate-100"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={cn("transition-all duration-500 ease-out", colorClass)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <span className="absolute text-[10.5px] font-black text-text-heading">{percent}%</span>
      </div>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      {/* Top Section: Hero Banner & Vedhkrit Index */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hero Card */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 relative overflow-hidden shadow-xs min-h-60 flex flex-col justify-between">
            <div className="z-10 max-w-[65%] space-y-2">
              <h2 className="font-display text-3xl font-extrabold text-text-heading flex items-center gap-2">
                Good Morning, {userName.split(' ')[0]}! 👋
              </h2>
              <p className="text-xs text-text-muted">Let's make today another great day of learning. You've got this! 💪</p>
            </div>

            {/* Student metadata tags — kept to the left so they never overlap the portrait */}
            <div className="z-10 grid grid-cols-2 gap-y-3 gap-x-4 pt-6 border-t border-slate-100/60 mt-4 text-[11px] font-medium text-text-muted max-w-[62%]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-brand-blue"><BookOpen className="h-3.5 w-3.5" /></div>
                <div><span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">School</span>{dashboardData?.profile?.schoolName || "Delhi Public School"}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600"><GraduationCap className="h-3.5 w-3.5" /></div>
                <div><span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Class & Section</span>{dashboardData?.profile?.className ? `${dashboardData.profile.className} - ${dashboardData.profile.sectionName || ''}` : "Class IX - A"}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-teal-50 text-brand-teal"><Activity className="h-3.5 w-3.5" /></div>
                <div><span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Batch</span>{dashboardData?.profile?.batchName || "Foundation A1"}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-orange-50 text-brand-orange"><Award className="h-3.5 w-3.5" /></div>
                <div><span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Roll Number</span>{dashboardData?.profile?.rollNumber || "23"}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-50 text-slate-600"><Calendar className="h-3.5 w-3.5" /></div>
                <div><span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Academic Year</span>{dashboardData?.profile?.academicYear || "2026 - 27"}</div>
              </div>
            </div>

            {/* Student Portrait Image */}
            <div className="absolute right-6 bottom-0 top-8 w-[28%] flex items-end justify-end pointer-events-none z-0">
              <img
                src={studentAvatar(0, 400)}
                className="h-[85%] object-cover object-top opacity-90 mix-blend-multiply select-none pointer-events-none rounded-2xl"
                alt=""
              />
            </div>
          </div>
        </motion.div>

        {/* Vedhkrit Index Card — or the self-assessment highlight for accounts that haven't taken it yet */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          {assessmentDone ? (
            <GlassCard className="p-6 border border-slate-100 bg-white h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Vedhkrit Index™</span>
                  <h3 className="font-display text-4xl font-black text-brand-orange mt-1.5 flex items-baseline gap-1">
                    {dashboardData?.vedhkritIndex?.value ?? 82}<span className="text-sm font-semibold text-text-muted">/100</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                    {dashboardData?.vedhkritIndex?.status || "Great Progress"}
                  </span>
                </div>
                {/* Mini Sparkline Chart */}
                <div className="w-20 h-12 pt-2">
                  <svg className="w-full h-full" viewBox="0 0 100 40">
                    {dashboardData?.vedhkritIndex?.history && dashboardData.vedhkritIndex.history.length > 1 ? (
                      <path
                        d={dashboardData.vedhkritIndex.history.reduce((acc, val, i, arr) => {
                          const x = (i / (arr.length - 1)) * 90 + 5;
                          const y = 35 - (val / 100) * 30;
                          return acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`);
                        }, "")}
                        fill="none"
                        stroke="var(--brand-orange)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="M0,35 Q15,20 30,28 T60,12 T90,5 L100,5"
                        fill="none"
                        stroke="var(--brand-orange)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    )}
                    <circle 
                      cx={dashboardData?.vedhkritIndex?.history && dashboardData.vedhkritIndex.history.length > 0 
                        ? (90 + 5) 
                        : "90"} 
                      cy={dashboardData?.vedhkritIndex?.history && dashboardData.vedhkritIndex.history.length > 0 
                        ? (35 - (dashboardData.vedhkritIndex.history[dashboardData.vedhkritIndex.history.length - 1] / 100) * 30) 
                        : "5"} 
                      r="3" 
                      fill="var(--brand-orange)" 
                    />
                  </svg>
                </div>
              </div>

              <Link
                to="/dashboard/student/skills"
                className="mt-6 w-full rounded-2xl bg-brand-blue text-white hover:bg-brand-navy py-3 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                View Full Report
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </GlassCard>
          ) : (
            <motion.div
              animate={{ boxShadow: ["0 0 0 0 rgba(249,115,22,0.35)", "0 0 0 10px rgba(249,115,22,0)", "0 0 0 0 rgba(249,115,22,0)"] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="h-full rounded-2xl"
            >
              <GlassCard className="p-6 border-2 border-brand-orange/40 bg-gradient-to-br from-orange-50/60 to-white h-full flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-brand-orange bg-white border border-brand-orange/20 px-2 py-1 rounded-full">
                    <Sparkles className="h-3 w-3" /> Unlock Your Dashboard
                  </span>
                  <h3 className="font-display text-lg font-black text-text-heading mt-3 leading-snug">
                    Take Your Self-Assessment First
                  </h3>
                  <p className="text-[11px] text-text-muted mt-1.5 leading-relaxed">
                    Finish your self-assessment to see your Index score and open up everything on your dashboard.
                  </p>
                </div>

                <button
                  onClick={() => setShowSelfAssessment(true)}
                  className="mt-6 w-full rounded-2xl bg-brand-orange text-white hover:bg-orange-600 py-3 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  Start Self-Assessment
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </GlassCard>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Unlock popup — shown once per session for accounts that haven't completed their self-assessment yet */}
      <Dialog open={showAssessmentPrompt} onOpenChange={setShowAssessmentPrompt}>
        <DialogContent className="max-w-md text-left">
          <DialogHeader>
            <div className="h-12 w-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-2">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <DialogTitle> ✨ Discover. Learn. Grow. </DialogTitle>
            <DialogDescription>Start your Self-Assessment.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
            <button
              onClick={() => {
                setShowAssessmentPrompt(false);
                setShowSelfAssessment(true);
              }}
              className="flex-1 rounded-xl bg-brand-orange text-white hover:bg-orange-600 py-2.5 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              Start Self-Assessment
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setShowAssessmentPrompt(false)}
              className="flex-1 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 py-2.5 text-center text-xs font-bold text-text-heading transition-all cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* The real 5-question self-assessment that unlocks the dashboard */}
      <SelfAssessmentModal
        open={showSelfAssessment}
        onOpenChange={setShowSelfAssessment}
        onComplete={markDone}
      />

      {/* Row 2: Today's Schedule, Continue Learning, and Your Progress / Profile */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 border border-slate-100 bg-white h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-blue" />
                  Today's Schedule
                </h3>
                <button className="text-[10px] text-brand-blue font-bold hover:underline">View Full</button>
              </div>
              <div className="space-y-4">
                {!dashboardData?.todaysLessons || dashboardData.todaysLessons.length === 0 ? (
                  <div className="text-center py-10 text-xs text-text-muted">No lessons scheduled today</div>
                ) : (
                  dashboardData.todaysLessons.map((item, idx) => (
                    <div key={item.id || idx} className="flex gap-3 relative pb-2 group">
                      <div className="flex flex-col items-center shrink-0">
                        <div className={cn(
                          "h-3 w-3 rounded-full border-2 bg-white z-10",
                          item.live ? "border-brand-orange bg-brand-orange animate-ping" :
                            item.deadline ? "border-red-500" : "border-brand-blue"
                        )} />
                        {idx < dashboardData.todaysLessons.length - 1 && <div className="w-[1.5px] bg-slate-100 flex-grow h-14" />}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9.5px] font-bold text-slate-400">{item.time}</span>
                          {item.live && (
                            <span className="text-[8px] font-bold uppercase tracking-wider text-white bg-red-500 px-1 rounded animate-pulse">LIVE</span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-text-heading truncate mt-0.5">{item.title}</h4>
                        <p className="text-[10px] text-text-muted truncate mt-0.5">{item.description || item.subject || ''}</p>
                      </div>
                      {(item.live || item.joinUrl) && (
                        <button className="h-7 px-3 bg-brand-blue text-white rounded-lg text-[10px] font-bold self-center shrink-0 hover:bg-brand-navy transition-all">
                          Join Now
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Continue Learning */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 border border-slate-100 bg-white h-full flex flex-col justify-between">
            <div className="w-full">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2">
                  <Play className="h-4 w-4 text-brand-orange fill-brand-orange" />
                  Continue Learning
                </h3>
                <button className="text-[10px] text-brand-blue font-bold hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Mathematics", chap: "Chapter 5: Lines and Angles", progress: 68, color: "bg-brand-blue", iconColor: "bg-blue-50 text-brand-blue" },
                  { name: "Science", chap: "Chapter 8: Motion", progress: 45, color: "bg-brand-teal", iconColor: "bg-teal-50 text-brand-teal" },
                  { name: "English", chap: "Chapter 3: Honeydew", progress: 30, color: "bg-brand-orange", iconColor: "bg-orange-50 text-brand-orange" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all flex flex-col justify-between h-22">
                    <div className="flex items-center gap-2.5">
                      <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center shrink-0", item.iconColor)}>
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="text-left min-w-0">
                        <h4 className="text-xs font-bold text-text-heading truncate">{item.name}</h4>
                        <p className="text-[9.5px] text-text-muted truncate mt-0.5">{item.chap}</p>
                      </div>
                      <button className="ml-auto text-[10px] font-bold text-brand-blue hover:underline flex items-center gap-0.5">
                        Continue <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                    {/* Progress slider bar */}
                    <div>
                      <div className="flex justify-between text-[9px] font-bold text-text-muted mb-1">
                        <span>Progress</span>
                        <span>{item.progress}% Completed</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Your Progress & Profile Completion */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          {/* Your Progress */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-brand-teal" />
              Your Progress
            </h3>
            <div className="grid grid-cols-3 gap-x-2 gap-y-4 text-center">
              {[
                { label: "Attendance", val: dashboardData?.attendancePercentage ?? 95, color: "text-brand-teal" },
                { label: "Overall %", val: dashboardData?.assignmentStatus?.overallPercentage ?? 87.4, color: "text-brand-blue" },
                { label: "Homework", val: dashboardData?.assignmentStatus?.homeworkCompletion ?? 93, color: "text-brand-orange" },
                { label: "Test Avg", val: dashboardData?.assignmentStatus?.testAverage ?? 84, color: "text-brand-blue" },
                { label: "Confidence", val: dashboardData?.assignmentStatus?.confidenceIndex ?? 71, color: "text-purple-600" },
                { label: "Overall Index", val: dashboardData?.vedhkritIndex?.value ?? 82, color: "text-brand-orange" }
              ].map((g, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <CircularProgress percent={Math.round(g.val)} colorClass={g.color} size={44} strokeWidth={4} />
                  <span className="text-[9px] font-bold text-text-muted mt-1.5 truncate max-w-full leading-none">{g.label}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Profile Completion */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-display text-xs font-bold text-text-heading">Profile Completion</h3>
              <span className="text-xs font-bold text-brand-blue">85% Complete</span>
            </div>

            <div className="space-y-2 text-[10px] font-semibold text-text-body">
              {[
                { label: "Basic Information", met: true },
                { label: "Academic Information", met: true },
                { label: "Parent / Guardian Details", met: true },
                { label: "Emergency Contact", met: false },
                { label: "Profile Photo", met: false }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded border border-slate-50 bg-slate-50/20">
                  <span className={cn(item.met ? "text-slate-400 line-through" : "text-text-heading")}>{item.label}</span>
                  {item.met ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3px]" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-slate-300" />
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading font-bold rounded-xl text-xs transition-colors">
              Complete Profile
            </button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Row 3: ⭐ Daily Planner Dashboard Cockpit */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Timetable & Checklists */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 border border-slate-100 bg-white space-y-6">
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2">
                <CheckSquare className="h-4.5 w-4.5 text-brand-blue" />
                Daily Planner Workspace
              </h3>

              {/* Daily Streak flame badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-brand-orange/20 rounded-xl text-brand-orange text-xs font-bold animate-pulse">
                <Flame className="h-4 w-4 fill-brand-orange" />
                <span>5 Days Streak</span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Timetable schedule */}
              <div className="space-y-4">
                <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Timetable</h4>

                <div className="space-y-3">
                  {!dashboardData?.todaysLessons || dashboardData.todaysLessons.filter(l => !l.deadline).length === 0 ? (
                    <div className="text-center py-6 text-xs text-text-muted">No classes scheduled today</div>
                  ) : (
                    dashboardData.todaysLessons
                      .filter(l => !l.deadline)
                      .map((cls, i) => (
                        <div key={cls.id || i} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-left flex justify-between items-center text-xs">
                          <div>
                            <span className="text-[8.5px] font-bold text-slate-400 block">{cls.time}</span>
                            <h5 className="font-bold text-text-heading mt-0.5">{cls.title}</h5>
                            <p className="text-[9.5px] text-text-muted font-semibold mt-0.5">{cls.description || cls.subject || ''}</p>
                          </div>
                          {cls.live && (
                            <span className="text-[8px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded animate-pulse shrink-0">
                              LIVE
                            </span>
                          )}
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Checklists */}
              <div className="space-y-4">
                <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Homework Checklist</h4>

                <div className="space-y-2.5">
                  {homeworkCheck.length === 0 ? (
                    <div className="text-center py-6 text-xs text-text-muted border border-dashed border-slate-100 rounded-xl">No homework checklist items</div>
                  ) : (
                    homeworkCheck.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setHomeworkCheck(prev => prev.map(h => h.id === item.id ? { ...h, done: !h.done } : h));
                          toast.info(item.done ? "Homework active" : "Homework marked completed!");
                        }}
                        className="w-full p-2.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer text-xs text-left"
                      >
                        <div className={cn(
                          "h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                          item.done ? "bg-brand-teal border-brand-teal text-white" : "border-slate-350"
                        )}>
                          {item.done && <Check className="h-3 w-3 stroke-[3px]" />}
                        </div>
                        <span className={cn("font-bold text-text-heading", item.done && "text-slate-400 line-through")}>
                          {item.text}
                        </span>
                      </button>
                    ))
                  )}
                </div>

                <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Revision Goals</h4>

                <div className="space-y-2.5">
                  {revisionGoals.length === 0 ? (
                    <div className="text-center py-6 text-xs text-text-muted border border-dashed border-slate-100 rounded-xl">No revision goals set</div>
                  ) : (
                    revisionGoals.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setRevisionGoals(prev => prev.map(r => r.id === item.id ? { ...r, done: !r.done } : r));
                          toast.info(item.done ? "Revision active" : "Revision goal met!");
                        }}
                        className="w-full p-2.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 cursor-pointer text-xs text-left"
                      >
                        <div className={cn(
                          "h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                          item.done ? "bg-brand-blue border-brand-blue text-white" : "border-slate-350"
                        )}>
                          {item.done && <Check className="h-3 w-3 stroke-[3px]" />}
                        </div>
                        <span className={cn("font-bold text-text-heading", item.done && "text-slate-400 line-through")}>
                          {item.text}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Pomodoro & Mentor Task */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pomodoro Timer */}
          <GlassCard className="p-6 border border-slate-100 bg-white text-center space-y-4">
            <h3 className="font-display text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Clock className="h-4.5 w-4.5 text-brand-blue animate-pulse" /> Focus Pomodoro Timer
            </h3>

            <div className="text-3xl font-mono font-black text-text-heading py-2 tracking-widest">
              {Math.floor(pomoTime / 60).toString().padStart(2, '0')}:{(pomoTime % 60).toString().padStart(2, '0')}
            </div>

            <div className="flex justify-center gap-2.5">
              <button
                onClick={() => setPomoRunning(!pomoRunning)}
                className="py-1.5 px-4 bg-brand-blue text-white font-bold rounded-lg text-xs hover:bg-brand-navy cursor-pointer transition-colors shadow-xs"
              >
                {pomoRunning ? "Pause" : "Play"}
              </button>
              <button
                onClick={() => { setPomoTime(1500); setPomoRunning(false); }}
                className="py-1.5 px-4 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading font-bold rounded-lg text-xs cursor-pointer transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Study Hours tracker */}
            <div className="text-left pt-4 border-t border-slate-50 mt-4 text-[10.5px] font-bold text-text-muted">
              <div className="flex justify-between mb-1.5">
                <span>Study Hours Tracker</span>
                <span className="text-text-heading">2.5 hrs / 4.0 hrs</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-teal h-1.5 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </div>
          </GlassCard>

          {/* Mentor Task of the Day */}
          <GlassCard className="p-5 border border-brand-orange/20 bg-linear-to-b from-orange-50/20 to-bg-primary text-left space-y-3">
            <div className="flex items-center gap-2 text-brand-orange">
              <Users className="h-4.5 w-4.5" />
              <span className="text-[10px] uppercase tracking-wider font-black block">Mentor Task of the Day</span>
            </div>

            <div className="bg-white border border-brand-orange/10 rounded-2xl p-4 text-xs shadow-2xs relative">
              <div className="absolute top-4 left-0 w-1 h-8 bg-brand-orange rounded-r-md"></div>
              <p className="text-text-body pl-2.5 leading-relaxed font-semibold italic">
                "Solve 15 practice questions on Lines & Angles and share it with me on chat."
              </p>
              <span className="text-[8px] font-bold text-slate-400 block uppercase tracking-wider mt-2 pl-2.5">— Neha Mehta</span>
            </div>
          </GlassCard>
        </div>
      </motion.div>

      {/* Row 4: Learning DNA, Career Matches, Recommendations, and Notifications */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Learning DNA */}
        <div className="lg:col-span-1">
          <GlassCard className="p-5 border border-slate-100 bg-white h-full space-y-4">
            <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-brand-orange" />
              Learning DNA Profile
            </h3>
            
            {dashboardData?.learningDna ? (
              <div className="space-y-3.5 text-xs text-text-body">
                <div className="p-3 bg-orange-50/45 border border-brand-orange/10 rounded-2xl">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Cognitive Style</span>
                  <div className="font-bold text-brand-orange text-sm mt-0.5">{dashboardData.learningDna.learningStyle}</div>
                  {dashboardData.learningDna.brainDominance && (
                    <div className="text-[10px] text-text-muted mt-0.5">{dashboardData.learningDna.brainDominance}</div>
                  )}
                </div>

                {dashboardData.learningDna.cognitiveStrengths && dashboardData.learningDna.cognitiveStrengths.length > 0 && (
                  <div>
                    <span className="block text-[9.5px] uppercase tracking-wider text-slate-400 font-bold mb-1.5">Cognitive Strengths</span>
                    <div className="flex flex-wrap gap-1.5">
                      {dashboardData.learningDna.cognitiveStrengths.map((str, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md text-[9px] font-bold text-text-heading">
                          {str}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <span className="block text-[9.5px] uppercase tracking-wider text-slate-400 font-bold">Skill Dimensions</span>
                  {Object.entries(dashboardData.learningDna.dimensions).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-text-muted capitalize">
                        <span>{key}</span>
                        <span className="text-text-heading">{val}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div className="bg-brand-blue h-1 rounded-full" style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-text-muted">No Learning DNA details available.</div>
            )}
          </GlassCard>
        </div>

        {/* Center Column: Career Matches */}
        <div className="lg:col-span-1">
          <GlassCard className="p-5 border border-slate-100 bg-white h-full flex flex-col justify-between">
            <div className="w-full">
              <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 mb-4">
                <Compass className="h-4.5 w-4.5 text-brand-teal" />
                Top Career Matches
              </h3>
              
              {!dashboardData?.careerMatches || dashboardData.careerMatches.length === 0 ? (
                <div className="text-center py-10 text-xs text-text-muted px-4 leading-relaxed">
                  Complete more assessments to receive career recommendations.
                </div>
              ) : (
                <div className="space-y-3">
                  {dashboardData.careerMatches.map((career) => (
                    <div key={career.id} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-text-heading">{career.title}</h4>
                        {career.demand && (
                          <span className="text-[9px] font-bold text-brand-teal bg-teal-50 px-1.5 py-0.2 rounded mt-0.5 inline-block">
                            {career.demand} Demand
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-black text-brand-teal text-sm">{career.matchPercentage}%</span>
                        <span className="block text-[8px] font-bold text-slate-400">Match</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {dashboardData?.careerMatches && dashboardData.careerMatches.length > 0 && (
              <Link to="/dashboard/student/career" className="mt-4 text-[10px] font-bold text-brand-blue hover:underline flex items-center justify-center gap-1">
                Explore Career Paths <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </GlassCard>
        </div>

        {/* Right Column: Recommendations & Notifications */}
        <div className="lg:col-span-1 space-y-6">
          {/* Notifications */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 mb-4">
              <Bell className="h-4.5 w-4.5 text-brand-orange" />
              Notifications
            </h3>
            
            {!notificationsData || notificationsData.length === 0 ? (
              <div className="text-center py-6 text-xs text-text-muted">You're all caught up.</div>
            ) : (
              <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
                {notificationsData.map((notif) => (
                  <div key={notif.id} className={cn("p-2.5 border rounded-xl text-left text-xs", notif.isRead ? "bg-slate-50/30 border-slate-100" : "bg-orange-50/10 border-brand-orange/15")}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-text-heading truncate pr-2">{notif.title}</h4>
                      <span className="text-[9px] font-bold text-slate-400 shrink-0">{notif.createdAt}</span>
                    </div>
                    <p className="text-[10px] text-text-muted mt-1 leading-normal">{notif.content}</p>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Recommendations */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 mb-4">
              <Award className="h-4.5 w-4.5 text-brand-blue" />
              Recommendations
            </h3>
            
            {!dashboardData?.recommendations || dashboardData.recommendations.length === 0 ? (
              <div className="text-center py-6 text-xs text-text-muted">No recommendations available.</div>
            ) : (
              <div className="space-y-3">
                {dashboardData.recommendations.map((rec) => (
                  <div key={rec.id} className="p-3 bg-linear-to-r from-blue-50/10 to-teal-50/10 border border-slate-100 rounded-xl text-left text-xs">
                    <h4 className="font-bold text-text-heading">{rec.title}</h4>
                    <p className="text-[10px] text-text-muted mt-0.5 leading-normal">{rec.description}</p>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </motion.div>
    </motion.div>
  );
}
