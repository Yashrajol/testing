import { } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { Calendar, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/app/providers/auth-context";
import { useParentAttendance } from "@/features/parent/queries/useParent";
import { useMemo } from "react";



export default function ParentAttendancePage() {
  const { user } = useAuth();
  const studentId = user?.studentId || user?.children?.[0]?.id || 'student-123';

  // React Queries
  const { data: attendanceData, isLoading, isError, refetch } = useParentAttendance(studentId);

  const monthlyStats = useMemo(() => {
    // Generate static monthly stats with live presents or default
    const presentCount = attendanceData?.classesAttended ?? 11;
    return [
      { month: "January 2026", present: 20, absent: 1, leave: 1 },
      { month: "February 2026", present: 19, absent: 0, leave: 1 },
      { month: "March 2026 (Active)", present: presentCount, absent: 0, leave: 0 },
    ];
  }, [attendanceData]);

  const calendarDays = useMemo(() => {
    if (attendanceData?.history && attendanceData.history.length > 0) {
      return attendanceData.history;
    }
    // Generate default padding days
    return Array.from({ length: 31 }, (_, i) => {
      const dayNum = i + 1;
      const isWeekend = dayNum % 7 === 0 || dayNum % 7 === 6;
      return {
        day: dayNum,
        status: isWeekend ? ("weekend" as const) : dayNum === 12 ? ("leave" as const) : ("present" as const)
      };
    });
  }, [attendanceData]);

  const totalWorkingDays = monthlyStats.reduce((acc, curr) => acc + curr.present + curr.absent + curr.leave, 0);
  const totalPresent = monthlyStats.reduce((acc, curr) => acc + curr.present, 0);
  const totalAbsent = monthlyStats.reduce((acc, curr) => acc + curr.absent, 0);
  const totalLeaves = monthlyStats.reduce((acc, curr) => acc + curr.leave, 0);
  const attendanceRate = attendanceData?.attendancePercentage ?? 95.4;

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Attendance Logs" subtitle="Loading attendance tracks..." />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5 animate-pulse">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="p-5 border border-slate-100 bg-white rounded-2xl h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load Attendance logs</h3>
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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader title="Attendance Logs" subtitle="Verify and inspect your child's academic attendance schedules." />

      {/* Attendance Stats Cards */}
      <motion.div variants={itemVariants} className="grid gap-4 grid-cols-2 md:grid-cols-5 font-semibold text-xs text-text-body">
        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</div>
          <div className="font-display text-2xl font-bold text-brand-blue mt-1">{attendanceRate}%</div>
          <p className="text-[9.5px] text-emerald-600 font-semibold mt-1">On Track (Goal: 90%+)</p>
        </div>
        
        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Present</div>
          <div className="font-display text-2xl font-bold text-emerald-600 mt-1">{totalPresent} Days</div>
          <p className="text-[9.5px] text-text-muted mt-1">Working: {totalWorkingDays} days</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Absent</div>
          <div className="font-display text-2xl font-bold text-rose-500 mt-1">{totalAbsent} Days</div>
          <p className="text-[9.5px] text-text-muted mt-1">Unexcused delays</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Approved Leaves</div>
          <div className="font-display text-2xl font-bold text-amber-500 mt-1">{totalLeaves} Days</div>
          <p className="text-[9.5px] text-text-muted mt-1">Excused via portal</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs col-span-2 md:col-span-1 text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Late arrivals</div>
          <div className="font-display text-2xl font-bold text-text-heading mt-1">0 Days</div>
          <p className="text-[9.5px] text-emerald-600 font-semibold mt-1">Punctual scholar</p>
        </div>
      </motion.div>

      {/* Main Grid: Calendar and Monthly Tables */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Calendar Grid */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <GlassCard className="p-5 border border-slate-100 bg-white shadow-card">
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3 text-left">
              <div>
                <h3 className="font-display text-sm font-bold text-text-heading">Monthly Calendar View</h3>
                <p className="text-[10px] text-text-muted mt-0.5 font-medium">Visual checklist of child school logs for March 2026</p>
              </div>
              
              <div className="flex gap-4 text-[9px] font-bold text-slate-400">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Present</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Absent</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Leave</span>
              </div>
            </div>

            {/* Days Grid Header */}
            <div className="grid grid-cols-7 gap-2.5 text-center text-[10px] font-bold text-text-muted mb-2 uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2.5">
              {calendarDays.map((c: any, idx) => {
                let cellColor = "bg-slate-50 border-slate-100 text-slate-400";
                if (c.status === "present") {
                  cellColor = "bg-emerald-50/50 border-emerald-100 text-emerald-700 font-bold";
                } else if (c.status === "absent") {
                  cellColor = "bg-rose-50/50 border-rose-100 text-rose-700 font-bold";
                } else if (c.status === "leave") {
                  cellColor = "bg-amber-50/50 border-amber-100 text-amber-700 font-bold";
                } else if (c.status === "weekend") {
                  cellColor = "bg-slate-100/50 border-slate-150 text-slate-400 font-semibold";
                }

                return (
                  <div 
                    key={idx} 
                    className={`h-12 border rounded-xl flex flex-col justify-between p-1.5 transition-all text-left ${cellColor}`}
                  >
                    <span className="text-[10px] leading-none">{c.day}</span>
                    {c.status === "present" && <span className="text-[9px] font-extrabold text-emerald-600 text-right leading-none">✔</span>}
                    {c.status === "absent" && <span className="text-[9px] font-extrabold text-rose-600 text-right leading-none">✘</span>}
                    {c.status === "leave" && <span className="text-[9px] font-extrabold text-amber-600 text-right leading-none">✉</span>}
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Right Column: Attendance History Table */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 border border-slate-100 bg-white h-full flex flex-col justify-between shadow-card">
            <div>
              <h3 className="text-sm font-bold text-text-heading flex items-center gap-2 mb-4 border-b border-slate-100 pb-3 text-left">
                <Calendar className="h-4.5 w-4.5 text-brand-blue" />
                Monthly Breakdown
              </h3>
              
              <div className="space-y-4">
                {monthlyStats.map((stat, i) => {
                  const total = stat.present + stat.absent + stat.leave;
                  const percent = Math.round((stat.present / (total - stat.leave)) * 100);
                  
                  return (
                    <div key={i} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-2 text-xs text-left">
                      <div className="flex justify-between items-center font-bold text-text-heading border-b border-slate-200/50 pb-1.5 font-bold">
                        <span>{stat.month}</span>
                        <span className="text-brand-blue">{percent}%</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-[10.5px] font-semibold">
                        <div>
                          <span className="text-slate-400 block font-medium">Present</span>
                          <span className="font-bold text-emerald-600 mt-0.5 block">{stat.present} days</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Absent</span>
                          <span className="font-bold text-rose-500 mt-0.5 block">{stat.absent} days</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-medium">Leave</span>
                          <span className="font-bold text-amber-500 mt-0.5 block">{stat.leave} days</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 leading-normal mt-4 text-center font-bold">
              Requires 75%+ mandatory attendance for board term validation.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
