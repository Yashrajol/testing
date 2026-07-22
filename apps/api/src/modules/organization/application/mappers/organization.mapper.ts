import { OrganizationEntity } from '../../domain/entities/organization.entity';
import { OrganizationResponseDto } from '../dtos/organization-response.dto';

export class OrganizationMapper {
  static toResponseDto(entity: OrganizationEntity): OrganizationResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      slug: entity.slug,
      legalName: entity.legalName,
      registrationNumber: entity.registrationNumber,
      taxNumber: entity.taxNumber,
      logoUrl: entity.logoUrl,
      website: entity.website,
      email: entity.email,
      phone: entity.phone,
      address: entity.address,
      timezone: entity.timezone,
      locale: entity.locale,
      currency: entity.currency,
      status: entity.status,
      subscriptionPlan: entity.subscriptionPlan,
      subscriptionStatus: entity.subscriptionStatus,
      featureFlags: entity.featureFlags,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
