import { createFileRoute } from "@tanstack/react-router";
import ParentReportsPage from "@/pages/parent/reports";

export const Route = createFileRoute("/dashboard/parent/reports")({
  component: ParentReportsPage,
  head: () => ({ meta: [{ title: "Report Card Center — Parent Portal" }] }),
});
