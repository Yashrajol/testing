import { createFileRoute } from "@tanstack/react-router";
import AdminProfilePage from "@/pages/admin/profile";

export const Route = createFileRoute("/dashboard/admin/profile")({
  component: AdminProfilePage,
  head: () => ({ meta: [{ title: "School Profile — School Admin" }] }),
});
