import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { students } from "@/lib/mock-data";
import { ClipboardCheck, Clock3, CheckCircle2, Send, Brain, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/mentor/assessments")({
  component: MentorAssessmentsPage,
  head: () => ({ meta: [{ title: "Assessment Reports — Mentor Portal" }] }),
});

const myStudents = students.slice(0, 12);

function MentorAssessmentsPage() {
  const [activeStudent, setActiveStudent] = useState<(typeof myStudents)[number] | null>(null);
  const [note, setNote] = useState("");

  const completedCount = myStudents.filter((s) => s.assessmentDone).length;
  const pendingCount = myStudents.length - completedCount;

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

  const handleSendNote = () => {
    if (!note.trim()) return;
    toast.success("Recommendation saved", { description: "Your note has been added to the student's growth file." });
    setNote("");
    setActiveStudent(null);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 text-left">
      <PageHeader title="Assessment Reports" subtitle="Monitor which mentees have completed their Vedhkrit self-assessment and review individual reports." />

      {/* Summary strip */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlassCard className="p-5 border-l-4 border-brand-blue bg-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Mentees</span>
            <span className="font-display text-2xl font-black text-text-heading block mt-1">{myStudents.length}</span>
          </div>
          <ClipboardCheck className="h-7 w-7 text-brand-blue/40" />
        </GlassCard>
        <GlassCard className="p-5 border-l-4 border-emerald-500 bg-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assessments Completed</span>
            <span className="font-display text-2xl font-black text-text-heading block mt-1">{completedCount}</span>
          </div>
          <CheckCircle2 className="h-7 w-7 text-emerald-500/40" />
        </GlassCard>
        <GlassCard className="p-5 border-l-4 border-brand-orange bg-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Assessments</span>
            <span className="font-display text-2xl font-black text-text-heading block mt-1">{pendingCount}</span>
          </div>
          <Clock3 className="h-7 w-7 text-brand-orange/40" />
        </GlassCard>
      </div>

      {/* Student list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {myStudents.map((student, i) => (
          <motion.div key={student.id} variants={itemVariants}>
            <GlassCard className="p-5 border border-slate-100 bg-white h-full flex flex-col justify-between text-left">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-3">
                <img src={student.avatar} alt="" className="h-10 w-10 rounded-full object-cover bg-slate-100" />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-text-heading truncate leading-tight">{student.name}</h4>
                  <p className="text-[10px] text-text-muted mt-0.5">Grade {student.grade}-{student.section}</p>
                </div>
                <span className={cn(
                  "text-[8.5px] font-bold uppercase tracking-wider rounded-full px-2 py-1 border shrink-0",
                  student.assessmentDone
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-orange-50 border-brand-orange/20 text-brand-orange"
                )}>
                  {student.assessmentDone ? "Completed" : "Pending"}
                </span>
              </div>

              <div className="text-xs text-text-body space-y-1.5">
                <div className="flex justify-between"><span className="text-text-muted">Vedhkrit Index:</span><span className="font-bold text-brand-blue">{student.assessmentDone ? `${student.growthScore}/100` : "—"}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Aptitude Score:</span><span className="font-bold text-text-heading">{student.assessmentDone ? `${student.academic}%` : "—"}</span></div>
              </div>

              <button
                onClick={() => setActiveStudent(student)}
                disabled={!student.assessmentDone}
                className={cn(
                  "mt-4 w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                  student.assessmentDone
                    ? "bg-brand-blue text-white hover:bg-blue-800"
                    : "bg-slate-50 border border-slate-100 text-slate-350 cursor-not-allowed"
                )}
              >
                {student.assessmentDone ? "Review Report" : "Awaiting Submission"}
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!activeStudent} onOpenChange={(open) => !open && setActiveStudent(null)}>
        <DialogContent className="max-w-lg text-left">
          {activeStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <img src={activeStudent.avatar} alt="" className="h-11 w-11 rounded-full object-cover bg-slate-100" />
                  <div>
                    <DialogTitle>{activeStudent.name}'s Assessment Report</DialogTitle>
                    <DialogDescription>Grade {activeStudent.grade}-{activeStudent.section} • {activeStudent.school}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: "Vedhkrit Index", val: `${activeStudent.growthScore}/100`, icon: Brain, color: "text-brand-blue bg-blue-50" },
                  { label: "Academic", val: `${activeStudent.academic}%`, icon: Sparkles, color: "text-brand-teal bg-teal-50" },
                  { label: "Skills", val: `${activeStudent.skills}%`, icon: ClipboardCheck, color: "text-purple-600 bg-purple-50" },
                  { label: "Wellbeing", val: `${activeStudent.wellbeing}%`, icon: MessageCircle, color: "text-rose-600 bg-rose-50" },
                ].map((m) => (
                  <div key={m.label} className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", m.color)}><m.icon className="h-4 w-4" /></div>
                    <div>
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">{m.label}</span>
                      <span className="font-bold text-text-heading">{m.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Add Mentor Recommendation</h5>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write feedback based on this assessment for the student's counseling file..."
                  className="w-full rounded-xl border border-slate-150 bg-white p-3 text-xs text-text-body outline-none focus:border-brand-blue min-h-20 resize-none"
                />
                <button
                  onClick={handleSendNote}
                  className="mt-2 w-full py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" /> Save Recommendation
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
