import { Link, useRouter } from "@tanstack/react-router";
import { Logo } from "@/shared/ui/logo";
import { FloatingWidgets } from "@/shared/ui/floating-widgets";
import { cn } from "@/shared/utils/utils";
import { Bell, Search, Menu, X, Lock, MessageSquare, LogOut, ArrowRight, Paintbrush, AlertCircle, Info, Calendar } from "lucide-react";
import { useState, useEffect, type ReactNode, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/app/providers/auth-context";
import { getRoleAvatar as getCuratedRoleAvatar } from "@/shared/utils/avatars";
import { useAssessmentStatus } from "@/shared/constants/assessment-status";
import { toast } from "sonner";
import { useTheme } from "@/app/providers/theme-provider";
import { useNotifications, useMarkAsRead } from "@/features/notifications/queries/useNotifications";
import { GlassCard } from "@/shared/ui/glass-card";

// Sidebar sections a new student can still reach before finishing the self-assessment.
const STUDENT_UNLOCKED_LABELS = ["Dashboard", "Assessments", "Mentor", "Profile"];

export interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface DashboardShellProps {
  role: string;
  roleLabel: string;
  userName: string;
  items: NavItem[];
  children: ReactNode;
}

export function DashboardShell({ role, roleLabel, userName, items, children }: DashboardShellProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  
  // Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, router]);

  const [activeLabel, setActiveLabel] = useState(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const match = items.find(item => currentPath === item.to || currentPath.startsWith(item.to + "/"));
      if (match) return match.label;
    }
    return items[0]?.label;
  });
  const { theme, setTheme } = useTheme();
  const { done: assessmentDone } = useAssessmentStatus();
  const gateNav = role === "student" && !assessmentDone;

  // Notifications API Integration
  const recipientId = user?.id || 'student-123';
  const { data: notificationsData, isLoading: notifsLoading } = useNotifications(recipientId);
  const markAsReadMutation = useMarkAsRead();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "academic" | "system" | "social">("all");
  const [selectedNotif, setSelectedNotif] = useState<any | null>(null);

  const notifications = useMemo(() => {
    if (!notificationsData || notificationsData.length === 0) {
      return [
        { id: "n-1", title: "New Assignment Released", content: "Chapter 5 Polynomials assignment is now active under your dashboard tasks list.", category: "academic" as const, priority: "high" as const, isRead: false, createdAt: "2 hours ago" },
        { id: "n-2", title: "System Maintenance Scheduled", content: "Server upgrades scheduled for Sunday, July 26th between 02:00 AM and 04:00 AM.", category: "system" as const, priority: "low" as const, isRead: false, createdAt: "1 day ago" },
        { id: "n-3", title: "PTM Invites Dispatched", content: "Live video consulting invites sent to parent credentials.", category: "social" as const, priority: "medium" as const, isRead: true, createdAt: "2 days ago" }
      ];
    }
    return notificationsData;
  }, [notificationsData]);

  const unreadCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => selectedCategory === "all" || n.category === selectedCategory);
  }, [notifications, selectedCategory]);

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate([id]);
  };

  const handleMarkAllRead = () => {
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id);
    if (unreadIds.length > 0) {
      markAsReadMutation.mutate(unreadIds);
      toast.success("All notifications marked as read!");
    }
  };

  const handleNotificationClick = (notif: any) => {
    setSelectedNotif(notif);
    if (!notif.isRead) {
      handleMarkAsRead(notif.id);
    }
  };

  const getBgImage = () => {
    switch (theme) {
      case "corporate": return 'url("/assets/images/bg-corporate.png")';
      case "glassmorphic": return 'url("/assets/images/bg-glassmorphic.png")';
      case "vibrant": return 'url("/assets/images/bg-vibrant.png")';
      default: return 'none';
    }
  };

  const getRoleAvatar = () => getCuratedRoleAvatar(role);

  const handleLockedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Complete your self-assessment first", {
      description: "Finish the Vedhkrit self-assessment to unlock this section.",
    });
  };

  return (
    <div className="dashboard-root min-h-screen relative overflow-hidden bg-slate-50/40 text-left font-semibold">
      {/* Dynamic Background Theme */}
      {theme !== 'default' && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed mix-blend-multiply opacity-25"
          style={{ backgroundImage: getBgImage() }}
        />
      )}
      
      <div className="flex relative z-10">
        {/* Sidebar - desktop */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-100 bg-white px-4 py-5 lg:flex">
          <div className="px-2">
            <Logo size="md" />
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1.5 pl-0.5">{roleLabel} Profile</div>
          </div>
          
          <nav className="flex-1 mt-6 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const active = activeLabel === item.label;
              const locked = gateNav && !STUDENT_UNLOCKED_LABELS.includes(item.label);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  preload="intent"
                  onClick={(e) => (locked ? handleLockedClick(e) : setActiveLabel(item.label))}
                  aria-disabled={locked}
                  className={cn(
                    "group flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-all cursor-pointer",
                    locked
                      ? "text-slate-350 hover:bg-slate-50"
                      : active
                        ? role === "student"
                          ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                          : "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                        : "text-slate-500 hover:bg-slate-50 hover:text-text-heading",
                  )}
                >
                  <item.icon className="h-4.5 w-4.5 shrink-0" />
                  <span className="truncate flex-1">{item.label}</span>
                  {locked && <Lock className="h-3 w-3 shrink-0 text-slate-300" />}
                </Link>
              );
            })}
          </nav>

          {/* App download promotion card (from design reference) */}
          {(role === "student" || role === "parent") && (
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-brand-teal/5 border border-brand-blue/10 text-left mb-4">
              <div className="font-bold text-[11px] text-text-heading">Stay Connected</div>
              <p className="text-[9.5px] text-text-muted mt-1 leading-normal">Track developmental indices and sessions on the go.</p>
              <button className="mt-3 w-full rounded-xl bg-brand-blue hover:bg-blue-800 text-white font-bold py-2 text-[9px] flex items-center justify-center gap-1 transition-colors cursor-pointer">
                Download App
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          )}

          <div className="mt-auto border-t border-slate-100 pt-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img src={getRoleAvatar()} alt="" className="h-8.5 w-8.5 shrink-0 rounded-full object-cover bg-slate-150 border border-slate-100" />
              <div className="min-w-0">
                <div className="truncate text-xs font-bold text-text-heading leading-tight">{userName}</div>
                <div className="text-[10px] text-text-muted truncate leading-normal font-bold">{roleLabel}</div>
              </div>
            </div>
            <button onClick={() => { logout(); router.navigate({ to: "/login" }); }} className="text-slate-400 hover:text-destructive transition-colors cursor-pointer" title="Sign out">
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setOpen(false)}
            >
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25 }}
                className="h-full w-64 bg-white p-4 flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <Logo size="md" />
                    <button onClick={() => setOpen(false)} className="cursor-pointer"><X className="h-5 w-5 text-slate-500" /></button>
                  </div>
                  <nav className="space-y-1">
                    {items.map((item) => {
                      const active = activeLabel === item.label;
                      const locked = gateNav && !STUDENT_UNLOCKED_LABELS.includes(item.label);
                      return (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={(e) => {
                            if (locked) return handleLockedClick(e);
                            setActiveLabel(item.label);
                            setOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold cursor-pointer",
                            locked
                              ? "text-slate-350"
                              : active
                                ? role === "student"
                                  ? "bg-brand-orange text-white"
                                  : "bg-brand-blue text-white"
                                : "text-slate-600 hover:bg-slate-50",
                          )}
                        >
                          <item.icon className="h-4.5 w-4.5" />
                          <span className="flex-1">{item.label}</span>
                          {locked && <Lock className="h-3 w-3 shrink-0 text-slate-300" />}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={getRoleAvatar()} alt="" className="h-8 w-8 rounded-full object-cover bg-slate-100 border border-slate-100" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-text-heading">{userName}</div>
                      <div className="text-[10px] text-text-muted">{roleLabel}</div>
                    </div>
                  </div>
                  <button onClick={() => { logout(); router.navigate({ to: "/login" }); }} className="text-slate-400 hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md">
            <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
              <div className="flex items-center gap-3 flex-1">
                <button className="lg:hidden cursor-pointer" onClick={() => setOpen(true)}><Menu className="h-5 w-5 text-slate-600" /></button>
                <div className="hidden items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 px-3.5 py-2 w-full max-w-sm sm:flex">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input placeholder="Search anything..." className="flex-grow bg-transparent text-xs text-text-body placeholder-slate-400 outline-none" />
                  <span className="rounded bg-slate-200/60 px-1.5 py-0.5 text-[8.5px] font-bold text-slate-500 font-mono">⌘K</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Veda AI Mentor Button */}
                {role === "student" || role === "parent" ? (
                  <Link
                    to={role === "student" ? "/dashboard/student/ai" : "/dashboard/parent/ai"}
                    className="rounded-xl border border-brand-teal/25 bg-teal-50/40 px-3 py-1.5 text-[10.5px] font-bold text-brand-teal flex items-center gap-1.5 hover:bg-teal-50 hover:shadow-xs transition-all cursor-pointer"
                  >
                    <img src="/assets/brand/veda-logo.png" alt="Veda" className="h-4 w-4 object-contain rounded-full" />
                    <span>Ask Veda</span>
                  </Link>
                ) : (
                  <button className="rounded-xl border border-brand-teal/25 bg-teal-50/40 px-3 py-1.5 text-[10.5px] font-bold text-brand-teal flex items-center gap-1.5 hover:bg-teal-50 hover:shadow-xs transition-all cursor-pointer">
                    <img src="/assets/brand/veda-logo.png" alt="Veda" className="h-4 w-4 object-contain rounded-full" />
                    <span>Ask Veda</span>
                  </button>
                )}

                {/* Theme Switcher */}
                <div className="relative group">
                  <button className="relative rounded-xl border border-slate-100 bg-white p-2 hover:bg-slate-50 transition-colors cursor-pointer">
                    <Paintbrush className="h-4.5 w-4.5 text-slate-500" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 hidden w-36 rounded-xl border border-slate-100 bg-white p-1 shadow-lg group-hover:block z-50">
                    <button onClick={() => setTheme('default')} className={cn("block w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50 cursor-pointer font-semibold", theme === 'default' && "bg-slate-50 font-bold text-teal-700")}>Default Solid</button>
                    <button onClick={() => setTheme('corporate')} className={cn("block w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50 cursor-pointer font-semibold", theme === 'corporate' && "bg-slate-50 font-bold text-teal-700")}>Corporate Light</button>
                    <button onClick={() => setTheme('glassmorphic')} className={cn("block w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50 cursor-pointer font-semibold", theme === 'glassmorphic' && "bg-slate-50 font-bold text-teal-700")}>Glassmorphic</button>
                    <button onClick={() => setTheme('vibrant')} className={cn("block w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50 cursor-pointer font-semibold", theme === 'vibrant' && "bg-slate-50 font-bold text-teal-700")}>Vibrant Abstract</button>
                  </div>
                </div>

                <button className="relative rounded-xl border border-slate-100 bg-white p-2 hover:bg-slate-50 transition-colors cursor-pointer">
                  <MessageSquare className="h-4.5 w-4.5 text-slate-500" />
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-orange animate-ping" />
                </button>

                <button 
                  onClick={() => setDrawerOpen(true)}
                  className="relative rounded-xl border border-slate-100 bg-white p-2 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Bell className="h-4.5 w-4.5 text-slate-500" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 h-4 w-4 bg-brand-orange text-white text-[8px] font-black rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                <div className="hidden items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-1.5 sm:flex">
                  <img src={getRoleAvatar()} alt="" className="h-7.5 w-7.5 rounded-full object-cover bg-slate-100 border border-slate-150" />
                  <div className="text-xs text-left">
                    <div className="font-bold text-text-heading leading-tight">{userName.split(' ').slice(0, 2).join(' ')}</div>
                    <div className="text-[10px] text-text-muted font-bold leading-tight mt-0.5">{roleLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 relative z-10">{children}</main>
        </div>
      </div>

      {/* Slide-over Notification Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-black/35 backdrop-blur-xs cursor-pointer"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-full max-w-sm h-full bg-white border-l border-slate-100 shadow-2xl p-6 flex flex-col justify-between"
            >
              <div className="flex-grow flex flex-col min-h-0">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
                  <h3 className="text-base font-bold text-text-heading flex items-center gap-2">
                    <Bell className="h-5 w-5 text-brand-orange" /> Notifications Center
                  </h3>
                  <button 
                    onClick={() => setDrawerOpen(false)}
                    className="p-1 text-slate-400 hover:text-text-heading rounded-lg hover:bg-slate-55 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Filters */}
                <div className="flex rounded-xl border border-slate-100 p-0.5 text-[9.5px] font-bold bg-slate-50 mb-4">
                  {(["all", "academic", "system", "social"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "flex-1 py-1.5 rounded-lg transition-all capitalize cursor-pointer",
                        selectedCategory === cat
                          ? "bg-brand-blue text-white shadow-xs"
                          : "text-text-muted hover:text-text-heading"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Mark all as read */}
                {unreadCount > 0 && (
                  <div className="flex justify-end mb-3">
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-[10px] text-brand-blue hover:underline font-bold cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>
                )}

                {/* Notifications Queue */}
                <div className="flex-grow overflow-y-auto space-y-3 pr-1">
                  {notifsLoading ? (
                    [1, 2, 3].map(n => (
                      <div key={n} className="p-3 bg-slate-50/50 rounded-xl h-16 animate-pulse" />
                    ))
                  ) : filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        className={cn(
                          "w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3",
                          notif.isRead 
                            ? "border-slate-100 bg-white opacity-85 hover:border-slate-200" 
                            : "border-brand-orange/15 bg-orange-50/20 hover:border-brand-orange/30"
                        )}
                      >
                        <span className={cn(
                          "h-2 w-2 rounded-full shrink-0 mt-1.5",
                          notif.priority === "high" ? "bg-red-500" : notif.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
                        )} />
                        <div className="min-w-0 flex-grow">
                          <div className="flex justify-between items-start mb-0.5">
                            <h4 className="font-bold text-xs text-text-heading truncate pr-2">{notif.title}</h4>
                            <span className="text-[8.5px] font-bold text-slate-400 shrink-0">{notif.createdAt}</span>
                          </div>
                          <p className="text-[10px] text-text-muted mt-1 leading-normal font-medium truncate-2-lines">{notif.content}</p>
                          <span className="inline-block text-[8px] font-bold text-brand-blue bg-blue-50 px-1.5 py-0.5 rounded mt-1.5 capitalize">
                            {notif.category}
                          </span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-12 text-center text-xs font-bold text-text-muted space-y-1">
                      <Info className="h-6 w-6 mx-auto text-slate-350" />
                      <p>All caught up!</p>
                      <p className="text-[10px] font-medium">No new notifications in this filter.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Announcements Box */}
              <div className="border-t border-slate-100/60 pt-4 mt-4 bg-slate-50/50 rounded-2xl p-4 border text-xs text-text-body space-y-2">
                <h4 className="font-bold text-text-heading flex items-center gap-1.5 uppercase tracking-wider text-[9.5px] text-slate-400">
                  <Calendar className="h-3.5 w-3.5" /> Latest Announcements
                </h4>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  <div className="text-[10.5px]">
                    <div className="font-bold text-text-heading">Independence Day Celebrations</div>
                    <p className="text-[9.5px] text-text-muted mt-0.5 font-medium leading-normal">Flags will be hoisted at 08:30 AM on Tuesday. Dress code is traditional.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notification Detail view Modal */}
      <AnimatePresence>
        {selectedNotif && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotif(null)}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl p-6 shadow-xl space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "h-2.5 w-2.5 rounded-full shrink-0",
                    selectedNotif.priority === "high" ? "bg-red-500" : selectedNotif.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
                  )} />
                  <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider">
                    {selectedNotif.category} Notification
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedNotif(null)}
                  className="text-slate-400 hover:text-text-heading rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-base font-extrabold text-text-heading leading-tight">
                  {selectedNotif.title}
                </h3>
                <p className="text-[10px] text-text-muted font-bold">Received {selectedNotif.createdAt}</p>
              </div>

              <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-xs text-text-body font-medium leading-relaxed">
                {selectedNotif.content}
              </div>

              <div className="flex justify-end gap-2 pt-2 text-xs font-bold">
                <button
                  onClick={() => setSelectedNotif(null)}
                  className="px-4 py-2 border border-slate-150 hover:bg-slate-50 text-text-heading rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Veda AI mentor — available across student & parent dashboards */}
      {(role === "student" || role === "parent") && <FloatingWidgets />}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-wrap items-end justify-between gap-3"
    >
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </motion.div>
  );
}
