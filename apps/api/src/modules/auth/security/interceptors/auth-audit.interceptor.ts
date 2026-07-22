import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditAction } from '@vedhkrit/database';
import { AuditService } from '../../application/services/audit.service';
import { RequestWithUser } from '../interfaces/request-with-user.interface';

@Injectable()
export class AuthAuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuthAuditInterceptor.name);

  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const startTime = Date.now();
    const method = request.method;
    const url = request.url;
    const user = request.user;
    const ip = request.ip || (request.headers['x-forwarded-for'] as string);
    const userAgent = request.headers['user-agent'];

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          this.logger.log(`[Audit] ${method} ${url} ${user ? `(User: ${user.id})` : '(Anonymous)'} completed in ${duration}ms`);

          if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            const action = method === 'DELETE' ? AuditAction.DELETE_RECORD : AuditAction.UPDATE_RECORD;
            this.auditService.logAuthEvent(
              action,
              user?.id,
              'Endpoint',
              url,
              ip,
              userAgent,
              undefined,
              { method, url, duration },
            ).catch((err) => this.logger.error('Audit log failed', err));
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.warn(`[Audit Failure] ${method} ${url} failed in ${duration}ms: ${error.message}`);
        },
      }),
    );
  }
}
