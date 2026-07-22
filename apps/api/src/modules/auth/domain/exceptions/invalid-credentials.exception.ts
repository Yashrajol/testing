import { AuthDomainException } from './auth.exception';

export class InvalidCredentialsException extends AuthDomainException {
  constructor(message = 'Invalid authentication credentials provided.') {
    super(message, 'INVALID_CREDENTIALS');
  }
}
