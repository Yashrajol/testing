import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIntegrationDto {
  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'tenant-uuid-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ example: 'connector-uuid-123' })
  @IsString()
  @IsNotEmpty()
  connectorId!: string;

  @ApiProperty({ example: { apiKey: 'key-123', apiSecret: 'sec-456' } })
  @IsNotEmpty()
  config: any;
}

export class UpdateIntegrationDto {
  @ApiPropertyOptional({ example: { apiKey: 'updated-key' } })
  @IsOptional()
  config?: any;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;
}
