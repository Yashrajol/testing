import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vedhkrit/database';
import { IIntegrationsRepository } from './integrations.repository.interface';
import { ConnectorEntity } from '../domain/entities/connector.entity';
import { IntegrationEntity } from '../domain/entities/integration.entity';
import { WebhookEntity } from '../domain/entities/webhook.entity';
import { SyncJobEntity } from '../domain/entities/sync-job.entity';
import { ApiKeyEntity } from '../domain/entities/api-key.entity';
import { IntegrationFilterOptions, WebhookFilterOptions, ApiKeyFilterOptions } from '../types/integrations.types';
import { ConnectorType, SyncStatus } from '../constants/integrations.constants';

@Injectable()
export class IntegrationsRepository implements IIntegrationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findConnectors(): Promise<ConnectorEntity[]> {
    let raws = await this.prisma.connector.findMany({
      where: { isActive: true },
    });

    if (raws.length === 0) {
      // Seed default connectors if none exist
      await this.prisma.connector.createMany({
        data: [
          { name: 'Google Classroom', type: ConnectorType.GOOGLE_CLASSROOM, category: 'EDUCATION', description: 'Google Classroom OAuth Integration' },
          { name: 'Stripe Payments', type: ConnectorType.STRIPE, category: 'PAYMENTS', description: 'Stripe webhook and billing system' },
        ],
      });
      raws = await this.prisma.connector.findMany({
        where: { isActive: true },
      });
    }

    return raws.map((r) => this.mapConnector(r));
  }

  async findConnectorById(id: string): Promise<ConnectorEntity | null> {
    const raw = await this.prisma.connector.findUnique({
      where: { id },
    });
    return raw ? this.mapConnector(raw) : null;
  }

  async createIntegration(data: any): Promise<IntegrationEntity> {
    const raw = await this.prisma.integration.create({ data });
    return this.mapIntegration(raw);
  }

  async updateIntegration(id: string, data: any): Promise<IntegrationEntity> {
    const raw = await this.prisma.integration.update({
      where: { id },
      data,
    });
    return this.mapIntegration(raw);
  }

  async updateIntegrationSynced(id: string): Promise<void> {
    await this.prisma.integration.update({
      where: { id },
      data: { lastSyncedAt: new Date() },
    });
  }

  async findIntegrationById(id: string): Promise<IntegrationEntity | null> {
    const raw = await this.prisma.integration.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? this.mapIntegration(raw) : null;
  }

  async findIntegrations(options?: IntegrationFilterOptions): Promise<IntegrationEntity[]> {
    const where: any = { deletedAt: null };
    if (options?.organizationId) where.organizationId = options.organizationId;
    if (options?.tenantId) where.tenantId = options.tenantId;
    if (options?.connectorId) where.connectorId = options.connectorId;

    const raws = await this.prisma.integration.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapIntegration(r));
  }

  async createWebhook(data: any): Promise<WebhookEntity> {
    const raw = await this.prisma.webhook.create({ data });
    return this.mapWebhook(raw);
  }

  async findWebhookById(id: string): Promise<WebhookEntity | null> {
    const raw = await this.prisma.webhook.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? this.mapWebhook(raw) : null;
  }

  async findWebhooks(options?: WebhookFilterOptions): Promise<WebhookEntity[]> {
    const where: any = { deletedAt: null };
    if (options?.organizationId) where.organizationId = options.organizationId;
    if (options?.tenantId) where.tenantId = options.tenantId;
    if (options?.isActive !== undefined) where.isActive = options.isActive;

    const raws = await this.prisma.webhook.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapWebhook(r));
  }

  async deleteWebhook(id: string): Promise<void> {
    await this.prisma.webhook.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async createSyncJob(data: any): Promise<SyncJobEntity> {
    const raw = await this.prisma.syncJob.create({ data });
    return this.mapSyncJob(raw);
  }

  async updateSyncJob(id: string, data: any): Promise<SyncJobEntity> {
    const raw = await this.prisma.syncJob.update({
      where: { id },
      data,
    });
    return this.mapSyncJob(raw);
  }

  async findSyncJobs(integrationId: string): Promise<SyncJobEntity[]> {
    const raws = await this.prisma.syncJob.findMany({
      where: { integrationId },
      orderBy: { startedAt: 'desc' },
    });
    return raws.map((r) => this.mapSyncJob(r));
  }

  async createApiKey(data: any): Promise<ApiKeyEntity> {
    const raw = await this.prisma.apiKey.create({ data });
    return this.mapApiKey(raw);
  }

  async findApiKeyByHash(keyHash: string): Promise<ApiKeyEntity | null> {
    const raw = await this.prisma.apiKey.findFirst({
      where: { keyHash, deletedAt: null },
    });
    return raw ? this.mapApiKey(raw) : null;
  }

  async findApiKeys(options?: ApiKeyFilterOptions): Promise<ApiKeyEntity[]> {
    const where: any = { deletedAt: null };
    if (options?.organizationId) where.organizationId = options.organizationId;
    if (options?.tenantId) where.tenantId = options.tenantId;
    if (options?.isActive !== undefined) where.isActive = options.isActive;

    const raws = await this.prisma.apiKey.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: { createdAt: 'desc' },
    });

    return raws.map((r) => this.mapApiKey(r));
  }

  async deleteApiKey(id: string): Promise<void> {
    await this.prisma.apiKey.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private mapConnector(raw: any): ConnectorEntity {
    return new ConnectorEntity({
      id: raw.id,
      name: raw.name,
      type: raw.type as ConnectorType,
      category: raw.category,
      description: raw.description,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  private mapIntegration(raw: any): IntegrationEntity {
    return new IntegrationEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      connectorId: raw.connectorId,
      config: raw.config,
      status: raw.status,
      lastSyncedAt: raw.lastSyncedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapWebhook(raw: any): WebhookEntity {
    return new WebhookEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      url: raw.url,
      events: raw.events,
      secret: raw.secret,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  private mapSyncJob(raw: any): SyncJobEntity {
    return new SyncJobEntity({
      id: raw.id,
      integrationId: raw.integrationId,
      status: raw.status as SyncStatus,
      recordsSynced: raw.recordsSynced,
      errorMessage: raw.errorMessage,
      startedAt: raw.startedAt,
      completedAt: raw.completedAt,
      createdAt: raw.createdAt,
    });
  }

  private mapApiKey(raw: any): ApiKeyEntity {
    return new ApiKeyEntity({
      id: raw.id,
      organizationId: raw.organizationId,
      tenantId: raw.tenantId,
      name: raw.name,
      keyHash: raw.keyHash,
      scopes: raw.scopes,
      expiresAt: raw.expiresAt,
      isActive: raw.isActive,
      lastUsedAt: raw.lastUsedAt,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }
}
