import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
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
  Play
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student/skills")({
  component: UnifiedGrowthPage,
  head: () => ({ meta: [{ title: "My Growth — Vedhkrit" }] }),
});

const timelineSteps = [
  { id: "step-1", title: "Discover", desc: "Discover primary learning styles and key aptitudes.", status: "completed" },
  { id: "step-2", title: "Understand", desc: "Understand core subject strengths and conceptual gaps.", status: "completed" },
  { id: "step-3", title: "Plan", desc: "Plan personal academic schedules & soft skill milestones.", status: "completed" },
  { id: "step-4", title: "Explore", desc: "Explore recommended career blueprints and study roadmaps.", status: "active" },
  { id: "step-5", title: "Develop", desc: "Develop advanced problem solving and verbal communications.", status: "locked" },
  { id: "step-6", title: "Achieve", desc: "Achieve top ranks in Olympiads and board examinations.", status: "locked" }
];

const certificatesData = [
  { name: "Cognitive Skills Diagnostic (Level-1)", date: "May 2026", authority: "Vedhkrit Learning Lab", downloads: "1.4 MB" },
  { name: "National Cyber Olympiad Rank Certificate", date: "Apr 2026", authority: "Science Olympiad Board", downloads: "2.1 MB" },
  { name: "Consistent Homework Streak Badge Award", date: "Mar 2026", authority: "Vedhkrit Growth Circle", downloads: "890 KB" }
];

interface CareerPathway {
  id: string;
  name: string;
  subjects: string;
  skills: string[];
  activities: string[];
  videos: Array<{ title: string; speaker: string; length: string }>;
  progress: number;
}

const careerPathways: CareerPathway[] = [
  {
    id: "engineer",
    name: "Engineer",
    subjects: "Mathematics, Physics, Chemistry, Computer CS",
    skills: ["Problem Solving (90%)", "Coding Logic (85%)", "Spatial Reasoning (80%)"],
    activities: ["Participate in School Robotics Exhibition", "Solve monthly coding puzzles", "Attend JEE prep workshops"],
    videos: [
      { title: "Software Engineering Career Guide", speaker: "Mr. Satya Murthy, Tech Principal", length: "12 mins" },
      { title: "Building Hardware & Robots", speaker: "Dr. Alok Sen, Robotics Researcher", length: "15 mins" }
    ],
    progress: 74
  },
  {
    id: "doctor",
    name: "Doctor",
    subjects: "Biology, Chemistry, Physics, English",
    skills: ["Anatomical recall (80%)", "Active empathy (95%)", "Diagnostic analysis (85%)"],
    activities: ["Complete basic First Aid Certification", "Score 95% in biology cellular lab projects", "Volunteer at local health booths"],
    videos: [
      { title: "Pathway to NEET Exam Success", speaker: "Dr. Sneha Paul, Surgeon", length: "18 mins" },
      { title: "Daily Life in a Pediatric Ward", speaker: "Dr. Kabir Roy, Pediatrician", length: "14 mins" }
    ],
    progress: 60
  },
  {
    id: "ias",
    name: "IAS Officer",
    subjects: "History, Political Civics, Economics, Geography, English",
    skills: ["Public speech (90%)", "Policy analysis (80%)", "Global current affairs (95%)"],
    activities: ["Read newspaper headlines daily", "Join school debating and public policy groups", "Participate in Mock UN (MUN) events"],
    videos: [
      { title: "UPSC Syllabus Decoded", speaker: "Mr. Vijay Kumar, Retd. IAS Officer", length: "20 mins" },
      { title: "Administrative Policies & Reforms", speaker: "Ms. Rashmi Patel, Deputy Commissioner", length: "16 mins" }
    ],
    progress: 68
  },
  {
    id: "pilot",
    name: "Commercial Pilot",
    subjects: "Physics, Mathematics, English",
    skills: ["Spatial awareness (95%)", "Hand-eye coordination (90%)", "Weather chart analysis (85%)"],
    activities: ["Complete basic flight simulator trials", "Attend aeronautics science model clubs", "Study air navigation maps"],
    videos: [
      { title: "From Cadet to Captain's Seat", speaker: "Capt. Vivek Varma, A320 Commander", length: "15 mins" },
      { title: "Basics of Flight Mechanics & Physics", speaker: "Capt. Shreya Sen, Chief Instructor", length: "12 mins" }
    ],
    progress: 52
  }
];

function UnifiedGrowthPage() {
  const [activeStep, setActiveStep] = useState("step-4");
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway>(careerPathways[0]);

  const handleDownloadCert = (name: string, size: string) => {
    toast.success(`Started downloading: ${name}`, {
      description: `File size: ${size}. Saved to downloads.`,
      icon: <Download className="h-4.5 w-4.5 text-brand-blue" />
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

  // Center (50, 50), Radius 40.
  // Polygon points calculated based on scores:
  // Academic (85%): 50, 16
  // Communication (75%): 76, 35
  // Leadership (80%): 77.7, 66
  // Critical Thinking (88%): 50, 85.2
  // Creativity (85%): 20.6, 67
  // Consistency (92%): 18.2, 31.6
  const polygonPoints = "50,16 76,35 77.7,66 50,85.2 20.6,67 18.2,31.6";

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader title="My Growth" subtitle="Vedhkrit signature development index, Learning DNA profiler, and soft skills roadmap." />

      {/* Top Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Vedhkrit Index", val: "780 / 1000", desc: "Top 8% percentile nationwide", color: "border-brand-blue text-brand-blue bg-blue-50/50" },
          { label: "Learning DNA Profile", val: "Practical & Visual", desc: "Learns through diagram systems", color: "border-brand-teal text-brand-teal bg-teal-50/50" },
          { label: "Confidence Metric", val: "86%", desc: "+4% from last evaluation", color: "border-brand-orange text-brand-orange bg-orange-50/50" },
          { label: "Academic Growth", val: "+14%", desc: "Consistency level outstanding", color: "border-purple-500 text-purple-600 bg-purple-50/50" }
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
                <Brain className="h-5 w-5 text-brand-blue" /> Cognitive & Skill DNA
              </h3>
              <p className="text-[10px] text-text-muted mt-0.5">Development levels across core student indicators</p>
            </div>

            {/* Premium Custom SVG Radar Chart */}
            <div className="h-60 w-full flex items-center justify-center relative py-2">
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-[240px]">
                {/* Concentric grid rings */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="#f1f5f9" strokeWidth="1" />

                {/* Grid Axes Lines */}
                <line x1="50" y1="10" x2="50" y2="90" stroke="#f1f5f9" strokeWidth="0.75" />
                <line x1="15.4" y1="30" x2="84.6" y2="70" stroke="#f1f5f9" strokeWidth="0.75" />
                <line x1="15.4" y1="70" x2="84.6" y2="30" stroke="#f1f5f9" strokeWidth="0.75" />

                {/* Score Area Polygon */}
                <polygon 
                  points={polygonPoints}
                  fill="rgba(26, 54, 93, 0.12)"
                  stroke="#1a365d"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                {/* Vertices circles */}
                {polygonPoints.split(' ').map((pt, idx) => {
                  const [cx, cy] = pt.split(',');
                  return <circle key={idx} cx={cx} cy={cy} r="1.5" fill="#f97316" />;
                })}

                {/* Custom Axis Text tags */}
                <text x="50" y="8" textAnchor="middle" className="text-[4px] font-black fill-text-heading">Academic</text>
                <text x="92" y="32" textAnchor="start" className="text-[4px] font-black fill-text-heading">Communication</text>
                <text x="92" y="70" textAnchor="start" className="text-[4px] font-black fill-text-heading">Leadership</text>
                <text x="50" y="94" textAnchor="middle" className="text-[4px] font-black fill-text-heading">Critical Thinking</text>
                <text x="8" y="70" textAnchor="end" className="text-[4px] font-black fill-text-heading">Creativity</text>
                <text x="8" y="32" textAnchor="end" className="text-[4px] font-black fill-text-heading">Consistency</text>
              </svg>
            </div>
            
            <div className="text-[10px] text-text-muted font-bold text-center border-t border-slate-50 pt-3">
              Overall DNA Skill Quotient: <span className="text-brand-blue font-extrabold">85/100</span>
            </div>
          </GlassCard>
        </div>

        {/* Journey Timeline */}
        <div className="lg:col-span-7 h-full flex flex-col">
          <GlassCard className="p-6 border border-slate-100 bg-white flex-grow text-left space-y-5">
            <div>
              <h3 className="text-base font-bold text-text-heading flex items-center gap-2">
                <Compass className="h-5 w-5 text-brand-teal" />
                Vedhkrit Journey Timeline
              </h3>
              <p className="text-[10px] text-text-muted mt-0.5">Track developmental phases through Class 8th to 10th</p>
            </div>

            {/* Timeline sequence tree */}
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-slate-100" />
              
              {timelineSteps.map((step, idx) => {
                const isActive = activeStep === step.id;
                return (
                  <div key={idx} className="relative flex items-start gap-4 text-xs font-semibold">
                    <div className="absolute -left-[24.5px] mt-0.5 flex items-center justify-center bg-white h-4.5 w-4.5">
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 stroke-[3px]" />
                      ) : isActive ? (
                        <div className="h-4.5 w-4.5 rounded-full bg-brand-blue border-4 border-blue-200" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-slate-200 bg-slate-50" />
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
              })}
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
                  <li>Logical Reasoning</li>
                  <li>Syllabus Consistency</li>
                  <li>Visual-Spatial Memory</li>
                </ul>
              </div>

              {/* Improvement Areas */}
              <div className="p-4 bg-orange-50/50 border border-brand-orange/15 rounded-2xl space-y-2">
                <span className="text-brand-orange uppercase tracking-wider text-[9px] font-bold block">Needs Attention</span>
                <ul className="space-y-1 text-[11px] text-orange-950 font-semibold list-disc list-inside">
                  <li>Speech pacing in presentations</li>
                  <li>Time management during exam prep</li>
                  <li>Biology anatomical labeling</li>
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
                "Aarav has shown remarkable aptitude in analytical math worksheets. To improve verbal delivery, I suggest taking part in the weekly school debate preparation program."
              </p>
              <span className="text-[8.5px] font-bold text-slate-400 block uppercase tracking-wider">— Neha Mahta, Growth Advisor</span>
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
              {certificatesData.map((cert, idx) => (
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
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6 border border-slate-100 bg-white text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-4">
            <div>
              <h3 className="text-base font-bold text-text-heading flex items-center gap-2">
                <Compass className="h-5 w-5 text-brand-blue" />
                Career Explorer
              </h3>
              <p className="text-[10px] text-text-muted mt-0.5">Explore required pathways, develop core competencies, and track progress</p>
            </div>

            {/* Dropdown / Tile selector */}
            <div className="flex items-center gap-2 text-xs font-bold text-text-muted shrink-0">
              <span>I want to become...</span>
              <select
                value={selectedPathway.id}
                onChange={(e) => {
                  const pathway = careerPathways.find(p => p.id === e.target.value);
                  if (pathway) setSelectedPathway(pathway);
                }}
                className="px-3.5 py-2 bg-slate-50 border border-slate-150 rounded-xl focus:outline-none focus:border-brand-blue text-text-body font-bold cursor-pointer"
              >
                {careerPathways.map((path, i) => (
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
                  <span className="text-slate-400 uppercase tracking-wider text-[8.5px] font-bold block">Required Stream & Subjects</span>
                  <p className="text-text-heading font-extrabold leading-relaxed">{selectedPathway.subjects}</p>
                </div>

                {/* Progress bar */}
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between">
                  <span className="text-slate-400 uppercase tracking-wider text-[8.5px] font-bold block">Milestone Progress Rate</span>
                  <div>
                    <div className="flex justify-between font-bold text-text-heading mb-1.5">
                      <span>Pathway Completion</span>
                      <span>{selectedPathway.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${selectedPathway.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills and Activities lists */}
              <div className="grid gap-4 sm:grid-cols-2 text-xs font-semibold text-text-body">
                {/* Skills */}
                <div className="space-y-3">
                  <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Skills to Develop</h4>
                  <div className="space-y-2">
                    {selectedPathway.skills.map((skill, i) => (
                      <div key={i} className="p-2.5 bg-white border border-slate-100 rounded-xl flex items-center justify-between shadow-2xs">
                        <span>{skill.split('(')[0].trim()}</span>
                        <span className="text-brand-blue font-extrabold text-[10px]">{skill.split('(')[1]?.replace(')', '') || ""}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="space-y-3 text-left">
                  <h4 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Activities</h4>
                  <ul className="space-y-2 text-[11px] text-text-muted font-medium">
                    {selectedPathway.activities.map((act, i) => (
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
                {selectedPathway.videos.map((vid, i) => (
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
    </motion.div>
  );
}
