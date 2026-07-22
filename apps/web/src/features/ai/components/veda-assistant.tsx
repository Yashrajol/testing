import { PageHeader } from "@/app/layouts/dashboard-shell";
import { GlassCard } from "@/shared/ui/glass-card";
import { Sparkles, Send, User, Lightbulb, BrainCircuit } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { cn } from "@/shared/utils/utils";
import { useAuth } from "@/app/providers/auth-context";
import { 
  useGenerateStudyPlan, 
  useGenerateInsights, 
  useCareerAdvice, 
  useParentSummary 
} from "../queries/useAI";

type Role = "student" | "parent";

interface Prompt {
  label: string;
  desc: string;
  prompt: string;
}

interface VedaConfig {
  title: string;
  subtitle: string;
  headline: string;
  greeting: string;
  prompts: Prompt[];
  tip: { title: string; body: string };
}

const VEDA_CONFIG: Record<Role, VedaConfig> = {
  student: {
    title: "Veda — AI Mentor",
    subtitle: "Ask Veda your doubts, get practice questions, or make quick chapter summaries.",
    headline: "Veda · Your AI Mentor",
    greeting:
      "Hi Aarav! I'm Veda, your AI mentor. I see you have a Science Test coming up. How can I help you study today?",
    prompts: [
      { label: "Ask a Doubt", desc: "Get step-by-step guidance", prompt: "Explain how to solve linear equations step-by-step." },
      { label: "Generate Practice", desc: "Test your understanding", prompt: "Generate a science practice question on Newton's laws." },
      { label: "Summarize Chapter", desc: "Review before examinations", prompt: "Summarize the key points of Chapter 8: Motion." },
    ],
    tip: {
      title: "Daily Study Tip",
      body: "Write your physics formulas on small cards and test yourself. Practising from memory can boost your marks by 25%!",
    },
  },
  parent: {
    title: "Veda — AI Mentor",
    subtitle: "Ask Veda about your child's progress, how to support learning at home, and what's coming up.",
    headline: "Veda Family Co-Pilot",
    greeting:
      "Namaste! I'm Veda, your family's AI mentor. Ask me about your child's progress, how to support their studies at home, or upcoming activities and mentor notes.",
    prompts: [
      { label: "Child's Progress", desc: "Latest scores & growth", prompt: "How is my child's progress this month?" },
      { label: "Support at Home", desc: "Practical parenting tips", prompt: "How can I support my child's studies at home?" },
      { label: "Upcoming Activities", desc: "Tests, PTMs & sessions", prompt: "What are the upcoming activities and events?" },
    ],
    tip: {
      title: "Parenting Tip",
      body: "A short daily conversation about what your child learned reinforces memory and builds confidence more than long study sessions.",
    },
  },
};

const VEDA_LOGO = "/assets/brand/veda-logo.png";

export function VedaAssistant({ role }: { role: Role }) {
  const { user } = useAuth();
  const studentId = user?.id || 'student-123';

  // React Query Mutations
  const studyPlanMutation = useGenerateStudyPlan();
  const insightsMutation = useGenerateInsights();
  const careerMutation = useCareerAdvice();
  const parentMutation = useParentSummary();

  const config = VEDA_CONFIG[role];
  const [messages, setMessages] = useState([{ sender: "ai", message: config.greeting }]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", message: text }]);
    setIsTyping(true);

    try {
      let responseText = "";

      if (role === "parent") {
        // Parent context
        const res = await parentMutation.mutateAsync({ prompt: text, studentId });
        responseText = res.text;
      } else {
        // Student context - route based on keyword matching
        const lower = text.toLowerCase();
        if (lower.includes("study plan") || lower.includes("plan") || lower.includes("timetable")) {
          const res = await studyPlanMutation.mutateAsync({ prompt: text, studentId });
          responseText = res.text;
        } else if (lower.includes("career") || lower.includes("job") || lower.includes("become") || lower.includes("advice")) {
          const res = await careerMutation.mutateAsync({ prompt: text, studentId });
          responseText = res.text;
        } else {
          const res = await insightsMutation.mutateAsync({ prompt: text, studentId });
          responseText = res.text;
        }
      }

      setMessages((prev) => [...prev, { sender: "ai", message: responseText }]);
    } catch (err: any) {
      const errMsg = err?.response?.status === 429
        ? "I am receiving too many requests right now. Please wait a minute and try again."
        : "Failed to connect to Veda. Please check your network and try again.";
      setMessages((prev) => [...prev, { sender: "ai", message: errMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    handleSendMessage(inputValue);
    setInputValue("");
  };

  const handleQuickAction = (actionLabel: string, promptText: string) => {
    if (isTyping) return;
    toast.info(`Asked Veda: ${actionLabel}`);
    handleSendMessage(promptText);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const VedaAvatar = ({ className }: { className?: string }) => (
    <img src={VEDA_LOGO} alt="Veda" className={cn("object-contain rounded-full bg-white p-0.5", className)} />
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 text-left">
      <PageHeader title={config.title} subtitle={config.subtitle} />

      <div className="grid gap-6 lg:grid-cols-12 mt-6 h-[70vh]">
        {/* Chat Interface */}
        <div className="lg:col-span-8 h-full flex flex-col min-h-96">
          <GlassCard className="flex-grow flex flex-col p-0 overflow-hidden border-brand-teal/20 bg-white shadow-md">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-brand-teal/10 rounded-full flex items-center justify-center border border-brand-teal/15">
                  <VedaAvatar className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-heading">{config.headline}</h3>
                  <p className="text-[10px] text-text-muted flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Response Mode
                  </p>
                </div>
              </div>

              <button
                onClick={() => setMessages([{ sender: "ai", message: config.greeting }])}
                className="text-[10px] text-brand-blue font-bold hover:underline cursor-pointer"
              >
                Clear History
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/20">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3.5", msg.sender === "user" ? "flex-row-reverse" : "text-left")}>
                  <div
                    className={cn(
                      "h-8.5 w-8.5 rounded-full flex items-center justify-center shrink-0 border",
                      msg.sender === "ai" ? "bg-white border-brand-teal/20" : "bg-brand-blue border-brand-blue/10 text-white",
                    )}
                  >
                    {msg.sender === "ai" ? <VedaAvatar className="h-7 w-7" /> : <User className="h-5 w-5" />}
                  </div>
                  <div
                    className={cn(
                      "p-3.5 max-w-[80%] text-xs shadow-xs leading-relaxed",
                      msg.sender === "ai"
                        ? "bg-white border border-slate-100 rounded-2xl rounded-tl-none text-text-body font-semibold font-medium"
                        : "bg-brand-blue text-white rounded-2xl rounded-tr-none font-semibold font-medium",
                    )}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="flex gap-3.5 text-left">
                    <div className="h-8.5 w-8.5 rounded-full bg-white border border-brand-teal/20 flex items-center justify-center shrink-0">
                      <VedaAvatar className="h-7 w-7" />
                    </div>
                    <div className="p-3.5 bg-white border border-slate-100 rounded-2xl rounded-tl-none text-xs text-text-muted flex items-center gap-1.5 font-bold">
                      <span>Veda is typing</span>
                      <span className="flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce delay-100" />
                        <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce delay-200" />
                        <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-bounce delay-300" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSubmitForm} className="p-4 border-t border-slate-100 bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  placeholder={role === "student" ? "Ask Veda a doubt, generate a study plan, or get career advice..." : "Ask Veda about your child's progress or study support..."}
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all placeholder:text-slate-400 text-text-heading disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-teal text-white rounded-lg hover:bg-teal-600 disabled:bg-teal-300 transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </GlassCard>
        </div>

        {/* Prompts Sidebar */}
        <div className="lg:col-span-4 h-full flex flex-col">
          <GlassCard className="p-6 flex-grow flex flex-col justify-between bg-slate-50/50 border border-slate-100 shadow-sm text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-teal/10 text-brand-teal rounded-xl">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-heading">Ask Veda</h3>
                  <p className="text-[10px] text-text-muted">Tap a prompt to start instantly</p>
                </div>
              </div>

              <div className="space-y-3">
                {config.prompts.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(act.label, act.prompt)}
                    disabled={isTyping}
                    className="w-full text-left p-3.5 bg-white border border-slate-100 rounded-2xl hover:border-brand-teal/30 disabled:opacity-50 transition-all flex items-start gap-3 cursor-pointer group"
                  >
                    <div className="mt-0.5 text-brand-teal group-hover:scale-105 transition-transform">
                      <Lightbulb className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-text-heading leading-tight">{act.label}</h4>
                      <p className="text-[10px] text-text-muted mt-0.5 font-medium leading-none">{act.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100/60 mt-6">
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-brand-teal/15 flex items-start gap-2.5 text-xs text-brand-teal text-left">
                <BrainCircuit className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold">{config.tip.title}</h5>
                  <p className="text-[10px] text-teal-800 mt-1 leading-normal font-medium">{config.tip.body}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
