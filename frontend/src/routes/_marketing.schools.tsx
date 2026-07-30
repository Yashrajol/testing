import { createFileRoute } from "@tanstack/react-router";
import SchoolsPage from "@/pages/schools";

export const Route = createFileRoute("/_marketing/schools")({
  component: SchoolsPage,
  head: () => ({ meta: [{ title: "For Schools & Institutions — Vedhkrit" }] }),
});
