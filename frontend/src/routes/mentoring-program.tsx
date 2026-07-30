import { createFileRoute } from "@tanstack/react-router";
import MentoringProgramPage from "@/pages/mentoring-program";

export const Route = createFileRoute("/mentoring-program")({
  component: MentoringProgramPage,
  head: () => ({ meta: [{ title: "Mentoring Module — Vedhkrit" }] }),
});
