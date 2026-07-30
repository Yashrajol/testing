import { createFileRoute } from "@tanstack/react-router";
import DashboardHubPage from "@/pages/dashboard-hub";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHubPage,
  head: () => ({ meta: [{ title: "Dashboard Hub — Vedhkrit" }] }),
});
