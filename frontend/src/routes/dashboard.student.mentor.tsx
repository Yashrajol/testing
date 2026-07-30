import { createFileRoute } from "@tanstack/react-router";
import StudentMentorPage from "@/pages/student/mentor";

export const Route = createFileRoute("/dashboard/student/mentor")({
  component: StudentMentorPage,
  head: () => ({ meta: [{ title: "My Mentor — Vedhkrit" }] }),
});
