export class AssignRoleCommand {
  constructor(
    public readonly userId: string,
    public readonly roleName: string,
    public readonly assignedBy: string,
  ) {}
}
