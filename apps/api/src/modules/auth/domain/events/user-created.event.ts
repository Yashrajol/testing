export class UserCreatedEvent {
  public readonly occurredOn: Date = new Date();

  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string,
    public readonly role: string,
  ) {}
}
