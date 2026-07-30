import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return sendError(res, 'Authentication token missing. Please log in.', 401, 'AUTH_005');
  }

  const secret = process.env.JWT_SECRET || 'vedhkrit_super_secret_jwt_key_2026';

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return sendError(res, 'Your session has expired. Please log in again.', 401, 'AUTH_005');
    }
    req.user = user;
    next();
  });
}

export function optionalAuthToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  const secret = process.env.JWT_SECRET || 'vedhkrit_super_secret_jwt_key_2026';
  jwt.verify(token, secret, (err, user) => {
    req.user = err ? null : user;
    next();
  });
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return sendError(res, 'Access Forbidden: Insufficient permissions.', 403, 'FORBIDDEN');
    }
    next();
  };
}
