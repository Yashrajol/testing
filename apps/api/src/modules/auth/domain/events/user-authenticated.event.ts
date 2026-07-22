export class UserAuthenticatedEvent {
  public readonly occurredOn: Date = new Date();

  constructor(
    public readonly userId: string,
    public readonly sessionId: string,
    public readonly ip?: string,
    public readonly userAgent?: string,
  ) {}
}
