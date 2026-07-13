import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Calendar, Video, Clock, FileText, UserCheck, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/student/sessions")({
  component: SessionsPage,
});

const upcoming = [
  { mentor: "Dr. Emily Chen", role: "Career Coach", date: "Tomorrow, 2:00 PM", topic: "Resume Review", type: "Video Call", img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }
];

const past = [
  { mentor: "James Wilson", role: "Tech Lead", date: "Oct 15, 2026", topic: "System Design Prep", notes: "Reviewed basic architecture patterns. Need to practice load balancing concepts." },
  { mentor: "Dr. Emily Chen", role: "Career Coach", date: "Sep 28, 2026", topic: "Mock Interview", notes: "Strong communication skills. Suggested using STAR method for behavioral questions." }
];

function SessionsPage() {
  return (
    <>
      <PageHeader title="Mentor Sessions" subtitle="Manage your one-on-one expert advice and structured sessions." />
      
      <div className="grid gap-6 lg:grid-cols-12 mt-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 border-brand-blue/20 bg-linear-to-b from-brand-blue/5 to-bg-primary">
            <h3 className="text-lg font-bold text-text-heading flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-brand-blue" />
              Upcoming Sessions
            </h3>
            
            {upcoming.map((session, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-border-default shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue"></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-2 py-1 rounded-md flex items-center gap-1">
                    <Video className="h-3 w-3" /> {session.type}
                  </span>
                  <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {session.date}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <img src={session.img} alt={session.mentor} className="w-12 h-12 rounded-full object-cover border-2 border-brand-blue/20" />
                  <div>
                    <h4 className="font-bold text-text-heading text-lg">{session.mentor}</h4>
                    <p className="text-xs text-text-muted">{session.role}</p>
                  </div>
                </div>
                
                <div className="bg-bg-secondary/50 rounded-lg p-3 mb-4">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Topic</p>
                  <p className="text-sm font-medium text-text-body">{session.topic}</p>
                </div>
                
                <button className="w-full py-2.5 bg-brand-blue text-white font-bold rounded-lg text-sm shadow-md shadow-brand-blue/20 hover:bg-brand-navy transition-colors flex items-center justify-center gap-2">
                  <Video className="h-4 w-4" /> Join Session Now
                </button>
              </div>
            ))}
            
            <button className="w-full mt-4 py-2.5 border-2 border-border-default text-text-heading font-bold rounded-lg text-sm hover:border-brand-blue hover:text-brand-blue transition-colors flex items-center justify-center gap-2">
              Book New Session
            </button>
          </GlassCard>
        </div>

        {/* Past Sessions Notes */}
        <div className="lg:col-span-7">
          <GlassCard className="p-6 h-full">
            <h3 className="text-lg font-bold text-text-heading flex items-center gap-2 mb-6">
              <FileText className="h-5 w-5 text-brand-teal" />
              Past Session Notes
            </h3>
            
            <div className="space-y-4">
              {past.map((session, i) => (
                <div key={i} className="border border-border-default rounded-xl p-5 hover:bg-bg-secondary/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                        <UserCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-heading">{session.mentor}</h4>
                        <p className="text-xs text-text-muted">{session.date} • {session.topic}</p>
                      </div>
                    </div>
                    <button className="text-brand-blue text-xs font-bold hover:underline flex items-center">
                      View full <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="bg-white border border-border-default rounded-lg p-4 mt-3 relative">
                    <div className="absolute top-4 left-0 w-1 h-8 bg-brand-orange rounded-r-md"></div>
                    <p className="text-sm text-text-body pl-3 italic">"{session.notes}"</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
