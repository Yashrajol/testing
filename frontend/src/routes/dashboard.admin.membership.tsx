import { createFileRoute } from "@tanstack/react-router";
import SchoolMembershipPage from "@/pages/admin/membership";

export const Route = createFileRoute("/dashboard/admin/membership")({
  component: SchoolMembershipPage,
  head: () => ({ meta: [{ title: "Membership & Billing — School Admin" }] }),
});
