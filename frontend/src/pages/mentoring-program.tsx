import { Link } from "@tanstack/react-router";
import { GlassCard } from "@/shared/ui/glass-card";
import { Logo } from "@/shared/ui/logo";
import { ildfStages, mentors } from "@/shared/constants/mock-data";
import { Star, Clock, Calendar, ArrowRight } from "lucide-react";

const stageDetails = [
  { stage: "Discover", goals: ["Self-awareness profile","Strengths discovery","Interest mapping"], time: "Weeks 1-3" },
  { stage: "Explore", goals: ["Career exposure tasks","Domain immersions","Role-model interviews"], time: "Weeks 4-7" },
  { stage: "Align", goals: ["Stream/elective fit","Long-term goal canvas","Parent alignment session"], time: "Weeks 8-10" },
  { stage: "Prepare", goals: ["Skill-build sprints","Portfolio milestones","Entrance prep plan"], time: "Weeks 11-16" },
  { stage: "Achieve", goals: ["College apps","Pitch & interviews","Real-world outcomes"], time: "Weeks 17+" },
];

export default function MentoringProgramPage() {
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
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Mentoring Module</div>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Five stages. One purposeful journey.</h1>
          <p className="mt-3 text-muted-foreground">Mentors guide every student through the ILDF — from self-discovery to real-world achievement.</p>
        </div>

        <div className="mt-10 space-y-4">
          {ildfStages.map((s, i) => (
            <GlassCard key={s.stage} delay={i * 0.04}>
              <div className="grid items-start gap-5 lg:grid-cols-[auto_1fr_auto]">
                <div className="grid h-14 w-14 place-items-center rounded-2xl text-xl font-bold text-white shadow-lg" style={{ background: s.color }}>{i+1}</div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-extrabold">{s.stage}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"><Clock className="h-3 w-3" /> {stageDetails[i].time}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stageDetails[i].goals.map((g) => (
                      <span key={g} className="rounded-lg border border-border/60 bg-white/60 px-2.5 py-1 text-xs">{g}</span>
                    ))}
                  </div>
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-xl gradient-brand px-3 py-2 text-xs font-semibold text-white">View Playbook <ArrowRight className="h-3 w-3" /></button>
              </div>
            </GlassCard>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-extrabold">Your mentor team</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.slice(0, 8).map((m, i) => (
            <GlassCard key={m.id} delay={i * 0.04} className="text-center">
              <img src={m.avatar} alt="" className="mx-auto h-16 w-16 rounded-full bg-muted" />
              <div className="mt-2 font-semibold">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.expertise}</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {m.rating} <span className="text-muted-foreground">• {m.sessions} sessions</span></div>
              <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Calendar className="h-3.5 w-3.5" /> Book session</button>
            </GlassCard>
          ))}
        </div>
      </main>
    </div>
  );
}
