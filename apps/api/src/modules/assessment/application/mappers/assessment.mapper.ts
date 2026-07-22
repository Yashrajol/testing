import { AssessmentEntity } from '../../domain/entities/assessment.entity';
import { AssessmentAttemptEntity } from '../../domain/entities/assessment-attempt.entity';
import { AssessmentResponseDto, AssessmentAttemptResponseDto } from '../dtos/assessment-response.dto';
import { AssessmentType, AttemptStatus } from '../../constants/assessment.constants';

export class AssessmentMapper {
  static toAssessmentDto(entity: AssessmentEntity): AssessmentResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description || undefined,
      type: entity.type as AssessmentType,
      timeLimitMins: entity.timeLimitMins || undefined,
      totalMarks: entity.totalMarks,
      passPercentage: entity.passPercentage,
      instructions: entity.instructions || undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toAttemptDto(entity: AssessmentAttemptEntity): AssessmentAttemptResponseDto {
    return {
      id: entity.id,
      assessmentId: entity.assessmentId,
      studentId: entity.studentId,
      startTime: entity.startTime,
      endTime: entity.endTime || undefined,
      durationSeconds: entity.durationSeconds || undefined,
      totalScore: entity.totalScore || undefined,
      percentage: entity.percentage || undefined,
      status: entity.status as AttemptStatus,
      competencyBreakdown: entity.competencyBreakdown || undefined,
      questionAnalytics: entity.questionAnalytics || undefined,
      learningOutcome: entity.learningOutcome || undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
