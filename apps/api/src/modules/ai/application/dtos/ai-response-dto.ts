import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AIRequestResponseDto {
  @ApiProperty({ example: 'req-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'GEMINI' })
  provider!: string;

  @ApiProperty({ example: 'gemini-1.5-pro' })
  model!: string;

  @ApiProperty({ example: 'STUDY_PLAN' })
  promptType!: string;

  @ApiProperty({ example: 450 })
  inputTokens!: number;

  @ApiProperty({ example: 0.0009 })
  estimatedCost!: number;

  @ApiProperty({ example: '2026-07-21T10:00:00.000Z' })
  createdAt!: Date;
}

export class AIResponseResponseDto {
  @ApiProperty({ example: 'resp-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'req-uuid-123' })
  requestId!: string;

  @ApiProperty({ example: 'Generated AI response text...' })
  content!: string;

  @ApiProperty({ example: 850 })
  outputTokens!: number;

  @ApiProperty({ example: 1200 })
  latencyMs!: number;

  @ApiProperty({ example: 0.0034 })
  cost!: number;
}

export class StudyPlanResponseDto {
  @ApiProperty({ example: 'plan-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  studentId!: string;

  @ApiProperty({ example: 'Personalized Study Plan: Data Structures' })
  title!: string;

  @ApiProperty({ example: { weeks: [] } })
  planData!: any;

  @ApiProperty({ example: true })
  isActive!: boolean;
}

export class AIRecommendationResponseDto {
  @ApiProperty({ example: 'rec-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  targetId!: string;

  @ApiProperty({ example: 'STUDENT' })
  targetType!: string;

  @ApiProperty({ example: 'Practice Binary Search Trees' })
  title!: string;

  @ApiProperty({ example: 'Focus on recursion and tree traversal assignments.' })
  content!: string;

  @ApiProperty({ example: false })
  isApplied!: boolean;
}

export class RiskAnalysisResponseDto {
  @ApiProperty({ example: 'risk-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  studentId!: string;

  @ApiProperty({ example: 'MEDIUM' })
  riskLevel!: string;

  @ApiProperty({ example: 'Risk of failing CS core assessment due to low homework marks.' })
  summary!: string;

  @ApiProperty({ example: ['Assignment average < 65%'] })
  riskFactors!: string[];

  @ApiProperty({ example: ['1-on-1 tutoring sessions', 'Solve revision worksheets'] })
  interventions!: string[];
}

export class CareerAdviceResponseDto {
  @ApiProperty({ example: 'career-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  studentId!: string;

  @ApiProperty({ example: 'Cloud Computing & Infrastructure' })
  industry!: string;

  @ApiProperty({ example: ['DevOps Engineer', 'Solutions Architect'] })
  recommendedRoles!: string[];

  @ApiProperty({ example: ['Kubernetes', 'Docker'] })
  skillGaps!: string[];

  @ApiProperty({ example: 'Focus on Cloud Platforms and container orchestration paths.' })
  adviceText!: string;
}

export class LearningInsightResponseDto {
  @ApiProperty({ example: 'insight-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'student-uuid-123' })
  studentId!: string;

  @ApiProperty({ example: 88.5 })
  focusScore!: number;

  @ApiProperty({ example: 92.0 })
  retentionRate!: number;

  @ApiProperty({ example: 1.25 })
  velocityIndex!: number;

  @ApiProperty({ example: { learningMode: 'Visual' } })
  insights!: any;
}
