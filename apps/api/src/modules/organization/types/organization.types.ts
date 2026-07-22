import { ORGANIZATION_STATUS, SUBSCRIPTION_PLAN, SUBSCRIPTION_STATUS } from '../constants/organization.constants';

export type OrganizationStatusType = typeof ORGANIZATION_STATUS[keyof typeof ORGANIZATION_STATUS];
export type SubscriptionPlanType = typeof SUBSCRIPTION_PLAN[keyof typeof SUBSCRIPTION_PLAN];
export type SubscriptionStatusType = typeof SUBSCRIPTION_STATUS[keyof typeof SUBSCRIPTION_STATUS];

export interface OrganizationFilterOptions {
  status?: OrganizationStatusType;
  subscriptionPlan?: SubscriptionPlanType;
  search?: string;
  skip?: number;
  take?: number;
}
