export type NotificationCategory = "academic" | "system" | "social";
export type NotificationPriority = "high" | "medium" | "low";

export interface Notification {
  id: string;
  recipientId: string;
  title: string;
  content: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  isRead: boolean;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface NotificationPreference {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface UnreadCount {
  count: number;
}
