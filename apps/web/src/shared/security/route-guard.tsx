import React, { ReactNode } from "react";
import { useAuth } from "@/app/providers/auth-context";
import { UnauthorizedScreen } from "@/shared/ui/unauthorized-screen";
import { ForbiddenScreen } from "@/shared/ui/forbidden-screen";

interface RouteGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export function RouteGuard({ allowedRoles, children }: RouteGuardProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <UnauthorizedScreen message="Your session is unauthenticated or expired. Please sign in." />;
  }

  const userRole = (user.role || "").toLowerCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toLowerCase());

  // Super admin has universal access
  if (userRole === "super" || normalizedAllowed.includes(userRole)) {
    return <>{children}</>;
  }

  return (
    <ForbiddenScreen
      message={`Access Denied. Your account role (${user.role}) is not authorized to access this portal.`}
    />
  );
}
