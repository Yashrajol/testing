import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/admin/teachers")({
  component: AdminTeachersPage,
  head: () => ({ meta: [{ title: "Teachers Directory — School Admin" }] }),
});

const teachers = [
  { name: "Dr. Smith", subject: "Advanced Mathematics", classes: "Grades 10, 11, 12", experience: "12 yrs", status: "Active" },
  { name: "Prof. Johnson", subject: "Physics", classes: "Grades 11, 12", experience: "15 yrs", status: "Active" },
  { name: "Mr. Davis", subject: "Computer Science", classes: "Grades 9, 10, 11", experience: "8 yrs", status: "Active" },
  { name: "Ms. Wilson", subject: "Literature", classes: "Grades 8, 9, 10", experience: "6 yrs", status: "On Leave" },
  { name: "Mrs. Sen", subject: "Chemistry", classes: "Grades 10, 11, 12", experience: "10 yrs", status: "Active" },
  { name: "Mr. Gupta", subject: "Social Studies", classes: "Grades 6, 7, 8", experience: "5 yrs", status: "Active" }
];

function AdminTeachersPage() {
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
        title="Teacher Directory" 
        subtitle="Manage academic faculty, subject mappings, and class schedules." 
        action={
          <button className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
            + Register Teacher
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Faculty Table */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="text-base font-bold text-text-heading mb-4">Academic Faculty</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-text-muted uppercase border-b border-border-default">
                  <tr>
                    <th className="py-2.5 font-bold">Name</th>
                    <th className="py-2.5 font-bold">Expertise Domain</th>
                    <th className="py-2.5 font-bold">Class Alignments</th>
                    <th className="py-2.5 font-bold">Experience</th>
                    <th className="py-2.5 font-bold">Status</th>
                    <th className="py-2.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t, i) => (
                    <tr key={i} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                      <td className="py-3 font-bold text-text-heading flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                          <GraduationCap className="h-4 w-4" />
                        </div>
                        {t.name}
                      </td>
                      <td className="py-3 text-text-body font-semibold">{t.subject}</td>
                      <td className="py-3 text-text-muted font-medium">{t.classes}</td>
                      <td className="py-3 text-text-body">{t.experience}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold border ${
                          t.status === "Active" 
                            ? "bg-teal-50 border-teal-150 text-brand-teal" 
                            : "bg-warning/5 border-warning/20 text-warning"
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button className="text-[10px] font-bold text-brand-blue hover:text-brand-teal transition-colors">
                          Schedules
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Scheduling Overview */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-brand-blue" />
              Schedules Review
            </h3>
            <div className="space-y-3.5 text-left">
              {[
                { title: "Grade 10 Calculus Midterm", desc: "Coordinated by Dr. Smith.", time: "Mar 20, 9:00 AM" },
                { title: "Physics Lab Assessment", desc: "Supervised by Prof. Johnson.", time: "Mar 22, 11:30 AM" },
                { title: "CS Lab - Data Structures", desc: "Coordinated by Mr. Davis.", time: "Mar 24, 2:00 PM" }
              ].map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-border-default/50 bg-white/40">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/15 px-2 py-0.5 rounded">Exam Check</span>
                    <span className="text-[9px] text-text-muted font-bold">{s.time}</span>
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-text-heading leading-tight">{s.title}</h4>
                  <p className="text-[10px] text-text-muted mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
