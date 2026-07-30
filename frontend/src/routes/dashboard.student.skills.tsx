import { createFileRoute } from "@tanstack/react-router";
import UnifiedGrowthPage from "@/pages/student/skills";

export const Route = createFileRoute("/dashboard/student/skills")({
  component: UnifiedGrowthPage,
  head: () => ({ meta: [{ title: "My Growth — Vedhkrit" }] }),
});
