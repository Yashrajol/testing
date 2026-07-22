import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrganizationDto {
  @ApiPropertyOptional({ example: 'Vedhkrit Global Academy' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Vedhkrit Private Limited' })
  @IsOptional()
  @IsString()
  legalName?: string;

  @ApiPropertyOptional({ example: 'REG-12345678' })
  @IsOptional()
  @IsString()
  registrationNumber?: string;

  @ApiPropertyOptional({ example: 'TAX-87654321' })
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiPropertyOptional({ example: 'https://vedhkrit.com/logo.png' })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiPropertyOptional({ example: 'https://vedhkrit.com' })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ example: 'contact@vedhkrit.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '123 Tech Park, Bangalore, India' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Asia/Kolkata' })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional({ example: 'en-US' })
  @IsOptional()
  @IsString()
  locale?: string;

  @ApiPropertyOptional({ example: 'INR' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiPropertyOptional({ example: { aiFeaturesEnabled: true } })
  @IsOptional()
  @IsObject()
  featureFlags?: Record<string, any>;

  @ApiPropertyOptional({ example: { primaryColor: '#0052CC' } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
