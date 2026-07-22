export class NotificationNotFoundException extends Error {
  constructor(id: string) {
    super(`Notification not found: ${id}`);
    this.name = 'NotificationNotFoundException';
  }
}

export class TemplateNotFoundException extends Error {
  constructor(codeOrId: string) {
    super(`Notification template not found: ${codeOrId}`);
    this.name = 'TemplateNotFoundException';
  }
}

export class AnnouncementNotFoundException extends Error {
  constructor(id: string) {
    super(`Announcement not found: ${id}`);
    this.name = 'AnnouncementNotFoundException';
  }
}

export class ChannelDisabledException extends Error {
  constructor(channel: string, userId: string) {
    super(`Channel ${channel} is disabled by user preferences for user ${userId}`);
    this.name = 'ChannelDisabledException';
  }
}

export class QuietHoursActiveException extends Error {
  constructor(userId: string, quietHours: string) {
    super(`Cannot deliver low priority notification during quiet hours (${quietHours}) for user ${userId}`);
    this.name = 'QuietHoursActiveException';
  }
}
