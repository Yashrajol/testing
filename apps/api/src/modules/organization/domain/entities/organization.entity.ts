import { OrganizationSlug } from '../value-objects/organization-slug.value-object';
import { OrganizationEmail } from '../value-objects/organization-email.value-object';

export interface OrganizationProps {
  id: string;
  name: string;
  slug: OrganizationSlug;
  legalName?: string | null;
  registrationNumber?: string | null;
  taxNumber?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  email?: OrganizationEmail | null;
  phone?: string | null;
  address?: string | null;
  timezone: string;
  locale: string;
  currency: string;
  status: string;
  subscriptionPlan: string;
  subscriptionStatus: string;
  featureFlags?: Record<string, any> | null;
  metadata?: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class OrganizationEntity {
  constructor(private readonly props: OrganizationProps) {}

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get slug(): string { return this.props.slug.getValue(); }
  get legalName(): string | null | undefined { return this.props.legalName; }
  get registrationNumber(): string | null | undefined { return this.props.registrationNumber; }
  get taxNumber(): string | null | undefined { return this.props.taxNumber; }
  get logoUrl(): string | null | undefined { return this.props.logoUrl; }
  get website(): string | null | undefined { return this.props.website; }
  get email(): string | null | undefined { return this.props.email?.getValue(); }
  get phone(): string | null | undefined { return this.props.phone; }
  get address(): string | null | undefined { return this.props.address; }
  get timezone(): string { return this.props.timezone; }
  get locale(): string { return this.props.locale; }
  get currency(): string { return this.props.currency; }
  get status(): string { return this.props.status; }
  get subscriptionPlan(): string { return this.props.subscriptionPlan; }
  get subscriptionStatus(): string { return this.props.subscriptionStatus; }
  get featureFlags(): Record<string, any> | null | undefined { return this.props.featureFlags; }
  get metadata(): Record<string, any> | null | undefined { return this.props.metadata; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }
  get deletedAt(): Date | null | undefined { return this.props.deletedAt; }

  isArchived(): boolean {
    return this.props.status === 'ARCHIVED' || !!this.props.deletedAt;
  }

  isActive(): boolean {
    return this.props.status === 'ACTIVE' && !this.props.deletedAt;
  }
}
