import { Injectable, Inject } from '@nestjs/common';
import { AuditAction } from '@vedhkrit/database';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { AssignRoleCommand } from '../commands/assign-role.command';
import { AuditService } from '../services/audit.service';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@Injectable()
export class AssignRoleHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly auditService: AuditService,
  ) {}

  async execute(command: AssignRoleCommand): Promise<void> {
    const user = await this.authRepository.findById(command.userId);
    if (!user) {
      throw new UserNotFoundException(command.userId);
    }

    await this.authRepository.assignRole(command.userId, command.roleName);

    await this.auditService.logAuthEvent(
      AuditAction.UPDATE_RECORD,
      command.assignedBy,
      'UserRole',
      command.userId,
      undefined,
      undefined,
      undefined,
      { assignedRole: command.roleName },
    );
  }
}
