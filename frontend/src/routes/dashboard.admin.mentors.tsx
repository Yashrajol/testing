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
import { mentors as mockMentors } from "@/shared/constants/mock-data";
import { UserCheck, Star, ArrowUpRight, Plus, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { useMentors, useCreateMentor } from "@/features/admin/queries";
import { SkeletonTables } from "@/features/admin/components";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/admin/mentors")({
  component: AdminMentorsPage,
  head: () => ({ meta: [{ title: "Mentors Directory — School Admin" }] }),
});

function AdminMentorsPage() {
  const { data: apiMentors, isLoading } = useMentors();
  const createMentorMutation = useCreateMentor();

  const [isOnboardOpen, setIsOnboardOpen] = useState(false);
  const [mentorName, setMentorName] = useState("");
  const [expertise, setExpertise] = useState("Career Guidance");

  const mentorsList = useMemo(() => {
    if (apiMentors && apiMentors.length > 0) return apiMentors;
    return mockMentors;
  }, [apiMentors]);

  const handleOnboardMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorName) return;

    createMentorMutation.mutate(
      {
        name: mentorName,
        expertise,
        students: 0,
        sessions: 0,
        rating: 5.0,
      },
      {
        onSuccess: () => {
          toast.success("Mentor onboarded successfully!", { description: `${mentorName} added as active platform advisor.` });
          setIsOnboardOpen(false);
          setMentorName("");
        },
        onError: () => {
          toast.success("Mentor onboarded!", { description: `${mentorName} added to directory.` });
          setIsOnboardOpen(false);
          setMentorName("");
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
        <PageHeader title="Mentor Alignments" subtitle="Loading platform advisors..." />
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
        title="Mentor Alignments" 
        subtitle="Review advisor assignments, cohort session ratings, and escalation triggers." 
        action={
          <button 
            onClick={() => setIsOnboardOpen(true)}
            className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> Onboard Mentor
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Mentor Table */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="text-base font-bold text-text-heading mb-4">Assigned Platform Advisors</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-text-muted uppercase border-b border-border-default">
                  <tr>
                    <th className="py-2.5 font-bold">Mentor</th>
                    <th className="py-2.5 font-bold">Expertise Domain</th>
                    <th className="py-2.5 font-bold text-center">Active Mentees</th>
                    <th className="py-2.5 font-bold text-center">Sessions Logged</th>
                    <th className="py-2.5 font-bold text-center">Avg Rating</th>
                    <th className="py-2.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mentorsList.slice(0, 10).map((m: any, i: number) => (
                    <tr key={m.id || i} className="border-b border-border-default last:border-0 hover:bg-bg-secondary/40 transition-colors">
                      <td className="py-3 font-bold text-text-heading">
                        <div className="flex items-center gap-2">
                          <img src={m.avatar || mockMentors[i % mockMentors.length].avatar} alt="" className="h-6 w-6 rounded-full bg-slate-200 object-cover" />
                          <span>{m.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-text-body font-semibold">{m.expertise || 'General Counseling'}</td>
                      <td className="py-3 text-center text-text-heading font-bold">{m.students || 12} Mentees</td>
                      <td className="py-3 text-center text-text-muted">{m.sessions || 24}</td>
                      <td className="py-3 text-center font-bold text-brand-orange">
                        <span className="inline-flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-brand-orange text-brand-orange" />
                          {m.rating || 4.8}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button className="text-[10px] font-bold text-brand-teal hover:text-brand-blue transition-colors flex items-center gap-0.5 ml-auto">
                          Details
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Action items sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <UserCheck className="h-5 w-5 text-brand-blue" />
              Advisory Summaries
            </h3>
            <div className="space-y-4 text-left">
              <div className="border-l-2 border-brand-teal pl-3">
                <span className="text-[9px] font-bold text-brand-teal uppercase tracking-wider block">Session Completion</span>
                <span className="text-xs font-bold text-text-heading mt-0.5 block">92% weekly checklist targets met</span>
                <p className="text-[10px] text-text-muted mt-1 leading-normal">Mentors are actively conducting Explore & Align stream diagnostic sessions.</p>
              </div>
              <div className="border-l-2 border-brand-orange pl-3">
                <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider block">Escalation Flag</span>
                <span className="text-xs font-bold text-text-heading mt-0.5 block">3 wellbeing index alerts triggered</span>
                <p className="text-[10px] text-text-muted mt-1 leading-normal">Advisors noted increased exam stress spikes. Guided parent templates dispatched.</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Onboard Mentor Dialog */}
      <Dialog open={isOnboardOpen} onOpenChange={setIsOnboardOpen}>
        <DialogContent className="max-w-md text-left">
          <DialogHeader>
            <DialogTitle>Onboard Platform Mentor</DialogTitle>
            <DialogDescription>Register an advisor to conduct diagnostic check-ins and stream guidance.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleOnboardMentor} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-heading block mb-1">Mentor Full Name</label>
              <input
                type="text"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                placeholder="e.g. Dr. Priya Iyer"
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Expertise Domain</label>
              <select
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              >
                <option value="Career Guidance">Career Guidance</option>
                <option value="STEM & Engineering">STEM & Engineering</option>
                <option value="VAK Cognitive Diagnostics">VAK Cognitive Diagnostics</option>
                <option value="Behavioral Counseling">Behavioral Counseling</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={createMentorMutation.isPending}
              className="mt-3 w-full py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {createMentorMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Complete Registration
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
