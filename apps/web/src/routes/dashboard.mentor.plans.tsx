import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { students } from "@/lib/mock-data";
import { ClipboardList, Plus, AlertCircle, Edit, Check } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/mentor/plans")({
  component: MentorPlansPage,
  head: () => ({ meta: [{ title: "Action Plans — Mentor Portal" }] }),
});

const myStudents = students.slice(0, 8);

const activePlans = [
  { s: myStudents[0].name, p: "Stage Align: pick stream-fit electives by Apr 15", status: "In Progress", progress: 75 },
  { s: myStudents[3].name, p: "Stage Explore: complete 2 career-exploration tasks", status: "In Progress", progress: 40 },
  { s: myStudents[5].name, p: "Stage Discover: VAK assessment + reflection journal", status: "Completed", progress: 100 },
  { s: myStudents[7].name, p: "Stage Prepare: build mock-interview confidence", status: "Not Started", progress: 0 },
];

function MentorPlansPage() {
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
        title="Action Plans Builder" 
        subtitle="Construct milestones and skill-development plans for your assigned mentees." 
        action={
          <button className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
            <Plus className="h-4 w-4 inline mr-1" />
            Create Action Plan
          </button>
        }
      />

      <div className="grid gap-4">
        {activePlans.map((plan, i) => (
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
    </motion.div>
  );
}
