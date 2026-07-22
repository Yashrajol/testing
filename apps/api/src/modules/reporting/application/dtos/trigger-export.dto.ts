import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportType, ExportFormat } from '../../constants/reporting.constants';

export class TriggerExportDto {
  @ApiPropertyOptional({ example: 'report-uuid-123' })
  @IsOptional()
  @IsString()
  reportId?: string;

  @ApiProperty({ enum: ReportType, example: ReportType.STUDENT_PROGRESS })
  @IsEnum(ReportType)
  reportType!: ReportType;

  @ApiProperty({ enum: ExportFormat, example: ExportFormat.PDF })
  @IsEnum(ExportFormat)
  format!: ExportFormat;

  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'tenant-uuid-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;
}
