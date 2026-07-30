import { createFileRoute } from "@tanstack/react-router";
import MentorPlansPage from "@/pages/mentor/plans";

export const Route = createFileRoute("/dashboard/mentor/plans")({
  component: MentorPlansPage,
  head: () => ({ meta: [{ title: "Action Plans — Mentor Portal" }] }),
});
