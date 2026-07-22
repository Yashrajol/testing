export class OrganizationCreatedEvent {
  constructor(
    public readonly organizationId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}
