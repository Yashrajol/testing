import { } from "@tanstack/react-router";
import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { 
  Award, 
  Download, 
  Share2, 
  Filter, 
  Grid, 
  List, 
  Calendar, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  BookOpen, 
  Trophy,
  UserCheck
} from "lucide-react";
import { studentAvatar } from "@/shared/utils/avatars";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";



interface Achievement {
  id: string;
  category: "Certificates" | "Badges" | "Competitions" | "Olympiads" | "Projects";
  title: string;
  desc: string;
  date: string;
  issuedBy: string;
  type: "Academic" | "Extracurricular";
  year: string;
  icon: typeof Award;
  colorClass: string;
}

const initialAchievements: Achievement[] = [
  { 
    id: "ach-1", 
    category: "Olympiads", 
    title: "National Cyber Olympiad Rank #14", 
    desc: "Achieved global excellence in logical reasoning and basic programming structures.", 
    date: "12 May 2026", 
    issuedBy: "Science Olympiad Foundation", 
    type: "Academic", 
    year: "2026", 
    icon: Trophy,
    colorClass: "text-brand-blue bg-blue-50 border-blue-150"
  },
  { 
    id: "ach-2", 
    category: "Competitions", 
    title: "State Robotics Tournament Winner", 
    desc: "Designed and coded an autonomous maze-solving line-follower robot.", 
    date: "24 Apr 2026", 
    issuedBy: "State Tech Association", 
    type: "Extracurricular", 
    year: "2026", 
    icon: Flame,
    colorClass: "text-brand-orange bg-orange-50 border-brand-orange/20"
  },
  { 
    id: "ach-3", 
    category: "Certificates", 
    title: "Vedhkrit Cognitive Aptitude (Level-1)", 
    desc: "Demonstrated advanced skills in visual-spatial awareness and sequence matching.", 
    date: "15 Mar 2026", 
    issuedBy: "Vedhkrit Learning Labs", 
    type: "Academic", 
    year: "2026", 
    icon: BookOpen,
    colorClass: "text-brand-teal bg-teal-50 border-brand-teal/20"
  },
  { 
    id: "ach-4", 
    category: "Badges", 
    title: "30-Day Homework Streak Star", 
    desc: "Completed all homework worksheets on time for 30 consecutive calendar days.", 
    date: "02 Feb 2026", 
    issuedBy: "Vedhkrit Growth Circle", 
    type: "Academic", 
    year: "2026", 
    icon: CheckCircle2,
    colorClass: "text-purple-600 bg-purple-50 border-purple-150"
  },
  { 
    id: "ach-5", 
    category: "Projects", 
    title: "Visual Geometry Vector Calculator", 
    desc: "Created a coordinate geometry mapping tool to calculate vectors dynamically.", 
    date: "10 Dec 2025", 
    issuedBy: "Delhi Public School", 
    type: "Academic", 
    year: "2025", 
    icon: Sparkles,
    colorClass: "text-indigo-600 bg-indigo-50 border-indigo-150"
  }
];

const mockLeaderboard = [
  { rank: 1, name: "Rahul K.", points: "1,560 XP", avatar: studentAvatar(10) },
  { rank: 2, name: "Sneha V.", points: "1,480 XP", avatar: studentAvatar(11) },
  { rank: 3, name: "Aarav Sharma (You)", points: "1,420 XP", avatar: studentAvatar(0), highlight: true },
  { rank: 4, name: "Dev M.", points: "1,310 XP", avatar: studentAvatar(12) },
  { rank: 5, name: "Tanya S.", points: "1,250 XP", avatar: studentAvatar(13) }
];

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [viewMode, setViewMode] = useState<"gallery" | "timeline">("gallery");

  // Filters State
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleDownloadCert = (title: string) => {
    toast.success(`Certificate downloaded!`, {
      description: `Official PDF for ${title} has been saved locally.`,
      icon: <Download className="h-5 w-5 text-brand-blue" />
    });
  };

  const handleShare = (title: string) => {
    navigator.clipboard.writeText(`I earned the "${title}" on Vedhkrit!`);
    toast.success(`Link copied to clipboard!`, {
      description: "You can now share this achievement with friends and parents."
    });
  };

  const filteredAchievements = achievements.filter(ach => {
    const matchesCategory = categoryFilter === "All" || ach.category === categoryFilter;
    const matchesYear = yearFilter === "All" || ach.year === yearFilter;
    const matchesType = typeFilter === "All" || ach.type === typeFilter;
    const matchesSearch = ach.title.toLowerCase().includes(search.toLowerCase()) || 
                          ach.issuedBy.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesYear && matchesType && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader title="Achievements & Leaderboard" subtitle="Celebrate your Olympiad ranks, skill badges, and track class leadership standings." />

      {/* Row 2: Search, Filters, and View Toggle */}
      <GlassCard className="p-5 bg-white border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Search Bar */}
        <div className="relative flex-grow max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input 
            type="text" 
            placeholder="Search achievements by title, issuer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-blue transition-colors text-text-heading placeholder:text-slate-400"
          />
        </div>

        {/* Right: Category, Year, Type Filters and Toggle view */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-text-muted">
          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl focus:outline-none focus:border-brand-blue text-text-body cursor-pointer font-bold"
          >
            <option value="All">All Categories</option>
            <option value="Certificates">Certificates</option>
            <option value="Badges">Badges</option>
            <option value="Competitions">Competitions</option>
            <option value="Olympiads">Olympiads</option>
            <option value="Projects">Projects</option>
          </select>

          {/* Year */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl focus:outline-none focus:border-brand-blue text-text-body cursor-pointer font-bold"
          >
            <option value="All">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>

          {/* Toggle buttons */}
          <div className="flex bg-slate-50 p-1 border border-slate-150 rounded-xl overflow-hidden shrink-0">
            <button
              onClick={() => setViewMode("gallery")}
              className={cn(
                "p-1.5 rounded-lg transition-colors cursor-pointer",
                viewMode === "gallery" ? "bg-white text-brand-blue shadow-xs" : "text-slate-400 hover:text-text-heading"
              )}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={cn(
                "p-1.5 rounded-lg transition-colors cursor-pointer",
                viewMode === "timeline" ? "bg-white text-brand-blue shadow-xs" : "text-slate-400 hover:text-text-heading"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Row 3: Achievements Catalog Grid & Leaderboard */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Side: Achievements Catalogue (Dynamic Views) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {viewMode === "gallery" ? (
              // GALLERY VIEW GRID
              <motion.div 
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {filteredAchievements.length > 0 ? (
                  filteredAchievements.map((item, idx) => (
                    <GlassCard key={idx} className="p-5 border border-slate-100 bg-white hover:border-slate-200 transition-all flex flex-col justify-between min-h-56 text-left">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center border shrink-0", item.colorClass)}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-text-heading leading-tight">{item.title}</h4>
                          <p className="text-[10px] text-text-muted leading-relaxed font-semibold">{item.desc}</p>
                          <span className="text-[8px] font-black text-brand-blue uppercase tracking-wider block pt-1">Issued By: {item.issuedBy}</span>
                        </div>
                      </div>

                      {/* Card actions */}
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-50 mt-4 text-xs font-bold">
                        <button 
                          onClick={() => handleDownloadCert(item.title)}
                          className="py-2 bg-brand-blue hover:bg-brand-navy text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Download className="h-3.5 w-3.5" /> Certificate
                        </button>
                        <button 
                          onClick={() => handleShare(item.title)}
                          className="py-2 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Share2 className="h-3.5 w-3.5" /> Share
                        </button>
                      </div>
                    </GlassCard>
                  ))
                ) : (
                  <div className="sm:col-span-2 py-12 text-center text-xs font-semibold text-text-muted space-y-2 border border-slate-100 rounded-3xl bg-white/50">
                    <Trophy className="h-8 w-8 mx-auto text-slate-350" />
                    <p>No achievements match your filters.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              // TIMELINE VIEW
              <motion.div 
                key="timeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 border border-slate-100 bg-white rounded-3xl relative text-left"
              >
                <div className="absolute left-[29.5px] top-8 bottom-8 w-[1.5px] bg-slate-100" />
                
                <div className="space-y-6">
                  {filteredAchievements.map((item, idx) => (
                    <div key={idx} className="relative pl-9 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      {/* Timeline circle dot */}
                      <div className="absolute left-[1.5px] top-1 mt-0.5 flex items-center justify-center bg-white h-4.5 w-4.5">
                        <div className="h-3.5 w-3.5 rounded-full bg-brand-blue border-2 border-white shadow-sm shadow-brand-blue/30" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{item.date}</span>
                        <h4 className="font-bold text-sm text-text-heading leading-tight">{item.title}</h4>
                        <p className="text-[10px] text-text-muted leading-normal max-w-md">{item.desc}</p>
                        <span className="text-[8px] font-black text-brand-blue uppercase tracking-wider block pt-0.5">Issued By: {item.issuedBy}</span>
                      </div>

                      <button 
                        onClick={() => handleDownloadCert(item.title)}
                        className="py-1.5 px-3.5 bg-slate-50 border border-slate-150 text-text-heading font-bold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-center shrink-0"
                      >
                        <Download className="h-3.5 w-3.5" /> PDF
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Duolingo Class Leaderboard */}
        <div className="lg:col-span-4">
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-brand-orange" />
              <div>
                <h3 className="font-bold text-sm text-text-heading">Class Leaderboard</h3>
                <p className="text-[10px] text-text-muted">Weekly study points rank</p>
              </div>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              {mockLeaderboard.map((user, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "p-3 rounded-xl border flex items-center justify-between transition-all",
                    user.highlight 
                      ? "border-brand-blue bg-brand-blue/5 shadow-xs" 
                      : "border-slate-100/50 bg-white"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={cn(
                      "font-black text-xs shrink-0 w-4 text-center",
                      user.rank === 1 ? "text-brand-orange" : 
                      user.rank === 2 ? "text-slate-450" : 
                      user.rank === 3 ? "text-amber-700" : "text-slate-350"
                    )}>
                      #{user.rank}
                    </span>
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-100 shrink-0" />
                    <span className={cn("truncate font-bold", user.highlight ? "text-brand-blue" : "text-text-heading")}>
                      {user.name}
                    </span>
                  </div>
                  <span className="font-black text-brand-blue text-[11.5px] shrink-0">
                    {user.points}
                  </span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => toast.success("Accessing school leaderboards...")}
              className="w-full py-2 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
            >
              View Global Standings
            </button>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
