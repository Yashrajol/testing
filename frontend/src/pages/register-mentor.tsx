import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { UserCheck, User, Mail, Phone, Lock, Briefcase, GraduationCap, Clock, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Linkedin, FileText } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/shared/ui/logo";
import { FormError } from "@/shared/ui/form-error";
import { useRegisterMentorMutation } from "@/lib/api";

export const Route = createFileRoute("/register-mentor")({
  component: RegisterMentorPage,
  head: () => ({ meta: [{ title: "Apply as Mentor — Vedhkrit" }] }),
});

export default function RegisterMentorPage() {
  const navigate = useNavigate();
  const registerMentorMutation = useRegisterMentorMutation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [devOtp, setDevOtp] = useState("");
  const [formError, setFormError] = useState<unknown>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [domain, setDomain] = useState("STEM & Technology");
  const [qualification, setQualification] = useState("Master's Degree");
  const [experience, setExperience] = useState("3-5 years");
  const [organization, setOrganization] = useState("");

  const [availability, setAvailability] = useState("3-5 hours / week");
  const [targetGrades, setTargetGrades] = useState<string[]>(["Grades 9–10", "Grades 11–12"]);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const toggleGrade = (grade: string) => {
    setTargetGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (step === 1) {
      if (!fullName || !email || !phone || !city) {
        setFormError("Please fill in Full Name, Email, Mobile Phone, and City.");
        return;
      }
      if (phone.replace(/\D/g, "").length < 10) {
        setFormError("Please enter a valid 10-digit mobile phone number.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!organization) {
        setFormError("Please specify your Current Organization / University / Occupation.");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!password || password.length < 8) {
      setFormError("Password must be at least 8 characters long.");
      return;
    }

    registerMentorMutation.mutate(
      {
        fullName,
        email,
        phone,
        city,
        linkedin,
        domain,
        qualification,
        experience,
        organization,
        availability,
        targetGrades,
        bio,
        password,
      },
      {
        onSuccess: (data: any) => {
          setDevOtp(data?.devOtp || "");
          setSubmitted(true);
          toast.success("Mentor application submitted successfully!");
        },
        onError: (err) => {
          setFormError(err);
          toast.error(err instanceof Error ? err.message : "Mentor application failed");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden py-10 px-4">
      {/* Light grid background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.3] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', 
          backgroundSize: '24px 24px' 
        }} 
      />
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-teal/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl z-10"
      >
        {/* Main Application Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xl overflow-hidden">
          {/* Header Accent Line */}
          <div className="h-1.5 bg-gradient-to-r from-brand-teal via-brand-blue to-brand-orange" />

          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="text-center space-y-4 py-2">
                <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                    Application Submitted!
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold mt-1 max-w-md mx-auto">
                    Thank you for applying to join Vedhkrit's Mentor Network. Here is what will happen next:
                  </p>
                </div>

                <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4 text-left space-y-3">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-teal/10 text-brand-navy font-bold text-xs flex items-center justify-center shrink-0">1</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">OTP Mobile & Email Verification</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Verify your phone & email address using the code sent to your mobile.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-teal/10 text-brand-navy font-bold text-xs flex items-center justify-center shrink-0">2</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Background & Expertise Review</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Our institutional panel reviews your credentials and domain experience within 24 hours.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-teal/10 text-brand-navy font-bold text-xs flex items-center justify-center shrink-0">3</div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">ILDF Orientation & Portal Activation</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Upon approval, your Mentor Lounge account is activated to set availability & start 1:1 sessions.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <Link
                    to="/verify-otp"
                    search={{ email, devOtp }}
                    className="flex-1 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue py-2.5 text-xs font-bold text-white shadow-md hover:-translate-y-0.5 transition-all text-center"
                  >
                    Verify OTP Now
                  </Link>
                  <Link
                    to="/login"
                    className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all text-center"
                  >
                    Go to Login Page
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Logo & Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <Logo iconOnly size="md" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-2">
                <UserCheck className="h-3.5 w-3.5 text-brand-teal" /> Mentor Application Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                Apply as a Certified Mentor
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-semibold">
                Join Vedhkrit's global panel of educators & industry mentors.
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-6 px-2">
              {[
                { s: 1, title: "Personal Details" },
                { s: 2, title: "Expertise" },
                { s: 3, title: "Preferences" },
              ].map((item) => (
                <div key={item.s} className="flex items-center gap-2">
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step >= item.s
                        ? "bg-brand-navy text-white shadow-xs"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {step > item.s ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : item.s}
                  </div>
                  <span
                    className={`text-xs font-bold hidden sm:inline ${
                      step >= item.s ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <FormError error={formError} />

            {/* Step 1: Personal Details */}
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Vikram Malhotra"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Bengaluru / Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      LinkedIn Profile (Optional)
                    </label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  Continue to Expertise <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* Step 2: Professional Expertise */}
            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Primary Domain Expertise *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      <option value="STEM & Technology">STEM, Coding & Technology</option>
                      <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
                      <option value="Design & Creative Arts">Design, Media & Creative Arts</option>
                      <option value="Humanities & Social Sciences">Humanities & Social Sciences</option>
                      <option value="Child Psychology & Wellness">Child Psychology & Counseling</option>
                      <option value="Competitive Exam Prep">Competitive Entrance Exams (JEE/NEET/SAT)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Highest Qualification *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <select
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                      >
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree (M.Tech/MBA/M.Sc)</option>
                        <option value="Ph.D. / Doctorate">Ph.D. / Doctorate</option>
                        <option value="Professional License">Professional License / CA / Law</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Years of Experience *
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      <option value="1-3 years">1 – 3 years</option>
                      <option value="3-5 years">3 – 5 years</option>
                      <option value="5-10 years">5 – 10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Current Organization / Institution / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer at Tech Corp / Independent Educator"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
                  >
                    Continue to Preferences <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Mentoring Preferences & Password */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Weekly Availability *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      <option value="1-3 hours / week">1 – 3 hours / week</option>
                      <option value="3-5 hours / week">3 – 5 hours / week</option>
                      <option value="5-10 hours / week">5 – 10 hours / week</option>
                      <option value="10+ hours / week">10+ hours / week (Full Commitment)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Target Student Grades
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Grades 6–8", "Grades 9–10", "Grades 11–12"].map((g) => {
                      const isSelected = targetGrades.includes(g);
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleGrade(g)}
                          className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                            isSelected
                              ? "bg-brand-blue/10 border-brand-blue text-brand-navy shadow-2xs"
                              : "bg-slate-50/50 border-slate-200 text-slate-500 hover:bg-slate-100"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Brief Statement of Purpose / Bio
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us briefly why you wish to mentor Vedhkrit students..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Set Portal Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={registerMentorMutation.isPending}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={registerMentorMutation.isPending}
                    className="flex-[2] rounded-xl bg-gradient-to-r from-brand-teal via-brand-blue to-brand-orange py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {registerMentorMutation.isPending ? "Submitting Application..." : "Submit Mentor Application"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
        </div>

        {/* Back Link */}
        <div className="mt-4 text-center text-xs text-slate-500 font-medium">
          <Link to="/mentors" className="hover:text-brand-blue transition-colors">
            ← Back to Mentor Information Page
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
