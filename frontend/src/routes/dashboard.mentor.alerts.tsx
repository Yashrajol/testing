import { createFileRoute } from "@tanstack/react-router";
import MentorAlertsPage from "@/pages/mentor/alerts";

export const Route = createFileRoute("/dashboard/mentor/alerts")({
  component: MentorAlertsPage,
  head: () => ({ meta: [{ title: "Risk Alerts — Mentor Portal" }] }),
});
