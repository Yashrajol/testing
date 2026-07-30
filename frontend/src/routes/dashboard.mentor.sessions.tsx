import { createFileRoute } from "@tanstack/react-router";
import MentorSessionsPage from "@/pages/mentor/sessions";

export const Route = createFileRoute("/dashboard/mentor/sessions")({
  component: MentorSessionsPage,
  head: () => ({ meta: [{ title: "Advisory Sessions — Mentor Portal" }] }),
});
