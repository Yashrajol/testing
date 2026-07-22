import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProfileType } from '../../constants/identity.constants';

export class CreateProfileDto {
  @ApiProperty({ enum: ProfileType, example: ProfileType.STUDENT })
  @IsEnum(ProfileType)
  type!: ProfileType;

  @ApiPropertyOptional({ example: 'Yash' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'S' })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiPropertyOptional({ example: 'Rajole' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'MALE' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: '2005-08-15' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'https://cdn.vedhkrit.com/photos/yash.jpg' })
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @ApiPropertyOptional({ example: 'Bangalore, India' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiPropertyOptional({ example: 'O+' })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: 'Indian' })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiPropertyOptional({ example: 'English' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 'Asia/Kolkata' })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional({ example: { bio: 'Passionate about coding' } })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  // Student specific
  @ApiPropertyOptional({ example: 'ADM-2026-001' })
  @IsOptional()
  @IsString()
  admissionNumber?: string;

  @ApiPropertyOptional({ example: '101' })
  @IsOptional()
  @IsString()
  rollNumber?: string;

  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'school-uuid-456' })
  @IsOptional()
  @IsString()
  schoolId?: string;

  @ApiPropertyOptional({ example: 'Grade 10' })
  @IsOptional()
  @IsString()
  grade?: string;

  // Teacher specific
  @ApiPropertyOptional({ example: 'EMP-991' })
  @IsOptional()
  @IsString()
  employeeCode?: string;

  @ApiPropertyOptional({ example: 'Senior HOD Physics' })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional({ example: 'Quantum Mechanics' })
  @IsOptional()
  @IsString()
  specialization?: string;

  // Parent specific
  @ApiPropertyOptional({ example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiPropertyOptional({ example: 'Father' })
  @IsOptional()
  @IsString()
  relationToStudent?: string;

  // Mentor specific
  @ApiPropertyOptional({ example: ['STEM', 'Competitive Coding'] })
  @IsOptional()
  expertise?: string[];

  @ApiPropertyOptional({ example: 8 })
  @IsOptional()
  @IsInt()
  @Min(0)
  yearsOfExperience?: number;

  // Staff specific
  @ApiPropertyOptional({ example: 'IT Support' })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({ example: 'STF-501' })
  @IsOptional()
  @IsString()
  employeeId?: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Yash' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'S' })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiPropertyOptional({ example: 'Rajole' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'MALE' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: '2005-08-15' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'https://cdn.vedhkrit.com/photos/yash.jpg' })
  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @ApiPropertyOptional({ example: 'Bangalore, India' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiPropertyOptional({ example: 'O+' })
  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: 'Indian' })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiPropertyOptional({ example: 'English' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({ example: 'Asia/Kolkata' })
  @IsOptional()
  @IsString()
  timezone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
