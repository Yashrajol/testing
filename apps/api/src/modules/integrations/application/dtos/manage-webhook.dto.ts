import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterWebhookDto {
  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'tenant-uuid-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ example: 'https://schoolclient.com/webhooks/vedhkrit' })
  @IsString()
  @IsNotEmpty()
  url!: string;

  @ApiProperty({ example: ['student.registered', 'attendance.marked'] })
  @IsArray()
  events!: string[];

  @ApiProperty({ example: 'whsec_signature_key_123' })
  @IsString()
  @IsNotEmpty()
  secret!: string;
}

export class TriggerWebhookReplayDto {
  @ApiProperty({ example: 'event-uuid-123' })
  @IsString()
  @IsNotEmpty()
  eventId!: string;
}
