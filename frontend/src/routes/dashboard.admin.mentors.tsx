import { createFileRoute } from "@tanstack/react-router";
import AdminMentorsPage from "@/pages/admin/mentors";

export const Route = createFileRoute("/dashboard/admin/mentors")({
  component: AdminMentorsPage,
  head: () => ({ meta: [{ title: "Mentors Directory — School Admin" }] }),
});
