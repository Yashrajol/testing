import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!email || !this.validate(email)) {
      throw new InvalidCredentialsException('Invalid email address format.');
    }
    this.value = email.toLowerCase().trim();
  }

  private validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.getValue();
  }
}
