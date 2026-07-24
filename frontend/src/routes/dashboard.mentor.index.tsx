import { createFileRoute } from "@tanstack/react-router";
import MentorDashboard from "@/pages/mentor-dashboard";

export const Route = createFileRoute("/dashboard/mentor/")({
  component: MentorDashboard,
  head: () => ({ meta: [{ title: "Mentor Lounge — Vedhkrit" }] }),
});
