import { apiClient } from '@/shared/api/axios';
import { Notification, Announcement } from '../types';

export const NotificationService = {
  async getNotifications(recipientId: string): Promise<Notification[]> {
    return (await apiClient.get(`/api/v1/notifications/user/${recipientId}`)) as any;
  },

  async getAnnouncements(): Promise<Announcement[]> {
    return (await apiClient.get('/api/v1/notifications/announcements')) as any;
  },

  async markAsRead(notificationIds: string[]): Promise<any> {
    return (await apiClient.post('/api/v1/notifications/mark-read', { notificationIds })) as any;
  },
};
