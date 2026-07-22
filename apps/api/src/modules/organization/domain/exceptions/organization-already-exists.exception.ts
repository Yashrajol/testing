export class OrganizationAlreadyExistsException extends Error {
  constructor(field: string, value: string) {
    super(`Organization with ${field} '${value}' already exists.`);
    this.name = 'OrganizationAlreadyExistsException';
  }
}
