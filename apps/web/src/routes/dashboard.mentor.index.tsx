import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { Users, Calendar, AlertTriangle, Star, CheckSquare, Sparkles, MessageSquare, ArrowRight, User, GraduationCap, Video, Plus, FileText, Send, BookOpen } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { students } from "@/lib/mock-data";
import { useMentorOverview } from "@/lib/api";

export const Route = createFileRoute("/dashboard/mentor/")({
  component: MentorDashboardOverview,
  head: () => ({ meta: [{ title: "Mentor Portal — Vedhkrit" }] }),
});

const pieData = [
  { name: "Students Improved", value: 32, percentage: 67, color: "var(--brand-blue)" },
  { name: "Need Attention", value: 10, percentage: 21, color: "var(--brand-orange)" },
  { name: "Stable", value: 6, percentage: 12, color: "var(--brand-teal)" },
];

function MentorDashboardOverview() {
  const { data: apiData, isLoading } = useMentorOverview();

  if (isLoading) {
    return (
      <div className="flex h-[60dvh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  const mentorName = apiData?.mentor?.name || "Neha Mehta";
  const stats = apiData?.stats || {
    totalStudents: 48,
    sessionsConducted: 16,
    avgProgress: 81,
    rating: 4.8,
  };
  const myStudents = apiData?.students || students.slice(0, 4);
  const nextSession = apiData?.nextSession || {
    topic: "Career Guidance",
    studentName: "Yash Rajole",
    scheduledAt: "2026-05-23T18:00:00.000Z",
  };

  const nextSessionDate = new Date(nextSession.scheduledAt);
  const formattedNextSessionTime = nextSessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' • ' + nextSessionDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="space-y-6 text-left">
      
      {/* 1. Greeting Banner with illustration & Next Session Card */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Banner greeting */}
        <div className="md:col-span-2 rounded-2xl border border-slate-100 bg-white p-5 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-xs min-h-40">
          <div className="z-10 space-y-1.5">
            <h2 className="font-display text-2xl font-bold text-text-heading">Welcome, {mentorName}! 👋</h2>
            <p className="text-xs text-text-muted">Here's your mentoring overview for today.</p>
          </div>
          
          {/* Vector Character Banner illustration */}
          <div className="absolute right-0 bottom-0 top-0 w-1/2 md:w-1/3 bg-gradient-to-l from-blue-50/70 to-transparent flex items-end justify-end">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=220&auto=format&fit=crop" 
              className="h-[120%] w-full object-cover object-top opacity-85 mix-blend-multiply select-none pointer-events-none" 
              alt="" 
            />
          </div>
        </div>

        {/* Next Session Card */}
        <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
          <div className="flex gap-3 items-start">
            <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-brand-blue shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="text-left text-xs min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">My Next Session</span>
              <h4 className="font-bold text-text-heading mt-1 truncate leading-tight">{nextSession.topic}</h4>
              <p className="text-[10.5px] text-text-muted mt-1 leading-none">{formattedNextSessionTime}</p>
            </div>
          </div>

          <Link 
            to="/dashboard/mentor/sessions"
            className="w-full rounded-xl bg-brand-blue text-white hover:bg-blue-800 font-bold py-2.5 text-center text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Video className="h-4 w-4" />
            Join Session
          </Link>
        </GlassCard>

      </div>

      {/* 2. Four Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-4.5 border border-slate-100 bg-white text-left">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Students</span>
              <span className="font-display text-2xl font-black text-text-heading mt-1.5 block">{stats.totalStudents}</span>
            </div>
            <div className="rounded-full bg-blue-50 p-2 text-brand-blue">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <span className="text-[9.5px] font-bold text-brand-teal mt-2 block">▲ +6 this month</span>
        </GlassCard>

        <GlassCard className="p-4.5 border border-slate-100 bg-white text-left">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sessions Conducted</span>
              <span className="font-display text-2xl font-black text-text-heading mt-1.5 block">{stats.sessionsConducted}</span>
            </div>
            <div className="rounded-full bg-teal-50 p-2 text-brand-teal">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <span className="text-[9.5px] font-bold text-text-muted mt-2 block">This Month</span>
        </GlassCard>

        <GlassCard className="p-4.5 border border-slate-100 bg-white text-left">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg. Student Progress</span>
              <span className="font-display text-2xl font-black text-text-heading mt-1.5 block">{stats.avgProgress}%</span>
            </div>
            <div className="rounded-full bg-purple-50 p-2 text-purple-600">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>
          <span className="text-[9.5px] font-bold text-brand-teal mt-2 block">Good standing</span>
        </GlassCard>

        <GlassCard className="p-4.5 border border-slate-100 bg-white text-left">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Feedback Score</span>
              <span className="font-display text-2xl font-black text-text-heading mt-1.5 block flex items-baseline gap-1">
                {stats.rating}<span className="text-xs text-text-muted">/5</span>
              </span>
            </div>
            <div className="rounded-full bg-orange-50 p-2 text-brand-orange">
              <Star className="h-5 w-5" />
            </div>
          </div>
          <span className="text-[9.5px] font-bold text-brand-orange mt-2 block">Excellent Reviews</span>
        </GlassCard>
      </div>

      {/* 3. Main Grid sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Student Progress Overview & Upcoming Sessions in split cards */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Student Progress */}
            <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display text-sm font-bold text-text-heading">Student Progress Overview</h3>
                  <select className="rounded bg-slate-50 border border-slate-100 text-[10px] font-bold px-2 py-0.5 outline-none">
                    <option>This Month</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {myStudents.map((s: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img src={s.avatar} alt="" className="h-7 w-7 rounded-full object-cover bg-slate-100" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="flex justify-between text-xs font-bold text-text-heading mb-1.5">
                          <span className="truncate">{s.name}</span>
                          <span className="shrink-0">{s.growthScore}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full">
                          <div className={`h-1.5 rounded-full ${
                            idx === 0 ? "bg-brand-blue" : idx === 1 ? "bg-brand-teal" : idx === 2 ? "bg-purple-500" : "bg-brand-blue"
                          }`} style={{ width: `${s.growthScore}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                to="/dashboard/mentor/students"
                className="mt-6 w-full rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 py-2.5 text-center text-xs font-bold text-text-heading transition-colors"
              >
                View All Students
              </Link>
            </GlassCard>

            {/* Upcoming Sessions */}
            <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display text-sm font-bold text-text-heading">Upcoming Mentor Sessions</h3>
                  <Link to="/dashboard/mentor/sessions" className="text-[10px] text-brand-blue font-bold hover:underline">View Calendar</Link>
                </div>

                <div className="space-y-3.5">
                  {[
                    { m: "MAY", d: "22", title: "AI Assessment Review", sub: "Yash Rajole", time: "10:00 AM" },
                    { m: "MAY", d: "23", title: "Career Guidance", sub: "Aman Patil", time: "04:00 PM" },
                    { m: "MAY", d: "25", title: "Project Discussion", sub: "Neha Mahajan", time: "11:30 AM" }
                  ].map((ev, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-center items-center text-center shrink-0">
                        <span className="text-[7.5px] text-slate-400 font-bold leading-none">{ev.m}</span>
                        <span className="text-xs font-black text-text-heading leading-none mt-1">{ev.d}</span>
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-text-heading truncate leading-tight">{ev.title}</h4>
                        <p className="text-[10px] text-text-muted truncate mt-0.5">{ev.sub}</p>
                      </div>
                      <div className="text-right text-[9px] font-bold text-slate-400 shrink-0">
                        {ev.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-slate-400 mt-4">Make sure to review diagnostic prep sheets before starting sessions.</p>
            </GlassCard>

          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Recent Feedback */}
          <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between h-full">
            <div>
              <h3 className="font-display text-sm font-bold text-text-heading mb-4">Recent Feedback</h3>
              
              <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 text-xs text-text-body relative">
                <p className="italic leading-relaxed">
                  "Very helpful session! Neha explains concepts clearly and motivates us to do better."
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="font-bold text-text-heading">- Yash Rajole</span>
                  <div className="flex gap-0.5 text-brand-orange">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3.5">
                {[
                  { user: "Aman Patil", title: "Great Guidance", rate: 5 },
                  { user: "Riya Sharma", title: "Very Interactive", rate: 5 }
                ].map((f, idx) => (
                  <div key={idx} className="flex gap-2 items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                    <div className="flex gap-2 items-center min-w-0">
                      <div className="h-6.5 w-6.5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {f.user.split(' ')[0][0]}
                      </div>
                      <div className="text-xs text-left min-w-0">
                        <h4 className="font-bold text-text-heading truncate leading-none">{f.user}</h4>
                        <p className="text-[9px] text-text-muted mt-1 leading-none">{f.title}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-brand-orange shrink-0">
                      {[...Array(f.rate)].map((_, i) => <Star key={i} className="h-2.5 w-2.5 fill-current" />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              to="/dashboard/mentor/progress"
              className="mt-6 w-full rounded-xl bg-brand-blue text-white hover:bg-blue-800 py-2.5 text-center text-xs font-bold transition-colors"
            >
              View All Feedback
            </Link>
          </GlassCard>

        </div>
      </div>

      {/* 4. Bottom Row 3 Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Growth Studio Activity */}
        <GlassCard className="p-5 border border-slate-100 bg-white">
          <h3 className="font-display text-sm font-bold text-text-heading mb-4">Growth Studio Activity (SLEC)</h3>
          <div className="space-y-3 text-xs text-text-body">
            {[
              { title: "Logical Thinking Lab", count: 20, active: true },
              { title: "Communication Lab", count: 15, active: true },
              { title: "Aptitude & Skills", count: 18, active: true }
            ].map((studio, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-brand-blue/30 transition-colors">
                <div>
                  <h4 className="font-bold text-text-heading leading-tight">{studio.title}</h4>
                  <p className="text-[9.5px] text-text-muted mt-1 leading-none">{studio.count} Students</p>
                </div>
                {studio.active && (
                  <span className="rounded-full bg-teal-50 border border-teal-150 px-2 py-0.5 text-[8.5px] font-bold text-brand-teal uppercase">
                    Active
                  </span>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
          <div>
            <h3 className="font-display text-sm font-bold text-text-heading mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: "Create Session", to: "/dashboard/mentor/sessions", icon: Plus, bg: "bg-blue-50 hover:border-brand-blue/30" },
                { label: "Upload Resources", to: "/dashboard/mentor/progress", icon: FileText, bg: "bg-teal-50/50 hover:border-brand-teal/30" },
                { label: "Send Announcement", to: "/dashboard/mentor/alerts", icon: Send, bg: "bg-orange-50/40 hover:border-brand-orange/30" },
                { label: "Evaluate Assessment", to: "/dashboard/mentor/plans", icon: CheckSquare, bg: "bg-purple-50/40 hover:border-purple-500/30" }
              ].map((act, idx) => (
                <Link 
                  key={idx}
                  to={act.to}
                  className={`p-3.5 rounded-2xl border border-slate-100 ${act.bg} text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer`}
                >
                  <act.icon className="h-5 w-5 text-brand-blue" />
                  <span className="text-[10px] font-bold text-text-heading leading-tight">{act.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <p className="text-[8.5px] text-slate-400 mt-4 leading-normal">Common operational shortcuts for active advisory panels.</p>
        </GlassCard>

        {/* Performance Insights */}
        <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between text-left">
          <div>
            <h3 className="font-display text-sm font-bold text-text-heading mb-3">Performance Insights</h3>
            
            <div className="flex gap-4 items-center">
              {/* Donut Chart */}
              <div className="h-28 w-28 shrink-0 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius={30} 
                      outerRadius={45} 
                      paddingAngle={4} 
                      dataKey="value"
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black text-text-heading leading-none">48 <span className="text-[7.5px] block font-bold text-text-muted mt-0.5 uppercase">Mentees</span></span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-[10.5px] flex-1">
                {pieData.map((entry, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                      <span className="text-text-muted truncate">{entry.name}</span>
                    </div>
                    <span className="font-bold text-text-heading shrink-0">{entry.value} ({entry.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link 
            to="/dashboard/mentor/progress"
            className="mt-6 w-full rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 py-2.5 text-center text-xs font-bold text-text-heading transition-colors"
          >
            Open Analytics Suite
          </Link>
        </GlassCard>

      </div>
      
    </div>
  );
}
