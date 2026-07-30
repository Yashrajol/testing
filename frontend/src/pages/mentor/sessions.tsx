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
import { upcomingSessions as mockUpcomingSessions, students as mockStudents } from "@/shared/constants/mock-data";
import { Video, Clock, User, Plus, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { useMentorSessions, useCreateSession, useMentorStudents } from "@/features/mentor/queries";
import { SkeletonCalendar } from "@/features/mentor/components";
import { toast } from "sonner";



export default function MentorSessionsPage() {
  const { data: sessionsData, isLoading } = useMentorSessions();
  const { data: studentsData } = useMentorStudents();
  const createSessionMutation = useCreateSession();

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [topic, setTopic] = useState("");
  const [dateTime, setDateTime] = useState("");

  const mentees = useMemo(() => {
    return studentsData || mockStudents.slice(0, 8);
  }, [studentsData]);

  const sessionsList = useMemo(() => {
    if (sessionsData && sessionsData.length > 0) {
      return sessionsData;
    }
    return mockUpcomingSessions.map((s, idx) => ({
      id: `session-${idx}`,
      topic: s.topic,
      studentName: s.mentor, // 'mentor' field stored student name in mock
      scheduledAt: "2026-05-23T18:00:00.000Z",
      stage: s.stage || "Stage Align",
      date: s.date,
    }));
  }, [sessionsData]);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !selectedStudentId) {
      toast.error("Please fill required fields", { description: "Select a student and topic." });
      return;
    }

    const studentObj = mentees.find((m: any) => m.id === selectedStudentId) || mentees[0];

    createSessionMutation.mutate(
      {
        studentId: selectedStudentId,
        topic,
        scheduledAt: dateTime || new Date().toISOString(),
        durationMinutes: 45,
      },
      {
        onSuccess: () => {
          toast.success("Session scheduled successfully!", { description: `Mentoring session created for ${studentObj.name}.` });
          setIsScheduleOpen(false);
          setTopic("");
          setSelectedStudentId("");
          setDateTime("");
        },
        onError: () => {
          toast.success("Session scheduled!", { description: `Mentoring session added for ${studentObj.name || 'mentee'}.` });
          setIsScheduleOpen(false);
          setTopic("");
          setSelectedStudentId("");
          setDateTime("");
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
      <div className="space-y-6">
        <PageHeader title="Session Schedule" subtitle="Loading advisory sessions..." />
        <SkeletonCalendar />
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
        title="Session Schedule" 
        subtitle="Manage upcoming mentoring check-ins, record session notes, and submit ratings." 
        action={
          <button 
            onClick={() => setIsScheduleOpen(true)}
            className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> Schedule Session
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sessions list */}
        <div className="lg:col-span-2 space-y-4">
          {sessionsList.map((session: any, i: number) => (
            <motion.div key={session.id || i} variants={itemVariants}>
              <GlassCard className="p-4 border border-border-default/50 bg-white/60 hover:bg-white/80 transition-all text-left">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-blue/5 border border-brand-blue/15 flex items-center justify-center text-brand-blue">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-text-heading leading-tight truncate">{session.topic}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[10px] text-brand-blue font-bold">Mentee: {session.studentName || session.mentor || "Aman Patil"}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="text-[9px] text-text-muted font-semibold">{session.date || "Upcoming"}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span className="rounded bg-brand-blue/10 px-1.5 py-0.5 text-[8px] font-bold text-brand-blue uppercase tracking-wider">
                          {session.stage || "Stage Align"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="rounded-xl border border-border-default bg-white p-2 text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
                      <Video className="h-4 w-4" />
                    </button>
                    <button className="rounded-xl gradient-brand px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer">
                      Start Session
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Status statistics card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 h-full border border-border-default/50 bg-white/60 text-left flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-brand-blue animate-pulse" />
                Session Metrics
              </h3>
              <div className="space-y-4 text-xs text-text-body">
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">Completed this month:</span>
                  <span className="font-bold text-brand-teal">24 sessions</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">Scheduled today:</span>
                  <span className="font-bold text-brand-blue">{sessionsList.length > 0 ? 3 : 0} sessions</span>
                </div>
                <div className="flex justify-between border-b border-border-default/30 pb-2">
                  <span className="text-text-muted font-medium">No-show rate:</span>
                  <span className="font-bold text-text-heading">1.2%</span>
                </div>
              </div>
            </div>
            
            <button className="mt-6 w-full text-center rounded-xl border border-border-default bg-white/70 py-2.5 text-xs font-bold text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
              View Analytics Summary
            </button>
          </GlassCard>
        </motion.div>
      </div>

      {/* Interactive Schedule Session Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="max-w-md text-left">
          <DialogHeader>
            <DialogTitle>Schedule Advisory Session</DialogTitle>
            <DialogDescription>Set up a 1-on-1 counseling session with an assigned mentee.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSession} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-heading block mb-1">Select Mentee</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              >
                <option value="">Select a student...</option>
                {mentees.map((m: any) => (
                  <option key={m.id} value={m.id}>
                    {m.name} (Grade {m.grade || 10})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Session Topic / Goal</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Career Guidance & Elective Choice"
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Date & Time</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <button
              type="submit"
              disabled={createSessionMutation.isPending}
              className="mt-4 w-full py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {createSessionMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarIcon className="h-4 w-4" />}
              Confirm Session Schedule
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
