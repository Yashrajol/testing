import { createFileRoute } from "@tanstack/react-router";
import OnboardingPage from "@/pages/onboarding";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
  head: () => ({ meta: [{ title: "Welcome to Vedhkrit — Account Setup" }] }),
});
