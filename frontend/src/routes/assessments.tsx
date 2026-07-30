import { createFileRoute } from "@tanstack/react-router";
import AssessmentsOverviewPage from "@/pages/assessments-overview";

export const Route = createFileRoute("/assessments")({
  component: AssessmentsOverviewPage,
  head: () => ({ meta: [{ title: "Assessment Module — Vedhkrit" }] }),
});
