import { createFileRoute } from "@tanstack/react-router";
import FrameworkPage from "@/pages/framework";

export const Route = createFileRoute("/_marketing/framework")({
  component: FrameworkPage,
  head: () => ({ meta: [{ title: "5-Stage ILDF Framework — Vedhkrit" }] }),
});
