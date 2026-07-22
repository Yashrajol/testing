import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { STRATEGY_LOCAL } from '../constants/security.constants';
import { PasswordService } from '../../application/services/password.service';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY_LOCAL) {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly passwordService: PasswordService,
  ) {
    super({
      usernameField: 'emailOrPhone',
      passwordField: 'password',
    });
  }

  async validate(emailOrPhone: string, password: string): Promise<UserEntity> {
    const isEmail = emailOrPhone.includes('@');
    const user = isEmail
      ? await this.authRepository.findByEmail(emailOrPhone)
      : await this.authRepository.findByPhone(emailOrPhone);

    if (!user) {
      throw new UnauthorizedException('Invalid authentication credentials.');
    }

    if (!user.isActive()) {
      throw new UnauthorizedException('User account is locked or suspended.');
    }

    const isValidPassword = await this.passwordService.comparePassword(password, user.passwordHash);

    if (!isValidPassword) {
      await this.authRepository.updateUser(user.id, {
        failedLoginAttempts: user.failedLoginAttempts + 1,
      });
      throw new UnauthorizedException('Invalid authentication credentials.');
    }

    return user;
  }
}
