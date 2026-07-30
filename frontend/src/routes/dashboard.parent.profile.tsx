import { createFileRoute } from "@tanstack/react-router";
import ParentProfilePage from "@/pages/parent/profile";

export const Route = createFileRoute("/dashboard/parent/profile")({
  component: ParentProfilePage,
  head: () => ({ meta: [{ title: "Profile Settings — Parent Portal" }] }),
});
