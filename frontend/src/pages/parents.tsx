import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, TrendingUp, MessageSquare, ShieldCheck, Bell, Calendar,
  CheckCircle2, ArrowRight, Sparkles, Heart, FileText, Lock
} from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/_marketing/parents")({
  component: ParentsPage,
  head: () => ({ meta: [{ title: "For Parents — Vedhkrit" }, { name: "description", content: "Stay informed and involved in your child's growth with live reports, mentor feedback and a safe parent dashboard." }] }),
});

const stats = [
  { value: "97%", label: "Parent satisfaction" },
  { value: "10K+", label: "Families onboard" },
  { value: "Live", label: "Daily progress reports" },
  { value: "100%", label: "Private & secure" },
];

const dashboardFeatures = [
  "Your child's Vedhkrit Index and growth at a glance",
  "Attendance, homework and test results in one place",
  "Upcoming activities, tests and mentor sessions",
  "Skills, career direction and achievements",
];

const sections = [
  {
    id: "reports",
    icon: TrendingUp,
    tag: "Live Reports",
    title: "Always know how your child is doing",
    desc: "See real-time progress across academics, skills and wellbeing. No waiting for the report card — you get a clear, up-to-date picture whenever you check in.",
    points: ["Real-time academic & skill progress", "Simple, easy-to-read summaries", "Weekly and monthly growth trends"],
    color: "text-brand-blue bg-blue-50 border-blue-100",
  },
  {
    id: "feedback",
    icon: MessageSquare,
    tag: "Mentor Feedback",
    title: "Guidance from real mentors",
    desc: "Read your child's mentor notes and recommendations, message the mentor directly, and book meetings — so you're always part of the conversation.",
    points: ["Personal mentor notes after each session", "Direct messaging with your child's mentor", "Book parent-mentor meetings anytime"],
    color: "text-brand-teal bg-teal-50 border-teal-100",
  },
  {
    id: "safe",
    icon: ShieldCheck,
    tag: "Safe & Private",
    title: "Your child's data stays protected",
    desc: "We follow strict data-privacy rules. Your child's profile is never sold or shared with advertisers — it exists only to support their learning.",
    points: ["No data ever sold to advertisers", "Secure, access-controlled accounts", "You stay in control of your family's data"],
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

function ParentsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-700 text-left">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-white pt-24 pb-16">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#c2410c 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.span variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold text-brand-orange uppercase tracking-widest mb-6">
              <Users className="h-4 w-4" /> For Parents
            </motion.span>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Always Informed.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Always Involved.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl">
              Stay updated with deep insights into your child's growth. Track progress, receive recommendations, and review mentor feedback — all in real time.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-7 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-1.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white px-5 py-2.5 text-xs font-bold shadow-md transition-colors">
                Access Parent Dashboard <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-5 py-2.5 text-xs font-bold transition-colors">
                Talk to Us
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="show" className="relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
              <img src="/assets/images/parents-family.jpg" alt="A happy family" className="w-full h-72 sm:h-80 object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl border border-slate-200 shadow-lg px-4 py-3 flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Heart className="h-4.5 w-4.5" /></div>
              <div>
                <div className="text-xs font-black text-slate-900 leading-none">97% Satisfaction</div>
                <div className="text-[10px] text-slate-500 mt-0.5">from parents like you</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="font-display text-3xl font-black text-brand-orange leading-none">{s.value}</div>
              <div className="text-[11px] text-slate-500 mt-2 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PARENT DASHBOARD */}
      <section id="dashboard" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[10px] font-extrabold text-brand-blue uppercase tracking-widest">Parent Dashboard</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Everything about your child, in one place</h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              A single, simple dashboard shows you exactly how your child is growing — nothing hidden, nothing hard to find.
            </p>
            <ul className="mt-5 space-y-2.5">
              {dashboardFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/dashboard/parent" className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white px-5 py-2.5 text-xs font-bold shadow-md transition-colors">
              Preview the Dashboard <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: TrendingUp, label: "Vedhkrit Index", value: "82 / 100", color: "text-brand-blue bg-blue-50" },
                { icon: Calendar, label: "Attendance", value: "94%", color: "text-emerald-600 bg-emerald-50" },
                { icon: FileText, label: "Homework", value: "On track", color: "text-brand-orange bg-orange-50" },
                { icon: Bell, label: "Next Session", value: "Tomorrow", color: "text-purple-600 bg-purple-50" },
              ].map((c) => (
                <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${c.color}`}><c.icon className="h-4 w-4" /></div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-3">{c.label}</div>
                  <div className="font-bold text-sm text-slate-900 mt-0.5">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTIONS */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-5">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 grid sm:grid-cols-3 gap-6 items-center scroll-mt-20">
              <div className="sm:col-span-1">
                <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mt-4">{s.tag}</span>
                <h3 className="text-xl font-black text-slate-900 mt-1 leading-tight">{s.title}</h3>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                <ul className="mt-4 grid sm:grid-cols-1 gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl border border-brand-orange/15 bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-12 text-center">
          <div className="h-12 w-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Be part of your child's growth story</h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">Create your free parent account and stay connected to every step of the journey.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/register" className="inline-flex items-center gap-1.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 text-xs font-bold shadow-md transition-colors">
              Create Free Account <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link to="/login" className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 px-6 py-3 text-xs font-bold transition-colors">
              <Lock className="h-3.5 w-3.5" /> Parent Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ParentsPage;

