import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  CheckCircle2,
  Circle,
  Flame,
  BookOpen,
  Timer,
  Target,
  SkipForward,
  RefreshCw,
  Coffee,
  Brain,
  Zap,
  Calendar,
  Star,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student/planner")({
  component: DailyPlannerPage,
  head: () => ({ meta: [{ title: "Daily Planner — Vedhkrit" }] }),
});

// ── Types ──────────────────────────────────────────────────────────────────
interface HomeworkItem {
  id: string;
  subject: string;
  task: string;
  due: string;
  done: boolean;
  color: string;
  textColor: string;
}

interface RevisionGoal {
  id: string;
  chapter: string;
  subject: string;
  progress: number;
  target: number;
}

interface TimeSlot {
  time: string;
  label: string;
  type: "class" | "break" | "free" | "study";
  active?: boolean;
}

// ── POMODORO TIMER ─────────────────────────────────────────────────────────
function PomodoroTimer() {
  const POMODORO = 25 * 60;
  const SHORT_BREAK = 5 * 60;
  const LONG_BREAK = 15 * 60;

  const [mode, setMode] = useState<"focus" | "short" | "long">("focus");
  const [seconds, setSeconds] = useState(POMODORO);
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState(0);

  const durations = { focus: POMODORO, short: SHORT_BREAK, long: LONG_BREAK };

  useEffect(() => {
    setSeconds(durations[mode]);
    setRunning(false);
  }, [mode]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          if (mode === "focus") {
            setSession((prev) => prev + 1);
            toast.success("Focus session complete! Take a short break 🎉");
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const total = durations[mode];
  const pct = ((total - seconds) / total) * 100;
  const r = 56;
  const circ = 2 * Math.PI * r;
  const dash = circ - (pct / 100) * circ;

  return (
    <GlassCard className="p-5 border border-slate-100 bg-white text-center space-y-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Pomodoro Timer
        </span>
        <span className="text-[9px] font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full border border-brand-orange/15">
          {session} sessions today
        </span>
      </div>

      {/* Mode Tabs */}
      <div className="flex rounded-xl border border-slate-100 p-0.5 text-[9.5px] font-bold bg-slate-50">
        {(["focus", "short", "long"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "flex-1 py-1.5 rounded-lg transition-all cursor-pointer",
              mode === m
                ? "bg-brand-orange text-white shadow-xs"
                : "text-text-muted hover:text-text-heading"
            )}
          >
            {m === "focus" ? "Focus" : m === "short" ? "Short Break" : "Long Break"}
          </button>
        ))}
      </div>

      {/* SVG Ring */}
      <div className="relative mx-auto w-36 h-36 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={r} strokeWidth="8" fill="none" className="stroke-slate-100" />
          <circle
            cx="64"
            cy="64"
            r={r}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            stroke={mode === "focus" ? "#E87B3E" : mode === "short" ? "#10b981" : "#6366f1"}
            strokeDasharray={circ}
            strokeDashoffset={dash}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="text-center z-10">
          <span className="text-3xl font-black text-text-heading leading-none">{fmt(seconds)}</span>
          <p className="text-[9.5px] text-text-muted font-bold mt-0.5">
            {mode === "focus" ? "Deep Focus" : mode === "short" ? "Short Break" : "Long Rest"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => { setSeconds(durations[mode]); setRunning(false); }}
          className="h-9 w-9 rounded-xl border border-slate-100 hover:bg-slate-50 flex items-center justify-center text-text-muted cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="h-11 w-11 rounded-xl bg-brand-orange hover:bg-orange-600 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          {running ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "focus" ? "short" : "focus");
          }}
          className="h-9 w-9 rounded-xl border border-slate-100 hover:bg-slate-50 flex items-center justify-center text-text-muted cursor-pointer"
        >
          <SkipForward className="h-3.5 w-3.5" />
        </button>
      </div>
    </GlassCard>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
function DailyPlannerPage() {
  const [homework, setHomework] = useState<HomeworkItem[]>([
    { id: "hw-1", subject: "Mathematics", task: "Chapter 5: Polynomials — Exercise 5.4 (Q1–Q10)", due: "Today", done: false, color: "bg-brand-blue/10", textColor: "text-brand-blue" },
    { id: "hw-2", subject: "Science", task: "Draw labeled diagram of human digestive system", due: "Today", done: true, color: "bg-brand-teal/10", textColor: "text-brand-teal" },
    { id: "hw-3", subject: "English", task: "Write 200-word summary of Chapter 4 — The Lost Child", due: "Tomorrow", done: false, color: "bg-purple-100", textColor: "text-purple-600" },
    { id: "hw-4", subject: "Social Science", task: "Map work: Label rivers of North India", due: "Tomorrow", done: false, color: "bg-amber-100", textColor: "text-amber-700" },
  ]);

  const [revisionGoals] = useState<RevisionGoal[]>([
    { id: "rg-1", chapter: "Quadratic Equations", subject: "Mathematics", progress: 3, target: 5 },
    { id: "rg-2", chapter: "Cell Structure & Organelles", subject: "Science", progress: 2, target: 4 },
    { id: "rg-3", chapter: "The Nationalist Movement", subject: "Social Science", progress: 1, target: 3 },
  ]);

  const timetable: TimeSlot[] = [
    { time: "08:00", label: "Mathematics — Algebra", type: "class" },
    { time: "09:00", label: "English Language — Grammar", type: "class", active: true },
    { time: "10:00", label: "Break", type: "break" },
    { time: "10:30", label: "Science — Physics", type: "class" },
    { time: "11:30", label: "Social Science — Civics", type: "class" },
    { time: "12:30", label: "Lunch Break", type: "break" },
    { time: "01:30", label: "Free Period / Library", type: "free" },
    { time: "02:30", label: "Sanskrit / Hindi", type: "class" },
    { time: "03:30", label: "Study Hall", type: "study" },
  ];

  const toggleHomework = (id: string) => {
    setHomework((hw) =>
      hw.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
    const item = homework.find((h) => h.id === id);
    if (item && !item.done) toast.success(`✅ Marked "${item.task.slice(0, 30)}..." complete!`);
  };

  const streak = 7;
  const studyHours = 4.5;
  const completedHW = homework.filter((h) => h.done).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 22 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader
        title="Daily Planner"
        subtitle="Your structured study schedule, task checklist, revision goals, and focus timer — all in one place."
      />

      {/* ── Top Stats ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Study Streak", value: `${streak} Days`, icon: Flame, iconColor: "text-brand-orange", bg: "bg-orange-50" },
          { label: "Today's Study", value: `${studyHours} hrs`, icon: Clock, iconColor: "text-brand-blue", bg: "bg-blue-50" },
          { label: "Homework Done", value: `${completedHW}/${homework.length}`, icon: CheckCircle2, iconColor: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Revision Goals", value: `${revisionGoals.length} Active`, icon: Brain, iconColor: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <GlassCard key={i} className="p-4 border border-slate-100 bg-white flex items-center gap-3">
            <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
              <stat.icon className={cn("h-4.5 w-4.5", stat.iconColor)} />
            </div>
            <div>
              <p className="text-[9px] text-text-muted font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-base font-black text-text-heading leading-tight">{stat.value}</p>
            </div>
          </GlassCard>
        ))}
      </motion.div>

      {/* ── Mentor Task of the Day ── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl border border-brand-orange/20 bg-gradient-to-r from-orange-50/60 via-white to-orange-50/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-brand-orange text-white flex items-center justify-center shrink-0">
              <Star className="h-4.5 w-4.5 fill-white" />
            </div>
            <div>
              <p className="text-[9.5px] font-bold text-brand-orange uppercase tracking-wider">Mentor Task of the Day</p>
              <p className="text-sm font-bold text-text-heading mt-0.5">Record a 2-minute verbal explanation of Pythagoras Theorem</p>
              <p className="text-[10px] text-text-muted mt-0.5 font-semibold">Assigned by Neha Mahta • Due today</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toast.success("Opening task submission panel...")}
            className="px-4 py-2 bg-brand-orange text-white rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shadow-xs hover:bg-orange-600 transition-colors cursor-pointer"
          >
            Submit Task <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>

      {/* ── Main 3-col layout ── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Timetable + Homework */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Timetable */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-5 border border-slate-100 bg-white">
              <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-blue" /> Today's Timetable — Monday, 14 Jul 2026
              </h3>

              <div className="space-y-1.5">
                {timetable.map((slot, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                      slot.active && "bg-brand-orange/8 border border-brand-orange/20",
                      !slot.active && slot.type === "class" && "hover:bg-slate-50 border border-transparent",
                      slot.type === "break" && "opacity-60",
                      slot.type === "free" && "opacity-75",
                      slot.type === "study" && "bg-blue-50/60 border border-brand-blue/15"
                    )}
                  >
                    <span className="text-[9.5px] font-bold text-slate-400 w-10 shrink-0">{slot.time}</span>
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        slot.type === "class" && "bg-brand-blue",
                        slot.type === "break" && "bg-slate-300",
                        slot.type === "free" && "bg-amber-400",
                        slot.type === "study" && "bg-brand-teal",
                        slot.active && "bg-brand-orange animate-pulse"
                      )}
                    />
                    <span className={cn(
                      "font-bold",
                      slot.active ? "text-brand-orange" : "text-text-heading",
                      slot.type === "break" && "text-text-muted"
                    )}>
                      {slot.label}
                    </span>
                    {slot.active && (
                      <span className="ml-auto text-[9px] font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full border border-brand-orange/15">
                        In Progress
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Homework Checklist */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-5 border border-slate-100 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Homework Checklist
                </h3>
                <span className="text-[10px] font-bold text-emerald-600">
                  {completedHW}/{homework.length} Complete
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedHW / homework.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              <div className="space-y-2.5">
                {homework.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleHomework(item.id)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer",
                      item.done
                        ? "border-emerald-100 bg-emerald-50/40 opacity-70"
                        : "border-slate-100 bg-white hover:border-slate-200"
                    )}
                  >
                    {item.done ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn("text-[8.5px] font-bold px-1.5 py-0.5 rounded", item.color, item.textColor)}>
                          {item.subject}
                        </span>
                        <span className={cn("text-[9px] font-bold", item.due === "Today" ? "text-brand-orange" : "text-slate-400")}>
                          Due {item.due}
                        </span>
                      </div>
                      <p className={cn("text-xs font-semibold text-text-heading leading-snug", item.done && "line-through text-text-muted")}>
                        {item.task}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Right: Pomodoro + Revision Goals */}
        <div className="space-y-6">
          <motion.div variants={itemVariants}>
            <PomodoroTimer />
          </motion.div>

          {/* Revision Goals */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-5 border border-slate-100 bg-white space-y-4">
              <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="h-4 w-4 text-purple-500" /> Revision Goals
              </h3>

              <div className="space-y-4">
                {revisionGoals.map((goal) => {
                  const pct = Math.round((goal.progress / goal.target) * 100);
                  return (
                    <div key={goal.id}>
                      <div className="flex justify-between items-center mb-1.5 text-xs">
                        <div>
                          <p className="font-bold text-text-heading leading-tight">{goal.chapter}</p>
                          <p className="text-[9.5px] text-text-muted font-bold">{goal.subject}</p>
                        </div>
                        <span className="font-extrabold text-text-heading text-sm">{pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-linear-to-r from-purple-400 to-purple-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-[9px] text-text-muted font-bold mt-1">
                        {goal.progress}/{goal.target} study rounds
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => toast.info("Opening full revision planner...")}
                className="w-full py-2 border border-slate-100 hover:bg-slate-50 text-xs font-bold text-text-muted rounded-xl transition-colors cursor-pointer"
              >
                View All Revision Goals
              </button>
            </GlassCard>
          </motion.div>

          {/* Daily Streak Card */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 text-center space-y-2">
              <Flame className="h-8 w-8 text-brand-orange mx-auto" />
              <p className="text-2xl font-black text-text-heading">{streak} Day Streak</p>
              <p className="text-[10.5px] text-text-muted font-semibold">
                Keep studying daily to grow your streak! You're on a roll 🚀
              </p>
              <div className="flex justify-center gap-1.5 pt-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-6 w-6 rounded-lg flex items-center justify-center text-[9px] font-bold",
                      i < streak ? "bg-brand-orange text-white" : "bg-slate-100 text-slate-400"
                    )}
                  >
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
