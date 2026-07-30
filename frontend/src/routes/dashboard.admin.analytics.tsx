import { createFileRoute } from "@tanstack/react-router";
import AdminAnalyticsPage from "@/pages/admin/analytics";

export const Route = createFileRoute("/dashboard/admin/analytics")({
  component: AdminAnalyticsPage,
  head: () => ({ meta: [{ title: "School Analytics — School Admin" }] }),
});
