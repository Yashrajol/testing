import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

export class PhoneNumber {
  private readonly value: string;

  constructor(phone: string) {
    if (!phone || !this.validate(phone)) {
      throw new InvalidCredentialsException('Invalid phone number format.');
    }
    this.value = phone.trim();
  }

  private validate(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$|^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: PhoneNumber): boolean {
    return this.value === other.getValue();
  }
}
