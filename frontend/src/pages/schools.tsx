import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { 
  Building2, 
  Sparkles, 
  Cpu, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  GraduationCap, 
  PhoneCall, 
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

const schoolBenefits = [
  {
    icon: Cpu,
    title: "SLEC Experiential Labs Integration",
    subtitle: "Turnkey Physical & Digital Studios",
    desc: "Transform traditional classrooms into state-of-the-art innovation hubs featuring Robotics, AI, Financial Literacy, Design Thinking, and Maker Spaces.",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50/80 border-blue-100 text-blue-600",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Diagnostic Engine",
    subtitle: "ILDF Framework Integration",
    desc: "Automatically map student aptitudes, learning styles, and future identity roadmaps without adding extra grading burdens to teachers.",
    color: "from-orange-500 to-amber-500",
    bgLight: "bg-orange-50/80 border-orange-100 text-orange-600",
  },
  {
    icon: BarChart3,
    title: "Institutional Leadership Dashboard",
    subtitle: "Real-Time Cohort Analytics",
    desc: "Gain deep insights into school-wide skill development, academic trajectory, attendance trends, and parent engagement metrics.",
    color: "from-teal-500 to-emerald-600",
    bgLight: "bg-teal-50/80 border-teal-100 text-teal-600",
  },
  {
    icon: Users,
    title: "Teacher AI Copilots & Upskilling",
    subtitle: "Reduced Admin Workload",
    desc: "Empower educators with AI-assisted lesson planning, differentiated instruction guides, and continuous professional development certification.",
    color: "from-purple-500 to-indigo-500",
    bgLight: "bg-purple-50/80 border-purple-100 text-purple-600",
  },
  {
    icon: Award,
    title: "Institutional Distinction & Branding",
    subtitle: "CBSE, ICSE, IB & State Alignment",
    desc: "Position your school as a pioneer in future-ready education, boosting parent admissions and national accreditation standings.",
    color: "from-pink-500 to-rose-600",
    bgLight: "bg-pink-50/80 border-pink-100 text-pink-600",
  },
  {
    icon: ShieldCheck,
    title: "Automated Parent Transparency",
    subtitle: "360° Growth Index Reports",
    desc: "Build trust with parents through weekly AI-generated growth reports, mentor notes, and clear career pathway tracking.",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50/80 border-emerald-100 text-emerald-600",
  },
];

const slecLabModules = [
  { name: "Robotics & Automation Studio", grade: "Grades 6–12", icon: Cpu },
  { name: "AI & Computational Intelligence", grade: "Grades 7–12", icon: Sparkles },
  { name: "Design Thinking & Prototyping", grade: "Grades 5–10", icon: Layers },
  { name: "Financial Literacy & Economy", grade: "Grades 8–12", icon: TrendingUp },
  { name: "Communication & Media Lab", grade: "Grades 6–12", icon: BookOpen },
  { name: "Sustainability & Bio-Tech Hub", grade: "Grades 7–12", icon: GraduationCap },
];

const partnerMetrics = [
  { label: "Partner Institutions", value: "45+", change: "Across 12 Cities" },
  { label: "Students Profiled", value: "18,500+", change: "Active ILDF Users" },
  { label: "Parent Satisfaction Rate", value: "98.4%", change: "Verified Reviews" },
  { label: "SLEC Labs Installed", value: "120+", change: "Turnkey Setup" },
];

const faqs = [
  {
    q: "How does Vedhkrit integrate with our existing school curriculum (CBSE/ICSE/IB)?",
    a: "Vedhkrit complements your existing academic curriculum. Our ILDF framework and SLEC labs plug directly into SUPW, Activity periods, STEM lab slots, or after-school enrichment programs without disturbing main timetable slots.",
  },
  {
    q: "What infrastructure is required to set up a SLEC Lab in our school?",
    a: "We provide turnkey solutions! We supply equipment, hardware kits, digital software licenses, teacher training, and curriculum workbooks. All your school needs is a standard 400–600 sq. ft. room space with internet access.",
  },
  {
    q: "Do our teachers need prior AI or Robotics experience?",
    a: "No! Vedhkrit provides complete on-site and virtual training for school faculty, complete with AI lesson copilots, step-by-step teaching guides, and dedicated support mentors.",
  },
  {
    q: "How long does school onboarding and implementation take?",
    a: "Initial onboarding and software portal activation takes less than 48 hours. Physical SLEC lab equipment setup and faculty training are typically completed within 7 to 10 business days.",
  },
];

export default function SchoolsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-16 sm:pt-20 pb-16 relative overflow-hidden">
      {/* Background Grid Pattern & Glows */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} 
      />
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center pt-4 sm:pt-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-xs font-bold text-brand-navy uppercase tracking-wider mb-4 shadow-2xs">
              <Building2 className="h-4 w-4 text-brand-orange" /> Partner With Vedhkrit For Institutions
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              Transform Your Institution Into a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-orange">
                Future-Ready Education Hub
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto font-medium">
              Empower your students with AI diagnostic profiling, turnkey SLEC experiential labs, and 360° growth tracking—delivering unmatched distinction for your school.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/register-school"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                Register Your School <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#benefits"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-blue shadow-2xs transition-all"
              >
                Explore Institutional Benefits
              </a>
            </div>
          </motion.div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            {partnerMetrics.map((m, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-xl p-4 shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-slate-800">{m.value}</div>
                <div className="text-xs font-bold text-brand-navy mt-0.5">{m.label}</div>
                <div className="text-[10px] font-medium text-slate-400 mt-1">{m.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div id="benefits" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Why Leading Schools Partner With Vedhkrit
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
              Comprehensive technology, hardware labs, and pedagogical frameworks designed to elevate your institution.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {schoolBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${b.bgLight} mb-4 group-hover:scale-110 transition-transform`}>
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-800 leading-snug">{b.title}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">{b.subtitle}</span>
                  <p className="text-xs text-slate-500 leading-relaxed mt-3 font-medium">{b.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-blue group-hover:text-blue-600">
                  <span>Learn implementation</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SLEC Labs Spotlight Banner */}
        <div className="mb-16 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-[10px] font-bold text-brand-orange uppercase tracking-widest">
                <Cpu className="h-3.5 w-3.5" /> SLEC Experiential Learning Studios
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                Setup Next-Gen SLEC Labs in Your Campus
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                SLEC (Skill & Experiential Learning Center) is Vedhkrit’s flagship physical-digital studio framework. We handle setup, equipment, software, and faculty certification.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                {slecLabModules.map((lab) => (
                  <div key={lab.name} className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-xl p-2.5 backdrop-blur-sm">
                    <lab.icon className="h-4 w-4 text-brand-orange shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white">{lab.name}</div>
                      <div className="text-[9px] text-slate-300 font-medium">{lab.grade}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md text-center">
              <Building2 className="h-12 w-12 text-brand-orange mb-3" />
              <h3 className="text-lg font-bold text-white">Ready for a Campus Visit & Demo?</h3>
              <p className="text-xs text-slate-300 mt-1 mb-5 font-medium">
                Our educational consultants will visit your school or schedule a virtual live demo.
              </p>
              <Link
                to="/register-school"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange hover:bg-orange-500 text-white font-bold text-xs py-3 shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Schedule School Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy uppercase tracking-wider">
              <HelpCircle className="h-4 w-4 text-brand-orange" /> Institutional FAQs
            </span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-brand-blue transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-90 text-brand-blue" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Strip */}
        <div className="bg-gradient-to-r from-brand-teal to-brand-blue text-white rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold">Join 45+ Pioneer Educational Institutions</h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
              Transform student outcomes and future readiness today. Register your school to get started.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/register-school"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Register School Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all"
              >
                <PhoneCall className="h-4 w-4" /> Speak to an Expert
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
