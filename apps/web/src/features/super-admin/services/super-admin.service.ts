import { apiClient } from '@/shared/api/axios';
import {
  PlatformDashboard,
  Organization,
  OrganizationAdmin,
  SubscriptionPlan,
  BillingRecord,
  FeatureFlag,
  Role,
  AuditLog,
  PlatformAnalytics,
  SystemHealth,
  GlobalNotification,
} from '../types';

export const SuperAdminService = {
  // Dashboard
  async getDashboard(): Promise<PlatformDashboard> {
    return (await apiClient.get('/api/v1/super-admin/dashboard')) as any;
  },

  // Organizations CRUD
  async getOrganizations(): Promise<Organization[]> {
    return (await apiClient.get('/api/v1/super-admin/organizations')) as any;
  },

  async getOrganization(organizationId: string): Promise<Organization> {
    return (await apiClient.get(`/api/v1/super-admin/organizations/${organizationId}`)) as any;
  },

  async createOrganization(payload: Partial<Organization>): Promise<Organization> {
    return (await apiClient.post('/api/v1/super-admin/organizations', payload)) as any;
  },

  async updateOrganization(
    organizationId: string,
    payload: Partial<Organization>
  ): Promise<Organization> {
    return (await apiClient.put(
      `/api/v1/super-admin/organizations/${organizationId}`,
      payload
    )) as any;
  },

  async deleteOrganization(organizationId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(
      `/api/v1/super-admin/organizations/${organizationId}`
    )) as any;
  },

  // Institution Admins CRUD
  async getAdmins(): Promise<OrganizationAdmin[]> {
    return (await apiClient.get('/api/v1/super-admin/admins')) as any;
  },

  async createAdmin(payload: Partial<OrganizationAdmin>): Promise<OrganizationAdmin> {
    return (await apiClient.post('/api/v1/super-admin/admins', payload)) as any;
  },

  async updateAdmin(
    adminId: string,
    payload: Partial<OrganizationAdmin>
  ): Promise<OrganizationAdmin> {
    return (await apiClient.put(`/api/v1/super-admin/admins/${adminId}`, payload)) as any;
  },

  async deleteAdmin(adminId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(`/api/v1/super-admin/admins/${adminId}`)) as any;
  },

  // Subscription Plans CRUD
  async getSubscriptions(): Promise<SubscriptionPlan[]> {
    return (await apiClient.get('/api/v1/super-admin/subscriptions')) as any;
  },

  async createSubscription(payload: Partial<SubscriptionPlan>): Promise<SubscriptionPlan> {
    return (await apiClient.post('/api/v1/super-admin/subscriptions', payload)) as any;
  },

  async updateSubscription(
    planId: string,
    payload: Partial<SubscriptionPlan>
  ): Promise<SubscriptionPlan> {
    return (await apiClient.put(
      `/api/v1/super-admin/subscriptions/${planId}`,
      payload
    )) as any;
  },

  async deleteSubscription(planId: string): Promise<{ success: boolean }> {
    return (await apiClient.delete(`/api/v1/super-admin/subscriptions/${planId}`)) as any;
  },

  // Billing
  async getBilling(): Promise<BillingRecord[]> {
    return (await apiClient.get('/api/v1/super-admin/billing')) as any;
  },

  // Feature Flags
  async getFeatures(): Promise<FeatureFlag[]> {
    return (await apiClient.get('/api/v1/super-admin/features')) as any;
  },

  async updateFeature(
    featureId: string,
    payload: Partial<FeatureFlag>
  ): Promise<FeatureFlag> {
    return (await apiClient.put(`/api/v1/super-admin/features/${featureId}`, payload)) as any;
  },

  // Roles & Permissions
  async getRoles(): Promise<Role[]> {
    return (await apiClient.get('/api/v1/super-admin/roles')) as any;
  },

  async updateRole(roleId: string, payload: Partial<Role>): Promise<Role> {
    return (await apiClient.put(`/api/v1/super-admin/roles/${roleId}`, payload)) as any;
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLog[]> {
    return (await apiClient.get('/api/v1/super-admin/audit-logs')) as any;
  },

  // Analytics & Health
  async getAnalytics(): Promise<PlatformAnalytics> {
    return (await apiClient.get('/api/v1/super-admin/analytics')) as any;
  },

  async getSystemHealth(): Promise<SystemHealth> {
    return (await apiClient.get('/api/v1/super-admin/system-health')) as any;
  },

  // Global Notifications
  async getNotifications(): Promise<GlobalNotification[]> {
    return (await apiClient.get('/api/v1/super-admin/notifications')) as any;
  },

  async createNotification(
    payload: Partial<GlobalNotification>
  ): Promise<GlobalNotification> {
    return (await apiClient.post('/api/v1/super-admin/notifications', payload)) as any;
  },
};
