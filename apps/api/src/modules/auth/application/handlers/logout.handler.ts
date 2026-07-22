import { Injectable, Inject } from '@nestjs/common';
import { AuditAction } from '@vedhkrit/database';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { LogoutCommand } from '../commands/logout.command';
import { TokenService } from '../services/token.service';
import { AuditService } from '../services/audit.service';

@Injectable()
export class LogoutHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly tokenService: TokenService,
    private readonly auditService: AuditService,
  ) {}

  async execute(command: LogoutCommand): Promise<void> {
    await this.authRepository.revokeSession(command.sessionId);

    if (command.refreshToken) {
      const hash = this.tokenService.hashRefreshToken(command.refreshToken);
      await this.authRepository.revokeRefreshToken(hash);
    }

    await this.auditService.logAuthEvent(
      AuditAction.LOGOUT,
      command.userId,
      'Session',
      command.sessionId,
    );
  }
}
