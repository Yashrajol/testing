import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Building2, ShieldCheck, Mail, MapPin, Phone, Edit, Calendar } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/admin/profile")({
  component: AdminProfilePage,
  head: () => ({ meta: [{ title: "School Profile — School Admin" }] }),
});

function AdminProfilePage() {
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
        title="School Profile" 
        subtitle="Manage institute contact details, board configurations, and access certificates." 
        action={
          <button className="rounded-xl border border-border-default bg-white/70 backdrop-blur-md px-4 py-2 text-xs font-bold text-text-heading hover:bg-bg-secondary flex items-center gap-1.5 transition-all cursor-pointer">
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Info panel */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-brand-blue" />
              General Details
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2 text-xs text-text-body">
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Institute Name</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">Delhi Public School Bangalore</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Affiliation Board</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">CBSE Board (Central Affiliation)</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Principal / Admin Head</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">Dr. Meera Banerjee</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Registered Capacity</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">500 Student Slots</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-brand-teal" />
              Address & Contact
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2 text-xs text-text-body">
              <div className="sm:col-span-2">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Address</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">Survey No. 42, Kogilu Main Rd, Yelahanka, Bangalore, Karnataka 560064</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Administrative Email</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">contact@dpsbangalore.edu.in</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Office Phone</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">+91 80 2938 1022</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* License Verification Panel */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left flex flex-col justify-between h-full">
            <div>
              <h3 className="text-base font-bold text-text-heading flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-brand-teal" />
                License Verification
              </h3>
              <div className="p-4 rounded-2xl bg-teal-50/30 border border-brand-teal/20 text-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-brand-teal uppercase tracking-wider text-[9px]">Status</span>
                  <span className="font-bold text-brand-teal">Approved</span>
                </div>
                <p className="text-text-body leading-relaxed">Delhi Public School Bangalore is fully verified and certified to operate AI Diagnostics and Mentee Cohort programs.</p>
                <div className="mt-3.5 flex items-center gap-2 text-text-muted text-[10px] font-bold">
                  <Calendar className="h-4 w-4 text-brand-blue" />
                  Expires: June 2027
                </div>
              </div>
            </div>

            <button className="mt-6 w-full text-center rounded-xl gradient-brand py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
              Download Certificate
            </button>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
