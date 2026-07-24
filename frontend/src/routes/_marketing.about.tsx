import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/pages/about";

export const Route = createFileRoute("/_marketing/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "Why Vedhkrit — About Us" }] }),
});
