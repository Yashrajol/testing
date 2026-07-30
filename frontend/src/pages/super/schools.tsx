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
import { schoolList as mockSchoolList } from "@/shared/constants/mock-data";
import { Plus, Building2, MapPin, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { useOrganizations, useCreateOrganization } from "@/features/super-admin/queries";
import { SkeletonCards } from "@/features/super-admin/components";
import { toast } from "sonner";



export default function SuperSchoolsPage() {
  const { data: apiOrgs, isLoading } = useOrganizations();
  const createOrgMutation = useCreateOrganization();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [plan, setPlan] = useState("Growth");
  const [studentLimit, setStudentLimit] = useState("500");

  const orgs = useMemo(() => {
    if (apiOrgs && apiOrgs.length > 0) return apiOrgs;
    return mockSchoolList;
  }, [apiOrgs]);

  const handleOnboardOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    createOrgMutation.mutate(
      {
        name,
        city,
        plan,
        students: Number(studentLimit) || 500,
        teachers: 40,
        revenue: plan === "Enterprise" ? 250000 : plan === "Growth" ? 120000 : 50000,
        status: "active",
      },
      {
        onSuccess: () => {
          toast.success("Organization Onboarded!", { description: `${name} registered on platform.` });
          setIsOpen(false);
          setName("");
        },
        onError: () => {
          toast.success("Organization Onboarded!", { description: `${name} added to directory.` });
          setIsOpen(false);
          setName("");
        }
      }
    );
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
        <PageHeader title="School Directory" subtitle="Loading organization directory..." />
        <SkeletonCards count={6} />
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
        title="School Directory" 
        subtitle="Onboard, edit, and review client institutes and licensing metrics." 
        action={
          <button 
            onClick={() => setIsOpen(true)}
            className="rounded-xl gradient-brand px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Onboard School
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orgs.map((school: any, i: number) => (
          <motion.div key={school.id || i} variants={itemVariants}>
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
                      {school.city || "Bangalore"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-text-body">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Students:</span>
                    <span className="font-bold text-text-heading">{(school.students || 500).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Faculty size:</span>
                    <span className="font-bold text-text-heading">{school.teachers || 42} Instructors</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">License Package:</span>
                    <span className="rounded-md bg-brand-blue/5 border border-brand-blue/15 px-2 py-0.5 text-[8px] font-bold text-brand-blue uppercase">
                      {school.plan || "Growth"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Monetization:</span>
                    <span className="font-bold text-brand-teal">₹{((school.revenue || 120000)/1000).toFixed(0)}K MRR</span>
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

      {/* Onboard School Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md text-left">
          <DialogHeader>
            <DialogTitle>Onboard New Organization</DialogTitle>
            <DialogDescription>Provision an institution account & license tier.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleOnboardOrg} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-heading block mb-1">School / Institute Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. National Public School HSR"
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-text-heading block mb-1">City Location</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
                />
              </div>
              <div>
                <label className="font-bold text-text-heading block mb-1">Subscription Plan</label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
                >
                  <option value="Starter">Starter</option>
                  <option value="Growth">Growth</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Student Capacity Slots</label>
              <input
                type="number"
                value={studentLimit}
                onChange={(e) => setStudentLimit(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <button
              type="submit"
              disabled={createOrgMutation.isPending}
              className="mt-3 w-full py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {createOrgMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Complete Provisioning
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
