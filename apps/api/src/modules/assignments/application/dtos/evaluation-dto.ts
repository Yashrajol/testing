import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GradeSubmissionDto {
  @ApiProperty({ example: 92.5 })
  @IsNumber()
  score!: number;

  @ApiPropertyOptional({ example: 'Excellent work on microservices architecture and clean code!' })
  @IsOptional()
  @IsString()
  feedbackComment?: string;

  @ApiPropertyOptional({ example: { 'criterion-1': 25, 'criterion-2': 23.5 } })
  @IsOptional()
  criteriaScores?: Record<string, number>;
}

export class AddFeedbackDto {
  @ApiProperty({ example: 'Great progress on code structure. Check error handling in Auth service.' })
  @IsString()
  @IsNotEmpty()
  comment!: string;

  @ApiPropertyOptional({ example: 'https://storage.vedhkrit.com/audio/feedback-123.mp3' })
  @IsOptional()
  @IsString()
  audioFeedbackUrl?: string;
}

export class ReturnSubmissionDto {
  @ApiPropertyOptional({ example: 'Please revise unit tests and resubmit' })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class ReopenSubmissionDto {
  @ApiPropertyOptional({ example: 'Granted 24 hour extension for resubmission' })
  @IsOptional()
  @IsString()
  reason?: string;
}
