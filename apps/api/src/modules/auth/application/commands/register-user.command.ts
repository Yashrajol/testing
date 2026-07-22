import { RoleName } from '@vedhkrit/database';

export class RegisterUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly phoneNumber?: string,
    public readonly role?: RoleName,
    public readonly organizationId?: string,
    public readonly schoolId?: string,
  ) {}
}
