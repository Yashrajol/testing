import { Injectable, Inject } from '@nestjs/common';
import { AuditAction } from '@vedhkrit/database';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { RegisterUserCommand } from '../commands/register-user.command';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { PasswordService } from '../services/password.service';
import { AuditService } from '../services/audit.service';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { InvalidCredentialsException } from '../../domain/exceptions/invalid-credentials.exception';

@Injectable()
export class RegisterUserHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly passwordService: PasswordService,
    private readonly auditService: AuditService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<{ user: UserResponseDto; event: UserCreatedEvent }> {
    const existing = await this.authRepository.findByEmail(command.email);
    if (existing) {
      throw new InvalidCredentialsException('A user with this email address already exists.');
    }

    const passwordHash = await this.passwordService.hashPassword(command.password);

    const userEntity = await this.authRepository.createUser({
      email: command.email,
      phoneNumber: command.phoneNumber,
      name: command.name,
      passwordHash,
      role: command.role,
      organizationId: command.organizationId,
      schoolId: command.schoolId,
    });

    await this.auditService.logAuthEvent(
      AuditAction.REGISTER,
      userEntity.id,
      'User',
      userEntity.id,
      undefined,
      undefined,
      undefined,
      { email: userEntity.email, role: userEntity.role },
    );

    const event = new UserCreatedEvent(userEntity.id, userEntity.email, userEntity.name, userEntity.role);

    return {
      user: UserMapper.toResponseDto(userEntity),
      event,
    };
  }
}
