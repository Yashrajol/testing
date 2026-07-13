import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { FileText, Download, Eye, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/reports")({
  component: ParentReportsPage,
  head: () => ({ meta: [{ title: "Report Card Center — Parent Portal" }] }),
});

const reportCards = [
  { name: "Grade 10 Midterm Report Card", date: "Released Mar 15, 2026", size: "1.4 MB", type: "Academic" },
  { name: "DBDA Aptitude Diagnostic Summary", date: "Released Feb 10, 2026", size: "2.8 MB", type: "Aptitude" },
  { name: "21st Century Skills Baseline profile", date: "Released Jan 20, 2026", size: "850 KB", type: "Skills" },
  { name: "VAK Learning Style Assessment", date: "Released Jan 15, 2026", size: "1.1 MB", type: "Aptitude" }
];

function ParentReportsPage() {
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
      <PageHeader title="Report Center" subtitle="Download and inspect Aarav's academic reports and diagnostics." />

      <div className="grid gap-4">
        {reportCards.map((report, i) => (
          <motion.div key={i} variants={itemVariants}>
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
                      <span className="rounded bg-brand-blue/10 px-1.5 py-0.5 text-[8px] font-bold text-brand-blue uppercase tracking-wider">
                        {report.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="rounded-xl border border-border-default bg-white px-3 py-1.5 text-xs font-semibold text-text-heading hover:bg-bg-secondary flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Eye className="h-3.5 w-3.5" />
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
