import { createFileRoute } from "@tanstack/react-router";
import ParentAttendancePage from "@/pages/parent/attendance";

export const Route = createFileRoute("/dashboard/parent/attendance")({
  component: ParentAttendancePage,
  head: () => ({ meta: [{ title: "Attendance Tracking — Parent Portal" }] }),
});
