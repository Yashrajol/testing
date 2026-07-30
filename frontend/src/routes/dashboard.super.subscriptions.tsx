import { createFileRoute } from "@tanstack/react-router";
import SuperSubscriptionsPage from "@/pages/super/subscriptions";

export const Route = createFileRoute("/dashboard/super/subscriptions")({
  component: SuperSubscriptionsPage,
  head: () => ({ meta: [{ title: "Subscriptions Controls — Super Admin" }] }),
});
