import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = (req.headers['x-correlation-id'] as string) || (req.headers['x-request-id'] as string) || randomUUID();
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('X-Correlation-ID', correlationId);
    next();
  }
}

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const durationMs = Date.now() - startTime;
      const { statusCode } = res;

      this.logger.log(`HTTP ${method} ${originalUrl} ${statusCode} - ${durationMs}ms`, 'RequestLogger', {
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
  }
}
