import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RubricInputDto {
  @ApiProperty({ example: 'Code Quality & Formatting' })
  @IsString()
  @IsNotEmpty()
  criteriaName!: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  maxPoints!: number;

  @ApiPropertyOptional({ example: 'Adherence to Clean Code principles' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateAssignmentDto {
  @ApiProperty({ example: 'batch-uuid-123' })
  @IsString()
  @IsNotEmpty()
  batchId!: string;

  @ApiProperty({ example: 'Data Structures & Algorithms Homework 1' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Implement Binary Search Tree methods in TypeScript' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  totalPoints!: number;

  @ApiProperty({ example: '2026-08-01T23:59:59Z' })
  @IsDateString()
  dueDate!: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  allowLate?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  allowResubmit?: boolean;

  @ApiPropertyOptional({ default: 3 })
  @IsOptional()
  @IsNumber()
  maxSubmissions?: number;

  @ApiPropertyOptional({ type: [RubricInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RubricInputDto)
  rubrics?: RubricInputDto[];
}

export class SubmitAssignmentDto {
  @ApiProperty({ example: 'assignment-uuid-123' })
  @IsString()
  @IsNotEmpty()
  assignmentId!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiPropertyOptional({ example: 'https://github.com/student/bst-assignment' })
  @IsOptional()
  @IsString()
  content?: string;
}

export class EvaluateSubmissionDto {
  @ApiProperty({ example: 88.5 })
  @IsNumber()
  score!: number;

  @ApiPropertyOptional({ example: 'Great logic implementation! Minor edge case missing on root delete.' })
  @IsOptional()
  @IsString()
  feedback?: string;
}

export class GrantExtensionDto {
  @ApiProperty({ example: 'assignment-uuid-123' })
  @IsString()
  @IsNotEmpty()
  assignmentId!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({ example: '2026-08-05T23:59:59Z' })
  @IsDateString()
  extendedDueDate!: string;

  @ApiPropertyOptional({ example: 'Approved extension due to illness' })
  @IsOptional()
  @IsString()
  reason?: string;
}
