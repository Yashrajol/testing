import { useState, useEffect } from "react";
import { ArrowUp, X, Send, Bot, Pin } from "lucide-react";
import { GlassCard } from "./glass-card";
import { cn } from "@/lib/utils";

export function FloatingWidgets() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isHomeLoading, setIsHomeLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsHomeLoading(!!(window as any).__vedhkrit_loading);
    }
    const handleLoadingChange = () => {
      setIsHomeLoading(!!(window as any).__vedhkrit_loading);
    };
    window.addEventListener("vedhkrit-loading-change", handleLoadingChange);
    return () => {
      window.removeEventListener("vedhkrit-loading-change", handleLoadingChange);
    };
  }, []);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      // Check if scroll is past the initial hero viewport height
      setIsPastHero(window.scrollY > window.innerHeight - 100);

      // Hide or set scrolling state for top button while moving
      setScrolling(true);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setScrolling(false);
        // Show Go To Top button if scrolled down past 300px
        setShowTopBtn(window.scrollY > 300);
      }, 800); // 800ms debounce of scroll movement stop
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isHomeLoading) return null;

  return (
    <>
      {isPastHero ? (
        /* =========================================================================
           1. SIDEBAR MODE (Scrolled past Hero section)
           ========================================================================= */
        <>
          {/* Docked Sidebar Tab Trigger (Pinned Paper Note style) */}
          {!chatOpen && (
            <button
              onClick={() => setChatOpen(true)}
              className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#fffef0] text-brand-teal shadow-[-3px_3px_10px_rgba(0,0,0,0.08)] border-y border-l border-amber-200/50 pl-2.5 pr-1.5 py-4 rounded-l-lg flex flex-col items-center gap-1.5 hover:translate-x-[-4px] transition-all duration-200 cursor-pointer"
            >
              {/* Metallic Pushpin */}
              <Pin className="h-3.5 w-3.5 text-rose-500 absolute -top-1.5 left-2 -rotate-45 drop-shadow-[1px_2px_2px_rgba(0,0,0,0.2)] shrink-0" />

              <img
                src="/assets/brand/veda-logo.png"
                alt="Veda"
                className="h-6 w-6 object-contain rounded-full border border-brand-teal/20 bg-slate-50 p-0.5 mt-1 animate-bounce"
              />
              <span
                className="text-[9px] font-extrabold tracking-widest uppercase text-slate-600 font-mono mt-0.5"
                style={{ writingMode: "vertical-lr" }}
              >
                ASK VEDA
              </span>
            </button>
          )}

          {/* Slide-out Sidebar Chat Panel (Clipboard/Notebook sheet) */}
          {chatOpen && (
            <>
              {/* Soft dark blur backdrop overlay to dismiss drawer */}
              <div 
                className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 transition-opacity animate-in fade-in duration-300 cursor-pointer"
                onClick={() => setChatOpen(false)}
              />
              <div className="fixed right-0 top-0 h-screen w-80 bg-[#fffdf6] shadow-2xl z-50 flex flex-col border-l border-amber-200/40 animate-in slide-in-from-right duration-300">
                <div className="p-4 bg-[#fffef0] text-slate-800 border-b border-slate-100 flex justify-between items-center shrink-0 relative">
                  {/* Silver Pushpin in the header */}
                  <Pin className="h-4 w-4 text-rose-500 absolute top-3 left-4 -rotate-45 drop-shadow-xs" />
                  <div className="flex items-center gap-2 pl-6">
                    <img
                      src="/assets/brand/veda-logo.png"
                      alt="Veda"
                      className="h-6 w-6 object-contain rounded-full bg-slate-100 p-0.5 animate-pulse"
                    />
                    <span className="font-extrabold text-xs uppercase tracking-wider text-slate-700 font-mono">Veda Study Buddy</span>
                  </div>
                  <button onClick={() => setChatOpen(false)} className="hover:bg-slate-100 p-1.5 rounded-md transition-colors text-slate-500">
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
                <div className="flex-1 p-4 bg-[#fffdfb] overflow-y-auto text-sm space-y-3">
                  <div className="bg-[#fffef0] p-3 rounded-lg rounded-tl-none border border-amber-200/30 text-slate-700 font-mono text-xs shadow-xs leading-relaxed">
                    Hi! I'm Veda, your study buddy. How can I help you today?
                  </div>
                </div>
                <div className="p-3 border-t border-slate-100 bg-[#fffef0] shrink-0">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-md text-xs font-mono focus:outline-none focus:border-amber-400 bg-white"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-teal hover:text-teal-700">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        /* =========================================================================
           2. FLOATING BUBBLE MODE (On Hero section / top of page)
           ========================================================================= */
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
          {/* Floating Chat Window */}
          {chatOpen && (
            <GlassCard className="w-80 h-96 p-0 overflow-hidden flex flex-col shadow-2xl border-brand-teal/30 mb-2 animate-in slide-in-from-bottom-5">
              <div className="p-3 bg-brand-teal text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/brand/veda-logo.png"
                    alt="Veda"
                    className="h-6 w-6 object-contain rounded-full bg-white/20 p-0.5"
                  />
                  <span className="font-bold text-sm">Veda your study buddy</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 p-4 bg-slate-50 overflow-y-auto text-sm space-y-3">
                <div className="bg-brand-teal/10 p-3 rounded-lg rounded-tl-none border border-brand-teal/20 text-slate-700">
                  Hi! I'm Veda, your study buddy. How can I help you today?
                </div>
              </div>
              <div className="p-3 border-t border-slate-200 bg-white">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-brand-teal"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-teal hover:text-teal-700">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Floating Action Button bubble */}
          <div className="relative flex items-center">
            {!chatOpen && (
              <div className="absolute bottom-[115%] right-0 whitespace-nowrap animate-bounce z-50">
                <div className="relative bg-white text-brand-teal px-2.5 py-1.2 rounded-xl shadow-md border border-brand-teal/15 text-[10px] font-extrabold flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-orange"></span>
                  </span>
                  Ready to Level Up? ⚡
                  {/* Triangular speech pointer tail */}
                  <div className="absolute top-full right-6 w-1.5 h-1.5 bg-white border-r border-b border-brand-teal/15 rotate-45 -translate-y-[4px]" />
                </div>
              </div>
            )}

            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="h-14 w-14 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.2)] hover:scale-105 transition-transform overflow-hidden relative shrink-0 group border border-slate-100"
            >
              {chatOpen ? (
                <div className="absolute inset-0 bg-brand-teal text-white flex items-center justify-center">
                  <X className="h-6 w-6" />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-1 bg-slate-50">
                  <img
                    src="/assets/brand/veda-logo.png"
                    alt="Veda Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         3. INDEPENDENT GO TO TOP BUTTON (Visible only when stopped moving)
         ========================================================================= */}
      {showTopBtn && !scrolling && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 h-12 w-12 bg-brand-navy text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform animate-in fade-in zoom-in duration-300"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
