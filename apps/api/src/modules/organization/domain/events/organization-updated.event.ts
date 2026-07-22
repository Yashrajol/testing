export class OrganizationUpdatedEvent {
  constructor(
    public readonly organizationId: string,
    public readonly updatedFields: string[],
    public readonly timestamp: Date = new Date(),
  ) {}
}
