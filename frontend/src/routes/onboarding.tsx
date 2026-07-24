import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  User, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen,
  Link as LinkIcon,
  Target
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/shared/ui/logo";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
  head: () => ({ meta: [{ title: "Welcome to Vedhkrit — Account Setup" }] }),
});

function OnboardingPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "PARENT">("STUDENT");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Student Profile State
  const [studentGrade, setStudentGrade] = useState("10th Grade");
  const [learningGoal, setLearningGoal] = useState("AI, Coding & STEM Mastery");

  // Parent Profile State
  const [childMobileOrEmail, setChildMobileOrEmail] = useState("");

  const handleFinishOnboarding = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Profile setup done! Starting your free diagnostic assessment...");
      navigate({ to: "/assessments" });
    }, 800);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-white relative overflow-hidden px-4 py-8">
      {/* Subtle radial dot background matching AuthShell */}
      <div 
        className="absolute inset-0 opacity-[0.35] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', 
          backgroundSize: '20px 20px' 
        }} 
      />
      {/* Brand glowing accents */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-teal/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      {/* Header Branding */}
      <div className="text-center mb-6 z-10">
        <div className="flex justify-center mb-3">
          <Logo iconOnly size="md" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-[11px] font-bold text-brand-blue mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Vedhkrit Learner Setup
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          Customize Your Vedhkrit Experience
        </h1>
        <p className="text-xs text-slate-400 font-semibold mt-1 max-w-sm mx-auto">
          Set up your student grade & preferences to personalize your AI diagnostic assessment.
        </p>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-lg z-10"
      >
        <div className="relative rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-lg shadow-slate-100/50 overflow-hidden p-6 sm:p-7">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-teal via-brand-blue to-brand-orange" />

          <div className="space-y-5 pt-1 text-left">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-blue" /> Account Type
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Vedhkrit Direct Independent Learning Network
              </p>
            </div>

            {/* Role Switcher Tabs (Student & Parent Only) */}
            <div className="flex rounded-lg bg-slate-100 border border-slate-200/50 p-0.5">
              <button
                type="button"
                onClick={() => setSelectedRole("STUDENT")}
                className={`flex-1 text-center py-2 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                  selectedRole === "STUDENT"
                    ? "bg-white text-slate-800 shadow-xs border border-slate-200/20 font-black"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-brand-blue" />
                Vedhkrit Student
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("PARENT")}
                className={`flex-1 text-center py-2 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                  selectedRole === "PARENT"
                    ? "bg-white text-slate-800 shadow-xs border border-slate-200/20 font-black"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Users className="w-4 h-4 text-purple-600" />
                Parent Account
              </button>
            </div>

            {/* Profile Setup Forms */}
            <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-4">
              {selectedRole === "STUDENT" ? (
                <>
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-brand-blue" /> Grade & Academic Goals
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Class / Grade</label>
                      <select
                        value={studentGrade}
                        onChange={(e) => setStudentGrade(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium outline-none focus:border-brand-blue"
                      >
                        <option>8th Grade</option>
                        <option>9th Grade</option>
                        <option>10th Grade</option>
                        <option>11th Grade (Science / STEM)</option>
                        <option>12th Grade (Science / STEM)</option>
                        <option>Higher Secondary / Undergraduate</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Primary Learning Goal</label>
                      <div className="relative">
                        <Target className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          value={learningGoal}
                          onChange={(e) => setLearningGoal(e.target.value)}
                          placeholder="e.g. AI, Coding, JEE/NEET, or CBSE Board Exam"
                          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 font-medium outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4 text-purple-600" /> Link Student Account
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Child's Mobile Number or Email Address</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210 or aarav@example.com"
                      value={childMobileOrEmail}
                      onChange={(e) => setChildMobileOrEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-medium outline-none focus:border-purple-500"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      You can monitor attendance, diagnostic assessment reports, and mentor sessions.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinishOnboarding}
                className="w-full rounded-lg bg-gradient-to-r from-brand-teal to-brand-blue px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Saving Profile..." : "Save & Start Free Assessment"}{" "}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Back to Login Link */}
        <div className="mt-4 text-center text-xs text-slate-400 font-medium">
          <button onClick={() => navigate({ to: "/login" })} className="hover:text-slate-600 transition-colors cursor-pointer">
            ← Return to Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default OnboardingPage;
