export class OrganizationArchivedEvent {
  constructor(
    public readonly organizationId: string,
    public readonly archivedBy: string,
    public readonly timestamp: Date = new Date(),
  ) {}
}
