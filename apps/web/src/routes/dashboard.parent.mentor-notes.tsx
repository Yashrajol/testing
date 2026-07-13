import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { BookOpen, User, Calendar, CheckSquare } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/mentor-notes")({
  component: ParentMentorNotesPage,
  head: () => ({ meta: [{ title: "Mentor Notes — Parent Portal" }] }),
});

const mentorNotes = [
  {
    date: "Mar 18, 2026",
    mentor: "Priya Iyer",
    role: "Lead Counselor",
    topic: "Aptitude Evaluation & Stream Mapping",
    content: "Aarav has shown outstanding growth in numerical reasoning and logical problem solving during the DBDA debrief. We discussed the differences between pure technology tracks and engineering domains. Recommended next step is checking stream alignments (PCM/CS vs PCM/Eco).",
    actionItems: [
      { text: "Confirm attendance for Stream Selection Seminar on March 28", done: true },
      { text: "Complete VAK Learning Styles survey with Aarav", done: false },
      { text: "Review the suggested reading material in the career tab", done: false }
    ]
  },
  {
    date: "Mar 04, 2026",
    mentor: "Priya Iyer",
    role: "Lead Counselor",
    topic: "Wellbeing & Stress Control Check-in",
    content: "We conducted a short check-in addressing midterm preparation stress. Aarav's academic indices are excellent, but his sleep score showed a slight decline. We created a simplified study schedule that limits evening laptop screens after 9 PM. Please coordinate this routine at home.",
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
    content: "First advisory meeting completed. We established baseline milestones for the Explore phase. Aarav exhibits sharp tech interest, but we must expand exposure beyond programming, introducing UX design and data analysis labs to ensure balanced maturity.",
    actionItems: [
      { text: "Complete the initial baseline profile details", done: true }
    ]
  }
];

function ParentMentorNotesPage() {
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
      className="space-y-6"
    >
      <PageHeader title="Mentor Notes" subtitle="Read comments and action plans from Aarav's lead counselor." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Advisories list */}
        <div className="lg:col-span-2 space-y-6">
          {mentorNotes.map((note, i) => (
            <motion.div key={i} variants={itemVariants}>
              <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-default/50 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-brand-blue/5 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-text-heading">{note.mentor}</h4>
                      <p className="text-[10px] text-text-muted font-semibold">{note.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Calendar className="h-3.5 w-3.5 text-brand-teal" />
                    <span className="text-[10px] font-bold">{note.date}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded">
                    {note.topic}
                  </span>
                  <p className="mt-3 text-xs text-text-body leading-relaxed">{note.content}</p>
                </div>

                {note.actionItems && note.actionItems.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border-default/40">
                    <h5 className="text-xs font-bold text-text-heading flex items-center gap-1.5 mb-2.5">
                      <CheckSquare className="h-4 w-4 text-brand-blue" />
                      Home Action Items
                    </h5>
                    <ul className="space-y-2">
                      {note.actionItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <input 
                            type="checkbox" 
                            checked={item.done} 
                            disabled
                            className="mt-0.5 h-3.5 w-3.5 rounded border-border-default text-brand-teal focus:ring-brand-teal accent-brand-teal" 
                          />
                          <span className={item.done ? "text-text-muted line-through" : "text-text-body font-medium"}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Mentor Profile Sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GlassCard className="p-5 border border-border-default/50 bg-white/60 text-center">
            <div className="relative pb-6 border-b border-border-default/50">
              <div className="mx-auto h-20 w-20 rounded-full gradient-brand p-0.5 shadow-md">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-xl font-bold text-brand-blue">
                  PI
                </div>
              </div>
              <h3 className="mt-3 text-sm font-bold text-text-heading">Priya Iyer</h3>
              <p className="text-[10px] text-text-muted font-bold mt-0.5">Lead Mentees Advisor</p>
              <span className="mt-2.5 inline-block text-[10px] font-bold text-brand-teal bg-brand-teal/5 border border-brand-teal/20 px-2.5 py-0.5 rounded-full">
                Rating: 4.9 ★ (120+ sessions)
              </span>
            </div>
            
            <div className="mt-5 space-y-4 text-left">
              <div>
                <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">Expertise</span>
                <span className="text-xs text-text-body font-semibold mt-1 block">STEM Paths, Cognitive Alignment</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-text-muted block uppercase tracking-wider">Upcoming Check-in</span>
                <span className="text-xs text-brand-blue font-bold mt-1 block">Mar 25, 4:30 PM (Video Call)</span>
              </div>
              <button className="w-full text-center rounded-xl gradient-brand py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all cursor-pointer">
                Message Advisor
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
