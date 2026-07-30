import { createFileRoute } from "@tanstack/react-router";
import AcademicsPage from "@/pages/student/academics";

export const Route = createFileRoute("/dashboard/student/academics")({
  component: AcademicsPage,
  head: () => ({ meta: [{ title: "My Subjects — Vedhkrit" }] }),
});
