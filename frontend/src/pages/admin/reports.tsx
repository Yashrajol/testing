import { } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { FileText, Download, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useReports } from "@/features/admin/queries";
import { SkeletonCards } from "@/features/admin/components";
import { useMemo } from "react";
import { toast } from "sonner";



const defaultReportCards = [
  { id: "REP001", name: "Academic Diagnostic Term 1 Summary", date: "Released Mar 12, 2026", size: "4.2 MB", status: "Published" },
  { id: "REP002", name: "School-wide DBDA Aptitude Spread", date: "Released Feb 28, 2026", size: "12.8 MB", status: "Published" },
  { id: "REP003", name: "ILDF Explorer Stage Cohort Analysis", date: "Released Feb 15, 2026", size: "3.5 MB", status: "Published" },
  { id: "REP004", name: "Grade 10 Career Readiness Audit", date: "Released Jan 30, 2026", size: "6.1 MB", status: "Draft" }
];

export default function AdminReportsPage() {
  const { data: reportsData, isLoading } = useReports();

  const reportList = useMemo(() => {
    if (reportsData && reportsData.length > 0) return reportsData;
    return defaultReportCards;
  }, [reportsData]);

  const handleGenerateReport = () => {
    toast.success("Generating diagnostic report", { description: "Compiling school-wide cognitive and growth metrics PDF." });
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
        <PageHeader title="Diagnostic Reports" subtitle="Loading school diagnostic outcomes..." />
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
        title="Diagnostic Reports" 
        subtitle="Manage, download, and publish school-wide diagnostic outcomes." 
        action={
          <button 
            onClick={handleGenerateReport}
            className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" /> Generate Report
          </button>
        }
      />

      <div className="grid gap-4">
        {reportList.map((report: any, i: number) => (
          <motion.div key={report.id || i} variants={itemVariants}>
            <GlassCard className="p-4 border border-border-default/50 bg-white/60 hover:bg-white/80 transition-all text-left">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-blue/5 border border-brand-blue/15 flex items-center justify-center text-brand-blue">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-text-heading leading-tight truncate">{report.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[9px] text-text-muted font-bold">{report.date}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className="text-[9px] text-text-muted font-bold">{report.size}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-bold border ${
                        report.status === "Published" 
                          ? "bg-teal-50 border-teal-150 text-brand-teal" 
                          : "bg-slate-50 border-border-default text-text-muted"
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-xl border border-border-default bg-white px-3 py-1.5 text-xs font-semibold text-text-heading hover:bg-bg-secondary flex items-center gap-1.5 transition-colors cursor-pointer">
                    Preview
                  </button>
                  <button className="rounded-xl gradient-brand px-3.5 py-1.5 text-xs font-bold text-white shadow-sm flex items-center gap-1.5 hover:opacity-95 transition-all cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                    Download
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
