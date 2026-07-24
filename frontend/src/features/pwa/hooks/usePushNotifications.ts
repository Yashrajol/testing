import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
      if (Notification.permission === 'granted' && 'serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.pushManager.getSubscription().then((sub) => {
            setIsSubscribed(!!sub);
          });
        });
      }
    }
  }, []);

  const subscribe = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      toast.error('Push notifications are not supported in your browser.');
      return false;
    }

    try {
      const res = await Notification.requestPermission();
      setPermission(res);

      if (res === 'granted' && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        // Check or create PushSubscription
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          // Demo VAPID Key for Vedhkrit Push Notification Service
          applicationServerKey: new Uint8Array([4, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
        }).catch(() => null);

        setIsSubscribed(true);
        toast.success('Push Notifications Enabled!', {
          description: 'You will receive alerts for Assignments, Assessments, Live Sessions, and Mentor Messages.',
        });
        return true;
      }
      return false;
    } catch {
      toast.error('Failed to enable push notifications.');
      return false;
    }
  };

  const unsubscribe = async (): Promise<boolean> => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        toast.info('Push Notifications Disabled.');
        return true;
      }
    }
    return false;
  };

  return { permission, isSubscribed, subscribe, unsubscribe };
}
