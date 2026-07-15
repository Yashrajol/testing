import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { 
  User, School, Phone, Bell, Shield, Link2, 
  Save, Eye, EyeOff, Edit3, CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { studentAvatar } from "@/lib/avatars";

export const Route = createFileRoute("/dashboard/parent/profile")({
  component: ParentProfilePage,
  head: () => ({ meta: [{ title: "Profile Settings — Parent Portal" }] }),
});

function ParentProfilePage() {
  const [parentName, setParentName] = useState("Rohan Sharma");
  const [parentEmail, setParentEmail] = useState("rohan.sharma@example.com");
  const [parentPhone, setParentPhone] = useState("+91 98765 43210");
  const [parentAddress, setParentAddress] = useState("Flat 402, Green Glen Layout, Bellandur, Bangalore - 560103");
  
  const [emergencyContactName, setEmergencyContactName] = useState("Sunita Sharma");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("+91 98765 43211");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("Spouse (Mother)");

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [notifWeekly, setNotifWeekly] = useState(true);

  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left max-w-4xl"
    >
      <div className="flex justify-between items-end gap-3 flex-wrap">
        <PageHeader title="Profile Settings" subtitle="Manage your contact details, emergency links, and alert preferences." />
        {savedStatus && (
          <span className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 animate-bounce">
            <CheckCircle2 className="h-3.5 w-3.5" /> Saved Successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="grid gap-6 md:grid-cols-3">
        {/* Left Columns - Form Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Parent Information Card */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <User className="h-4.5 w-4.5 text-brand-blue" />
              Parent Information
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Full Name</label>
                <input 
                  type="text" 
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3.5 py-2.5 outline-none focus:border-brand-blue transition-colors font-medium text-text-body"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Email Address</label>
                <input 
                  type="email" 
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3.5 py-2.5 outline-none focus:border-brand-blue transition-colors font-medium text-text-body"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Phone Number</label>
                <input 
                  type="text" 
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3.5 py-2.5 outline-none focus:border-brand-blue transition-colors font-medium text-text-body"
                />
              </div>
              <div className="space-y-1.5 text-left sm:col-span-2">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Home Address</label>
                <textarea 
                  value={parentAddress}
                  onChange={(e) => setParentAddress(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3.5 py-2.5 outline-none focus:border-brand-blue transition-colors font-medium text-text-body resize-none"
                />
              </div>
            </div>
          </GlassCard>

          {/* Emergency Contact */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Phone className="h-4.5 w-4.5 text-brand-orange" />
              Emergency Contact
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-3 text-xs">
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Contact Person</label>
                <input 
                  type="text" 
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3.5 py-2.5 outline-none focus:border-brand-blue transition-colors font-medium text-text-body"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Contact Phone</label>
                <input 
                  type="text" 
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3.5 py-2.5 outline-none focus:border-brand-blue transition-colors font-medium text-text-body"
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Relationship</label>
                <input 
                  type="text" 
                  value={emergencyContactRelation}
                  onChange={(e) => setEmergencyContactRelation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/20 px-3.5 py-2.5 outline-none focus:border-brand-blue transition-colors font-medium text-text-body"
                />
              </div>
            </div>
          </GlassCard>

          {/* Notification Preferences */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Bell className="h-4.5 w-4.5 text-purple-500" />
              Alert Preferences
            </h3>
            
            <div className="space-y-3.5 text-xs text-text-body font-semibold">
              <div className="flex items-center justify-between p-1">
                <div>
                  <h4 className="font-bold text-text-heading">Email Notifications</h4>
                  <p className="text-[10px] text-text-muted font-medium mt-0.5">Receive reports downloads links and weekly summaries.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifEmail}
                  onChange={(e) => setNotifEmail(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-250 text-brand-blue focus:ring-brand-blue accent-brand-blue"
                />
              </div>
              <div className="flex items-center justify-between p-1">
                <div>
                  <h4 className="font-bold text-text-heading">SMS Alerts</h4>
                  <p className="text-[10px] text-text-muted font-medium mt-0.5">Instant alerts for student absence and emergency memos.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifSms}
                  onChange={(e) => setNotifSms(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-250 text-brand-blue focus:ring-brand-blue accent-brand-blue"
                />
              </div>
              <div className="flex items-center justify-between p-1">
                <div>
                  <h4 className="font-bold text-text-heading">Push notifications</h4>
                  <p className="text-[10px] text-text-muted font-medium mt-0.5">Real-time alerts for mentor feedback upload in the mobile companion app.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifPush}
                  onChange={(e) => setNotifPush(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-250 text-brand-blue focus:ring-brand-blue accent-brand-blue"
                />
              </div>
              <div className="flex items-center justify-between p-1">
                <div>
                  <h4 className="font-bold text-text-heading">Weekly Performance Digests</h4>
                  <p className="text-[10px] text-text-muted font-medium mt-0.5">A brief index recap of academic scores every Friday evening.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifWeekly}
                  onChange={(e) => setNotifWeekly(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-250 text-brand-blue focus:ring-brand-blue accent-brand-blue"
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Sidebar - Student Profile & School details */}
        <div className="space-y-6">
          {/* Child Metadata Profile */}
          <GlassCard className="p-5 border border-slate-100 bg-white shadow-card">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <School className="h-4.5 w-4.5 text-brand-teal" />
              Student Profile
            </h3>
            
            <div className="text-center pb-4 border-b border-slate-100">
              <img 
                src={studentAvatar(0)}
                alt="Child Avatar" 
                className="h-16 w-16 mx-auto rounded-full object-cover bg-slate-50 border border-slate-150" 
              />
              <h4 className="font-bold text-sm text-text-heading mt-2.5">Yash Rajole</h4>
              <span className="text-[9.5px] font-bold text-brand-teal bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                Roll No: 24 (CBSE Board)
              </span>
            </div>

            <div className="mt-4 space-y-3.5 text-left text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold">School Name:</span>
                <span className="font-bold text-text-heading">DPS Bangalore</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Current Class:</span>
                <span className="font-bold text-text-heading">Grade 10 - Section A</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Academic Session:</span>
                <span className="font-bold text-text-heading">2025 - 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Vedhkrit ID:</span>
                <span className="font-bold text-text-heading font-mono text-[10px]">VEDH-STU-0001</span>
              </div>
            </div>
          </GlassCard>

          {/* Privacy Details & Accounts */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Shield className="h-4.5 w-4.5 text-brand-navy" />
              Privacy & Accounts
            </h3>
            
            <div className="space-y-3 text-xs text-left">
              <div className="p-2.5 rounded-xl bg-slate-50/50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-text-heading">Security Passcode</h4>
                  <p className="text-[9.5px] text-text-muted mt-0.5">Required for viewing report files.</p>
                </div>
                <button type="button" className="text-[10px] text-brand-blue font-bold hover:underline cursor-pointer">Modify</button>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50/50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-text-heading">Connected Accounts</h4>
                  <p className="text-[9.5px] text-text-muted mt-0.5">Google account connected.</p>
                </div>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">Active</span>
              </div>
            </div>
          </GlassCard>

          <button 
            type="submit"
            className="w-full text-center rounded-xl gradient-brand py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            Save Profile Settings
          </button>
        </div>
      </form>
    </motion.div>
  );
}
