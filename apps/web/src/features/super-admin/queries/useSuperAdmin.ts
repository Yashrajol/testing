import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SuperAdminService } from '../services/super-admin.service';
import {
  Organization,
  OrganizationAdmin,
  SubscriptionPlan,
  FeatureFlag,
  Role,
  GlobalNotification,
} from '../types';

export const SUPER_ADMIN_QUERY_KEYS = {
  dashboard: ['super-admin', 'dashboard'] as const,
  organizations: ['super-admin', 'organizations'] as const,
  organization: (id: string) => ['super-admin', 'organizations', id] as const,
  admins: ['super-admin', 'admins'] as const,
  subscriptions: ['super-admin', 'subscriptions'] as const,
  billing: ['super-admin', 'billing'] as const,
  features: ['super-admin', 'features'] as const,
  roles: ['super-admin', 'roles'] as const,
  auditLogs: ['super-admin', 'audit-logs'] as const,
  analytics: ['super-admin', 'analytics'] as const,
  systemHealth: ['super-admin', 'system-health'] as const,
  notifications: ['super-admin', 'notifications'] as const,
};

// Platform Dashboard Hook
export function usePlatformDashboard() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.dashboard,
    queryFn: () => SuperAdminService.getDashboard(),
    staleTime: 1000 * 60 * 5,
  });
}

// Organizations Hooks
export function useOrganizations() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.organizations,
    queryFn: () => SuperAdminService.getOrganizations(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useOrganization(organizationId: string) {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.organization(organizationId),
    queryFn: () => SuperAdminService.getOrganization(organizationId),
    enabled: !!organizationId,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Organization>) => SuperAdminService.createOrganization(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.organizations });
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.dashboard });
    },
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ organizationId, payload }: { organizationId: string; payload: Partial<Organization> }) =>
      SuperAdminService.updateOrganization(organizationId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.organizations });
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.organization(variables.organizationId) });
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.dashboard });
    },
  });
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (organizationId: string) => SuperAdminService.deleteOrganization(organizationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.organizations });
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.dashboard });
    },
  });
}

// Admins Hooks
export function useAdmins() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.admins,
    queryFn: () => SuperAdminService.getAdmins(),
  });
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<OrganizationAdmin>) => SuperAdminService.createAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.admins });
    },
  });
}

export function useUpdateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ adminId, payload }: { adminId: string; payload: Partial<OrganizationAdmin> }) =>
      SuperAdminService.updateAdmin(adminId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.admins });
    },
  });
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adminId: string) => SuperAdminService.deleteAdmin(adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.admins });
    },
  });
}

// Subscriptions Hooks
export function useSubscriptions() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.subscriptions,
    queryFn: () => SuperAdminService.getSubscriptions(),
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<SubscriptionPlan>) => SuperAdminService.createSubscription(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.subscriptions });
    },
  });
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, payload }: { planId: string; payload: Partial<SubscriptionPlan> }) =>
      SuperAdminService.updateSubscription(planId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.subscriptions });
    },
  });
}

export function useDeleteSubscription() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (planId: string) => SuperAdminService.deleteSubscription(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.subscriptions });
    },
  });
}

// Billing Hook
export function useBilling() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.billing,
    queryFn: () => SuperAdminService.getBilling(),
  });
}

// Feature Flags Hooks
export function useFeatures() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.features,
    queryFn: () => SuperAdminService.getFeatures(),
  });
}

export function useUpdateFeature() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ featureId, payload }: { featureId: string; payload: Partial<FeatureFlag> }) =>
      SuperAdminService.updateFeature(featureId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.features });
    },
  });
}

// Roles & Permissions Hooks
export function useRoles() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.roles,
    queryFn: () => SuperAdminService.getRoles(),
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ roleId, payload }: { roleId: string; payload: Partial<Role> }) =>
      SuperAdminService.updateRole(roleId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.roles });
    },
  });
}

// Audit Logs Hook
export function useAuditLogs() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.auditLogs,
    queryFn: () => SuperAdminService.getAuditLogs(),
  });
}

// Platform Analytics Hook
export function usePlatformAnalytics() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.analytics,
    queryFn: () => SuperAdminService.getAnalytics(),
  });
}

// System Health Hook
export function useSystemHealth() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.systemHealth,
    queryFn: () => SuperAdminService.getSystemHealth(),
    refetchInterval: 1000 * 30, // Poll health every 30s
  });
}

// Global Notifications Hooks
export function useNotifications() {
  return useQuery({
    queryKey: SUPER_ADMIN_QUERY_KEYS.notifications,
    queryFn: () => SuperAdminService.getNotifications(),
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<GlobalNotification>) => SuperAdminService.createNotification(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPER_ADMIN_QUERY_KEYS.notifications });
    },
  });
}
