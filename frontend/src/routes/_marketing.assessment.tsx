import { createFileRoute } from "@tanstack/react-router";
import AssessmentPage from "@/pages/assessment";

export const Route = createFileRoute("/_marketing/assessment")({
  component: AssessmentPage,
  head: () => ({ meta: [{ title: "AI Discovery & Aptitude Assessment — Vedhkrit" }] }),
});
