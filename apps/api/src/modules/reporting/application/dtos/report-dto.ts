import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportType, ScheduleFrequency } from '../../constants/reporting.constants';

export class CreateReportDto {
  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'tenant-uuid-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ enum: ReportType, example: ReportType.STUDENT_PROGRESS })
  @IsEnum(ReportType)
  type!: ReportType;

  @ApiProperty({ example: 'Q3 Student Progress Performance Report' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Comprehensive student progress tracking report.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: { includeGrades: true, includeAttendance: true } })
  @IsOptional()
  config?: any;

  @ApiPropertyOptional({ example: { batchId: 'batch-123', minAttendance: 75 } })
  @IsOptional()
  filters?: any;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isScheduled?: boolean;

  @ApiPropertyOptional({ enum: ScheduleFrequency, example: ScheduleFrequency.WEEKLY })
  @IsOptional()
  @IsEnum(ScheduleFrequency)
  frequency?: ScheduleFrequency;

  @ApiPropertyOptional({ example: '0 0 * * 1' })
  @IsOptional()
  @IsString()
  cronExpression?: string;

  @ApiPropertyOptional({ example: ['admin@vedhkrit.com'] })
  @IsOptional()
  @IsArray()
  recipients?: string[];
}

export class UpdateReportDto {
  @ApiPropertyOptional({ example: 'Updated Report Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: { includeGrades: false } })
  @IsOptional()
  config?: any;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isScheduled?: boolean;

  @ApiPropertyOptional({ enum: ScheduleFrequency, example: ScheduleFrequency.MONTHLY })
  @IsOptional()
  @IsEnum(ScheduleFrequency)
  frequency?: ScheduleFrequency;
}
