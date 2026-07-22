import { Module, Global } from '@nestjs/common';
import { AuditService } from './auditing.service';
import { AuditInterceptor } from './auditing.interceptor';

@Global()
@Module({
  providers: [AuditService, AuditInterceptor],
  exports: [AuditService, AuditInterceptor],
})
export class AuditingModule {}
