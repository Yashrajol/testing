import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { LayoutDashboard, TrendingUp, MessageCircle, Calendar, FileText, BookOpen, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/parent")({
  component: ParentDashboardLayout,
  head: () => ({ meta: [{ title: "Parent Portal — Vedhkrit" }] }),
});

const items = [
  { to: "/dashboard/parent", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/parent/growth", label: "Growth Reports", icon: TrendingUp },
  { to: "/dashboard/parent/mentor-notes", label: "Mentor Notes", icon: BookOpen },
  { to: "/dashboard/parent/attendance", label: "Attendance", icon: Calendar },
  { to: "/dashboard/parent/recommendations", label: "Recommendations", icon: Sparkles },
  { to: "/dashboard/parent/communication", label: "Communication", icon: MessageCircle },
  { to: "/dashboard/parent/reports", label: "Reports", icon: FileText },
];

function ParentDashboardLayout() {
  return (
    <DashboardShell role="parent" roleLabel="Parent Portal" userName="Mr. Rohan Sharma" items={items}>
      <Outlet />
    </DashboardShell>
  );
}
