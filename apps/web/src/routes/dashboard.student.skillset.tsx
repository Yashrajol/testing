import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import {
  Puzzle,
  Brain,
  MessageCircle,
  Users,
  Lightbulb,
  Laptop,
  HeartHandshake,
  Clock,
  Compass,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  AlertCircle
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { cn } from "@/shared/utils/utils";
import { useAuth } from "@/app/providers/auth-context";
import { useCompetencyProfile } from "@/features/learning-dna/queries/useLearningDna";

export const Route = createFileRoute("/dashboard/student/skillset")({
  component: SkillsPage,
  head: () => ({ meta: [{ title: "Skills — Vedhkrit" }] }),
});

interface SkillEntry {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  score: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  color: string;
  description: string;
  subSkills: string[];
  resources: { title: string; type: string }[];
}

function SkillsPage() {
  const { user } = useAuth();
  const studentId = user?.id || 'student-123';
  const { data: compProfile, isLoading, isError, refetch } = useCompetencyProfile(studentId);

  const [activeSkill, setActiveSkill] = useState<SkillEntry | null>(null);

  const skillEntries = useMemo(() => {
    if (!compProfile) return [];

    const levelFor = (score: number): SkillEntry["level"] => {
      if (score >= 85) return "Expert";
      if (score >= 70) return "Advanced";
      if (score >= 50) return "Intermediate";
      return "Beginner";
    };

    return [
      {
        id: "critical-thinking",
        name: "Critical Thinking",
        category: "Academic & Thinking",
        icon: Brain,
        score: compProfile.criticalThinking ?? 88,
        level: levelFor(compProfile.criticalThinking ?? 88),
        color: "text-brand-blue bg-blue-50 border-brand-blue/15",
        description: "Looking at problems step by step, asking good questions, and reaching smart answers.",
        subSkills: ["Logical thinking", "Spotting patterns", "Finding the real cause"],
        resources: [
          { title: "Puzzle-based reasoning drills (Vedhkrit Lab)", type: "Practice" },
          { title: "Case Study: Solving Real-world Word Problems", type: "Video" },
        ],
      },
      {
        id: "communication",
        name: "Communication",
        category: "People Skills",
        icon: MessageCircle,
        score: compProfile.communication ?? 74,
        level: levelFor(compProfile.communication ?? 74),
        color: "text-brand-teal bg-teal-50 border-brand-teal/15",
        description: "Speaking and writing clearly, listening carefully, and presenting with confidence.",
        subSkills: ["Public speaking", "Clear writing", "Good listening"],
        resources: [
          { title: "Weekly School Debate Prep Circle", type: "Activity" },
          { title: "Voice Modulation & Pacing Workshop", type: "Video" },
        ],
      },
      {
        id: "collaboration",
        name: "Collaboration",
        category: "People Skills",
        icon: Users,
        score: (compProfile as any).collaboration ?? 81,
        level: levelFor((compProfile as any).collaboration ?? 81),
        color: "text-purple-600 bg-purple-55 border-purple-500/15",
        description: "Working well in a team, sharing credit, and sorting out disagreements calmly.",
        subSkills: ["Team work", "Sorting out fights", "Helping friends improve"],
        resources: [
          { title: "Group Robotics Exhibition Project", type: "Activity" },
          { title: "Giving & Receiving Feedback", type: "Video" },
        ],
      },
      {
        id: "creativity",
        name: "Creativity & Innovation",
        category: "Thinking",
        icon: Lightbulb,
        score: compProfile.creativity ?? 85,
        level: levelFor(compProfile.creativity ?? 85),
        color: "text-brand-orange bg-orange-50 border-brand-orange/15",
        description: "Coming up with fresh ideas and finding new ways to solve problems.",
        subSkills: ["New ideas", "Design thinking", "Storytelling"],
        resources: [
          { title: "Monthly Coding Puzzle Challenge", type: "Practice" },
          { title: "Design Thinking for Young Innovators", type: "Video" },
        ],
      },
      {
        id: "leadership",
        name: "Leadership",
        category: "People Skills",
        icon: Compass,
        score: compProfile.leadership ?? 68,
        level: levelFor(compProfile.leadership ?? 68),
        color: "text-emerald-600 bg-emerald-50 border-emerald-500/15",
        description: "Taking the lead, motivating friends, and taking responsibility for team work.",
        subSkills: ["Sharing out tasks", "Making decisions", "Guiding friends"],
        resources: [
          { title: "Student Council Shadowing Program", type: "Activity" },
          { title: "Leading Without a Title", type: "Video" },
        ],
      },
      {
        id: "digital-literacy",
        name: "Digital Literacy",
        category: "Tech",
        icon: Laptop,
        score: (compProfile as any).digitalLiteracy ?? 79,
        level: levelFor((compProfile as any).digitalLiteracy ?? 79),
        color: "text-brand-blue bg-blue-50 border-brand-blue/15",
        description: "Being comfortable with digital tools, staying safe online, and thinking like a coder.",
        subSkills: ["Coding logic", "Searching online", "Staying safe online"],
        resources: [
          { title: "Python Loop Controls Practice", type: "Practice" },
          { title: "Intro to Computational Thinking", type: "Video" },
        ],
      },
      {
        id: "emotional-intelligence",
        name: "Emotional Intelligence",
        category: "Wellbeing",
        icon: HeartHandshake,
        score: (compProfile as any).emotionalIntelligence ?? 71,
        level: levelFor((compProfile as any).emotionalIntelligence ?? 71),
        color: "text-rose-600 bg-rose-50 border-rose-500/15",
        description: "Understanding your own feelings and caring about how other people feel.",
        subSkills: ["Managing feelings", "Caring for others", "Handling stress"],
        resources: [
          { title: "Wellbeing Check-in Circle", type: "Activity" },
          { title: "Managing Exam Anxiety", type: "Video" },
        ],
      },
      {
        id: "time-management",
        name: "Time Management",
        category: "Academic & Thinking",
        icon: Clock,
        score: (compProfile as any).timeManagement ?? 66,
        level: levelFor((compProfile as any).timeManagement ?? 66),
        color: "text-slate-600 bg-slate-100 border-slate-300",
        description: "Planning your study time, doing important tasks first, and not leaving things to the last minute.",
        subSkills: ["First things first", "Planning ahead", "Staying focused"],
        resources: [
          { title: "Daily Planner Workspace", type: "Activity" },
          { title: "Pomodoro Technique Explained", type: "Video" },
        ],
      }
    ];
  }, [compProfile]);

  const overallScore = useMemo(() => {
    if (skillEntries.length === 0) return 0;
    return Math.round(skillEntries.reduce((sum, s) => sum + s.score, 0) / skillEntries.length);
  }, [skillEntries]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Skills" subtitle="Loading your core competencies..." />
        <GlassCard className="p-5 border border-slate-100 bg-white h-20 animate-pulse">
          <div />
        </GlassCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <GlassCard key={n} className="p-5 border bg-white h-48 animate-pulse">
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
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load skills</h3>
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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 text-left">
      <PageHeader
        title="Skills"
        subtitle="A look at your main school and life skills — tap any card to learn more."
      />

      {/* Summary strip */}
      <GlassCard className="p-5 border border-slate-100 bg-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
            <Puzzle className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Overall Skill Score</span>
            <span className="font-display text-2xl font-black text-text-heading">{overallScore}<span className="text-sm font-semibold text-text-muted">/100</span></span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Academic & Thinking", "People Skills", "Tech", "Wellbeing"].map((cat) => (
            <span key={cat} className="text-[9.5px] font-bold text-text-muted bg-slate-50 border border-slate-100 rounded-full px-3 py-1">{cat}</span>
          ))}
        </div>
      </GlassCard>

      {/* Skill cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillEntries.map((skill) => (
          <motion.button
            key={skill.id}
            variants={itemVariants}
            onClick={() => setActiveSkill(skill)}
            className="text-left cursor-pointer"
            type="button"
          >
            <GlassCard className={cn("p-5 border bg-white h-full flex flex-col justify-between hover:shadow-md transition-shadow", skill.color.split(" ").slice(2).join(" "))}>
              <div className="flex items-start justify-between gap-3">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", skill.color.split(" ").slice(0, 2).join(" "))}>
                  <skill.icon className="h-5 w-5" />
                </div>
                <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5 shrink-0">
                  {skill.level}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="font-bold text-sm text-text-heading leading-tight">{skill.name}</h4>
                <p className="text-[9.5px] text-text-muted mt-0.5">{skill.category}</p>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[9.5px] font-bold text-text-muted mb-1">
                  <span>Proficiency</span>
                  <span className="text-text-heading">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", skill.color.split(" ")[0].replace("text-", "bg-"))} style={{ width: `${skill.score}%` }} />
                </div>
              </div>
            </GlassCard>
          </motion.button>
        ))}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!activeSkill} onOpenChange={(open) => !open && setActiveSkill(null)}>
        <DialogContent className="max-w-lg text-left">
          {activeSkill && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={cn("h-11 w-11 rounded-2xl flex items-center justify-center shrink-0", activeSkill.color.split(" ").slice(0, 2).join(" "))}>
                    <activeSkill.icon className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <DialogTitle>{activeSkill.name}</DialogTitle>
                    <DialogDescription>{activeSkill.category} • {activeSkill.level} ({activeSkill.score}%)</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <p className="text-xs text-text-body leading-relaxed">{activeSkill.description}</p>

              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Sub-skills</h5>
                <div className="flex flex-wrap gap-2">
                  {activeSkill.subSkills.map((s) => (
                    <span key={s} className="text-[10.5px] font-semibold text-text-body bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Recommended Resources</h5>
                <div className="space-y-2">
                  {activeSkill.resources.map((r) => (
                    <div key={r.title} className="flex items-center gap-2.5 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold text-text-body">
                      {r.type === "Video" ? <PlayCircle className="h-4 w-4 text-brand-blue shrink-0" /> : <BookOpen className="h-4 w-4 text-brand-teal shrink-0" />}
                      <span className="flex-1">{r.title}</span>
                      <span className="text-[8.5px] font-bold uppercase tracking-wider text-slate-400">{r.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
