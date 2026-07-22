export class OrganizationResponseDto {
  id!: string;
  name!: string;
  slug!: string;
  legalName?: string | null;
  registrationNumber?: string | null;
  taxNumber?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  timezone!: string;
  locale!: string;
  currency!: string;
  status!: string;
  subscriptionPlan!: string;
  subscriptionStatus!: string;
  featureFlags?: Record<string, any> | null;
  metadata?: Record<string, any> | null;
  createdAt!: Date;
  updatedAt!: Date;
}
