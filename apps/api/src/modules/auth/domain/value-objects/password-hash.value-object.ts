import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

export class PasswordHash {
  private readonly value: string;

  constructor(hash: string) {
    if (!hash || hash.length < 10) {
      throw new InvalidCredentialsException('Password hash is invalid or insecure.');
    }
    this.value = hash;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PasswordHash): boolean {
    return this.value === other.getValue();
  }
}
