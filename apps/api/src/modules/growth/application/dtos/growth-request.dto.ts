import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({ example: 'Master Data Structures & Algorithms' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Complete 50 coding challenges and 4 mock assessments' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '2026-09-01' })
  @IsOptional()
  @IsDateString()
  targetDate?: string;
}
