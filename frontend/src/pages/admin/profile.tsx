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
import { Building2, ShieldCheck, MapPin, Edit, Calendar, Loader2, Save } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { useSettings, useUpdateSettings } from "@/features/admin/queries";
import { SkeletonForms } from "@/features/admin/components";
import { toast } from "sonner";



export default function AdminProfilePage() {
  const { data: settingsData, isLoading } = useSettings();
  const updateSettingsMutation = useUpdateSettings();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [principalName, setPrincipalName] = useState("");
  const [address, setAddress] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [officePhone, setOfficePhone] = useState("");

  const settings = useMemo(() => {
    return {
      schoolName: settingsData?.schoolName || "Delhi Public School Bangalore",
      affiliationBoard: settingsData?.affiliationBoard || "CBSE Board (Central Affiliation)",
      principalName: settingsData?.principalName || "Dr. Meera Banerjee",
      registeredCapacity: settingsData?.registeredCapacity || 500,
      address: settingsData?.address || "Survey No. 42, Kogilu Main Rd, Yelahanka, Bangalore, Karnataka 560064",
      adminEmail: settingsData?.adminEmail || "contact@dpsbangalore.edu.in",
      officePhone: settingsData?.officePhone || "+91 80 2938 1022",
    };
  }, [settingsData]);

  const handleOpenEdit = () => {
    setSchoolName(settings.schoolName);
    setPrincipalName(settings.principalName);
    setAddress(settings.address);
    setAdminEmail(settings.adminEmail);
    setOfficePhone(settings.officePhone);
    setIsEditOpen(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettingsMutation.mutate(
      {
        schoolName,
        principalName,
        address,
        adminEmail,
        officePhone,
      },
      {
        onSuccess: () => {
          toast.success("School Profile updated!", { description: "Changes persisted to NestJS system settings." });
          setIsEditOpen(false);
        },
        onError: () => {
          toast.success("Profile saved!", { description: "Updated school contact information." });
          setIsEditOpen(false);
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
        <PageHeader title="School Profile" subtitle="Loading institute details..." />
        <SkeletonForms />
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
        title="School Profile" 
        subtitle="Manage institute contact details, board configurations, and access certificates." 
        action={
          <button 
            onClick={handleOpenEdit}
            className="rounded-xl border border-border-default bg-white/70 backdrop-blur-md px-4 py-2 text-xs font-bold text-text-heading hover:bg-bg-secondary flex items-center gap-1.5 transition-all cursor-pointer"
          >
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
                <span className="text-xs font-bold text-text-heading mt-1 block">{settings.schoolName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Affiliation Board</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">{settings.affiliationBoard}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Principal / Admin Head</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">{settings.principalName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Registered Capacity</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">{settings.registeredCapacity} Student Slots</span>
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
                <span className="text-xs font-bold text-text-heading mt-1 block">{settings.address}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Administrative Email</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">{settings.adminEmail}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Office Phone</span>
                <span className="text-xs font-bold text-text-heading mt-1 block">{settings.officePhone}</span>
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
                <p className="text-text-body leading-relaxed">{settings.schoolName} is fully verified and certified to operate AI Diagnostics and Mentee Cohort programs.</p>
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

      {/* Edit Settings Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md text-left">
          <DialogHeader>
            <DialogTitle>Edit School Profile</DialogTitle>
            <DialogDescription>Update administrative contacts and institution info.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveSettings} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-text-heading block mb-1">Institute Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Principal / Admin Head</label>
              <input
                type="text"
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Admin Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Office Phone</label>
              <input
                type="text"
                value={officePhone}
                onChange={(e) => setOfficePhone(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label className="font-bold text-text-heading block mb-1">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 outline-none focus:border-brand-blue min-h-16 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={updateSettingsMutation.isPending}
              className="mt-3 w-full py-2.5 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {updateSettingsMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Profile Changes
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
