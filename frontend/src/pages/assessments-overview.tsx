import { Link, useNavigate } from "@tanstack/react-router";
import { GlassCard } from "@/shared/ui/glass-card";
import { Logo } from "@/shared/ui/logo";
import { 
  Brain, 
  Target, 
  Sparkles, 
  Users, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Play, 
  Zap, 
  UserCircle,
  Timer,
  Award,
  Check,
  RotateCcw,
  BookOpen
} from "lucide-react";
import { useAssessmentStatus } from "@/shared/constants/assessment-status";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";

// Sample Diagnostic Question Battery for the Single Unified Assessment
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    dimension: "Aptitude & Pattern Recognition",
    question: "If a autonomous SLEC rover completes 3 laps in 12 minutes, how many laps will it complete in 28 minutes at constant velocity?",
    options: ["6 Laps", "7 Laps", "8 Laps", "9 Laps"],
    correctIdx: 1,
  },
  {
    id: 2,
    dimension: "Logical & Spatial Reasoning",
    question: "Which code snippet correctly initializes a sensor calibration loop for a 3D LiDAR array?",
    options: [
      "for (let i=0; i<3; i++) calibrateSensor(i);",
      "while(true) calibrate();",
      "if (sensor.active) stop();",
      "return null;"
    ],
    correctIdx: 0,
  },
  {
    id: 3,
    dimension: "VAK Learning DNA Profile",
    question: "When learning complex STEM concepts like Neural Network Backpropagation, what helps you grasp the material fastest?",
    options: [
      "Interactive 3D diagrams & visual flowcharts",
      "Step-by-step written tutorials & equations",
      "Hands-on SLEC lab simulations & code execution",
      "Listening to expert mentor explanations"
    ],
    correctIdx: 0,
  },
  {
    id: 4,
    dimension: "Cognitive Problem Solving Style",
    question: "Faced with a tricky multi-variable calculus problem during a timed quiz, what is your default strategy?",
    options: [
      "Deconstruct into sub-equations methodically",
      "Test boundary values and estimate intuitively",
      "Map visually on scratch paper before solving",
      "Look for recurring algebraic symmetry patterns"
    ],
    correctIdx: 0,
  },
  {
    id: 5,
    dimension: "Career & STEM Interest Battery",
    question: "Which of the following real-world innovation domains excites you the most for your future career?",
    options: [
      "Robotics, Autonomous Hardware & IoT Sensors",
      "Artificial Intelligence & Machine Learning Models",
      "Software Development & Full-Stack Systems",
      "Data Analytics & Computational Mathematics"
    ],
    correctIdx: 1,
  }
];

export default function AssessmentsOverviewPage() {
  const navigate = useNavigate();
  const { done: assessmentDone, markDone } = useAssessmentStatus();

  // Test State
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 Mins
  const [isFinished, setIsFinished] = useState(false);
  const [computedScore, setComputedScore] = useState(0);

  useEffect(() => {
    if (!isTestActive || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTestActive, isFinished]);

  const handleStartTest = () => {
    setIsTestActive(true);
    setIsFinished(false);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setTimeLeft(900);
    toast.info("Assessment Started! Good luck!");
  };

  const handleOptionSelect = (optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleFinishAssessment();
    }
  };

  const handleFinishAssessment = () => {
    // Calculate Score
    let correctCount = 0;
    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIdx) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / DIAGNOSTIC_QUESTIONS.length) * 100);
    setComputedScore(finalScore);
    setIsFinished(true);
    setIsTestActive(false);
    markDone();
    toast.success("Diagnostic Assessment Complete! Your Vedhkrit Index has been updated.");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-bg-primary relative overflow-hidden text-left font-sans">
      {/* Background Radial Orbs in Brand Colors */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-teal/10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <Link 
            to="/dashboard/student" 
            className="text-xs font-bold text-brand-blue hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            Go to Student Dashboard →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">

        {/* ACTIVE TEST MODAL / INTERFACE */}
        {isTestActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue text-[11px] font-bold">
                  <Brain className="w-3.5 h-3.5" /> VEDHKRIT AI Diagnostic Assessment
                </span>
                <h2 className="text-base font-extrabold text-slate-800 mt-1">
                  Question {currentIdx + 1} of {DIAGNOSTIC_QUESTIONS.length}
                </h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 border border-brand-orange/20 text-brand-orange font-mono font-bold text-xs">
                <Timer className="w-4 h-4 animate-pulse" />
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Question Content */}
            <div className="space-y-6">
              <div className="text-[11px] font-bold text-brand-teal uppercase tracking-wider">
                {DIAGNOSTIC_QUESTIONS[currentIdx].dimension}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                {DIAGNOSTIC_QUESTIONS[currentIdx].question}
              </h3>

              {/* Options Grid */}
              <div className="grid gap-3 pt-2">
                {DIAGNOSTIC_QUESTIONS[currentIdx].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIdx] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOptionSelect(idx)}
                      className={cn(
                        "w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all duration-150 flex items-center justify-between cursor-pointer",
                        isSelected 
                          ? "border-brand-blue bg-blue-50/60 text-brand-blue ring-2 ring-brand-blue/20" 
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "w-5 h-5 rounded-full border text-[11px] flex items-center justify-center font-bold shrink-0",
                          isSelected ? "bg-brand-blue text-white border-brand-blue" : "border-slate-300 text-slate-500"
                        )}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-brand-blue shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={selectedAnswers[currentIdx] === undefined}
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue text-white text-xs font-bold shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {currentIdx === DIAGNOSTIC_QUESTIONS.length - 1 ? "Submit Assessment" : "Next Question"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* FINISHED / RESULTS CARD */}
        {isFinished && !isTestActive && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-brand-teal/30 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Assessment Complete</span>
                <h2 className="text-xl font-black text-slate-800">Vedhkrit AI Diagnostic Summary</h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 my-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Diagnostic Score</div>
                <div className="text-2xl font-black text-brand-blue mt-1">{computedScore}%</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Vedhkrit Index</div>
                <div className="text-2xl font-black text-brand-teal mt-1">85 / 100</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Learning Style</div>
                <div className="text-xs font-bold text-slate-700 mt-2">Visual & Kinesthetic</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium mb-6">
              Great effort! Your response profile has populated your <strong>Learning DNA</strong>, top career recommendations, and custom study goals on your personal dashboard.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard/student"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-blue text-white text-xs font-bold shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              >
                Go to Personal Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={handleStartTest}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
              </button>
            </div>
          </motion.div>
        )}

        {/* INITIAL LANDING BANNER (Single Unified Assessment) */}
        {!isTestActive && !isFinished && (
          <div className="space-y-8">
            {/* Main Single Assessment Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-brand-teal/25 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-indigo-500/5 p-6 sm:p-8 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Official Vedhkrit AI Battery
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                    VEDHKRIT Unified AI Diagnostic Assessment
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    One single, comprehensive diagnostic test evaluating your <strong>Aptitude</strong>, <strong>Logical Reasoning</strong>, <strong>VAK Learning Style</strong>, and <strong>STEM Innovation Potential</strong>.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-brand-teal" /> 5 Quick Adaptive Questions</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-blue" /> 15 Minutes Max</div>
                    <div className="flex items-center gap-1.5"><Award className="w-4 h-4 text-brand-orange" /> Unlocks Dashboard & Index</div>
                  </div>
                </div>

                <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleStartTest}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-teal via-brand-blue to-indigo-600 text-white text-sm font-extrabold shadow-lg shadow-brand-blue/20 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" /> Start AI Diagnostic Now
                  </button>
                  <Link
                    to="/dashboard/student"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-100 transition-colors text-center cursor-pointer"
                  >
                    Skip for now →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Assessment Dimensions Overview Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-blue" />
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Evaluated Dimensions in This Single Assessment
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Brain, title: "Aptitude & Logic", desc: "Verbal, numerical, spatial, and algorithmic pattern recognition.", color: "text-brand-blue bg-blue-50" },
                  { icon: Target, title: "Learning Style (VAK)", desc: "Identifies whether you retain information best visually, auditory, or hands-on.", color: "text-brand-teal bg-teal-50" },
                  { icon: Sparkles, title: "21st Century Skills", desc: "Critical thinking, creativity, and autonomous problem-solving capacity.", color: "text-purple-600 bg-purple-50" },
                  { icon: Users, title: "Focus & Resilience", desc: "Measures stress tolerance, study endurance, and exam readiness.", color: "text-brand-orange bg-orange-50" },
                  { icon: Zap, title: "STEM Innovation Fit", desc: "Assesses inclination towards Robotics, AI, Data Science, & Engineering.", color: "text-indigo-600 bg-indigo-50" },
                  { icon: Award, title: "Vedhkrit Index Benchmark", desc: "Generates your overall baseline growth index score out of 100.", color: "text-emerald-600 bg-emerald-50" },
                ].map((dim, idx) => (
                  <GlassCard key={idx} className="p-4 border border-slate-200/80 bg-white">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", dim.color)}>
                      <dim.icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">{dim.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">{dim.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
