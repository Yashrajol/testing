import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { motion, AnimatePresence } from "motion/react";
import {
  Rocket,
  Stethoscope,
  Cpu,
  Scale,
  Plane,
  Landmark,
  Brush,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronRight,
  Star,
  Video,
  Zap,
  Target,
  Users,
  Compass,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";

export const Route = createFileRoute("/dashboard/student/career")({
  component: CareerExplorerPage,
  head: () => ({ meta: [{ title: "Career Explorer — Vedhkrit" }] }),
});

// ── Career data ─────────────────────────────────────────────────────────────
const careerOptions = [
  { id: "doctor", label: "Doctor", icon: Stethoscope, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
  { id: "engineer", label: "Engineer", icon: Cpu, color: "text-brand-blue", bg: "bg-blue-50", border: "border-blue-100" },
  { id: "ias", label: "IAS Officer", icon: Landmark, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-100" },
  { id: "pilot", label: "Pilot", icon: Plane, color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
  { id: "lawyer", label: "Lawyer", icon: Scale, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  { id: "designer", label: "Designer", icon: Brush, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100" },
];

const careerDetails: Record<string, {
  title: string;
  tagline: string;
  match: number;
  subjects: { name: string; level: string; color: string }[];
  skills: { name: string; met: boolean }[];
  activities: { title: string; type: string; icon: any }[];
  path: { step: string; year: string; done: boolean }[];
  mentorVideos: { title: string; mentor: string; duration: string }[];
}> = {
  doctor: {
    title: "Doctor (MBBS → MD)",
    tagline: "Heal lives through science, precision, and compassion.",
    match: 82,
    subjects: [
      { name: "Biology", level: "Essential", color: "text-rose-600 bg-rose-50 border-rose-100" },
      { name: "Chemistry", level: "Essential", color: "text-orange-600 bg-orange-50 border-orange-100" },
      { name: "Physics", level: "Important", color: "text-blue-600 bg-blue-50 border-blue-100" },
    ],
    skills: [
      { name: "Biology concepts — Cell Division, Genetics", met: true },
      { name: "Chemistry — Organic Reactions", met: true },
      { name: "NEET Exam preparation readiness", met: false },
      { name: "Human Anatomy basics", met: false },
    ],
    activities: [
      { title: "Join Biology Olympiad", type: "Competition", icon: Star },
      { title: "Shadow a local clinic visit", type: "Experience", icon: Users },
      { title: "NEET mock test series", type: "Practice", icon: Target },
    ],
    path: [
      { step: "Score 90%+ in Class 10 Science", year: "2026", done: true },
      { step: "Choose PCB stream in Class 11", year: "2026", done: false },
      { step: "Crack NEET-UG Exam", year: "2028", done: false },
      { step: "MBBS (5.5 years)", year: "2028–34", done: false },
      { step: "MD / Specialization", year: "2034+", done: false },
    ],
    mentorVideos: [
      { title: "From Class 10 to MBBS: Aarav's Guide", mentor: "Dr. Priya Sharma", duration: "12 mins" },
      { title: "How to choose the right biology electives", mentor: "Neha Mahta", duration: "8 mins" },
    ],
  },
  engineer: {
    title: "Engineer (B.Tech → JEE)",
    tagline: "Build the future with logic, mathematics, and innovation.",
    match: 91,
    subjects: [
      { name: "Mathematics", level: "Essential", color: "text-brand-blue bg-blue-50 border-blue-100" },
      { name: "Physics", level: "Essential", color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
      { name: "Chemistry", level: "Important", color: "text-orange-600 bg-orange-50 border-orange-100" },
    ],
    skills: [
      { name: "Algebra — Polynomials & Equations", met: true },
      { name: "Physics — Laws of Motion", met: true },
      { name: "JEE Advanced level problems", met: false },
      { name: "Programming / Coding basics", met: false },
    ],
    activities: [
      { title: "Science fair robotics project", type: "Project", icon: Cpu },
      { title: "Enroll in online Python course", type: "Learning", icon: BookOpen },
      { title: "JEE mock test weekly practice", type: "Practice", icon: Target },
    ],
    path: [
      { step: "Score 90%+ in Class 10 Math & Science", year: "2026", done: true },
      { step: "Choose PCM stream in Class 11", year: "2026", done: false },
      { step: "Crack JEE Main & Advanced", year: "2028", done: false },
      { step: "B.Tech (4 years)", year: "2028–32", done: false },
      { step: "Career / M.Tech / GATE", year: "2032+", done: false },
    ],
    mentorVideos: [
      { title: "JEE Prep Strategy for Class 10 Students", mentor: "Neha Mahta", duration: "15 mins" },
      { title: "Choosing the best engineering branch", mentor: "Ravi Gupta", duration: "11 mins" },
    ],
  },
  ias: {
    title: "IAS Officer (UPSC CSE)",
    tagline: "Shape India's future through governance and public leadership.",
    match: 74,
    subjects: [
      { name: "History", level: "Essential", color: "text-amber-700 bg-amber-50 border-amber-100" },
      { name: "Geography", level: "Essential", color: "text-green-700 bg-green-50 border-green-100" },
      { name: "Political Science", level: "Essential", color: "text-purple-600 bg-purple-50 border-purple-100" },
    ],
    skills: [
      { name: "Current affairs reading habit", met: false },
      { name: "Essay writing and articulation", met: true },
      { name: "NCERT Social Science concepts", met: true },
      { name: "Logical reasoning", met: false },
    ],
    activities: [
      { title: "Start a current affairs journal", type: "Habit", icon: BookOpen },
      { title: "Join debate / MUN club", type: "Activity", icon: Users },
      { title: "Read one NCERT chapter daily", type: "Study", icon: Target },
    ],
    path: [
      { step: "Build strong Social Science base", year: "2026", done: true },
      { step: "Choose Humanities in Class 11", year: "2026", done: false },
      { step: "Graduate in any discipline", year: "2028–32", done: false },
      { step: "UPSC CSE Exam (Prelims + Mains)", year: "2032+", done: false },
      { step: "IAS / IPS / IFS Appointment", year: "2034+", done: false },
    ],
    mentorVideos: [
      { title: "How to start UPSC prep early", mentor: "Neha Mahta", duration: "10 mins" },
    ],
  },
  pilot: {
    title: "Commercial Pilot (CPL)",
    tagline: "Command the skies with precision, calm, and technical mastery.",
    match: 68,
    subjects: [
      { name: "Physics", level: "Essential", color: "text-sky-600 bg-sky-50 border-sky-100" },
      { name: "Mathematics", level: "Essential", color: "text-brand-blue bg-blue-50 border-blue-100" },
      { name: "English", level: "Important", color: "text-slate-600 bg-slate-50 border-slate-100" },
    ],
    skills: [
      { name: "Physics — Mechanics & Aerodynamics basics", met: false },
      { name: "Strong at Maths", met: true },
      { name: "Good English communication", met: true },
      { name: "Medical fitness (DGCA Class I)", met: false },
    ],
    activities: [
      { title: "Visit an airport or air show", type: "Experience", icon: Plane },
      { title: "Simulate flight on Microsoft Flight Sim", type: "Activity", icon: Compass },
      { title: "Strengthen Physics fundamentals", type: "Study", icon: BookOpen },
    ],
    path: [
      { step: "Clear Class 12 with PCM", year: "2028", done: false },
      { step: "DGCA Medical Clearance", year: "2028", done: false },
      { step: "CPL Flight Training (18–24 months)", year: "2028–30", done: false },
      { step: "Commercial Pilot License", year: "2030", done: false },
      { step: "Airline Type Rating & First Officer", year: "2030+", done: false },
    ],
    mentorVideos: [
      { title: "Becoming a pilot: What Class 10 students must know", mentor: "Capt. Rohan Mehta", duration: "14 mins" },
    ],
  },
  lawyer: {
    title: "Advocate / Lawyer (LLB → LLM)",
    tagline: "Champion justice, rights, and legal excellence.",
    match: 70,
    subjects: [
      { name: "English", level: "Essential", color: "text-slate-600 bg-slate-50 border-slate-100" },
      { name: "Political Science", level: "Essential", color: "text-purple-600 bg-purple-50 border-purple-100" },
      { name: "History", level: "Important", color: "text-amber-700 bg-amber-50 border-amber-100" },
    ],
    skills: [
      { name: "Clear & persuasive communication", met: true },
      { name: "Reading comprehension & critical thinking", met: true },
      { name: "Legal reasoning & argumentation", met: false },
      { name: "CLAT Exam preparation", met: false },
    ],
    activities: [
      { title: "Join school Moot Court / Mock Trial", type: "Activity", icon: Scale },
      { title: "Read landmark Indian Supreme Court cases", type: "Study", icon: BookOpen },
      { title: "CLAT mock tests", type: "Practice", icon: Target },
    ],
    path: [
      { step: "Build strong English & SS foundation", year: "2026", done: true },
      { step: "Class 11–12 with Humanities", year: "2026–28", done: false },
      { step: "CLAT / AILET Entrance Exam", year: "2028", done: false },
      { step: "LLB Degree (5 years integrated)", year: "2028–33", done: false },
      { step: "Bar Enrollment & Legal Practice", year: "2033+", done: false },
    ],
    mentorVideos: [
      { title: "How to become a lawyer in India", mentor: "Adv. Sanya Kohli", duration: "9 mins" },
    ],
  },
  designer: {
    title: "Graphic / UX Designer",
    tagline: "Create beautiful, meaningful experiences that inspire the world.",
    match: 77,
    subjects: [
      { name: "Art & Design", level: "Essential", color: "text-pink-600 bg-pink-50 border-pink-100" },
      { name: "Mathematics", level: "Useful", color: "text-brand-blue bg-blue-50 border-blue-100" },
      { name: "English", level: "Useful", color: "text-slate-600 bg-slate-50 border-slate-100" },
    ],
    skills: [
      { name: "Sketching & Visual thinking", met: false },
      { name: "Color theory & typography basics", met: false },
      { name: "Figma / Adobe tools", met: false },
      { name: "Creative portfolio building", met: false },
    ],
    activities: [
      { title: "Design a poster for school event", type: "Project", icon: Brush },
      { title: "Complete free Figma crash course", type: "Learning", icon: Zap },
      { title: "Build a personal art portfolio", type: "Portfolio", icon: Star },
    ],
    path: [
      { step: "Develop sketching & drawing habit", year: "2026", done: false },
      { step: "Learn Figma / Canva basics", year: "2026–27", done: false },
      { step: "Enroll in BDes / B.Sc Design", year: "2028", done: false },
      { step: "Build real-world design portfolio", year: "2028–32", done: false },
      { step: "Junior Designer → Senior / Lead UX", year: "2032+", done: false },
    ],
    mentorVideos: [
      { title: "Becoming a UX designer from scratch", mentor: "Priya Desai", duration: "13 mins" },
    ],
  },
};

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
function CareerExplorerPage() {
  const [selected, setSelected] = useState("engineer");

  const details = careerDetails[selected];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
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
        title="Career Explorer"
        subtitle="Discover what it takes to become who you want to be — required subjects, skills, activities, and your personalised roadmap."
      />

      {/* ── "I want to become..." picker ── */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            I want to become a...
          </p>
          <div className="flex flex-wrap gap-2.5">
            {careerOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer",
                    isActive
                      ? `${opt.bg} ${opt.color} ${opt.border} shadow-xs`
                      : "border-slate-100 text-text-muted hover:border-slate-200 hover:bg-slate-50"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? opt.color : "text-slate-400")} />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── Career Detail Panel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="space-y-6"
        >
          {/* Header banner */}
          <div className="rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                  {details.match}% Profile Match
                </span>
              </div>
              <h2 className="font-display text-lg font-bold text-text-heading">{details.title}</h2>
              <p className="text-xs text-text-muted font-semibold mt-0.5">{details.tagline}</p>
            </div>
            <button
              type="button"
              onClick={() => toast.success(`Saving ${details.title} as your career goal!`)}
              className="px-5 py-2.5 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Rocket className="h-4 w-4" /> Set as My Career Goal
            </button>
          </div>

          {/* 3-col details */}
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Left 2 cols */}
            <div className="lg:col-span-2 space-y-5">
              {/* Required Subjects */}
              <GlassCard className="p-5 border border-slate-100 bg-white space-y-3">
                <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-brand-blue" /> Required Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.subjects.map((s, i) => (
                    <span
                      key={i}
                      className={cn("px-3 py-1.5 rounded-xl border text-xs font-bold", s.color)}
                    >
                      {s.name}
                      <span className="ml-1.5 font-semibold opacity-70">— {s.level}</span>
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* Skills to Develop */}
              <GlassCard className="p-5 border border-slate-100 bg-white space-y-3">
                <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-brand-orange" /> Skills to Develop
                </h3>
                <div className="space-y-2">
                  {details.skills.map((s, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-xs font-semibold",
                        s.met ? "border-emerald-100 bg-emerald-50/40" : "border-slate-100 bg-white"
                      )}
                    >
                      {s.met ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-300 shrink-0" />
                      )}
                      <span className={cn("font-semibold", s.met ? "text-text-heading" : "text-text-muted")}>
                        {s.name}
                      </span>
                      {!s.met && (
                        <span className="ml-auto text-[9px] font-bold text-brand-orange bg-orange-50 px-1.5 py-0.5 rounded border border-brand-orange/15">
                          Develop
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Recommended Activities */}
              <GlassCard className="p-5 border border-slate-100 bg-white space-y-3">
                <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-amber-500" /> Recommended Activities
                </h3>
                <div className="space-y-2.5">
                  {details.activities.map((act, i) => {
                    const Icon = act.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-white transition-all"
                      >
                        <div className="h-8 w-8 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-text-heading">{act.title}</p>
                          <p className="text-[9.5px] text-text-muted font-bold">{act.type}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toast.success(`Added "${act.title}" to your planner!`)}
                          className="text-[9.5px] font-bold text-brand-blue border border-brand-blue/20 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          + Add to Planner
                        </button>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Mentor Videos */}
              <GlassCard className="p-5 border border-slate-100 bg-white space-y-3">
                <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Video className="h-4 w-4 text-brand-teal" /> Videos from Mentors
                </h3>
                <div className="space-y-2.5">
                  {details.mentorVideos.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toast.info(`Opening video: ${v.title}`)}
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-brand-teal/30 bg-white text-left transition-all cursor-pointer"
                    >
                      <div className="h-10 w-16 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 border border-brand-teal/10">
                        <Video className="h-4 w-4 text-brand-teal" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-text-heading leading-tight">{v.title}</p>
                        <p className="text-[9.5px] text-text-muted font-bold mt-0.5">
                          {v.mentor} • {v.duration}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right: Roadmap */}
            <div className="space-y-5">
              <GlassCard className="p-5 border border-slate-100 bg-white space-y-4">
                <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-brand-orange" /> Your Roadmap
                </h3>

                <div className="relative pl-5 space-y-5">
                  {/* vertical line */}
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-100" />

                  {details.path.map((step, i) => (
                    <div key={i} className="relative">
                      <div
                        className={cn(
                          "absolute -left-3 top-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center",
                          step.done
                            ? "border-emerald-400 bg-emerald-50"
                            : "border-slate-200 bg-white"
                        )}
                      >
                        {step.done && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                      </div>
                      <p className={cn(
                        "text-xs font-bold leading-snug",
                        step.done ? "text-text-muted" : "text-text-heading"
                      )}>
                        {step.step}
                      </p>
                      <p className="text-[9.5px] text-slate-400 font-bold mt-0.5">{step.year}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Progress toward path */}
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 space-y-3 text-center">
                <Compass className="h-7 w-7 text-brand-orange mx-auto" />
                <p className="text-sm font-black text-text-heading">
                  {details.match}% Ready
                </p>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-orange rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${details.match}%` }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
                <p className="text-[10px] text-text-muted font-semibold">
                  Develop the highlighted skills to increase your career readiness score.
                </p>
                <button
                  type="button"
                  onClick={() => toast.success("Opening skills development plan...")}
                  className="text-[10.5px] font-bold text-brand-orange flex items-center gap-1 mx-auto cursor-pointer hover:underline"
                >
                  View Development Plan <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
