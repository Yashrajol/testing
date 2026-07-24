import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/app/layouts/dashboard-shell";
import { useAuth } from "@/app/providers/auth-context";
import { RouteGuard } from "@/shared/security/route-guard";
import { LayoutDashboard, Users, Calendar, AlertTriangle, ClipboardList, TrendingUp, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/dashboard/mentor")({
  component: MentorDashboardLayout,
  head: () => ({ meta: [{ title: "Mentor Portal — Vedhkrit" }] }),
});

const items = [
  { to: "/dashboard/mentor", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/mentor/students", label: "Assigned Students", icon: Users },
  { to: "/dashboard/mentor/assessments", label: "Assessment Reports", icon: ClipboardCheck },
  { to: "/dashboard/mentor/sessions", label: "Sessions", icon: Calendar },
  { to: "/dashboard/mentor/plans", label: "Action Plans", icon: ClipboardList },
  { to: "/dashboard/mentor/progress", label: "Progress", icon: TrendingUp },
  { to: "/dashboard/mentor/alerts", label: "Risk Alerts", icon: AlertTriangle },
];

function MentorDashboardLayout() {
  const { user } = useAuth();
  return (
    <RouteGuard allowedRoles={["mentor", "admin", "super"]}>
      <DashboardShell role="mentor" roleLabel="Mentor" userName={user?.name || "Mentor"} items={items}>
        <Outlet />
      </DashboardShell>
    </RouteGuard>
  );
}
