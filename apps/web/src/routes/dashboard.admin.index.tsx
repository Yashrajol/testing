import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { StatCard } from "@/components/stat-card";
import { Users, GraduationCap, UserCog, ClipboardCheck, AlertCircle } from "lucide-react";
import { students, mentors, monthlyGrowth } from "@/lib/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/dashboard/admin/")({
  component: AdminDashboardOverview,
});

const distribution = [
  { name: "Discover", value: 142, color: "#3b82f6" },
  { name: "Explore", value: 118, color: "#06b6d4" },
  { name: "Align", value: 96, color: "#10b981" },
  { name: "Prepare", value: 84, color: "#84cc16" },
  { name: "Achieve", value: 60, color: "#f59e0b" },
];

function AdminDashboardOverview() {
  const assessmentCompletionRate = Math.round((students.filter((s) => s.assessmentDone).length / students.length) * 100);
  // Students who still need to complete their self-assessment, highest-risk first — the school's follow-up list.
  const needsAttention = students
    .filter((s) => !s.assessmentDone)
    .sort((a, b) => {
      const rank = { high: 0, medium: 1, low: 2 } as const;
      return rank[a.riskLevel as keyof typeof rank] - rank[b.riskLevel as keyof typeof rank];
    })
    .slice(0, 6);

  return (
    <>
      <PageHeader title="DPS Bangalore — School Dashboard" subtitle="500 students • 42 teachers • 12 mentors" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Students" value="500" trend="▲ 24" accent="primary" />
        <StatCard icon={GraduationCap} label="Teachers" value="42" accent="accent" />
        <StatCard icon={UserCog} label="Mentors" value="12" accent="primary" />
        <StatCard icon={ClipboardCheck} label="Self-Assessment Completion" value={`${assessmentCompletionRate}%`} trend="▲ 5.4" accent="warning" />
      </div>

      {needsAttention.length > 0 && (
        <GlassCard className="mt-6 border border-destructive/20 bg-destructive/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-display text-base font-bold text-destructive">
              <AlertCircle className="h-4.5 w-4.5" /> Students Needing Attention
            </div>
            <span className="text-xs text-muted-foreground">Self-assessment not yet completed — school follow-up list</span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {needsAttention.map((s) => (
              <div key={s.id} className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-white/60 p-2.5">
                <img src={s.avatar} alt="" className="h-8 w-8 rounded-full bg-muted object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold">{s.name}</div>
                  <div className="text-[10px] text-muted-foreground">Grade {s.grade}-{s.section} • Mentor {s.mentorId}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold shrink-0 ${s.riskLevel === "high" ? "bg-destructive/15 text-destructive" : s.riskLevel === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{s.riskLevel}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <div className="font-display text-lg font-bold">School-wide Growth</div>
          <div className="mt-3 h-72">
            <ResponsiveContainer>
              <AreaChart data={monthlyGrowth}>
                <defs>
                  <linearGradient id="adm" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.52 0.18 245)" stopOpacity={0.4} /><stop offset="100%" stopColor="oklch(0.52 0.18 245)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 230)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="academic" stroke="oklch(0.52 0.18 245)" fill="url(#adm)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="skills" stroke="oklch(0.7 0.16 165)" strokeWidth={2.5} fill="transparent" />
                <Area type="monotone" dataKey="wellbeing" stroke="oklch(0.78 0.15 75)" strokeWidth={2.5} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="font-display text-lg font-bold">ILDF Stage Distribution</div>
          <div className="mt-2 h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75}>
                  {distribution.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <div className="flex items-center justify-between"><div className="font-display text-lg font-bold">Student Management</div><button className="rounded-lg gradient-brand px-3 py-1.5 text-xs font-semibold text-white">+ Add Student</button></div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground"><tr><th className="py-2">Name</th><th>Grade</th><th>Growth</th><th>Risk</th></tr></thead>
              <tbody>
                {students.slice(0, 8).map((s) => (
                  <tr key={s.id} className="border-t border-border/40">
                    <td className="py-2 font-medium">{s.name}</td>
                    <td className="text-xs">{s.grade}</td>
                    <td className="text-xs font-bold">{s.growthScore}</td>
                    <td><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.riskLevel === "high" ? "bg-destructive/15 text-destructive" : s.riskLevel === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{s.riskLevel}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="font-display text-lg font-bold">Mentor Management</div>
          <div className="mt-3 space-y-2.5">
            {mentors.slice(0, 6).map((m) => (
              <div key={m.id} className="flex items-center gap-3 rounded-xl border border-border/60 bg-white/50 p-3">
                <img src={m.avatar} alt="" className="h-9 w-9 rounded-full bg-muted" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.expertise} • {m.students} mentees</div>
                </div>
                <div className="text-right text-xs"><div className="font-bold text-warning">★ {m.rating}</div><div className="text-muted-foreground">{m.sessions} sess.</div></div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
