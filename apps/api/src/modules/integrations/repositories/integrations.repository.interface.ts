import { ConnectorEntity } from '../domain/entities/connector.entity';
import { IntegrationEntity } from '../domain/entities/integration.entity';
import { WebhookEntity } from '../domain/entities/webhook.entity';
import { SyncJobEntity } from '../domain/entities/sync-job.entity';
import { ApiKeyEntity } from '../domain/entities/api-key.entity';
import { IntegrationFilterOptions, WebhookFilterOptions, ApiKeyFilterOptions } from '../types/integrations.types';

export interface IIntegrationsRepository {
  findConnectors(): Promise<ConnectorEntity[]>;
  findConnectorById(id: string): Promise<ConnectorEntity | null>;

  createIntegration(data: any): Promise<IntegrationEntity>;
  updateIntegration(id: string, data: any): Promise<IntegrationEntity>;
  updateIntegrationSynced(id: string): Promise<void>;
  findIntegrationById(id: string): Promise<IntegrationEntity | null>;
  findIntegrations(options?: IntegrationFilterOptions): Promise<IntegrationEntity[]>;

  createWebhook(data: any): Promise<WebhookEntity>;
  findWebhookById(id: string): Promise<WebhookEntity | null>;
  findWebhooks(options?: WebhookFilterOptions): Promise<WebhookEntity[]>;
  deleteWebhook(id: string): Promise<void>;

  createSyncJob(data: any): Promise<SyncJobEntity>;
  updateSyncJob(id: string, data: any): Promise<SyncJobEntity>;
  findSyncJobs(integrationId: string): Promise<SyncJobEntity[]>;

  createApiKey(data: any): Promise<ApiKeyEntity>;
  findApiKeyByHash(keyHash: string): Promise<ApiKeyEntity | null>;
  findApiKeys(options?: ApiKeyFilterOptions): Promise<ApiKeyEntity[]>;
  deleteApiKey(id: string): Promise<void>;
}
