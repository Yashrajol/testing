export class RevokeRoleCommand {
  constructor(
    public readonly userId: string,
    public readonly roleName: string,
    public readonly revokedBy: string,
  ) {}
}
