import { createFileRoute } from "@tanstack/react-router";
import { VedaAssistant } from "@/components/veda-assistant";

export const Route = createFileRoute("/dashboard/parent/ai")({
  component: () => <VedaAssistant role="parent" />,
  head: () => ({ meta: [{ title: "Veda — AI Mentor — Vedhkrit" }] }),
});
