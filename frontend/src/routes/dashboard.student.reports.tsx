import { createFileRoute } from "@tanstack/react-router";
import AchievementsPage from "@/pages/student/reports";

export const Route = createFileRoute("/dashboard/student/reports")({
  component: AchievementsPage,
  head: () => ({ meta: [{ title: "Achievements — Vedhkrit" }] }),
});
