import { createFileRoute } from "@tanstack/react-router";
import ParentMessagesPage from "@/pages/parent/messages";

export const Route = createFileRoute("/dashboard/parent/messages")({
  component: ParentMessagesPage,
  head: () => ({ meta: [{ title: "Messages — Parent Portal" }] }),
});
