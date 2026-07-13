import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ShieldCheck, Heart, UserCheck, Play, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/_marketing/mentoring")({
  component: Page,
  head: () => ({ meta: [{ title: "1:1 Mentoring — Vedhkrit" }] }),
});

const mentorProfiles = [
  {
    name: "Dr. Ananya Sen",
    expertise: "Cognitive Development & STEM Pathway",
    education: "Ph.D. in Child Psychology, Stanford University",
    rating: "4.9",
    students: "128",
    sessions: "940+",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=ananya",
    color: "from-blue-500 to-indigo-500",
    tags: ["STEM", "Psychometric Review", "Cognitive Maps"]
  },
  {
    name: "Raghav Deshmukh",
    expertise: "Global Entrance Prep & Career Architect",
    education: "MBA, INSEAD; B.Tech, IIT Bombay",
    rating: "4.8",
    students: "154",
    sessions: "1,120+",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=raghav",
    color: "from-teal-500 to-emerald-500",
    tags: ["Ivy League", "SAT/ACT Prep", "Portfolio Building"]
  },
  {
    name: "Meera Nair",
    expertise: "Behavioral Coaching & SEL Advisor",
    education: "M.Sc. in Counselor Education, University of Delhi",
    rating: "4.9",
    students: "96",
    sessions: "730+",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=meera",
    color: "from-purple-500 to-pink-500",
    tags: ["Wellbeing", "Behavioral Tuning", "Parent Alignments"]
  },
  {
    name: "Vikram Malhotra",
    expertise: "Entrepreneurship & Technology Guide",
    education: "Ex-Product VP, Tech Unicorn; MS, Carnegie Mellon",
    rating: "4.7",
    students: "82",
    sessions: "490+",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=vikram",
    color: "from-orange-500 to-amber-500",
    tags: ["AI & Tech", "Lean Startup", "Identity Framing"]
  }
];

const ildfJourneyStages = [
  {
    num: "01",
    title: "Discover Phase",
    action: "Innate Profiling",
    desc: "Mentors review DBDA aptitude outputs and learning style detection matrices to construct the learner's initial cognitive framework.",
    icon: ShieldCheck,
    color: "text-blue-500 bg-blue-50 border-blue-100"
  },
  {
    num: "02",
    title: "Explore Phase",
    action: "Identity Mapping",
    desc: "Mentees are introduced to future identities (e.g. Space Scientist, Climate Innovator) to align interests with actual industrial realities.",
    icon: Heart,
    color: "text-teal-500 bg-teal-50 border-teal-100"
  },
  {
    num: "03",
    title: "Align Phase",
    action: "Curriculum Choice",
    desc: "Defining academic stream matching (IB, CBSE, IGCSE), subject selections, and establishing key metrics for baseline scores.",
    icon: UserCheck,
    color: "text-purple-500 bg-purple-50 border-purple-100"
  },
  {
    num: "04",
    title: "Prepare Phase",
    action: "Competency Coding",
    desc: "Intensive 1:1 sessions focusing on projects, portfolio builds, leadership skills, and targeted gap-filling diagnostics.",
    icon: Play,
    color: "text-orange-500 bg-orange-50 border-orange-100"
  }
];

function Page() {
  return (
    <div className="min-h-screen bg-slate-50/40 pt-20 sm:pt-24 pb-12 sm:pb-16 relative">
      {/* Grid Pattern and Gradient spots */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Hero Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/8 border border-brand-teal/20 text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-3">
            <UserCheck className="h-3 w-3" /> Dedicated Learner Support
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 leading-tight">
            Human Mentors. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-blue to-indigo-600">Empowered by Data.</span>
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500 max-w-xl mx-auto">
            Vedhkrit pairs each student with a vetted coach. Together, backed by our AI analysis engine and the ILDF framework, they navigate academic decisions and build future-proof skills.
          </p>
        </div>

        {/* The 1:1 Guided Journey Stages */}
        <div className="mb-14">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 text-left border-l-4 border-brand-teal pl-3">
            The Guided Mentoring Loop
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ildfJourneyStages.map((stage) => (
              <div 
                key={stage.num} 
                className="bg-white border border-slate-200/80 rounded-2xl p-4.5 text-left hover:shadow-md transition-shadow relative"
              >
                {/* Milestone badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-300">STAGE {stage.num}</span>
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center border ${stage.color}`}>
                    <stage.icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="font-extrabold text-sm text-slate-800 leading-snug">{stage.title}</h3>
                <span className="text-[9px] font-bold text-brand-teal uppercase tracking-widest block mt-0.5">{stage.action}</span>
                <p className="text-[11px] text-slate-400 leading-normal mt-2 font-medium">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Mentors */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 text-left border-l-4 border-brand-blue pl-3">
            Our Elite Mentor Panel
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mentorProfiles.map((m) => (
              <div 
                key={m.name} 
                className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Profile header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative">
                    <img 
                      src={m.avatar} 
                      alt={m.name} 
                      className="h-12 w-12 rounded-full border-2 border-slate-100 bg-slate-50 object-cover" 
                    />
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 leading-tight group-hover:text-brand-blue transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-[9.5px] font-bold text-slate-400 mt-0.5 leading-tight">{m.expertise}</p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 leading-snug font-medium italic border-l-2 border-slate-100 pl-2.5 mb-4 flex-1">
                  {m.education}
                </div>

                {/* Rating strip */}
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 bg-slate-50 rounded-xl p-2.5 border border-slate-100/60 mb-3.5">
                  <span className="flex items-center gap-1 text-brand-orange">
                    <Star className="h-3.5 w-3.5 fill-brand-orange text-current" /> {m.rating}
                  </span>
                  <span>{m.students} Mentees</span>
                  <span>{m.sessions} Sessions</span>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {m.tags.map((t) => (
                    <span 
                      key={t} 
                      className="text-[8px] font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-12 text-center bg-gradient-to-r from-brand-teal to-brand-blue rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="text-lg sm:text-xl font-bold">Empower Your Child with a Personal Mentor</h2>
            <p className="text-xs text-white/70 leading-relaxed font-medium">
              Start building future identities, improving school performance, and exploring active portfolios under direct guidance.
            </p>
            <div className="pt-2 flex justify-center">
              <Link 
                to="/register" 
                className="inline-flex items-center gap-1.5 bg-brand-orange hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Schedule Introduction Session <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
