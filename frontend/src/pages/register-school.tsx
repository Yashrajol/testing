import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Building2, School, User, Mail, Phone, Lock, MapPin, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/shared/ui/logo";
import { FormError } from "@/shared/ui/form-error";
import { useRegisterSchoolMutation } from "@/lib/api";

export const Route = createFileRoute("/register-school")({
  component: RegisterSchoolPage,
  head: () => ({ meta: [{ title: "Register Your School — Vedhkrit Partnership" }] }),
});

export default function RegisterSchoolPage() {
  const navigate = useNavigate();
  const registerSchoolMutation = useRegisterSchoolMutation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formError, setFormError] = useState<unknown>(null);

  // Form State
  const [schoolName, setSchoolName] = useState("");
  const [board, setBoard] = useState("CBSE");
  const [studentStrength, setStudentStrength] = useState("500-1000");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [contactName, setContactName] = useState("");
  const [designation, setDesignation] = useState("Principal");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [interests, setInterests] = useState<string[]>([
    "SLEC Experiential Labs",
    "ILDF Diagnostic Engine"
  ]);

  const toggleInterest = (item: string) => {
    setInterests(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (step === 1) {
      if (!schoolName || !city || !state) {
        setFormError("Please fill in School Name, City, and State.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!contactName || !email || !phone || !password) {
        setFormError("Please fill in Contact Name, Email, Mobile Phone, and Password.");
        return;
      }
      if (phone.replace(/\D/g, "").length < 10) {
        setFormError("Please enter a valid 10-digit mobile phone number.");
        return;
      }
      if (password.length < 8) {
        setFormError("Password must be at least 8 characters long.");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    registerSchoolMutation.mutate(
      {
        schoolName,
        board,
        studentStrength,
        city,
        state,
        contactName,
        designation,
        email,
        phone,
        password,
        interests,
      },
      {
        onSuccess: (data: any) => {
          toast.success("School partnership application submitted! Check your email for OTP verification.");
          navigate({ to: "/verify-otp", search: { email, devOtp: data?.devOtp || "" } });
        },
        onError: (err) => {
          setFormError(err);
          toast.error(err instanceof Error ? err.message : "School registration failed");
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
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-xl z-10"
      >
        {/* Main Registration Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xl overflow-hidden">
          {/* Header Accent Line */}
          <div className="h-1.5 bg-gradient-to-r from-brand-teal via-brand-blue to-brand-orange" />

          <div className="p-6 sm:p-8">
            {/* Logo & Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <Logo iconOnly size="md" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-navy/5 border border-brand-navy/10 text-[10px] font-bold text-brand-navy uppercase tracking-wider mb-2">
                <Building2 className="h-3.5 w-3.5 text-brand-orange" /> Institution Onboarding Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                School Partnership Registration
              </h1>
              <p className="mt-1 text-xs text-slate-500 font-semibold">
                Register your school to integrate Vedhkrit ILDF engine & SLEC labs.
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-6 px-2">
              {[
                { s: 1, title: "Institution Info" },
                { s: 2, title: "Contact Person" },
                { s: 3, title: "Requirements" },
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

            {/* Step 1: School Information */}
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    School / Institution Name *
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Greenwood International High School"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Board / Affiliation *
                    </label>
                    <select
                      value={board}
                      onChange={(e) => setBoard(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE / ISC">ICSE / ISC</option>
                      <option value="IB (International Baccalaureate)">IB</option>
                      <option value="IGCSE / Cambridge">IGCSE / Cambridge</option>
                      <option value="State Board">State Board</option>
                      <option value="Other">Other / Independent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Student Strength *
                    </label>
                    <select
                      value={studentStrength}
                      onChange={(e) => setStudentStrength(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      <option value="< 500">&lt; 500 Students</option>
                      <option value="500-1000">500 – 1,000 Students</option>
                      <option value="1000-2500">1,000 – 2,500 Students</option>
                      <option value="2500+">2,500+ Students</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Mumbai / Delhi"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Maharashtra / Delhi"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  Continue to Contact Details <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* Step 2: Contact Person Details */}
            {step === 2 && (
              <form onSubmit={handleNext} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Contact Person Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Dr. Rajesh Verma"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Designation *
                    </label>
                    <select
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all font-semibold"
                    >
                      <option value="Principal">Principal</option>
                      <option value="Director / Trustee">Director / Trustee</option>
                      <option value="Vice Principal">Vice Principal</option>
                      <option value="Academic Coordinator">Academic Coordinator</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Official Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="principal@greenwoodschool.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
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

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        placeholder="At least 8 chars"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>
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
                    Continue to Requirements <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Platform Requirements */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Select Programs of Interest
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "SLEC Experiential Labs",
                      "ILDF Diagnostic Engine",
                      "Teacher AI Copilots & Training",
                      "1:1 Student Mentorship",
                      "360° Parent Dashboard",
                      "Career Pathway Profiling"
                    ].map((item) => {
                      const isSelected = interests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                            isSelected
                              ? "bg-brand-blue/10 border-brand-blue text-brand-navy shadow-2xs"
                              : "bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <div className={`h-4 w-4 rounded flex items-center justify-center border ${isSelected ? "bg-brand-blue border-brand-blue text-white" : "border-slate-300 bg-white"}`}>
                            {isSelected && <CheckCircle2 className="h-3 w-3" />}
                          </div>
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 text-[11px] text-slate-600 leading-relaxed">
                  <div className="font-bold text-brand-navy flex items-center gap-1 mb-0.5">
                    <ShieldCheck className="h-4 w-4 text-brand-teal" /> Institutional Data Privacy
                  </div>
                  By registering, your institution agrees to Vedhkrit's data security guidelines and school partner service policy.
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={registerSchoolMutation.isPending}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={registerSchoolMutation.isPending}
                    className="flex-[2] rounded-xl bg-gradient-to-r from-brand-teal via-brand-blue to-brand-orange py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {registerSchoolMutation.isPending ? "Submitting Application..." : "Submit School Application"} <CheckCircle2 className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-4 text-center text-xs text-slate-500 font-medium">
          <Link to="/schools" className="hover:text-brand-blue transition-colors">
            ← Back to School Information Page
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
