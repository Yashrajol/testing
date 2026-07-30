import { createFileRoute } from "@tanstack/react-router";
import AdminTeachersPage from "@/pages/admin/teachers";

export const Route = createFileRoute("/dashboard/admin/teachers")({
  component: AdminTeachersPage,
  head: () => ({ meta: [{ title: "Teachers Directory — School Admin" }] }),
});
