import { createFileRoute } from "@tanstack/react-router";
import CareerPage from "@/pages/career";

export const Route = createFileRoute("/_marketing/career")({
  component: CareerPage,
  head: () => ({ meta: [{ title: "Career Pathways & Blueprint — Vedhkrit" }] }),
});
