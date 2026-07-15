import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { LayoutDashboard, TrendingUp, UserCheck, Calendar, MessageSquare, FileText, User, Sparkles, ClipboardCheck, Target } from "lucide-react";

export const Route = createFileRoute("/dashboard/parent")({
  component: ParentDashboardLayout,
  head: () => ({ meta: [{ title: "Parent Portal — Vedhkrit" }] }),
});

const items = [
  { to: "/dashboard/parent", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/parent/progress", label: "Child Progress", icon: TrendingUp },
  { to: "/dashboard/parent/assessments", label: "Assessments", icon: ClipboardCheck },
  { to: "/dashboard/parent/growth", label: "Growth & Skills", icon: Target },
  { to: "/dashboard/parent/ai", label: "Veda AI Mentor", icon: Sparkles },
  { to: "/dashboard/parent/mentor", label: "Mentor", icon: UserCheck },
  { to: "/dashboard/parent/attendance", label: "Attendance", icon: Calendar },
  { to: "/dashboard/parent/messages", label: "Messages", icon: MessageSquare },
  { to: "/dashboard/parent/reports", label: "Reports", icon: FileText },
  { to: "/dashboard/parent/profile", label: "Profile", icon: User },
];

function ParentDashboardLayout() {
  return (
    <DashboardShell role="parent" roleLabel="Parent Portal" userName="Mr. Rohan Sharma" items={items}>
      <Outlet />
    </DashboardShell>
  );
}
