import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '../services/notifications.service';

export function useNotifications(recipientId: string) {
  return useQuery({
    queryKey: ['notifications', recipientId] as const,
    queryFn: () => NotificationService.getNotifications(recipientId),
    enabled: !!recipientId,
  });
}

export function useAnnouncements() {
  return useQuery({
    queryKey: ['announcements'] as const,
    queryFn: () => NotificationService.getAnnouncements(),
  });
}

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationIds: string[]) =>
      NotificationService.markAsRead(notificationIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
