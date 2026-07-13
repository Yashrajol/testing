import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { Sparkles, Send, Bot, User, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/dashboard/student/ai")({
  component: AIPage,
});

const chatHistory = [
  { sender: "ai", message: "Hi there! I noticed you recently completed your Data Structures diagnostic test. You scored well overall, but struggled slightly with binary trees. Would you like me to generate a quick practice module for that?" },
  { sender: "user", message: "Yes, that would be great. Can you focus specifically on tree traversal algorithms?" },
  { sender: "ai", message: "Absolutely! I've created a custom learning block for Tree Traversals. I've also added it to your Short-Term Goals." }
];

const actionItems = [
  "Review Binary Tree Traversals (In-order, Pre-order, Post-order)",
  "Schedule a 15-minute mock interview for Python Basics",
  "Complete the pending Calculus Midterm Prep"
];

function AIPage() {
  return (
    <>
      <PageHeader title="AI Assistant" subtitle="Your personalized learning co-pilot." />
      
      <div className="grid gap-6 lg:grid-cols-3 mt-6 h-150">
        {/* Chat Interface */}
        <div className="lg:col-span-2 h-full flex flex-col">
          <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden border-brand-teal/20">
            {/* Chat Header */}
            <div className="p-4 border-b border-border-default bg-bg-secondary/50 flex items-center gap-3">
              <div className="h-10 w-10 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-text-heading">Vedhkrit AI</h3>
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                </p>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-bg-primary/30">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'ai' ? 'bg-brand-teal text-white' : 'bg-brand-blue text-white'
                  }`}>
                    {msg.sender === 'ai' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </div>
                  <div className={`p-4 max-w-[80%] text-sm shadow-sm ${
                    msg.sender === 'ai' ? 'bg-white border border-border-default rounded-2xl rounded-tl-none' : 'bg-brand-blue text-white rounded-2xl rounded-tr-none'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border-default bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask me anything about your courses..." 
                  className="w-full pl-4 pr-12 py-3 bg-bg-secondary border border-border-default rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-brand-teal text-white rounded-lg hover:bg-teal-600 transition-colors">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* AI Action Items Sidebar */}
        <div className="lg:col-span-1 h-full">
          <GlassCard className="p-6 h-full flex flex-col bg-linear-to-b from-bg-secondary to-bg-primary">
            <h3 className="text-lg font-bold text-text-heading flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-brand-teal" />
              AI Recommendations
            </h3>
            <p className="text-sm text-text-muted mb-6">Based on your recent activity, here are the top 3 high-impact actions you can take today:</p>
            
            <div className="space-y-4 flex-1">
              {actionItems.map((item, i) => (
                <div key={i} className="flex gap-3 bg-white p-4 rounded-xl border border-border-default shadow-sm hover:border-brand-teal/30 transition-colors">
                  <div className="mt-0.5 text-brand-teal shrink-0">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-text-body">{item}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 bg-brand-teal/10 text-brand-teal font-bold rounded-lg text-sm hover:bg-brand-teal/20 transition-colors">
              Generate New Insights
            </button>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
