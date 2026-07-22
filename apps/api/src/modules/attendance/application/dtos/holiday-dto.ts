import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HolidayType } from '../../constants/attendance.constants';

export class CreateHolidayDto {
  @ApiProperty({ example: 'Independence Day' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'National holiday' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2026-08-15' })
  @IsDateString()
  date!: string;

  @ApiPropertyOptional({ example: '2026-08-15' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ enum: HolidayType, example: HolidayType.NATIONAL })
  @IsEnum(HolidayType)
  type!: HolidayType;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  affectsClasses?: boolean;
}

export class UpdateHolidayDto {
  @ApiPropertyOptional({ example: 'Independence Day Celebrations' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated national holiday description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '2026-08-15' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ enum: HolidayType })
  @IsOptional()
  @IsEnum(HolidayType)
  type?: HolidayType;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;
}
