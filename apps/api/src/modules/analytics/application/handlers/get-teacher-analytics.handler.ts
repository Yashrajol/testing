import { Injectable, Inject } from '@nestjs/common';
import { ANALYTICS_REPOSITORY_TOKEN } from '../../constants/analytics.constants';
import { IAnalyticsRepository } from '../../repositories/analytics.repository.interface';
import { GetTeacherAnalyticsQuery } from '../queries/get-teacher-analytics.query';
import { TeacherAnalyticsResponseDto } from '../dtos/analytics-response.dto';
import { AnalyticsMapper } from '../mappers/analytics.mapper';

@Injectable()
export class GetTeacherAnalyticsHandler {
  constructor(
    @Inject(ANALYTICS_REPOSITORY_TOKEN)
    private readonly repo: IAnalyticsRepository,
  ) {}

  async execute(query: GetTeacherAnalyticsQuery): Promise<TeacherAnalyticsResponseDto> {
    const entity = await this.repo.getTeacherAnalytics(query.teacherId);
    return AnalyticsMapper.toTeacherDto(entity);
  }
}
