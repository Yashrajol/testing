import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { FileText, Download, TrendingUp, BarChart3, Target } from "lucide-react";

export const Route = createFileRoute("/dashboard/student/reports")({
  component: ReportsPage,
});

const reports = [
  { term: "Fall 2026 Term Report", date: "Dec 15, 2026", type: "Comprehensive", size: "2.4 MB" },
  { term: "Spring 2026 Term Report", date: "May 20, 2026", type: "Comprehensive", size: "2.1 MB" },
  { title: "Mid-Term Skills Evaluation", date: "Oct 10, 2026", type: "Progress", size: "1.1 MB" }
];

function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports & Analytics" subtitle="Download term reports and review your holistic growth." />
      
      {/* Yearly Growth Summary */}
      <GlassCard className="mt-6 p-8 bg-linear-to-r from-brand-blue to-brand-navy border-none text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <TrendingUp className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2">Year-Over-Year Growth</h2>
          <p className="text-blue-100 mb-8 max-w-lg">Your academic performance has increased by 12% compared to last year. Your soft skills (Leadership, Communication) have shown the most significant improvement.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Overall GPA</p>
              <p className="text-3xl font-black">+0.4</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Skills Mastered</p>
              <p className="text-3xl font-black">14</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Goals Hit</p>
              <p className="text-3xl font-black">85%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-xs text-blue-200 font-bold uppercase tracking-wider mb-1">Attendance</p>
              <p className="text-3xl font-black">98%</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        {/* Downloadable Reports */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-text-heading flex items-center gap-2 mb-6">
            <FileText className="h-5 w-5 text-brand-blue" />
            Official Documents
          </h3>
          <div className="space-y-4">
            {reports.map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-border-default rounded-xl hover:bg-bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-heading text-sm">{report.term || report.title}</h4>
                    <p className="text-xs text-text-muted">{report.date} • {report.type}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-brand-blue hover:text-brand-navy transition-colors px-3 py-1.5 rounded-lg border border-brand-blue/20 hover:bg-brand-blue/5">
                  <Download className="h-4 w-4" /> PDF ({report.size})
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Analytics Breakdown */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-text-heading flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-brand-teal" />
            Performance Breakdown
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-text-heading flex items-center gap-2"><Target className="h-4 w-4 text-brand-teal" /> Academics</span>
                <span className="text-xs font-bold text-text-muted">Top 10%</span>
              </div>
              <div className="w-full bg-bg-secondary rounded-full h-2">
                <div className="bg-brand-teal h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-text-heading flex items-center gap-2"><Target className="h-4 w-4 text-brand-orange" /> Extra-Curricular</span>
                <span className="text-xs font-bold text-text-muted">Top 25%</span>
              </div>
              <div className="w-full bg-bg-secondary rounded-full h-2">
                <div className="bg-brand-orange h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-text-heading flex items-center gap-2"><Target className="h-4 w-4 text-brand-blue" /> Soft Skills</span>
                <span className="text-xs font-bold text-text-muted">Top 5%</span>
              </div>
              <div className="w-full bg-bg-secondary rounded-full h-2">
                <div className="bg-brand-blue h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
          
          <button className="w-full mt-8 py-2.5 bg-bg-secondary text-text-heading font-bold rounded-lg text-sm hover:bg-border-default transition-colors">
            View Full Analytics Dashboard
          </button>
        </GlassCard>
      </div>
    </>
  );
}
