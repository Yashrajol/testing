import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Vedhkrit Global Academy', description: 'Organization name' })
  @IsString()
  @IsNotEmpty({ message: 'Organization name is required.' })
  name!: string;

  @ApiProperty({ example: 'vedhkrit-global', description: 'Unique URL slug' })
  @IsString()
  @IsNotEmpty({ message: 'Organization slug is required.' })
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers, and hyphens.' })
  slug!: string;

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
  @IsEmail({}, { message: 'Invalid organization email format.' })
  email?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '123 Tech Park, Bangalore, India' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Asia/Kolkata', default: 'UTC' })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional({ example: 'en-US', default: 'en-US' })
  @IsOptional()
  @IsString()
  locale?: string;

  @ApiPropertyOptional({ example: 'INR', default: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;
}
