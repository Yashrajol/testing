import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Monitor, Lightbulb, MessageSquare, BookOpen, Cpu, Globe,
  ArrowRight, CheckCircle2, Users, Rocket, Award, Star
} from "lucide-react";

export const Route = createFileRoute("/_marketing/slec")({
  component: SLECPage,
  head: () => ({ meta: [{ title: "SLEC Growth Studio — Vedhkrit" }] }),
});

const studioZones = [
  {
    icon: Monitor,
    title: "Smart Learning Studio",
    subtitle: "AI-Powered Diagnostics",
    img: "/assets/images/slec-smart.jpg",
    color: "from-blue-500 to-indigo-500",
    bgLight: "bg-blue-50/50",
    borderLight: "border-blue-100",
    textCol: "text-blue-600",
    desc: "Interactive smart boards, adaptive testing docks, and real-time student response systems. Every session captures cognitive patterns to refine the Digital Learning Twin.",
    features: [
      "Adaptive diagnostic test stations",
      "Real-time response analytics displays",
      "Cognitive pattern tracking dashboards",
      "Multi-format assessment delivery"
    ]
  },
  {
    icon: Lightbulb,
    title: "Innovation & Maker Lab",
    subtitle: "Hands-On Creation Zone",
    img: "/assets/images/slec-maker.jpg",
    color: "from-orange-500 to-amber-500",
    bgLight: "bg-orange-50/50",
    borderLight: "border-orange-100",
    textCol: "text-orange-600",
    desc: "A project-based studio with 3D printers, Arduino kits, robotics workbenches, and creative prototyping tools. Students design, build, and present working portfolio projects.",
    features: [
      "3D printing & rapid prototyping",
      "Arduino, Raspberry Pi & IoT kits",
      "Robotics design workbenches",
      "Portfolio project documentation"
    ]
  },
  {
    icon: MessageSquare,
    title: "Career Counseling Lounge",
    subtitle: "1:1 Strategic Sessions",
    img: "/assets/images/slec-career.jpg",
    color: "from-teal-500 to-emerald-500",
    bgLight: "bg-teal-50/50",
    borderLight: "border-teal-100",
    textCol: "text-teal-600",
    desc: "Private, sound-insulated mentoring rooms designed for focused 1:1 strategy sessions. Mentors review diagnostic data, set milestone goals, and align academic plans with the student.",
    features: [
      "Sound-insulated private cabins",
      "Digital whiteboard & goal-tracking",
      "Live parent-connect video links",
      "Assessment debrief & data review"
    ]
  },
  {
    icon: BookOpen,
    title: "Knowledge Hub & Library",
    subtitle: "Curated Learning Resources",
    img: "/assets/images/slec-knowledge.jpg",
    color: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50/50",
    borderLight: "border-purple-100",
    textCol: "text-purple-600",
    desc: "A curated resource library featuring subject-specific research journals, case study workbooks, board exam prep modules, and digital access to over 5,000 academic articles.",
    features: [
      "5,000+ curated academic articles",
      "Board-aligned prep workbooks",
      "Research methodology guides",
      "Digital reading & annotation tools"
    ]
  },
  {
    icon: Cpu,
    title: "AI & Technology Skills Lab",
    subtitle: "Future-Ready Tech Training",
    img: "/assets/images/slec-aitech.jpg",
    color: "from-cyan-500 to-blue-500",
    bgLight: "bg-cyan-50/50",
    borderLight: "border-cyan-100",
    textCol: "text-cyan-600",
    desc: "Dedicated coding terminals and AI sandbox environments where students learn Python, data science, machine learning fundamentals, and web development through structured modules.",
    features: [
      "Python & data science terminals",
      "Machine learning sandbox labs",
      "Web development & design tools",
      "Competitive programming drills"
    ]
  },
  {
    icon: Globe,
    title: "Global Studies & Communication",
    subtitle: "Cross-Cultural Intelligence",
    img: "/assets/images/slec-global.jpg",
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50/50",
    borderLight: "border-emerald-100",
    textCol: "text-emerald-600",
    desc: "Model United Nations practice zones, debate studios, and cross-cultural intelligence workshops. Students develop presentation, diplomacy, and public speaking proficiency.",
    features: [
      "MUN simulation & debate studio",
      "Public speaking practice rooms",
      "Cross-cultural diplomacy modules",
      "Presentation scoring & feedback"
    ]
  }
];

const whySlec = [
  { icon: Users, stat: "500+", label: "Students Enrolled", desc: "Active learners across 20+ partner schools" },
  { icon: Award, stat: "92%", label: "Satisfaction Rate", desc: "Parent and student combined feedback score" },
  { icon: Star, stat: "40+", label: "Future Identities", desc: "Career paths mapped through the studio" },
  { icon: Rocket, stat: "6", label: "Specialized Zones", desc: "Purpose-built learning environments" }
];

function SLECPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 pt-20 sm:pt-24 pb-12 sm:pb-16 relative">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Hero */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/8 border border-brand-teal/20 text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-3">
            <Rocket className="h-3.5 w-3.5" /> Physical Learning Ecosystem
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 leading-tight">
            The SLEC Growth Studio
          </h1>
          <h2 className="text-lg sm:text-xl font-extrabold mt-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-blue to-indigo-600">
              Smart Learning Experience Centre
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-500 max-w-xl mx-auto">
            Where digital assessments meet physical experiences. Our purpose-built centres house six specialized learning zones designed to transform diagnostic insights into hands-on skill development.
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {whySlec.map((item) => (
            <div key={item.label} className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
              <div className="h-9 w-9 rounded-xl bg-brand-teal/8 border border-brand-teal/20 flex items-center justify-center text-brand-teal mx-auto mb-2">
                <item.icon className="h-4.5 w-4.5" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-800">{item.stat}</div>
              <div className="text-[9px] font-black text-brand-blue uppercase tracking-widest mt-0.5">{item.label}</div>
              <div className="text-[10px] text-slate-400 font-semibold mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Studio Zone Cards */}
        <div className="mb-12">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 text-left border-l-4 border-brand-teal pl-3">
            Six Specialized Learning Zones
          </h2>
          <div className="space-y-6">
            {studioZones.map((zone, idx) => (
              <div 
                key={zone.title} 
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Image */}
                  <div className="lg:w-2/5 relative h-48 sm:h-56 lg:h-auto overflow-hidden shrink-0">
                    <img 
                      src={zone.img} 
                      alt={zone.title} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:hidden" />
                    <span className={`absolute top-3 left-3 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border bg-white/90 backdrop-blur-sm ${zone.borderLight} ${zone.textCol}`}>
                      {zone.subtitle}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${zone.color} flex items-center justify-center text-white shrink-0 shadow-md`}>
                          <zone.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-800 leading-tight">{zone.title}</h3>
                          <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${zone.textCol}`}>{zone.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium mb-4">
                        {zone.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {zone.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-brand-teal shrink-0 mt-0.5" />
                            <span className="text-xs font-semibold text-slate-600 leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Strip */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-12">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-5 border-l-4 border-brand-blue pl-3">
            How the SLEC Experience Works
          </h2>
          <div className="grid gap-5 sm:grid-cols-4">
            {[
              { num: "01", title: "Assessment Phase", desc: "Students complete the Vedhkrit diagnostic battery in the Smart Learning Studio to establish their cognitive twin baseline." },
              { num: "02", title: "Mentor Match", desc: "Based on results, a dedicated mentor is assigned. First sessions take place in the Counseling Lounge." },
              { num: "03", title: "Skill Build", desc: "Students rotate through Maker Lab, AI Lab, and Global Studies zones to build targeted competencies." },
              { num: "04", title: "Portfolio Capture", desc: "All project outcomes are documented into the student's digital portfolio for university applications." }
            ].map((step) => (
              <div key={step.num} className="text-left">
                <div className="text-2xl font-black text-slate-200 mb-2">{step.num}</div>
                <h4 className="font-extrabold text-sm text-slate-800 leading-tight">{step.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium mt-1.5">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Block */}
        <div className="text-center bg-gradient-to-r from-brand-teal to-brand-blue rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="text-lg sm:text-xl font-bold">Visit a Growth Studio Near You</h2>
            <p className="text-xs text-white/70 leading-relaxed font-medium">
              Schedule a walkthrough to see our diagnostic testing stations, maker labs, and counselling suites in action. Currently live in Bengaluru with expansion underway.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link 
                to="/demo" 
                className="inline-flex items-center justify-center gap-1.5 bg-brand-orange hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Book a Studio Visit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all"
              >
                Contact for School Partnership
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
