import { createFileRoute } from "@tanstack/react-router";
import MentorsPage from "@/pages/mentors";

export const Route = createFileRoute("/_marketing/mentors")({
  component: MentorsPage,
  head: () => ({ meta: [{ title: "Become a Mentor — Vedhkrit" }] }),
});
