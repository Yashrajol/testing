import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { FileText, Download, Eye, Share2, Award, Calendar, CreditCard, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/reports")({
  component: ParentReportsPage,
  head: () => ({ meta: [{ title: "Report Card Center — Parent Portal" }] }),
});

const reportCards = [
  { 
    name: "Grade 10 Midterm Report Card", 
    desc: "Academic transcript and grades summary for CBSE Term 1.", 
    date: "Released Mar 15, 2026", 
    size: "1.4 MB", 
    type: "Academic",
    icon: FileText,
    color: "bg-blue-50 border-blue-100 text-brand-blue"
  },
  { 
    name: "DBDA Aptitude Diagnostic Summary", 
    desc: "Comprehensive diagnostic mapping cognitive and numerical strengths.",
    date: "Released Feb 10, 2026", 
    size: "2.8 MB", 
    type: "Aptitude",
    icon: Sparkles,
    color: "bg-cyan-50 border-cyan-100 text-brand-teal"
  },
  { 
    name: "21st Century Skills Profile", 
    desc: "Behavioral indexes covering communication, logic, and creativity metrics.",
    date: "Released Jan 20, 2026", 
    size: "850 KB", 
    type: "Skills",
    icon: Award,
    color: "bg-purple-50 border-purple-100 text-purple-600"
  },
  { 
    name: "Attendance Trend Report (Feb)", 
    desc: "Monthly consolidation check of student logins and late indicators.",
    date: "Released Feb 28, 2026", 
    size: "1.1 MB", 
    type: "Attendance",
    icon: Calendar,
    color: "bg-emerald-50 border-emerald-100 text-emerald-600"
  },
  { 
    name: "Mentor Advisory Assessment", 
    desc: "Lead counselor checklist notes and home activity recommendations.",
    date: "Released Mar 04, 2026", 
    size: "920 KB", 
    type: "Mentor Notes",
    icon: MessageSquare,
    color: "bg-amber-50 border-amber-100 text-brand-orange"
  },
  { 
    name: "Term 1 School Fee Receipt", 
    desc: "Official transaction slip for academic subscription fees.",
    date: "Released Jan 05, 2026", 
    size: "450 KB", 
    type: "Receipt",
    icon: CreditCard,
    color: "bg-slate-50 border-slate-100 text-slate-600"
  }
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
      className="space-y-6 text-left"
    >
      <PageHeader title="Report Center" subtitle="Download and preview your child's official school documents and receipts." />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((report, i) => (
          <motion.div key={i} variants={itemVariants}>
            <GlassCard className="p-5 border border-slate-100 bg-white hover:border-slate-200 transition-all flex flex-col justify-between h-full text-left">
              <div>
                <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-3.5">
                  <div className={`h-10 w-10 shrink-0 rounded-xl border flex items-center justify-center ${report.color}`}>
                    <report.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded bg-slate-150/60 px-2 py-0.5 text-[8.5px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                    {report.type}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display text-xs font-extrabold text-text-heading leading-tight truncate-2-lines">{report.name}</h4>
                  <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2">{report.desc}</p>
                </div>
                
                <div className="mt-4 flex items-center gap-2 text-[9.5px] text-slate-400 font-bold">
                  <span>{report.date}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{report.size}</span>
                </div>
              </div>

              <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2.5">
                <button className="flex-1 rounded-xl border border-slate-150 bg-white hover:bg-slate-50 py-2 text-[10.5px] font-bold text-text-heading flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                  <Eye className="h-3.5 w-3.5 text-slate-500" />
                  Preview
                </button>
                <button className="flex-1 rounded-xl border border-slate-150 bg-white hover:bg-slate-50 py-2 text-[10.5px] font-bold text-text-heading flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                  <Share2 className="h-3.5 w-3.5 text-slate-500" />
                  Share
                </button>
                <button className="rounded-xl gradient-brand p-2 text-white shadow-sm flex items-center justify-center shrink-0 cursor-pointer" title="Download PDF">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
