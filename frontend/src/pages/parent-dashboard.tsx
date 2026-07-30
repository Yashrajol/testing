import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/shared/ui/glass-card";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import {
  Calendar, CheckCircle2, Clock, MessageSquare,
  Sparkles, Award, FileText, ArrowRight,
  Star, Video, Bell, AlertCircle
} from "lucide-react";
import { useAuth } from "@/app/providers/auth-context";
import { useParentOverview } from "@/features/parent/queries/useParent";
import { studentAvatar, mentorAvatar } from "@/shared/utils/avatars";
import { useMemo } from "react";

export const Route = createFileRoute("/dashboard/parent/")({
  component: ParentDashboard,
  head: () => ({ meta: [{ title: "Parent Dashboard — Vedhkrit" }] }),
});

function ParentDashboard() {
  const { user } = useAuth();
  const studentId = user?.studentId || user?.children?.[0]?.id;
  const { data: overviewData, isLoading, isError, refetch } = useParentOverview(studentId);

  function UsersIcon({ className }: { className?: string }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.007.031c.003.022.007.045.007.068a3 3 0 0 1-3 3 3 3 0 0 1-3-3c0-.023.004-.046.007-.068l.004-.017m9.06 0c-1.29 1.13-2.532 1.758-3.978 1.758m-9.761 0a9.094 9.094 0 0 1-3.741-.479 3 3 0 0 1 4.682-2.72m-.94 3.198-.007.031a1.22 1.22 0 0 0-.007.068 3 3 0 0 0 3 3 3 3 0 0 0 3-3c0-.023-.004-.046-.007-.068l-.004-.017m-9.06 0c1.29 1.13 2.532 1.758 3.978 1.758M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    );
  }

  const parentName = user?.name || overviewData?.parentName || "Parent";

  const child = useMemo(() => {
    return {
      id: overviewData?.studentId || studentId || "",
      name: overviewData?.studentName || user?.name || "Student Learner",
      grade: overviewData?.grade || "Grade Level Unspecified",
      school: overviewData?.school || "Independent / Direct Registration",
      avatar: overviewData?.avatar || studentAvatar(0),
      vedhkritIndex: overviewData?.vedhkritIndex || 80,
      attendance: overviewData?.attendancePercentage || 0,
      academicAvg: overviewData?.academicAverage || 0,
      assessmentDone: Boolean(overviewData?.assessmentDone),
    };
  }, [overviewData, studentId, user]);

  const activities = useMemo(() => {
    if (!overviewData?.recentActivities || overviewData.recentActivities.length === 0) {
      return [];
    }
    return overviewData.recentActivities.map((act) => ({
      title: act.title,
      desc: act.desc,
      time: act.time,
      icon: act.category === "academic" ? FileText : act.category === "attendance" ? CheckCircle2 : MessageSquare,
      color: act.category === "academic" ? "text-brand-blue bg-brand-blue/10" : act.category === "attendance" ? "text-emerald-600 bg-emerald-50" : "text-brand-teal bg-brand-teal/10"
    }));
  }, [overviewData]);

  const upcomingEvents = useMemo(() => {
    if (!overviewData?.upcomingEvents || overviewData.upcomingEvents.length === 0) {
      return [];
    }
    return overviewData.upcomingEvents.map((ev) => ({
      date: ev.date,
      time: ev.time,
      title: ev.title,
      cat: ev.cat,
      action: ev.action,
      icon: ev.cat === "Assessment" ? FileText : ev.cat === "Meeting" ? UsersIcon : Video
    }));
  }, [overviewData]);

  const mentor = useMemo(() => {
    if (overviewData?.sessions && overviewData.sessions.length > 0) {
      const latest = overviewData.sessions[0];
      return {
        name: latest.mentorName || "Assigned Counselor",
        title: "Academic & STEM Counselor",
        feedback: latest.notes || "No advisory notes uploaded yet.",
        nextSession: latest.scheduledAt ? new Date(latest.scheduledAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "Not Scheduled",
      };
    }
    return null;
  }, [overviewData]);

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <GlassCard className="p-6 border border-slate-100 bg-white h-24 animate-pulse">
          <div />
        </GlassCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <GlassCard key={n} className="p-4 border border-slate-100 bg-white h-20 animate-pulse">
              <div />
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load Parent overview</h3>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-navy transition-all cursor-pointer shadow-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* 1. Dashboard Header */}
      <PageHeader
        title={`Welcome, ${parentName}! 👋`}
        subtitle={`Monitoring academic growth & performance overview for ${child.name}`}
      />

      {/* 2. Top Summary Card */}
      <GlassCard className="p-6 border border-slate-100 bg-white shadow-card relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src={child.avatar}
              alt={child.name}
              className="h-16 w-16 rounded-2xl object-cover bg-slate-100 border border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-extrabold text-text-heading">{child.name}</h2>
                <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-[10px] font-bold text-brand-blue border border-brand-blue/20">
                  {child.grade}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5 font-medium">{child.school}</p>
              <div className="flex items-center gap-3 text-[11px] text-text-muted mt-2 font-semibold">
                <span>Attendance: <strong className="text-emerald-600">{child.attendance}%</strong></span>
                <span>•</span>
                <span>Academic Avg: <strong className="text-brand-blue">{child.academicAvg}%</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vedhkrit Index™</span>
              <span className="text-2xl font-black text-brand-blue">{child.vedhkritIndex}<span className="text-xs font-bold text-slate-400">/100</span></span>
            </div>
            <Link
              to="/dashboard/parent/reports"
              className="rounded-xl bg-brand-blue hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              Full Report
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* 3. Quick Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-4 border border-slate-100 bg-white shadow-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-brand-blue">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Overall Progress</span>
            <div className="font-display text-lg font-black text-text-heading">{child.academicAvg}%</div>
            <span className="text-[9.5px] font-bold text-emerald-600">Great Learning Momentum</span>
          </div>
        </GlassCard>

        <GlassCard className="p-4 border border-slate-100 bg-white shadow-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Attendance Rate</span>
            <div className="font-display text-lg font-black text-text-heading">{child.attendance}%</div>
            <span className="text-[9.5px] font-bold text-emerald-600">Regular & Consistent</span>
          </div>
        </GlassCard>

        <GlassCard className="p-4 border border-slate-100 bg-white shadow-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vedhkrit Score</span>
            <div className="font-display text-lg font-black text-text-heading">{child.vedhkritIndex} / 100</div>
            <span className="text-[9.5px] font-bold text-purple-600">Diagnostic Readiness</span>
          </div>
        </GlassCard>

        <GlassCard className="p-4 border border-slate-100 bg-white shadow-card flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Next Advisory</span>
            <div className="font-display text-xs font-bold text-text-heading mt-1">{mentor?.nextSession ? mentor.nextSession.split(',')[0] : "Not Scheduled"}</div>
            <span className="text-[9.5px] font-bold text-amber-600">1:1 Counseling</span>
          </div>
        </GlassCard>
      </div>

      {/* 4. Split Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events Agenda */}
          <GlassCard className="p-5 border border-slate-100 bg-white shadow-card">
            <div className="flex items-center justify-between mb-4 border-b border-slate-150/40 pb-3">
              <div>
                <h3 className="font-display text-sm font-bold text-text-heading">Upcoming Activities</h3>
                <p className="text-[10px] text-text-muted mt-0.5">Stay updated with academic timelines and appointments</p>
              </div>
              <Link to="/dashboard/parent/attendance" className="text-[10px] text-brand-blue font-bold hover:underline">View Calendar</Link>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 font-semibold text-xs text-text-body">
              {upcomingEvents.map((ev, idx) => (
                <div key={idx} className="flex gap-3.5 items-center p-3 bg-slate-50/50 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                  <div className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex flex-col justify-center items-center text-center shrink-0">
                    <span className="text-[8px] text-text-muted font-bold leading-none">{ev.date.split(' ')[0]}</span>
                    <span className="text-sm font-extrabold text-text-heading leading-none mt-1">{ev.date.split(' ')[1] || "—"}</span>
                  </div>
                  <div className="text-left min-w-0 flex-1 space-y-0.5">
                    <h4 className="text-xs font-bold text-text-heading truncate leading-snug">{ev.title}</h4>
                    <p className="text-[9.5px] text-text-muted leading-none">{ev.time} • <span className="text-[8.5px] font-bold uppercase tracking-wider text-brand-blue">{ev.cat}</span></p>
                    <button className="text-[9.5px] font-bold text-brand-blue hover:text-blue-800 flex items-center gap-0.5 mt-1 cursor-pointer">
                      {ev.action} <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recent Activity Timeline */}
          <GlassCard className="p-5 border border-slate-100 bg-white shadow-card font-semibold text-xs text-text-body">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-sm font-bold text-text-heading">Recent Activity</h3>
              <span className="flex items-center gap-1 text-[9px] font-bold text-brand-orange uppercase tracking-wider">
                <Bell className="h-3 w-3" /> Live Updates
              </span>
            </div>
            <div className="relative pl-6 border-l border-slate-100 space-y-5">
              {activities.map((act, idx) => (
                <div key={idx} className="relative text-left">
                  <span className={`absolute -left-[23px] top-0.5 h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${act.color}`}>
                    <act.icon className="h-2.5 w-2.5" />
                  </span>
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="text-xs font-bold text-text-heading leading-tight">{act.title}</h4>
                    <span className="text-[9px] text-slate-400 shrink-0">{act.time}</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1 leading-normal">{act.desc}</p>
                </div>
              ))}
            </div>
            <Link
              to="/dashboard/parent/reports"
              className="mt-5 w-full rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 py-2.5 text-center text-xs font-bold text-text-heading transition-colors flex items-center justify-center gap-1.5"
            >
              View All Activities & Updates
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </GlassCard>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Mentor Summary Card */}
          <GlassCard className="p-5 border border-slate-100 bg-white shadow-card text-center flex flex-col justify-between h-full font-semibold text-xs text-text-body">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-sm font-bold text-text-heading">Your Mentor</h3>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[8.5px] font-bold text-emerald-600 flex items-center gap-1">
                  <span className="h-1 w-1 bg-emerald-500 rounded-full animate-ping" /> Online
                </span>
              </div>

              <div className="flex items-center gap-3 text-left border-b border-slate-100 pb-4">
                <img
                  src={mentorAvatar(2, 120)}
                  alt="Mentor Photo"
                  className="h-12 w-12 rounded-2xl object-cover bg-slate-100 border border-slate-150"
                />
                <div>
                  <h4 className="font-bold text-xs text-text-heading leading-tight">{mentor?.name || "Assigned Counselor"}</h4>
                  <p className="text-[10px] text-text-muted font-bold mt-0.5">{mentor?.title || "Academic Counselor"}</p>
                  <p className="text-[9px] text-brand-orange font-bold flex items-center gap-0.5 mt-0.5 font-semibold">
                    4.9 ★ <span className="text-[8.5px] text-slate-400">(120+ Sessions)</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-xs text-left space-y-3">
                <div>
                  <span className="text-[9.5px] font-bold text-slate-400 block uppercase tracking-wider">Latest Advisory Feedback</span>
                  <p className="text-xs text-text-body mt-1 leading-relaxed italic bg-slate-50/50 p-3 rounded-xl border border-slate-100/50 font-medium">
                    "{mentor?.feedback || "No advisory feedback uploaded yet."}"
                  </p>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-muted">Next Session:</span>
                  <span className="font-bold text-brand-blue">{mentor?.nextSession || "Not Scheduled"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5 font-bold">
              <Link 
                to="/dashboard/parent/messages"
                className="w-full text-center rounded-xl bg-brand-blue/5 border border-brand-blue/10 hover:bg-brand-blue hover:text-white py-2.5 text-xs font-bold text-brand-blue transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Message Mentor
              </Link>
              <Link 
                to="/dashboard/parent/messages"
                className="w-full text-center rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-slate-100 py-2.5 text-xs font-bold text-text-heading transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                Book Meeting
              </Link>
              <Link 
                to="/dashboard/parent/mentor"
                className="w-full text-center rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-slate-100 py-2.5 text-xs font-bold text-text-heading transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                View Full Notes
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;
