import { createFileRoute } from "@tanstack/react-router";
import ParentsPage from "@/pages/parents";

export const Route = createFileRoute("/_marketing/parents")({
  component: ParentsPage,
  head: () => ({ meta: [{ title: "For Parents — Vedhkrit" }] }),
});
