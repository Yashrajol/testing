import { createFileRoute } from "@tanstack/react-router";
import PricingPage from "@/pages/pricing";

export const Route = createFileRoute("/_marketing/pricing")({
  component: PricingPage,
  head: () => ({ meta: [{ title: "Subscription Plans for Classes 8–10 — Vedhkrit" }] }),
});
