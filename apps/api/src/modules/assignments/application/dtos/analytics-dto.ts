import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignmentDashboardResponseDto {
  @ApiProperty({ example: 45 })
  totalAssignments!: number;

  @ApiProperty({ example: 38 })
  publishedAssignments!: number;

  @ApiProperty({ example: 1250 })
  totalSubmissions!: number;

  @ApiProperty({ example: 1100 })
  gradedSubmissions!: number;

  @ApiProperty({ example: 88.5 })
  overallSubmissionRate!: number;

  @ApiProperty({ example: 84.2 })
  overallCompletionRate!: number;

  @ApiProperty({ example: 6.8 })
  overallLateRate!: number;

  @ApiProperty({ example: 82.4 })
  overallAverageScore!: number;
}

export class PendingAssignmentDto {
  @ApiProperty({ example: 'assignment-uuid-123' })
  id!: string;

  @ApiProperty({ example: 'Full Stack Capstone Project' })
  title!: string;

  @ApiProperty({ example: '2026-08-15T23:59:59Z' })
  dueDate!: Date;

  @ApiProperty({ example: 100.0 })
  totalPoints!: number;

  @ApiProperty({ example: 'PROJECT' })
  category!: string;
}

export class OverdueAssignmentDto extends PendingAssignmentDto {
  @ApiProperty({ example: 3 })
  daysOverdue!: number;
}

export class CompletionReportResponseDto {
  @ApiProperty({ example: 'batch-uuid-123' })
  batchId!: string;

  @ApiProperty({ example: 92.0 })
  completionRate!: number;

  @ApiProperty({ example: 40 })
  totalAssigned!: number;

  @ApiProperty({ example: 37 })
  totalCompleted!: number;
}

export class PerformanceReportResponseDto {
  @ApiProperty({ example: 'batch-uuid-123' })
  batchId!: string;

  @ApiProperty({ example: 85.4 })
  averageScorePercent!: number;

  @ApiProperty({ example: [{ topicName: 'Microservices', averageScorePercent: 62.0, strugglingStudentsCount: 8 }] })
  weakTopics!: Array<{
    topicName: string;
    averageScorePercent: number;
    strugglingStudentsCount: number;
  }>;
}
