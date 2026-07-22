import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/app/layouts/dashboard-shell";
import { useAuth } from "@/app/providers/auth-context";
import { RouteGuard } from "@/shared/security/route-guard";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  CheckSquare,
  FileText,
  Book,
  Sparkles,
  Target,
  Users,
  Award,
  User,
  CalendarDays,
  Compass,
  Puzzle
} from "lucide-react";

export const Route = createFileRoute("/dashboard/student")({
  component: StudentDashboardLayout,
  head: () => ({ meta: [{ title: "Student Portal — Vedhkrit" }] }),
});

const items = [
  { to: "/dashboard/student", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/student/assessments", label: "Assessments", icon: FileText },
  { to: "/dashboard/student/academics", label: "My Subjects", icon: BookOpen },
  { to: "/dashboard/student/sessions", label: "Live Classes", icon: Video },
  { to: "/dashboard/student/goals", label: "Homework", icon: CheckSquare },
  { to: "/dashboard/student/portfolio", label: "Study Material", icon: Book },
  { to: "/dashboard/student/planner", label: "Daily Planner", icon: CalendarDays },
  { to: "/dashboard/student/ai", label: "Veda AI Mentor", icon: Sparkles },
  { to: "/dashboard/student/skills", label: "My Growth", icon: Target },
  { to: "/dashboard/student/skillset", label: "Skills", icon: Puzzle },
  { to: "/dashboard/student/mentor", label: "Mentor", icon: Users },
  { to: "/dashboard/student/career", label: "Career Explorer", icon: Compass },
  { to: "/dashboard/student/reports", label: "Achievements", icon: Award },
  { to: "/dashboard/student/profile", label: "Profile", icon: User },
];

function StudentDashboardLayout() {
  const { user } = useAuth();
  return (
    <RouteGuard allowedRoles={["student", "admin", "super"]}>
      <DashboardShell role="student" roleLabel="Student" userName={user?.name || "Student"} items={items}>
        <Outlet />
      </DashboardShell>
    </RouteGuard>
  );
}
