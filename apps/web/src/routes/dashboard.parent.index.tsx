import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { TrendingUp, Calendar, Heart, BookOpen, Sparkles, MessageCircle, Check, Lock, ArrowRight, FileText, Star, User, GraduationCap, Download, RefreshCw } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { monthlyGrowth, students } from "@/lib/mock-data";
import { useParentOverview } from "@/lib/api";

export const Route = createFileRoute("/dashboard/parent/")({
  component: ParentDashboardOverview,
  head: () => ({ meta: [{ title: "Parent Dashboard — Vedhkrit" }] }),
});

const chartData = [
  { month: "Jan", Academic: 60, Skills: 50, Confidence: 55, Discipline: 65 },
  { month: "Feb", Academic: 65, Skills: 52, Confidence: 60, Discipline: 66 },
  { month: "Mar", Academic: 70, Skills: 58, Confidence: 62, Discipline: 64 },
  { month: "Apr", Academic: 78, Skills: 68, Confidence: 65, Discipline: 70 },
  { month: "May", Academic: 85, Skills: 75, Confidence: 71, Discipline: 73 },
];

function ParentDashboardOverview() {
  const { data: apiData, isLoading } = useParentOverview();

  const journeySteps = [
    { label: "Discover", status: "done" },
    { label: "Understand", status: "done" },
    { label: "Plan", status: "done" },
    { label: "Explore", status: "active" },
    { label: "Develop", status: "pending" },
    { label: "Achieve", status: "locked" },
    { label: "Lead", status: "locked" }
  ];

  if (isLoading) {
    return (
      <div className="flex h-[60dvh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  const parentName = apiData?.parent?.user?.name || "Priya Sharma";
  const child = apiData?.children?.[0] || {
    id: "STU0001",
    name: "Yash Rajole",
    grade: "10th Grade",
    school: "DPS Bangalore",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=0",
    vedhkritIndex: 82,
    attendance: 94,
    academicAvg: 85,
    goals: [],
    sessions: [],
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-heading">Good Morning, {parentName.split(' ')[0]}! 👋</h2>
          <p className="text-xs text-text-muted mt-0.5">Here's how your child is growing and learning today.</p>
        </div>

        {/* Child Profile Bar */}
        <div className="flex items-center gap-3 bg-white border border-slate-100 p-2.5 rounded-2xl shadow-xs">
          <img src={child.avatar} alt="" className="h-9 w-9 rounded-full object-cover bg-slate-100" />
          <div className="text-left text-xs min-w-0">
            <h4 className="font-bold text-text-heading leading-tight truncate">{child.name}</h4>
            <p className="text-[10px] text-text-muted mt-0.5 truncate leading-none">{child.grade} • {child.school.split(' ')[0]}</p>
          </div>
          <Link 
            to="/dashboard/parent/growth"
            className="ml-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/70 p-1.5 text-slate-500"
            title="View Profile"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 2. Five Metric Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
        <GlassCard className="p-3.5 border border-slate-100 bg-white">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Vedhkrit Index</div>
          <div className="font-display text-base font-bold text-text-heading mt-1">{child.vedhkritIndex}<span className="text-[10px] font-medium text-text-muted">/100</span></div>
          <div className="text-[9px] font-bold text-brand-teal mt-0.5">Great Progress</div>
          <div className="h-5 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="Academic" stroke="var(--brand-teal)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-3.5 border border-slate-100 bg-white">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Attendance</div>
          <div className="font-display text-base font-bold text-text-heading mt-1">{child.attendance}%</div>
          <div className="text-[9px] font-bold text-brand-teal mt-0.5">This Month</div>
          <div className="h-5 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="Discipline" stroke="var(--brand-teal)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-3.5 border border-slate-100 bg-white">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Academic Growth</div>
          <div className="font-display text-base font-bold text-text-heading mt-1">+15%</div>
          <div className="text-[9px] font-bold text-brand-blue mt-0.5">This Term</div>
          <div className="h-5 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="Academic" stroke="var(--brand-blue)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-3.5 border border-slate-100 bg-white">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Career Readiness</div>
          <div className="font-display text-base font-bold text-text-heading mt-1">76%</div>
          <div className="text-[9px] font-bold text-brand-orange mt-0.5">On Track</div>
          <div className="h-5 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="Skills" stroke="var(--brand-orange)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-3.5 border border-slate-100 bg-white col-span-2 md:col-span-1">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Confidence Score</div>
          <div className="font-display text-base font-bold text-text-heading mt-1">71<span className="text-[10px] font-medium text-text-muted">/100</span></div>
          <div className="text-[9px] font-bold text-brand-orange mt-0.5">Growing Steadily</div>
          <div className="h-5 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="Confidence" stroke="var(--brand-orange)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* 3. Main Grid layout split */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Main Content Areas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Progress Multi-Line chart */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-sm font-bold text-text-heading">Overall Progress</h3>
                <p className="text-[10px] text-text-muted mt-0.5">Academic & skills developmental indexing timeline</p>
              </div>
              <select className="rounded-lg border border-slate-100 bg-slate-50/50 px-2.5 py-1 text-[10px] font-bold text-text-heading outline-none">
                <option>This Term</option>
              </select>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" opacity={0.6} />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-muted)", fontSize: 10 }} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" name="Academic" dataKey="Academic" stroke="var(--brand-blue)" strokeWidth={2.5} />
                  <Line type="monotone" name="Skills" dataKey="Skills" stroke="var(--brand-teal)" strokeWidth={2.5} />
                  <Line type="monotone" name="Confidence" dataKey="Confidence" stroke="var(--brand-orange)" strokeWidth={2.5} />
                  <Line type="monotone" name="Discipline" dataKey="Discipline" stroke="#8b5cf6" strokeWidth={2.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Subject Performance and Parent Insights */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Subject Performance progress bars */}
            <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-sm font-bold text-text-heading">Subject Performance</h3>
                  <Link to="/dashboard/parent/reports" className="text-[10px] text-brand-blue font-bold hover:underline">View All</Link>
                </div>
                <div className="space-y-3.5">
                  {[
                    { sub: "Mathematics", rate: 85, color: "bg-brand-blue" },
                    { sub: "Science", rate: 82, color: "bg-brand-teal" },
                    { sub: "English", rate: 78, color: "bg-purple-500" },
                    { sub: "Social Science", rate: 74, color: "bg-brand-orange" },
                    { sub: "Hindi", rate: 88, color: "bg-teal-500" }
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold text-text-heading">
                        <span>{s.sub}</span>
                        <span>{s.rate}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full">
                        <div className={`h-1.5 rounded-full ${s.color}`} style={{ width: `${s.rate}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-slate-400 mt-4">Based on monthly internal assessments & counseling indices.</p>
            </GlassCard>

            {/* Parent Insights bullets */}
            <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-text-heading mb-4">Parent Insights</h3>
                <div className="space-y-3.5 text-xs text-text-body">
                  <div className="flex gap-2.5 items-start">
                    <Sparkles className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Yash shows excellent analytical reasoning in Mathematics.</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Star className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Focus on improving grammatical structure in English writing.</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <User className="h-4 w-4 text-brand-teal shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Encourage participation in group activities to build leadership.</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <GraduationCap className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Aptitude profile signals high compatibility with engineering track.</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/dashboard/parent/growth"
                className="mt-4 w-full rounded-xl bg-brand-blue/5 border border-brand-blue/15 hover:bg-brand-blue hover:text-white py-2.5 text-center text-xs font-bold text-brand-blue transition-all flex items-center justify-center gap-1.5"
              >
                View Detailed Report
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </GlassCard>

          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Recent Notifications */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold text-text-heading">Recent Notifications</h3>
              <button className="text-[10px] text-brand-blue font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { title: "Mentor Session Completed", sub: "Yash's mentor session summary is ready.", time: "1h ago" },
                { title: "Assessment Completed", sub: "Science assessment diagnostic report generated.", time: "3h ago" },
                { title: "Homework Submitted", sub: "Math homework uploaded successfully.", time: "1d ago" },
                { title: "School Announcement", sub: "Annual sports registration begins next week.", time: "2d ago" }
              ].map((n, idx) => (
                <div key={idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl">
                  <div className="flex justify-between items-baseline text-[11px] font-bold text-text-heading">
                    <span>{n.title}</span>
                    <span className="text-[9px] text-slate-400 shrink-0 font-normal">{n.time}</span>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1 leading-normal">{n.sub}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Upcoming Events */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold text-text-heading">Upcoming Events</h3>
              <Link to="/dashboard/parent/attendance" className="text-[10px] text-brand-blue font-bold hover:underline">View Calendar</Link>
            </div>
            <div className="space-y-4">
              {[
                { m: "MAY", d: "22", title: "AI Assessment", sub: "Aptitude & Skills", time: "10:00 AM" },
                { m: "MAY", d: "23", title: "Parent Meeting", sub: "With Class Teacher", time: "04:00 PM" },
                { m: "MAY", d: "25", title: "Mentor Session", sub: "Career Guidance", time: "11:30 AM" },
                { m: "MAY", d: "28", title: "Science Project", sub: "Submission Deadline", time: "All Day" }
              ].map((ev, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-center items-center text-center shrink-0">
                    <span className="text-[7.5px] text-slate-400 font-bold leading-none">{ev.m}</span>
                    <span className="text-sm font-black text-text-heading leading-none mt-1">{ev.d}</span>
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
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "Message Mentor", to: "/dashboard/parent/communication", icon: MessageCircle },
                { label: "Book Meeting", to: "/dashboard/parent/communication", icon: Calendar },
                { label: "View Reports", to: "/dashboard/parent/reports", icon: FileText },
                { label: "Pay Fees", to: "/dashboard/parent/", icon: RefreshCw },
                { label: "Update Profile", to: "/dashboard/parent/growth", icon: User },
                { label: "Raise Query", to: "/dashboard/parent/communication", icon: Sparkles }
              ].map((action, idx) => (
                <Link 
                  key={idx}
                  to={action.to}
                  className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/30 hover:border-brand-blue/30 text-center flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <action.icon className="h-4.5 w-4.5 text-brand-blue" />
                  <span className="text-[9px] font-bold text-text-heading leading-tight break-words">{action.label}</span>
                </Link>
              ))}
            </div>
          </GlassCard>

        </div>
      </div>

      {/* 4. Bottom Row 3 Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Mentor Update */}
        <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-sm font-bold text-text-heading">Mentor Update</h3>
              <span className="rounded-full bg-teal-50 border border-teal-200 px-2 py-0.5 text-[8.5px] font-bold text-brand-teal flex items-center gap-1">
                <span className="h-1 w-1 bg-brand-teal rounded-full animate-ping" /> Online
              </span>
            </div>

            <div className="flex items-center gap-2.5 mb-4">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=80&auto=format&fit=crop" alt="" className="h-8.5 w-8.5 rounded-full object-cover bg-slate-100" />
              <div className="text-xs">
                <h4 className="font-bold text-text-heading leading-none">Neha Mehta</h4>
                <p className="text-[9.5px] text-text-muted mt-1 leading-none">Career & Growth Mentor</p>
              </div>
            </div>

            <p className="text-xs text-text-body leading-relaxed mb-4">
              "Yash is showing consistent improvements in logical problem-solving tasks. We encourage more out-of-school olympiad exposure."
            </p>

            <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-text-body">
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-brand-teal shrink-0 mt-0.5" />
                <span>Discussed engineering stream paths</span>
              </div>
              <div className="flex gap-2">
                <Check className="h-4 w-4 text-brand-teal shrink-0 mt-0.5" />
                <span>Suggested weekly math check-ins</span>
              </div>
            </div>
          </div>

          <Link 
            to="/dashboard/parent/mentor-notes"
            className="mt-5 w-full rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 py-2.5 text-center text-xs font-bold text-text-heading transition-colors"
          >
            View Full Update
          </Link>
        </GlassCard>

        {/* Learning Journey Stages */}
        <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-sm font-bold text-text-heading">Learning Journey</h3>
              <Link to="/framework" className="text-[10px] text-brand-blue font-bold hover:underline">View All</Link>
            </div>

            <div className="flex items-center gap-1 mb-6">
              {journeySteps.map((step, idx) => (
                <div key={idx} className="flex-1 flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                    step.status === "done" ? "bg-brand-teal" :
                    step.status === "active" ? "bg-brand-blue animate-pulse" :
                    "bg-slate-200"
                  }`} />
                  {idx < journeySteps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${
                      step.status === "done" ? "bg-brand-teal" : "bg-slate-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs">
              <div className="font-bold text-brand-blue uppercase tracking-widest text-[9.5px]">Current Focus Stage</div>
              <h4 className="font-bold text-text-heading mt-1.5">Develop Stage</h4>
              <p className="text-[10.5px] text-text-muted leading-relaxed mt-1">
                Yash is in the skill development phase, focusing on building high-value communication & logical reasoning blocks.
              </p>
            </div>
          </div>

          <Link 
            to="/dashboard/parent/growth"
            className="mt-5 w-full rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 py-2.5 text-center text-xs font-bold text-text-heading transition-colors"
          >
            Explore Activities
          </Link>
        </GlassCard>

        {/* Downloads & Reports */}
        <GlassCard className="p-5 border border-slate-100 bg-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-sm font-bold text-text-heading">Downloads & Reports</h3>
              <Link to="/dashboard/parent/reports" className="text-[10px] text-brand-blue font-bold hover:underline">View All</Link>
            </div>
            <div className="space-y-3.5">
              {[
                { title: "Term 1 Progress Report", type: "Generated 15 May, 2025" },
                { title: "AI Assessment Report", type: "Generated 12 May, 2025" },
                { title: "Mentor Session Summary", type: "Updated 10 May, 2025" },
                { title: "Attendance Report (April)", type: "Generated 1 May, 2025" }
              ].map((doc, idx) => (
                <div key={idx} className="flex justify-between items-center gap-2">
                  <div className="flex gap-2.5 items-center min-w-0">
                    <div className="h-8.5 w-8.5 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                      <FileText className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-xs text-left min-w-0">
                      <h4 className="font-bold text-text-heading truncate leading-tight">{doc.title}</h4>
                      <p className="text-[9.5px] text-text-muted mt-0.5 truncate leading-none">{doc.type}</p>
                    </div>
                  </div>
                  <button className="h-7 w-7 rounded-lg border border-slate-100 hover:border-brand-blue/30 flex items-center justify-center text-slate-500 hover:text-brand-blue transition-colors shrink-0 cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link 
            to="/dashboard/parent/reports"
            className="mt-5 w-full rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 py-2.5 text-center text-xs font-bold text-text-heading transition-colors"
          >
            View All Documents
          </Link>
        </GlassCard>

      </div>
      
    </div>
  );
}
