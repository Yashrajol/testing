import { sendError } from '../utils/response.js';

// Simple sliding-window memory store for rate limiting
const ipRateLimits = new Map();

/**
 * Sliding Window Rate Limiter Middleware for Auth Routes
 * Limits to max 15 requests per 15 minutes per IP address
 */
export function rateLimiter(maxRequests = 15, windowMs = 15 * 60 * 1000) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    if (!ipRateLimits.has(ip)) {
      ipRateLimits.set(ip, []);
    }

    const timestamps = ipRateLimits.get(ip);
    // Filter out timestamps older than windowMs
    const validTimestamps = timestamps.filter((time) => now - time < windowMs);

    if (validTimestamps.length >= maxRequests) {
      return sendError(
        res,
        'Too many authentication requests from this IP. Please try again after 15 minutes.',
        429,
        'RATE_LIMIT_EXCEEDED'
      );
    }

    validTimestamps.push(now);
    ipRateLimits.set(ip, validTimestamps);
    next();
  };
}

/**
 * Security Headers Middleware (Helmet-like protection)
 */
export function securityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Download-Options', 'noopen');
  next();
}
