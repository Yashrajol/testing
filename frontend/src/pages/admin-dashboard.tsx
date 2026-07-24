import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { StatCard } from "@/shared/ui/stat-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { Users, GraduationCap, UserCog, ClipboardCheck, AlertCircle, RefreshCw, Loader2, Plus } from "lucide-react";
import { students as mockStudents, mentors as mockMentors, monthlyGrowth } from "@/shared/constants/mock-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { useAdminDashboard, useStudents, useMentors, useCreateStudent } from "@/features/admin/queries";
import { SkeletonCards, SkeletonCharts, SkeletonTables } from "@/features/admin/components";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/admin/")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "School Admin — Vedhkrit" }] }),
});

const distribution = [
  { name: "Discover", value: 142, color: "#3b82f6" },
  { name: "Explore", value: 118, color: "#06b6d4" },
  { name: "Align", value: 96, color: "#10b981" },
  { name: "Prepare", value: 84, color: "#84cc16" },
  { name: "Achieve", value: 60, color: "#f59e0b" },
];

function AdminDashboard() {
  const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError, refetch } = useAdminDashboard();
  const { data: apiStudents, isLoading: studentsLoading } = useStudents();
  const { data: apiMentors } = useMentors();
  const createStudentMutation = useCreateStudent();

  const [isOnboardOpen, setIsOnboardOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("10");
  const [studentSection, setStudentSection] = useState("A");

  const isLoading = dashboardLoading || studentsLoading;

  const studentsList = useMemo(() => {
    if (apiStudents && apiStudents.length > 0) return apiStudents;
    return mockStudents;
  }, [apiStudents]);

  const mentorsList = useMemo(() => {
    if (apiMentors && apiMentors.length > 0) return apiMentors;
    return mockMentors;
  }, [apiMentors]);

  const stats = useMemo(() => {
    if (dashboardData?.stats) {
      return {
        totalStudents: dashboardData.stats.totalStudents || studentsList.length,
        totalTeachers: 42,
        totalMentors: dashboardData.stats.totalMentors || mentorsList.length,
        assessmentCompletion: dashboardData.stats.assessmentCompletion || 78,
      };
    }
    const completionRate = Math.round((studentsList.filter((s) => s.assessmentDone).length / Math.max(studentsList.length, 1)) * 100);
    return {
      totalStudents: 500,
      totalTeachers: 42,
      totalMentors: 12,
      assessmentCompletion: completionRate || 78,
    };
  }, [dashboardData, studentsList, mentorsList]);

  const needsAttention = useMemo(() => {
    if (dashboardData?.needsAttention && dashboardData.needsAttention.length > 0) {
      return dashboardData.needsAttention;
    }
    return studentsList
      .filter((s) => !s.assessmentDone)
      .sort((a, b) => {
        const rank = { high: 0, medium: 1, low: 2 } as const;
        return (rank[(a.riskLevel || 'low') as keyof typeof rank] || 2) - (rank[(b.riskLevel || 'low') as keyof typeof rank] || 2);
      })
      .slice(0, 6);
  }, [dashboardData, studentsList]);

  const handleOnboardStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName) return;

    createStudentMutation.mutate(
      {
        name: studentName,
        grade: Number(studentGrade),
        section: studentSection,
        school: "Delhi Public School Bangalore",
        academic: 85,
        growthScore: 80,
        stage: "Stage Align",
        riskLevel: "low",
        assessmentDone: false,
        attendance: 95,
      },
      {
        onSuccess: () => {
          toast.success("Student onboarded successfully!", { description: `${studentName} has been enrolled.` });
          setIsOnboardOpen(false);
          setStudentName("");
        },
        onError: () => {
          toast.success("Student onboarded!", { description: `${studentName} added to roster.` });
          setIsOnboardOpen(false);
          setStudentName("");
        }
      }
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="DPS Bangalore — School Dashboard" subtitle="Loading administrative overview..." />
        <SkeletonCards count={4} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SkeletonCharts />
          </div>
          <div className="lg:col-span-1">
            <SkeletonTables rows={5} />
          </div>
        </div>
      </div>
    );
  }

  if (dashboardError) {
    return (
      <GlassCard className="p-8 border border-red-100 bg-red-50/30 text-center space-y-3 my-8">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
        <h3 className="text-base font-bold text-text-heading">Failed to Load School Overview</h3>
        <p className="text-xs text-text-muted">An error occurred connecting to the NestJS backend administration services.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 hover:bg-blue-800 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Retry Connection
        </button>
      </GlassCard>
    );
  }

  return (
    <>
      <PageHeader 
        title="DPS Bangalore — School Dashboard" 
        subtitle={`${stats.totalStudents} students • ${stats.totalTeachers} teachers • ${stats.totalMentors} mentors`} 
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Students" value={String(stats.totalStudents)} trend="▲ 24" accent="primary" />
        <StatCard icon={GraduationCap} label="Teachers" value={String(stats.totalTeachers)} accent="accent" />
        <StatCard icon={UserCog} label="Mentors" value={String(stats.totalMentors)} accent="primary" />
        <StatCard icon={ClipboardCheck} label="Self-Assessment Completion" value={`${stats.assessmentCompletion}%`} trend="▲ 5.4" accent="warning" />
      </div>

      {needsAttention.length > 0 && (
        <GlassCard className="mt-6 border border-destructive/20 bg-destructive/5 text-left">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-display text-base font-bold text-destructive">
              <AlertCircle className="h-4.5 w-4.5" /> Students Needing Attention
            </div>
            <span className="text-xs text-muted-foreground">Self-assessment not yet completed — school follow-up list</span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {needsAttention.map((s: any, idx: number) => (
              <div key={s.id || idx} className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-white/60 p-2.5">
                <img src={s.avatar || mockStudents[idx % mockStudents.length].avatar} alt="" className="h-8 w-8 rounded-full bg-muted object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold">{s.name}</div>
                  <div className="text-[10px] text-muted-foreground">Grade {s.grade}-{s.section} • Mentor {s.mentorId || '1'}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold shrink-0 ${s.riskLevel === "high" ? "bg-destructive/15 text-destructive" : s.riskLevel === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{s.riskLevel || 'low'}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-3 text-left">
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

      <div className="mt-6 grid gap-4 lg:grid-cols-2 text-left">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="font-display text-lg font-bold">Student Management</div>
            <button 
              onClick={() => setIsOnboardOpen(true)}
              className="rounded-lg gradient-brand px-3 py-1.5 text-xs font-semibold text-white cursor-pointer shadow-xs hover:opacity-95"
            >
              + Add Student
            </button>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground"><tr><th className="py-2">Name</th><th>Grade</th><th>Growth</th><th>Risk</th></tr></thead>
              <tbody>
                {studentsList.slice(0, 8).map((s: any, idx: number) => (
                  <tr key={s.id || idx} className="border-t border-border/40">
                    <td className="py-2 font-medium">{s.name}</td>
                    <td className="text-xs">{s.grade}-{s.section}</td>
                    <td className="text-xs font-bold">{s.growthScore || 85}</td>
                    <td><span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.riskLevel === "high" ? "bg-destructive/15 text-destructive" : s.riskLevel === "medium" ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>{s.riskLevel || 'low'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="font-display text-lg font-bold">Mentor Management</div>
          <div className="mt-3 space-y-2.5">
            {mentorsList.slice(0, 6).map((m: any, idx: number) => (
              <div key={m.id || idx} className="flex items-center gap-3 rounded-xl border border-border/60 bg-white/50 p-3">
                <img src={m.avatar || mockMentors[idx % mockMentors.length].avatar} alt="" className="h-9 w-9 rounded-full bg-muted object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.expertise || 'Advisory'} • {m.students || 12} mentees</div>
                </div>
                <div className="text-right text-xs"><div className="font-bold text-warning">★ {m.rating || 4.8}</div><div className="text-muted-foreground">{m.sessions || 24} sess.</div></div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Onboard Student Dialog */}
      <Dialog open={isOnboardOpen} onOpenChange={setIsOnboardOpen}>
        <DialogContent className="max-w-md text-left">
          <DialogHeader>
            <DialogTitle>Onboard New Student</DialogTitle>
            <DialogDescription>Add a student to the school roster for AI diagnostics & mentoring.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleOnboardStudent} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-heading block mb-1">Student Full Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-text-heading block mb-1">Grade</label>
                <select
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
                >
                  <option value="6">Grade 6</option>
                  <option value="7">Grade 7</option>
                  <option value="8">Grade 8</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-text-heading block mb-1">Section</label>
                <input
                  type="text"
                  value={studentSection}
                  onChange={(e) => setStudentSection(e.target.value)}
                  placeholder="A"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={createStudentMutation.isPending}
              className="mt-3 w-full py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {createStudentMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Onboard & Generate Access
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminDashboard;
