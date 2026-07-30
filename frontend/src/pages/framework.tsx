import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Compass, GitMerge, FileCheck, Award, ArrowRight, LayoutGrid, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "@/shared/ui/glass-card";

export const Route = createFileRoute("/_marketing/framework")({
  component: Framework,
  head: () => ({ meta: [{ title: "ILDF Framework — Vedhkrit" }] }),
});

const frameworkPhases = [
  {
    num: 1,
    stage: "Discover Phase (Grades 8-9)",
    color: "#3b82f6",
    colorBg: "bg-blue-500/10",
    colorText: "text-blue-600",
    colorBorder: "border-blue-200/50",
    icon: ShieldCheck,
    objective: "Find natural strengths and learning styles early.",
    diagnostics: "Cognitive Strengths Map & Learning Style Profile",
    playbook: "Personalized Study Habits Playbook",
    metrics: "Baseline Aptitude Score"
  },
  {
    num: 2,
    stage: "Explore Phase (Grades 9-10)",
    color: "#06b6d4",
    colorBg: "bg-cyan-500/10",
    colorText: "text-cyan-600",
    colorBorder: "border-cyan-200/50",
    icon: Compass,
    objective: "Explore modern career paths and real-world roles.",
    diagnostics: "Career Interest Assessment",
    playbook: "Career Pathway Exploration Guide",
    metrics: "Career Match Affinity Score"
  },
  {
    num: 3,
    stage: "Align Phase (Grades 10-11)",
    color: "#10b981",
    colorBg: "bg-emerald-500/10",
    colorText: "text-emerald-600",
    colorBorder: "border-emerald-200/50",
    icon: GitMerge,
    objective: "Confidently select academic streams and subjects.",
    diagnostics: "Class 10 Stream Selection Diagnostic",
    playbook: "Stream Selection & Board Alignment Blueprint",
    metrics: "Subject Match Index"
  },
  {
    num: 4,
    stage: "Prepare Phase (Grades 11-12)",
    color: "#84cc16",
    colorBg: "bg-lime-500/10",
    colorText: "text-lime-600",
    colorBorder: "border-lime-200/50",
    icon: FileCheck,
    objective: "Build skills, practical projects, and active portfolios.",
    diagnostics: "21st Century Skills Assessment",
    playbook: "Hands-on Project & Profile Builder Guide",
    metrics: "Portfolio Strength Score"
  },
  {
    num: 5,
    stage: "Launch Phase (Grade 12)",
    color: "#f59e0b",
    colorBg: "bg-amber-500/10",
    colorText: "text-amber-600",
    colorBorder: "border-amber-200/50",
    icon: Award,
    objective: "Prepare for board exams and university entrance.",
    diagnostics: "University Readiness Review",
    playbook: "College Admissions & Entrance Prep Tracker",
    metrics: "College Application Readiness Score"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

function Framework() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20 relative overflow-hidden text-left">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="framework-bg-1" cx="80%" cy="10%" r="50%" fx="80%" fy="10%">
              <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="framework-bg-2" cx="20%" cy="80%" r="40%" fx="20%" fy="80%">
              <stop offset="0%" stopColor="var(--color-brand-teal)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#framework-bg-1)" />
          <rect width="100%" height="100%" fill="url(#framework-bg-2)" />
        </svg>
      </div>
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'linear-gradient(var(--color-border-default) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-default) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col items-center">
          
          {/* Header Hero */}
          <motion.div variants={itemVariants} className="max-w-3xl text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-xs font-bold text-brand-teal uppercase tracking-widest mb-6">
              <LayoutGrid className="h-4 w-4" /> Integrated Framework
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-heading leading-tight tracking-tight">
              The 5-Phase ILDF <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">Blueprint.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-text-muted max-w-2xl mx-auto">
              A structured, step-by-step roadmap tailored for students in Grades 8 to 12. We guide you from early strength discovery to stream selection, profile building, and college readiness.
            </p>
          </motion.div>

          {/* Sequential Phases */}
          <div className="max-w-4xl mx-auto w-full relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-brand-blue/30 via-brand-teal/30 to-brand-blue/30 hidden sm:block"></div>
            
            <motion.div variants={containerVariants} className="space-y-8">
              {frameworkPhases.map((phase, idx) => (
                <motion.div key={phase.num} id={`phase-${phase.num}`} variants={itemVariants} className="relative sm:pl-20">
                  {/* Step Number Badge */}
                  <div className="absolute left-0 top-6 w-16 h-16 rounded-2xl bg-white border-2 shadow-sm flex items-center justify-center font-black text-2xl z-10 hidden sm:flex" style={{ borderColor: phase.color, color: phase.color }}>
                    0{phase.num}
                  </div>
                  
                  <GlassCard className={`overflow-hidden border-l-4 p-0`} style={{ borderLeftColor: phase.color }}>
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-4 sm:hidden mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white border-2 flex items-center justify-center font-black text-xl" style={{ borderColor: phase.color, color: phase.color }}>
                          {phase.num}
                        </div>
                        <h3 className="text-xl font-bold text-text-heading mt-2">{phase.stage}</h3>
                      </div>
                      
                      <div className="hidden sm:flex items-center gap-3 mb-6">
                        <div className={`p-2 rounded-xl ${phase.colorBg}`}>
                          <phase.icon className={`h-6 w-6 ${phase.colorText}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-text-heading">{phase.stage}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Core Objective</div>
                            <p className="text-sm font-semibold text-text-heading">{phase.objective}</p>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Key Diagnostic</div>
                            <p className="text-sm text-text-muted leading-relaxed">{phase.diagnostics}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Execution Playbook</div>
                            <p className="text-sm text-text-muted leading-relaxed">{phase.playbook}</p>
                          </div>
                          <div className={`p-4 rounded-xl ${phase.colorBg} border ${phase.colorBorder}`}>
                            <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: phase.color }}>Success Metric</div>
                            <div className="font-bold text-sm" style={{ color: phase.color }}>{phase.metrics}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="mt-20 w-full max-w-4xl mx-auto text-center">
            <GlassCard className="bg-gradient-to-r from-brand-blue/10 to-brand-teal/10 p-10">
              <h2 className="text-2xl font-black text-text-heading mb-3">Ready to start your structured roadmap?</h2>
              <p className="text-text-muted mb-8 text-sm">Empower your high school journey with customized insights and expert mentorship.</p>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl gradient-brand px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Partner With Us <ArrowRight className="h-4 w-4" />
              </Link>
            </GlassCard>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

export default Framework;

