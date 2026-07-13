import { createFileRoute } from "@tanstack/react-router";
import { Target, Heart, Globe, ShieldCheck, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "@/components/glass-card";

export const Route = createFileRoute("/_marketing/about")({
  component: About,
  head: () => ({ meta: [{ title: "About Us — Vedhkrit" }, { name: "description", content: "Our mission to bring purposeful learning to every child." }] }),
});

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Empower 10 million learners in India to discover their innate capabilities, identify future career pathways, and cultivate core competencies by 2030."
  },
  {
    icon: Heart,
    title: "Core Values",
    desc: "Empathy-driven coaching, rigorous psychometric evidence, and parity of learning resources for every student regardless of background."
  },
  {
    icon: Globe,
    title: "Established Reach",
    desc: "Currently partnering with 20+ premier progressive schools across 8 major cities, with a clear trajectory to support 200+ schools by 2027."
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

function About() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20 relative overflow-hidden text-left">
      {/* Background Vectors */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="about-bg-1" cx="20%" cy="10%" r="40%" fx="20%" fy="10%">
              <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="about-bg-2" cx="80%" cy="80%" r="50%" fx="80%" fy="80%">
              <stop offset="0%" stopColor="var(--color-brand-teal)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-bg-1)" />
          <rect width="100%" height="100%" fill="url(#about-bg-2)" />
        </svg>
      </div>
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(var(--color-brand-navy) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Header Hero */}
          <motion.div variants={itemVariants} className="max-w-3xl text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-bold text-brand-blue uppercase tracking-widest mb-6">
              <Users className="h-4 w-4" /> Learner Development Mission
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-heading leading-tight tracking-tight">
              Education with Intent. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">For Every Learner.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-text-muted max-w-2xl mx-auto">
              Vedhkrit was founded to solve a critical challenge: transitioning secondary school students from passive testing to purposeful, active future readiness.
            </p>
          </motion.div>

          {/* Core Values Cards */}
          <motion.div variants={containerVariants} className="grid gap-6 sm:grid-cols-3 mb-20 w-full">
            {values.map((v) => (
              <motion.div key={v.title} variants={itemVariants}>
                <GlassCard className="h-full p-8 text-left hover:-translate-y-1 transition-transform duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal shadow-inner mb-6">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-text-heading mb-3">{v.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{v.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Origin Story */}
          <motion.div variants={itemVariants} className="w-full">
            <GlassCard className="overflow-hidden border-0 bg-gradient-to-br from-brand-blue to-indigo-900">
              <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12 items-center">
                <div className="md:col-span-3">
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Our Origin Story</h2>
                  <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                    <p>
                      The seed for Vedhkrit was planted when educators observed a recurring pattern: high-achieving students excelling in standardized exams but struggling with unstructured problem-solving and career mapping.
                    </p>
                    <p>
                      We realized that traditional schooling optimizing for memory retention left a vacuum for practical aptitude discovery. Vedhkrit was established to bridge this gap, serving as an institutional partner to deploy psychometric analytics and physical labs directly into schools.
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="h-5 w-5 text-brand-teal" />
                      <span className="font-bold text-white text-sm">Data Privacy</span>
                    </div>
                    <p className="text-xs text-white/70 leading-normal">
                      Strict compliance with data governance. No student profiles are shared with third-party advertisers.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-brand-orange" />
                      <span className="font-bold text-white text-sm">Actionable Insights</span>
                    </div>
                    <p className="text-xs text-white/70 leading-normal">
                      We don't just assess; we build pathways. Every diagnostic leads to a physical engagement or mentoring session.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
        </motion.div>
      </div>
    </div>
  );
}
