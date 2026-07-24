import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Cpu, Sparkles, Target, Award, LineChart, Shield, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "@/shared/ui/glass-card";

export const Route = createFileRoute("/_marketing/assessment")({
  component: Assessment,
  head: () => ({ meta: [{ title: "AI Discovery — Vedhkrit" }] }),
});

const assessmentPillars = [
  {
    icon: Brain,
    type: "Aptitude & Logic",
    name: "Strengths Profile",
    duration: "30 Mins",
    format: "Aptitude Games",
    gradient: "from-brand-blue to-indigo-500",
    textCol: "text-brand-blue",
    features: [
      "Logical & Verbal Reasoning",
      "Numerical & Coding Aptitude",
      "Spatial & Abstract Thinking",
      "Fun, game-like puzzles"
    ],
    outcome: "Detailed Cognitive Map"
  },
  {
    icon: Sparkles,
    type: "Study Habits & EQ",
    name: "Focus & Resilience Profile",
    duration: "20 Mins",
    format: "Situational Choice",
    gradient: "from-brand-teal to-emerald-500",
    textCol: "text-brand-teal",
    features: [
      "Social-Emotional skills (SEL)",
      "Exam stress resilience",
      "Collaboration & team habits",
      "Goal setting & self-study style"
    ],
    outcome: "Confidence & EQ Summary"
  },
  {
    icon: Target,
    type: "Learning Styles",
    name: "Study Hacks Detector",
    duration: "15 Mins",
    format: "Interactive VAK Map",
    gradient: "from-brand-orange to-amber-500",
    textCol: "text-brand-orange",
    features: [
      "Visual vs Auditory learning",
      "Hands-on memory triggers",
      "Perfect study environment setup",
      "Actionable study hacks"
    ],
    outcome: "Custom Study Guide"
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

function Assessment() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20 relative overflow-hidden text-left">
      {/* Background Vectors */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="assess-bg-1" cx="20%" cy="20%" r="40%" fx="20%" fy="20%">
              <stop offset="0%" stopColor="var(--color-brand-teal)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="assess-bg-2" cx="80%" cy="80%" r="50%" fx="80%" fy="80%">
              <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#assess-bg-1)" />
          <rect width="100%" height="100%" fill="url(#assess-bg-2)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col items-center">
          
          {/* Header Hero */}
          <motion.div variants={itemVariants} className="max-w-3xl text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold text-brand-orange uppercase tracking-widest mb-6">
              <Cpu className="h-4 w-4" /> AI Discovery Engine
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-heading leading-tight tracking-tight">
              Precision Diagnostics. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">Actionable Data.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-text-muted max-w-2xl mx-auto">
              Move beyond stressful, boring career tests. Discover your natural talents, focus style, and study strengths with our engaging, bite-sized assessments designed for Grades 8–12.
            </p>
          </motion.div>

          {/* Pillars Grid */}
          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6 mb-20 w-full">
            {assessmentPillars.map((pillar) => (
              <motion.div key={pillar.name} variants={itemVariants} className="flex">
                <GlassCard className="w-full p-0 flex flex-col overflow-hidden group">
                  <div className={`h-2 w-full bg-gradient-to-r ${pillar.gradient}`}></div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl bg-slate-50 border border-border-default shadow-sm ${pillar.textCol}`}>
                        <pillar.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{pillar.type}</div>
                        <h3 className="font-bold text-text-heading text-lg leading-tight">{pillar.name}</h3>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-semibold text-text-muted mb-6 bg-slate-50 p-2.5 rounded-xl border border-border-default">
                      <div className="flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 opacity-60" /> {pillar.duration}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                      <div className="flex items-center gap-1.5">
                        <LineChart className="h-3.5 w-3.5 opacity-60" /> {pillar.format}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {pillar.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-text-muted">
                          <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${pillar.textCol}`} />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-border-default mt-auto">
                      <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Generated Output</div>
                      <div className={`text-sm font-bold ${pillar.textCol}`}>{pillar.outcome}</div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Engine Architecture Callout */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="rounded-3xl bg-gradient-to-br from-brand-navy to-indigo-950 p-8 sm:p-12 text-center text-white border-0 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
              <Shield className="h-12 w-12 text-brand-teal mx-auto mb-6 opacity-80 relative z-10" />
              <h2 className="text-3xl font-black mb-4 relative z-10">Adaptive & Stress-Free</h2>
              <p className="text-white/70 max-w-2xl mx-auto text-sm leading-relaxed mb-8 relative z-10">
                Our smart diagnostic engine dynamically adjusts difficulty to match your pace. No timers, no exam-hall stress—just clear insights to help you learn better and build your profile.
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-white text-brand-navy px-6 py-3 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all relative z-10">
                Request School Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

export default Page;
