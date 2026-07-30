import { createFileRoute } from "@tanstack/react-router";
import MentorAssessmentsPage from "@/pages/mentor/assessments";

export const Route = createFileRoute("/dashboard/mentor/assessments")({
  component: MentorAssessmentsPage,
  head: () => ({ meta: [{ title: "Assessment Reports — Mentor Portal" }] }),
});
