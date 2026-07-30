import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { 
  UserCheck, 
  Sparkles, 
  Clock, 
  Award, 
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  Compass, 
  Briefcase, 
  Video 
} from "lucide-react";
import { useState } from "react";

const mentorPerks = [
  {
    icon: Heart,
    title: "High-Impact Purposeful Mentoring",
    subtitle: "Guide Students Ages 12–18",
    desc: "Make a real difference in young lives by helping them discover their strengths, choose stream pathways, and build future-proof career identities.",
    bgLight: "bg-red-50/80 border-red-100 text-red-500",
  },
  {
    icon: Sparkles,
    title: "AI Diagnostic Copilot",
    subtitle: "Data-Backed Session Insights",
    desc: "Never go in blind. Every session is backed by our AI analysis engine detailing the student's learning style, DBDA aptitude, and progress metrics.",
    bgLight: "bg-orange-50/80 border-orange-100 text-orange-600",
  },
  {
    icon: Clock,
    title: "100% Remote & Flexible Hours",
    subtitle: "Work on Your Terms",
    desc: "Set your own weekly availability slots. Mentor from anywhere in the world with integrated video calling and interactive session tools.",
    bgLight: "bg-teal-50/80 border-teal-100 text-teal-600",
  },
  {
    icon: Award,
    title: "Competitive Honorarium & Perks",
    subtitle: "Rewarding Growth Model",
    desc: "Earn attractive per-session honorarium rates, performance bonuses, and official certification as a Vedhkrit Certified Mentor.",
    bgLight: "bg-blue-50/80 border-blue-100 text-blue-600",
  },
  {
    icon: Compass,
    title: "Structured ILDF Framework",
    subtitle: "Pre-Built Guided Roadmaps",
    desc: "Access structured 4-phase mentoring templates so every session has clear milestone goals, action items, and parent feedback notes.",
    bgLight: "bg-purple-50/80 border-purple-100 text-purple-600",
  },
  {
    icon: Briefcase,
    title: "Elite Professional Network",
    subtitle: "Connect with Global Experts",
    desc: "Join a curated community of IIT/IIM alumni, researchers, software architects, corporate leaders, and child psychologists.",
    bgLight: "bg-emerald-50/80 border-emerald-100 text-emerald-600",
  },
];

const onboardingSteps = [
  {
    num: "01",
    title: "Apply Online",
    desc: "Submit your professional profile, domain expertise, and mentoring motivation.",
    icon: Briefcase,
  },
  {
    num: "02",
    title: "Profile Verification",
    desc: "Our team reviews your qualifications, credentials, and background experience.",
    icon: ShieldCheck,
  },
  {
    num: "03",
    title: "ILDF Orientation",
    desc: "Complete a quick orientation on using our AI diagnostic dashboard and session tools.",
    icon: Compass,
  },
  {
    num: "04",
    title: "Start Mentoring",
    desc: "Get paired with students matching your expertise and begin conducting 1:1 sessions.",
    icon: Video,
  },
];

const mentorProfiles = [
  {
    name: "Dr. Ananya Sen",
    expertise: "Cognitive Development & STEM Pathway",
    education: "Ph.D. in Child Psychology, Stanford University",
    rating: "4.9",
    students: "128",
    sessions: "940+",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=ananya",
    quote: "Vedhkrit's AI diagnostic data gives me instant clarity into each student's cognitive map before the session even starts."
  },
  {
    name: "Raghav Deshmukh",
    expertise: "Global Entrance Prep & Career Architect",
    education: "MBA, INSEAD; B.Tech, IIT Bombay",
    rating: "4.8",
    students: "154",
    sessions: "1,120+",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=raghav",
    quote: "Helping students connect academic choices to real-world career identities is the most fulfilling part of my week."
  },
  {
    name: "Meera Nair",
    expertise: "Behavioral Coaching & SEL Advisor",
    education: "M.Sc. in Counselor Education, University of Delhi",
    rating: "4.9",
    students: "96",
    sessions: "730+",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=meera",
    quote: "The flexible remote scheduling fits seamlessly into my consulting practice while generating meaningful monthly income."
  }
];

const faqs = [
  {
    q: "Who is eligible to become a Vedhkrit Mentor?",
    a: "We welcome working professionals, educators, researchers, corporate leaders, entrepreneurs, and postgraduate scholars with strong domain expertise and a passion for guiding young learners.",
  },
  {
    q: "How many hours per week do I need to commit?",
    a: "It's completely flexible! Mentors typically commit anywhere from 3 to 10 hours per week based on their schedule and availability.",
  },
  {
    q: "How are session honorariums paid?",
    a: "Honorarium payments are calculated on a per-session basis and transferred directly to your bank account on a bi-weekly schedule.",
  },
  {
    q: "Do I receive training before conducting sessions?",
    a: "Yes! Every approved mentor undergoes a comprehensive orientation covering the ILDF framework, AI report interpretation, and student interaction ethics.",
  },
];

export default function MentorsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-16 sm:pt-20 pb-16 relative overflow-hidden">
      {/* Grid Pattern and Glows */}
      <div 
        className="absolute inset-0 opacity-[0.25] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} 
      />
      <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-brand-teal/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Header */}
        <div className="mx-auto max-w-4xl text-center pt-4 sm:pt-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-xs font-bold text-brand-navy uppercase tracking-wider mb-4 shadow-2xs">
              <UserCheck className="h-4 w-4 text-brand-teal" /> Become a Certified Vedhkrit Mentor
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              Inspire the Next Generation.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-blue to-indigo-600">
                Mentoring Backed by AI Data.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto font-medium">
              Join our global panel of mentors. Guide motivated students, leverage deep psychometric insights, and work on your own flexible schedule.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/register-mentor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                Apply to Become a Mentor <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#perks"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-blue shadow-2xs transition-all"
              >
                Explore Mentor Benefits
              </a>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div id="perks" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Why Mentors Love Vedhkrit
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
              Everything you need to deliver high-impact coaching while growing your professional footprint.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mentorPerks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center border ${p.bgLight} mb-4`}>
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-800 leading-snug">{p.title}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">{p.subtitle}</span>
                  <p className="text-xs text-slate-500 leading-relaxed mt-3 font-medium">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Onboarding Workflow */}
        <div className="mb-16 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 text-xs font-bold text-brand-navy uppercase tracking-wider mb-2">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-8">
            How to Become a Certified Mentor
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {onboardingSteps.map((step) => (
              <div key={step.num} className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-5 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-300">STEP {step.num}</span>
                  <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-brand-navy">
                    <step.icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="font-extrabold text-sm text-slate-800">{step.title}</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Mentors */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Meet Active Vedhkrit Mentors
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
              Join hundreds of educators and domain leaders already guiding student roadmaps.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {mentorProfiles.map((m) => (
              <div key={m.name} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={m.avatar} alt={m.name} className="h-12 w-12 rounded-full border border-slate-100 bg-slate-50" />
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800">{m.name}</h3>
                      <p className="text-[10px] text-slate-400 font-bold">{m.expertise}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
                    "{m.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-brand-orange">
                    <Star className="h-3.5 w-3.5 fill-brand-orange text-current" /> {m.rating}
                  </span>
                  <span>{m.students} Mentees</span>
                  <span>{m.sessions} Sessions</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy uppercase tracking-wider">
              <HelpCircle className="h-4 w-4 text-brand-orange" /> Mentor FAQs
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
            <h2 className="text-xl sm:text-2xl font-bold">Ready to Start Mentoring?</h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
              Submit your application in less than 3 minutes and join our certified mentor network.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                to="/register-mentor"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Apply as Mentor <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
