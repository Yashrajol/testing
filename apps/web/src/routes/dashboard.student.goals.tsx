import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Download, 
  Upload, 
  FileText, 
  X, 
  Check, 
  UploadCloud, 
  BookOpen, 
  Filter 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student/goals")({
  component: HomeworkManagementPage,
  head: () => ({ meta: [{ title: "Homework Management — Vedhkrit" }] }),
});

interface Homework {
  id: string;
  subject: string;
  teacher: string;
  title: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  attachment: string;
  instructions: string;
  status: "pending" | "submitted" | "completed";
  submittedOn?: string;
  feedback?: string;
  marks?: string;
  fileName?: string;
}

const initialHomeworkList: Homework[] = [
  { 
    id: "hw-1", 
    subject: "Mathematics", 
    teacher: "Neha Ma'am", 
    title: "Maths Worksheet - 12 (Linear Equations)", 
    due: "Tomorrow, 02:00 PM", 
    priority: "High", 
    attachment: "linear_eq_ws_12.pdf (1.2 MB)", 
    instructions: "Solve all word problems in your math copy. Make sure to draw graphs wherever applicable.",
    status: "pending"
  },
  { 
    id: "hw-2", 
    subject: "Science", 
    teacher: "Rohit Sir", 
    title: "Science: Chemical Reaction Balancing Worksheet", 
    due: "24 May, 11:00 AM", 
    priority: "Medium", 
    attachment: "chemical_reactions_ws.pdf (1.8 MB)", 
    instructions: "Balance the 25 chemical equations in the booklet. Mention state symbols (s, l, g, aq).",
    status: "pending"
  },
  { 
    id: "hw-3", 
    subject: "Science", 
    teacher: "Rohit Sir", 
    title: "Physics Motion Numerical Exercises", 
    due: "Completed", 
    priority: "Medium", 
    attachment: "motion_numericals.pdf (2.4 MB)", 
    instructions: "Solve the 10 speed and acceleration numericals in the booklet.",
    status: "submitted",
    submittedOn: "Yesterday, 04:30 PM",
    fileName: "my_motion_numericals_sol.pdf"
  },
  { 
    id: "hw-4", 
    subject: "English", 
    teacher: "Priya Ma'am", 
    title: "English: Active & Passive Voice Practice", 
    due: "Completed", 
    priority: "Low", 
    attachment: "active_passive_voice.pdf (900 KB)", 
    instructions: "Convert the 20 given active voice sentences to passive voice.",
    status: "completed",
    submittedOn: "15 May, 06:12 PM",
    feedback: "Outstanding attempt Aarav! You have converted all passive voice forms completely. Great job on the exceptions.",
    marks: "9.5 / 10",
    fileName: "aarav_voice_assignment.docx"
  }
];

function HomeworkManagementPage() {
  const [homeworkList, setHomeworkList] = useState(initialHomeworkList);
  const [activeTab, setActiveTab] = useState<"pending" | "submitted" | "completed">("pending");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  // Modal / Upload state
  const [submittingHwId, setSubmittingHwId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mockFileName, setMockFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const pendingCount = homeworkList.filter(h => h.status === "pending").length;
  const submittedCount = homeworkList.filter(h => h.status === "submitted").length;
  const overdueCount = 1; // Fixed mock statistics
  const completedWeekCount = homeworkList.filter(h => h.status === "completed").length + 6; // Mock offset

  const handleStartSubmit = (id: string) => {
    setSubmittingHwId(id);
    setSelectedFile(null);
    setMockFileName("");
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setMockFileName(file.name);
    }
  };

  const triggerUpload = () => {
    if (!mockFileName) {
      toast.error("Please select a file to upload first.");
      return;
    }

    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        
        // Finalize submission
        setHomeworkList(prev => prev.map(hw => {
          if (hw.id === submittingHwId) {
            return {
              ...hw,
              status: "submitted",
              submittedOn: "Today, " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
              fileName: mockFileName
            };
          }
          return hw;
        }));
        
        setIsUploading(false);
        setSubmittingHwId(null);
        toast.success("Homework submitted successfully!", {
          description: "Your file has been uploaded and sent to your teacher.",
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        });
      }
    }, 150);
  };

  const handleDownloadAttachment = (filename: string) => {
    toast.success(`Downloading attachment: ${filename}`, {
      description: "Check your browser downloads directory."
    });
  };

  const filteredHw = homeworkList.filter(hw => {
    const matchesTab = hw.status === activeTab;
    const matchesSearch = hw.title.toLowerCase().includes(search.toLowerCase()) || 
                          hw.teacher.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === "All" || hw.subject === subjectFilter;

    return matchesTab && matchesSearch && matchesSubject;
  });

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
      <PageHeader title="Homework Management" subtitle="View worksheets, complete assignments, and track grades." />

      {/* Top Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Pending Homework", val: pendingCount, color: "border-brand-orange text-brand-orange bg-orange-50/50" },
          { label: "Submitted", val: submittedCount, color: "border-brand-blue text-brand-blue bg-blue-50/50" },
          { label: "Overdue", val: overdueCount, color: "border-red-500 text-red-600 bg-red-50/50" },
          { label: "Completed This Week", val: completedWeekCount, color: "border-brand-teal text-brand-teal bg-teal-50/50" }
        ].map((stat, i) => (
          <GlassCard key={i} className={cn("p-5 border-l-4 bg-white flex flex-col justify-between h-24", stat.color)}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
            <span className="font-display text-2xl font-black text-text-heading mt-1">{stat.val}</span>
          </GlassCard>
        ))}
      </div>

      {/* Filters and Search Bar */}
      <GlassCard className="p-5 bg-white border border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-grow">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="h-4 w-4" />
          </span>
          <input 
            type="text" 
            placeholder="Search homework by title or teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-blue transition-colors text-text-heading placeholder:text-slate-400"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11.5px] font-bold text-text-muted flex items-center gap-1">
            <Filter className="h-4.5 w-4.5" /> Filter:
          </span>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-blue text-text-body"
          >
            <option value="All">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>
        </div>
      </GlassCard>

      {/* Tabs list */}
      <div className="flex items-center gap-1 border-b border-slate-100 pb-1 overflow-x-auto">
        {["pending", "submitted", "completed"].map((tab) => (
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
            {tab} Homework ({homeworkList.filter(h => h.status === tab).length})
          </button>
        ))}
      </div>

      {/* Homework Queue Cards */}
      <div className="space-y-4">
        {filteredHw.length > 0 ? (
          filteredHw.map((item, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all flex flex-col gap-4 text-left"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-md">
                      {item.subject}
                    </span>
                    <span className="text-[9px] text-text-muted font-semibold">
                      {item.teacher}
                    </span>
                    {item.status === "pending" && (
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider",
                        item.priority === "High" ? "text-red-600 bg-red-50 border-red-150" :
                        item.priority === "Medium" ? "text-brand-orange bg-orange-50 border-brand-orange/20" :
                        "text-brand-blue bg-blue-50 border-brand-blue/20"
                      )}>
                        {item.priority} Priority
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-text-heading mt-2">{item.title}</h4>
                </div>
                
                {item.status === "pending" && (
                  <span className="text-[10px] font-bold text-brand-orange flex items-center gap-1 whitespace-nowrap shrink-0">
                    <Clock className="h-3.5 w-3.5" /> Due: {item.due}
                  </span>
                )}
              </div>

              {/* Instructions Panel */}
              <div className="p-3.5 bg-slate-50 border border-slate-100/60 rounded-xl text-xs space-y-2">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Instructions</span>
                <p className="text-text-body font-medium leading-relaxed">{item.instructions}</p>
                
                {/* Download Attachment Button */}
                <button 
                  onClick={() => handleDownloadAttachment(item.attachment)}
                  className="mt-2 text-[10px] font-bold text-brand-blue hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5" /> {item.attachment}
                </button>
              </div>

              {/* Submitted/Completed Evaluation details */}
              {(item.status === "submitted" || item.status === "completed") && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-xs pt-2 border-t border-slate-50">
                  <div className="space-y-1">
                    <span className="block text-[8.5px] uppercase tracking-wider text-slate-450 font-bold">Submitted On</span>
                    <span className="font-bold text-text-heading">{item.submittedOn}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[8.5px] uppercase tracking-wider text-slate-450 font-bold">File Uploaded</span>
                    <span className="font-semibold text-text-body truncate block max-w-full">{item.fileName}</span>
                  </div>
                  {item.status === "completed" && (
                    <div className="space-y-1">
                      <span className="block text-[8.5px] uppercase tracking-wider text-slate-450 font-bold">Score Grade</span>
                      <span className="font-black text-brand-teal text-sm">{item.marks}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Teacher Remarks Feedback Box */}
              {item.status === "completed" && item.feedback && (
                <div className="p-3.5 bg-teal-50/50 border border-brand-teal/15 rounded-xl text-xs space-y-1">
                  <span className="block text-[8px] uppercase tracking-wider text-brand-teal font-bold">Teacher Feedback Remarks</span>
                  <p className="text-text-body leading-relaxed font-medium italic">"{item.feedback}"</p>
                </div>
              )}

              {/* Action Submit Button */}
              {item.status === "pending" && (
                <div className="pt-2">
                  <button 
                    onClick={() => handleStartSubmit(item.id)}
                    className="h-9 px-5 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-sm hover:bg-brand-navy transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="h-4 w-4" /> Submit Homework
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-xs font-semibold text-text-muted space-y-2 border border-slate-100 rounded-3xl bg-white/50">
            <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-500" />
            <p>No homework assignments found in this section.</p>
          </div>
        )}
      </div>

      {/* Drag & Drop simulated Upload Modal Overlay */}
      <AnimatePresence>
        {submittingHwId && (
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
                onClick={() => setSubmittingHwId(null)}
                className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-text-heading hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <h3 className="font-display text-lg font-bold text-text-heading flex items-center gap-2 mb-2">
                <Upload className="h-5 w-5 text-brand-blue" />
                Upload Homework Submission
              </h3>
              <p className="text-[10.5px] text-text-muted mb-5 leading-normal">
                Select your solution file. Supported formats: **PDF, Images (PNG/JPG), DOCX, ZIP** up to 10MB.
              </p>

              <div className="space-y-4">
                {/* Visual Drag and Drop Box */}
                {!isUploading ? (
                  <label className="border-2 border-dashed border-slate-200 hover:border-brand-blue/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-slate-50">
                    <UploadCloud className="h-10 w-10 text-slate-400 mb-2.5" />
                    <span className="text-xs font-bold text-text-heading">Click to browse file</span>
                    <span className="text-[10px] text-text-muted mt-1 leading-none">or drag and drop here</span>
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.zip"
                      onChange={handleFileSelect}
                      className="hidden" 
                    />
                  </label>
                ) : (
                  <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 text-xs font-semibold">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue/20 border-t-brand-blue" />
                    <div className="w-full text-left max-w-xs mx-auto">
                      <div className="flex justify-between font-bold text-text-heading mb-1 text-[10.5px]">
                        <span>Uploading files...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand-blue h-1.5 rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Selected File Details */}
                {mockFileName && !isUploading && (
                  <div className="p-3 bg-blue-50/55 border border-brand-blue/15 rounded-xl flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="h-4.5 w-4.5 text-brand-blue shrink-0" />
                      <span className="text-text-heading truncate max-w-44 leading-tight">{mockFileName}</span>
                    </div>
                    <button 
                      onClick={() => { setSelectedFile(null); setMockFileName(""); }}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                  </div>
                )}

                {/* Submit action */}
                {!isUploading && (
                  <button
                    onClick={triggerUpload}
                    disabled={!mockFileName}
                    className="w-full mt-2 py-3 bg-brand-blue hover:bg-brand-navy disabled:bg-blue-300 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="h-4.5 w-4.5 stroke-[3px]" /> Submit Solutions
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
