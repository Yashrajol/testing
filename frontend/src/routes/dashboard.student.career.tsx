import { createFileRoute } from "@tanstack/react-router";
import CareerExplorerPage from "@/pages/student/career";

export const Route = createFileRoute("/dashboard/student/career")({
  component: CareerExplorerPage,
  head: () => ({ meta: [{ title: "Career Explorer — Vedhkrit" }] }),
});
