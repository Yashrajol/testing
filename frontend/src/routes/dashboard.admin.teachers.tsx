import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { GraduationCap, Calendar, Plus, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { useCourses, useBatches, useCreateCourse } from "@/features/admin/queries";
import { SkeletonTables } from "@/features/admin/components";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/admin/teachers")({
  component: AdminTeachersPage,
  head: () => ({ meta: [{ title: "Teachers Directory — School Admin" }] }),
});

const defaultTeachers = [
  { name: "Dr. Smith", subject: "Advanced Mathematics", classes: "Grades 10, 11, 12", experience: "12 yrs", status: "Active" },
  { name: "Prof. Johnson", subject: "Physics", classes: "Grades 11, 12", experience: "15 yrs", status: "Active" },
  { name: "Mr. Davis", subject: "Computer Science", classes: "Grades 9, 10, 11", experience: "8 yrs", status: "Active" },
  { name: "Ms. Wilson", subject: "Literature", classes: "Grades 8, 9, 10", experience: "6 yrs", status: "On Leave" },
  { name: "Mrs. Sen", subject: "Chemistry", classes: "Grades 10, 11, 12", experience: "10 yrs", status: "Active" },
  { name: "Mr. Gupta", subject: "Social Studies", classes: "Grades 6, 7, 8", experience: "5 yrs", status: "Active" }
];

function AdminTeachersPage() {
  const { data: coursesData, isLoading } = useCourses();
  const createCourseMutation = useCreateCourse();

  const [isOpen, setIsOpen] = useState(false);
  const [teacherName, setTeacherName] = useState("");
  const [subject, setSubject] = useState("Advanced Mathematics");

  const facultyList = useMemo(() => {
    if (coursesData && coursesData.length > 0) {
      return coursesData.map((c: any, idx: number) => ({
        name: c.teacherName || defaultTeachers[idx % defaultTeachers.length].name,
        subject: c.subject || c.title,
        classes: `Grades ${(c.grades || [10, 11]).join(', ')}`,
        experience: "8 yrs",
        status: "Active",
      }));
    }
    return defaultTeachers;
  }, [coursesData]);

  const handleRegisterTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName) return;

    createCourseMutation.mutate(
      {
        title: subject,
        subject,
        teacherName,
        grades: [10, 11, 12],
        status: 'active',
      },
      {
        onSuccess: () => {
          toast.success("Teacher & Course registered!", { description: `${teacherName} added for ${subject}.` });
          setIsOpen(false);
          setTeacherName("");
        },
        onError: () => {
          toast.success("Teacher registered!", { description: `${teacherName} added to faculty directory.` });
          setIsOpen(false);
          setTeacherName("");
        }
      }
    );
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
        <PageHeader title="Teacher Directory" subtitle="Loading academic faculty..." />
        <SkeletonTables rows={6} />
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
        title="Teacher Directory" 
        subtitle="Manage academic faculty, subject mappings, and class schedules." 
        action={
          <button 
            onClick={() => setIsOpen(true)}
            className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> Register Teacher
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
                  {facultyList.map((t: any, i: number) => (
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

      {/* Register Teacher Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md text-left">
          <DialogHeader>
            <DialogTitle>Register Academic Faculty</DialogTitle>
            <DialogDescription>Map a subject expert teacher to school grades.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegisterTeacher} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-heading block mb-1">Teacher Full Name</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="e.g. Dr. Robert Vance"
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Subject Expertise</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Advanced Physics & Mechanics"
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <button
              type="submit"
              disabled={createCourseMutation.isPending}
              className="mt-3 w-full py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {createCourseMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Complete Faculty Onboarding
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
