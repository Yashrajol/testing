import { OrganizationEntity } from '../domain/entities/organization.entity';
import { OrganizationFilterOptions } from '../types/organization.types';

export interface IOrganizationRepository {
  findById(id: string): Promise<OrganizationEntity | null>;
  findBySlug(slug: string): Promise<OrganizationEntity | null>;
  create(data: {
    name: string;
    slug: string;
    legalName?: string;
    registrationNumber?: string;
    taxNumber?: string;
    logoUrl?: string;
    website?: string;
    email?: string;
    phone?: string;
    address?: string;
    timezone?: string;
    locale?: string;
    currency?: string;
    subscriptionPlan?: string;
    featureFlags?: Record<string, any>;
    metadata?: Record<string, any>;
  }): Promise<OrganizationEntity>;
  update(id: string, data: Partial<{
    name: string;
    legalName: string | null;
    registrationNumber: string | null;
    taxNumber: string | null;
    logoUrl: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    timezone: string;
    locale: string;
    currency: string;
    status: string;
    subscriptionPlan: string;
    subscriptionStatus: string;
    featureFlags: Record<string, any>;
    metadata: Record<string, any>;
  }>): Promise<OrganizationEntity>;
  softDelete(id: string): Promise<void>;
  findMany(options?: OrganizationFilterOptions): Promise<{ items: OrganizationEntity[]; total: number }>;
}
