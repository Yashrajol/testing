import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "@/shared/ui/glass-card";
import { Logo } from "@/shared/ui/logo";
import { assessments, ildfStages } from "@/shared/constants/mock-data";
import { Brain, Target, Sparkles, Heart, Compass, Users, ArrowRight, Clock, CheckCircle2, PlayCircle, Zap, UserCircle } from "lucide-react";
import { useAssessmentStatus } from "@/shared/constants/assessment-status";
import { motion } from "motion/react";
import { toast } from "sonner";

export const Route = createFileRoute("/assessments")({
  component: Page,
  head: () => ({ meta: [{ title: "Assessment Module — Vedhkrit" }] }),
});

const types = [
  { icon: Brain, name: "Academic", desc: "Diagnostic & criterion-referenced; mapped to NCERT/IB outcomes." },
  { icon: Target, name: "Aptitude", desc: "DBDA & DAT batteries — verbal, numerical, spatial, logical, mechanical." },
  { icon: Sparkles, name: "Skills", desc: "21st century skills: critical thinking, creativity, communication, collaboration." },
  { icon: Users, name: "Behaviour", desc: "Big Five, work styles and team dynamics profiler." },
  { icon: Heart, name: "Wellbeing", desc: "Emotional health, stress, sleep, focus and resilience indicators." },
  { icon: Compass, name: "Career Readiness", desc: "Composite index combining all dimensions for college fit." },
];

function Page() {
  const navigate = useNavigate();
  const { done: assessmentDone, markDone } = useAssessmentStatus();

  const handleStartFreeAssessment = () => {
    toast.success("Starting your AI Aptitude & Interest Battery...");
    // Simulate completing assessment flow
    setTimeout(() => {
      markDone();
      toast.success("Assessment complete! Now let's complete your profile to see your personalized dashboard.");
      navigate({ to: "/dashboard/student/profile" });
    }, 1500);
  };

  return (
    <div className="min-h-screen mesh-bg">
      <header className="sticky top-0 z-30 border-b border-border/40 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <Link to="/dashboard/student" className="text-xs font-semibold text-primary">Back to dashboard →</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Free Diagnostic Assessment Banner — shown for new accounts */}
        {!assessmentDone && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-10 rounded-3xl border border-brand-teal/20 bg-gradient-to-r from-brand-teal/5 via-brand-blue/5 to-indigo-500/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-blue text-white shadow-md shrink-0">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue text-[11px] font-bold mb-2">
                  <Sparkles className="w-3 h-3" /> FREE for New Accounts
                </div>
                <h2 className="text-lg font-black text-slate-800 leading-tight">
                  🎉 Your Free AI Diagnostic Assessment is Ready!
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-md">
                  Complete this 15-minute test to unlock your personalised <strong>Vedhkrit Index</strong>, Learning DNA, and top career matches. Your dashboard will populate with real data after completion.
                </p>
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-brand-teal" /> 30 Quick Questions</div>
                  <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 15 Minutes</div>
                  <div className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-purple-500" /> Instant Results</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleStartFreeAssessment}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue text-white text-sm font-bold shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Start Free Assessment Now <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/dashboard/student"
                className="px-5 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-colors text-center cursor-pointer"
              >
                Take Later
              </Link>
            </div>
          </motion.div>
        )}

        {/* After assessment done — profile completion prompt */}
        {assessmentDone && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 rounded-3xl border border-brand-blue/20 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 p-5 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-blue text-white shadow-sm shrink-0">
                <UserCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Assessment Complete! Complete your profile to unlock your dashboard.</h3>
                <p className="text-xs text-slate-500 mt-0.5">Your Vedhkrit Index and career matches will populate once your profile is saved.</p>
              </div>
            </div>
            <Link
              to="/dashboard/student/profile"
              className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-navy transition-all shadow-sm shrink-0 flex items-center gap-1 cursor-pointer"
            >
              Complete Profile <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        )}

        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Assessment Module</div>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Six lenses on every learner.</h1>
          <p className="mt-3 text-muted-foreground">A single integrated battery covering academic, aptitude, skills, behaviour, wellbeing and career readiness.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((t, i) => (
            <GlassCard key={t.name} delay={i * 0.04}>
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-brand text-white"><t.icon className="h-5 w-5" /></div>
              <div className="mt-3 font-display text-lg font-bold">{t.name} Assessment</div>
              <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="rounded-full bg-success/10 px-2 py-0.5 font-semibold text-success">Adaptive</span>
                <button className="font-semibold text-primary inline-flex items-center gap-1">Start <ArrowRight className="h-3 w-3" /></button>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard strong className="mt-10">
          <div className="font-display text-lg font-bold">My Assessment Library</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {assessments.map((a) => (
              <div key={a.name} className="rounded-xl border border-border/60 bg-white/60 p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase text-primary">{a.type}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {a.duration}</span>
                </div>
                <div className="mt-2 font-display font-bold">{a.name}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${a.status === "Completed" ? "bg-success/15 text-success" : a.status === "In Progress" ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}>{a.status}</span>
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    {a.status === "Completed" ? <><CheckCircle2 className="h-3.5 w-3.5" /> View report</> : <><PlayCircle className="h-3.5 w-3.5" /> Start</>}
                  </button>
                </div>
                {a.score !== null && <div className="mt-2 text-xs text-muted-foreground">Score: <b className="text-foreground">{a.score}</b></div>}
              </div>
            ))}
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
