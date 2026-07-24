import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { 
  FileQuestion, 
  CheckCircle2, 
  Clock, 
  BarChart3, 
  AlertCircle, 
  Play, 
  X, 
  Check, 
  Timer, 
  Award, 
  TrendingUp, 
  Flame, 
  Compass, 
  HelpCircle, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";
import { useAuth } from "@/app/providers/auth-context";
import { 
  useAssessments, 
  useAssessment, 
  useStartAttempt, 
  useSaveAnswer, 
  useSubmitAttempt 
} from "@/features/assessments/queries/useAssessments";
import { AssessmentService } from "@/features/assessments/services/assessment.service";
import { Assessment, Attempt, AssessmentResult } from "@/features/assessments/types";

export const Route = createFileRoute("/dashboard/student/assessments")({
  component: AssessmentsPage,
  head: () => ({ meta: [{ title: "Assessments — Vedhkrit" }] }),
});

function AssessmentsPage() {
  const { user } = useAuth();
  const studentId = user?.id || 'student-123';

  const { data: assessments, isLoading, isError, refetch } = useAssessments();
  const startAttempt = useStartAttempt();
  const saveAnswer = useSaveAnswer();
  const submitAttempt = useSubmitAttempt();

  const [activeTab, setActiveTab] = useState<"upcoming" | "practice" | "completed" | "results">("upcoming");

  // Quiz Modal States
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [activeAttempt, setActiveAttempt] = useState<Attempt | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // countdown seconds
  const [latestResult, setLatestResult] = useState<AssessmentResult | null>(null);
  const [isSubmittingAttempt, setIsSubmittingAttempt] = useState(false);

  const { data: quizDetails, isLoading: quizLoading } = useAssessment(activeQuiz);
  const activeQuestionsList = quizDetails?.questionsList ?? [];

  const assessmentsList: Assessment[] = useMemo(() => {
    if (Array.isArray(assessments)) return assessments;
    if (assessments && Array.isArray((assessments as any).data)) return (assessments as any).data;
    if (assessments && Array.isArray((assessments as any).items)) return (assessments as any).items;
    return [];
  }, [assessments]);

  const upcoming = useMemo(() => assessmentsList.filter((a: Assessment) => a.status === "upcoming"), [assessmentsList]);
  const completed = useMemo(() => assessmentsList.filter((a: Assessment) => a.status === "completed"), [assessmentsList]);
  const practice = useMemo(() => assessmentsList.filter((a: Assessment) => a.status === "practice"), [assessmentsList]);

  useEffect(() => {
    if (!activeQuiz || !activeAttempt) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeQuiz, activeAttempt]);

  const handleStartQuiz = async (id: string) => {
    try {
      const attempt = await startAttempt.mutateAsync(id);
      setActiveAttempt(attempt);
      setActiveQuiz(id);
      setCurrentQuestionIdx(0);
      setSelectedAnswers({});

      // Set time left from expiresAt or default to 600s
      const secondsLeft = Math.max(0, Math.floor((new Date(attempt.expiresAt).getTime() - Date.now()) / 1000));
      setTimeLeft(secondsLeft || 600);

      toast.info("Quiz Started!", {
        description: `You have ${Math.round((secondsLeft || 600) / 60)} minutes to complete the test. Good luck!`
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to start assessment. Please try again.");
    }
  };

  const handleSelectOption = async (optIdx: number) => {
    const updatedAnswers = { ...selectedAnswers, [currentQuestionIdx]: optIdx };
    setSelectedAnswers(updatedAnswers);

    const question = activeQuestionsList[currentQuestionIdx];
    if (activeAttempt && question) {
      try {
        // Auto-save answer to backend
        await saveAnswer.mutateAsync({
          attemptId: activeAttempt.id,
          answer: {
            questionId: question.id,
            answerIdx: optIdx
          }
        });
      } catch (err) {
        console.error("Autosave failed:", err);
      }
    }
  };

  const handleSubmitQuiz = async () => {
    if (!activeAttempt) return;
    try {
      setIsSubmittingAttempt(true);
      await submitAttempt.mutateAsync(activeAttempt.id);

      // Fetch dynamic grading score details
      const result = await AssessmentService.getResult(activeAttempt.id);
      setLatestResult(result);

      setActiveQuiz(null);
      setActiveAttempt(null);
      setIsSubmittingAttempt(false);

      toast.success(`Assessment submitted!`, {
        description: `You scored ${result.score}% (${result.correctAnswers}/${result.correctAnswers + result.wrongAnswers} correct).`,
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      });

      // Redirect view to completed tab
      setActiveTab("completed");
    } catch (err: any) {
      setIsSubmittingAttempt(false);
      toast.error(err?.message || "Failed to submit attempt.");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="Assessments" subtitle="Loading tests and performance data..." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <GlassCard key={n} className="p-5 bg-white border border-slate-100 h-24 animate-pulse flex flex-col justify-between"><div /></GlassCard>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3 pt-6">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2].map((n) => (
              <GlassCard key={n} className="p-6 border border-slate-100 bg-white h-44 animate-pulse flex flex-col justify-between"><div /></GlassCard>
            ))}
          </div>
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-5 border border-slate-100 bg-white h-48 animate-pulse"><div /></GlassCard>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load assessments</h3>
        <p className="text-xs text-text-muted max-w-sm">
          Something went wrong while connecting to the server. Please check your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
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
      <PageHeader title="Assessments" subtitle="Take your tests, check your results, and see which topics to work on." />

      {/* Top Highlights Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Upcoming Tests", val: upcoming.length, color: "border-brand-orange text-brand-orange bg-orange-50/50" },
          { label: "Completed Tests", val: completed.length, color: "border-brand-blue text-brand-blue bg-blue-50/50" },
          { label: "Average Score", val: "88.5%", color: "border-brand-teal text-brand-teal bg-teal-50/50" },
          { label: "Best Subject", val: "Mathematics", color: "border-purple-500 text-purple-600 bg-purple-50/50" }
        ].map((stat, i) => (
          <GlassCard key={i} className={cn("p-5 border-l-4 bg-white flex flex-col justify-between h-24", stat.color)}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
            <span className="font-display text-2xl font-black text-text-heading mt-1">{stat.val}</span>
          </GlassCard>
        ))}
      </div>

      {/* Main Tabs Selection */}
      <div className="flex items-center gap-1 border-b border-slate-100 pb-1 overflow-x-auto">
        {["upcoming", "practice", "completed", "results"].map((tab) => (
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
            {tab === "upcoming" ? "Upcoming Tests" : tab === "practice" ? "Practice Tests" : tab}
          </button>
        ))}
      </div>

      {/* Tests Catalog Panels */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side: Test Cards Grid */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4"
            >
              {activeTab === "upcoming" && (
                upcoming.length > 0 ? (
                  upcoming.map((test: Assessment, idx: number) => (
                    <GlassCard key={test.id || idx} className="p-5 border border-slate-100 bg-white hover:border-brand-orange/20 transition-all text-left">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9.5px] font-bold text-brand-orange bg-orange-50 px-2 py-0.5 rounded border border-brand-orange/10 uppercase tracking-wider">
                          {test.difficulty}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          {test.duration}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-text-heading leading-tight">{test.subject}</h4>
                      <p className="text-xs text-text-muted mt-1 leading-normal font-semibold">{test.chapter}</p>

                      <div className="flex items-center gap-4 text-[10.5px] text-text-muted font-bold pt-4 border-t border-slate-50 mt-4">
                        <span className="flex items-center gap-1"><FileQuestion className="h-4 w-4" /> {test.questions} Questions</span>
                        <span className="flex items-center gap-1"><Award className="h-4 w-4" /> {test.marks} Marks</span>
                      </div>

                      <button 
                        onClick={() => handleStartQuiz(test.id)}
                        className="w-full mt-5 py-2.5 bg-brand-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-white" /> Start Assessment
                      </button>
                    </GlassCard>
                  ))
                ) : (
                  <div className="py-12 text-center text-xs font-semibold text-text-muted space-y-2 border border-slate-100 rounded-3xl bg-white/50">
                    <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-500" />
                    <p>All scheduled assessments completed!</p>
                  </div>
                )
              )}

              {activeTab === "practice" && (
                practice.length > 0 ? (
                  practice.map((test: Assessment, idx: number) => (
                    <GlassCard key={test.id || idx} className="p-5 border border-slate-100 bg-white hover:border-brand-teal/20 transition-all text-left">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9.5px] font-bold text-brand-teal bg-teal-50 px-2 py-0.5 rounded border border-brand-teal/10 uppercase tracking-wider">
                          Practice Mode
                        </span>
                        <span className="text-xs font-bold text-slate-400">{test.duration}</span>
                      </div>
                      <h4 className="font-bold text-base text-text-heading leading-tight">{test.subject}</h4>
                      <p className="text-xs text-text-muted mt-1 leading-normal font-semibold">{test.chapter}</p>
                      <button 
                        type="button"
                        onClick={() => handleStartQuiz(test.id)}
                        className="w-full mt-5 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Launch Practice Quiz
                      </button>
                    </GlassCard>
                  ))
                ) : (
                  <div className="py-12 text-center text-xs font-semibold text-text-muted space-y-2 border border-slate-100 rounded-3xl bg-white/50">
                    <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-500" />
                    <p>No practice tests available.</p>
                  </div>
                )
              )}

              {activeTab === "completed" && (
                completed.length > 0 ? (
                  completed.map((test: Assessment, idx: number) => (
                    <GlassCard key={test.id || idx} className="p-5 border border-slate-100 bg-white hover:border-slate-200 transition-all text-left">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[9px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-md">
                            {test.subject}
                          </span>
                          <h4 className="font-bold text-sm text-text-heading mt-2 leading-tight">{test.chapter}</h4>
                        </div>
                        
                        <div className="text-right">
                          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Accuracy</span>
                          <span className="text-base font-black text-brand-blue">{test.marks}%</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => toast.info(`Opening test review page...`)}
                        className="w-full py-2 bg-slate-50 border border-slate-150 text-text-heading rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <BarChart3 className="h-4 w-4" /> View Detailed Analysis
                      </button>
                    </GlassCard>
                  ))
                ) : (
                  <div className="py-12 text-center text-xs font-semibold text-text-muted space-y-2 border border-slate-100 rounded-3xl bg-white/50">
                    <AlertCircle className="h-8 w-8 mx-auto text-slate-400" />
                    <p>No completed assessments recorded.</p>
                  </div>
                )
              )}

              {activeTab === "results" && (
                <GlassCard className="p-5 border border-slate-100 bg-white text-left">
                  <h4 className="font-display text-sm font-bold text-text-heading mb-4">Term Grading Sheet</h4>
                  {latestResult ? (
                    <div className="space-y-3 text-xs font-semibold text-text-muted mb-4">
                      <div className="p-3 bg-blue-50/50 border border-brand-blue/15 rounded-xl flex justify-between items-center">
                        <div>
                          <h5 className="font-bold text-text-heading">Latest Attempt Score</h5>
                          <p className="text-[9.5px] text-text-muted mt-0.5">{latestResult.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-brand-blue text-sm block">{latestResult.score}%</span>
                          <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-wider">{latestResult.rank}</span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="space-y-3 text-xs font-semibold text-text-muted">
                    {[
                      { title: "Quarter 1 Chemistry Exam", date: "15 Apr 2026", marks: "28/30", status: "Passed" },
                      { title: "Weekly Algebra Aptitude test", date: "02 Apr 2026", marks: "24/30", status: "Passed" }
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl flex justify-between items-center">
                        <div>
                          <h5 className="font-bold text-text-heading">{item.title}</h5>
                          <p className="text-[9.5px] text-text-muted mt-0.5">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-brand-blue text-sm block">{item.marks}</span>
                          <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-wider">{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Analytical charts, weak topics, and advice */}
        <div className="lg:col-span-1 space-y-6">
          {/* Performance Trend SVG Chart */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-4">
            <div>
              <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Performance Trends</h3>
              <p className="text-[9.5px] text-text-muted mt-0.5">Test percentage history over time</p>
            </div>

            <div className="h-36 w-full flex items-center justify-center">
              <svg viewBox="0 0 100 40" className="w-full h-full">
                <line x1="0" y1="10" x2="100" y2="10" stroke="#f1f5f9" strokeWidth="0.5" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="#f1f5f9" strokeWidth="0.5" />
                <path 
                  d="M 5 30 L 25 22 L 50 25 L 75 14 L 95 6" 
                  fill="none" 
                  stroke="#1a365d" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <circle cx="5" cy="30" r="1.5" fill="#f97316" />
                <circle cx="25" cy="22" r="1.5" fill="#f97316" />
                <circle cx="50" cy="25" r="1.5" fill="#f97316" />
                <circle cx="75" cy="14" r="1.5" fill="#f97316" />
                <circle cx="95" cy="6" r="1.5" fill="#f97316" />
              </svg>
            </div>
            
            <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-wider px-1">
              <span>Test 1</span>
              <span>Test 2</span>
              <span>Test 3</span>
              <span>Test 4</span>
              <span>Test 5</span>
            </div>
          </GlassCard>

          {/* Subject Wise Scores progress indicators */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-4">
            <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Subject Wise Scores</h3>
            
            <div className="space-y-3 text-[10px] font-bold text-text-muted">
              {[
                { name: "Mathematics", score: 94, color: "bg-brand-blue" },
                { name: "Science", score: 88, color: "bg-brand-teal" },
                { name: "English", score: 82, color: "bg-brand-orange" },
                { name: "Computer CS", score: 98, color: "bg-indigo-500" }
              ].map((sub, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between">
                    <span>{sub.name}</span>
                    <span className="text-text-heading">{sub.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={cn("h-1.5 rounded-full", sub.color)} style={{ width: `${sub.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Weak Topics */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-3">
            <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Weak Topics</h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { name: "Balancing Equations", count: 2 },
                { name: "Motion Numericals", count: 1 },
                { name: "Tenses & Voice Conversion", count: 2 }
              ].map((tag, i) => (
                <span key={i} className="text-[9.5px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-150 flex items-center gap-1">
                  <Flame className="h-3 w-3 shrink-0" /> {tag.name}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Recommended Practice */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-3">
            <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Practice</h3>
            <div className="space-y-2.5 text-[10.5px] font-semibold text-text-body">
              {[
                { title: "Linear Equations Practice Worksheet", desc: "For exam revision support" },
                { title: "Physics Motion Equations MCQ set", desc: "Focuses on speed and velocity answers" }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-brand-teal/20 transition-all flex justify-between items-center">
                  <div className="text-left">
                    <h5 className="font-bold text-text-heading truncate max-w-32">{item.title}</h5>
                    <p className="text-[9px] text-text-muted mt-0.5 leading-none">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => toast.success("Accessing practice worksheet portal...")}
                    className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer flex items-center gap-0.5"
                  >
                    Solve <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Quiz Modal Overlay */}
      <AnimatePresence>
        {activeQuiz && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 text-left"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 relative"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-text-heading">
                    {upcoming.find((t: Assessment) => t.id === activeQuiz)?.chapter || practice.find((t: Assessment) => t.id === activeQuiz)?.chapter || "Assessment"}
                  </h3>
                  <p className="text-[10.5px] text-text-muted mt-0.5">Vedhkrit Diagnostic Engine</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-brand-orange/20 text-brand-orange font-bold text-xs">
                  <Timer className="h-4 w-4 animate-pulse" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {quizLoading ? (
                <div className="p-16 text-center flex flex-col items-center justify-center space-y-4 font-semibold text-xs">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                  <span className="text-text-muted">Loading test questions...</span>
                </div>
              ) : activeQuestionsList.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase">
                    <span>Question {currentQuestionIdx + 1} of {activeQuestionsList.length}</span>
                    <span>{Math.round(((currentQuestionIdx) / activeQuestionsList.length) * 100)}% progress</span>
                  </div>
                  <div className="w-full bg-slate-155 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-brand-blue h-1 rounded-full transition-all duration-300" 
                      style={{ width: `${((currentQuestionIdx) / activeQuestionsList.length) * 100}%` }}
                    />
                  </div>

                  <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 text-sm font-semibold text-text-heading leading-normal">
                    {activeQuestionsList[currentQuestionIdx].q}
                  </div>

                  <div className="space-y-2.5">
                    {activeQuestionsList[currentQuestionIdx].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={cn(
                            "w-full text-left p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all",
                            isSelected 
                              ? "border-brand-blue bg-brand-blue/5 text-brand-blue" 
                              : "border-slate-100 bg-white hover:bg-slate-50 text-text-body"
                          )}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="h-4 w-4 stroke-[3px] text-brand-blue" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-16 text-center text-xs font-bold text-text-muted">
                  No Questions available.
                </div>
              )}

              {!quizLoading && activeQuestionsList.length > 0 && (
                <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-6">
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIdx === 0}
                    className="px-4 py-2 text-xs font-bold text-text-muted hover:text-text-heading disabled:opacity-30 cursor-pointer"
                  >
                    Previous
                  </button>

                  {currentQuestionIdx < activeQuestionsList.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                      disabled={selectedAnswers[currentQuestionIdx] === undefined}
                      className="px-5 py-2.5 bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold rounded-xl disabled:bg-blue-300 transition-colors cursor-pointer"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={isSubmittingAttempt || Object.keys(selectedAnswers).length < activeQuestionsList.length}
                      className="px-6 py-2.5 bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold rounded-xl disabled:bg-orange-300 transition-colors cursor-pointer"
                    >
                      {isSubmittingAttempt ? "Submitting..." : "Submit Test"}
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
