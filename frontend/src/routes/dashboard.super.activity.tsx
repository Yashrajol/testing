import { createFileRoute } from "@tanstack/react-router";
import SuperActivityPage from "@/pages/super/activity";

export const Route = createFileRoute("/dashboard/super/activity")({
  component: SuperActivityPage,
  head: () => ({ meta: [{ title: "Platform Logs — Super Admin" }] }),
});
