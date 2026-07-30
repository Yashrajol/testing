import { CheckCircle2, Calendar, ArrowRight } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 pt-20 sm:pt-24 pb-12 sm:pb-16 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 text-left items-start">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/8 border border-brand-blue/20 text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-4">
              <Calendar className="h-3 w-3" /> 30-Minute Walkthrough
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
              See Vedhkrit <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">in Action.</span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium max-w-md">
              A personalized walkthrough with our education strategist, tailored to your school's profile and current challenges.
            </p>

            <ul className="mt-6 space-y-3.5">
              {[
                "Live tour of student, parent, mentor, and admin dashboards",
                "Pilot framework with measurable outcomes in 30 days",
                "Pricing tailored to your enrolment and grade mix",
                "Curriculum & timetable integration roadmap",
                "SLEC Growth Studio deployment options"
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-brand-teal" /> {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-100/50">
            <form 
              onSubmit={(e) => { e.preventDefault(); alert("Demo request received! We'll be in touch within 24 hours."); }} 
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">First Name</label>
                  <input required type="text" placeholder="Aarav" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all" />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
                  <input required type="text" placeholder="Sharma" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all" />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Work Email</label>
                <input required type="email" placeholder="you@school.edu" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all" />
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">School Name</label>
                <input required type="text" placeholder="Delhi Public School" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Role</label>
                  <select className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all">
                    <option>Principal</option>
                    <option>Director</option>
                    <option>Head of Department</option>
                    <option>Counselor</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Enrolment</label>
                  <select className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all">
                    <option>Under 500</option>
                    <option>500 — 1,500</option>
                    <option>1,500 — 3,000</option>
                    <option>3,000+</option>
                  </select>
                </div>
              </div>

              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue hover:opacity-95 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-blue/15 hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                Request My Demo <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
