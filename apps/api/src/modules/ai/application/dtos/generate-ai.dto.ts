import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateStudyPlanDto {
  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiPropertyOptional({ example: 'Computer Science' })
  @IsOptional()
  @IsString()
  focusSubject?: string;
}

export class GenerateInsightsDto {
  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;
}

export class GenerateCareerAdviceDto {
  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;
}

export class RiskAnalysisDto {
  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;
}

export class TeacherAssistantDto {
  @ApiProperty({ example: 'Create a quiz template on Redis architecture with 5 multiple-choice questions.' })
  @IsString()
  @IsNotEmpty()
  promptInstruction!: string;

  @ApiPropertyOptional({ example: 'teacher-uuid-123' })
  @IsOptional()
  @IsString()
  teacherId?: string;
}

export class ParentSummaryDto {
  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;
}
