import { createFileRoute } from "@tanstack/react-router";
import ParentMentorPage from "@/pages/parent/mentor";

export const Route = createFileRoute("/dashboard/parent/mentor")({
  component: ParentMentorPage,
  head: () => ({ meta: [{ title: "Mentor Portal — Parent Portal" }] }),
});
