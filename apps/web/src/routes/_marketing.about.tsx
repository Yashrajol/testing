import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Target, Heart, Globe, ShieldCheck, Zap, Users, Sparkles,
  Compass, ArrowRight, Rocket
} from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/_marketing/about")({
  component: About,
  head: () => ({ meta: [{ title: "About Us — Vedhkrit" }, { name: "description", content: "Our mission to bring purposeful learning to every child." }] }),
});

const stats = [
  { value: "10M", label: "Learners we aim to reach by 2030" },
  { value: "20+", label: "Partner schools across India" },
  { value: "8", label: "Cities and growing" },
  { value: "50+", label: "Career pathways mapped" },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Empower 10 million learners in India to discover their strengths, find future career pathways, and build the skills they need — by 2030.",
    color: "text-brand-blue bg-blue-50 border-blue-100",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Caring guidance, honest assessments backed by science, and equal learning opportunities for every student, whatever their background.",
    color: "text-brand-orange bg-orange-50 border-orange-100",
  },
  {
    icon: Globe,
    title: "Our Reach",
    desc: "Partnering with 20+ progressive schools across 8 major cities today, on a clear path to support 200+ schools by 2027.",
    color: "text-brand-teal bg-teal-50 border-teal-100",
  },
];

const approach = [
  { icon: Sparkles, title: "Discover, don't just test", desc: "We map how a child thinks, learns and what excites them — not just what they can memorise." },
  { icon: Compass, title: "Turn insight into action", desc: "Every assessment leads to a real plan: mentoring, skill labs, and a career roadmap." },
  { icon: Users, title: "Bring parents in", desc: "Families see live progress, mentor feedback and clear next steps — never left in the dark." },
  { icon: ShieldCheck, title: "Keep data safe", desc: "Student profiles are private and never shared with advertisers. Full stop." },
];

const timeline = [
  { year: "2023", title: "The idea", desc: "Educators noticed students acing exams yet unsure of their own strengths and future." },
  { year: "2024", title: "First schools", desc: "We piloted the Vedhkrit assessment and mentoring model in a handful of schools." },
  { year: "2025", title: "Growth Studios", desc: "Physical SLEC labs opened, blending digital insight with hands-on learning." },
  { year: "2026", title: "Scaling up", desc: "Now serving 20+ schools across 8 cities, with AI-powered growth tracking for every learner." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

function About() {
  return (
    <div className="min-h-screen bg-white text-slate-700 text-left">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white pt-24 pb-16">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1a365d 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <motion.span variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-bold text-brand-blue uppercase tracking-widest mb-6">
            <Users className="h-4 w-4" /> Learner Development Mission
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Education with Intent.<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">For Every Learner.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Vedhkrit was founded to solve one problem: helping secondary-school students move from passive exam-taking to purposeful, confident readiness for their future.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white px-5 py-2.5 text-xs font-bold shadow-md transition-colors">
              Take Free Assessment <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-5 py-2.5 text-xs font-bold transition-colors">
              Talk to Us
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="font-display text-3xl font-black text-brand-blue leading-none">{s.value}</div>
              <div className="text-[11px] text-slate-500 mt-2 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION / VALUES / REACH */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:-translate-y-1 transition-transform duration-300">
              <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center mb-5 ${v.color}`}>
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-2">{v.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ORIGIN STORY (kept on brand gradient with clearly readable white text) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-blue to-indigo-900 shadow-lg">
          <div className="grid md:grid-cols-5 gap-8 p-8 md:p-12 items-center">
            <div className="md:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Our Origin Story</h2>
              <div className="space-y-4 text-white/85 text-sm leading-relaxed">
                <p>
                  The seed for Vedhkrit was planted when educators kept seeing the same pattern: students who scored well in exams but froze when it came to real problem-solving or choosing a direction for their future.
                </p>
                <p>
                  Traditional schooling optimised for memory left a gap where real aptitude discovery should be. Vedhkrit was built to close that gap — bringing psychometric insight and hands-on labs directly into schools.
                </p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-5 w-5 text-brand-teal" />
                  <span className="font-bold text-white text-sm">Data Privacy</span>
                </div>
                <p className="text-xs text-white/75 leading-normal">
                  Strict data governance. No student profiles are ever shared with third-party advertisers.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-5 w-5 text-brand-orange" />
                  <span className="font-bold text-white text-sm">Actionable Insights</span>
                </div>
                <p className="text-xs text-white/75 leading-normal">
                  We don't just assess — we build pathways. Every result leads to a real activity or mentoring session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-extrabold text-brand-teal uppercase tracking-widest">What Makes Us Different</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">A whole new way to grow</h2>
            <p className="text-sm text-slate-600 mt-2">We connect assessment, mentoring, skills and careers into one continuous journey.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {approach.map((a) => (
              <div key={a.title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="h-10 w-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <a.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{a.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <span className="text-[10px] font-extrabold text-brand-blue uppercase tracking-widest">Our Journey</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">From an idea to a movement</h2>
        </div>
        <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-slate-200">
          {timeline.map((t) => (
            <div key={t.year} className="relative">
              <span className="absolute -left-[31px] sm:-left-[39px] top-1 h-4 w-4 rounded-full bg-brand-blue border-4 border-white shadow" />
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="text-xs font-black text-brand-blue">{t.year}</span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">{t.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl border border-brand-blue/15 bg-gradient-to-br from-blue-50 to-teal-50 p-8 sm:p-12 text-center">
          <div className="h-12 w-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center mx-auto mb-4">
            <Rocket className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Ready to help your learner find their path?</h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">Start with a free AI aptitude assessment and see the Vedhkrit difference for yourself.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white px-6 py-3 text-xs font-bold shadow-md transition-colors">
              Get Started Free <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/framework" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 text-xs font-bold transition-colors">
              Explore Our Framework
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
