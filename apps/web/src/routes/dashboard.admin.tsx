import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { LayoutDashboard, Users, GraduationCap, BarChart3, FileText, Building2, UserCog, CreditCard, Sliders } from "lucide-react";

export const Route = createFileRoute("/dashboard/admin")({
  component: AdminDashboardLayout,
  head: () => ({ meta: [{ title: "School Admin — Vedhkrit" }] }),
});

const items = [
  { to: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/admin/students", label: "Students", icon: Users },
  { to: "/dashboard/admin/teachers", label: "Teachers", icon: GraduationCap },
  { to: "/dashboard/admin/mentors", label: "Mentors", icon: UserCog },
  { to: "/dashboard/admin/reports", label: "Reports", icon: FileText },
  { to: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/admin/membership", label: "Membership & Billing", icon: CreditCard },
  { to: "/dashboard/admin/cms", label: "Basic CMS Panel", icon: Sliders },
  { to: "/dashboard/admin/profile", label: "School Profile", icon: Building2 },
];

function AdminDashboardLayout() {
  return (
    <DashboardShell role="admin" roleLabel="School Admin" userName="Dr. Meera Banerjee" items={items}>
      <Outlet />
    </DashboardShell>
  );
}
