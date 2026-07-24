import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
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
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";
import { useAcademicEntities } from "@/features/academics/queries/useAcademicEntities";
import { useAcademicEntity } from "@/features/academics/queries/useAcademicEntity";
import { Subject } from "@/features/academics/types";

export const Route = createFileRoute("/dashboard/student/academics")({
  component: AcademicsPage,
  head: () => ({ meta: [{ title: "My Subjects — Vedhkrit" }] }),
});

const getSubjectIcon = (iconName?: string) => {
  switch (iconName) {
    case "GraduationCap": return GraduationCap;
    case "Sparkles": return Sparkles;
    case "BookOpen": return BookOpen;
    case "Compass": return Compass;
    case "Bookmark": return Bookmark;
    case "Video": return Video;
    default: return BookOpen;
  }
};

const getColorClass = (id: string, colorClass?: string) => {
  if (colorClass) return colorClass;
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    "text-brand-blue bg-blue-50/70 border-blue-150",
    "text-brand-teal bg-teal-50/70 border-brand-teal/20",
    "text-brand-orange bg-orange-50/70 border-brand-orange/20",
    "text-amber-600 bg-amber-50/70 border-amber-150",
    "text-purple-600 bg-purple-50/70 border-purple-150",
    "text-indigo-600 bg-indigo-50/70 border-indigo-150"
  ];
  return colors[hash % colors.length];
};

function AcademicsPage() {
  const router = useRouter();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");

  const { data: subjects, isLoading: listLoading, isError: listError, refetch: refetchList } = useAcademicEntities();
  const { data: subjectDetails, isLoading: detailsLoading, isError: detailsError, refetch: refetchDetails } = useAcademicEntity(selectedSubjectId);

  const subjectsList: Subject[] = useMemo(() => {
    if (Array.isArray(subjects)) return subjects;
    if (subjects && Array.isArray((subjects as any).items)) return (subjects as any).items;
    if (subjects && Array.isArray((subjects as any).data)) return (subjects as any).data;
    if (subjects && Array.isArray((subjects as any).entities)) return (subjects as any).entities;
    return [];
  }, [subjects]);

  const selectedSubject = useMemo(() => {
    return subjectsList.find((s: Subject) => s.id === selectedSubjectId);
  }, [subjectsList, selectedSubjectId]);

  // Semester Progress Calculation from subjects syllabus coverages
  const semesterProgress = useMemo(() => {
    if (!subjectsList || subjectsList.length === 0) return 0;
    const total = subjectsList.reduce((sum: number, s: Subject) => sum + (s.progress?.syllabusCoverage ?? 0), 0);
    return Math.round(total / subjectsList.length);
  }, [subjectsList]);

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

  if (listLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="My Subjects" subtitle="Loading your academic courses..." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <GlassCard key={n} className="p-6 border border-slate-100 bg-white min-h-[350px] animate-pulse flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-100 rounded-xl" />
                  <div className="space-y-2 flex-grow">
                    <div className="h-4 bg-slate-150 rounded w-2/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="h-2 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-150 rounded w-1/2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-6 border-t border-slate-50 mt-6">
                <div className="h-8 bg-slate-100 rounded" />
                <div className="h-8 bg-slate-100 rounded" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (listError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load subjects</h3>
        <p className="text-xs text-text-muted max-w-sm">
          Something went wrong while connecting to the server. Please check your connection and try again.
        </p>
        <button
          onClick={() => refetchList()}
          className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-navy transition-all cursor-pointer shadow-sm"
        >
          Retry
        </button>
      </div>
    );
  }

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
                    <span>{semesterProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${semesterProgress}%` }}></div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* School Registry Metadata Banner */}
            {subjectsList.length > 0 && subjectsList[0].enrollment && (
              <motion.div variants={itemVariants}>
                <div className="p-5 rounded-2xl border border-slate-100 bg-white grid grid-cols-2 sm:grid-cols-5 gap-4 text-[11px] font-bold text-text-muted">
                  <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">School</span>Delhi Public School</div>
                  <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Board</span>CBSE</div>
                  <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Class & Section</span>{subjectsList[0].enrollment.classSection || "Class IX - A"}</div>
                  <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Batch</span>{subjectsList[0].enrollment.batch || "Foundation A1"}</div>
                  <div><span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Academic Year</span>{subjectsList[0].enrollment.academicYear || "2026 - 27"}</div>
                </div>
              </motion.div>
            )}

            {/* Subjects Grid */}
            {subjectsList.length === 0 ? (
              <div className="text-center py-20 text-xs text-text-muted border border-dashed border-slate-100 rounded-xl">
                No subjects enrolled.
              </div>
            ) : (
              <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {subjectsList.map((sub, idx) => {
                  const IconComp = getSubjectIcon(sub.iconName);
                  const colorClass = getColorClass(sub.id, sub.colorClass);
                  const syllabusCover = sub.progress?.syllabusCoverage ?? 0;
                  const homeworkPending = sub.progress?.homeworkPendingCount ?? 0;

                  return (
                    <GlassCard key={sub.id || idx} className="p-6 border border-slate-100 bg-white hover:border-slate-200 transition-all flex flex-col justify-between min-h-[350px]">
                      <div className="text-left space-y-4">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center border shrink-0", colorClass)}>
                            <IconComp className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-base text-text-heading leading-tight">{sub.name}</h4>
                            <p className="text-[10px] text-text-muted mt-0.5">{sub.teacherName}</p>
                          </div>
                        </div>

                        {/* Progress Slider */}
                        <div className="pt-2">
                          <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1.5">
                            <span>Syllabus Coverage</span>
                            <span className="text-text-heading">{syllabusCover}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${syllabusCover}%` }}></div>
                          </div>
                          <span className="text-[10px] text-text-muted mt-1.5 block font-semibold truncate leading-none">
                            {sub.currentChapterTitle}
                          </span>
                        </div>

                        {/* Stats List */}
                        <div className="grid grid-cols-2 gap-y-3 pt-4 border-t border-slate-50 mt-4 text-[10.5px] font-bold text-text-muted">
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Pending Homework</span>
                            <span className={cn(homeworkPending > 0 ? "text-brand-orange bg-orange-50 px-2 py-0.5 rounded-md" : "text-text-body")}>
                              {homeworkPending} Worksheet{homeworkPending !== 1 && 's'}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Last Test Score</span>
                            <span className="text-text-body">{sub.progress?.lastTestScore ?? 0}%</span>
                          </div>
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Attendance</span>
                            <span className="text-text-body">{sub.progress?.attendancePercentage ?? 0}%</span>
                          </div>
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Next Live Class</span>
                            <span className="text-text-body truncate max-w-full block">{sub.progress?.nextClassTime ? sub.progress.nextClassTime.split(',')[0] : 'N/A'}</span>
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
                          Ask Veda
                        </Link>
                      </div>
                    </GlassCard>
                  );
                })}
              </motion.div>
            )}
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
                <PageHeader title={selectedSubject?.name || ""} subtitle={`Taught by ${selectedSubject?.teacherName}`} />
              </div>

              {/* Status Badge */}
              <GlassCard className="p-4 bg-white border border-slate-100 flex items-center gap-3.5 shadow-xs shrink-0 self-start sm:self-center">
                <CircularProgress percent={selectedSubject?.progress?.syllabusCoverage || 0} />
                <div className="text-xs text-left min-w-0">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Syllabus Covered</span>
                  <h4 className="font-bold text-text-heading leading-tight truncate">{selectedSubject?.currentChapterTitle}</h4>
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
                  {detailsLoading ? (
                    <div className="p-16 text-center flex flex-col items-center justify-center space-y-4 animate-pulse">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                      <span className="text-xs text-text-muted">Loading subject details...</span>
                    </div>
                  ) : detailsError ? (
                    <div className="p-16 text-center flex flex-col items-center justify-center space-y-4">
                      <AlertCircle className="h-10 w-10 text-brand-orange animate-bounce" />
                      <span className="text-xs text-text-muted">Failed to load subject materials</span>
                      <button
                        onClick={() => refetchDetails()}
                        className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-navy transition-all cursor-pointer shadow-sm"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* TAB 1: OVERVIEW */}
                      {activeTab === "Overview" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 space-y-6 text-left">
                          <div className="space-y-2">
                            <h4 className="font-display text-base font-bold text-text-heading">About the Course</h4>
                            <p className="text-xs text-text-body font-medium leading-relaxed max-w-2xl">{subjectDetails?.description || selectedSubject?.description || "No course description available."}</p>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-3 text-xs font-bold text-text-muted pt-4 border-t border-slate-50">
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                              <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">Attendance Record</span>
                              <span className="text-base font-black text-brand-blue">{subjectDetails?.progress?.attendancePercentage ?? selectedSubject?.progress?.attendancePercentage ?? 0}%</span>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                              <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">Avg Score</span>
                              <span className="text-base font-black text-brand-teal">{subjectDetails?.progress?.lastTestScore ?? selectedSubject?.progress?.lastTestScore ?? 0}%</span>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                              <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-1">Homework Pending</span>
                              <span className="text-base font-black text-brand-orange">{subjectDetails?.progress?.homeworkPendingCount ?? selectedSubject?.progress?.homeworkPendingCount ?? 0} Assignments</span>
                            </div>
                          </div>
                        </GlassCard>
                      )}

                      {/* TAB 2: CHAPTER PROGRESS */}
                      {activeTab === "Chapter Progress" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                          <h4 className="font-display text-sm font-bold text-text-heading mb-4">Syllabus Breakdown</h4>
                          
                          {!subjectDetails?.chapters || subjectDetails.chapters.length === 0 ? (
                            <div className="text-center py-10 text-xs text-text-muted">No Chapters available.</div>
                          ) : (
                            <div className="relative pl-6 space-y-5">
                              <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-slate-100" />
                              
                              {subjectDetails.chapters.map((ch, idx) => (
                                <div key={ch.id || idx} className="relative flex items-center justify-between text-xs font-semibold">
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
                                      <span className="block text-[9.5px] text-text-muted font-normal mt-0.5">Currently studying ({ch.progress ?? 0}% covered)</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </GlassCard>
                      )}

                      {/* TAB 3: ASSIGNMENTS */}
                      {activeTab === "Assignments" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                          <h4 className="font-display text-sm font-bold text-text-heading mb-4">Syllabus Homework Queue</h4>
                          
                          {!subjectDetails?.assignments || subjectDetails.assignments.length === 0 ? (
                            <div className="text-center py-10 text-xs text-text-muted">No Assignments available.</div>
                          ) : (
                            <div className="space-y-3">
                              {subjectDetails.assignments.map((task, i) => (
                                <div key={task.id || i} className="p-3.5 rounded-2xl border border-slate-100 bg-white flex justify-between items-center hover:border-slate-200 transition-all text-xs font-semibold">
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
                          )}
                        </GlassCard>
                      )}

                      {/* TAB 4: NOTES */}
                      {activeTab === "Notes" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                          <h4 className="font-display text-sm font-bold text-text-heading mb-4">Downloadable Class Notes</h4>
                          
                          {!subjectDetails?.notes || subjectDetails.notes.length === 0 ? (
                            <div className="text-center py-10 text-xs text-text-muted">No Notes available.</div>
                          ) : (
                            <div className="grid gap-3 sm:grid-cols-2">
                              {subjectDetails.notes.map((doc, i) => (
                                <div key={doc.id || i} className="p-4 rounded-2xl border border-slate-100 bg-white flex justify-between items-center hover:border-brand-blue/20 transition-all text-xs font-semibold">
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
                          )}
                        </GlassCard>
                      )}

                      {/* TAB 5: RECORDED CLASSES */}
                      {activeTab === "Recorded Classes" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                          <h4 className="font-display text-sm font-bold text-text-heading mb-4">Recorded Video Archives</h4>
                          
                          {!subjectDetails?.recordedLectures || subjectDetails.recordedLectures.length === 0 ? (
                            <div className="text-center py-10 text-xs text-text-muted">No Lessons available.</div>
                          ) : (
                            <div className="space-y-3">
                              {subjectDetails.recordedLectures.map((vid, i) => (
                                <div key={vid.id || i} className="p-3.5 rounded-2xl border border-slate-100 bg-white flex items-center justify-between hover:border-slate-200 transition-all text-xs font-semibold">
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
                          )}
                        </GlassCard>
                      )}

                      {/* TAB 6: PRACTICE QUESTIONS */}
                      {activeTab === "Practice Questions" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 text-left space-y-4">
                          <h4 className="font-display text-sm font-bold text-text-heading mb-2">Subject Practice</h4>
                          
                          {!subjectDetails?.practiceQuestions || subjectDetails.practiceQuestions.length === 0 ? (
                            <div className="text-center py-10 text-xs text-text-muted">No Practice Questions available.</div>
                          ) : (
                            <div className="space-y-4 text-xs font-semibold">
                              {subjectDetails.practiceQuestions.map((q, idx) => (
                                <div key={q.id || idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl animate-fade-in">
                                  <p className="text-text-heading mb-3 leading-normal">Q{idx + 1}. {q.question}</p>
                                  <div className="grid gap-2 sm:grid-cols-2">
                                    {q.options.map((ans, i) => (
                                      <button 
                                        key={i} 
                                        onClick={() => {
                                          if (ans === q.correctAnswer || ans.includes("(Correct)")) {
                                            toast.success("Correct!");
                                          } else {
                                            toast.info(`Keep trying! The correct answer is: ${q.correctAnswer}`);
                                          }
                                        }} 
                                        className="p-2.5 bg-white border border-slate-100 hover:border-brand-blue rounded-xl text-left font-medium cursor-pointer"
                                      >
                                        {ans}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </GlassCard>
                      )}

                      {/* TAB 7: TEACHER ANNOUNCEMENTS */}
                      {activeTab === "Teacher Announcements" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 text-left">
                          <h4 className="font-display text-sm font-bold text-text-heading mb-4">Instructor Announcements</h4>
                          
                          {!subjectDetails?.announcements || subjectDetails.announcements.length === 0 ? (
                            <div className="text-center py-10 text-xs text-text-muted">No Announcements available.</div>
                          ) : (
                            <div className="space-y-4">
                              {subjectDetails.announcements.map((ann, idx) => (
                                <div key={ann.id || idx} className="p-4 bg-orange-50/50 border border-brand-orange/15 rounded-2xl">
                                  <div className="flex justify-between text-[9px] font-bold text-brand-orange uppercase mb-1.5">
                                    <span>{ann.date}</span>
                                    <span>{ann.type}</span>
                                  </div>
                                  <h5 className="font-bold text-xs text-text-heading leading-tight">{ann.title}</h5>
                                  <p className="text-[10px] text-text-body mt-1 leading-normal font-medium">{ann.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </GlassCard>
                      )}

                      {/* TAB 8: RECENT SCORES */}
                      {activeTab === "Recent Scores" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 text-left space-y-4">
                          <h4 className="font-display text-sm font-bold text-text-heading mb-2">Subject Performance Registry</h4>
                          
                          {!subjectDetails?.recentScores || subjectDetails.recentScores.length === 0 ? (
                            <div className="text-center py-10 text-xs text-text-muted">No Scores registered.</div>
                          ) : (
                            <div className="space-y-2.5 text-xs font-semibold">
                              {subjectDetails.recentScores.map((item, i) => (
                                <div key={item.id || i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                                  <div>
                                    <h5 className="font-bold text-text-heading">{item.title}</h5>
                                    <p className="text-[9.5px] text-text-muted mt-0.5">{item.date}</p>
                                  </div>
                                  <span className="font-black text-brand-blue text-sm">{item.score}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </GlassCard>
                      )}

                      {/* TAB 9: RESOURCES */}
                      {activeTab === "Resources" && (
                        <GlassCard className="p-6 bg-white border border-slate-100 text-left space-y-4">
                          <h4 className="font-display text-sm font-bold text-text-heading mb-2">Recommended Study Workbooks</h4>
                          
                          {!subjectDetails?.resources || subjectDetails.resources.length === 0 ? (
                            <div className="text-center py-10 text-xs text-text-muted font-medium">No Recommended Resources.</div>
                          ) : (
                            <div className="space-y-3 text-xs font-semibold">
                              {subjectDetails.resources.map((item, i) => (
                                <div key={item.id || i} className="p-3 border border-slate-100 rounded-2xl flex justify-between items-center hover:border-brand-blue/30 transition-all">
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
                          )}
                        </GlassCard>
                      )}
                    </>
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
