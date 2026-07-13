import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Brain, Code, Network, Target, Award, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/student/skills")({
  component: SkillsPage,
  head: () => ({ meta: [{ title: "Skill Mapping — Vedhkrit" }] }),
});

const hardSkills = [
  { name: "Python Programming", level: 85, color: "gradient-brand" },
  { name: "Data Analysis", level: 70, color: "bg-brand-blue" },
  { name: "Web Development", level: 60, color: "bg-brand-teal" },
  { name: "Advanced Mathematics", level: 90, color: "bg-brand-orange" },
];

const softSkills = [
  { name: "Problem Solving", level: 95, color: "gradient-brand" },
  { name: "Communication", level: 75, color: "bg-brand-orange" },
  { name: "Team Collaboration", level: 85, color: "bg-brand-blue" },
  { name: "Critical Thinking", level: 88, color: "bg-brand-teal" },
];

const badges = [
  { name: "Analytical Thinker", date: "Awarded Oct 2026", icon: Brain, color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20" },
  { name: "Code Ninja", date: "Awarded Sep 2026", icon: Code, color: "text-brand-teal bg-brand-teal/10 border-brand-teal/20" },
  { name: "Top Collaborator", date: "Awarded Aug 2026", icon: Network, color: "text-brand-orange bg-brand-orange/10 border-brand-orange/20" },
];

function SkillsPage() {
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
      <PageHeader title="Skill Mapping" subtitle="Visualize your proficiency across technical and interpersonal skills." />
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hard Skills */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-blue/10 rounded-xl text-brand-blue">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-text-heading">Technical Skills</h3>
            </div>
            <div className="space-y-5">
              {hardSkills.map((skill, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-text-heading">{skill.name}</span>
                    <span className="text-brand-blue">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-100 border border-border-default/30 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full ${skill.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Soft Skills */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-teal/10 rounded-xl text-brand-teal">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-text-heading">Interpersonal Skills</h3>
            </div>
            <div className="space-y-5">
              {softSkills.map((skill, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-text-heading">{skill.name}</span>
                    <span className="text-brand-blue">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-100 border border-border-default/30 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full ${skill.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Badges & Achievements */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-brand-orange" />
              Recently Acquired Badges
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {badges.map((badge, i) => (
                <div key={i} className="border border-border-default rounded-xl p-4 flex flex-col items-center text-center hover:bg-bg-secondary/30 transition-all">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-3 border ${badge.color}`}>
                    <badge.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-xs text-text-heading leading-tight">{badge.name}</h4>
                  <p className="text-[9px] text-text-muted mt-1 uppercase tracking-wider font-bold">{badge.date}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Suggested Next Skill */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full flex flex-col justify-center text-center bg-linear-to-br from-brand-navy to-brand-blue border-none text-white shadow-xl shadow-brand-blue/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Target className="h-24 w-24" />
             </div>
             <div className="relative z-10 py-2">
               <div className="mx-auto h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center mb-3.5 backdrop-blur-md">
                 <Lightbulb className="h-5 w-5 text-white" />
               </div>
               <h3 className="text-base font-bold">Suggested Focus</h3>
               <p className="text-xs text-blue-100 mt-2 leading-relaxed">Based on your goals, focus on improving your <strong className="text-white">Public Speaking</strong> skills next.</p>
               <button className="mt-5 px-4 py-2 bg-white text-brand-blue rounded-xl text-xs font-bold shadow-md hover:bg-slate-50 transition-colors cursor-pointer">
                 Start Learning Path
               </button>
             </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
