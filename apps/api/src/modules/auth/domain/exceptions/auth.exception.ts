export class AuthDomainException extends Error {
  constructor(message: string, public readonly code: string = 'AUTH_DOMAIN_ERROR') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
