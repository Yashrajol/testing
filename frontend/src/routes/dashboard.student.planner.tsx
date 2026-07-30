import { createFileRoute } from "@tanstack/react-router";
import DailyPlannerPage from "@/pages/student/planner";

export const Route = createFileRoute("/dashboard/student/planner")({
  component: DailyPlannerPage,
  head: () => ({ meta: [{ title: "Daily Planner — Vedhkrit" }] }),
});
