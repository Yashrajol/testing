import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote, BookOpen, Download, User, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_marketing/stories")({
  component: Page,
  head: () => ({ meta: [{ title: "Resources & Stories — Vedhkrit" }] }),
});

const successStories = [
  {
    name: "Aadhya Reddy",
    grade: "Grade 12",
    school: "Delhi Public School, Bangalore",
    outcome: "Admitted to Ashoka University, Computer Science (50% Scholarship)",
    quote: "Vedhkrit mapped the connection between my abstract logic metrics and computer systems. The 1:1 guidance helped me build an AI portfolio that won me a scholarship.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=aadhya",
    color: "border-blue-100 bg-blue-50/10"
  },
  {
    name: "Vivaan Sen",
    grade: "Grade 11",
    school: "Modern School, New Delhi",
    outcome: "National Mathematics Olympiad Qualifier (Top 50 Rank)",
    quote: "My academic path was designed entirely for me. The diagnostics showed exactly which mathematical concepts I had gap areas in. Pushing those up changed my scores.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=vivaan",
    color: "border-teal-100 bg-teal-50/10"
  },
  {
    name: "Diya Malhotra",
    grade: "Grade 10",
    school: "Sanskriti School, Chanakyapuri",
    outcome: "Built a Mental Wellbeing Portfolio project presented to CBSE panel",
    quote: "The wellbeing index mapped my anxiety triggers. My mentor helped me turn that data into a working mental-health research project that got grade A+ in boards.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=diya",
    color: "border-purple-100 bg-purple-50/10"
  }
];

const downloadResources = [
  {
    title: "Secondary Board Stream Selection Guide",
    format: "PDF Booklet • 2.4 MB",
    downloads: "4.2k downloads",
    category: "Academics"
  },
  {
    title: "21st Century Skills Assessment Blueprint",
    format: "Methodology PDF • 1.8 MB",
    downloads: "2.8k downloads",
    category: "Methodology"
  },
  {
    title: "Parent's Guide to Child Aptitude & Focus",
    format: "E-Book • 4.1 MB",
    downloads: "6.5k downloads",
    category: "Parenting"
  }
];

function Page() {
  return (
    <div className="min-h-screen bg-slate-50/40 pt-20 sm:pt-24 pb-12 sm:pb-16 relative">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Hero */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/8 border border-brand-teal/20 text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-3">
            <BookOpen className="h-3.5 w-3.5" /> Learner Stories & Resources
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 leading-tight">
            Real Student Outcomes. <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-blue to-indigo-600">No Placeholders.</span>
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500 max-w-xl mx-auto">
            Discover how students across India have mapped their strengths, filled concept gaps, designed active project portfolios, and claimed university spots under the guidance of our mentors.
          </p>
        </div>

        {/* Stories list */}
        <div className="mb-14">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 text-left border-l-4 border-brand-blue pl-3">
            Featured Learner Journeys
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {successStories.map((story) => (
              <div 
                key={story.name}
                className={`bg-white border rounded-2xl p-5 text-left shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow ${story.color}`}
              >
                <div>
                  <Quote className="h-6 w-6 text-slate-300" />
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold italic">
                    "{story.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img 
                    src={story.img} 
                    alt={story.name} 
                    className="h-10 w-10 rounded-full border border-slate-100 bg-slate-50 object-cover" 
                  />
                  <div>
                    <div className="text-xs font-black text-slate-800">{story.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">
                      {story.grade} • {story.school}
                    </div>
                    <div className="text-[10px] font-extrabold text-brand-blue mt-1.5 leading-snug">
                      🏆 {story.outcome}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloadable Resources */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 text-left border-l-4 border-brand-teal pl-3">
            Methodology & Guide Downloads
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {downloadResources.map((res) => (
              <div 
                key={res.title}
                className="bg-white border border-slate-200/85 rounded-2xl p-5 text-left hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[8px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                      {res.category}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">{res.downloads}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-800 leading-snug mb-1">
                    {res.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{res.format}</p>
                </div>

                <button 
                  type="button"
                  onClick={() => alert("Downloading file...")}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
                >
                  <Download className="h-3.5 w-3.5" /> Download Guide
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-12 text-center bg-gradient-to-r from-brand-blue to-brand-navy rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="text-lg sm:text-xl font-bold">Write Your Own Success Story</h2>
            <p className="text-xs text-white/70 leading-relaxed font-medium">
              Join thousands of students building their digital portfolios, aligning subject choices, and claiming admissions.
            </p>
            <div className="pt-2 flex justify-center">
              <Link 
                to="/register" 
                className="inline-flex items-center gap-1.5 bg-brand-orange hover:bg-orange-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Get Started for Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
