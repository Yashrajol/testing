export class LoginCommand {
  constructor(
    public readonly emailOrPhone: string,
    public readonly password: string,
    public readonly device?: string,
    public readonly browser?: string,
    public readonly os?: string,
    public readonly ip?: string,
    public readonly country?: string,
  ) {}
}
