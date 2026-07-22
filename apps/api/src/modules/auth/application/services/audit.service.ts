import { Injectable, Inject } from '@nestjs/common';
import { AuditAction } from '@vedhkrit/database';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';

@Injectable()
export class AuditService {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
  ) {}

  async logAuthEvent(
    action: AuditAction,
    actorId?: string,
    entity: string = 'User',
    entityId?: string,
    ip?: string,
    userAgent?: string,
    before?: Record<string, any>,
    after?: Record<string, any>,
  ): Promise<void> {
    try {
      await this.authRepository.saveAuditLog({
        action,
        actorId,
        entity,
        entityId,
        ip,
        userAgent,
        before,
        after,
      });
    } catch (error) {
      console.error('Failed to log audit event:', error);
    }
  }
}
