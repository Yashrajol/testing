import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  CheckCircle2, 
  BrainCircuit, 
  BookOpen 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/student/ai")({
  component: AIPage,
  head: () => ({ meta: [{ title: "VedhAI Assistant — Vedhkrit" }] }),
});

const initialMessages = [
  { sender: "ai", message: "Hi Aarav! I'm VedhAI, your personalized learning co-pilot. I noticed you're prepping for your upcoming Science Test. How can I help you study today?" }
];

const predefinedAnswers: Record<string, string> = {
  "math": "Algebra is all about finding the unknown! Let's practice. What is the value of x if 4x + 5 = 21?",
  "science": "Your science syllabus covers Chemical Reactions and Motion. For Motion, remember: speed = distance / time, and acceleration is change in velocity over time.",
  "doubt": "Of course! Paste your question here, and I'll break it down step-by-step for you.",
  "practice": "Here is a quick question for you: 'If a car travels 150 km in 3 hours, what is its average speed?' (Reply with your answer!)",
  "summarize": "Sure! Chapter 8 (Motion) explains reference points, distance vs displacement, uniform motion, and equations of motion (v = u + at, s = ut + 1/2at², v² - u² = 2as).",
  "default": "Great question! I'm analysis-ready. We can review formulas, attempt quick quizzes, or summarize chapters together. Let's make today another step toward excellence!"
};

function AIPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: "user", message: text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseText = predefinedAnswers.default;

      if (lower.includes("math") || lower.includes("algebra") || lower.includes("quadratic")) {
        responseText = predefinedAnswers.math;
      } else if (lower.includes("science") || lower.includes("motion") || lower.includes("physics")) {
        responseText = predefinedAnswers.science;
      } else if (lower.includes("doubt") || lower.includes("explain")) {
        responseText = predefinedAnswers.doubt;
      } else if (lower.includes("practice") || lower.includes("question") || lower.includes("quiz")) {
        responseText = predefinedAnswers.practice;
      } else if (lower.includes("summarize") || lower.includes("chapter") || lower.includes("notes")) {
        responseText = predefinedAnswers.summarize;
      }

      setMessages(prev => [...prev, { sender: "ai", message: responseText }]);
      setIsTyping(false);
    }, 750);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSendMessage(inputValue);
    setInputValue("");
  };

  const handleQuickAction = (actionLabel: string, promptText: string) => {
    toast.info(`Triggered: ${actionLabel}`);
    handleSendMessage(promptText);
  };

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
      <PageHeader title="VedhAI Assistant" subtitle="Ask doubts, practice questions, or summarize syllabus topics in real-time." />
      
      <div className="grid gap-6 lg:grid-cols-12 mt-6 h-[70vh]">
        {/* Chat Interface */}
        <div className="lg:col-span-8 h-full flex flex-col min-h-96">
          <GlassCard className="flex-grow flex flex-col p-0 overflow-hidden border-brand-teal/20 bg-white shadow-md">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-heading">VedhAI Learning Co-Pilot</h3>
                  <p className="text-[10px] text-text-muted flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Response Mode
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setMessages(initialMessages)}
                className="text-[10px] text-brand-blue font-bold hover:underline"
              >
                Clear History
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/20">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3.5", msg.sender === 'user' ? 'flex-row-reverse' : 'text-left')}>
                  <div className={cn(
                    "h-8.5 w-8.5 rounded-full flex items-center justify-center shrink-0 border text-white font-bold",
                    msg.sender === 'ai' ? 'bg-brand-teal border-brand-teal/10' : 'bg-brand-blue border-brand-blue/10'
                  )}>
                    {msg.sender === 'ai' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div className={cn(
                    "p-3.5 max-w-[80%] text-xs shadow-xs leading-relaxed",
                    msg.sender === 'ai' 
                      ? 'bg-white border border-slate-100 rounded-2xl rounded-tl-none text-text-body font-semibold' 
                      : 'bg-brand-blue text-white rounded-2xl rounded-tr-none font-semibold'
                  )}>
                    {msg.message}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex gap-3.5"
                  >
                    <div className="h-8.5 w-8.5 rounded-full bg-brand-teal text-white flex items-center justify-center shrink-0 border border-brand-teal/10">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="p-3.5 bg-white border border-slate-100 rounded-2xl rounded-tl-none text-xs text-text-muted flex items-center gap-1.5 font-bold">
                      <span>VedhAI is typing</span>
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
                  placeholder="Ask a doubt, generate a question, or summarize physics/math..." 
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-150 rounded-xl text-xs font-semibold focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all placeholder:text-slate-400 text-text-heading"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-teal text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </GlassCard>
        </div>

        {/* AI Recommendations Sidebar */}
        <div className="lg:col-span-4 h-full flex flex-col">
          <GlassCard className="p-6 flex-grow flex flex-col justify-between bg-slate-50/50 border border-slate-100 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-teal/10 text-brand-teal rounded-xl">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-heading">AI Prompts Helper</h3>
                  <p className="text-[10px] text-text-muted">Click to query VedhAI instantly</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Ask a Doubt", desc: "Get step-by-step guidance", prompt: "Explain how to solve linear equations step-by-step." },
                  { label: "Generate Practice", desc: "Test your understanding", prompt: "Generate a science practice question on Newton's laws." },
                  { label: "Summarize Chapter", desc: "Review before examinations", prompt: "Summarize the key points of Chapter 8: Motion." }
                ].map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickAction(act.label, act.prompt)}
                    className="w-full text-left p-3.5 bg-white border border-slate-100 rounded-2xl hover:border-brand-teal/30 transition-all flex items-start gap-3 cursor-pointer group"
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
                  <h5 className="font-bold">Daily Study Tip</h5>
                  <p className="text-[10px] text-teal-800 mt-1 leading-normal font-medium">
                    Try writing down physics formulas on flashcards. Active recall increases test scores by 25%!
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
