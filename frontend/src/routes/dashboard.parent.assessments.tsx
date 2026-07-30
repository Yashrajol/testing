import { createFileRoute } from "@tanstack/react-router";
import ParentAssessmentsPage from "@/pages/parent/assessments";

export const Route = createFileRoute("/dashboard/parent/assessments")({
  component: ParentAssessmentsPage,
  head: () => ({ meta: [{ title: "Vedhkrit Platform" }] }),
});
