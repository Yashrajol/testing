import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectorType, SyncStatus } from '../../constants/integrations.constants';

export class ConnectorResponseDto {
  @ApiProperty({ example: 'conn-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Google Classroom Connector' })
  name!: string;

  @ApiProperty({ enum: ConnectorType, example: ConnectorType.GOOGLE_CLASSROOM })
  type!: ConnectorType;

  @ApiProperty({ example: 'EDUCATION' })
  category!: string;

  @ApiPropertyOptional({ example: 'Imports student courses, grades, and schedules.' })
  description?: string | null;

  @ApiProperty({ example: true })
  isActive!: boolean;
}

export class IntegrationResponseDto {
  @ApiProperty({ example: 'int-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'conn-uuid-123' })
  connectorId!: string;

  @ApiProperty({ example: { scopes: ['profile', 'classroom.courses'] } })
  config!: any;

  @ApiProperty({ example: 'ACTIVE' })
  status!: string;

  @ApiPropertyOptional({ example: '2026-07-21T10:00:00.000Z' })
  lastSyncedAt?: Date | null;

  @ApiProperty({ example: '2026-07-21T09:00:00.000Z' })
  createdAt!: Date;
}

export class WebhookResponseDto {
  @ApiProperty({ example: 'wh-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'https://schoolclient.com/webhooks/vedhkrit' })
  url!: string;

  @ApiProperty({ example: ['student.registered'] })
  events!: string[];

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: '2026-07-21T09:00:00.000Z' })
  createdAt!: Date;
}

export class SyncJobResponseDto {
  @ApiProperty({ example: 'job-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'int-uuid-123' })
  integrationId!: string;

  @ApiProperty({ enum: SyncStatus, example: SyncStatus.COMPLETED })
  status!: SyncStatus;

  @ApiProperty({ example: 45 })
  recordsSynced!: number;

  @ApiPropertyOptional({ example: 'OAuth Token Expired' })
  errorMessage?: string | null;

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  startedAt!: Date;

  @ApiPropertyOptional({ example: '2026-07-21T10:02:00.000Z' })
  completedAt?: Date | null;
}

export class ApiKeyResponseDto {
  @ApiProperty({ example: 'key-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Production Analytics Integration Key' })
  name!: string;

  @ApiPropertyOptional({ example: 'vedhkrit_live_abc123xyz...' })
  plainTextKey?: string;

  @ApiProperty({ example: ['academics:read'] })
  scopes!: string[];

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59.000Z' })
  expiresAt?: Date | null;
}
