import { Request, Response, NextFunction } from 'express';
import { logger } from './logger.service';
import { randomUUID } from 'crypto';

export const correlationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-correlation-id'] as string) || (req.headers['x-request-id'] as string) || randomUUID();
  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);
  next();
};

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const { method, originalUrl, ip } = req;
  const userAgent = req.get('user-agent') || '';

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    const { statusCode } = res;

    logger.log(`HTTP ${method} ${originalUrl} ${statusCode} - ${durationMs}ms`, 'RequestLogger', {
      method,
      url: originalUrl,
      statusCode,
      durationMs,
      ip,
      userAgent,
      correlationId: req.headers['x-correlation-id'],
      userId: (req as any).user?.id,
      organizationId: (req as any).user?.organizationId,
    });
  });

  next();
};
