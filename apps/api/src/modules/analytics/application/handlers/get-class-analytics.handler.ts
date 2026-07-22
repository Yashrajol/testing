import { Injectable, Inject } from '@nestjs/common';
import { ANALYTICS_REPOSITORY_TOKEN } from '../../constants/analytics.constants';
import { IAnalyticsRepository } from '../../repositories/analytics.repository.interface';
import { GetClassAnalyticsQuery } from '../queries/get-class-analytics.query';
import { ClassAnalyticsResponseDto } from '../dtos/analytics-response.dto';
import { AnalyticsMapper } from '../mappers/analytics.mapper';

@Injectable()
export class GetClassAnalyticsHandler {
  constructor(
    @Inject(ANALYTICS_REPOSITORY_TOKEN)
    private readonly repo: IAnalyticsRepository,
  ) {}

  async execute(query: GetClassAnalyticsQuery): Promise<ClassAnalyticsResponseDto> {
    const entity = await this.repo.getClassAnalytics(query.batchId);
    return AnalyticsMapper.toClassDto(entity);
  }
}
