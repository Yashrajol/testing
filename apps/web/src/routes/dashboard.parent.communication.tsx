import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { MessageSquare, Send, Check, Phone } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/communication")({
  component: ParentCommunicationPage,
  head: () => ({ meta: [{ title: "Communication Center — Parent Portal" }] }),
});

const initialChats = [
  {
    id: "mentor",
    name: "Priya Iyer",
    role: "Lead Counselor",
    avatar: "PI",
    messages: [
      { text: "Hello Rohan. I've uploaded Aarav's latest aptitude report.", sender: "mentor", time: "10:30 AM" },
      { text: "Great, thanks Priya. We noticed the suggestions about PCM/CS. Is it a good fit?", sender: "parent", time: "10:45 AM" },
      { text: "Absolutely, his logical scores match PCM perfectly. Let's discuss this on our check-in video call on Mar 25.", sender: "mentor", time: "11:00 AM" }
    ]
  },
  {
    id: "teacher",
    name: "Sunita Rao",
    role: "Class Teacher",
    avatar: "SR",
    messages: [
      { text: "Reminder: Parent-Teacher Meeting is scheduled for March 28th at 4:00 PM.", sender: "teacher", time: "Yesterday" }
    ]
  },
  {
    id: "counselor",
    name: "Anand Kumar",
    role: "Career Counselor",
    avatar: "AK",
    messages: [
      { text: "Hi, the engineering stream guides for next term selection are available in reports.", sender: "counselor", time: "2 days ago" }
    ]
  }
];

function ParentCommunicationPage() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState("mentor");
  const [inputMessage, setInputMessage] = useState("");

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    
    const updatedChats = chats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [
            ...c.messages,
            { text: inputMessage, sender: "parent", time: "Just now" }
          ]
        };
      }
      return c;
    });

    setChats(updatedChats);
    setInputMessage("");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Communication Center" subtitle="Direct message channels with Aarav's school teachers and mentors." />

      <div className="grid gap-6 lg:grid-cols-3 h-[600px]">
        {/* Chat sidebar selection */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`text-left p-4 rounded-2xl border transition-all ${
                activeChatId === chat.id 
                  ? "bg-brand-navy border-brand-navy text-white shadow-md shadow-brand-navy/15" 
                  : "bg-white/60 border-border-default/50 hover:bg-white/80 text-text-heading"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-xs ${
                  activeChatId === chat.id 
                    ? "bg-white/20 text-white" 
                    : "bg-brand-blue/10 text-brand-blue"
                }`}>
                  {chat.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs leading-tight truncate">{chat.name}</h4>
                  <p className={`text-[10px] truncate mt-0.5 ${activeChatId === chat.id ? "text-blue-100" : "text-text-muted"}`}>
                    {chat.role}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active chat window */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full border border-border-default/50 bg-white/60 p-0 flex flex-col overflow-hidden">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-border-default/50 px-5 py-3.5 bg-white/40">
              <div className="flex items-center gap-3 text-left">
                <div className="h-9 w-9 rounded-xl bg-brand-blue/10 flex items-center justify-center font-bold text-xs text-brand-blue">
                  {activeChat.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-text-heading leading-tight">{activeChat.name}</h4>
                  <p className="text-[10px] text-text-muted font-semibold mt-0.5">{activeChat.role}</p>
                </div>
              </div>
              
              <button className="rounded-xl border border-border-default bg-white/80 p-2 text-text-heading hover:bg-bg-secondary hover:text-brand-blue transition-all cursor-pointer">
                <Phone className="h-4 w-4" />
              </button>
            </div>

            {/* Message feed */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-left">
              {activeChat.messages.map((msg, idx) => {
                const isParent = msg.sender === "parent";
                return (
                  <div key={idx} className={`flex ${isParent ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isParent 
                        ? "bg-brand-blue text-white rounded-tr-none shadow-sm" 
                        : "bg-bg-secondary border border-border-default/50 text-text-heading rounded-tl-none"
                    }`}>
                      <p>{msg.text}</p>
                      <span className={`text-[9px] font-bold block mt-1.5 text-right ${isParent ? "text-blue-100" : "text-text-muted"}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input field */}
            <div className="border-t border-border-default/50 p-4 bg-white/40 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 rounded-xl border border-border-default bg-white/80 px-4 py-2.5 text-xs text-text-body outline-none focus:border-brand-blue transition-all"
              />
              <button 
                onClick={handleSend}
                className="rounded-xl gradient-brand px-4 py-2.5 text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5 hover:opacity-95 transition-all cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                Send
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
