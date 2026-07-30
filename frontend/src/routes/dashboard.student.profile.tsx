import { createFileRoute } from "@tanstack/react-router";
import ProfileManagementPage from "@/pages/student/profile";

export const Route = createFileRoute("/dashboard/student/profile")({
  component: ProfileManagementPage,
  head: () => ({ meta: [{ title: "Student Profile — Vedhkrit" }] }),
});
