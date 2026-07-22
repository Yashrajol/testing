import { AuthDomainException } from './auth.exception';

export class UserNotFoundException extends AuthDomainException {
  constructor(identifier: string) {
    super(`User with identifier '${identifier}' was not found.`, 'USER_NOT_FOUND');
  }
}
