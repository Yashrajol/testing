export class LogoutCommand {
  constructor(
    public readonly sessionId: string,
    public readonly refreshToken?: string,
    public readonly userId?: string,
  ) {}
}
