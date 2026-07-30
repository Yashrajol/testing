import { createFileRoute } from "@tanstack/react-router";
import DemoPage from "@/pages/demo";

export const Route = createFileRoute("/_marketing/demo")({
  component: DemoPage,
  head: () => ({ meta: [{ title: "Book a Demo — Vedhkrit" }] }),
});
