import { createFileRoute } from "@tanstack/react-router";
import RegisterSchoolPage from "@/pages/register-school";

export const Route = createFileRoute("/register-school")({
  component: RegisterSchoolPage,
  head: () => ({ meta: [{ title: "Register Your School — Vedhkrit Partnership" }] }),
});
