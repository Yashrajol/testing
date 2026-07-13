import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { BookOpen, GraduationCap, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/student/academics")({
  component: AcademicsPage,
  head: () => ({ meta: [{ title: "Academics Overview — Vedhkrit" }] }),
});

const subjects = [
  { name: "Advanced Mathematics", grade: "A", score: 94, teacher: "Dr. Smith", attendance: "98%", status: "Excellent" },
  { name: "Physics", grade: "B+", score: 88, teacher: "Prof. Johnson", attendance: "95%", status: "Good" },
  { name: "Computer Science", grade: "A+", score: 98, teacher: "Mr. Davis", attendance: "100%", status: "Outstanding" },
  { name: "Literature", grade: "B", score: 82, teacher: "Ms. Wilson", attendance: "92%", status: "Needs Focus" },
];

const assignments = [
  { title: "Calculus Midterm Prep", due: "Tomorrow, 11:59 PM", subject: "Mathematics", type: "Exam" },
  { title: "Physics Lab Report", due: "Friday, 5:00 PM", subject: "Physics", type: "Assignment" },
  { title: "Data Structures Project", due: "Next Monday", subject: "Computer Science", type: "Project" },
];

function AcademicsPage() {
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
      <PageHeader title="Academics Overview" subtitle="Track your grades, attendance, and upcoming coursework." />
      
      {/* Top Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
        <GlassCard className="p-5 flex items-center gap-4 border-brand-blue/20 bg-brand-blue/5">
          <div className="h-11 w-11 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Current GPA</p>
            <p className="text-2xl font-extrabold text-brand-blue mt-0.5">3.85 / 4.0</p>
          </div>
        </GlassCard>
        
        <GlassCard className="p-5 flex items-center gap-4 border-brand-teal/20 bg-brand-teal/5">
          <div className="h-11 w-11 rounded-xl bg-brand-teal/10 flex items-center justify-center text-brand-teal">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Total Credits</p>
            <p className="text-2xl font-extrabold text-brand-teal mt-0.5">42 Units</p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4 border-brand-orange/20 bg-brand-orange/5">
          <div className="h-11 w-11 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-muted">Average Attendance</p>
            <p className="text-2xl font-extrabold text-brand-orange mt-0.5">96%</p>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Subjects Table */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-brand-blue" />
              Current Coursework
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-text-muted uppercase border-b border-border-default">
                  <tr>
                    <th className="px-3 py-2 font-bold">Subject</th>
                    <th className="px-3 py-2 font-bold">Grade</th>
                    <th className="px-3 py-2 font-bold">Score</th>
                    <th className="px-3 py-2 font-bold">Attendance</th>
                    <th className="px-3 py-2 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((sub, i) => (
                    <tr key={i} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                      <td className="px-3 py-3 font-semibold text-text-heading">
                        {sub.name}
                        <span className="block text-[10px] text-text-muted font-normal mt-0.5">{sub.teacher}</span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center justify-center h-7 w-7 rounded-lg font-bold text-xs ${
                          sub.grade.includes('A') ? 'bg-brand-teal/10 text-brand-teal border border-brand-teal/20' :
                          sub.grade.includes('B') ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' :
                          'bg-brand-orange/10 text-brand-orange border border-brand-orange/20'
                        }`}>
                          {sub.grade}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-semibold text-text-body">{sub.score}%</td>
                      <td className="px-3 py-3 text-text-body">{sub.attendance}</td>
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          sub.status === 'Outstanding' || sub.status === 'Excellent' ? 'bg-teal-50 border-teal-150 text-brand-teal' :
                          sub.status === 'Good' ? 'bg-brand-blue/5 border-brand-blue/20 text-brand-blue' :
                          'bg-brand-orange/5 border-brand-orange/20 text-brand-orange'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Upcoming Assignments Sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-brand-orange" />
              Coursework Deadlines
            </h3>
            <div className="space-y-3">
              {assignments.map((task, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-border-default bg-white/40 hover:border-brand-blue/30 transition-all">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded">
                      {task.type}
                    </span>
                    <span className="text-[10px] font-bold text-brand-orange">{task.due}</span>
                  </div>
                  <h4 className="font-bold text-xs text-text-heading leading-tight">{task.title}</h4>
                  <p className="text-[10px] text-text-muted mt-1">{task.subject}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
