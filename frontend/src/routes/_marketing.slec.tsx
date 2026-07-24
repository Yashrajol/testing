import { createFileRoute } from "@tanstack/react-router";
import SlecPage from "@/pages/slec";

export const Route = createFileRoute("/_marketing/slec")({
  component: SlecPage,
  head: () => ({ meta: [{ title: "Growth Studio & SLEC Labs — Vedhkrit" }] }),
});
