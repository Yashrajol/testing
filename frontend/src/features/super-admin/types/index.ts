export interface PlatformStatistics {
  totalOrganizations: number;
  activeInstitutions: number;
  totalStudents: number;
  totalMentors: number;
  totalAdmins: number;
  platformRevenue: number;
  mrr: number;
  monthlyGrowth: number;
  assessmentCompletion?: number;
  apiHealth: string;
  serverStatus: string;
  databaseStatus: string;
  queueStatus: string;
  storageUsage: number;
}

export interface Organization {
  id: string;
  name: string;
  code?: string;
  city: string;
  students: number;
  teachers: number;
  mentors?: number;
  plan: string;
  revenue: number;
  status: 'active' | 'inactive' | 'suspended';
  onboardedAt?: string;
  adminEmail?: string;
}

export interface OrganizationAdmin {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organizationId: string;
  organizationName?: string;
  role: string;
  status: 'active' | 'invited' | 'disabled';
  lastLogin?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  cycle: string;
  slots: number;
  activeSchools: number;
  features?: string[];
  status?: 'active' | 'archived';
}

export interface BillingRecord {
  id: string;
  organizationId: string;
  organizationName: string;
  amount: number;
  planName: string;
  billingDate: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  targetEnvironment: 'all' | 'beta' | 'enterprise';
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount?: number;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  ip: string;
  time: string;
  timestamp?: string;
  resourceId?: string;
}

export interface PlatformAnalytics {
  monthlyRevenue: Array<{ month: string; mrr: number; users: number }>;
  userDistribution: { students: number; parents: number; mentors: number; admins: number };
  retentionRate: number;
  churnRate: number;
}

export interface SystemHealth {
  databaseHealth: string; // e.g. "99.98% OK"
  apiLatencyMs: number; // e.g. 42
  pwaCacheHitRate: number; // e.g. 94.1
  serverUptimeHours: number;
  redisQueueActive: boolean;
  sslValid: boolean;
  storageUsedGb: number;
  storageMaxGb: number;
}

export interface GlobalNotification {
  id: string;
  title: string;
  message: string;
  senderName?: string;
  targetAudience: 'all' | 'organizations' | 'admins' | 'mentors';
  sentAt: string;
  priority?: 'normal' | 'urgent';
}

export interface PlatformDashboard {
  stats: PlatformStatistics;
  health: SystemHealth;
  organizations: Organization[];
  revenueTrends: Array<{ month: string; mrr: number; users: number }>;
  recentAuditLogs: AuditLog[];
}
