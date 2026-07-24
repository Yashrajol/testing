export interface OfflineDraft {
  id: string;
  type: 'assignment' | 'note' | 'planner';
  title: string;
  content: string;
  savedAt: string;
  synced: boolean;
}

export interface OfflineResource {
  id: string;
  title: string;
  subject: string;
  type: string;
  cachedAt: string;
}

export interface PwaInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  promptInstall: () => Promise<void>;
}

export interface PwaUpdateState {
  hasUpdate: boolean;
  reloadApp: () => void;
}

export interface PushNotificationPermission {
  permission: NotificationPermission;
  isSubscribed: boolean;
  subscribe: () => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
}
