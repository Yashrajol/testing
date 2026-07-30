import { createFileRoute } from "@tanstack/react-router";
import LiveClassesPage from "@/pages/student/sessions";

export const Route = createFileRoute("/dashboard/student/sessions")({
  component: LiveClassesPage,
  head: () => ({ meta: [{ title: "Live Classes — Vedhkrit" }] }),
});
