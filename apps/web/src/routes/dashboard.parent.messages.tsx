import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";
import { GlassCard } from "@/components/glass-card";
import { 
  MessageSquare, Send, Check, Phone, Paperclip, 
  Calendar, Mic, Search, CheckCheck, MoreVertical
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export const Route = createFileRoute("/dashboard/parent/messages")({
  component: ParentMessagesPage,
  head: () => ({ meta: [{ title: "Messages — Parent Portal" }] }),
});

const initialChats = [
  {
    id: "mentor",
    name: "Priya Iyer",
    role: "Lead Counselor",
    avatar: "PI",
    unread: false,
    messages: [
      { text: "Hello Rohan. I've uploaded Yash's latest aptitude report.", sender: "mentor", time: "10:30 AM", status: "read" },
      { text: "Great, thanks Priya. We noticed the suggestions about PCM/CS. Is it a good fit?", sender: "parent", time: "10:45 AM", status: "read" },
      { text: "Absolutely, his logical scores match PCM perfectly. Let's discuss this on our check-in video call on Mar 25.", sender: "mentor", time: "11:00 AM", status: "read" }
    ]
  },
  {
    id: "teacher",
    name: "Sunita Rao",
    role: "Class Teacher",
    avatar: "SR",
    unread: true,
    messages: [
      { text: "Reminder: Parent-Teacher Meeting is scheduled for March 28th at 4:00 PM.", sender: "teacher", time: "Yesterday", status: "read" },
      { text: "Please bring the printed science preparation guide with you.", sender: "teacher", time: "Yesterday", status: "read" }
    ]
  },
  {
    id: "counselor",
    name: "Anand Kumar",
    role: "Career Counselor",
    avatar: "AK",
    unread: false,
    messages: [
      { text: "Hi, the engineering stream guides for next term selection are available in reports.", sender: "counselor", time: "2 days ago", status: "read" }
    ]
  },
  {
    id: "admin",
    name: "Principal Rao",
    role: "School Administration",
    avatar: "PR",
    unread: false,
    messages: [
      { text: "The term fee payment receipt has been uploaded to the report center. Thank you.", sender: "admin", time: "3 days ago", status: "read" }
    ]
  }
];

function ParentMessagesPage() {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState("mentor");
  const [inputMessage, setInputMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    
    const updatedChats = chats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          unread: false,
          messages: [
            ...c.messages,
            { text: inputMessage, sender: "parent", time: "11:15 AM", status: "sent" }
          ]
        };
      }
      return c;
    });

    setChats(updatedChats);
    setInputMessage("");

    // Simulate double-check receipt marking after 1.5 seconds
    setTimeout(() => {
      setChats(prev => prev.map(c => {
        if (c.id === activeChatId) {
          const updatedMsgs = c.messages.map(m => m.status === "sent" ? { ...m, status: "read" } : m);
          return { ...c, messages: updatedMsgs };
        }
        return c;
      }));
    }, 1500);
  };

  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" subtitle="Direct message channels with school teachers, counselors, and mentors." />

      <div className="grid gap-6 lg:grid-cols-3 h-[600px] items-stretch">
        {/* Chat sidebar selection */}
        <div className="lg:col-span-1 flex flex-col gap-3 h-full">
          {/* Search bar */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3.5 py-2.5">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent text-xs text-text-body placeholder-slate-400 outline-none" 
            />
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: false } : c));
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  activeChatId === chat.id 
                    ? "bg-brand-navy border-brand-navy text-white shadow-md shadow-brand-navy/15" 
                    : "bg-white/80 border-slate-100 hover:bg-white text-text-heading"
                }`}
              >
                {chat.unread && (
                  <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                )}
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-xs ${
                    activeChatId === chat.id 
                      ? "bg-white/20 text-white" 
                      : "bg-brand-blue/10 text-brand-blue"
                  }`}>
                    {chat.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-bold text-xs leading-tight truncate">{chat.name}</h4>
                    </div>
                    <p className={`text-[10px] truncate mt-1 ${activeChatId === chat.id ? "text-blue-100" : "text-text-muted"}`}>
                      {chat.role}
                    </p>
                    <p className={`text-[9.5px] truncate mt-0.5 leading-tight ${activeChatId === chat.id ? "text-white/80" : "text-slate-400"}`}>
                      {chat.messages[chat.messages.length - 1]?.text}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active chat window */}
        <div className="lg:col-span-2 h-full flex flex-col justify-between">
          <GlassCard className="h-full border border-slate-100 bg-white/80 p-0 flex flex-col overflow-hidden shadow-card">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 bg-slate-50/20">
              <div className="flex items-center gap-3 text-left">
                <div className="h-9 w-9 rounded-xl bg-brand-blue/10 flex items-center justify-center font-bold text-xs text-brand-blue">
                  {activeChat.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-text-heading leading-tight">{activeChat.name}</h4>
                  <p className="text-[10px] text-text-muted font-bold mt-0.5">{activeChat.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="rounded-xl border border-slate-150 bg-white p-2 text-text-heading hover:bg-slate-50 hover:text-brand-blue transition-all cursor-pointer" title="Book Meeting">
                  <Calendar className="h-4.5 w-4.5 text-slate-500" />
                </button>
                <button className="rounded-xl border border-slate-150 bg-white p-2 text-text-heading hover:bg-slate-50 hover:text-brand-blue transition-all cursor-pointer" title="Call Info">
                  <Phone className="h-4.5 w-4.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Message feed */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 text-left">
              {activeChat.messages.map((msg, idx) => {
                const isParent = msg.sender === "parent";
                return (
                  <div key={idx} className={`flex ${isParent ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isParent 
                        ? "bg-brand-blue text-white rounded-tr-none shadow-xs" 
                        : "bg-slate-50 border border-slate-100 text-text-heading rounded-tl-none"
                    }`}>
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-end gap-1.5 mt-1.5">
                        <span className={`text-[9px] font-bold block ${isParent ? "text-blue-100" : "text-text-muted"}`}>
                          {msg.time}
                        </span>
                        {isParent && (
                          msg.status === "read" 
                            ? <CheckCheck className="h-3.5 w-3.5 text-emerald-300" /> 
                            : <Check className="h-3.5 w-3.5 text-blue-200" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input field */}
            <div className="border-t border-slate-100 p-4 bg-slate-50/20 flex items-center gap-2">
              <button className="p-2.5 rounded-xl border border-slate-150 hover:border-slate-300 bg-white text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" title="Add Attachment">
                <Paperclip className="h-4.5 w-4.5" />
              </button>
              <button className="p-2.5 rounded-xl border border-slate-150 hover:border-slate-300 bg-white text-slate-400 hover:text-slate-600 transition-colors cursor-pointer" title="Record Voice Note">
                <Mic className="h-4.5 w-4.5" />
              </button>
              
              <input
                type="text"
                placeholder={`Message ${activeChat.name.split(' ')[0]}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-grow rounded-xl border border-slate-150 bg-white px-4 py-2.5 text-xs text-text-body outline-none focus:border-brand-blue transition-all"
              />
              
              <button 
                onClick={handleSend}
                className="rounded-xl gradient-brand px-4 py-2.5 text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 hover:opacity-95 transition-all cursor-pointer"
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
