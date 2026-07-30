import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { authenticatedFetch } from "@/shared/api/axios";
import {
  Check,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Building2,
  GraduationCap,
  Calendar,
  Layers,
  BarChart3,
  MessageSquare,
  FileText,
  Target,
  Brain,
  ChevronDown
} from "lucide-react";
import { GlassCard } from "@/shared/ui/glass-card";
import { toast } from "sonner";

export interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  tagline: string;
  price: string;
  gstText: string;
  perDayText?: string;
  gradient: string;
  accentBg: string;
  borderColor: string;
  badgeColor: string;
  buttonClass: string;
  features: string[];
}

export const SUBSCRIPTION_PLANS: PlanTier[] = [
  {
    id: "foundation",
    name: "V360 FOUNDATION",
    tagline: "Your First Step to a Better Tomorrow",
    price: "₹365",
    gstText: "+ GST",
    perDayText: "₹1 per day",
    gradient: "from-emerald-600 via-green-500 to-teal-500",
    accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    badgeColor: "bg-emerald-500 text-white",
    buttonClass: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200",
    features: [
      "AI-Based Pre-Assessment (V360)",
      "AI Mentorship",
      "3 Comprehensive Assessments per Year",
      "Student Dashboard",
      "Parent Dashboard",
      "Performance Reports",
      "365-Day Subscription"
    ]
  },
  {
    id: "premium",
    name: "V360 FOUNDATION PREMIUM",
    popular: true,
    badge: "MOST POPULAR",
    tagline: "More Assessments. More Mentors. More You.",
    price: "₹3,499",
    gstText: "+ GST",
    gradient: "from-brand-blue via-indigo-600 to-blue-500",
    accentBg: "bg-blue-50 text-brand-blue border-blue-200",
    borderColor: "border-brand-blue ring-2 ring-brand-blue/20",
    badgeColor: "bg-gradient-to-r from-brand-blue to-brand-teal text-white shadow-md",
    buttonClass: "bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-95 text-white shadow-lg shadow-blue-200",
    features: [
      "AI-Based Pre-Assessment (V360)",
      "10 Comprehensive Assessments per Year",
      "AI Mentor Access",
      "6 Dedicated Mentor Sessions (One every alternate month)",
      "Career Readiness Toolkit Access",
      "Skill Learning Modules",
      "Industry-Recognized Certification Programs",
      "Student & Parent Dashboard",
      "Personalized Performance Analytics"
    ]
  },
  {
    id: "campus",
    name: "VEDHKRIT CAMPUS MODEL",
    badge: "FOR INSTITUTIONS",
    tagline: "Complete Ecosystem for Schools & Institutions",
    price: "₹4,999",
    gstText: "+ GST",
    gradient: "from-purple-700 via-purple-600 to-indigo-600",
    accentBg: "bg-purple-50 text-purple-700 border-purple-200",
    borderColor: "border-purple-200 hover:border-purple-400",
    badgeColor: "bg-purple-700 text-white",
    buttonClass: "bg-purple-700 hover:bg-purple-800 text-white shadow-purple-200",
    features: [
      "Everything in V360 Foundation Premium, plus",
      "10 Advanced Assessment Programs",
      "Complete Learning Management System (LMS)",
      "Academic Content Library (Class 8–10)",
      "Chapter-wise Learning Modules",
      "Practice Tests & Mock Exams",
      "Homework & Assignment Management",
      "Institution Dashboard & Analytics",
      "Teacher & Batch Management",
      "Attendance & Progress Tracking",
      "Parent Communication Portal"
    ]
  }
];

export interface MatrixRow {
  feature: string;
  category?: string;
  foundation: string | boolean;
  premium: string | boolean;
  campus: string | boolean;
}

export const COMPARISON_MATRIX: MatrixRow[] = [
  { feature: "AI Pre-Assessment (V360)", foundation: true, premium: true, campus: true },
  { feature: "AI Mentorship", foundation: true, premium: true, campus: true },
  { feature: "Student Dashboard", foundation: true, premium: true, campus: true },
  { feature: "Parent Dashboard", foundation: true, premium: true, campus: true },
  { feature: "Performance Reports", foundation: true, premium: true, campus: true },
  { feature: "Comprehensive Assessments", foundation: "3", premium: "10", campus: "10" },
  { feature: "Dedicated Mentor Sessions", foundation: false, premium: "6", campus: "6" },
  { feature: "Career Readiness Toolkit", foundation: false, premium: true, campus: true },
  { feature: "Skill Learning Modules", foundation: false, premium: true, campus: true },
  { feature: "Certification Programs", foundation: false, premium: true, campus: true },
  { feature: "Advanced Assessment Programs", foundation: false, premium: false, campus: "10" },
  { feature: "LMS & Academic Content (Class 8–10)", foundation: false, premium: false, campus: true },
  { feature: "Tests, Assignments & Practice", foundation: false, premium: false, campus: true },
  { feature: "Institution Management & Analytics", foundation: false, premium: false, campus: true }
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<"all" | "students" | "schools">("all");
  const [selectedPlan, setSelectedPlan] = useState<PlanTier | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { data: apiPlans } = useQuery({
    queryKey: ['subscription', 'plans'],
    queryFn: () => authenticatedFetch('/api/v1/plans'),
    staleTime: 1000 * 60 * 5,
  });

  const displayPlans = useMemo(() => {
    const raw = Array.isArray(apiPlans)
      ? apiPlans
      : (apiPlans as any)?.data;
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map((p: any) => ({
        id: p.id || p.code?.toLowerCase() || 'plan',
        name: p.name,
        badge: p.badge,
        popular: Boolean(p.popular),
        tagline: p.tagline || 'Subscription Plan',
        price: p.price,
        gstText: p.gstText || '+ GST',
        perDayText: p.perDayText,
        gradient: p.popular ? "from-brand-blue via-indigo-600 to-blue-500" : p.targetAudience === 'SCHOOLS' ? "from-purple-700 via-purple-600 to-indigo-600" : "from-emerald-600 via-green-500 to-teal-500",
        accentBg: p.popular ? "bg-blue-50 text-brand-blue border-blue-200" : p.targetAudience === 'SCHOOLS' ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-emerald-50 text-emerald-700 border-emerald-200",
        borderColor: p.popular ? "border-brand-blue ring-2 ring-brand-blue/20" : "border-slate-200 hover:border-slate-400",
        badgeColor: p.popular ? "bg-gradient-to-r from-brand-blue to-brand-teal text-white shadow-md" : "bg-slate-800 text-white",
        buttonClass: p.popular ? "bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-95 text-white shadow-lg shadow-blue-200" : "bg-slate-900 hover:bg-slate-800 text-white",
        features: Array.isArray(p.features) ? p.features : typeof p.features_json === 'string' ? JSON.parse(p.features_json) : (SUBSCRIPTION_PLANS.find(s => s.name === p.name)?.features || [])
      }));
    }
    return SUBSCRIPTION_PLANS;
  }, [apiPlans]);

  const handleSelectPlan = (plan: PlanTier) => {
    setSelectedPlan(plan);
    toast.success(`Selected ${plan.name}`, {
      description: `Plan price: ${plan.price} ${plan.gstText}. Redirecting to enrollment...`
    });
  };

  const filteredPlans = displayPlans.filter(plan => {
    if (activeTab === "students") return plan.id !== "campus" && plan.id !== "plan-campus";
    if (activeTab === "schools") return plan.id === "campus" || plan.id === "plan-campus" || plan.id === "premium" || plan.id === "plan-premium";
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/20 to-slate-50 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto text-center space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-extrabold uppercase tracking-wider"
        >
          <Sparkles className="h-4 w-4 text-brand-orange" /> Subscription Plans for Classes 8–10
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
        >
          Smarter Assessment. Stronger Mentorship. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-teal via-brand-blue to-brand-orange bg-clip-text text-transparent">
            Brighter Tomorrow.
          </span>
        </motion.h1>

        <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base font-medium">
          Comprehensive AI-driven evaluation, dedicated 1:1 expert mentoring, and institutional learning tools designed for Classes 8–10.
        </p>

        {/* Top 3 Core Value Pillars */}
        <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-bold text-slate-700">
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl shadow-xs border border-slate-200/60">
            <Brain className="h-4 w-4 text-brand-teal" /> AI-Powered Learning Ecosystem
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl shadow-xs border border-slate-200/60">
            <Users className="h-4 w-4 text-brand-blue" /> Personalized Guidance
          </div>
          <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-2xl shadow-xs border border-slate-200/60">
            <Target className="h-4 w-4 text-brand-orange" /> Future Ready Skills
          </div>
        </div>

        {/* Plan Filter Tabs */}
        <div className="pt-6 flex justify-center">
          <div className="inline-flex rounded-2xl bg-slate-200/70 p-1.5 border border-slate-300/60 text-xs font-bold">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-xl transition-all ${
                activeTab === "all" ? "bg-white text-slate-900 shadow-md font-extrabold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Plans
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-5 py-2 rounded-xl transition-all ${
                activeTab === "students" ? "bg-white text-slate-900 shadow-md font-extrabold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              For Students & Parents
            </button>
            <button
              onClick={() => setActiveTab("schools")}
              className={`px-5 py-2 rounded-xl transition-all ${
                activeTab === "schools" ? "bg-white text-slate-900 shadow-md font-extrabold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              For Schools & Institutions
            </button>
          </div>
        </div>
      </div>

      {/* Main Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch mb-16">
        {filteredPlans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative rounded-3xl bg-white border ${plan.borderColor} p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all hover:-translate-y-1`}
          >
            {/* Header Badge */}
            {plan.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className={`px-4 py-1 rounded-full text-[11px] font-black tracking-wider uppercase ${plan.badgeColor}`}>
                  {plan.badge}
                </span>
              </div>
            )}

            <div>
              {/* Card Top Title */}
              <div className="space-y-2 pb-6 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">{plan.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{plan.tagline}</p>
              </div>

              {/* Price Banner */}
              <div className="my-6">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">{plan.gstText}</span>
                </div>
                {plan.perDayText && (
                  <div className="mt-1.5 inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                    {plan.perDayText}
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Plan Features:</p>
                <ul className="space-y-2.5 text-xs font-medium text-slate-700">
                  {plan.features.map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0 rounded-full p-0.5 bg-emerald-100 text-emerald-700">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Subscribe Action Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${plan.buttonClass}`}
              >
                Choose {plan.name.split(" ")[0]} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Feature Comparison Matrix Table & Impact Section */}
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-4 mb-16">
        {/* Comparison Matrix (3 Columns wide) */}
        <div className="lg:col-span-3 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-extrabold tracking-tight flex items-center gap-2">
                <Layers className="h-5 w-5 text-brand-teal" /> Feature Comparison Matrix
              </h3>
              <p className="text-xs text-slate-400">Detailed side-by-side feature comparison for Classes 8–10</p>
            </div>
            <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-800 text-brand-teal border border-slate-700">
              All prices exclusive of GST
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-700">
                  <th className="p-4 w-2/5">FEATURES</th>
                  <th className="p-4 text-center bg-emerald-50/60 text-emerald-900 w-1/5">V360 FOUNDATION</th>
                  <th className="p-4 text-center bg-blue-50/60 text-brand-blue w-1/5">V360 PREMIUM</th>
                  <th className="p-4 text-center bg-purple-50/60 text-purple-900 w-1/5">CAMPUS MODEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/80" : "bg-slate-50/30 hover:bg-slate-50/80"}>
                    <td className="p-4 font-semibold text-slate-900">{row.feature}</td>

                    {/* Foundation */}
                    <td className="p-4 text-center bg-emerald-50/20">
                      {typeof row.foundation === "boolean" ? (
                        row.foundation ? (
                          <Check className="h-4 w-4 text-emerald-600 mx-auto stroke-[3]" />
                        ) : (
                          <span className="text-slate-300 font-bold">—</span>
                        )
                      ) : (
                        <span className="font-extrabold text-emerald-700">{row.foundation}</span>
                      )}
                    </td>

                    {/* Premium */}
                    <td className="p-4 text-center bg-blue-50/20">
                      {typeof row.premium === "boolean" ? (
                        row.premium ? (
                          <Check className="h-4 w-4 text-brand-blue mx-auto stroke-[3]" />
                        ) : (
                          <span className="text-slate-300 font-bold">—</span>
                        )
                      ) : (
                        <span className="font-extrabold text-brand-blue">{row.premium}</span>
                      )}
                    </td>

                    {/* Campus */}
                    <td className="p-4 text-center bg-purple-50/20">
                      {typeof row.campus === "boolean" ? (
                        row.campus ? (
                          <Check className="h-4 w-4 text-purple-700 mx-auto stroke-[3]" />
                        ) : (
                          <span className="text-slate-300 font-bold">—</span>
                        )
                      ) : (
                        <span className="font-extrabold text-purple-800">{row.campus}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Our Impact Sidebar Card */}
        <div className="lg:col-span-1 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-600/10 border border-amber-200 p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-amber-500 text-white">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-900">Our Impact</h4>
                <p className="text-[11px] text-slate-500 font-medium">Why Vedhkrit Works</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Assess</h5>
                  <p className="text-[11px] text-slate-600 font-medium">Understand your strengths and aptitudes clearly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-100 text-brand-blue shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Mentor</h5>
                  <p className="text-[11px] text-slate-600 font-medium">Get 1:1 personalized expert academic guidance.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700 shrink-0">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Learn</h5>
                  <p className="text-[11px] text-slate-600 font-medium">Build 21st-century future-ready skills & career roadmaps.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Achieve</h5>
                  <p className="text-[11px] text-slate-600 font-medium">Be confident and ready for tomorrow's challenges.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/60 text-center">
            <Link
              to="/register"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all inline-flex items-center justify-center gap-1.5"
            >
              Get Started Now <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Audience Banner Cards */}
      <div className="max-w-7xl mx-auto grid gap-4 sm:grid-cols-3 mb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3 rounded-2xl bg-blue-50 text-brand-blue shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Designed for Classes 8–10</h5>
            <p className="text-xs text-slate-500 font-medium">Focused. Personalized. Future-Ready.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Your Journey. Our Tech.</h5>
            <p className="text-xs text-slate-500 font-medium">A Brighter Tomorrow for Every Learner.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4 shadow-xs">
          <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 shrink-0">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">For Students, Parents & Schools</h5>
            <p className="text-xs text-slate-500 font-medium">One Platform. Endless Possibilities.</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-display text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-500 font-medium">Everything you need to know about Vedhkrit subscription plans</p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Are prices inclusive or exclusive of GST?",
              a: "All listed plan prices (₹365, ₹3,499, ₹4,999) are exclusive of GST. Applicable 18% GST is automatically calculated during checkout."
            },
            {
              q: "Who is the V360 Foundation plan designed for?",
              a: "V360 Foundation is our introductory ₹1/day diagnostic plan for students in Classes 8–10 to take annual aptitude evaluations and receive baseline AI career recommendations."
            },
            {
              q: "How do 1:1 Mentor Sessions work in the Premium and Campus models?",
              a: "Under V360 Foundation Premium & Campus Model, students receive 6 dedicated 1-on-1 sessions scheduled every alternate month with verified STEM and career mentors."
            },
            {
              q: "Can a school deploy the Vedhkrit Campus Model for multiple batches?",
              a: "Yes! The Vedhkrit Campus Model includes full Institution Management, Teacher & Batch management, complete LMS content for Class 8–10, and parent communication portals."
            }
          ].map((faq, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-left flex justify-between items-center text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-brand-blue" /> {faq.q}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="p-4 pt-0 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
