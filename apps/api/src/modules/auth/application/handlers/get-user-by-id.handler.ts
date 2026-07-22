import { Injectable, Inject } from '@nestjs/common';
import { IAuthRepository } from '../../repositories/auth.repository.interface';
import { AUTH_REPOSITORY_TOKEN } from '../../constants/auth.constants';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@Injectable()
export class GetUserByIdHandler {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<UserResponseDto> {
    const user = await this.authRepository.findById(query.userId);
    if (!user) {
      throw new UserNotFoundException(query.userId);
    }
    return UserMapper.toResponseDto(user);
  }
}
