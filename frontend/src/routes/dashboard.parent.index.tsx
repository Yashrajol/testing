import { createFileRoute } from "@tanstack/react-router";
import ParentDashboard from "@/pages/parent-dashboard";

export const Route = createFileRoute("/dashboard/parent/")({
  component: ParentDashboard,
  head: () => ({ meta: [{ title: "Parent Portal — Vedhkrit" }] }),
});
