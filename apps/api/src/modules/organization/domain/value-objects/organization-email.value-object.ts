export class OrganizationEmail {
  private readonly value: string;

  constructor(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error('Invalid organization email address format.');
    }
    this.value = email.toLowerCase().trim();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: OrganizationEmail): boolean {
    return this.value === other.getValue();
  }
}
