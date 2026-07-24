import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { 
  User, 
  Mail, 
  Phone, 
  Users, 
  Save, 
  Camera, 
  Info, 
  Lock, 
  CheckCircle2, 
  Home, 
  AlertTriangle, 
  FileText, 
  Download, 
  Bell, 
  ShieldAlert, 
  Settings 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";
import { studentAvatar } from "@/shared/utils/avatars";

export const Route = createFileRoute("/dashboard/student/profile")({
  component: ProfileManagementPage,
  head: () => ({ meta: [{ title: "Student Profile — Vedhkrit" }] }),
});

interface DocumentItem {
  name: string;
  type: string;
  size: string;
}

function ProfileManagementPage() {
  const [activeTab, setActiveTab] = useState("Personal Information");

  // Initialize profile state from localStorage if available, or fall back to defaults
  const [profile, setProfile] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("vedhkrit_student_profile") : null;
    return saved ? JSON.parse(saved) : {
      name: "Yash Rajole",
      email: "yash.rajole@example.com",
      phone: "+91 9326461381",
      avatar: studentAvatar(0, 220),
      fatherName: "Rajesh Rajole",
      motherName: "Suneeta Rajole",
      guardianName: "N/A",
      occupation: "Business Executive",
      parentPhone: "+91 98765 01234",
      parentEmail: "rajesh.rajole@example.com",
      emergencyName: "Suneeta Rajole",
      emergencyRelation: "Mother",
      emergencyPhone: "+91 98765 56789",
      schoolName: "Delhi Public School",
      board: "CBSE",
      className: "Class IX",
      section: "A",
      rollNumber: "23",
      admissionNumber: "DPS-2024-8842",
      studentId: "VED-2026-0923",
      academicYear: "2026 - 2027",
      house: "Red House",
      busRoute: "Route 12 - Sector C"
    };
  });

  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    smsAlerts: true,
    emailAlerts: true,
    weeklyReports: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    setTimeout(() => {
      localStorage.setItem("vedhkrit_student_profile", JSON.stringify(profile));
      setSaving(false);
      toast.success("Profile details updated successfully!", {
        description: "Your changes have been saved to your student record.",
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      });
    }, 800);
  };

  const handleDownloadDoc = (name: string, size: string) => {
    toast.success(`Started downloading: ${name}`, {
      description: `File format: PDF (${size}). Saved to downloads folder.`,
      icon: <Download className="h-5 w-5 text-brand-blue" />
    });
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

  const tabs = [
    "Personal Information",
    "Academic Information",
    "Parent Details",
    "Documents",
    "Settings"
  ];

  const documentsList: DocumentItem[] = [
    { name: "Student Aadhaar Card copy", type: "PDF Document", size: "1.2 MB" },
    { name: "Birth Certificate", type: "PDF Document", size: "950 KB" },
    { name: "Class VIII Term Report Card", type: "PDF Document", size: "2.4 MB" },
    { name: "Vedhkrit Diagnostic Cognitive Aptitude Certificate", type: "PDF Document", size: "1.1 MB" }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader 
        title="Student Profile" 
        subtitle="Manage your personal details, parental contacts, view official registry details, and verify credentials." 
      />

      <div className="grid gap-6 lg:grid-cols-12 mt-6">
        {/* Left Side: Avatar Banner & Navigation Toggles */}
        <div className="lg:col-span-4 space-y-6">
          {/* Large Avatar Card */}
          <GlassCard className="p-6 text-center flex flex-col items-center bg-white border border-slate-100 shadow-xs">
            <div className="relative group cursor-pointer">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-brand-blue/15" 
              />
              <div className="absolute inset-0 bg-black/45 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200">
                <Camera className="h-6 w-6" />
              </div>
            </div>
            
            <h3 className="font-display text-base font-bold text-text-heading mt-4">{profile.name}</h3>
            <p className="text-[10px] text-text-muted mt-1">Student ID: {profile.studentId}</p>

            {/* Profile Completion Indicator */}
            <div className="w-full text-left mt-6">
              <div className="flex justify-between font-bold text-text-heading mb-1.5 text-[10px]">
                <span>Profile Completion</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <span className="text-[8.5px] text-text-muted mt-1.5 block font-semibold leading-normal">
                Add your Aadhaar Card to reach 100% completion.
              </span>
            </div>
          </GlassCard>

          {/* Account Settings Left Tabs */}
          <GlassCard className="p-4 bg-white border border-slate-100 shadow-xs">
            <div className="flex flex-col gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl text-xs font-bold transition-all cursor-pointer",
                    activeTab === tab 
                      ? "bg-brand-blue/5 text-brand-blue" 
                      : "text-text-heading hover:bg-slate-50"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Tab panel form editor */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSave}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
              >
                {/* TAB 1: PERSONAL INFORMATION */}
                {activeTab === "Personal Information" && (
                  <GlassCard className="p-6 bg-white border border-slate-100 space-y-6 text-left shadow-xs">
                    <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 border-b border-slate-55 pb-3">
                      <User className="h-4.5 w-4.5 text-brand-blue" /> Personal Information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-blue transition-colors text-text-body"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Email Address</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-450"><Mail className="h-3.5 w-3.5" /></span>
                          <input 
                            type="email" 
                            required
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-blue transition-colors text-text-body"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Mobile Number</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-455"><Phone className="h-3.5 w-3.5" /></span>
                          <input 
                            type="text" 
                            required
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-blue transition-colors text-text-body"
                          />
                        </div>
                      </div>
                    </div>

                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400 pt-4 border-t border-slate-50">
                      Emergency Contacts
                    </h4>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Contact Person</label>
                        <input 
                          type="text" 
                          required
                          value={profile.emergencyName}
                          onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-blue transition-colors text-text-body"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Relationship</label>
                        <input 
                          type="text" 
                          required
                          value={profile.emergencyRelation}
                          onChange={(e) => setProfile({ ...profile, emergencyRelation: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-blue transition-colors text-text-body"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Emergency Phone</label>
                        <input 
                          type="text" 
                          required
                          value={profile.emergencyPhone}
                          onChange={(e) => setProfile({ ...profile, emergencyPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-blue transition-colors text-text-body"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-50">
                      <button 
                        type="submit" 
                        disabled={saving}
                        className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        {saving ? "Saving Changes..." : "Save Changes"}
                      </button>
                    </div>
                  </GlassCard>
                )}

                {/* TAB 2: ACADEMIC INFORMATION */}
                {activeTab === "Academic Information" && (
                  <GlassCard className="p-6 bg-slate-50/50 border border-slate-100 space-y-6 text-left shadow-xs relative">
                    <div className="absolute top-6 right-6 text-slate-350">
                      <Lock className="h-5 w-5" />
                    </div>

                    <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Info className="h-4.5 w-4.5 text-brand-teal" /> School & Academic Details
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 text-xs font-bold text-text-muted">
                      {[
                        { label: "School Name", val: profile.schoolName },
                        { label: "Board", val: profile.board },
                        { label: "Class & Section", val: `${profile.className} - ${profile.section}` },
                        { label: "Roll Number", val: profile.rollNumber },
                        { label: "Admission Number", val: profile.admissionNumber },
                        { label: "Student ID", val: profile.studentId },
                        { label: "Academic Year", val: profile.academicYear },
                        { label: "House", val: profile.house },
                        { label: "Bus Route", val: profile.busRoute }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-white border border-slate-100 rounded-xl flex justify-between items-center shadow-2xs">
                          <span className="text-slate-400 font-medium">{item.label}</span>
                          <span className="text-text-heading font-extrabold">{item.val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl border border-brand-orange/15 bg-orange-50/50 text-[10.5px] text-brand-orange flex items-start gap-2.5">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-bold">Administrative Block Only</h5>
                        <p className="mt-0.5 leading-normal font-medium text-orange-950">
                          These fields are officially synchronized with school registry logs. To change houses or bus routes, please drop a mail to the class tutor or administrative branch desk.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                )}

                {/* TAB 3: PARENT DETAILS */}
                {activeTab === "Parent Details" && (
                  <GlassCard className="p-6 bg-white border border-slate-100 space-y-6 text-left shadow-xs">
                    <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 border-b border-slate-55 pb-3">
                      <Users className="h-4.5 w-4.5 text-brand-orange" /> Parent & Guardian Information
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Father Name</label>
                        <input 
                          type="text" 
                          required
                          value={profile.fatherName}
                          onChange={(e) => setProfile({ ...profile, fatherName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-orange transition-colors text-text-body"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Mother Name</label>
                        <input 
                          type="text" 
                          required
                          value={profile.motherName}
                          onChange={(e) => setProfile({ ...profile, motherName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-orange transition-colors text-text-body"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Guardian Name (Optional)</label>
                        <input 
                          type="text" 
                          value={profile.guardianName}
                          onChange={(e) => setProfile({ ...profile, guardianName: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-orange transition-colors text-text-body"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Father Occupation</label>
                        <input 
                          type="text" 
                          required
                          value={profile.occupation}
                          onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-orange transition-colors text-text-body"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Parent Mobile Number</label>
                        <input 
                          type="text" 
                          required
                          value={profile.parentPhone}
                          onChange={(e) => setProfile({ ...profile, parentPhone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-orange transition-colors text-text-body"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs font-bold">
                        <label className="text-text-heading">Parent Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={profile.parentEmail}
                          onChange={(e) => setProfile({ ...profile, parentEmail: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-orange transition-colors text-text-body"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-50">
                      <button 
                        type="submit" 
                        disabled={saving}
                        className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                      >
                        {saving ? "Saving Changes..." : "Save Changes"}
                      </button>
                    </div>
                  </GlassCard>
                )}

                {/* TAB 4: DOCUMENTS REGISTRY */}
                {activeTab === "Documents" && (
                  <GlassCard className="p-6 bg-white border border-slate-100 space-y-6 text-left shadow-xs">
                    <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 border-b border-slate-100 pb-3">
                      <FileText className="h-4.5 w-4.5 text-purple-650" /> Official Documents Registry
                    </h3>

                    <div className="space-y-3">
                      {documentsList.map((doc, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-purple-50 text-purple-650 rounded-xl flex items-center justify-center shrink-0">
                              <FileText className="h-4.5 w-4.5" />
                            </div>
                            <div className="text-left">
                              <h5 className="font-bold text-text-heading">{doc.name}</h5>
                              <p className="text-[9.5px] text-text-muted mt-0.5">{doc.type} • {doc.size}</p>
                            </div>
                          </div>
                          
                          <button 
                            type="button"
                            onClick={() => handleDownloadDoc(doc.name, doc.size)}
                            className="h-8 w-8 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl flex items-center justify-center cursor-pointer shrink-0"
                            title="Download PDF"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {/* TAB 5: SETTINGS */}
                {activeTab === "Settings" && (
                  <GlassCard className="p-6 bg-white border border-slate-100 space-y-6 text-left shadow-xs">
                    <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 border-b border-slate-55 pb-3">
                      <Settings className="h-4.5 w-4.5 text-brand-blue" /> Notification & Account Settings
                    </h3>

                    <div className="space-y-4">
                      {/* Switch 1 */}
                      <div className="flex justify-between items-center py-2 text-xs font-bold text-text-heading">
                        <div>
                          <span className="block">Enable SMS alerts for homework</span>
                          <span className="text-[9px] text-text-muted font-semibold mt-0.5">Send alerts direct to parent's phone</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={notifications.smsAlerts}
                          onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                          className="h-4.5 w-4.5 cursor-pointer accent-brand-blue"
                        />
                      </div>

                      {/* Switch 2 */}
                      <div className="flex justify-between items-center py-2 text-xs font-bold text-text-heading border-t border-slate-50">
                        <div>
                          <span className="block">Enable email announcements</span>
                          <span className="text-[9px] text-text-muted font-semibold mt-0.5">Receive newsletter announcements</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={notifications.emailAlerts}
                          onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                          className="h-4.5 w-4.5 cursor-pointer accent-brand-blue"
                        />
                      </div>
                    </div>

                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-red-500 pt-4 border-t border-slate-100">
                      Danger Zone
                    </h4>

                    <div className="p-4 rounded-xl border border-red-100 bg-red-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-xs">
                        <span className="font-bold text-red-700 flex items-center gap-1"><ShieldAlert className="h-4 w-4" /> Reset Portal Record Cache</span>
                        <p className="text-[9.5px] text-red-600 mt-1 leading-normal font-medium">Reset all local storage inputs to default settings.</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          if (confirm("Reset form? All unsaved inputs will be lost.")) {
                            localStorage.removeItem("vedhkrit_student_profile");
                            window.location.reload();
                          }
                        }}
                        className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        Reset Storage
                      </button>
                    </div>
                  </GlassCard>
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
