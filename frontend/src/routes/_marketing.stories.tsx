import { createFileRoute } from "@tanstack/react-router";
import StoriesPage from "@/pages/stories";

export const Route = createFileRoute("/_marketing/stories")({
  component: StoriesPage,
  head: () => ({ meta: [{ title: "Stories & Resources — Vedhkrit" }] }),
});
