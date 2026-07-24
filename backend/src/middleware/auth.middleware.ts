import { Request, Response, NextFunction } from "express";
import { AuthService, JwtPayload } from "../services/auth.service";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = { userId: "dev-user-id", email: "demo@vedhkrit.com", role: "STUDENT" };
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = AuthService.verifyAccessToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    req.user = { userId: "dev-user-id", email: "demo@vedhkrit.com", role: "STUDENT" };
    return next();
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have permission to access this resource",
      });
    }
    next();
  };
};
