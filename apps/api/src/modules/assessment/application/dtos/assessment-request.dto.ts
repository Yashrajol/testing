import { IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssessmentType, QuestionType, EvaluatorType } from '../../constants/assessment.constants';
import { BloomsTaxonomy, DifficultyLevel } from '../../../learning/constants/learning.constants';

export class CreateQuestionBankDto {
  @ApiProperty({ example: 'Physics Mechanics Bank' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Question bank covering Newtonian mechanics' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Physics' })
  @IsOptional()
  @IsString()
  category?: string;
}

export class CreateQuestionDto {
  @ApiPropertyOptional({ example: 'bank-uuid-123' })
  @IsOptional()
  @IsString()
  bankId?: string;

  @ApiProperty({ enum: QuestionType, example: QuestionType.MCQ })
  @IsEnum(QuestionType)
  type!: QuestionType;

  @ApiProperty({ example: 'What is Newton\'s second law of motion?' })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiPropertyOptional({ example: ['F = ma', 'F = m/a', 'F = a/m', 'F = m^2 a'] })
  @IsOptional()
  options?: any;

  @ApiPropertyOptional({ example: 'F = ma' })
  @IsOptional()
  @IsString()
  correctAnswer?: string;

  @ApiPropertyOptional({ enum: DifficultyLevel, default: DifficultyLevel.MEDIUM })
  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @ApiPropertyOptional({ enum: BloomsTaxonomy, default: BloomsTaxonomy.KNOWLEDGE })
  @IsOptional()
  @IsEnum(BloomsTaxonomy)
  bloomsTaxonomy?: BloomsTaxonomy;

  @ApiPropertyOptional({ example: 4.0 })
  @IsOptional()
  @IsNumber()
  marks?: number;

  @ApiPropertyOptional({ example: 1.0 })
  @IsOptional()
  @IsNumber()
  negativeMarks?: number;

  @ApiPropertyOptional({ example: ['Force = mass * acceleration'] })
  @IsOptional()
  @IsArray()
  hints?: string[];

  @ApiPropertyOptional({ example: 'Newton\'s second law states F=ma.' })
  @IsOptional()
  @IsString()
  explanation?: string;
}

export class CreateAssessmentDto {
  @ApiProperty({ example: 'Mid-term Physics Exam' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Mid-term assessment for Grade 10' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: AssessmentType, example: AssessmentType.EXAM })
  @IsEnum(AssessmentType)
  type!: AssessmentType;

  @ApiPropertyOptional({ example: 60 })
  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimitMins?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  totalMarks?: number;

  @ApiPropertyOptional({ example: 40 })
  @IsOptional()
  @IsNumber()
  passPercentage?: number;

  @ApiPropertyOptional({ example: 'Read all questions carefully.' })
  @IsOptional()
  @IsString()
  instructions?: string;
}

export class SubmitAnswerDto {
  @ApiProperty({ example: 'question-uuid-123' })
  @IsString()
  @IsNotEmpty()
  questionId!: string;

  @ApiPropertyOptional({ example: 'Option A' })
  @IsOptional()
  @IsString()
  responseValue?: string;

  @ApiPropertyOptional({ example: 'https://cdn.vedhkrit.com/uploads/answer.pdf' })
  @IsOptional()
  @IsString()
  fileUrl?: string;
}

export class EvaluateAttemptDto {
  @ApiProperty({ example: 85.0 })
  @IsNumber()
  scoreGranted!: number;

  @ApiPropertyOptional({ enum: EvaluatorType, default: EvaluatorType.MANUAL })
  @IsOptional()
  @IsEnum(EvaluatorType)
  evaluatorType?: EvaluatorType;

  @ApiPropertyOptional({ example: 'Great performance in analytical questions.' })
  @IsOptional()
  @IsString()
  comments?: string;
}
