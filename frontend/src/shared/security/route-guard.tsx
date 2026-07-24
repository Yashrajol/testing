import React, { ReactNode } from "react";
import { useAuth } from "@/app/providers/auth-context";
import { ForbiddenScreen } from "@/shared/ui/forbidden-screen";

interface RouteGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export function RouteGuard({ allowedRoles, children }: RouteGuardProps) {
  const { user } = useAuth();

  // Active user session or fallback demo user for seamless portal access
  const activeUser = user || {
    id: "demo-user-id",
    name: "Demo User",
    email: "demo@vedhkrit.com",
    role: allowedRoles[0] || "student",
  };

  const userRole = (activeUser.role || "").toLowerCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());

  // Allow access for matching roles, super admin, or unauthenticated demo sessions
  if (userRole === "super" || userRole === "superadmin" || normalizedAllowed.includes(userRole) || !user) {
    return <>{children}</>;
  }

  return (
    <ForbiddenScreen
      message={`Access Denied. Your account role (${activeUser.role}) is not authorized to access this portal.`}
    />
  );
}
