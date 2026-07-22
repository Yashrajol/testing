import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import {
  User, Calendar, CheckSquare, MessageSquare,
  Sparkles, BookOpen, Heart, Award, Clock, Download, Video, Phone
} from "lucide-react";
import { motion } from "motion/react";
import { mentorAvatar } from "@/shared/utils/avatars";

export const Route = createFileRoute("/dashboard/parent/mentor")({
  component: ParentMentorPage,
  head: () => ({ meta: [{ title: "Mentor Portal — Parent Portal" }] }),
});

const mentorNotes = [
  {
    date: "Mar 18, 2026",
    mentor: "Priya Iyer",
    role: "Lead Counselor",
    topic: "Aptitude Evaluation & Stream Mapping",
    content: "Yash has shown outstanding growth in numerical reasoning and logical problem solving during the DBDA debrief. We discussed the differences between pure technology tracks and engineering domains. Recommended next step is checking stream alignments (PCM/CS vs PCM/Eco).",
    actionItems: [
      { text: "Confirm attendance for Stream Selection Seminar on March 28", done: true },
      { text: "Complete VAK Learning Styles survey with Yash", done: false },
      { text: "Review the suggested reading material in the career tab", done: false }
    ]
  },
  {
    date: "Mar 04, 2026",
    mentor: "Priya Iyer",
    role: "Lead Counselor",
    topic: "Wellbeing & Stress Control Check-in",
    content: "We conducted a short check-in addressing midterm preparation stress. Yash's academic indices are excellent, but his sleep score showed a slight decline. We created a simplified study schedule that limits evening laptop screens after 9 PM. Please coordinate this routine at home.",
    actionItems: [
      { text: "Establish study/sleep schedule offline", done: true },
      { text: "Discuss exam strategy guide sent to parent email", done: true }
    ]
  },
  {
    date: "Feb 18, 2026",
    mentor: "Priya Iyer",
    role: "Lead Counselor",
    topic: "Career Roadmap Foundations",
    content: "First advisory meeting completed. We established baseline milestones for the Explore phase. Yash exhibits sharp tech interest, but we must expand exposure beyond programming, introducing UX design and data analysis labs to ensure balanced maturity.",
    actionItems: [
      { text: "Complete the initial baseline profile details", done: true }
    ]
  }
];

const recommendations = [
  {
    category: "Academic & Streams",
    icon: BookOpen,
    color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
    title: "Stream Compatibility Check-in",
    desc: "Yash is excelling in mathematical and computational logic (top 5% of class). We recommend PCM with Computer Science for Grade 11. Encourage him to check the Elective alignment sheet.",
    action: "Review Stream Options"
  },
  {
    category: "Skill Development",
    icon: Sparkles,
    color: "text-brand-teal bg-brand-teal/10 border-brand-teal/20",
    title: "VAK-aligned Study Techniques",
    desc: "Yash is classified as a Visual Learner. Utilizing mind-mapping tools (such as Miro or physical whiteboard summaries) during science studies will improve retrieval by up to 25%.",
    action: "Try Mind-Mapping Guide"
  },
  {
    category: "Wellbeing & Routine",
    icon: Heart,
    color: "text-brand-orange bg-brand-orange/10 border-brand-orange/20",
    title: "Evening Device Curfew",
    desc: "To counter mild exam stress and optimize deep sleep cycles, maintain a 60-minute evening screen cap on entertainment displays before bedtime.",
    action: "View Routine Blueprint"
  },
  {
    category: "Co-Curricular Exploration",
    icon: Award,
    color: "text-brand-blue bg-brand-blue/10 border-brand-blue/20",
    title: "Coding Olympiad Track",
    desc: "Suggested participation in the upcoming Inter-School Coding Hackathon (Junior category) in April to cultivate team execution and creative project design.",
    action: "Enroll in Competition"
  }
];

const sessions = [
  { type: "Upcoming", title: "Aptitude Evaluation & Electives Choice", date: "Mar 25, 4:30 PM", format: "Video Call", duration: "30 min" },
  { type: "Past", title: "Wellbeing & Exam Stress Session", date: "Mar 04, 5:00 PM", format: "Video Call", duration: "30 min" },
  { type: "Past", title: "First Advisory Roadmap Mapping", date: "Feb 18, 4:00 PM", format: "Physical Meet", duration: "45 min" },
];

const attachments = [
  { name: "CBSE Stream Selection Roadmap.pdf", size: "1.2 MB" },
  { name: "Yash Rajole DBDA Aptitude Report.pdf", size: "2.4 MB" },
  { name: "Visual Learning Mindmap Template.pdf", size: "850 KB" }
];

function ParentMentorPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader title="Mentor Portal" subtitle="Review session feedback, schedules, and recommended home activities." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Column - Notes and Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs for Notes */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4 flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-brand-blue" />
              Mentor Session Logs
            </h3>
            
            <div className="space-y-5">
              {mentorNotes.map((note, idx) => (
                <div key={idx} className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl relative text-left">
                  <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-200/60 pb-3 mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal">{note.topic}</span>
                      <h4 className="text-xs text-text-muted mt-0.5">Session with {note.mentor} ({note.role})</h4>
                    </div>
                    <span className="text-[9.5px] font-bold text-slate-400">{note.date}</span>
                  </div>

                  <p className="text-xs text-text-body leading-relaxed">{note.content}</p>

                  {note.actionItems && note.actionItems.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/50">
                      <h5 className="text-[10.5px] font-bold text-text-heading flex items-center gap-1.5 mb-2">
                        <CheckSquare className="h-3.5 w-3.5 text-brand-blue" />
                        Home Action Items
                      </h5>
                      <ul className="space-y-1.5">
                        {note.actionItems.map((item, key) => (
                          <li key={key} className="flex items-start gap-2 text-xs">
                            <input 
                              type="checkbox" 
                              checked={item.done} 
                              readOnly 
                              disabled
                              className="mt-0.5 h-3.5 w-3.5 rounded border-slate-350 text-brand-teal accent-brand-teal" 
                            />
                            <span className={item.done ? "text-slate-400 line-through font-medium" : "text-text-body font-semibold"}>
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recommendations Cards */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-text-heading">Recommended Home Activities</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {recommendations.map((rec, i) => (
                <GlassCard key={i} className="p-5 border border-slate-100 bg-white hover:border-slate-200 transition-colors flex flex-col justify-between h-full text-left">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{rec.category}</span>
                      <span className={`p-1.5 rounded-lg border ${rec.color}`}><rec.icon className="h-4 w-4" /></span>
                    </div>
                    <h4 className="font-display text-xs font-bold text-text-heading mt-3 leading-tight">{rec.title}</h4>
                    <p className="text-[11px] text-text-muted mt-2 leading-relaxed">{rec.desc}</p>
                  </div>
                  <button className="mt-4 w-full rounded-xl border border-slate-150 bg-slate-50/50 py-2 text-[10px] font-bold text-text-heading hover:bg-slate-100 hover:text-brand-blue transition-all cursor-pointer">
                    {rec.action}
                  </button>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Mentor Info, Schedules, Attachments */}
        <div className="space-y-6">
          {/* Mentor Profile Details */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-center shadow-card">
            <div className="relative pb-5 border-b border-slate-100">
              <div className="mx-auto h-20 w-20 rounded-full bg-slate-50 p-0.5 border border-slate-200 overflow-hidden shadow-inner">
                <img 
                  src={mentorAvatar(2, 120)}
                  alt="Priya Iyer" 
                  className="h-full w-full object-cover" 
                />
              </div>
              <h3 className="mt-3 text-sm font-bold text-text-heading">Priya Iyer</h3>
              <p className="text-[10px] text-text-muted font-bold mt-0.5">Lead Counseling Advisor</p>
              <span className="mt-2.5 inline-block text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Rating: 4.9 ★ (120+ sessions)
              </span>
            </div>

            <div className="mt-4 space-y-3.5 text-left text-xs">
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Expertise</span>
                <span className="text-xs text-text-body font-semibold mt-0.5 block">STEM Streams, Cognitive Mapping</span>
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">Advisory Bio</span>
                <p className="text-[11px] text-text-muted leading-relaxed mt-0.5">
                  Over 8 years guiding students in CBSE stream alignments and diagnostic assessment mappings.
                </p>
              </div>
              
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Link 
                  to="/dashboard/parent/messages" 
                  className="rounded-xl gradient-brand text-white font-bold py-2 text-center text-[10px] flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                >
                  <MessageSquare className="h-3 w-3" /> Message
                </Link>
                <Link 
                  to="/dashboard/parent/messages" 
                  className="rounded-xl border border-slate-200 hover:bg-slate-50 text-text-heading font-bold py-2 text-center text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Calendar className="h-3 w-3 text-slate-500" /> Book Slot
                </Link>
              </div>
            </div>
          </GlassCard>

          {/* Session Schedules */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4">Meeting History</h3>
            <div className="space-y-3">
              {sessions.map((sess, idx) => (
                <div key={idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-left text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded border ${
                      sess.type === "Upcoming" ? "bg-brand-blue/5 border-brand-blue/15 text-brand-blue" : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}>
                      {sess.type}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">{sess.duration}</span>
                  </div>
                  <h4 className="font-bold text-text-heading truncate">{sess.title}</h4>
                  <p className="text-[10px] text-text-muted mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-brand-teal" /> {sess.date} • <span className="font-semibold">{sess.format}</span>
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Session Attachments */}
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading mb-4">Meeting Attachments</h3>
            <div className="space-y-2.5">
              {attachments.map((file, idx) => (
                <div key={idx} className="flex justify-between items-center gap-2 text-xs text-left p-2.5 bg-slate-50/40 border border-slate-100 rounded-xl">
                  <div className="min-w-0">
                    <h4 className="font-bold text-text-heading truncate leading-tight">{file.name}</h4>
                    <span className="text-[9px] text-text-muted mt-0.5 block leading-none">{file.size}</span>
                  </div>
                  <button className="h-7 w-7 rounded-lg border border-slate-200 hover:border-brand-blue/30 text-slate-500 hover:text-brand-blue flex items-center justify-center shrink-0 cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
