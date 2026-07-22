import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApiKeyDto {
  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'tenant-uuid-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ example: 'Production Analytics Integration Key' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: ['academics:read', 'attendance:write'] })
  @IsArray()
  scopes!: string[];

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59Z' })
  @IsOptional()
  @IsString()
  expiresAt?: string;
}
