import { createFileRoute } from "@tanstack/react-router";
import VerifyOtpPage from "@/pages/verify-otp";
import { z } from "zod";

const searchSchema = z.object({
  email: z.string().optional().default(""),
  devOtp: z.string().optional().default(""),
});

export const Route = createFileRoute("/verify-otp")({
  component: RouteComponent,
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Verify Your Account — Vedhkrit" }] }),
});

function RouteComponent() {
  const { email, devOtp } = Route.useSearch();
  return <VerifyOtpPage initialEmail={email} devOtp={devOtp} />;
}
