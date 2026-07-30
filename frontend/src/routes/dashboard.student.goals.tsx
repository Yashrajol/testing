import { createFileRoute } from "@tanstack/react-router";
import HomeworkManagementPage from "@/pages/student/goals";

export const Route = createFileRoute("/dashboard/student/goals")({
  component: HomeworkManagementPage,
  head: () => ({ meta: [{ title: "Homework Management — Vedhkrit" }] }),
});
