import { createFileRoute } from "@tanstack/react-router";
import ParentGrowthPage from "@/pages/parent/growth";

export const Route = createFileRoute("/dashboard/parent/growth")({
  component: ParentGrowthPage,
  head: () => ({ meta: [{ title: "Vedhkrit Platform" }] }),
});
