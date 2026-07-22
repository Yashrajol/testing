export class CreateOrganizationCommand {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly legalName?: string,
    public readonly registrationNumber?: string,
    public readonly taxNumber?: string,
    public readonly logoUrl?: string,
    public readonly website?: string,
    public readonly email?: string,
    public readonly phone?: string,
    public readonly address?: string,
    public readonly timezone?: string,
    public readonly locale?: string,
    public readonly currency?: string,
    public readonly createdBy?: string,
  ) {}
}
