import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft, 
  Download, 
  Play, 
  Sparkles, 
  TrendingUp, 
  Video, 
  Search, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Bookmark, 
  ChevronRight, 
  Lock,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student/academics")({
  component: AcademicsPage,
  head: () => ({ meta: [{ title: "My Subjects — Vedhkrit" }] }),
});

interface Subject {
  id: string;
  name: string;
  teacher: string;
  chapter: string;
  progress: number;
  homeworkPending: number;
  lastScore: number;
  attendance: number;
  nextClass: string;
  icon: typeof BookOpen;
  colorClass: string;
  desc: string;
}

const subjectsData: Subject[] = [
  { 
    id: "math", 
    name: "Mathematics", 
    teacher: "Neha Ma'am", 
    chapter: "Chapter 5: Lines and Angles", 
    progress: 68, 
    homeworkPending: 4, 
    lastScore: 94, 
    attendance: 98, 
    nextClass: "22 May, 09:00 AM", 
    icon: GraduationCap, 
    colorClass: "text-brand-blue bg-blue-50/70 border-blue-150",
    desc: "Study of numbers, shapes, equations, theorems, and mathematical applications."
  },
  { 
    id: "science", 
    name: "Science", 
    teacher: "Rohit Sir", 
    chapter: "Chapter 8: Motion", 
    progress: 45, 
    homeworkPending: 6, 
    lastScore: 88, 
    attendance: 95, 
    nextClass: "22 May, 11:00 AM", 
    icon: Sparkles, 
    colorClass: "text-brand-teal bg-teal-50/70 border-brand-teal/20",
    desc: "Exploring physics mechanics, basic chemistry formulations, and cell biology."
  },
  { 
    id: "english", 
    name: "English", 
    teacher: "Priya Ma'am", 
    chapter: "Chapter 3: Honeydew", 
    progress: 30, 
    homeworkPending: 0, 
    lastScore: 82, 
    attendance: 92, 
    nextClass: "23 May, 09:00 AM", 
    icon: BookOpen, 
    colorClass: "text-brand-orange bg-orange-50/70 border-brand-orange/20",
    desc: "English language rules, tenses, active/passive voice, reading comprehension and literature."
  },
  { 
    id: "social-science", 
    name: "Social Science", 
    teacher: "Ankit Sir", 
    chapter: "Chapter 4: Our Environment", 
    progress: 60, 
    homeworkPending: 2, 
    lastScore: 78, 
    attendance: 90, 
    nextClass: "24 May, 02:00 PM", 
    icon: Compass, 
    colorClass: "text-amber-600 bg-amber-50/70 border-amber-150",
    desc: "Understanding history periods, global geography features, and political civics systems."
  },
  { 
    id: "hindi", 
    name: "Hindi", 
    teacher: "Seema Ma'am", 
    chapter: "Chapter 2: Sparsh", 
    progress: 55, 
    homeworkPending: 1, 
    lastScore: 85, 
    attendance: 94, 
    nextClass: "24 May, 03:00 PM", 
    icon: Bookmark, 
    colorClass: "text-purple-600 bg-purple-50/70 border-purple-150",
    desc: "Hindi literature analysis, grammar structure, reading comprehension and essays."
  },
  { 
    id: "computer", 
    name: "Computer Science", 
    teacher: "Mr. Davis", 
    chapter: "Chapter 6: Python Basics", 
    progress: 90, 
    homeworkPending: 1, 
    lastScore: 98, 
    attendance: 100, 
    nextClass: "25 May, 10:00 AM", 
    icon: Video, 
    colorClass: "text-indigo-600 bg-indigo-50/70 border-indigo-150",
    desc: "Basic computing concepts, coding algorithms, variables, and logic loops."
  }
];

// Detail View Mock Data
const mockSyllabus: Record<string, Array<{ title: string; status: "completed" | "active" | "locked"; progress?: number }>> = {
  math: [
    { title: "Chapter 1: Number Systems", status: "completed" },
    { title: "Chapter 2: Polynomials", status: "completed" },
    { title: "Chapter 3: Coordinate Geometry", status: "completed" },
    { title: "Chapter 4: Linear Equations", status: "completed" },
    { title: "Chapter 5: Lines and Angles", status: "active", progress: 68 },
    { title: "Chapter 6: Triangles", status: "locked" },
    { title: "Chapter 7: Quadrilaterals", status: "locked" }
  ],
  science: [
    { title: "Chapter 1: Matter in Our Surroundings", status: "completed" },
    { title: "Chapter 2: Is Matter Around Us Pure?", status: "completed" },
    { title: "Chapter 5: Cell - Fundamental Unit of Life", status: "completed" },
    { title: "Chapter 8: Motion", status: "active", progress: 45 },
    { title: "Chapter 9: Force and Laws of Motion", status: "locked" }
  ]
};

const mockAssignments: Record<string, Array<{ title: string; due: string; status: string }>> = {
  math: [
    { title: "Maths Worksheet - 12 (Linear Equations)", due: "Tomorrow, 02:00 PM", status: "Pending" },
    { title: "Angles & Triangles Concept Practice", due: "25 May, 11:59 PM", status: "Pending" },
    { title: "Polynomials Midterm Revision Sheet", due: "Completed", status: "Submitted" }
  ],
  science: [
    { title: "Physics Motion Numerical Exercises", due: "Friday, 11:00 AM", status: "Pending" },
    { title: "Biology Cell Diagrams sheet", due: "Completed", status: "Submitted" }
  ]
};

const mockNotes: Record<string, Array<{ title: string; size: string }>> = {
  math: [
    { title: "Linear Equations Quick formulas", size: "1.2 MB" },
    { title: "Lines & Angles cheatsheet", size: "980 KB" }
  ],
  science: [
    { title: "Newton's laws equations revision notes", size: "2.4 MB" },
    { title: "Structure of animal cell cheatsheet", size: "1.5 MB" }
  ]
};

const mockVideos: Record<string, Array<{ title: string; date: string; length: string }>> = {
  math: [
    { title: "Linear Equations in Two Variables - Lecture 1", date: "10 May 2026", length: "45 mins" },
    { title: "Graphing Linear Equations - Lecture 2", date: "12 May 2026", length: "50 mins" },
    { title: "Lines & Angles Axioms & Postulates - Lecture 1", date: "18 May 2026", length: "40 mins" }
  ],
  science: [
    { title: "Understanding Motion & Reference Points - Lecture 1", date: "11 May 2026", length: "55 mins" },
    { title: "Distance vs Displacement - Lecture 2", date: "14 May 2026", length: "42 mins" }
  ]
};

function AcademicsPage() {
  const router = useRouter();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const selectedSubject = subjectsData.find(s => s.id === selectedSubjectId);

  const handleDownload = (title: string, size: string) => {
    toast.success(`Notes downloaded successfully!`, {
      description: `${title} (${size}) is saved to your local downloads folder.`,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  // Tabs list for detail view
  const detailTabs = [
    "Overview",
    "Chapter Progress",
    "Assignments",
    "Notes",
    "Recorded Classes",
    "Practice Questions",
    "Teacher Announcements",
    "Recent Scores",
    "Resources"
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <AnimatePresence mode="wait">
        {!selectedSubjectId ? (
          // STATE 1: MY SUBJECTS LISTING
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="space-y-6"
          >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <PageHeader title="My Subjects" subtitle="Track your syllabus progress, homework, and live class times." />
              
              {/* Semester Progress Card */}
              <GlassCard className="p-4 bg-white border border-slate-100 flex items-center gap-4 max-w-sm w-full shadow-xs shrink-0 self-start md:self-center">
                <div className="h-10 w-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-grow text-xs text-left min-w-0">
                  <div className="flex justify-between font-bold text-text-heading mb-1.5">
                    <span>Semester Progress</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* School Registry Metadata Banner */}
            <motion.div variants={itemVariants}>
              <div className="p-5 rounded-2xl border border-slate-100 bg-white grid grid-cols-2 sm:grid-cols-5 gap-4 text-[11px] font-bold text-text-muted">
                <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">School</span>Delhi Public School</div>
                <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Board</span>CBSE</div>
                <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Class & Section</span>Class IX - A</div>
                <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Batch</span>Foundation A1</div>
                <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Academic Year</span>2026 - 27</div>
              </div>
            </motion.div>

            {/* Subjects Grid */}
            <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjectsData.map((sub, idx) => (
                <GlassCard key={idx} className="p-6 border border-slate-100 bg-white hover:border-slate-200 transition-all flex flex-col justify-between min-h-[350px]">
                  <div className="text-left space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center border shrink-0", sub.colorClass)}>
                        <sub.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-text-heading leading-tight">{sub.name}</h4>
                        <p className="text-[10px] text-text-muted mt-0.5">{sub.teacher}</p>
                      </div>
                    </div>

                    {/* Progress Slider */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5">
                        <span>Syllabus Coverage</span>
                        <span className="text-text-heading">{sub.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${sub.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] text-text-muted mt-1.5 block font-semibold truncate leading-none">
                        {sub.chapter}
                      </span>
                    </div>

                    {/* Stats List */}
                    <div className="grid grid-cols-2 gap-y-3 pt-4 border-t border-slate-50 mt-4 text-[10.5px] font-bold text-text-muted">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Pending Homework</span>
                        <span className={cn(sub.homeworkPending > 0 ? "text-brand-orange bg-orange-50 px-2 py-0.5 rounded-md" : "text-text-body")}>
                          {sub.homeworkPending} Worksheet{sub.homeworkPending !== 1 && 's'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Last Test Score</span>
                        <span className="text-text-body">{sub.lastScore}%</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Attendance</span>
                        <span className="text-text-body">{sub.attendance}%</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Next Live Class</span>
                        <span className="text-text-body truncate max-w-full block">{sub.nextClass.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subject Quick Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-6 border-t border-slate-50 mt-6 text-xs">
                    <button 
                      onClick={() => { setSelectedSubjectId(sub.id); setActiveTab("Overview"); }}
                      className="py-2.5 bg-brand-blue hover:bg-brand-navy text-white text-center font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      View Subject <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    
                    <Link 
                      to="/dashboard/student/goals"
                      className="py-2.5 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading text-center font-bold rounded-xl transition-colors flex items-center justify-center"
                    >
                      Practice
                    </Link>
                    
                    <button 
                      onClick={() => handleDownload(`${sub.name} Revision notes`, "1.8 MB")}
                      className="py-2 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading text-center font-bold rounded-xl transition-colors"
                    >
                      Notes
                    </button>
                    
                    <Link 
                      to="/dashboard/student/ai"
                      className="py-2 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading text-center font-bold rounded-xl transition-colors flex items-center justify-center gap-0.5"
                    >
                      Ask VedhAI
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          // STATE 2: SUBJECT DETAILED PAGE
          <motion.div 
            key="details"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            className="space-y-6"
          >
            {/* Header / Back navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <button 
                  onClick={() => setSelectedSubjectId(null)}
                  className="flex items-center gap-1 text-xs font-bold text-brand-blue hover:underline mb-2 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to My Subjects
                </button>
                <PageHeader title={selectedSubject?.name || ""} subtitle={`Taught by ${selectedSubject?.teacher}`} />
              </div>

              {/* Status Badge */}
              <GlassCard className="p-4 bg-white border border-slate-100 flex items-center gap-3.5 shadow-xs shrink-0 self-start sm:self-center">
                <CircularProgress percent={selectedSubject?.progress || 0} />
                <div className="text-xs text-left min-w-0">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Syllabus Covered</span>
                  <h4 className="font-bold text-text-heading leading-tight truncate">{selectedSubject?.chapter.split(':').slice(1).join('').trim()}</h4>
                </div>
              </GlassCard>
            </div>

            {/* Dynamic Tabs Navigation Bar */}
            <motion.div variants={itemVariants} className="overflow-x-auto pb-1 flex items-center gap-1.5 border-b border-slate-100">
              {detailTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors border-b-2 -mb-[1.5px] cursor-pointer",
                    activeTab === tab 
                      ? "border-brand-blue text-brand-blue font-extrabold" 
                      : "border-transparent text-text-muted hover:text-text-heading"
                  )}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Dynamic Content Panel */}
            <motion.div variants={itemVariants} className="pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* TAB 1: OVERVIEW */}
                  {activeTab === "Overview" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 space-y-6 text-left">
                      <div className="space-y-2">
                        <h4 className="font-display text-base font-bold text-text-heading">About the Course</h4>
                        <p className="text-xs text-text-body font-medium leading-relaxed max-w-2xl">{selectedSubject?.desc}</p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3 text-xs font-bold text-text-muted pt-4 border-t border-slate-50">
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">Attendance Record</span>
                          <span className="text-base font-black text-brand-blue">{selectedSubject?.attendance}%</span>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">Avg Score</span>
                          <span className="text-base font-black text-brand-teal">{selectedSubject?.lastScore}%</span>
                        </div>
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">Homework Pending</span>
                          <span className="text-base font-black text-brand-orange">{selectedSubject?.homeworkPending} Assignments</span>
                        </div>
                      </div>
                    </GlassCard>
                  )}

                  {/* TAB 2: CHAPTER PROGRESS */}
                  {activeTab === "Chapter Progress" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                      <h4 className="font-display text-sm font-bold text-text-heading mb-4">Syllabus Breakdown</h4>
                      <div className="relative pl-6 space-y-5">
                        <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-slate-100" />
                        
                        {((selectedSubjectId ? mockSyllabus[selectedSubjectId] : []) || []).map((ch, idx) => (
                          <div key={idx} className="relative flex items-center justify-between text-xs font-semibold">
                            <div className="absolute -left-[24.5px] mt-0.5 flex items-center justify-center bg-white h-4.5 w-4.5">
                              {ch.status === "completed" ? (
                                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 stroke-[3px]" />
                              ) : ch.status === "active" ? (
                                <div className="h-4 w-4 rounded-full bg-brand-blue border-2 border-brand-blue" />
                              ) : (
                                <Lock className="h-4 w-4 text-slate-300" />
                              )}
                            </div>
                            <div className="text-left">
                              <span className={cn(
                                "font-bold",
                                ch.status === "completed" ? "text-slate-400 line-through" : 
                                ch.status === "active" ? "text-brand-blue" : "text-slate-400"
                              )}>
                                {ch.title}
                              </span>
                              {ch.status === "active" && (
                                <span className="block text-[9.5px] text-text-muted font-normal mt-0.5">Currently studying ({ch.progress}% covered)</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  {/* TAB 3: ASSIGNMENTS */}
                  {activeTab === "Assignments" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                      <h4 className="font-display text-sm font-bold text-text-heading mb-4">Syllabus Homework Queue</h4>
                      <div className="space-y-3">
                        {((selectedSubjectId ? mockAssignments[selectedSubjectId] : []) || []).map((task, i) => (
                          <div key={i} className="p-3.5 rounded-2xl border border-slate-100 bg-white flex justify-between items-center hover:border-slate-200 transition-all text-xs font-semibold">
                            <div>
                              <h5 className="font-bold text-text-heading">{task.title}</h5>
                              <p className="text-[10px] text-text-muted mt-1">Due: {task.due}</p>
                            </div>
                            <span className={cn(
                              "px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider",
                              task.status === "Pending" ? "text-brand-orange bg-orange-50" : "text-emerald-700 bg-emerald-50"
                            )}>
                              {task.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  {/* TAB 4: NOTES */}
                  {activeTab === "Notes" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                      <h4 className="font-display text-sm font-bold text-text-heading mb-4">Downloadable Class Notes</h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {((selectedSubjectId ? mockNotes[selectedSubjectId] : []) || []).map((doc, i) => (
                          <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-white flex justify-between items-center hover:border-brand-blue/20 transition-all text-xs font-semibold">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center shrink-0">
                                <FileText className="h-4.5 w-4.5" />
                              </div>
                              <div className="text-left">
                                <h5 className="font-bold text-text-heading truncate max-w-40">{doc.title}</h5>
                                <p className="text-[9.5px] text-text-muted mt-0.5">{doc.size}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDownload(doc.title, doc.size)}
                              className="h-8 w-8 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl flex items-center justify-center cursor-pointer"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  {/* TAB 5: RECORDED CLASSES */}
                  {activeTab === "Recorded Classes" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                      <h4 className="font-display text-sm font-bold text-text-heading mb-4">Recorded Video Archives</h4>
                      <div className="space-y-3">
                        {((selectedSubjectId ? mockVideos[selectedSubjectId] : []) || []).map((vid, i) => (
                          <div key={i} className="p-3.5 rounded-2xl border border-slate-100 bg-white flex items-center justify-between hover:border-slate-200 transition-all text-xs font-semibold">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                                <Play className="h-4 w-4 fill-purple-600" />
                              </div>
                              <div className="text-left">
                                <h5 className="font-bold text-text-heading leading-tight">{vid.title}</h5>
                                <p className="text-[10px] text-text-muted mt-1">{vid.date} • {vid.length}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => toast.info(`Playing recorded class stream: ${vid.title}`)}
                              className="px-3.5 py-1.5 bg-brand-blue text-white rounded-lg font-bold text-[10.5px] hover:bg-brand-navy cursor-pointer shadow-xs"
                            >
                              Watch
                            </button>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  {/* TAB 6: PRACTICE QUESTIONS */}
                  {activeTab === "Practice Questions" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 text-left space-y-4">
                      <h4 className="font-display text-sm font-bold text-text-heading mb-2">Subject Aptitude Practice</h4>
                      
                      <div className="space-y-4 text-xs font-semibold">
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                          <p className="text-text-heading mb-3 leading-normal">Q1. Solve for x: 5x + 3 = 28</p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {["x = 3", "x = 5 (Correct)", "x = 4", "x = 6"].map((ans, i) => (
                              <button key={i} onClick={() => toast.success("Correct!")} className="p-2.5 bg-white border border-slate-100 hover:border-brand-blue rounded-xl text-left font-medium cursor-pointer">
                                {ans}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                          <p className="text-text-heading mb-3 leading-normal">Q2. Calculate speed of an object moving 200m in 10s.</p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {["10 m/s", "20 m/s (Correct)", "40 m/s", "5 m/s"].map((ans, i) => (
                              <button key={i} onClick={() => toast.success("Correct!")} className="p-2.5 bg-white border border-slate-100 hover:border-brand-blue rounded-xl text-left font-medium cursor-pointer">
                                {ans}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  )}

                  {/* TAB 7: TEACHER ANNOUNCEMENTS */}
                  {activeTab === "Teacher Announcements" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                      <h4 className="font-display text-sm font-bold text-text-heading mb-4">Instructor Announcements</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-orange-50/50 border border-brand-orange/15 rounded-2xl">
                          <div className="flex justify-between text-[9px] font-bold text-brand-orange uppercase mb-1.5">
                            <span>Posted Yesterday</span>
                            <span>Critical Notice</span>
                          </div>
                          <h5 className="font-bold text-xs text-text-heading leading-tight">Weekly Chapter 5 Assessment Scheduled</h5>
                          <p className="text-[10px] text-text-body mt-1 leading-normal font-medium">
                            Please complete Linear Equations practice questions before class. Bring graph papers and geometry boxes tomorrow.
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  )}

                  {/* TAB 8: RECENT SCORES */}
                  {activeTab === "Recent Scores" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 text-left space-y-4">
                      <h4 className="font-display text-sm font-bold text-text-heading mb-2">Subject Performance Registry</h4>
                      
                      <div className="space-y-2.5 text-xs font-semibold">
                        {[
                          { title: "Weekly Class Quiz #4", date: "15 May 2026", score: "94%" },
                          { title: "Class Assessment #3", date: "02 May 2026", score: "90%" },
                          { title: "Chapter 4 Test", date: "15 Apr 2026", score: "96%" }
                        ].map((item, i) => (
                          <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                            <div>
                              <h5 className="font-bold text-text-heading">{item.title}</h5>
                              <p className="text-[9.5px] text-text-muted mt-0.5">{item.date}</p>
                            </div>
                            <span className="font-black text-brand-blue text-sm">{item.score}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  {/* TAB 9: RESOURCES */}
                  {activeTab === "Resources" && (
                    <GlassCard className="p-6 bg-white border border-slate-100 text-left space-y-4">
                      <h4 className="font-display text-sm font-bold text-text-heading mb-2">Recommended Study Workbooks</h4>
                      
                      <div className="space-y-3 text-xs font-semibold">
                        {[
                          { title: "NCERT Class IX Textbook Reference links", type: "Core Textbook" },
                          { title: "Exemplar Problems Mathematics workbook", type: "Reference Problems" },
                          { title: "Vedhkrit Cognitive Thinking level exercises", type: "Worksheet" }
                        ].map((item, i) => (
                          <div key={i} className="p-3 border border-slate-100 rounded-2xl flex justify-between items-center hover:border-brand-blue/30 transition-all">
                            <div className="text-left">
                              <h5 className="font-bold text-text-heading leading-tight">{item.title}</h5>
                              <span className="text-[9px] text-brand-blue bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block uppercase tracking-wider">{item.type}</span>
                            </div>
                            <button onClick={() => toast.success("Accessing resource workbook portal...")} className="h-8 px-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-lg font-bold text-[10px] cursor-pointer">
                              Access
                            </button>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Circular progress indicator
const CircularProgress = ({ percent, size = 52, strokeWidth = 5, colorClass = "text-brand-blue" }: { percent: number; size?: number; strokeWidth?: number; colorClass?: string }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn("transition-all duration-500 ease-out", colorClass)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-[10.5px] font-black text-text-heading">{percent}%</span>
    </div>
  );
};
