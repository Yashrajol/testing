import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { LayoutDashboard, Building2, DollarSign, Users, CreditCard, Activity } from "lucide-react";

export const Route = createFileRoute("/dashboard/super")({
  component: SuperLayout,
  head: () => ({ meta: [{ title: "Super Admin — Vedhkrit" }] }),
});

const items = [
  { to: "/dashboard/super", label: "Platform Overview", icon: LayoutDashboard },
  { to: "/dashboard/super/revenue", label: "Revenue Dashboard", icon: DollarSign },
  { to: "/dashboard/super/schools", label: "School Directory", icon: Building2 },
  { to: "/dashboard/super/users", label: "User Accounts", icon: Users },
  { to: "/dashboard/super/subscriptions", label: "Membership Manager", icon: CreditCard },
  { to: "/dashboard/super/activity", label: "Activity Logs", icon: Activity },
];

function SuperLayout() {
  return (
    <DashboardShell role="super" roleLabel="Super Admin" userName="Vedhkrit Ops" items={items}>
      <Outlet />
    </DashboardShell>
  );
}
