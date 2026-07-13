import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/_marketing/contact")({
  component: Page,
  head: () => ({ meta: [{ title: "Contact Us — Vedhkrit" }] }),
});

function Page() {
  return (
    <div className="min-h-screen bg-slate-50/40 pt-20 sm:pt-24 pb-12 sm:pb-16 relative">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 text-left items-stretch">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/8 border border-brand-blue/20 text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-4">
                <MessageSquare className="h-3 w-3" /> Get in Touch
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-800 leading-tight">
                Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">Conversation.</span>
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
                Have questions about our stream advisories, school licensing, or mentor sessions? Reach out and we'll reply within 24 hours.
              </p>
            </div>

            <div className="mt-8 lg:mt-0 space-y-4 border-t border-slate-200/60 pt-6">
              {[
                { icon: Mail, label: "Email Support", val: "hello@vedhkrit.com", col: "text-blue-500 bg-blue-50" },
                { icon: Phone, label: "Call Directly", val: "+91 80 4555 0100", col: "text-teal-500 bg-teal-50" },
                { icon: MapPin, label: "Bengaluru HQ", val: "Indiranagar, Bangalore — 560038", col: "text-orange-500 bg-orange-50" }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3.5">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 ${item.col}`}>
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">{item.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Form Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-100/50">
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                alert("Thank you! We have received your inquiry and will be in touch shortly."); 
              }} 
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
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
                <input required type="email" placeholder="you@example.com" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all" />
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">School / Organisation</label>
                <input required type="text" placeholder="Delhi Public School" className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all" />
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Inquiry Message</label>
                <textarea required rows={4} placeholder="Tell us how we can help your learners..." className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand-blue/50 focus:bg-white focus:ring-1 focus:ring-brand-blue/20 transition-all resize-none" />
              </div>

              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue hover:opacity-95 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-blue/15 hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
