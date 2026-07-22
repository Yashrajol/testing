import { Injectable, Inject } from '@nestjs/common';
import { AuditAction } from '@vedhkrit/database';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { RevokeRoleCommand } from '../commands/revoke-role.command';
import { AuditService } from '../services/audit.service';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@Injectable()
export class RevokeRoleHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly auditService: AuditService,
  ) {}

  async execute(command: RevokeRoleCommand): Promise<void> {
    const user = await this.authRepository.findById(command.userId);
    if (!user) {
      throw new UserNotFoundException(command.userId);
    }

    await this.authRepository.revokeRole(command.userId, command.roleName);

    await this.auditService.logAuthEvent(
      AuditAction.DELETE_RECORD,
      command.revokedBy,
      'UserRole',
      command.userId,
      undefined,
      undefined,
      { revokedRole: command.roleName },
    );
  }
}
