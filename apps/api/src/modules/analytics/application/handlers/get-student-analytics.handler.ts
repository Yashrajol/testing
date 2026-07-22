import { Injectable, Inject } from '@nestjs/common';
import { ANALYTICS_REPOSITORY_TOKEN } from '../../constants/analytics.constants';
import { IAnalyticsRepository } from '../../repositories/analytics.repository.interface';
import { GetStudentAnalyticsQuery } from '../queries/get-student-analytics.query';
import { StudentAnalyticsResponseDto } from '../dtos/analytics-response.dto';
import { AnalyticsMapper } from '../mappers/analytics.mapper';

@Injectable()
export class GetStudentAnalyticsHandler {
  constructor(
    @Inject(ANALYTICS_REPOSITORY_TOKEN)
    private readonly repo: IAnalyticsRepository,
  ) {}

  async execute(query: GetStudentAnalyticsQuery): Promise<StudentAnalyticsResponseDto> {
    const entity = await this.repo.getStudentAnalytics(query.studentId);
    return AnalyticsMapper.toStudentDto(entity);
  }
}
