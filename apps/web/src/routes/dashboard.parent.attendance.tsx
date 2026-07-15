import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Calendar, CheckCircle2, AlertCircle, Clock, Check, X, FileText } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/attendance")({
  component: ParentAttendancePage,
  head: () => ({ meta: [{ title: "Attendance Tracking — Parent Portal" }] }),
});

const monthlyStats = [
  { month: "January 2026", present: 20, absent: 1, leave: 1 },
  { month: "February 2026", present: 19, absent: 0, leave: 1 },
  { month: "March 2026 (Active)", present: 11, absent: 0, leave: 0 },
];

const calendarDays = [
  // Padding for last month (March 2026 starts on Sunday)
  { day: 1, status: "present" },
  { day: 2, status: "present" },
  { day: 3, status: "present" },
  { day: 4, status: "present" },
  { day: 5, status: "present" },
  { day: 6, status: "present" },
  { day: 7, status: "weekend" },
  { day: 8, status: "weekend" },
  { day: 9, status: "present" },
  { day: 10, status: "present" },
  { day: 11, status: "present" },
  { day: 12, status: "leave" },
  { day: 13, status: "present" },
  { day: 14, status: "weekend" },
  { day: 15, status: "weekend" },
  { day: 16, status: "present" },
  { day: 17, status: "present" },
  { day: 18, status: "present" },
  { day: 19, status: "present" },
  { day: 20, status: "present" },
  { day: 21, status: "weekend" },
  { day: 22, status: "weekend" },
  { day: 23, status: "present" },
  { day: 24, status: "present" },
  { day: 25, status: "present" },
  { day: 26, status: "present" },
  { day: 27, status: "present" },
  { day: 28, status: "weekend" },
  { day: 29, status: "weekend" },
  { day: 30, status: "present" },
  { day: 31, status: "present" },
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

  const totalWorkingDays = monthlyStats.reduce((acc, curr) => acc + curr.present + curr.absent + curr.leave, 0);
  const totalPresent = monthlyStats.reduce((acc, curr) => acc + curr.present, 0);
  const totalAbsent = monthlyStats.reduce((acc, curr) => acc + curr.absent, 0);
  const totalLeaves = monthlyStats.reduce((acc, curr) => acc + curr.leave, 0);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader title="Attendance Logs" subtitle="Verify and inspect your child's academic attendance schedules." />

      {/* Attendance Stats Cards */}
      <motion.div variants={itemVariants} className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</div>
          <div className="font-display text-2xl font-bold text-brand-blue mt-1">95.4%</div>
          <p className="text-[9.5px] text-emerald-600 font-semibold mt-1">On Track (Goal: 90%+)</p>
        </div>
        
        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Present</div>
          <div className="font-display text-2xl font-bold text-emerald-600 mt-1">{totalPresent} Days</div>
          <p className="text-[9.5px] text-text-muted mt-1">Working: {totalWorkingDays} days</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Absent</div>
          <div className="font-display text-2xl font-bold text-rose-500 mt-1">{totalAbsent} Days</div>
          <p className="text-[9.5px] text-text-muted mt-1">Unexcused delays</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Approved Leaves</div>
          <div className="font-display text-2xl font-bold text-amber-500 mt-1">{totalLeaves} Days</div>
          <p className="text-[9.5px] text-text-muted mt-1">Excused via portal</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs col-span-2 md:col-span-1">
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
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-display text-sm font-bold text-text-heading">Monthly Calendar View</h3>
                <p className="text-[10px] text-text-muted mt-0.5">Visual checklist of child school logs for March 2026</p>
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
              {calendarDays.map((c, idx) => {
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
              <h3 className="text-sm font-bold text-text-heading flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                <Calendar className="h-4.5 w-4.5 text-brand-blue" />
                Monthly Breakdown
              </h3>
              
              <div className="space-y-4">
                {monthlyStats.map((stat, i) => {
                  const total = stat.present + stat.absent + stat.leave;
                  const percent = Math.round((stat.present / (total - stat.leave)) * 100);
                  
                  return (
                    <div key={i} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-2 text-xs text-left">
                      <div className="flex justify-between items-center font-bold text-text-heading border-b border-slate-200/50 pb-1.5">
                        <span>{stat.month}</span>
                        <span className="text-brand-blue">{percent}%</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center text-[10.5px]">
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
            
            <p className="text-[10px] text-slate-400 leading-normal mt-4 text-center">
              Requires 75%+ mandatory attendance for board term validation.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
