import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Brain, Sparkles, Target, Cpu, Award, Compass, Download } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/growth")({
  component: ParentGrowthPage,
  head: () => ({ meta: [{ title: "Child's Growth & Skills — Parent Portal" }] }),
});

// Read-only mirror of the child's growth profile, skills, career direction and achievements.
const learningProfile = [
  { icon: Brain, label: "Learning Style", value: "Visual Learner", color: "text-purple-600 bg-purple-50 border-purple-200" },
  { icon: Sparkles, label: "Top Strength", value: "Logical Thinking", color: "text-brand-teal bg-teal-50 border-teal-200" },
  { icon: Target, label: "Growth Area", value: "Public Speaking", color: "text-brand-orange bg-orange-50 border-orange-200" },
  { icon: Cpu, label: "Career Interest", value: "AI & Technology", color: "text-brand-blue bg-blue-50 border-blue-200" },
];

const skills = [
  { name: "Critical Thinking", score: 88 },
  { name: "Communication", score: 74 },
  { name: "Collaboration", score: 81 },
  { name: "Creativity", score: 85 },
  { name: "Leadership", score: 68 },
  { name: "Digital Literacy", score: 79 },
];

const achievements = [
  { name: "Logical Reasoning Master Badge", date: "May 2026" },
  { name: "National Cyber Olympiad Rank Certificate", date: "Apr 2026" },
  { name: "Consistent Homework Streak Award", date: "Mar 2026" },
];

function ParentGrowthPage() {
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 text-left">
      <PageHeader title="Child's Growth & Skills" subtitle="A clear picture of how Yash learns, the skills he's building, and where he's headed." />

      {/* Learning profile */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {learningProfile.map((p, i) => (
          <motion.div key={i} variants={itemVariants}>
            <GlassCard className={`p-5 border bg-white h-full ${p.color.split(" ").slice(2).join(" ")}`}>
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${p.color.split(" ").slice(0, 2).join(" ")}`}>
                <p.icon className="h-4.5 w-4.5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mt-3">{p.label}</span>
              <span className="font-bold text-sm text-text-heading block mt-0.5">{p.value}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skills */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-slate-100 bg-white h-full">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-2">
              <Target className="h-4.5 w-4.5 text-brand-blue" /> Skills Being Built
            </h3>
            <div className="space-y-3.5">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-[11px] font-bold text-text-body mb-1">
                    <span>{s.name}</span>
                    <span className="text-text-heading">{s.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-brand-blue" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Achievements + career */}
        <motion.div variants={itemVariants} className="space-y-6">
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-2">
              <Award className="h-4.5 w-4.5 text-purple-600" /> Achievements Earned
            </h3>
            <div className="space-y-2.5">
              {achievements.map((a) => (
                <div key={a.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs">
                  <div className="min-w-0">
                    <h4 className="font-bold text-text-heading truncate">{a.name}</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">{a.date}</p>
                  </div>
                  <Download className="h-4 w-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5 border border-brand-blue/15 bg-blue-50/30">
            <h3 className="font-display text-sm font-bold text-text-heading mb-2 flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-brand-blue" /> Career Direction
            </h3>
            <p className="text-xs text-text-body leading-relaxed">
              Yash is exploring the <span className="font-bold text-brand-blue">Engineer</span> pathway (AI & Technology). His mentor recommends robotics activities and monthly coding puzzles to build on his strong logical thinking.
            </p>
            <Link
              to="/dashboard/parent/mentor"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:underline"
            >
              Read mentor's notes →
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
