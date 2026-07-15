import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { 
  Search, 
  Download, 
  Bookmark, 
  FileText, 
  BookOpen, 
  Eye, 
  Video, 
  Clock, 
  Sparkles, 
  Filter, 
  FileSpreadsheet, 
  Layers, 
  ChevronRight, 
  X, 
  BookmarkCheck, 
  Check,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student/portfolio")({
  component: StudyMaterialPage,
  head: () => ({ meta: [{ title: "Study Material — Vedhkrit" }] }),
});

interface Material {
  id: string;
  category: "Notes" | "Books" | "Question Banks" | "PYQs" | "Worksheets" | "Videos";
  subject: string;
  chapter: string;
  downloads: number;
  fileType: string;
  lastUpdated: string;
  bookmarked: boolean;
  desc: string;
}

const initialMaterials: Material[] = [
  { id: "mat-1", category: "Notes", subject: "Mathematics", chapter: "Chapter 5: Lines & Angles Formulas", downloads: 142, fileType: "PDF", lastUpdated: "2 days ago", bookmarked: false, desc: "Quick revision points, axioms, postulates and figures for final exam preparation." },
  { id: "mat-2", category: "Notes", subject: "Science", chapter: "Chapter 8: Laws of Motion Detailed Notes", downloads: 88, fileType: "PDF", lastUpdated: "1 week ago", bookmarked: true, desc: "Complete physics classroom definitions, derivations and numerical illustrations." },
  { id: "mat-3", category: "Books", subject: "Mathematics", chapter: "NCERT Class IX Mathematics Textbook", downloads: 204, fileType: "PDF", lastUpdated: "May 10, 2026", bookmarked: false, desc: "Official reference textbook recommended by board curriculum." },
  { id: "mat-4", category: "Question Banks", subject: "Science", chapter: "Chemical Reactions 100 MCQ Question Bank", downloads: 72, fileType: "PDF", lastUpdated: "May 12, 2026", bookmarked: false, desc: "Practice question compilation containing balancing and chemical synthesis sums." },
  { id: "mat-5", category: "PYQs", subject: "Social Science", chapter: "Class IX Geography Solved PYQs (2021-25)", downloads: 110, fileType: "PDF", lastUpdated: "May 08, 2026", bookmarked: false, desc: "Solved board examination past papers sorted chapter-wise." },
  { id: "mat-6", category: "Worksheets", subject: "English", chapter: "Active & Passive Voice Homework Drills", downloads: 95, fileType: "DOCX", lastUpdated: "May 18, 2026", bookmarked: false, desc: "Grammar worksheets covering standard classroom voice conversion exercises." },
  { id: "mat-7", category: "Videos", subject: "Science", chapter: "3D Animation: Understanding Plant Cell Structures", downloads: 350, fileType: "MP4 Video", lastUpdated: "May 16, 2026", bookmarked: false, desc: "Animated visual guides of cell structures and microscopic organs." }
];

function StudyMaterialPage() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  // View Modal State
  const [viewingMat, setViewingMat] = useState<Material | null>(null);

  const categories = [
    { name: "Notes", count: materials.filter(m => m.category === "Notes").length, icon: FileText, color: "text-brand-blue bg-blue-50" },
    { name: "Books", count: materials.filter(m => m.category === "Books").length, icon: BookOpen, color: "text-brand-teal bg-teal-50" },
    { name: "Question Banks", count: materials.filter(m => m.category === "Question Banks").length, icon: Layers, color: "text-purple-600 bg-purple-50" },
    { name: "PYQs", count: materials.filter(m => m.category === "PYQs").length, icon: Award, color: "text-amber-600 bg-amber-50" },
    { name: "Worksheets", count: materials.filter(m => m.category === "Worksheets").length, icon: FileSpreadsheet, color: "text-rose-600 bg-rose-50" },
    { name: "Videos", count: materials.filter(m => m.category === "Videos").length, icon: Video, color: "text-indigo-600 bg-indigo-50" }
  ];

  const toggleBookmark = (id: string) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === id) {
        const nextState = !m.bookmarked;
        toast.success(nextState ? "Added to Favorites!" : "Removed from Favorites", {
          description: `Resource: ${m.chapter}`
        });
        return { ...m, bookmarked: nextState };
      }
      return m;
    }));
  };

  const handleDownload = (chapter: string, size: string) => {
    toast.success(`Started downloading: ${chapter}`, {
      description: `File format: ${size}. Saved to downloads.`,
      icon: <Download className="h-4.5 w-4.5 text-brand-blue" />
    });
  };

  const filteredMaterials = materials.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.chapter.toLowerCase().includes(search.toLowerCase()) || 
                          item.desc.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === "All" || item.subject === subjectFilter;

    return matchesCategory && matchesSearch && matchesSubject;
  });

  const favorites = materials.filter(m => m.bookmarked);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 text-left"
    >
      <PageHeader title="Study Material" subtitle="Access chapter textbooks, NCERT guides, worksheets, and recorded explanations." />

      {/* Notion-Style folder categories tiles */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, i) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={i}
              onClick={() => setActiveCategory(isActive ? "All" : cat.name)}
              className={cn(
                "p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between h-28",
                isActive 
                  ? "border-brand-blue bg-brand-blue/5 shadow-xs" 
                  : "border-slate-100 bg-white hover:border-slate-200"
              )}
            >
              <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", cat.color)}>
                <cat.icon className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-text-heading mt-2 leading-tight">{cat.name}</span>
                <span className="text-[10px] text-text-muted mt-0.5 font-semibold">{cat.count} files</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Row 2: Search, Filters, Database list & side widgets */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Side: Materials Catalog database list */}
        <div className="lg:col-span-8 space-y-4">
          <GlassCard className="p-4 bg-white border border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Search input */}
            <div className="relative flex-grow">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search notes, textbooks, worksheets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-blue transition-colors text-text-heading placeholder:text-slate-400"
              />
            </div>

            {/* Subject Filters */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold text-text-muted flex items-center gap-1">
                <Filter className="h-4 w-4" /> Subject:
              </span>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-blue text-text-body cursor-pointer"
              >
                <option value="All">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Social Science">Social Science</option>
              </select>
            </div>
          </GlassCard>

          {/* Database list rows */}
          <div className="space-y-3">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4.5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="text-left space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                        {item.subject}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-[9px] text-text-muted font-semibold">
                        Updated {item.lastUpdated}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-text-heading leading-tight truncate">{item.chapter}</h4>
                    <p className="text-[10px] text-text-muted leading-relaxed font-semibold truncate">{item.desc}</p>
                  </div>

                  {/* Actions buttons */}
                  <div className="shrink-0 flex items-center gap-2.5 text-xs font-bold self-start sm:self-center">
                    <span className="text-[10px] font-bold text-slate-400">{item.downloads} downloads</span>
                    
                    <button 
                      onClick={() => setViewingMat(item)}
                      className="h-8.5 w-8.5 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl flex items-center justify-center cursor-pointer"
                      title="View file Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button 
                      onClick={() => handleDownload(item.chapter, item.fileType)}
                      className="h-8.5 w-8.5 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading rounded-xl flex items-center justify-center cursor-pointer"
                      title="Download File"
                    >
                      <Download className="h-4 w-4" />
                    </button>

                    <button 
                      onClick={() => toggleBookmark(item.id)}
                      className={cn(
                        "h-8.5 w-8.5 rounded-xl border flex items-center justify-center cursor-pointer transition-colors",
                        item.bookmarked 
                          ? "border-amber-200 bg-amber-50 text-amber-500 hover:bg-amber-100" 
                          : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100"
                      )}
                      title="Bookmark file"
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs font-semibold text-text-muted space-y-2 border border-slate-100 rounded-3xl bg-white/50">
                <FileText className="h-8 w-8 mx-auto text-slate-350" />
                <p>No study materials match your category or search filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Widgets (Notion-style layout blocks) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Recently Viewed */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-4">
            <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand-blue animate-pulse" /> Recently Viewed
            </h3>
            
            <div className="space-y-2 text-[10.5px] font-semibold text-text-body">
              {[
                { title: "Linear Equations Formulas cheatsheet", time: "10 mins ago" },
                { title: "Laws of Motion physics textbook pages", time: "2 hours ago" }
              ].map((item, i) => (
                <div key={i} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-brand-blue/20 transition-all flex justify-between items-center">
                  <div className="text-left min-w-0 flex-1">
                    <h5 className="font-bold text-text-heading truncate pr-2">{item.title}</h5>
                    <p className="text-[8.5px] text-text-muted mt-0.5 leading-none">{item.time}</p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-350 shrink-0" />
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recommended Resources */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-4">
            <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-brand-teal" /> Recommended Resources
            </h3>
            
            <div className="space-y-2.5 text-[10.5px] font-semibold text-text-body">
              {[
                { title: "Active & Passive Grammar workbook", sub: "English" },
                { title: "Chemistry Balancing formulas notes", sub: "Science" }
              ].map((item, i) => (
                <div key={i} className="p-3 border border-slate-100 rounded-xl hover:border-brand-teal/20 transition-all flex justify-between items-center">
                  <div className="text-left">
                    <h5 className="font-bold text-text-heading truncate max-w-32">{item.title}</h5>
                    <span className="text-[8px] font-bold text-brand-teal bg-teal-50 px-1.5 py-0.5 rounded mt-1 inline-block uppercase tracking-wider">{item.sub}</span>
                  </div>
                  <button 
                    onClick={() => handleDownload(item.title, "1.4 MB")}
                    className="text-[9.5px] font-bold text-brand-blue hover:underline flex items-center gap-0.5"
                  >
                    Get <Download className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Favorites bookmarked list */}
          <GlassCard className="p-5 border border-slate-100 bg-white text-left space-y-4">
            <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookmarkCheck className="h-4 w-4 text-amber-500" /> Bookmarked Favorites
            </h3>
            
            <div className="space-y-2 text-[10.5px] font-semibold text-text-body">
              {favorites.length > 0 ? (
                favorites.map((item, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                    <h5 className="font-bold text-text-heading truncate pr-2 flex-grow">{item.chapter}</h5>
                    <button 
                      onClick={() => toggleBookmark(item.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[9.5px] text-text-muted italic py-2">No files favorited yet. Click bookmark to save.</p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Details View Modal */}
      <AnimatePresence>
        {viewingMat && (
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
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative"
            >
              {/* Close */}
              <button 
                onClick={() => setViewingMat(null)}
                className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-text-heading hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-[9px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                  {viewingMat.subject}
                </span>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                  {viewingMat.category}
                </span>
              </div>

              <h3 className="font-display text-base font-bold text-text-heading mb-2 leading-tight">
                {viewingMat.chapter}
              </h3>
              <p className="text-xs text-text-body font-medium leading-relaxed mb-6">
                {viewingMat.desc}
              </p>

              <div className="grid grid-cols-3 gap-2.5 text-[10.5px] font-bold text-text-muted mb-6 pt-4 border-t border-slate-50">
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Format</span>
                  <span className="text-text-heading">{viewingMat.fileType}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Downloads</span>
                  <span className="text-text-heading">{viewingMat.downloads}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Last Updated</span>
                  <span className="text-text-heading truncate block">{viewingMat.lastUpdated}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  onClick={() => handleDownload(viewingMat.chapter, viewingMat.fileType)}
                  className="py-2.5 bg-brand-blue hover:bg-brand-navy text-white text-center font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download className="h-4 w-4" /> Download File
                </button>
                <button
                  onClick={() => { toggleBookmark(viewingMat.id); setViewingMat(null); }}
                  className="py-2.5 bg-slate-50 border border-slate-100 hover:bg-slate-100 text-text-heading font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {viewingMat.bookmarked ? "Remove Bookmark" : "Save to Bookmark"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
