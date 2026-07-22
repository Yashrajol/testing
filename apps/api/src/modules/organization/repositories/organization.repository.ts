import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IOrganizationRepository } from './organization.repository.interface';
import { OrganizationEntity } from '../domain/entities/organization.entity';
import { OrganizationSlug } from '../domain/value-objects/organization-slug.value-object';
import { OrganizationEmail } from '../domain/value-objects/organization-email.value-object';
import { OrganizationFilterOptions } from '../types/organization.types';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toEntity(raw: any): OrganizationEntity {
    return new OrganizationEntity({
      id: raw.id,
      name: raw.name,
      slug: new OrganizationSlug(raw.slug),
      legalName: raw.legalName,
      registrationNumber: raw.registrationNumber,
      taxNumber: raw.taxNumber,
      logoUrl: raw.logoUrl,
      website: raw.website,
      email: raw.email ? new OrganizationEmail(raw.email) : null,
      phone: raw.phone,
      address: raw.address,
      timezone: raw.timezone,
      locale: raw.locale,
      currency: raw.currency,
      status: raw.status,
      subscriptionPlan: raw.subscriptionPlan,
      subscriptionStatus: raw.subscriptionStatus,
      featureFlags: raw.featureFlags as Record<string, any>,
      metadata: raw.metadata as Record<string, any>,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  async findById(id: string): Promise<OrganizationEntity | null> {
    const raw = await this.prisma.organization.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? this.toEntity(raw) : null;
  }

  async findBySlug(slug: string): Promise<OrganizationEntity | null> {
    const raw = await this.prisma.organization.findFirst({
      where: { slug, deletedAt: null },
    });
    return raw ? this.toEntity(raw) : null;
  }

  async create(data: any): Promise<OrganizationEntity> {
    const raw = await this.prisma.organization.create({
      data: {
        name: data.name,
        slug: data.slug,
        legalName: data.legalName,
        registrationNumber: data.registrationNumber,
        taxNumber: data.taxNumber,
        logoUrl: data.logoUrl,
        website: data.website,
        email: data.email,
        phone: data.phone,
        address: data.address,
        timezone: data.timezone || 'UTC',
        locale: data.locale || 'en-US',
        currency: data.currency || 'USD',
        subscriptionPlan: data.subscriptionPlan || 'FREE',
        featureFlags: data.featureFlags || {},
        metadata: data.metadata || {},
      },
    });
    return this.toEntity(raw);
  }

  async update(id: string, data: any): Promise<OrganizationEntity> {
    const raw = await this.prisma.organization.update({
      where: { id },
      data,
    });
    return this.toEntity(raw);
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.organization.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        status: 'ARCHIVED',
      },
    });
  }

  async findMany(options?: OrganizationFilterOptions): Promise<{ items: OrganizationEntity[]; total: number }> {
    const where: any = { deletedAt: null };

    if (options?.status) {
      where.status = options.status;
    }

    if (options?.subscriptionPlan) {
      where.subscriptionPlan = options.subscriptionPlan;
    }

    if (options?.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { slug: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.organization.findMany({
        where,
        skip: options?.skip || 0,
        take: options?.take || 20,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.organization.count({ where }),
    ]);

    return {
      items: items.map((raw) => this.toEntity(raw)),
      total,
    };
  }
}
