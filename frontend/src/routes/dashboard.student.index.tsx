import { createFileRoute } from "@tanstack/react-router";
import StudentDashboard from "@/pages/student-dashboard";

export const Route = createFileRoute("/dashboard/student/")({
  component: StudentDashboard,
  head: () => ({ meta: [{ title: "Student Portal — Vedhkrit" }] }),
});
