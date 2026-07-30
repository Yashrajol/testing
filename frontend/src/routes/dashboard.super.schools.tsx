import { createFileRoute } from "@tanstack/react-router";
import SuperSchoolsPage from "@/pages/super/schools";

export const Route = createFileRoute("/dashboard/super/schools")({
  component: SuperSchoolsPage,
  head: () => ({ meta: [{ title: "Schools Directory — Super Admin" }] }),
});
