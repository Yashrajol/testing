import { createFileRoute } from "@tanstack/react-router";
import RegisterMentorPage from "@/pages/register-mentor";

export const Route = createFileRoute("/register-mentor")({
  component: RegisterMentorPage,
  head: () => ({ meta: [{ title: "Apply as Mentor — Vedhkrit" }] }),
});
