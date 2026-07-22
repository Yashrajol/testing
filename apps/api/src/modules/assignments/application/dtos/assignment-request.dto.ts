import { IsArray, IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssignmentCategory, AssignmentStatus, GradingType } from '../../constants/assignments.constants';

export class CreateRubricCriterionDto {
  @ApiProperty({ example: 'Code Clarity & Structure' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Proper formatting, naming conventions, and modularity' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 25.0 })
  @IsNumber()
  maxPoints!: number;

  @ApiPropertyOptional({ example: 1.0 })
  @IsOptional()
  @IsNumber()
  weightage?: number;
}

export class CreateRubricDto {
  @ApiProperty({ example: 'Software Engineering Rubric' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Criteria for grading final capstone project' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  totalMaxPoints!: number;

  @ApiProperty({ type: [CreateRubricCriterionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRubricCriterionDto)
  criteria!: CreateRubricCriterionDto[];
}

export class CreateAssignmentDto {
  @ApiPropertyOptional({ example: 'org-123' })
  @IsOptional()
  @IsString()
  organizationId?: string;

  @ApiPropertyOptional({ example: 'tenant-123' })
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiProperty({ example: 'Full Stack Microservices Architecture Project' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Build a distributed NestJS + React monorepo application.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: AssignmentCategory, example: AssignmentCategory.PROJECT })
  @IsEnum(AssignmentCategory)
  category!: AssignmentCategory;

  @ApiPropertyOptional({ example: 'batch-uuid-123' })
  @IsOptional()
  @IsString()
  batchId?: string;

  @ApiPropertyOptional({ example: 'class-uuid-123' })
  @IsOptional()
  @IsString()
  classId?: string;

  @ApiPropertyOptional({ example: 'subject-uuid-123' })
  @IsOptional()
  @IsString()
  subjectId?: string;

  @ApiPropertyOptional({ example: 'teacher-uuid-123' })
  @IsOptional()
  @IsString()
  teacherId?: string;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  totalPoints!: number;

  @ApiPropertyOptional({ example: 50.0 })
  @IsOptional()
  @IsNumber()
  passingPoints?: number;

  @ApiPropertyOptional({ enum: GradingType, example: GradingType.RUBRIC_BASED })
  @IsOptional()
  @IsEnum(GradingType)
  gradingType?: GradingType;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isGroupAssignment?: boolean;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  maxGroupSize?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  allowLateSubmission?: boolean;

  @ApiPropertyOptional({ example: 5.0 })
  @IsOptional()
  @IsNumber()
  latePenaltyPercentPerDay?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  maxSubmissions?: number;

  @ApiProperty({ example: '2026-08-15T23:59:59Z' })
  @IsDateString()
  dueDate!: string;

  @ApiPropertyOptional({ example: 'https://github.com/org/template-repo' })
  @IsOptional()
  @IsString()
  gitRepoUrl?: string;

  @ApiPropertyOptional({ type: [CreateRubricDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRubricDto)
  rubrics?: CreateRubricDto[];
}

export class UpdateAssignmentDto {
  @ApiPropertyOptional({ example: 'Updated Project Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description text' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: AssignmentCategory })
  @IsOptional()
  @IsEnum(AssignmentCategory)
  category?: AssignmentCategory;

  @ApiPropertyOptional({ enum: AssignmentStatus })
  @IsOptional()
  @IsEnum(AssignmentStatus)
  status?: AssignmentStatus;

  @ApiPropertyOptional({ example: 100.0 })
  @IsOptional()
  @IsNumber()
  totalPoints?: number;

  @ApiPropertyOptional({ example: '2026-08-20T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

export class CloneAssignmentDto {
  @ApiProperty({ example: 'target-batch-uuid-456' })
  @IsString()
  @IsNotEmpty()
  targetBatchId!: string;

  @ApiPropertyOptional({ example: '2026-09-01T23:59:59Z' })
  @IsOptional()
  @IsDateString()
  newDueDate?: string;
}
