import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { schoolList } from "@/lib/mock-data";
import { Plus, Building2, MapPin, Users, Award, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/super/schools")({
  component: SuperSchoolsPage,
  head: () => ({ meta: [{ title: "Schools Directory — Super Admin" }] }),
});

function SuperSchoolsPage() {
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
        title="School Directory" 
        subtitle="Onboard, edit, and review client institutes and licensing metrics." 
        action={
          <button className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
            <Plus className="h-4 w-4 inline mr-1" />
            Onboard School
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schoolList.map((school, i) => (
          <motion.div key={i} variants={itemVariants}>
            <GlassCard className="p-5 border border-border-default/50 bg-white/60 h-full flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-3 border-b border-border-default/40 pb-3 mb-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-blue/5 border border-brand-blue/15 flex items-center justify-center text-brand-blue">
                    <Building2 className="h-5.5 w-5.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-text-heading leading-tight truncate">{school.name}</h4>
                    <p className="text-[9px] text-text-muted font-bold mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {school.city}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-text-body">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Students:</span>
                    <span className="font-bold text-text-heading">{school.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Faculty size:</span>
                    <span className="font-bold text-text-heading">{school.teachers} Instructors</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">License Package:</span>
                    <span className="rounded-md bg-brand-blue/5 border border-brand-blue/15 px-2 py-0.5 text-[8px] font-bold text-brand-blue uppercase">
                      {school.plan}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Monetization:</span>
                    <span className="font-bold text-brand-teal">₹{(school.revenue/1000).toFixed(0)}K MRR</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-border-default/30 flex gap-2">
                <button className="flex-1 text-center rounded-xl border border-border-default bg-white/70 py-2.5 text-[10px] font-bold text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
                  Configure
                </button>
                <button className="flex-1 text-center rounded-xl gradient-brand py-2.5 text-[10px] font-bold text-white shadow-sm hover:opacity-95 transition-all cursor-pointer">
                  View Analytics
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
