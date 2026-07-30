import { createFileRoute } from "@tanstack/react-router";
import ForgotPage from "@/pages/forgot";

export const Route = createFileRoute("/forgot")({
  component: ForgotPage,
  head: () => ({ meta: [{ title: "Forgot Password — Vedhkrit" }] }),
});
