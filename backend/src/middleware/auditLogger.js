/**
 * Request Audit Logger & Performance Tracker
 */
export function auditLogger(req, res, next) {
  const startTime = Date.now();
  const { method, originalUrl } = req;
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown Agent';

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    const statusCode = res.statusCode;
    const userId = req.user?.id || 'ANONYMOUS';

    console.log(
      `[AUDIT] ${new Date().toISOString()} | ${method} ${originalUrl} | Status: ${statusCode} | ${durationMs}ms | IP: ${ip} | User: ${userId}`
    );
  });

  next();
}
