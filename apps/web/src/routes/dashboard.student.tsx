import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { LayoutDashboard, BookOpen, Compass, Sparkles, Calendar, Award, FileText, Bot, Target, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/student")({
  component: StudentDashboardLayout,
  head: () => ({ meta: [{ title: "Student Portal — Vedhkrit" }] }),
});

const items = [
  { to: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/student/academics", label: "Academics", icon: BookOpen },
  { to: "/dashboard/student/skills", label: "Skills", icon: Sparkles },
  { to: "/dashboard/student/career", label: "Career", icon: Compass },
  { to: "/dashboard/student/goals", label: "Goals", icon: Target },
  { to: "/dashboard/student/sessions", label: "Mentor Sessions", icon: Calendar },
  { to: "/dashboard/student/portfolio", label: "Portfolio", icon: Award },
  { to: "/dashboard/student/assessments", label: "Assessments", icon: FileText },
  { to: "/dashboard/student/ai", label: "AI Assistant", icon: Bot },
  { to: "/dashboard/student/reports", label: "Reports", icon: TrendingUp },
];

function StudentDashboardLayout() {
  return (
    <DashboardShell role="student" roleLabel="Student" userName="Aarav Sharma" items={items}>
      <Outlet />
    </DashboardShell>
  );
}
