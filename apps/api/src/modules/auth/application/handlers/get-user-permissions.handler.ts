import { Injectable, Inject } from '@nestjs/common';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { GetUserPermissionsQuery } from '../queries/get-user-permissions.query';
import { PermissionResponseDto } from '../dtos/user-response.dto';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@Injectable()
export class GetUserPermissionsHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(query: GetUserPermissionsQuery): Promise<PermissionResponseDto> {
    const user = await this.authRepository.findById(query.userId);
    if (!user) {
      throw new UserNotFoundException(query.userId);
    }

    return {
      userId: user.id,
      role: user.role,
      permissions: [`${user.role.toLowerCase()}:read`, `${user.role.toLowerCase()}:write`],
    };
  }
}
