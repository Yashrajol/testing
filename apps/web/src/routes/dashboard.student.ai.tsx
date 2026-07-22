import { createFileRoute } from "@tanstack/react-router";
import { VedaAssistant } from "@/features/ai/components/veda-assistant";

export const Route = createFileRoute("/dashboard/student/ai")({
  component: () => <VedaAssistant role="student" />,
  head: () => ({ meta: [{ title: "Veda — AI Mentor — Vedhkrit" }] }),
});
