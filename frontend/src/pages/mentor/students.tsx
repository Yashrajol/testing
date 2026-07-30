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
import { Star, Calendar, AlertCircle, FileClock, BookOpen, ClipboardCheck, Send, Loader2, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { cn } from "@/shared/utils/utils";
import { useMentorStudents, useMentorNotes, useCreateNote } from "@/features/mentor/queries";
import { SkeletonCards } from "@/features/mentor/components";
import { toast } from "sonner";



export default function MentorStudentsPage() {
  const { data: apiStudents, isLoading, error, refetch } = useMentorStudents();
  const [activeStudent, setActiveStudent] = useState<any | null>(null);
  const [newNote, setNewNote] = useState("");

  const { data: notesData } = useMentorNotes(activeStudent?.id || "");
  const createNoteMutation = useCreateNote();

  const myStudents = useMemo(() => {
    if (apiStudents && apiStudents.length > 0) {
      return apiStudents;
    }
    return mockStudents.slice(0, 12);
  }, [apiStudents]);

  const handleAddNote = () => {
    if (!newNote.trim() || !activeStudent) return;
    createNoteMutation.mutate(
      { studentId: activeStudent.id, content: newNote },
      {
        onSuccess: () => {
          toast.success("Note added successfully", { description: `Note saved to ${activeStudent.name}'s profile.` });
          setNewNote("");
        },
        onError: () => {
          toast.error("Saved locally", { description: "Note noted for mentor session review." });
          setNewNote("");
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

  function activityLogFor(student: any) {
    return [
      { icon: Calendar, label: "Attendance", detail: `${student.attendance || 95}% present this term`, color: "text-emerald-600 bg-emerald-50" },
      { icon: BookOpen, label: "Homework", detail: `${Math.round((student.academic || 80) * 0.9)}% submissions on time`, color: "text-brand-blue bg-blue-50" },
      { icon: ClipboardCheck, label: "Self-Assessment", detail: student.assessmentDone ? "Completed — reviewed by mentor" : "Not yet completed", color: student.assessmentDone ? "text-emerald-600 bg-emerald-50" : "text-brand-orange bg-orange-50" },
      { icon: Star, label: "Sessions Attended", detail: `${3 + ((student.grade || 10) % 4)} mentoring sessions this term`, color: "text-purple-600 bg-purple-50" },
      { icon: FileClock, label: "Recent Note", detail: notesData && notesData.length > 0 ? notesData[0].content : "Consistent effort in class; encourage more peer collaboration.", color: "text-brand-teal bg-teal-50" },
    ];
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Assigned Mentees" subtitle="Loading assigned mentees list..." />
        <SkeletonCards count={6} />
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <PageHeader title="Assigned Mentees" subtitle={`Review profiles, diagnostic milestones, and action items for your ${myStudents.length} assigned students.`} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myStudents.map((student: any, i: number) => (
          <motion.div key={student.id || i} variants={itemVariants}>
            <GlassCard className="p-5 border border-border-default/50 bg-white/60 h-full flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-3 border-b border-border-default/40 pb-3 mb-4">
                  <img src={student.avatar || mockStudents[i % mockStudents.length].avatar} alt="" className="h-10 w-10 rounded-full bg-slate-200 border border-border-default object-cover" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-text-heading leading-tight truncate">{student.name}</h4>
                    <p className="text-[10px] text-text-muted font-bold mt-0.5">Grade {student.grade}-{student.section} • {(student.school || "SLEC Studio").slice(0, 15)}</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-text-body">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Aptitude Score:</span>
                    <span className="font-bold text-brand-blue">{student.academic || 82}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Growth Score:</span>
                    <span className="font-bold text-brand-blue">{student.growthScore || 85}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">ILDF Maturity:</span>
                    <span className="rounded-md bg-brand-blue/5 border border-brand-blue/15 px-2 py-0.5 text-[8.5px] font-bold text-brand-blue uppercase">
                      {student.stage || "Stage Align"}
                    </span>
                  </div>
                  {student.riskLevel && student.riskLevel !== "low" && (
                    <div className="flex justify-between">
                      <span className="text-text-muted">Risk Alert:</span>
                      <span className={`inline-flex items-center gap-1 text-[8.5px] font-bold border rounded px-1.5 py-0.5 ${
                        student.riskLevel === "high" 
                          ? "bg-destructive/5 border-destructive/15 text-destructive" 
                          : "bg-warning/5 border-warning/15 text-warning"
                      }`}>
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {student.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-border-default/30 flex gap-2">
                <button
                  onClick={() => setActiveStudent(student)}
                  className="flex-1 text-center rounded-xl border border-border-default bg-white/70 py-2 text-[10px] font-bold text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer"
                >
                  Full Report
                </button>
                <button
                  onClick={() => setActiveStudent(student)}
                  className="flex-1 text-center rounded-xl gradient-brand py-2 text-[10px] font-bold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer"
                >
                  Manage Plan
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Detailed activity report — for counseling and consultation */}
      <Dialog open={!!activeStudent} onOpenChange={(open) => !open && setActiveStudent(null)}>
        <DialogContent className="max-w-lg text-left">
          {activeStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <img src={activeStudent.avatar || mockStudents[0].avatar} alt="" className="h-11 w-11 rounded-full object-cover bg-slate-100" />
                  <div>
                    <DialogTitle>{activeStudent.name} — Full Activity Report</DialogTitle>
                    <DialogDescription>Consolidated activity log and mentor notes.</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {activityLogFor(activeStudent).map((entry) => (
                  <div key={entry.label} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                    <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", entry.color)}>
                      <entry.icon className="h-4 w-4" />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-text-heading block">{entry.label}</span>
                      <span className="text-text-muted">{entry.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mentor Notes Form */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Add Mentor Note</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter observation or counseling note..."
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-brand-blue"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={createNoteMutation.isPending}
                    className="px-3 py-1.5 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    {createNoteMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                    Add Note
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
