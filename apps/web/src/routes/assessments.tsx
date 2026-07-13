import { createFileRoute, Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/glass-card";
import { Logo } from "@/components/logo";
import { assessments, ildfStages } from "@/lib/mock-data";
import { Brain, Target, Sparkles, Heart, Compass, Users, ArrowRight, Clock, CheckCircle2, PlayCircle } from "lucide-react";

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
  return (
    <div className="min-h-screen mesh-bg">
      <header className="sticky top-0 z-30 border-b border-border/40 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <Link to="/dashboard/student" className="text-xs font-semibold text-primary">Back to dashboard →</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
