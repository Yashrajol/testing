import { createFileRoute } from "@tanstack/react-router";
import AdminReportsPage from "@/pages/admin/reports";

export const Route = createFileRoute("/dashboard/admin/reports")({
  component: AdminReportsPage,
  head: () => ({ meta: [{ title: "School Reports — School Admin" }] }),
});
