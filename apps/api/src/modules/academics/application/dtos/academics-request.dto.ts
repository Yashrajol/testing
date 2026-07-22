import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AcademicEntityType } from '../../constants/academics.constants';

export class CreateAcademicEntityDto {
  @ApiProperty({ enum: AcademicEntityType, example: AcademicEntityType.SCHOOL })
  @IsEnum(AcademicEntityType)
  entityType!: AcademicEntityType;

  @ApiProperty({ example: 'Greenwood International School' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  // School specific
  @ApiPropertyOptional({ example: 'CBSE' })
  @IsOptional()
  @IsString()
  board?: string;

  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  // Parent entity IDs
  @ApiPropertyOptional({ example: 'school-uuid-123' })
  @IsOptional()
  @IsString()
  schoolId?: string;

  @ApiPropertyOptional({ example: 'campus-uuid-123' })
  @IsOptional()
  @IsString()
  campusId?: string;

  @ApiPropertyOptional({ example: 'ay-uuid-123' })
  @IsOptional()
  @IsString()
  academicYearId?: string;

  @ApiPropertyOptional({ example: 'class-uuid-123' })
  @IsOptional()
  @IsString()
  classId?: string;

  @ApiPropertyOptional({ example: 'section-uuid-123' })
  @IsOptional()
  @IsString()
  sectionId?: string;

  @ApiPropertyOptional({ example: 'batch-uuid-123' })
  @IsOptional()
  @IsString()
  batchId?: string;

  @ApiPropertyOptional({ example: 'student-uuid-123' })
  @IsOptional()
  @IsString()
  studentId?: string;

  // Dates & Status
  @ApiPropertyOptional({ example: '2026-06-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2027-04-30' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'SUB-PHYS-10' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ example: '40' })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;
}

export class UpdateAcademicEntityDto {
  @ApiPropertyOptional({ example: 'Greenwood High' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'ICSE' })
  @IsOptional()
  @IsString()
  board?: string;

  @ApiPropertyOptional({ example: '2026-06-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2027-04-30' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsOptional()
  @IsString()
  status?: string;
}
