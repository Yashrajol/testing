export class ArchiveOrganizationCommand {
  constructor(
    public readonly id: string,
    public readonly archivedBy: string,
  ) {}
}
