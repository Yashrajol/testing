import { createFileRoute } from "@tanstack/react-router";
import MentorProgressPage from "@/pages/mentor/progress";

export const Route = createFileRoute("/dashboard/mentor/progress")({
  component: MentorProgressPage,
  head: () => ({ meta: [{ title: "Cohort Progress — Mentor Portal" }] }),
});
