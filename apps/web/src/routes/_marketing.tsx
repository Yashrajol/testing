import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/app/layouts/marketing-layout";

export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
});
