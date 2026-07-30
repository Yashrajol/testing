import { createFileRoute } from "@tanstack/react-router";
import BasicCmsPage from "@/pages/admin/cms";

export const Route = createFileRoute("/dashboard/admin/cms")({
  component: BasicCmsPage,
  head: () => ({ meta: [{ title: "Basic CMS — School Admin" }] }),
});
