import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DashboardRole } from '../../constants/reporting.constants';

export class CreateDashboardDto {
  @ApiPropertyOptional({ example: 'org-uuid-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'school-uuid-123' })
  @IsOptional()
  @IsString()
  schoolId?: string;

  @ApiProperty({ enum: DashboardRole, example: DashboardRole.STUDENT })
  @IsEnum(DashboardRole)
  role!: DashboardRole;

  @ApiProperty({ example: 'Student Executive Performance Overview' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: { cols: 12, rowHeight: 150 } })
  @IsOptional()
  layoutConfig?: any;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class AddWidgetDto {
  @ApiProperty({ example: 'Overall Mastery Index' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'KPI_CARD' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ example: 'overallMasteryScore' })
  @IsString()
  @IsNotEmpty()
  metricKey!: string;

  @ApiProperty({ example: 'CARD' })
  @IsString()
  @IsNotEmpty()
  chartType!: string;

  @ApiPropertyOptional({ example: { x: 0, y: 0, w: 4, h: 2 } })
  @IsOptional()
  gridPosition?: any;

  @ApiPropertyOptional({ example: { color: 'primary' } })
  @IsOptional()
  config?: any;
}
