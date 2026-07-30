import { createFileRoute } from "@tanstack/react-router";
import SuperUsersPage from "@/pages/super/users";

export const Route = createFileRoute("/dashboard/super/users")({
  component: SuperUsersPage,
  head: () => ({ meta: [{ title: "Users Directory — Super Admin" }] }),
});
