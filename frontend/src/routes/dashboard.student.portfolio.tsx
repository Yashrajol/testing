import { createFileRoute } from "@tanstack/react-router";
import StudyMaterialPage from "@/pages/student/portfolio";

export const Route = createFileRoute("/dashboard/student/portfolio")({
  component: StudyMaterialPage,
  head: () => ({ meta: [{ title: "Study Material — Vedhkrit" }] }),
});
