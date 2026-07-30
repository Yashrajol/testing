import { createFileRoute } from "@tanstack/react-router";
import AdminStudentsPage from "@/pages/admin/students";

export const Route = createFileRoute("/dashboard/admin/students")({
  component: AdminStudentsPage,
  head: () => ({ meta: [{ title: "Student Roster — School Admin" }] }),
});
