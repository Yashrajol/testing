import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/home";

export const Route = createFileRoute("/_marketing/")({
  component: HomePage,
  head: () => ({ meta: [{ title: "VEDHKRIT — Discover Potential. Develop Skills. Design Your Future." }] }),
});
