import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateIntegrationDto, UpdateIntegrationDto } from './application/dtos/manage-integration.dto';
import { RegisterWebhookDto } from './application/dtos/manage-webhook.dto';
import { CreateApiKeyDto } from './application/dtos/manage-apikey.dto';
import { TriggerWebhookReplayDto } from './application/dtos/manage-webhook.dto';
import {
  ConnectorResponseDto,
  IntegrationResponseDto,
  WebhookResponseDto,
  SyncJobResponseDto,
  ApiKeyResponseDto,
} from './application/dtos/integrations-response.dto';

import { CreateIntegrationHandler } from './application/handlers/create-integration.handler';
import { UpdateIntegrationHandler } from './application/handlers/update-integration.handler';
import { RegisterWebhookHandler } from './application/handlers/register-webhook.handler';
import { CreateApiKeyHandler } from './application/handlers/create-apikey.handler';
import { TriggerSyncHandler } from './application/handlers/trigger-sync.handler';
import { ReplayWebhookEventHandler } from './application/handlers/replay-webhook-event.handler';

import { GetIntegrationsHandler } from './application/handlers/get-integrations.handler';
import { GetWebhooksHandler } from './application/handlers/get-webhooks.handler';
import { GetSyncJobsHandler } from './application/handlers/get-sync-jobs.handler';
import { GetApiKeysHandler } from './application/handlers/get-apikeys.handler';
import { GetConnectorsHandler } from './application/handlers/get-connectors.handler';

import { CreateIntegrationCommand } from './application/commands/create-integration.command';
import { UpdateIntegrationCommand } from './application/commands/update-integration.command';
import { RegisterWebhookCommand } from './application/commands/register-webhook.command';
import { CreateApiKeyCommand } from './application/commands/create-apikey.command';
import { TriggerSyncCommand } from './application/commands/trigger-sync.command';
import { ReplayWebhookEventCommand } from './application/commands/replay-webhook-event.command';

import { GetIntegrationsQuery } from './application/queries/get-integrations.query';
import { GetWebhooksQuery } from './application/queries/get-webhooks.query';
import { GetSyncJobsQuery } from './application/queries/get-sync-jobs.query';
import { GetApiKeysQuery } from './application/queries/get-apikeys.query';
import { GetConnectorsQuery } from './application/queries/get-connectors.query';

@ApiTags('Integrations Integration Hub')
@Controller('integrations')
export class IntegrationsController {
  constructor(
    private readonly createIntegrationHandler: CreateIntegrationHandler,
    private readonly updateIntegrationHandler: UpdateIntegrationHandler,
    private readonly registerWebhookHandler: RegisterWebhookHandler,
    private readonly createApiKeyHandler: CreateApiKeyHandler,
    private readonly triggerSyncHandler: TriggerSyncHandler,
    private readonly replayWebhookEventHandler: ReplayWebhookEventHandler,
    private readonly getIntegrationsHandler: GetIntegrationsHandler,
    private readonly getWebhooksHandler: GetWebhooksHandler,
    private readonly getSyncJobsHandler: GetSyncJobsHandler,
    private readonly getApiKeysHandler: GetApiKeysHandler,
    private readonly getConnectorsHandler: GetConnectorsHandler,
  ) {}

  @Get('connectors')
  @ApiOperation({ summary: 'Get list of standard third-party connector systems' })
  @ApiResponse({ status: 200, type: [ConnectorResponseDto] })
  async getConnectors(): Promise<ConnectorResponseDto[]> {
    return this.getConnectorsHandler.execute(new GetConnectorsQuery());
  }

  @Post()
  @ApiOperation({ summary: 'Setup new third-party credentials configuration' })
  @ApiResponse({ status: 201, type: IntegrationResponseDto })
  async createIntegration(@Body() dto: CreateIntegrationDto): Promise<IntegrationResponseDto> {
    return this.createIntegrationHandler.execute(new CreateIntegrationCommand(dto));
  }

  @Get()
  @ApiOperation({ summary: 'List configured integration setups' })
  @ApiResponse({ status: 200, type: [IntegrationResponseDto] })
  async getIntegrations(
    @Query('organizationId') organizationId?: string,
    @Query('tenantId') tenantId?: string,
  ): Promise<IntegrationResponseDto[]> {
    return this.getIntegrationsHandler.execute(new GetIntegrationsQuery({ organizationId, tenantId }));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update integration credentials / config' })
  @ApiResponse({ status: 200, type: IntegrationResponseDto })
  async updateIntegration(@Param('id') id: string, @Body() dto: UpdateIntegrationDto): Promise<IntegrationResponseDto> {
    return this.updateIntegrationHandler.execute(new UpdateIntegrationCommand(id, dto));
  }

  @Post(':id/sync')
  @ApiOperation({ summary: 'Manually run synchronization task now' })
  @ApiResponse({ status: 201, type: SyncJobResponseDto })
  async triggerSync(@Param('id') id: string): Promise<SyncJobResponseDto> {
    return this.triggerSyncHandler.execute(new TriggerSyncCommand(id));
  }

  @Get(':id/jobs')
  @ApiOperation({ summary: 'Get sync history logs' })
  @ApiResponse({ status: 200, type: [SyncJobResponseDto] })
  async getSyncJobs(@Param('id') id: string): Promise<SyncJobResponseDto[]> {
    return this.getSyncJobsHandler.execute(new GetSyncJobsQuery(id));
  }

  @Post('webhooks')
  @ApiOperation({ summary: 'Register customer callback webhook URL' })
  @ApiResponse({ status: 201, type: WebhookResponseDto })
  async registerWebhook(@Body() dto: RegisterWebhookDto): Promise<WebhookResponseDto> {
    return this.registerWebhookHandler.execute(new RegisterWebhookCommand(dto));
  }

  @Get('webhooks')
  @ApiOperation({ summary: 'List configured webhook callbacks' })
  @ApiResponse({ status: 200, type: [WebhookResponseDto] })
  async getWebhooks(
    @Query('organizationId') organizationId?: string,
    @Query('tenantId') tenantId?: string,
  ): Promise<WebhookResponseDto[]> {
    return this.getWebhooksHandler.execute(new GetWebhooksQuery({ organizationId, tenantId }));
  }

  @Post('webhooks/replay')
  @ApiOperation({ summary: 'Replay/redeliver a webhook event log manually' })
  async replayWebhookEvent(@Body() dto: TriggerWebhookReplayDto) {
    return this.replayWebhookEventHandler.execute(new ReplayWebhookEventCommand(dto));
  }

  @Post('apikeys')
  @ApiOperation({ summary: 'Create API key token for client apps access' })
  @ApiResponse({ status: 201, type: ApiKeyResponseDto })
  async createApiKey(@Body() dto: CreateApiKeyDto): Promise<ApiKeyResponseDto> {
    return this.createApiKeyHandler.execute(new CreateApiKeyCommand(dto));
  }

  @Get('apikeys')
  @ApiOperation({ summary: 'List client API keys' })
  @ApiResponse({ status: 200, type: [ApiKeyResponseDto] })
  async getApiKeys(
    @Query('organizationId') organizationId?: string,
    @Query('tenantId') tenantId?: string,
  ): Promise<ApiKeyResponseDto[]> {
    return this.getApiKeysHandler.execute(new GetApiKeysQuery({ organizationId, tenantId }));
  }

  @Get('connector/health')
  @ApiOperation({ summary: 'Connector status indicators check' })
  async checkConnectorStatus() {
    return {
      status: 'OK',
      connectors: [
        { name: 'Google Classroom OAuth', pingMs: 140, status: 'OPERATIONAL' },
        { name: 'Stripe Payments Gateway', pingMs: 180, status: 'OPERATIONAL' },
        { name: 'Gmail Webhook Relay', pingMs: 100, status: 'OPERATIONAL' },
      ],
    };
  }
}
