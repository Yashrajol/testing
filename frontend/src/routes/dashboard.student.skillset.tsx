import { createFileRoute } from "@tanstack/react-router";
import SkillsPage from "@/pages/student/skillset";

export const Route = createFileRoute("/dashboard/student/skillset")({
  component: SkillsPage,
  head: () => ({ meta: [{ title: "Skills — Vedhkrit" }] }),
});
