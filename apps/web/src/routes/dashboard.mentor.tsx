import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { LayoutDashboard, Users, Calendar, AlertTriangle, ClipboardList, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/mentor")({
  component: MentorDashboardLayout,
  head: () => ({ meta: [{ title: "Mentor Portal — Vedhkrit" }] }),
});

const items = [
  { to: "/dashboard/mentor", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/mentor/students", label: "Assigned Students", icon: Users },
  { to: "/dashboard/mentor/sessions", label: "Sessions", icon: Calendar },
  { to: "/dashboard/mentor/plans", label: "Action Plans", icon: ClipboardList },
  { to: "/dashboard/mentor/progress", label: "Progress", icon: TrendingUp },
  { to: "/dashboard/mentor/alerts", label: "Risk Alerts", icon: AlertTriangle },
];

function MentorDashboardLayout() {
  return (
    <DashboardShell role="mentor" roleLabel="Mentor" userName="Priya Iyer" items={items}>
      <Outlet />
    </DashboardShell>
  );
}
