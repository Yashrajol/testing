import { createFileRoute } from "@tanstack/react-router";
import MentoringPage from "@/pages/mentoring";

export const Route = createFileRoute("/_marketing/mentoring")({
  component: MentoringPage,
  head: () => ({ meta: [{ title: "1:1 Mentoring & Mentor Network — Vedhkrit" }] }),
});
