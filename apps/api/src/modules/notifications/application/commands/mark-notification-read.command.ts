export class MarkNotificationReadCommand {
  constructor(public readonly notificationIds: string[], public readonly recipientId: string) {}
}
