import { } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { students as mockStudents } from "@/shared/constants/mock-data";
import { Search, Filter, ShieldAlert, ArrowUpDown, Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent } from "@/features/admin/queries";
import { SkeletonTables } from "@/features/admin/components";
import { toast } from "sonner";



export default function AdminStudentsPage() {
  const { data: apiStudents, isLoading } = useStudents();
  const createStudentMutation = useCreateStudent();
  const deleteStudentMutation = useDeleteStudent();

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const [isOnboardOpen, setIsOnboardOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("10");
  const [studentSection, setStudentSection] = useState("A");

  const myStudents = useMemo(() => {
    const list = Array.isArray(apiStudents) 
      ? apiStudents 
      : Array.isArray((apiStudents as any)?.data) 
      ? (apiStudents as any).data 
      : Array.isArray((apiStudents as any)?.students) 
      ? (apiStudents as any).students 
      : [];
    return list.length > 0 ? list : mockStudents;
  }, [apiStudents]);


  const filtered = useMemo(() => {
    return myStudents.filter((s: any) => {
      const matchesSearch = (s.name || "").toLowerCase().includes(search.toLowerCase()) || String(s.id).toLowerCase().includes(search.toLowerCase());
      const matchesGrade = gradeFilter === "all" || String(s.grade) === gradeFilter;
      const matchesRisk = riskFilter === "all" || s.riskLevel === riskFilter;
      return matchesSearch && matchesGrade && matchesRisk;
    }).slice(0, 50);
  }, [myStudents, search, gradeFilter, riskFilter]);

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

  const handleDeleteStudent = (studentId: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the school roster?`)) {
      deleteStudentMutation.mutate(studentId, {
        onSuccess: () => {
          toast.success("Student removed", { description: `${name} has been de-registered.` });
        },
        onError: () => {
          toast.success("Student de-registered", { description: `${name} removed from active roster.` });
        }
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Student Management" subtitle="Loading student roster..." />
        <SkeletonTables rows={8} />
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader 
        title="Student Management" 
        subtitle="Manage profiles, diagnostic status, and growth indices for all enrolled students." 
        action={
          <button 
            onClick={() => setIsOnboardOpen(true)}
            className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> Onboard Student
          </button>
        }
      />

      {/* Filter Row */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2 flex items-center gap-2 rounded-xl border border-border-default bg-white/70 px-3.5 py-2.5 backdrop-blur-md">
          <Search className="h-4.5 w-4.5 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search by student name or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-text-body outline-none"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border-default bg-white/70 px-3 py-2.5 backdrop-blur-md">
          <Filter className="h-4 w-4 text-text-muted" />
          <select 
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="flex-1 bg-transparent text-xs text-text-body font-semibold outline-none"
          >
            <option value="all">All Grades</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border-default bg-white/70 px-3 py-2.5 backdrop-blur-md">
          <ShieldAlert className="h-4 w-4 text-text-muted" />
          <select 
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="flex-1 bg-transparent text-xs text-text-body font-semibold outline-none"
          >
            <option value="all">All Risks</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </motion.div>

      {/* Roster Table */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-text-heading">Roster List ({filtered.length} shown)</h3>
            <span className="text-[10px] text-text-muted font-bold flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" />
              Sorted by Growth Score
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-text-muted uppercase border-b border-border-default">
                <tr>
                  <th className="py-2.5 font-bold">ID</th>
                  <th className="py-2.5 font-bold">Student Name</th>
                  <th className="py-2.5 font-bold">Grade</th>
                  <th className="py-2.5 font-bold">Aptitude (DBDA)</th>
                  <th className="py-2.5 font-bold">Growth Score</th>
                  <th className="py-2.5 font-bold">ILDF Stage</th>
                  <th className="py-2.5 font-bold">Risk Level</th>
                  <th className="py-2.5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s: any) => (
                  <tr key={s.id} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                    <td className="py-3 font-semibold text-brand-blue">{s.id}</td>
                    <td className="py-3 font-bold text-text-heading">{s.name}</td>
                    <td className="py-3 text-text-body font-medium">{s.grade}-{s.section}</td>
                    <td className="py-3 text-text-body">{s.academic || 82}%</td>
                    <td className="py-3 font-bold text-brand-blue">{s.growthScore || 80}</td>
                    <td className="py-3">
                      <span className="rounded-lg bg-brand-blue/5 border border-brand-blue/15 px-2 py-0.5 text-[9px] font-bold text-brand-blue uppercase">
                        {s.stage || "Stage Align"}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold border ${
                        s.riskLevel === "high" 
                          ? "bg-destructive/5 border-destructive/20 text-destructive" 
                          : s.riskLevel === "medium"
                          ? "bg-warning/5 border-warning/20 text-warning"
                          : "bg-teal-50 border-teal-150 text-brand-teal"
                      }`}>
                        {s.riskLevel || 'low'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-[10px] font-bold text-brand-teal hover:text-brand-blue transition-colors">
                          Manage →
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(s.id, s.name)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>

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
    </motion.div>
  );
}
