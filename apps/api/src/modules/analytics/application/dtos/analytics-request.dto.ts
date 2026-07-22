import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TimeFrame } from '../../constants/analytics.constants';

export class AnalyticsQueryDto {
  @ApiPropertyOptional({ enum: TimeFrame, default: TimeFrame.MONTHLY })
  @IsOptional()
  @IsEnum(TimeFrame)
  timeFrame?: TimeFrame;

  @ApiPropertyOptional({ example: 'subject-uuid-123' })
  @IsOptional()
  @IsString()
  subjectId?: string;
}
