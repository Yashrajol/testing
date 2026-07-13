import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { students } from "@/lib/mock-data";
import { Search, Filter, ShieldAlert, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/admin/students")({
  component: AdminStudentsPage,
  head: () => ({ meta: [{ title: "Student Roster — School Admin" }] }),
});

function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "all" || String(s.grade) === gradeFilter;
    const matchesRisk = riskFilter === "all" || s.riskLevel === riskFilter;
    return matchesSearch && matchesGrade && matchesRisk;
  }).slice(0, 50); // Limit to 50 rows for performance demo

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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <PageHeader 
        title="Student Management" 
        subtitle="Manage profiles, diagnostic status, and growth indices for all enrolled students." 
        action={
          <button className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
            + Onboard Student
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
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                    <td className="py-3 font-semibold text-brand-blue">{s.id}</td>
                    <td className="py-3 font-bold text-text-heading">{s.name}</td>
                    <td className="py-3 text-text-body font-medium">{s.grade}-{s.section}</td>
                    <td className="py-3 text-text-body">{s.academic}%</td>
                    <td className="py-3 font-bold text-brand-blue">{s.growthScore}</td>
                    <td className="py-3">
                      <span className="rounded-lg bg-brand-blue/5 border border-brand-blue/15 px-2 py-0.5 text-[9px] font-bold text-brand-blue uppercase">
                        {s.stage}
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
                        {s.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-[10px] font-bold text-brand-teal hover:text-brand-blue transition-colors">
                        Manage →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
