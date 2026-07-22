import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './auditing.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, user } = request;

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle().pipe(
        tap((data) => {
          this.auditService.record({
            userId: user?.id,
            action: `${method} ${url}`,
            entity: context.getClass().name,
            entityId: data?.id,
            after: data,
            ip,
            organizationId: user?.organizationId,
            timestamp: new Date(),
          });
        }),
      );
    }

    return next.handle();
  }
}
