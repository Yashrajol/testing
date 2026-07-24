import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  UserCheck, 
  Star, 
  Target, 
  Zap, 
  Activity, 
  Download, 
  Bookmark, 
  Heart, 
  Flame, 
  Compass, 
  Briefcase,
  Play,
  Plus,
  Loader2,
  AlertCircle,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";
import { useAuth } from "@/app/providers/auth-context";
import { useLearningDna, useCompetencyProfile } from "@/features/learning-dna/queries/useLearningDna";
import { useGrowthIndex, useCareerMatches, useGrowthInsights, useGoals, useCreateGoal } from "@/features/growth/queries/useGrowth";
import { CareerMatch } from "@/features/growth/types";

export const Route = createFileRoute("/dashboard/student/skills")({
  component: UnifiedGrowthPage,
  head: () => ({ meta: [{ title: "My Growth — Vedhkrit" }] }),
});

function UnifiedGrowthPage() {
  const { user } = useAuth();
  const studentId = user?.id || 'student-123';

  // React Queries
  const { data: learningDna, isLoading: dnaLoading, isError: dnaError, refetch: refetchDna } = useLearningDna(studentId);
  const { data: compProfile, isLoading: compLoading, isError: compError, refetch: refetchComp } = useCompetencyProfile(studentId);
  const { data: growthIndex, isLoading: indexLoading, isError: indexError, refetch: refetchIndex } = useGrowthIndex(studentId);
  const { data: careerMatches, isLoading: careerLoading, isError: careerError, refetch: refetchCareer } = useCareerMatches(studentId);
  const { data: insights, isLoading: insightsLoading, isError: insightsError, refetch: refetchInsights } = useGrowthInsights(studentId);
  const { data: goals, isLoading: goalsLoading, isError: goalsError, refetch: refetchGoals } = useGoals(studentId);
  
  const createGoalMutation = useCreateGoal();

  // Selected Career State
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>("");
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDesc, setNewGoalDesc] = useState("");

  const careerList: CareerMatch[] = useMemo(() => {
    if (Array.isArray(careerMatches)) return careerMatches;
    if (careerMatches && Array.isArray((careerMatches as any).items)) return (careerMatches as any).items;
    if (careerMatches && Array.isArray((careerMatches as any).data)) return (careerMatches as any).data;
    if (careerMatches && Array.isArray((careerMatches as any).careers)) return (careerMatches as any).careers;
    return [];
  }, [careerMatches]);

  const activePathway = useMemo(() => {
    if (!careerList || careerList.length === 0) return null;
    return careerList.find((p: CareerMatch) => p.id === selectedPathwayId) || careerList[0];
  }, [careerList, selectedPathwayId]);

  const handleDownloadCert = (name: string, size: string) => {
    toast.success(`Started downloading: ${name}`, {
      description: `File size: ${size}. Saved to downloads.`,
      icon: <Download className="h-4.5 w-4.5 text-brand-blue" />
    });
  };

  const handleAddGoalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    try {
      await createGoalMutation.mutateAsync({
        studentId,
        title: newGoalTitle,
        desc: newGoalDesc
      });
      setNewGoalTitle("");
      setNewGoalDesc("");
      setIsAddingGoal(false);
      toast.success("Goal added successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Failed to create goal.");
    }
  };

  // Compile polygon points dynamically from Competency Profile
  const polygonPoints = useMemo(() => {
    if (!compProfile) return "50,16 76,35 77.7,66 50,85.2 20.6,67 18.2,31.6"; // fallback coords

    const r = 40;
    const aVal = (compProfile.academic ?? 85) / 100;
    const commVal = (compProfile.communication ?? 75) / 100;
    const leadVal = (compProfile.leadership ?? 80) / 100;
    const ctVal = (compProfile.criticalThinking ?? 88) / 100;
    const creatVal = (compProfile.creativity ?? 85) / 100;
    const constVal = (compProfile.consistency ?? 92) / 100;

    const p1 = `50,${(50 - r * aVal).toFixed(1)}`;
    const p2 = `${(50 + r * commVal * 0.866).toFixed(1)},${(50 - r * commVal * 0.5).toFixed(1)}`;
    const p3 = `${(50 + r * leadVal * 0.866).toFixed(1)},${(50 + r * leadVal * 0.5).toFixed(1)}`;
    const p4 = `50,${(50 + r * ctVal).toFixed(1)}`;
    const p5 = `${(50 - r * creatVal * 0.866).toFixed(1)},${(50 + r * creatVal * 0.5).toFixed(1)}`;
    const p6 = `${(50 - r * constVal * 0.866).toFixed(1)},${(50 - r * constVal * 0.5).toFixed(1)}`;

    return `${p1} ${p2} ${p3} ${p4} ${p5} ${p6}`;
  }, [compProfile]);

  // Compute sparkline path coordinates dynamically from growthIndex history
  const chartPath = useMemo(() => {
    const history = growthIndex?.history ?? [600, 680, 720, 750, 780];
    if (history.length === 0) return "M 5 30";

    const xStep = 90 / Math.max(1, history.length - 1);
    const maxVal = 1000;

    return history.map((val, idx) => {
      const x = 5 + idx * xStep;
      const percentage = Math.min(1, Math.max(0, val / maxVal));
      const y = 35 - percentage * 29;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  }, [growthIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const isLoading = dnaLoading || compLoading || indexLoading || careerLoading || insightsLoading || goalsLoading;
  const isError = dnaError || compError || indexError || careerError || insightsError || goalsError;

  const handleRetry = () => {
    refetchDna();
    refetchComp();
    refetchIndex();
    refetchCareer();
    refetchInsights();
    refetchGoals();
  };

  if (isLoading) {
    return (
      <div className="space-y-6 text-left">
        <PageHeader title="My Growth" subtitle="Loading growth score and skills plan..." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <GlassCard key={n} className="p-5 bg-white border border-slate-100 h-24 animate-pulse">
              <div />
            </GlassCard>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-12 pt-6">
          <div className="lg:col-span-5">
            <GlassCard className="p-6 border border-slate-100 bg-white h-96 animate-pulse">
              <div />
            </GlassCard>
          </div>
          <div className="lg:col-span-7">
            <GlassCard className="p-6 border border-slate-100 bg-white h-96 animate-pulse">
              <div />
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60dvh] flex-col items-center justify-center space-y-4 text-center">
        <AlertCircle className="h-12 w-12 text-brand-orange animate-bounce" />
        <h3 className="font-display text-lg font-bold text-text-heading">Failed to load growth profile</h3>
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
      <PageHeader title="My Growth" subtitle="Your growth score, how you learn best, and your plan to build new skills." />

      {/* Top Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            label: "Vedhkrit Index", 
            val: `${growthIndex?.indexValue ?? 780} / 1000`, 
            desc: growthIndex?.percentileDesc ?? "In the top 8% across India", 
            color: "border-brand-blue text-brand-blue bg-blue-50/50" 
          },
          { 
            label: "How You Learn Best", 
            val: learningDna?.learnStyle ?? "Hands-on & Visual", 
            desc: learningDna?.learnStyleDesc ?? "You learn well with pictures", 
            color: "border-brand-teal text-brand-teal bg-teal-50/50" 
          },
          { 
            label: "Confidence", 
            val: `${learningDna?.confidence ?? 86}%`, 
            desc: `+${learningDna?.confidenceChange ?? 4}% since last check`, 
            color: "border-brand-orange text-brand-orange bg-orange-50/50" 
          },
          { 
            label: "Study Growth", 
            val: `+${learningDna?.studyGrowth ?? 14}%`, 
            desc: "You study regularly — great job!", 
            color: "border-purple-500 text-purple-600 bg-purple-50/50" 
          }
        ].map((stat, i) => (
          <GlassCard key={i} className={cn("p-5 border-l-4 bg-white flex flex-col justify-between h-24 shadow-xs", stat.color)}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
            <div>
              <span className="font-display text-xl font-black text-text-heading block leading-tight">{stat.val}</span>
              <span className="text-[9px] text-text-muted mt-0.5 font-semibold block">{stat.desc}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Row 2: Radar Chart & Timeline Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Radar Chart Card */}
        <div className="lg:col-span-5 h-full flex flex-col">
          <GlassCard className="p-6 border border-slate-100 bg-white flex-grow flex flex-col justify-between min-h-[380px]">
            <div>
              <h3 className="text-base font-bold text-text-heading flex items-center gap-2">
                <Brain className="h-5 w-5 text-brand-blue" /> Your Skills & Thinking
              </h3>
              <p className="text-[10px] text-text-muted mt-0.5">How you're growing in the key areas</p>
            </div>

            {/* Custom SVG Radar Chart */}
            <div className="h-60 w-full flex items-center justify-center relative py-2">
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-[240px]">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="#f1f5f9" strokeWidth="1" />

                <line x1="50" y1="10" x2="50" y2="90" stroke="#f1f5f9" strokeWidth="0.75" />
                <line x1="15.4" y1="30" x2="84.6" y2="70" stroke="#f1f5f9" strokeWidth="0.75" />
                <line x1="15.4" y1="70" x2="84.6" y2="30" stroke="#f1f5f9" strokeWidth="0.75" />

                <polygon 
                  points={polygonPoints}
                  fill="rgba(26, 54, 93, 0.12)"
                  stroke="#1a365d"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {polygonPoints.split(' ').map((pt, idx) => {
                  const [cx, cy] = pt.split(',');
                  return <circle key={idx} cx={cx} cy={cy} r="1.5" fill="#f97316" />;
                })}

                <text x="50" y="8" textAnchor="middle" className="text-[4px] font-black fill-text-heading">Academic</text>
                <text x="92" y="32" textAnchor="start" className="text-[4px] font-black fill-text-heading">Communication</text>
                <text x="92" y="70" textAnchor="start" className="text-[4px] font-black fill-text-heading">Leadership</text>
                <text x="50" y="94" textAnchor="middle" className="text-[4px] font-black fill-text-heading">Critical Thinking</text>
                <text x="8" y="70" textAnchor="end" className="text-[4px] font-black fill-text-heading">Creativity</text>
                <text x="8" y="32" textAnchor="end" className="text-[4px] font-black fill-text-heading">Consistency</text>
              </svg>
            </div>
            
            <div className="text-[10px] text-text-muted font-bold text-center border-t border-slate-50 pt-3">
              Overall Skill Score: <span className="text-brand-blue font-extrabold">{compProfile?.overallScore ?? 85}/100</span>
            </div>
          </GlassCard>
        </div>

        {/* Journey Timeline & Goals List */}
        <div className="lg:col-span-7 h-full flex flex-col">
          <GlassCard className="p-6 border border-slate-100 bg-white flex-grow text-left space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-text-heading flex items-center gap-2">
                  <Compass className="h-5 w-5 text-brand-teal" />
                  Vedhkrit Journey Timeline & Goals
                </h3>
                <p className="text-[10px] text-text-muted mt-0.5 font-semibold">Your milestones and custom growth targets</p>
              </div>

              <button 
                onClick={() => setIsAddingGoal(!isAddingGoal)}
                className="p-1.5 rounded-xl border border-slate-150 text-xs font-bold text-text-heading hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                {isAddingGoal ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />} Goal
              </button>
            </div>

            {/* Inline goal adding form */}
            <AnimatePresence>
              {isAddingGoal && (
                <motion.form 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleAddGoalSubmit}
                  className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3"
                >
                  <div className="space-y-1">
                    <label className="text-[9.5px] uppercase tracking-wider text-slate-400 font-bold">Goal Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Master trigonometry formulas"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-blue"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9.5px] uppercase tracking-wider text-slate-400 font-bold">Description</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Solve 20 practice questions by Friday"
                      value={newGoalDesc}
                      onChange={(e) => setNewGoalDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={createGoalMutation.isPending}
                    className="px-4 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-sm hover:bg-brand-navy disabled:bg-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {createGoalMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Goal"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Timeline sequence tree */}
            <div className="relative pl-6 space-y-4 max-h-[300px] overflow-y-auto">
              <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-slate-100" />
              
              {goals && goals.length > 0 ? (
                goals.map((step, idx) => {
                  const isActive = step.status === "active";
                  return (
                    <div key={step.id || idx} className="relative flex items-start gap-4 text-xs font-semibold">
                      <div className="absolute -left-[24.5px] mt-0.5 flex items-center justify-center bg-white h-4.5 w-4.5">
                        {step.status === "completed" ? (
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 stroke-[3px]" />
                        ) : isActive ? (
                          <div className="h-4.5 w-4.5 rounded-full bg-brand-blue border-4 border-blue-200" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-slate-200 bg-slate-55" />
                        )}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <h4 className={cn(
                          "font-bold leading-none",
                          step.status === "completed" ? "text-slate-400" : 
                          isActive ? "text-brand-blue text-sm" : "text-slate-400"
                        )}>
                          {step.title}
                        </h4>
                        <p className="text-[10px] text-text-muted font-medium mt-1 leading-relaxed max-w-xl">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-6 text-center text-xs text-text-muted">
                  No active timeline goals set. Add a goal above to start tracking.
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Row 3: Insights & Performance trackers */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Growth Insights, Strengths & Improvements */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="p-6 border border-slate-100 bg-white text-left space-y-5">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-orange" />
              Growth Insights & Strengths
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 text-xs font-bold text-text-muted">
              {/* Strengths */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-2">
                <span className="text-emerald-700 uppercase tracking-wider text-[9px] font-bold block">Key Strengths</span>
                <ul className="space-y-1 text-[11px] text-emerald-900 font-semibold list-disc list-inside">
                  {insights?.strengths && Array.isArray(insights.strengths) && insights.strengths.length > 0 ? (
                    insights.strengths.map((str: string, i: number) => (
                      <li key={i}>{str}</li>
                    ))
                  ) : (
                    <>
                      <li>Logical thinking</li>
                      <li>Studying regularly</li>
                      <li>Remembering with pictures</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Improvement Areas */}
              <div className="p-4 bg-orange-50/50 border border-brand-orange/15 rounded-2xl space-y-2">
                <span className="text-brand-orange uppercase tracking-wider text-[9px] font-bold block">Needs Attention</span>
                <ul className="space-y-1 text-[11px] text-orange-950 font-semibold list-disc list-inside">
                  {insights?.improvements && Array.isArray(insights.improvements) && insights.improvements.length > 0 ? (
                    insights.improvements.map((imp: string, i: number) => (
                      <li key={i}>{imp}</li>
                    ))
                  ) : (
                    <>
                      <li>Speaking at a steady pace</li>
                      <li>Managing time before exams</li>
                      <li>Labeling diagrams in Biology</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Mentor Recommendations details */}
            <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2.5">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-brand-blue" />
                <span className="text-[10px] uppercase tracking-wider text-slate-450 font-bold block">Mentor Recommendations</span>
              </div>
              <p className="text-xs text-text-body font-medium leading-relaxed italic">
                "{insights?.recommendations ?? "Aarav is really good at solving maths problems. To speak more confidently, he should join the weekly school debate practice."}"
              </p>
              <span className="text-[8.5px] font-bold text-slate-400 block uppercase tracking-wider">
                — {insights?.advisorName ?? "Neha Mahta"}, Growth Advisor
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Certificates Earned & Progress */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 border border-slate-100 bg-white text-left space-y-4">
            <h3 className="text-base font-bold text-text-heading flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Certificates Earned
            </h3>

            <div className="space-y-3">
              {[
                { name: "Cognitive Skills Diagnostic (Level-1)", date: "May 2026", authority: "Vedhkrit Learning Lab", downloads: "1.4 MB" },
                { name: "National Cyber Olympiad Rank Certificate", date: "Apr 2026", authority: "Science Olympiad Board", downloads: "2.1 MB" },
                { name: "Consistent Homework Streak Badge Award", date: "Mar 2026", authority: "Vedhkrit Growth Circle", downloads: "890 KB" }
              ].map((cert, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between hover:border-slate-200 transition-all text-xs font-semibold">
                  <div>
                    <h4 className="font-bold text-text-heading leading-tight truncate max-w-40">{cert.name}</h4>
                    <p className="text-[9.5px] text-text-muted mt-0.5">{cert.authority} • {cert.date}</p>
                  </div>
                  <button 
                    onClick={() => handleDownloadCert(cert.name, cert.downloads)}
                    className="h-8 w-8 bg-white border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl flex items-center justify-center cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Row 4: 🚀 Career Explorer Section */}
      {activePathway && (
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6 border border-slate-100 bg-white text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
              <div>
                <h3 className="text-base font-bold text-text-heading flex items-center gap-2">
                  <Compass className="h-5 w-5 text-brand-blue" />
                  Career Explorer
                </h3>
                <p className="text-[10px] text-text-muted mt-0.5">See what you need, build key skills, and track how far you've come</p>
              </div>

              {/* Dropdown / Tile selector */}
              <div className="flex items-center gap-2 text-xs font-bold text-text-muted shrink-0">
                <span>I want to become...</span>
                <select
                  value={activePathway.id}
                  onChange={(e) => setSelectedPathwayId(e.target.value)}
                  className="px-3.5 py-2 bg-slate-50 border border-slate-155 rounded-xl focus:outline-none focus:border-brand-blue text-text-body font-bold cursor-pointer"
                >
                  {careerList.map((path: CareerMatch, i: number) => (
                    <option key={i} value={path.id}>{path.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              {/* Required subjects & skills */}
              <div className="lg:col-span-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 text-xs font-bold text-text-muted">
                  {/* Subjects */}
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                    <span className="text-slate-400 uppercase tracking-wider text-[8.5px] font-bold block">Subjects You'll Need</span>
                    <p className="text-text-heading font-extrabold leading-relaxed">{activePathway.subjects}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between">
                    <span className="text-slate-400 uppercase tracking-wider text-[8.5px] font-bold block">Your Progress</span>
                    <div>
                      <div className="flex justify-between font-bold text-text-heading mb-1.5">
                        <span>How far you've come</span>
                        <span>{activePathway.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${activePathway.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills and Activities lists */}
                <div className="grid gap-4 sm:grid-cols-2 text-xs font-semibold text-text-body">
                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Skills to Build</h4>
                    <div className="space-y-2">
                      {Array.isArray(activePathway.skills) && activePathway.skills.map((skill: string, i: number) => (
                        <div key={i} className="p-2.5 bg-white border border-slate-100 rounded-xl flex items-center justify-between shadow-2xs">
                          <span>{skill.split('(')[0].trim()}</span>
                          <span className="text-brand-blue font-extrabold text-[10px]">{skill.split('(')[1]?.replace(')', '') || ""}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="space-y-3 text-left">
                    <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Things to Try</h4>
                    <ul className="space-y-2 text-[11px] text-text-muted font-medium">
                      {Array.isArray(activePathway.activities) && activePathway.activities.map((act: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mentor Videos section */}
              <div className="lg:col-span-4 space-y-4">
                <h4 className="font-display text-xs font-bold text-slate-450 uppercase tracking-wider">Videos from Mentors</h4>
                
                <div className="space-y-3">
                  {Array.isArray(activePathway.videos) && activePathway.videos.map((vid: { title: string; speaker: string; length: string }, i: number) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between hover:border-brand-teal/20 transition-all text-xs font-semibold">
                      <div className="text-left min-w-0 flex-1 pr-2">
                        <h5 className="font-bold text-text-heading truncate leading-tight">{vid.title}</h5>
                        <p className="text-[9px] text-text-muted mt-0.5 truncate">{vid.speaker} • {vid.length}</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => toast.info(`Playing career advice: ${vid.title}`)}
                        className="h-7 w-7 bg-brand-blue text-white rounded-lg flex items-center justify-center shrink-0 shadow-xs cursor-pointer"
                      >
                        <Play className="h-3.5 w-3.5 fill-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  );
}
