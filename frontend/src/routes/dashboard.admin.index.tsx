import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "@/pages/admin-dashboard";

export const Route = createFileRoute("/dashboard/admin/")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Admin Portal — Vedhkrit" }] }),
});
