import { createFileRoute } from "@tanstack/react-router";
import SuperRevenuePage from "@/pages/super/revenue";

export const Route = createFileRoute("/dashboard/super/revenue")({
  component: SuperRevenuePage,
  head: () => ({ meta: [{ title: "Revenue Dashboard — Super Admin" }] }),
});
