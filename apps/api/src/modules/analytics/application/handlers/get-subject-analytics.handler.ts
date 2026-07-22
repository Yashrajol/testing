import { Injectable, Inject } from '@nestjs/common';
import { ANALYTICS_REPOSITORY_TOKEN } from '../../constants/analytics.constants';
import { IAnalyticsRepository } from '../../repositories/analytics.repository.interface';
import { GetSubjectAnalyticsQuery } from '../queries/get-subject-analytics.query';
import { SubjectAnalyticsResponseDto } from '../dtos/analytics-response.dto';
import { AnalyticsMapper } from '../mappers/analytics.mapper';

@Injectable()
export class GetSubjectAnalyticsHandler {
  constructor(
    @Inject(ANALYTICS_REPOSITORY_TOKEN)
    private readonly repo: IAnalyticsRepository,
  ) {}

  async execute(query: GetSubjectAnalyticsQuery): Promise<SubjectAnalyticsResponseDto> {
    const entity = await this.repo.getSubjectAnalytics(query.studentId, query.subjectId);
    return AnalyticsMapper.toSubjectDto(entity);
  }
}
