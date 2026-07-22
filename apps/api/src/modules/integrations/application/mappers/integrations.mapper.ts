import { ConnectorEntity } from '../../domain/entities/connector.entity';
import { IntegrationEntity } from '../../domain/entities/integration.entity';
import { WebhookEntity } from '../../domain/entities/webhook.entity';
import { SyncJobEntity } from '../../domain/entities/sync-job.entity';
import { ApiKeyEntity } from '../../domain/entities/api-key.entity';
import {
  ConnectorResponseDto,
  IntegrationResponseDto,
  WebhookResponseDto,
  SyncJobResponseDto,
  ApiKeyResponseDto,
} from '../dtos/integrations-response.dto';

export class IntegrationsMapper {
  static toConnectorDto(entity: ConnectorEntity): ConnectorResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      category: entity.category,
      description: entity.description || null,
      isActive: entity.isActive,
    };
  }

  static toIntegrationDto(entity: IntegrationEntity): IntegrationResponseDto {
    return {
      id: entity.id,
      connectorId: entity.connectorId,
      config: entity.config,
      status: entity.status,
      lastSyncedAt: entity.lastSyncedAt || null,
      createdAt: entity.createdAt,
    };
  }

  static toWebhookDto(entity: WebhookEntity): WebhookResponseDto {
    return {
      id: entity.id,
      url: entity.url,
      events: entity.events,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    };
  }

  static toSyncJobDto(entity: SyncJobEntity): SyncJobResponseDto {
    return {
      id: entity.id,
      integrationId: entity.integrationId,
      status: entity.status,
      recordsSynced: entity.recordsSynced,
      errorMessage: entity.errorMessage || null,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt || null,
    };
  }

  static toApiKeyDto(entity: ApiKeyEntity, plainTextKey?: string): ApiKeyResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      plainTextKey,
      scopes: entity.scopes,
      isActive: entity.isActive,
      expiresAt: entity.expiresAt || null,
    };
  }
}
