import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Sparkles, BookOpen, Clock, Heart, Award } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/recommendations")({
  component: ParentRecommendationsPage,
  head: () => ({ meta: [{ title: "Recommendations — Parent Portal" }] }),
});

const recommendations = [
  {
    category: "Academic & Streams",
    icon: BookOpen,
    color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
    title: "Stream Compatibility Check-in",
    desc: "Aarav is excelling in mathematical and computational logic (top 5% of class). We recommendPCM with Computer Science for Grade 11. Encourage him to check the Elective alignment sheet.",
    action: "Review Stream Options"
  },
  {
    category: "Skill Development",
    icon: Sparkles,
    color: "text-brand-teal bg-brand-teal/10 border-brand-teal/20",
    title: "VAK-aligned Study Techniques",
    desc: "Aarav is classified as a Visual Learner. Utilizing mind-mapping tools (such as Miro or physical whiteboard summaries) during science studies will improve retrieval by up to 25%.",
    action: "Try Mind-Mapping Guide"
  },
  {
    category: "Wellbeing & Routine",
    icon: Heart,
    color: "text-brand-orange bg-brand-orange/10 border-brand-orange/20",
    title: "Evening Device Curfew",
    desc: "To counter mild exam stress and optimize deep sleep cycles, maintain a 60-minute evening screen cap on entertainment displays before bedtime.",
    action: "View Routine Blueprint"
  },
  {
    category: "Co-Curricular Exploration",
    icon: Award,
    color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
    title: "Coding Olympiad Track",
    desc: "Suggested participation in the upcoming Inter-School Coding Hackathon (Junior category) in April to cultivate team execution and creative project design.",
    action: "Enroll in Competition"
  }
];

function ParentRecommendationsPage() {
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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <PageHeader title="Recommendations" subtitle="Personalized home activities and alignment guidelines for Aarav." />

      <div className="grid gap-6 sm:grid-cols-2">
        {recommendations.map((rec, i) => (
          <motion.div key={i} variants={itemVariants}>
            <GlassCard className="p-5 border border-border-default/50 bg-white/60 h-full flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center justify-between border-b border-border-default/40 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    {rec.category}
                  </span>
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center border ${rec.color}`}>
                    <rec.icon className="h-4.5 w-4.5" />
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-display text-sm font-bold text-text-heading leading-tight">{rec.title}</h4>
                  <p className="mt-2 text-xs text-text-body leading-relaxed">{rec.desc}</p>
                </div>
              </div>

              <button className="mt-5 w-full text-center rounded-xl border border-border-default bg-white/70 py-2.5 text-xs font-bold text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
                {rec.action}
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
