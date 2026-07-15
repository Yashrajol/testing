import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import {
  Users,
  Video,
  Calendar,
  MessageSquare,
  FileText,
  Download,
  Play,
  CheckCircle2,
  Clock,
  TrendingUp,
  ChevronRight,
  Sparkles,
  BookOpen,
  UserCheck,
  ExternalLink,
  Flame,
  BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { mentorAvatar } from "@/lib/avatars";

export const Route = createFileRoute("/dashboard/student/mentor")({
  component: StudentMentorPage,
  head: () => ({ meta: [{ title: "My Mentor — Vedhkrit" }] }),
});

interface MentorSession {
  id: string;
  topic: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "past";
  meetingLink?: string;
  notes?: string;
}

interface SharedFile {
  name: string;
  type: string;
  size: string;
  date: string;
}

function StudentMentorPage() {
  const [activeSection, setActiveSection] = useState<"sessions" | "plans" | "feedback" | "book">("sessions");
  const [messageText, setMessageText] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2026-07-15");
  const [selectedTime, setSelectedTime] = useState("04:00 PM");

  // Simulated countdown to next meeting (2 hours, 15 minutes)
  const [timeLeft, setTimeLeft] = useState(8100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) return 8100;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const sessions: MentorSession[] = [
    { id: "s-1", topic: "Goal Setting & Study Planning", date: "Today, 14 Jul 2026", time: "05:00 PM", duration: "45 mins", status: "upcoming", meetingLink: "https://meet.google.com/abc-defg-hij" },
    { id: "s-2", topic: "Stream Selection & Core Assessment", date: "24 Jul 2026", time: "04:30 PM", duration: "45 mins", status: "upcoming" },
    { id: "s-3", topic: "First Meeting & Skills Review", date: "02 Jul 2026", time: "05:00 PM", duration: "30 mins", status: "past", notes: "Looked at Aarav's thinking skills. He is very good with shapes and space. Suggested joining the debate club." }
  ];

  const actionPlans = [
    { title: "Verbal pacing mocks", desc: "Practice weekly presentations and record audio pacing clips.", done: false, priority: "High" },
    { title: "Algebra Chapter 5 Workbook", desc: "Complete Neha Ma'am's quadratic formula worksheet.", done: true, priority: "High" },
    { title: "Debate Club Enrollment", desc: "Join school debate circle to boost communication metrics.", done: false, priority: "Medium" }
  ];

  const sharedFiles: SharedFile[] = [
    { name: "Syllabus Diagnostic Analysis Blueprint", type: "PDF Guide", size: "1.8 MB", date: "02 Jul 2026" },
    { name: "Verbal Pacing Practice Drills", type: "PDF Worksheet", size: "850 KB", date: "08 Jul 2026" },
    { name: "JEE Foundation Preparation Blueprint", type: "PDF Booklet", size: "3.2 MB", date: "10 Jul 2026" }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setSendingMsg(true);
    setTimeout(() => {
      toast.success("Message sent to Neha Mahta!", {
        description: "Your mentor will reply shortly via the chat dashboard."
      });
      setMessageText("");
      setSendingMsg(false);
    }, 600);
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mentorship Session Scheduled!", {
      description: `Booked for ${selectedDate} at ${selectedTime}. Calender invite sent.`,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
    });
    setShowBookingModal(false);
  };

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
      {/* Top Header */}
      <PageHeader
        title="My Mentor"
        subtitle="Connect with your dedicated mentor for personalized guidance, academic strategy, and career mentorship."
      />

      {/* Top Hero Section */}
      <motion.div variants={itemVariants}>
        <div className="rounded-3xl border border-slate-100 bg-linear-to-r from-orange-50/50 via-white to-orange-50/20 p-6 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-6 shadow-xs">
          {/* Left: Mentor Details */}
          <div className="flex flex-col sm:flex-row items-center gap-5 z-10 text-center sm:text-left">
            <img
              src={mentorAvatar(2, 180)}
              alt="Neha Mahta"
              className="w-20 h-20 rounded-full object-cover border-4 border-brand-orange/20 shadow-xs"
            />

            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h2 className="font-display text-xl font-bold text-text-heading">Neha Mahta</h2>
                <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 self-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Online & Available
                </span>
              </div>

              <p className="text-xs font-semibold text-text-muted">Senior Career & Growth Coach • Ex-Delhi Public School Counselor</p>

              {/* Next Meeting countdown */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10.5px] font-bold text-text-muted pt-1">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-orange" /> Next Session: Today, 05:00 PM</span>
                <span className="flex items-center gap-1 text-brand-orange font-extrabold"><Flame className="h-3.5 w-3.5" /> Starting in {formatCountdown(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex gap-2.5 z-10 shrink-0">
            <button
              onClick={() => {
                const element = document.getElementById("message-mentor");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-text-heading flex items-center gap-1.5 transition-colors cursor-pointer bg-white"
            >
              <MessageSquare className="h-4 w-4" /> Message Neha
            </button>

            <button
              onClick={() => setShowBookingModal(true)}
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Calendar className="h-4 w-4" /> Book Session
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main tab selectors */}
      <div className="flex items-center gap-1 border-b border-slate-100 pb-1 overflow-x-auto">
        {[
          { id: "sessions", label: "Meeting Sessions", count: sessions.length },
          { id: "plans", label: "Action Plans", count: actionPlans.length },
          { id: "feedback", label: "Mentor Feedback & Notes", count: null },
          { id: "book", label: "Shared Files", count: sharedFiles.length }
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id as any)}
            className={cn(
              "px-4 py-2 text-xs font-bold transition-colors border-b-2 -mb-[1.5px] whitespace-nowrap cursor-pointer",
              activeSection === sec.id
                ? "border-brand-orange text-brand-orange font-extrabold"
                : "border-transparent text-text-muted hover:text-text-heading"
            )}
          >
            {sec.label} {sec.count !== null && <span className="ml-1 px-1.5 py-0.5 rounded-md bg-slate-100 text-text-muted text-[9.5px]">{sec.count}</span>}
          </button>
        ))}
      </div>

      {/* Grid columns */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 columns details */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              {/* SESSIONS SECTION */}
              {activeSection === "sessions" && (
                <div className="space-y-4">
                  {sessions.map((session, idx) => (
                    <GlassCard key={idx} className="p-5 border border-slate-100 bg-white text-left flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider",
                            session.status === "upcoming"
                              ? "text-brand-orange bg-orange-50 border-brand-orange/15"
                              : "text-slate-400 bg-slate-50 border-slate-100"
                          )}>
                            {session.status}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">{session.duration} session</span>
                        </div>

                        <h4 className="font-bold text-sm text-text-heading leading-tight">{session.topic}</h4>
                        <p className="text-[10px] text-text-muted font-bold">
                          {session.date} • {session.time}
                        </p>

                        {session.notes && (
                          <div className="mt-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-[10.5px] font-medium leading-relaxed italic text-text-body">
                            <span className="font-bold text-[9px] uppercase tracking-wider text-slate-400 not-italic block mb-0.5">Mentor Notes</span>
                            "{session.notes}"
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 flex items-center">
                        {session.status === "upcoming" ? (
                          session.meetingLink ? (
                            <a
                              href={session.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-[11px] font-bold shadow-xs transition-colors flex items-center gap-1.5"
                            >
                              <Video className="h-4 w-4" /> Join Video Call
                            </a>
                          ) : (
                            <span className="text-[10.5px] font-bold text-text-muted bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                              Link pending
                            </span>
                          )
                        ) : (
                          <button
                            type="button"
                            onClick={() => toast.success("Loading recorded session video...")}
                            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-text-heading rounded-xl text-[11px] font-bold flex items-center gap-1.5"
                          >
                            <Play className="h-3.5 w-3.5 fill-text-heading" /> Watch Recording
                          </button>
                        )}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}

              {/* ACTION PLANS SECTION */}
              {activeSection === "plans" && (
                <GlassCard className="p-6 border border-slate-100 bg-white text-left space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-55 pb-3">
                    <div>
                      <h4 className="font-display text-sm font-bold text-text-heading">Action Plan Checklist</h4>
                      <p className="text-[9.5px] text-text-muted mt-0.5">Milestone assignments suggested by Neha Mahta</p>
                    </div>
                    <span className="text-[10px] font-bold text-brand-orange">
                      {actionPlans.filter(p => p.done).length}/{actionPlans.length} Done
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {actionPlans.map((plan, i) => (
                      <div
                        key={i}
                        className={cn(
                          "p-4 rounded-2xl border bg-white flex items-start justify-between gap-4 hover:border-slate-200 transition-all",
                          plan.done ? "border-slate-100 bg-slate-50/10" : "border-slate-100"
                        )}
                      >
                        <div className="space-y-1 text-left min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[8.5px] font-bold px-1.5 py-0.5 rounded",
                              plan.priority === "High" ? "bg-red-50 text-red-600" : "bg-blue-50 text-brand-blue"
                            )}>
                              {plan.priority} Priority
                            </span>
                            <h5 className={cn("font-bold text-text-heading truncate", plan.done && "text-slate-400 line-through")}>
                              {plan.title}
                            </h5>
                          </div>
                          <p className="text-[10px] text-text-muted leading-relaxed font-semibold">
                            {plan.desc}
                          </p>
                        </div>

                        {plan.done ? (
                          <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                            <CheckCircle2 className="h-4 w-4" />
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toast.success("Marked action goal done!")}
                            className="px-3 py-1.5 border border-slate-150 hover:bg-slate-50 font-bold rounded-lg text-[9.5px] whitespace-nowrap cursor-pointer"
                          >
                            Mark Done
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* MENTOR FEEDBACK SECTION */}
              {activeSection === "feedback" && (
                <GlassCard className="p-6 border border-slate-100 bg-white text-left space-y-6">
                  {/* Performance stats summary */}
                  <div className="grid gap-4 sm:grid-cols-3 text-xs font-bold text-text-muted">
                    <div className="p-4 bg-orange-50/50 border border-brand-orange/15 rounded-2xl">
                      <span className="text-brand-orange text-[8.5px] uppercase tracking-wider block mb-1">Assessed Strengths</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[10px] text-orange-950 font-semibold">
                        <li>Analytical Geometry</li>
                        <li>High spatial retention</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50/50 border border-brand-blue/15 rounded-2xl">
                      <span className="text-brand-blue text-[8.5px] uppercase tracking-wider block mb-1">Focus Areas</span>
                      <ul className="list-disc list-inside space-y-0.5 text-[10px] text-blue-950 font-semibold">
                        <li>Oral speech clarity</li>
                        <li>Biology labels accuracy</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-2xl">
                      <span className="text-purple-600 text-[8.5px] uppercase tracking-wider block mb-1">Career Alignments</span>
                      <span className="text-purple-950 font-extrabold text-[10.5px] block mt-1">JEE Technology Track</span>
                    </div>
                  </div>

                  {/* Feedback logs */}
                  <div className="space-y-4">
                    <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 pb-2">
                      Growth Evaluation Log
                    </h4>

                    {[
                      { date: "02 Jul 2026", eval: "Aarav needs to practice verbal speech drills. He is extremely fast when explaining algorithms. Adding structured pauses will make his presentations remarkable." },
                      { date: "15 Jun 2026", eval: "Mathematics workbook completed on schedule. Great progress on quadratic algebra exercises. Suggested attempting advanced JEE questions next." }
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/30 text-xs font-semibold text-text-body space-y-1">
                        <span className="text-[9.5px] text-slate-400 block">{item.date}</span>
                        <p className="leading-relaxed text-text-muted font-semibold">{item.eval}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* SHARED FILES SECTION */}
              {activeSection === "book" && (
                <GlassCard className="p-6 border border-slate-100 bg-white text-left space-y-4">
                  <div className="border-b border-slate-55 pb-3">
                    <h4 className="font-display text-sm font-bold text-text-heading">Shared Worksheets & Resources</h4>
                    <p className="text-[9.5px] text-text-muted mt-0.5">Reference guides shared directly by Neha Mahta</p>
                  </div>

                  <div className="space-y-3">
                    {sharedFiles.map((file, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl border border-slate-100 bg-white flex justify-between items-center text-xs font-semibold hover:border-slate-200 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-orange-50 text-brand-orange rounded-xl flex items-center justify-center shrink-0">
                            <FileText className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <h5 className="font-bold text-text-heading leading-tight truncate max-w-48 sm:max-w-xs">{file.name}</h5>
                            <p className="text-[9.5px] text-text-muted mt-0.5">{file.type} • {file.size} • Shared {file.date}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toast.success(`Downloading worksheet: ${file.name}`)}
                          className="h-8 w-8 bg-slate-50 hover:bg-slate-100 text-text-heading rounded-xl flex items-center justify-center shrink-0 border border-slate-100 cursor-pointer"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right column: Message Panel & Calendar Booking Slot */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Slot Booking Calendar */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-4">
            <div>
              <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-4.5 w-4.5 text-brand-orange" /> Mentorship Planner Slots
              </h3>
              <p className="text-[9.5px] text-text-muted mt-0.5">Select a date to view Neha's availability slots</p>
            </div>

            {/* Simulated Month block */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-text-muted">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-slate-400 font-semibold py-1">{d}</span>
              ))}

              {/* Mock dates */}
              {Array.from({ length: 14 }).map((_, idx) => {
                const day = idx + 10;
                const isSelected = day === 15;
                const isAvailable = [12, 14, 15, 18, 20].includes(day);

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      setSelectedDate(`2026-07-${day}`);
                      toast.info(`Selected Date: ${day} Jul 2026`);
                    }}
                    className={cn(
                      "py-1.5 rounded-lg text-xs font-bold transition-all relative cursor-pointer",
                      isSelected && "bg-brand-orange text-white",
                      !isSelected && isAvailable && "hover:bg-slate-50 text-text-heading font-extrabold",
                      !isAvailable && "opacity-25 cursor-not-allowed"
                    )}
                  >
                    {day}
                    {isAvailable && !isSelected && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 bg-brand-orange rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-text-heading pt-2 border-t border-slate-55">
              {[
                "03:00 PM",
                "04:00 PM",
                "05:00 PM",
                "06:30 PM"
              ].map((time, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "p-2 rounded-xl border text-center transition-colors cursor-pointer",
                    selectedTime === time
                      ? "border-brand-orange bg-orange-50/50 text-brand-orange"
                      : "border-slate-100 hover:bg-slate-50"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                toast.success(`Slot booked: 15 July 2026 at ${selectedTime}!`);
              }}
              className="w-full py-2.5 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              Book Selected Slot
            </button>
          </GlassCard>

          {/* Message Mentor Card */}
          <GlassCard id="message-mentor" className="p-5 border border-slate-100 bg-white text-left space-y-4">
            <h3 className="font-display text-xs font-bold text-slate-455 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="h-4.5 w-4.5 text-brand-blue" /> Message Neha Mahta
            </h3>

            <form onSubmit={handleSendMessage} className="space-y-3">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Ask about streams, mock tests or scheduling..."
                className="w-full min-h-24 p-3 bg-slate-50 border border-slate-150 rounded-2xl text-xs font-semibold focus:outline-none focus:border-brand-blue transition-colors text-text-body"
                required
              />

              <button
                type="submit"
                disabled={sendingMsg}
                className="w-full py-2.5 bg-brand-blue hover:bg-brand-navy disabled:bg-blue-300 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                {sendingMsg ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>

      {/* Booking Calendar Dialog Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 text-left"
          >
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <h4 className="font-display text-sm font-bold text-text-heading">Schedule Mentorship Session</h4>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="text-slate-400 hover:text-text-heading text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleBookSession} className="space-y-4 text-xs font-bold text-text-heading">
              <div className="space-y-1.5">
                <label>Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-orange text-text-body text-xs cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label>Preferred Time Slot</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl font-medium focus:outline-none focus:border-brand-orange text-text-body text-xs cursor-pointer"
                >
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                Confirm Booking
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
