import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { FileQuestion, CheckCircle2, Clock, BarChart3, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/dashboard/student/assessments")({
  component: AssessmentsPage,
});

const pending = [
  { title: "Mid-Term Mathematics", type: "Standardized", due: "Oct 25, 2026", questions: 50, duration: "60 mins" },
  { title: "Python Fundamentals", type: "Skill Test", due: "Oct 28, 2026", questions: 30, duration: "45 mins" }
];

const completed = [
  { title: "Quarter 1 Physics", date: "Sep 15, 2026", score: 92, percentile: 88, status: "Passed" },
  { title: "Data Structures Diagnostic", date: "Sep 01, 2026", score: 78, percentile: 65, status: "Passed" }
];

function AssessmentsPage() {
  return (
    <>
      <PageHeader title="Assessments" subtitle="Track your pending tests and review detailed score breakdowns." />
      
      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        {/* Pending Assessments */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text-heading flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand-orange" />
            Pending Tests
          </h3>
          <div className="space-y-4">
            {pending.map((test, i) => (
              <GlassCard key={i} className="p-5 border-l-4 border-l-brand-orange hover:bg-bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                    {test.type}
                  </span>
                  <span className="text-xs font-bold text-brand-orange flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Due: {test.due}
                  </span>
                </div>
                <h4 className="font-bold text-text-heading text-lg mb-1">{test.title}</h4>
                <div className="flex items-center gap-4 text-xs font-semibold text-text-muted mb-4">
                  <span className="flex items-center gap-1"><FileQuestion className="h-3 w-3" /> {test.questions} Questions</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {test.duration}</span>
                </div>
                <button className="w-full py-2 bg-brand-orange text-white font-bold rounded-lg text-sm shadow-md hover:bg-orange-600 transition-colors">
                  Start Assessment
                </button>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Completed Assessments */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text-heading flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand-teal" />
            Completed Tests
          </h3>
          <div className="space-y-4">
            {completed.map((test, i) => (
              <GlassCard key={i} className="p-5 hover:bg-bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-text-heading">{test.title}</h4>
                    <p className="text-xs text-text-muted mt-0.5">Taken on {test.date}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded">
                    {test.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-bg-primary rounded-lg p-3 border border-border-default text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">Score</p>
                    <p className="text-xl font-black text-brand-blue">{test.score}%</p>
                  </div>
                  <div className="bg-bg-primary rounded-lg p-3 border border-border-default text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">Percentile</p>
                    <p className="text-xl font-black text-brand-teal">{test.percentile}th</p>
                  </div>
                </div>

                <button className="w-full py-2 border-2 border-border-default text-text-heading font-bold rounded-lg text-sm hover:border-brand-teal hover:text-brand-teal transition-colors flex items-center justify-center gap-2">
                  <BarChart3 className="h-4 w-4" /> View Detailed Analysis
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
