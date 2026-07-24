import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/pages/contact";

export const Route = createFileRoute("/_marketing/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact Us & Support — Vedhkrit" }] }),
});
