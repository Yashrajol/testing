import { createFileRoute } from "@tanstack/react-router";
import MentorStudentsPage from "@/pages/mentor/students";

export const Route = createFileRoute("/dashboard/mentor/students")({
  component: MentorStudentsPage,
  head: () => ({ meta: [{ title: "Assigned Students — Mentor Portal" }] }),
});
