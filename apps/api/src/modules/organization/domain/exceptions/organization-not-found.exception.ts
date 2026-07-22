export class OrganizationNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Organization not found for identifier: ${identifier}`);
    this.name = 'OrganizationNotFoundException';
  }
}
