import { createFileRoute } from "@tanstack/react-router";
import SuperOverviewPage from "@/pages/super/index";

export const Route = createFileRoute("/dashboard/super/")({
  component: SuperOverviewPage,
  head: () => ({ meta: [{ title: "Platform Control Center — Super Admin" }] }),
});
