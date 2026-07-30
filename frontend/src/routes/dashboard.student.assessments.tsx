import { createFileRoute } from "@tanstack/react-router";
import AssessmentsPage from "@/pages/student/assessments";

export const Route = createFileRoute("/dashboard/student/assessments")({
  component: AssessmentsPage,
  head: () => ({ meta: [{ title: "Assessments — Vedhkrit" }] }),
});
