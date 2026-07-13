import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { ListTodo, Flag, Calendar, MoreVertical, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/student/goals")({
  component: GoalsPage,
});

const shortTerm = [
  { title: "Finish Python Basics", due: "This Week", progress: 80, tasks: "4/5" },
  { title: "Apply for Summer Internship", due: "Next Week", progress: 20, tasks: "1/5" },
];

const longTerm = [
  { title: "Become AWS Certified", due: "6 Months", progress: 45, tasks: "12/26" },
  { title: "Graduate with Honors", due: "2 Years", progress: 70, tasks: "85/120 credits" },
];

function GoalsPage() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader title="Goal Tracking" subtitle="Manage your short-term objectives and long-term milestones." />
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-bold shadow-md hover:bg-brand-navy transition-colors shrink-0">
          <Plus className="h-4 w-4" /> New Goal
        </button>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        {/* Short Term Goals */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <ListTodo className="h-5 w-5 text-brand-orange" />
            <h3 className="text-lg font-bold text-text-heading">Short-Term Goals</h3>
          </div>
          <div className="space-y-4">
            {shortTerm.map((goal, i) => (
              <div key={i} className="border border-border-default rounded-xl p-4 bg-bg-secondary/30 hover:border-brand-orange/30 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-text-heading">{goal.title}</h4>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Due: {goal.due}</p>
                  </div>
                  <button className="text-text-muted hover:text-text-heading"><MoreVertical className="h-4 w-4" /></button>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-brand-orange">{goal.progress}% Complete</span>
                  <span className="text-text-muted">{goal.tasks} Tasks</span>
                </div>
                <div className="w-full bg-border-default rounded-full h-1.5">
                  <div className="bg-brand-orange h-1.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Long Term Goals */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Flag className="h-5 w-5 text-brand-teal" />
            <h3 className="text-lg font-bold text-text-heading">Long-Term Milestones</h3>
          </div>
          <div className="space-y-4">
            {longTerm.map((goal, i) => (
              <div key={i} className="border border-border-default rounded-xl p-4 bg-bg-secondary/30 hover:border-brand-teal/30 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-text-heading">{goal.title}</h4>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1"><Calendar className="h-3 w-3" /> Timeline: {goal.due}</p>
                  </div>
                  <button className="text-text-muted hover:text-text-heading"><MoreVertical className="h-4 w-4" /></button>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-brand-teal">{goal.progress}% Complete</span>
                  <span className="text-text-muted">{goal.tasks} completed</span>
                </div>
                <div className="w-full bg-border-default rounded-full h-1.5">
                  <div className="bg-brand-teal h-1.5 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
