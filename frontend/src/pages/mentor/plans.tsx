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
import { Plus, Edit, Loader2, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { useMentorStudents, useCreateNote } from "@/features/mentor/queries";
import { SkeletonCards } from "@/features/mentor/components";
import { toast } from "sonner";



export default function MentorPlansPage() {
  const { data: studentsData, isLoading } = useMentorStudents();
  const createNoteMutation = useCreateNote();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [planTitle, setPlanTitle] = useState("");
  const [stage, setStage] = useState("Stage Align");

  const [localPlans, setLocalPlans] = useState([
    { s: "Yash Rajole", p: "Stage Align: pick stream-fit electives by Apr 15", status: "In Progress", progress: 75 },
    { s: "Aman Patil", p: "Stage Explore: complete 2 career-exploration tasks", status: "In Progress", progress: 40 },
    { s: "Neha Mahajan", p: "Stage Discover: VAK assessment + reflection journal", status: "Completed", progress: 100 },
    { s: "Riya Sharma", p: "Stage Prepare: build mock-interview confidence", status: "Not Started", progress: 0 },
  ]);

  const mentees = useMemo(() => {
    return studentsData || mockStudents.slice(0, 8);
  }, [studentsData]);

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planTitle || !selectedStudentId) {
      toast.error("Required fields missing");
      return;
    }

    const studentObj = mentees.find((m: any) => m.id === selectedStudentId) || mentees[0];

    const newPlan = {
      s: studentObj.name,
      p: `${stage}: ${planTitle}`,
      status: "In Progress",
      progress: 25,
    };

    setLocalPlans([newPlan, ...localPlans]);

    createNoteMutation.mutate({
      studentId: selectedStudentId,
      content: `Created Action Plan [${stage}]: ${planTitle}`,
    });

    toast.success("Action Plan created!", { description: `New plan assigned to ${studentObj.name}.` });
    setIsModalOpen(false);
    setPlanTitle("");
    setSelectedStudentId("");
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
        <PageHeader title="Action Plans Builder" subtitle="Loading action plans..." />
        <SkeletonCards count={4} />
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
        title="Action Plans Builder" 
        subtitle="Construct milestones and skill-development plans for your assigned mentees." 
        action={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Create Action Plan
          </button>
        }
      />

      <div className="grid gap-4">
        {localPlans.map((plan, i) => (
          <motion.div key={i} variants={itemVariants}>
            <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-bold text-xs text-text-heading leading-tight">{plan.s}</h4>
                    <span className="h-1 w-1 rounded-full bg-slate-350" />
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-bold border ${
                      plan.status === "Completed" 
                        ? "bg-teal-50 border-teal-150 text-brand-teal" 
                        : plan.status === "In Progress"
                        ? "bg-brand-blue/5 border-brand-blue/20 text-brand-blue"
                        : "bg-slate-50 border-border-default text-text-muted"
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-body font-semibold">{plan.p}</p>
                  
                  <div className="mt-3.5 flex items-center gap-2 max-w-sm">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 border border-border-default/20">
                      <div className="h-full bg-brand-blue rounded-full" style={{ width: `${plan.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-brand-blue shrink-0">{plan.progress}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button className="rounded-xl border border-border-default bg-white p-2 text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="rounded-xl gradient-brand px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer">
                    Inspect Logs
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Modal for Creating Action Plan */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md text-left">
          <DialogHeader>
            <DialogTitle>Create Mentee Action Plan</DialogTitle>
            <DialogDescription>Set milestone goals for personalized development.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePlan} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-heading block mb-1">Assigned Student</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              >
                <option value="">Select a mentee...</option>
                {mentees.map((m: any) => (
                  <option key={m.id} value={m.id}>
                    {m.name} (Grade {m.grade || 10})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Framework Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              >
                <option value="Stage Discover">Stage Discover</option>
                <option value="Stage Align">Stage Align</option>
                <option value="Stage Explore">Stage Explore</option>
                <option value="Stage Prepare">Stage Prepare</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Action Goal Description</label>
              <textarea
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                placeholder="e.g. Complete VAK diagnostic reflection and select PCM electives"
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue min-h-20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={createNoteMutation.isPending}
              className="mt-3 w-full py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {createNoteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Save & Dispatch Plan
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
