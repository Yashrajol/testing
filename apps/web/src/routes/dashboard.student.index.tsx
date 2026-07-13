import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { Check, Lock, Sparkles, ArrowRight, Calendar, ListTodo, Award, CheckSquare, Square } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis, Tooltip } from "recharts";
import { radarData } from "@/lib/mock-data";
import { motion } from "motion/react";
import { useState } from "react";
import { useStudentOverview } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student/")({
  component: StudentDashboardOverview,
  head: () => ({ meta: [{ title: "Student Dashboard — Vedhkrit" }] }),
});

function StudentDashboardOverview() {
  const { data: apiData, isLoading } = useStudentOverview();
  const [tasks, setTasks] = useState([
    { id: 1, label: "Math Practice", desc: "20 questions", checked: false },
    { id: 2, label: "Science Assignment", desc: "Complete chapter 5", checked: false },
    { id: 3, label: "English Reading", desc: "15 mins", checked: false },
    { id: 4, label: "Growth Studio Activity", desc: "Logical Thinking Lab", checked: true },
  ]);

  const userName = apiData?.student?.user?.name || "Yash Rajole";
  
  if (isLoading) {
    return (
      <div className="flex h-[60dvh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    );
  }

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const completedCount = tasks.filter(t => t.checked).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

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

  const journeySteps = [
    { label: "Discover", desc: "AI assessment completed", status: "done" },
    { label: "Understand", desc: "Learner DNA generated", status: "done" },
    { label: "Plan", desc: "Roadmap created with mentor", status: "done" },
    { label: "Explore", desc: "Growth Studio activities", status: "active", num: 4 },
    { label: "Develop", desc: "Skills & knowledge building", status: "pending" },
    { label: "Achieve", desc: "Real progress with confidence", status: "locked" },
    { label: "Lead", desc: "Future ready for any path", status: "locked" }
  ];

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      className="grid gap-6 lg:grid-cols-3 text-left"
    >
      {/* Main content grid */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Banner greeting */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl border border-slate-100 bg-white p-5 flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-xs min-h-40">
            <div className="z-10 space-y-1.5">
              <h2 className="font-display text-2xl font-bold text-text-heading">Good Morning, {userName.split(' ')[0]}! ☀️</h2>
              <p className="text-xs text-text-muted">Small steps today, big success tomorrow.</p>
            </div>
            
            {/* Vector Character Banner illustration */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 md:w-1/3 bg-gradient-to-l from-orange-50/70 to-transparent flex items-end justify-end">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=220&auto=format&fit=crop" 
                className="h-[120%] w-full object-cover object-top opacity-85 mix-blend-multiply select-none pointer-events-none" 
                alt="" 
              />
            </div>
          </div>
        </motion.div>

        {/* 4 Stat Cards */}
        <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <GlassCard className="p-4 border border-slate-100 bg-white">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Learning DNA</div>
            <div className="font-display text-base font-bold text-text-heading mt-1">Unique Learner</div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3">
              <div className="bg-purple-500 h-1 rounded-full animate-pulse" style={{ width: "85%" }} />
            </div>
          </GlassCard>
          
          <GlassCard className="p-4 border border-slate-100 bg-white">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Career Clarity</div>
            <div className="font-display text-base font-bold text-text-heading mt-1">76% On Track</div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3">
              <div className="bg-brand-teal h-1 rounded-full animate-pulse" style={{ width: "76%" }} />
            </div>
          </GlassCard>

          <GlassCard className="p-4 border border-slate-100 bg-white">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Confidence Score</div>
            <div className="font-display text-base font-bold text-text-heading mt-1 flex items-baseline gap-1">
              <span>71</span>
              <span className="text-[10px] text-text-muted">/100</span>
              <span className="text-[9px] text-brand-orange font-bold ml-auto">Growing</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3">
              <div className="bg-brand-orange h-1 rounded-full animate-pulse" style={{ width: "71%" }} />
            </div>
          </GlassCard>

          <GlassCard className="p-4 border border-slate-100 bg-white">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Overall Growth</div>
            <div className="font-display text-base font-bold text-text-heading mt-1 flex items-baseline gap-1">
              <span>+12%</span>
              <span className="text-[9px] text-text-muted">This Month</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full mt-3">
              <div className="bg-teal-500 h-1 rounded-full animate-pulse" style={{ width: "82%" }} />
            </div>
          </GlassCard>
        </motion.div>

        {/* Radar & Learning Journey timeline */}
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Radar chart card */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-5 border border-slate-100 bg-white h-full flex flex-col justify-between relative">
              <div>
                <h3 className="font-display text-sm font-bold text-text-heading">Your Growth Snapshot</h3>
                <p className="text-[10px] text-text-muted">Dimension-wise development rating index.</p>
              </div>

              <div className="h-64 mt-4 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="var(--border-default)" />
                    <PolarAngleAxis dataKey="dimension" tick={{ fill: "var(--text-heading)", fontSize: 8, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Aarav" dataKey="score" stroke="var(--brand-orange)" fill="var(--brand-orange)" fillOpacity={0.22} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>

                {/* Circular indicator in center (from design reference) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center bg-white/95 backdrop-blur-xs rounded-full h-18 w-18 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-center items-center">
                    <span className="text-base font-black text-brand-orange leading-none">82</span>
                    <span className="text-[7.5px] text-text-muted font-bold mt-0.5 uppercase tracking-wider">Index™</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/dashboard/student/skills"
                className="mt-4 w-full rounded-xl bg-brand-orange/5 border border-brand-orange/15 hover:bg-brand-orange hover:text-white py-2.5 text-center text-xs font-bold text-brand-orange transition-all flex items-center justify-center gap-1.5"
              >
                View Full Analysis
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </GlassCard>
          </motion.div>

          {/* Journey timeline */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-5 border border-slate-100 bg-white h-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-sm font-bold text-text-heading">Learning Journey</h3>
                  <p className="text-[10px] text-text-muted">Track your progression stages</p>
                </div>
                <Link to="/framework" className="text-[10px] text-brand-blue font-bold hover:underline">View All</Link>
              </div>

              <div className="relative pl-6 space-y-4">
                {/* Vertical timeline line */}
                <div className="absolute left-2 top-2 bottom-2 w-[1.5px] bg-slate-100" />
                
                {journeySteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-3">
                    {/* Timeline bullet */}
                    <div className="absolute -left-6 mt-0.5 flex items-center justify-center">
                      {step.status === "done" && (
                        <div className="h-4.5 w-4.5 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-brand-teal">
                          <Check className="h-2.5 w-2.5 stroke-[3px]" />
                        </div>
                      )}
                      {step.status === "active" && (
                        <div className="h-4.5 w-4.5 rounded-full bg-brand-blue text-white flex items-center justify-center text-[9px] font-black border border-brand-blue/30 shadow-xs">
                          {step.num}
                        </div>
                      )}
                      {step.status === "pending" && (
                        <div className="h-4.5 w-4.5 rounded-full bg-white border-2 border-slate-200" />
                      )}
                      {step.status === "locked" && (
                        <div className="h-4.5 w-4.5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                          <Lock className="h-2.5 w-2.5" />
                        </div>
                      )}
                    </div>

                    <div className="text-left">
                      <h4 className={cn(
                        "text-xs font-bold leading-none",
                        step.status === "done" && "text-slate-400 line-through",
                        step.status === "active" && "text-brand-blue",
                        step.status === "pending" && "text-text-heading",
                        step.status === "locked" && "text-slate-400"
                      )}>
                        {step.label}
                      </h4>
                      <p className="text-[10px] text-text-muted mt-1 leading-none">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>

      {/* Right Sidebar columns */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Today's Tasks checkbox list */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-1.5">
                <ListTodo className="h-4 w-4 text-brand-orange" />
                Today's Tasks
              </h3>
              <button className="text-[10px] text-brand-blue font-bold hover:underline">View All</button>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl border border-slate-100 transition-all cursor-pointer",
                    task.checked ? "bg-slate-50/70 border-slate-200" : "bg-white hover:border-slate-200"
                  )}
                >
                  <button className="text-slate-400 hover:text-brand-orange">
                    {task.checked ? (
                      <CheckSquare className="h-4.5 w-4.5 text-brand-orange" />
                    ) : (
                      <Square className="h-4.5 w-4.5 text-slate-300" />
                    )}
                  </button>
                  <div className="text-left">
                    <h4 className={cn("text-xs font-bold leading-tight", task.checked ? "text-slate-400 line-through" : "text-text-heading")}>
                      {task.label}
                    </h4>
                    <p className="text-[10px] text-text-muted mt-0.5 leading-none">{task.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Task completion progress bar */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-[10px] font-bold text-text-muted mb-2">
                <span>{completedCount} of {tasks.length} tasks completed</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full">
                <div className="bg-brand-orange h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Upcoming timeline schedule */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-blue" />
                Upcoming
              </h3>
              <Link to="/dashboard/student/sessions" className="text-[10px] text-brand-blue font-bold hover:underline">View Calendar</Link>
            </div>

            <div className="space-y-4">
              {[
                { m: "MAY", d: "22", title: "AI Assessment", sub: "Aptitude & Skills", time: "10:00 AM" },
                { m: "MAY", d: "23", title: "Mentor Session", sub: "Career Guidance", time: "04:00 PM" },
                { m: "MAY", d: "25", title: "Growth Studio (SLEC)", sub: "Critical Thinking Lab", time: "11:30 AM" },
                { m: "MAY", d: "28", title: "Science Project", sub: "Submission", time: "All Day" }
              ].map((ev, i) => (
                <div key={i} className="flex gap-4 items-center">
                  {/* Date Block */}
                  <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-center items-center text-center shrink-0">
                    <span className="text-[7.5px] text-text-muted font-black leading-none">{ev.m}</span>
                    <span className="text-base font-black text-text-heading leading-none mt-1">{ev.d}</span>
                  </div>
                  {/* Event Text */}
                  <div className="text-left min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-text-heading truncate leading-tight">{ev.title}</h4>
                    <p className="text-[10px] text-text-muted truncate mt-0.5">{ev.sub}</p>
                  </div>
                  {/* Time label */}
                  <div className="text-right text-[9.5px] font-bold text-slate-400 shrink-0">
                    {ev.time}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </motion.div>
  );
}
