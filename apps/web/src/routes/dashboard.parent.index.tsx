import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { 
  User, Calendar, CheckCircle2, Clock, MessageSquare, 
  BookOpen, Sparkles, ChevronRight, Award, FileText, ArrowRight,
  TrendingUp, Star, Video
} from "lucide-react";
import { useParentOverview } from "@/lib/api";

export const Route = createFileRoute("/dashboard/parent/")({
  component: ParentDashboardOverview,
  head: () => ({ meta: [{ title: "Parent Dashboard — Vedhkrit" }] }),
});

function ParentDashboardOverview() {
  const { data: apiData, isLoading } = useParentOverview();

  if (isLoading) {
    return (
      <div className="flex h-[60dvh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  const parentName = apiData?.parent?.user?.name || "Rohan Sharma";
  const child = apiData?.children?.[0] || {
    id: "STU0001",
    name: "Yash Rajole",
    grade: "10th Grade",
    school: "Delhi Public School Bangalore",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=0",
    vedhkritIndex: 82,
    attendance: 94,
    academicAvg: 85,
  };

  const activities = [
    { title: "Homework Submitted", desc: "Mathematics: Calculus Practice Sheet", time: "1h ago", icon: FileText, color: "text-brand-blue bg-brand-blue/10" },
    { title: "Science Test Completed", desc: "Scored 18/20 in Physics Quiz 2", time: "3h ago", icon: Award, color: "text-purple-600 bg-purple-50" },
    { title: "Attendance Marked", desc: "Marked Present at 8:30 AM today", time: "5h ago", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { title: "Mentor Added Feedback", desc: "New advisory notes uploaded by Priya Iyer", time: "Yesterday", icon: MessageSquare, color: "text-brand-teal bg-brand-teal/10" },
    { title: "Certificate Earned", desc: "Logical Reasoning Master Badge", time: "2 days ago", icon: Star, color: "text-amber-500 bg-amber-50" },
    { title: "Competition Registered", desc: "Inter-School Coding Hackathon (Junior)", time: "3 days ago", icon: Sparkles, color: "text-brand-orange bg-brand-orange/10" },
  ];

  const upcomingEvents = [
    { date: "May 22", time: "10:00 AM", title: "Science Test", cat: "Assessment", action: "View Prep Guide", icon: FileText },
    { date: "May 23", time: "04:00 PM", title: "PTM Meeting", cat: "Meeting", action: "Confirm Attendance", icon: UsersIcon },
    { date: "May 25", time: "11:30 AM", title: "Mentor Session", cat: "Counseling", action: "Join Call", icon: Video },
    { date: "Jun 05", time: "09:00 AM", title: "Math Olympiad", cat: "Competition", action: "View Details", icon: Award },
    { date: "Jun 10", time: "All Day", title: "School Holiday", cat: "Holiday", action: "View Calendar", icon: Calendar },
    { date: "Jun 15", time: "08:00 AM", title: "Annual Sports Day", cat: "School Event", action: "Register", icon: Star },
  ];

  function UsersIcon({ className }: { className?: string }) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.007.031c.003.022.007.045.007.068a3 3 0 0 1-3 3 3 3 0 0 1-3-3c0-.023.004-.046.007-.068l.004-.017m9.06 0c-1.29 1.13-2.532 1.758-3.978 1.758m-9.761 0a9.094 9.094 0 0 1-3.741-.479 3 3 0 0 1 4.682-2.72m-.94 3.198-.007.031a1.22 1.22 0 0 0-.007.068 3 3 0 0 0 3 3 3 3 0 0 0 3-3c0-.023-.004-.046-.007-.068l-.004-.017m-9.06 0c1.29 1.13 2.532 1.758 3.978 1.758M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    );
  }

  return (
    <div className="space-y-6 text-left">
      {/* 1. Hero Section */}
      <GlassCard className="p-6 border border-slate-100 bg-white/80 shadow-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-text-heading">Good Morning, Mr. {parentName.split(' ').pop()}! 👋</h2>
            <p className="text-xs text-text-muted mt-0.5">Here is a quick look at your child's learning progress today.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex-1 md:flex-initial w-full md:w-auto">
            <img src={child.avatar} alt="Child Profile" className="h-14 w-14 rounded-full object-cover bg-white border border-slate-200" />
            <div className="text-left text-xs space-y-1 min-w-0 flex-1 md:flex-initial">
              <h4 className="font-bold text-text-heading text-sm leading-tight truncate">{child.name}</h4>
              <p className="text-[11px] text-text-muted font-medium leading-none">{child.grade} • {child.school}</p>
              <div className="flex items-center gap-2 mt-1 flex-wrap text-[10px] text-slate-500 font-semibold">
                <span className="bg-slate-200/50 px-2 py-0.5 rounded-sm">CBSE</span>
                <span className="bg-slate-200/50 px-2 py-0.5 rounded-sm">Sec: A</span>
                <span className="bg-slate-200/50 px-2 py-0.5 rounded-sm">Roll: 24</span>
                <span className="bg-slate-200/50 px-2 py-0.5 rounded-sm">AY: 2025-26</span>
              </div>
            </div>
            <Link 
              to="/dashboard/parent/progress"
              className="mt-2 md:mt-0 w-full md:w-auto rounded-xl bg-brand-blue text-white px-4 py-2.5 text-center text-xs font-bold shadow-xs hover:bg-blue-800 transition-colors flex items-center justify-center gap-1 shrink-0 cursor-pointer"
            >
              View Child Profile
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* 2. Today's Summary Card */}
      <GlassCard className="p-6 border border-brand-blue/10 bg-gradient-to-br from-white to-blue-50/10 shadow-card">
        <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-brand-orange animate-pulse" />
          Today's Summary
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
            <span className="text-lg">✅</span>
            <div className="text-xs">
              <div className="font-bold text-text-heading">Present at School</div>
              <p className="text-[10px] text-text-muted">Marked present today</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
            <span className="text-lg">📚</span>
            <div className="text-xs">
              <div className="font-bold text-text-heading">Attended 5 Classes</div>
              <p className="text-[10px] text-text-muted">All active periods complete</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
            <span className="text-lg">📝</span>
            <div className="text-xs">
              <div className="font-bold text-text-heading">2 Homework Pending</div>
              <p className="text-[10px] text-text-muted">Due in next 48 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
            <span className="text-lg">📊</span>
            <div className="text-xs">
              <div className="font-bold text-text-heading">Science Quiz: 18/20</div>
              <p className="text-[10px] text-text-muted">Completed earlier today</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl">
            <span className="text-lg">👨‍🏫</span>
            <div className="text-xs">
              <div className="font-bold text-text-heading">Mentor Session Tomorrow</div>
              <p className="text-[10px] text-text-muted">Scheduled for 11:30 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-brand-orange/5 border border-brand-orange/20 rounded-xl sm:col-span-2 lg:col-span-1">
            <span className="text-lg">🎯</span>
            <div className="text-xs">
              <div className="font-bold text-brand-orange">Today's Recommendation</div>
              <p className="text-[10.5px] text-text-body font-medium mt-0.5 leading-relaxed">
                Encourage {child.name.split(' ')[0]} to revise Mathematics for 20 minutes today.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 3. Five Metric Overview Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attendance</div>
          <div className="font-display text-2xl font-bold text-text-heading mt-1">{child.attendance}%</div>
          <p className="text-[9.5px] text-emerald-600 font-semibold mt-1">Excellent Attendance</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Performance</div>
          <div className="font-display text-2xl font-bold text-text-heading mt-1">{child.vedhkritIndex}<span className="text-xs font-semibold text-slate-400">/100</span></div>
          <p className="text-[9.5px] text-brand-blue font-semibold mt-1">Consistent Growth</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Homework Status</div>
          <div className="font-display text-2xl font-bold text-text-heading mt-1">2 Pending</div>
          <p className="text-[9.5px] text-amber-600 font-semibold mt-1">On Track</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Confidence Score</div>
          <div className="font-display text-2xl font-bold text-text-heading mt-1">71<span className="text-xs font-semibold text-slate-400">/100</span></div>
          <p className="text-[9.5px] text-emerald-600 font-semibold mt-1">Growing Steadily</p>
        </div>

        <div className="p-5 border border-slate-100 bg-white rounded-2xl shadow-xs text-left col-span-2 md:col-span-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mentor Status</div>
          <div className="font-display text-base font-bold text-text-heading mt-2 truncate">Session Tomorrow</div>
          <p className="text-[9.5px] text-purple-600 font-semibold mt-1">11:30 AM Session</p>
        </div>
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
            
            <div className="grid gap-3 sm:grid-cols-2">
              {upcomingEvents.map((ev, idx) => (
                <div key={idx} className="flex gap-3.5 items-center p-3 bg-slate-50/50 border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                  <div className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex flex-col justify-center items-center text-center shrink-0">
                    <span className="text-[8px] text-text-muted font-bold leading-none">{ev.date.split(' ')[0]}</span>
                    <span className="text-sm font-extrabold text-text-heading leading-none mt-1">{ev.date.split(' ')[1]}</span>
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
          <GlassCard className="p-5 border border-slate-100 bg-white shadow-card">
            <h3 className="font-display text-sm font-bold text-text-heading mb-5">Recent Activity</h3>
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
          </GlassCard>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Mentor Summary Card */}
          <GlassCard className="p-5 border border-slate-100 bg-white shadow-card text-center flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-sm font-bold text-text-heading">Your Mentor</h3>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[8.5px] font-bold text-emerald-600 flex items-center gap-1">
                  <span className="h-1 w-1 bg-emerald-500 rounded-full animate-ping" /> Online
                </span>
              </div>

              <div className="flex items-center gap-3 text-left border-b border-slate-100 pb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=120&auto=format&fit=crop" 
                  alt="Mentor Photo" 
                  className="h-12 w-12 rounded-2xl object-cover bg-slate-100 border border-slate-150" 
                />
                <div>
                  <h4 className="font-bold text-xs text-text-heading leading-tight">Priya Iyer</h4>
                  <p className="text-[10px] text-text-muted font-bold mt-0.5">Lead Counselors Advisor</p>
                  <p className="text-[9px] text-brand-orange font-bold flex items-center gap-0.5 mt-0.5">
                    4.9 ★ <span className="text-[8.5px] text-slate-400">(120+ Sessions)</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 text-xs text-left space-y-3">
                <div>
                  <span className="text-[9.5px] font-bold text-slate-400 block uppercase tracking-wider">Latest Feedback</span>
                  <p className="text-xs text-text-body mt-1 leading-relaxed italic bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                    "Yash is showing consistent improvements in logical problem-solving tasks. We encourage more out-of-school olympiad exposure."
                  </p>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-text-muted">Next Session:</span>
                  <span className="font-bold text-brand-blue">Mar 25, 4:30 PM</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
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
