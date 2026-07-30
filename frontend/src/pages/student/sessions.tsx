import { Link } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { 
  Video, 
  Clock, 
  Download, 
  HelpCircle, 
  Calendar, 
  Search, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Filter, 
  Users, 
  FileText, 
  Award, 
  ChevronRight, 
  ListTodo, 
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";
import { BANNER_PHOTOS } from "@/shared/utils/avatars";
import { useAuth } from "@/app/providers/auth-context";
import { useSessions } from "@/features/sessions/queries/useSessions";
import { useCalendar } from "@/features/planner/queries/usePlanner";



export default function LiveClassesPage() {
  const { user } = useAuth();
  const studentId = user?.id || 'student-123';

  // React Queries
  const { data: sessionsData, isLoading: sessionsLoading, isError: sessionsError, refetch: refetchSessions } = useSessions(studentId);
  const { data: calendarData, isLoading: calendarLoading, refetch: refetchCalendar } = useCalendar();

  const [activeTab, setActiveTab] = useState<"live" | "upcoming" | "recorded" | "completed">("live");
  
  // Filter States
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [teacherFilter, setTeacherFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  // Countdown timer state
  const [countdown, setCountdown] = useState({ mins: 14, secs: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { mins: prev.mins - 1, secs: 59 };
        } else {
          clearInterval(timer);
          return { mins: 0, secs: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDownloadNotes = (subject: string) => {
    toast.success(`Notes downloaded successfully!`, {
      description: `Complete PDF notes for ${subject} are now saved locally.`,
      icon: <Download className="h-5 w-5 text-brand-blue" />
    });
  };

  const classes = useMemo(() => {
    const rawList = Array.isArray(sessionsData)
      ? sessionsData
      : Array.isArray((sessionsData as any)?.data)
      ? (sessionsData as any).data
      : Array.isArray((sessionsData as any)?.sessions)
      ? (sessionsData as any).sessions
      : [];

    if (rawList.length === 0) {
      return [
        { id: "class-1", subject: "Mathematics", teacher: "Neha Ma'am", topic: "Linear Equations - Word Problems", duration: "60 mins", time: "09:00 AM", status: "live" as const, date: "Today" },
        { id: "class-2", subject: "Science", teacher: "Rohit Sir", topic: "Chemical Reactions & Equations", duration: "60 mins", time: "11:00 AM", status: "upcoming" as const, date: "Today" },
        { id: "class-3", subject: "English", teacher: "Priya Ma'am", topic: "Active and Passive Voice Rules", duration: "45 mins", time: "02:00 PM", status: "upcoming" as const, date: "Today" },
        { id: "class-4", subject: "Science", teacher: "Rohit Sir", topic: "Chapter 8: Basics of Motion", duration: "60 mins", time: "11:00 AM", status: "recorded" as const, date: "Yesterday" },
        { id: "class-5", subject: "Mathematics", teacher: "Neha Ma'am", topic: "Angles and Intersecting Lines", duration: "60 mins", time: "09:00 AM", status: "recorded" as const, date: "Yesterday" },
        { id: "class-6", subject: "Social Science", teacher: "Ankit Sir", topic: "Resources and Development", duration: "60 mins", time: "04:00 PM", status: "completed" as const, date: "2 Days Ago" }
      ];
    }
    return rawList;
  }, [sessionsData]);

  const filteredClasses = useMemo(() => {
    const list = Array.isArray(classes) ? classes : [];
    return list.filter(cls => {
      const matchesTab = activeTab === "live" 
        ? cls.status === "live" 
        : activeTab === "upcoming" 
        ? cls.status === "upcoming" 
        : activeTab === "recorded" 
        ? cls.status === "recorded" 
        : cls.status === "completed";
        
      const matchesSubject = subjectFilter === "All" || cls.subject === subjectFilter;
      const matchesTeacher = teacherFilter === "All" || cls.teacher === teacherFilter;
      const matchesDate = dateFilter === "All" || cls.date === dateFilter;

      return matchesTab && matchesSubject && matchesTeacher && matchesDate;
    });
  }, [classes, activeTab, subjectFilter, teacherFilter, dateFilter]);


  const weeklyTimetable = useMemo(() => {
    // Generate weekly slots dynamically based on classes data or default
    return [
      { day: "Mon", slots: ["Math (09:00 AM)", "Science (11:00 AM)", "English (02:00 PM)"] },
      { day: "Tue", slots: ["Math (09:00 AM)", "Science (11:00 AM)", "Social Sci (04:00 PM)"] },
      { day: "Wed", slots: ["Math (09:00 AM)", "Science (11:00 AM)", "Hindi (03:00 PM)"] },
      { day: "Thu", slots: ["Math (09:00 AM)", "Science (11:00 AM)", "Computer (10:00 AM)"] },
      { day: "Fri", slots: ["Math (09:00 AM)", "Science (11:00 AM)", "English (02:00 PM)"] },
      { day: "Sat", slots: ["Weekly Quiz (10:00 AM)", "Mentor Meet (05:00 PM)", "Self Study"] }
    ];
  }, []);

  const attendancePercent = useMemo(() => {
    return calendarData?.attendancePercentage ?? 96;
  }, [calendarData]);

  const calendarDays = useMemo(() => {
    if (calendarData?.days && calendarData.days.length > 0) {
      return calendarData.days;
    }
    // Generate default 30 days fallback
    return Array.from({ length: 30 }, (_, i) => {
      const dayNum = i + 1;
      const hasClass = dayNum % 3 === 0;
      return {
        day: dayNum,
        status: dayNum === 14 ? ("present" as const) : hasClass ? ("present" as const) : ("none" as const)
      };
    });
  }, [calendarData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const CircularProgress = ({ percent }: { percent: number }) => {
    const radius = 22;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center shrink-0 w-12 h-12">
        <svg width="48" height="48" className="transform -rotate-90">
          <circle className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="transparent" r={radius} cx="24" cy="24" />
          <circle className="text-brand-blue" strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="24" cy="24" />
        </svg>
        <span className="absolute text-[10px] font-black text-text-heading">{percent}%</span>
      </div>
    );
  };

  const handleRetry = () => {
    refetchSessions();
    refetchCalendar();
  };

  const isLoading = sessionsLoading || calendarLoading;

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Live Classes" subtitle="Loading live sessions catalog..." />
        <GlassCard className="p-6 border border-slate-100 bg-white h-48 animate-pulse">
          <div />
        </GlassCard>
        <div className="grid gap-6 lg:grid-cols-4 pt-6">
          <div className="lg:col-span-1">
            <GlassCard className="p-6 border border-slate-100 bg-white h-64 animate-pulse">
              <div />
            </GlassCard>
          </div>
          <div className="lg:col-span-3 space-y-4">
            {[1, 2].map((n) => (
              <GlassCard key={n} className="p-6 border border-slate-100 bg-white h-24 animate-pulse">
                <div />
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (sessionsError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load classes</h3>
        <p className="text-xs text-text-muted max-w-sm">
          Something went wrong while connecting to the server. Please check your connection and try again.
        </p>
        <button
          onClick={handleRetry}
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
      <PageHeader title="Live Classes" subtitle="Attend live interactive sessions, watch recordings, and browse study materials." />

      {/* Top Hero Banner */}
      <motion.div variants={itemVariants}>
        <div className="rounded-3xl border border-slate-100 bg-linear-to-r from-brand-blue to-brand-navy p-6 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center shadow-lg shadow-brand-blue/15 min-h-48">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center mix-blend-overlay opacity-20 pointer-events-none z-0" style={{ backgroundImage: `url('${BANNER_PHOTOS.mentor}')` }} />
          
          <div className="z-10 text-left space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Today's Live Sessions
            </span>
            <h2 className="font-display text-2xl font-black max-w-lg leading-tight">
              Mathematics Live Class is currently active with Neha Ma'am.
            </h2>
            <div className="flex items-center gap-6 text-xs text-blue-100">
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Next Class starts in:</span>
              <div className="flex items-baseline gap-1 font-mono font-black text-lg text-white font-semibold">
                <span>{countdown.mins.toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-bold text-blue-200 font-sans">m</span>
                <span>:</span>
                <span>{countdown.secs.toString().padStart(2, '0')}</span>
                <span className="text-[10px] font-bold text-blue-200 font-sans">s</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => toast.success("Redirecting to Virtual Class Engine...")}
            className="z-10 mt-6 md:mt-0 px-8 py-3.5 bg-white text-brand-blue rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-md cursor-pointer text-xs shrink-0 self-start md:self-center"
          >
            <Video className="h-4.5 w-4.5" /> Join Live Room
          </button>
        </div>
      </motion.div>

      {/* Row 2: Filtering and Interactive Tabs */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-5">
          <GlassCard className="p-5 border border-slate-100 bg-white space-y-4">
            <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <Filter className="h-4 w-4" /> Filter Classes
            </h3>

            {/* Subject Filter */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-text-heading">Subject</label>
              <select 
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-150 rounded-xl focus:outline-none focus:border-brand-blue font-semibold text-text-body"
              >
                <option value="All">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>

            {/* Teacher Filter */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-text-heading">Teacher</label>
              <select
                value={teacherFilter}
                onChange={(e) => setTeacherFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-155 rounded-xl focus:outline-none focus:border-brand-blue font-semibold text-text-body"
              >
                <option value="All">All Teachers</option>
                <option value="Neha Ma'am">Neha Ma'am</option>
                <option value="Rohit Sir">Rohit Sir</option>
                <option value="Priya Ma'am">Priya Ma'am</option>
                <option value="Ankit Sir">Ankit Sir</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-text-heading">Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-155 rounded-xl focus:outline-none focus:border-brand-blue font-semibold text-text-body"
              >
                <option value="All">All Days</option>
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="2 Days Ago">Previous Days</option>
              </select>
            </div>
          </GlassCard>
        </div>

        {/* Main Tabs and Classes Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs bar */}
          <div className="flex items-center gap-1 border-b border-slate-100 pb-1 overflow-x-auto">
            {["live", "upcoming", "recorded", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-4 py-2 text-xs font-bold capitalize transition-colors border-b-2 -mb-[1.5px] whitespace-nowrap cursor-pointer",
                  activeTab === tab 
                    ? "border-brand-blue text-brand-blue font-extrabold" 
                    : "border-transparent text-text-muted hover:text-text-heading"
                )}
              >
                {tab === "live" ? "Today's Classes" : tab}
              </button>
            ))}
          </div>

          {/* Cards Queue */}
          <div className="space-y-4">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((item, idx) => (
                <div 
                  key={item.id || idx} 
                  className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-semibold text-xs text-text-body text-left"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-md">
                        {item.subject}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">
                        {item.teacher}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-sm text-text-heading leading-tight truncate">{item.topic}</h4>
                    
                    <div className="flex items-center gap-3.5 text-[10px] text-text-muted font-semibold pt-1">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.duration}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.time} ({item.date})</span>
                    </div>
                  </div>

                  {/* Actions based on Tab */}
                  <div className="shrink-0 self-start sm:self-center flex flex-wrap gap-2 text-xs font-bold">
                    {item.status === "live" && (
                      <button 
                        onClick={() => toast.success("Joining Live Lecture Room...")}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping shrink-0" />
                        Join Live Now
                      </button>
                    )}

                    {item.status === "upcoming" && (
                      <span className="text-[10px] font-bold text-brand-orange bg-orange-50 border border-brand-orange/20 px-3 py-2 rounded-xl">
                        Starts {item.time}
                      </span>
                    )}

                    {(item.status === "recorded" || item.status === "completed") && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toast.info(`Playing lecture stream: ${item.topic}`)}
                          className="h-8.5 px-3.5 bg-brand-blue hover:bg-brand-navy text-white rounded-xl transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                        >
                          <Play className="h-3.5 w-3.5 fill-white" /> Watch Recording
                        </button>
                        
                        <button 
                          onClick={() => handleDownloadNotes(item.subject)}
                          className="h-8.5 px-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                          title="Download Notes"
                        >
                          <Download className="h-3.5 w-3.5" /> Notes
                        </button>

                        <Link 
                          to="/dashboard/student/ai"
                          className="h-8.5 px-3 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl transition-colors flex items-center justify-center gap-1"
                        >
                          <HelpCircle className="h-3.5 w-3.5" /> Doubts
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs font-semibold text-text-muted space-y-2 border border-slate-100 rounded-3xl bg-white/50">
                <AlertCircle className="h-8 w-8 mx-auto text-slate-350 animate-pulse" />
                <p>No live classes match your subject or teacher filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Timetable, Calendar, and Attendance Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Timetable */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-5 border border-slate-100 bg-white">
            <h3 className="font-display text-sm font-bold text-text-heading flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-brand-blue" />
              Weekly Timetable
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              {weeklyTimetable.map((day, idx) => (
                <div key={idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-2xl text-left space-y-2.5 min-h-36">
                  <span className="font-black text-xs text-text-heading block border-b border-slate-100 pb-1">{day.day}</span>
                  <div className="space-y-1.5 text-[8.5px] font-bold text-text-muted">
                    {day.slots.map((slot, sIdx) => (
                      <span key={sIdx} className="block bg-white p-1 rounded border border-slate-100/60 truncate" title={slot}>
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Live Attendance & Calendar Stats */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          {/* Attendance */}
          <GlassCard className="p-5 border border-slate-100 bg-white flex items-center gap-4">
            <CircularProgress percent={attendancePercent} />
            <div className="text-left text-xs font-semibold text-text-body min-w-0">
              <h4 className="font-bold text-text-heading text-sm leading-tight">Live Attendance</h4>
              <p className="text-[10px] text-text-muted mt-0.5 leading-normal font-medium">You attended {Math.round(25 * (attendancePercent / 100))} out of 25 classes this month. Outstanding commitment!</p>
            </div>
          </GlassCard>

          {/* Calendar Grid View */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-3">
            <h4 className="text-xs font-bold text-text-heading uppercase tracking-wider text-slate-400 font-display">Class Calendar View</h4>
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[8.5px] text-text-muted">
              {["S","M","T","W","T","F","S"].map((d, i) => (
                <span key={i} className="py-1 text-slate-350">{d}</span>
              ))}
              {calendarDays.map((d: any, i) => {
                return (
                  <span 
                    key={i} 
                    className={cn(
                      "py-1.5 rounded-lg font-bold flex items-center justify-center shrink-0",
                      d.day === 14 ? "bg-brand-blue text-white" : 
                      d.status === "present" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-50 text-slate-500"
                    )}
                  >
                    {d.day}
                  </span>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
