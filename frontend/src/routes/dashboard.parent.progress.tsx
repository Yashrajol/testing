import { createFileRoute } from "@tanstack/react-router";
import ChildProgressPage from "@/pages/parent/progress";

export const Route = createFileRoute("/dashboard/parent/progress")({
  component: ChildProgressPage,
  head: () => ({ meta: [{ title: "Child Progress — Parent Portal" }] }),
});
