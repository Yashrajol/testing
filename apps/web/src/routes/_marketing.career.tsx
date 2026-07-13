import { createFileRoute, Link } from "@tanstack/react-router";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { Compass, Sparkles, BookOpen, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { GlassCard } from "@/components/glass-card";

export const Route = createFileRoute("/_marketing/career")({
  component: Career,
  head: () => ({ meta: [{ title: "Career Blueprint — Vedhkrit" }] }),
});

const sampleChartData = [
  { career: "AI Engineer", match: 88 },
  { career: "Space Scientist", match: 81 },
  { career: "UX Designer", match: 76 },
  { career: "Climate Innovator", match: 74 },
  { career: "BioTech Analyst", match: 69 },
  { career: "FinTech Founder", match: 65 }
];

const blueprintPaths = [
  {
    role: "AI & Machine Learning Engineer",
    traits: "Logic, Abstract Reasoning, Clerical Speed",
    subjectPath: "Maths, Computer Science, Statistics",
    colleges: "IITs, IIITs, BITS, IISc Bangalore",
    outcome: "94% High Demand"
  },
  {
    role: "UX Researcher & Product Architect",
    traits: "Spatial, Verbal Ability, Empathy Index",
    subjectPath: "Design, Psychology, Media Studies",
    colleges: "NID, IIT Design Docks, Srishti Institute",
    outcome: "86% High Growth"
  },
  {
    role: "Climate Tech & Green Innovator",
    traits: "Critical Thinking, Systems Analysis, SEL",
    subjectPath: "Chemistry, Environmental Science, Economics",
    colleges: "IISER, Ashoka University, TISS",
    outcome: "91% Emerging Sector"
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

function Career() {
  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20 relative overflow-hidden text-left">
      {/* Background Vectors */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="career-bg-1" cx="80%" cy="20%" r="50%" fx="80%" fy="20%">
              <stop offset="0%" stopColor="var(--color-brand-orange)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="career-bg-2" cx="20%" cy="80%" r="40%" fx="20%" fy="80%">
              <stop offset="0%" stopColor="var(--color-brand-blue)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#career-bg-1)" />
          <rect width="100%" height="100%" fill="url(#career-bg-2)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col items-center">
          
          {/* Header Hero */}
          <motion.div variants={itemVariants} className="max-w-3xl text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold text-brand-orange uppercase tracking-widest mb-6">
              <Compass className="h-4 w-4" /> Career Architecture & Strategy
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-text-heading leading-tight tracking-tight">
              From Aptitude Match to <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">College Admissions.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-text-muted max-w-2xl mx-auto">
              Our career mapping does not stop at generic suggestions. We synthesize data to architect a multi-year blueprint connecting subjects, university paths, and ultimate real-world roles.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 w-full mb-20 items-center">
            {/* Visual Match Graph */}
            <motion.div variants={itemVariants} className="w-full">
              <GlassCard className="w-full p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="font-bold text-text-heading text-lg">Aptitude Match Matrix</h3>
                    <p className="text-xs text-text-muted">Simulated projection for Student Profile #V829</p>
                  </div>
                  <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
                
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sampleChartData} layout="vertical" margin={{ top: 0, right: 20, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" hide domain={[0, 100]} />
                      <YAxis dataKey="career" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                      <Tooltip 
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 600 }}
                      />
                      <Bar dataKey="match" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={16}>
                        {
                          sampleChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index < 3 ? '#3b82f6' : '#94a3b8'} />
                          ))
                        }
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>

            {/* Explanation text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-text-heading leading-tight">Eliminate Guesswork in Stream Selection</h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Our dynamic projection model runs thousands of permutations matching a student's cognitive and behavioral baseline against 400+ modern career paths.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-brand-teal/10 text-brand-teal">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-heading">Precision Subject Alignment</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">Map exact combinations (e.g. PCM vs Humanities) critical for targeted university admissions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 rounded-full bg-brand-blue/10 text-brand-blue">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-heading">Macro-trend Indexing</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">Roles are weighted against 10-year market growth forecasts, preventing focus on obsolete sectors.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Blueprint Cards */}
          <motion.div variants={itemVariants} className="w-full mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-center text-text-heading mb-10">Sample Architectural Blueprints</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {blueprintPaths.map((bp, idx) => (
                <GlassCard key={idx} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <div className="p-6 sm:p-8 flex-1">
                    <div className="inline-flex px-2 py-1 rounded-md bg-slate-100 border border-border-default text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4">
                      Blueprint #{100 + idx}
                    </div>
                    <h3 className="font-black text-text-heading text-lg leading-tight mb-6">{bp.role}</h3>
                    
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-1.5">
                          <Sparkles className="h-3.5 w-3.5" /> Innate Drivers
                        </div>
                        <p className="text-xs font-semibold text-text-heading">{bp.traits}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-1.5">
                          <BookOpen className="h-3.5 w-3.5" /> Academic Vector
                        </div>
                        <p className="text-xs text-text-muted">{bp.subjectPath}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-orange uppercase tracking-widest mb-1.5">
                          <GraduationCap className="h-3.5 w-3.5" /> Target Incubators
                        </div>
                        <p className="text-xs text-text-muted">{bp.colleges}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 border-t border-border-default text-center">
                    <span className="text-xs font-bold text-brand-blue">{bp.outcome}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
