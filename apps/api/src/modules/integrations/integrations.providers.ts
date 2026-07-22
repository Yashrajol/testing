import { Provider } from '@nestjs/common';
import { INTEGRATIONS_REPOSITORY_TOKEN } from './constants/integrations.constants';
import { IntegrationsRepository } from './repositories/integrations.repository';
import { EducationConnector } from './providers/education.connector';
import { PaymentConnector } from './providers/payment.connector';
import { StorageConnector } from './providers/storage.connector';
import { SyncSchedulerService } from './application/services/sync-scheduler.service';
import { WebhookDispatcherService } from './application/services/webhook-dispatcher.service';

import { CreateIntegrationHandler } from './application/handlers/create-integration.handler';
import { UpdateIntegrationHandler } from './application/handlers/update-integration.handler';
import { RegisterWebhookHandler } from './application/handlers/register-webhook.handler';
import { CreateApiKeyHandler } from './application/handlers/create-apikey.handler';
import { TriggerSyncHandler } from './application/handlers/trigger-sync.handler';
import { GetIntegrationsHandler } from './application/handlers/get-integrations.handler';
import { GetWebhooksHandler } from './application/handlers/get-webhooks.handler';
import { GetSyncJobsHandler } from './application/handlers/get-sync-jobs.handler';
import { GetApiKeysHandler } from './application/handlers/get-apikeys.handler';
import { GetConnectorsHandler } from './application/handlers/get-connectors.handler';
import { ReplayWebhookEventHandler } from './application/handlers/replay-webhook-event.handler';

export const integrationsProviders: Provider[] = [
  {
    provide: INTEGRATIONS_REPOSITORY_TOKEN,
    useClass: IntegrationsRepository,
  },
  EducationConnector,
  PaymentConnector,
  StorageConnector,
  SyncSchedulerService,
  WebhookDispatcherService,
  CreateIntegrationHandler,
  UpdateIntegrationHandler,
  RegisterWebhookHandler,
  CreateApiKeyHandler,
  TriggerSyncHandler,
  GetIntegrationsHandler,
  GetWebhooksHandler,
  GetSyncJobsHandler,
  GetApiKeysHandler,
  GetConnectorsHandler,
  ReplayWebhookEventHandler,
];
